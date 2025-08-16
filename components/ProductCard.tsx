'use client'

import Image from 'next/image'
import { useState } from 'react'

type Product = {
  id: string
  name: string
  description: string
  priceCents: number
  image: string
  stripePriceId?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false)

  const onBuy = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, priceId: product.stripePriceId })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Failed to create checkout session')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border p-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold">${(product.priceCents / 100).toFixed(2)}</span>
        <button
          onClick={onBuy}
          disabled={loading || !product.stripePriceId}
          className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Redirecting…' : 'Buy'}
        </button>
      </div>
      {!product.stripePriceId && (
        <p className="mt-2 text-xs text-amber-600">Add a Stripe Price ID in <code>lib/products.ts</code> to enable checkout.</p>
      )}
    </div>
  )
}