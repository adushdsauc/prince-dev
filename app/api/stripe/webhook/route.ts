import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const sig = headers().get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
  }

  const rawBody = await req.text()

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        console.log('✅ Payment complete for session', session.id)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
}