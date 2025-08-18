// components/ProductCard.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'
import { useCart } from '@/context/CartProvider'

export type Product = {
  id: string            // slug used in /store/[id]
  title: string
  blurb: string
  price: number
  image: string
  badge?: string        // e.g., "Available Now", "Preorder"
  tags?: string[]
  cta?: string          // "View Details" / "Pre-order" / etc.
}

function formatPrice(n: number) {
  if (n === 0) return 'Free'
  return `$${Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2)}`
}

function ProductCardImpl({ product }: { product: Product }) {
  const { add } = useCart()
  const [imgSrc, setImgSrc] = useState(product.image || '/images/placeholder-dark.jpg')

  const isFree = product.price === 0
  const isPreorder = (product.badge || '').toLowerCase().includes('pre')

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14101c] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* Media */}
      <div className="relative overflow-hidden">
        {/* lock ratio so grids stay tidy */}
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc('/images/placeholder-dark.jpg')}
            priority={false}
          />
        </div>

        {/* top-right badge */}
        {product.badge && (
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
              isPreorder ? 'bg-amber-500' : 'bg-pink-500'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* tag pill(s) bottom-left */}
        {!!product.tags?.length && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="rounded-md bg-black/55 px-2 py-1 text-[11px] text-gray-200">
                ⌁ {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-400">{product.blurb}</p>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xl font-bold">{formatPrice(product.price)}</div>

          <div className="flex items-center gap-2">
            {/* Add to Cart */}
            <button
              type="button"
              onClick={() =>
                add(
                  {
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  },
                  1
                )
              }
              className="rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
              aria-label="Add to cart"
              title="Add to cart"
            >
              🛒
            </button>

            {/* View details -> /store/[slug] */}
            <Link
              href={`/store/${product.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              {product.cta ?? (isPreorder ? 'Pre-order' : 'View Details')}
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductCard = memo(ProductCardImpl)
export default ProductCard
