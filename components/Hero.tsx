'use client'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export type FeaturedItem = {
  id: string
  title: string
  blurb: string
  price: string
  image: string
  badge?: string
}

export default function FeaturedCarousel({ items = [] }: { items?: FeaturedItem[] }) {
  const [index, setIndex] = useState(0)
  const count = items.length
  const hoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (count === 0) return
    let paused = false
    const onEnter = () => (paused = true)
    const onLeave = () => (paused = false)
    const el = hoverRef.current
    el?.addEventListener('mouseenter', onEnter)
    el?.addEventListener('mouseleave', onLeave)

    const t = setInterval(() => {
      if (!paused) setIndex(i => (i + 1) % count)
    }, 10000)
    return () => {
      clearInterval(t)
      el?.removeEventListener('mouseenter', onEnter)
      el?.removeEventListener('mouseleave', onLeave)
    }
  }, [count])

  if (count === 0) return null

  const current = items[index]
  const dots = useMemo(() => new Array(count).fill(0), [count])

  return (
    <section className="relative py-14" ref={hoverRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] tracking-[0.25em] text-gray-400">FEATURED PRODUCTS</span>
            <h2 className="mt-2 text-2xl font-semibold">Elevate Your Server</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button aria-label="Prev" onClick={() => setIndex(i => (i - 1 + count) % count)} className="h-10 w-10 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">‹</button>
            <button aria-label="Next" onClick={() => setIndex(i => (i + 1) % count)} className="h-10 w-10 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">›</button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 items-stretch">
          {/* Left: copy */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 backdrop-blur-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col">
            <div className="text-xs text-yellow-300/90">FEATURED SCRIPT</div>
            <h3 className="mt-2 text-3xl font-semibold">{current.title}</h3>
            <p className="mt-2 text-gray-400">{current.blurb}</p>
            <div className="mt-4 flex items-center gap-3">
              <a href={`/products/${current.id}`} className="rounded-xl bg-pink-500 px-5 py-2 font-semibold text-white hover:bg-pink-600">Buy Now</a>
              <a href={`/products/${current.id}`} className="rounded-xl border border-white/15 px-5 py-2 font-semibold text-white/90 hover:bg-white/5">View Details</a>
            </div>
            <div className="mt-auto pt-6 text-gray-400">{current.price} <span className="text-xs opacity-70">One-time purchase</span></div>
          </div>

          {/* Right: image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 min-h-[260px] md:min-h-[360px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <Image src={current.image} alt={current.title} fill className="object-cover" />
            {current.badge && (
              <span className="absolute top-3 left-3 rounded-full bg-pink-500 text-[11px] px-3 py-1 font-semibold">{current.badge}</span>
            )}
            <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2.5 py-1 text-sm">{current.price}</span>
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {dots.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-2 w-6 rounded-full transition ${i === index ? 'bg-pink-500' : 'bg-white/15'}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
          <div className="sm:hidden flex gap-2">
            <button aria-label="Prev" onClick={() => setIndex(i => (i - 1 + count) % count)} className="h-10 w-10 rounded-xl border border-white/10 text-gray-300">‹</button>
            <button aria-label="Next" onClick={() => setIndex(i => (i + 1) % count)} className="h-10 w-10 rounded-xl border border-white/10 text-gray-300">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
