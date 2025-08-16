'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { products } from '@/lib/products'

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 10000)
    return () => clearInterval(id)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length)
  const next = () => setIndex((i) => (i + 1) % products.length)

  const product = products[index]

  return (
    <div className="relative mx-auto mt-16 w-full max-w-xl text-center">
      <div className="relative h-64 w-full">
        <Image src={product.image} alt={product.name} fill className="rounded-xl object-cover" />
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-white">{product.name}</h3>
      <p className="mt-2 text-gray-400">{product.description}</p>
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={prev} aria-label="Previous" className="rounded bg-white/10 px-4 py-2 hover:bg-white/20">←</button>
        <button onClick={next} aria-label="Next" className="rounded bg-white/10 px-4 py-2 hover:bg-white/20">→</button>
      </div>
    </div>
  )
}
