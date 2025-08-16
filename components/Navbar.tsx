'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 text-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Inkwell Studios" width={32} height={32} />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/products" className="hover:text-white">Store</Link>
          <Link href="/commissions" className="hover:text-white">Commissions</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white">Support ▾</button>
            <div className="absolute left-1/2 top-full hidden w-40 -translate-x-1/2 rounded-md border border-white/10 bg-[#1d1d1f] text-sm group-hover:block">
              <Link href="/faq" className="block px-4 py-2 hover:bg-white/5">FAQ</Link>
              <Link href="/forums" className="block px-4 py-2 hover:bg-white/5">Forums</Link>
              <Link href="/ticket" className="block px-4 py-2 hover:bg-white/5">Support Ticket</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white">About ▾</button>
            <div className="absolute left-1/2 top-full hidden w-40 -translate-x-1/2 rounded-md border border-white/10 bg-[#1d1d1f] text-sm group-hover:block">
              <Link href="/about" className="block px-4 py-2 hover:bg-white/5">About Us</Link>
              <a href="https://discord.gg/" className="block px-4 py-2 hover:bg-white/5" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" aria-label="Cart" className="hover:text-white">🛒</Link>
          {session ? (
            <button onClick={() => signOut()} className="flex items-center gap-2 hover:text-white">
              {session.user?.image && (
                <Image src={session.user.image} alt={session.user.name || ''} width={24} height={24} className="rounded-full" />
              )}
              <span>{session.user?.name}</span>
            </button>
          ) : (
            <button onClick={() => signIn('discord')} className="rounded bg-pink-500 px-3 py-1 text-white hover:bg-pink-600">Sign In</button>
          )}
          <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle Menu">☰</button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#0b0b0f] md:hidden">
          <div className="mx-auto max-w-6xl px-6 py-3 space-y-2">
            <Link href="/products" onClick={() => setOpen(false)} className="block">Store</Link>
            <Link href="/commissions" onClick={() => setOpen(false)} className="block">Commissions</Link>
            <div>
              <span className="block">Support</span>
              <div className="pl-4 space-y-1">
                <Link href="/faq" onClick={() => setOpen(false)} className="block">FAQ</Link>
                <Link href="/forums" onClick={() => setOpen(false)} className="block">Forums</Link>
                <Link href="/ticket" onClick={() => setOpen(false)} className="block">Support Ticket</Link>
              </div>
            </div>
            <div>
              <span className="block">About</span>
              <div className="pl-4 space-y-1">
                <Link href="/about" onClick={() => setOpen(false)} className="block">About Us</Link>
                <a href="https://discord.gg/" onClick={() => setOpen(false)} className="block" target="_blank" rel="noopener noreferrer">Discord</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
