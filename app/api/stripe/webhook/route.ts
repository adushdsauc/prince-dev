// app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { fulfillPaidOrder } from '@/lib/fulfill'

export const runtime = 'nodejs' // raw body needs node runtime

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const sig = req.headers.get('stripe-signature')!
  const raw = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object as Stripe.Checkout.Session
    const lineItems = await stripe.checkout.sessions.listLineItems(s.id)

    await fulfillPaidOrder({
      userId: (s.metadata?.userId as string) || undefined,
      email: (s.customer_details?.email as string) || (s.customer_email as string) || undefined,
      items: lineItems.data.map((li) => ({
        slug: (li.price?.product as any)?.metadata?.slug ?? li.description ?? 'unknown',
        title: li.description ?? 'Item',
        qty: li.quantity || 1,
        unitAmount: li.amount_subtotal ?? li.amount_total ?? 0,
      })),
      subtotal: s.amount_subtotal ?? s.amount_total ?? 0,
      currency: (s.currency as any) || 'usd',
      stripeSessionId: s.id,
      status: 'paid',
    })
  }

  return NextResponse.json({ received: true })
}

// Required for raw body in Next.js app router
export const config = { api: { bodyParser: false } } as any
