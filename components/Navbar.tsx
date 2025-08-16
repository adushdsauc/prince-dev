'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Prince's Development" width={28} height={28} />
          <span className="text-lg font-semibold">Prince's Development</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/products" className="hover:text-brand-700">Products</Link>
          <Link href="/commissions" className="hover:text-brand-700">Commissions</Link>
          <Link href="/videos" className="hover:text-brand-700">Videos</Link>
          <Link href="/downloads" className="hover:text-brand-700">Downloads</Link>
          <Link href="/about" className="hover:text-brand-700">About</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle Menu">
          <span className="i">☰</span>
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden">
          <div className="mx-auto max-w-6xl px-6 py-3 space-y-2">
            <Link href="/products" onClick={() => setOpen(false)} className="block">Products</Link>
            <Link href="/commissions" onClick={() => setOpen(false)} className="block">Commissions</Link>
            <Link href="/videos" onClick={() => setOpen(false)} className="block">Videos</Link>
            <Link href="/downloads" onClick={() => setOpen(false)} className="block">Downloads</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block">About</Link>
          </div>
        </div>
      )}
    </header>
  )
}