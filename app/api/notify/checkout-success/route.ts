import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { notifyDiscordSales } from '@/lib/notify'

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json()
    if (!session_id) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })

    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    const stripe = new Stripe(key, { apiVersion: '2025-07-30.basil' })

    // Verify session server-side
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['line_items'] })

    const paid = session.payment_status === 'paid'
    const zeroTotal = (session.amount_total ?? 0) === 0

    if (!paid && !zeroTotal) {
      return NextResponse.json({ error: 'Session not paid or free' }, { status: 400 })
    }

    // Compose message
    const currency = (session.currency ?? 'usd').toUpperCase()
    const amount = (session.amount_total ?? 0) / 100
    const email = session.customer_details?.email || session.customer_email || 'unknown'
    const items = session.line_items?.data ?? []

    await notifyDiscordSales({
      title: paid ? '🧾 New paid order' : '🆓 New free order',
      description: `Session \`${session.id}\``,
      fields: [
        { name: 'Customer', value: `${email}`, inline: true },
        { name: 'Total', value: `${amount.toFixed(2)} ${currency}`, inline: true },
        { name: 'Items', value: items.map(li => `• ${li.description ?? 'Item'} × ${li.quantity ?? 1}`).join('\n') || '-' },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[notify] error:', err)
    return NextResponse.json({ error: err?.message ?? 'Internal error' }, { status: 500 })
  }
}
