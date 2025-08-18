'use client'

import { useCart } from '@/context/CartProvider'

type Props = {
  product: { id: string; title: string; price: number; image: string }
}

export default function PurchaseActions({ product }: Props) {
  const { add } = useCart()
  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="text-2xl font-semibold text-white">${product.price.toFixed(2)}</div>
      <button
        onClick={() =>
          add(
            { productId: product.id, title: product.title, price: product.price, image: product.image },
            1
          )
        }
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
      >
        Add to Cart
      </button>
    </div>
  )
}
