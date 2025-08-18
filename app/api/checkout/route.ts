// app/api/checkout/route.ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/mongo'
import Cart, { type ICart, type ICartItem } from '@/models/Cart'
import { PRODUCTS } from '@/lib/products'

// ---- Stripe client (fail fast if missing key) ----
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.warn('[stripe] STRIPE_SECRET_KEY is missing – checkout will return 500');
}

const stripe = STRIPE_KEY
  ? new Stripe(STRIPE_KEY, {
      apiVersion: "2025-07-30.basil", // ✅ matches your installed Stripe SDK typings
    })
  : (null as unknown as Stripe);

function findProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

// Optional: if you want to forbid $0 items at checkout
function isFree(unitAmountUsd: number) {
  return unitAmountUsd <= 0
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured on server' }, { status: 500 })
    }

    const session = await getServerSession(authOptions)
    const uid = (session?.user as any)?.id as string | undefined
    const email = (session?.user as any)?.email as string | undefined

    // Build items either from DB (signed-in) or from body (guest)
    let items: { productId: string; qty: number }[] = []

    if (uid) {
      await dbConnect()
      const cart = await Cart.findOne({ userId: uid }).lean<ICart | null>()
      items = (cart?.items ?? []).map((i: ICartItem) => ({
        productId: i.productId,
        qty: Math.max(1, Number(i.qty) || 1),
      }))
    } else {
      const body = await req.json().catch(() => ({} as any))
      if (Array.isArray(body?.items)) {
        items = body.items.map((i: any) => ({
          productId: String(i.productId),
          qty: Math.max(1, Number(i.qty) || 1),
        }))
      }
    }

    if (!items.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Build Stripe line_items ONLY from server-side catalog
    const line_items = []
    const invalidSlugs: string[] = []
    const freeSlugs: string[] = []

    for (const it of items) {
      const prod = findProductBySlug(it.productId)
      if (!prod) {
        invalidSlugs.push(it.productId)
        continue
      }
      const unitAmount = Math.round(prod.price * 100) // cents
      if (isFree(prod.price)) {
        freeSlugs.push(prod.slug)
        continue
      }
      line_items.push({
        quantity: it.qty,
        price_data: {
          currency: 'usd',
          unit_amount: unitAmount,
          product_data: {
            name: prod.title,
            metadata: {
              slug: prod.slug,
            },
          },
        },
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem)
    }

    if (invalidSlugs.length) {
      return NextResponse.json(
        {
          error: 'Some items are invalid',
          invalid: invalidSlugs,
        },
        { status: 400 },
      )
    }

    if (!line_items.length) {
      if (freeSlugs.length) {
        // You can handle “free checkout” differently (e.g., grant access directly)
        return NextResponse.json(
          {
            error:
              'Cart only contains free items. Stripe does not allow $0 checkouts. Remove free items or implement a free-claim flow.',
            free: freeSlugs,
          },
          { status: 400 },
        )
      }
      return NextResponse.json({ error: 'No valid items to checkout' }, { status: 400 })
    }

    // Prefer the request Origin, fallback to env
    const origin =
      req.headers.get('origin') ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'http://localhost:3000'

    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_email: email, // prefill if signed-in and we have an email
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      // Optional: pass useful metadata
      metadata: {
        userId: uid ?? '',
        source: 'web',
      },
    })

    // Optionally clear the user’s cart here after session creation (or do it on webhook success)
    // if (uid) await Cart.updateOne({ userId: uid }, { $set: { items: [] } })

    return NextResponse.json({ id: checkout.id, url: checkout.url })
  } catch (err: any) {
    console.error('[stripe] checkout error:', err)
    // Show a clean error to the client
    const message =
      err?.raw?.message || err?.message || 'Unable to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
