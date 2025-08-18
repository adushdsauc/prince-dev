// app/store/page.tsx
'use client'

import { useMemo, useState } from 'react'
import { motion, cubicBezier } from 'framer-motion'
import ProductCard, { Product } from '@/components/ProductCard'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const PRODUCTS: Product[] = [

  {
    id: 'moderation-bot',
    title: 'Moderation Bot',
    blurb: 'Essential Speedo. No bloat. Just the basics.',
    price: 5,
    image: '/images/placeholder-dark.jpg',
    badge: 'Available Now',
    tags: ['standalone'],
    cta: 'View Details',
  }
]

export default function StorePage() {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.toLowerCase().trim()
    if (!term) return PRODUCTS
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.blurb.toLowerCase().includes(term) ||
        p.tags?.some((t) => t.toLowerCase().includes(term)),
    )
  }, [q])

  return (
    <div className="pb-16">
      {/* Hero / banner */}
      <section className="relative border-b border-white/10 bg-[#0b0b0f] py-16 md:py-20">
        <div aria-hidden className="absolute inset-0 bg-diagonal-stripes opacity-[0.11]" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="flex justify-center">
            <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-300">
              Premium Scripts
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
            Elevate Your Server
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-gray-400">
            Discover our collection of meticulously crafted developments.
          </p>

          {/* Search + Filters */}
          <div className="mx-auto mt-8 flex max-w-4xl items-center gap-3">
            <div className="relative flex-1">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search scripts..."
                className="w-full rounded-xl border border-white/10 bg-[#111015] px-4 py-3 pr-10 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-pink-500/40"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ⌘K
              </span>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111015] px-4 py-3 text-sm text-gray-200 hover:bg-white/5"
              type="button"
              // hook up a real filter drawer later
              onClick={() => alert('Filters coming soon')}
            >
              <span>⚙️</span> Filters
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.25, delay: i * 0.03, ease },
              }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-500">
            No results for “{q}”.
          </p>
        )}
      </section>
    </div>
  )
}
