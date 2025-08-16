import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { products } from '@/lib/products'

export async function POST(req: Request) {
  try {
    const { productId, priceId } = await req.json()

    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin

    let price = priceId as string | undefined

    if (!price && productId) {
      const prod = products.find(p => p.id === productId)
      price = prod?.stripePriceId
    }

    if (!price) {
      return NextResponse.json({ error: 'Missing priceId or unknown productId' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/products/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/cancel`,
      automatic_tax: { enabled: true },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error', err)
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}