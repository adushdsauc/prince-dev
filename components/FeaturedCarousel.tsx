// components/FeaturedCarousel.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, cubicBezier } from 'framer-motion'

export type FeaturedItem = {
  id: string
  title: string
  blurb: string
  price: string // display string (e.g. "$19.00")
  image: string
  badge?: string
}

export default function FeaturedCarousel({ items = [] }: { items?: FeaturedItem[] }) {
  const [index, setIndex] = useState(0)
  const count = items.length
  const hoverRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (count === 0) return
    let paused = false
    const onEnter = () => (paused = true)
    const onLeave = () => (paused = false)
    const el = hoverRef.current
    el?.addEventListener('mouseenter', onEnter)
    el?.addEventListener('mouseleave', onLeave)
    const t = setInterval(() => { if (!paused) setIndex(i => (i + 1) % count) }, 8000)
    return () => { clearInterval(t); el?.removeEventListener('mouseenter', onEnter); el?.removeEventListener('mouseleave', onLeave) }
  }, [count])

  if (count === 0) return null
  const current = items[index]
  const dots = useMemo(() => new Array(count).fill(0), [count])

  // Nice "expo-ish" ease
  const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1)
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easeOutExpo },
  }

  async function buyNow(productId: string) {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ productId, qty: 1 }] }),
      })
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error', data)
        alert('Could not start checkout. Please try again.')
      }
    } catch (e) {
      console.error(e)
      alert('Could not start checkout. Please try again.')
    }
  }

  // image fallback (Next/Image-safe)
  const [imgSrc, setImgSrc] = useState(current.image || '/images/placeholder-dark.jpg')
  useEffect(() => {
    setImgSrc(current.image || '/images/placeholder-dark.jpg')
  }, [current])

  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      ref={hoverRef}
      aria-label="Featured products"
    >
      {/* Background flair */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1100px_600px_at_60%_-10%,rgba(236,72,153,0.18),transparent_60%),radial-gradient(1000px_500px_at_20%_0%,rgba(168,85,247,0.12),transparent_60%)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-stars opacity-30" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Headline */}
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={fadeUp.transition}
          className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
        >
          <div>
            <span className="text-[11px] tracking-[0.25em] text-gray-400/90">DEVELOPMENT STUDIO</span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
              Crafting{' '}
              <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                extraordinary
              </span>{' '}
              experiences
            </h1>
            <p className="mt-5 max-w-2xl text-gray-400">
              Transform your server with meticulously crafted developments. Designed for performance, built for
              excellence.
            </p>
          </div>

          {/* Arrow buttons (desktop) */}
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous"
              onClick={() => setIndex(i => (i - 1 + count) % count)}
              className="h-11 w-11 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setIndex(i => (i + 1) % count)}
              className="h-11 w-11 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
            >
              ›
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
          {/* Left: copy card */}
          <motion.div
            key={current.id + '-copy'}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="group relative rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {/* subtle shine on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(600px 120px at 20% -10%, rgba(236,72,153,0.12), transparent 60%)',
              }}
            />
            <div className="relative">
              <div className="text-xs text-yellow-300/90">FEATURED SCRIPT</div>
              <h3 className="mt-2 text-3xl font-semibold">{current.title}</h3>
              <p className="mt-2 text-gray-400">{current.blurb}</p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => buyNow(current.id)}
                  className="rounded-xl bg-pink-500 px-5 py-2.5 font-semibold text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                >
                  Buy Now
                </button>
                <Link
                  href={`/store/${current.id}`}
                  className="rounded-xl border border-white/15 px-5 py-2.5 font-semibold text-white/90 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  View Details
                </Link>
              </div>

              <div className="mt-6 text-gray-400">
                {current.price}{' '}
                <span className="align-middle text-xs opacity-70">One-time purchase</span>
              </div>
            </div>
          </motion.div>

          {/* Right: media card */}
          <motion.div
            key={current.id + '-media'}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:min-h-[360px]"
          >
            {/* gradient edge on hover */}
            <div aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-all group-hover:ring-pink-500/30" />
            {/* IMAGE (with safe fallback) */}
            <Image
              src={imgSrc}
              alt={current.title}
              fill
              className="object-cover"
              priority
              onError={() => setImgSrc('/images/placeholder-dark.jpg')}
            />
            {current.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-[11px] font-semibold shadow">
                {current.badge}
              </span>
            )}
            <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2.5 py-1 text-sm">
              {current.price}
            </span>
          </motion.div>
        </div>

        {/* Dots & mobile arrows */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {dots.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 w-6 rounded-full transition ${i === index ? 'bg-pink-500' : 'bg-white/15 hover:bg-white/25'}`}
              />
            ))}
          </div>

          <div className="flex gap-2 md:hidden">
            <button
              aria-label="Previous"
              onClick={() => setIndex(i => (i - 1 + count) % count)}
              className="h-10 w-10 rounded-xl border border-white/10 text-gray-300"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setIndex(i => (i + 1) % count)}
              className="h-10 w-10 rounded-xl border border-white/10 text-gray-300"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
