// lib/fulfill.ts
import Order from '@/models/Order'
import { dbConnect } from '@/lib/mongo'

export async function fulfillPaidOrder(args: {
  userId?: string
  email?: string
  items: { slug: string; title: string; qty: number; unitAmount: number }[]
  subtotal: number
  currency?: 'usd'
  stripeSessionId?: string
  status: 'paid' | 'free'
}) {
  await dbConnect()
  const order = await Order.create({
    ...args,
    currency: args.currency ?? 'usd',
  })

  // TODO: grant entitlements, send receipts, etc.
  // e.g., await giveDiscordRole(args.userId, 'customer')

  return order
}
