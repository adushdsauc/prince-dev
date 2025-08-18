// models/Order.ts
import { Schema, model, models } from 'mongoose'

export type OrderStatus = 'paid' | 'free' | 'failed' | 'refunded'

export interface IOrder {
  _id?: string
  userId?: string
  email?: string
  items: { slug: string; title: string; qty: number; unitAmount: number }[]
  subtotal: number // in cents
  currency: 'usd'
  stripeSessionId?: string
  status: OrderStatus
  createdAt?: Date
  updatedAt?: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: String,
    email: String,
    items: [
      {
        slug: { type: String, required: true },
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        unitAmount: { type: Number, required: true }, // cents
      },
    ],
    subtotal: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    stripeSessionId: String,
    status: { type: String, enum: ['paid', 'free', 'failed', 'refunded'], required: true },
  },
  { timestamps: true }
)

export default models.Order || model<IOrder>('Order', OrderSchema)
