// models/Cart.ts
import { Schema, models, model, type Model } from 'mongoose'

export interface ICartItem {
  productId: string
  title: string
  price: number
  image: string
  qty: number
}

export interface ICart {
  userId: string
  items: ICartItem[]
  updatedAt: Date
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: String, required: true },
    title: String,
    price: Number,
    image: String,
    qty: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
)

const CartSchema = new Schema<ICart>({
  userId: { type: String, required: true, unique: true, index: true },
  items: { type: [CartItemSchema], default: [] },
  updatedAt: { type: Date, default: Date.now },
})

CartSchema.pre('save', function (next) {
  this.set('updatedAt', new Date())
  next()
})

const Cart: Model<ICart> =
  (models.Cart as Model<ICart>) || model<ICart>('Cart', CartSchema)

export default Cart
// NOTE: interfaces are already exported above; no need to re-export them.
// (Do NOT add `export type { ICartItem }` or TS will throw the conflict.)
