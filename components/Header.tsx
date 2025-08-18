// components/Header.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'
import { useSession, signIn, signOut } from 'next-auth/react'

/* ---------- Types ---------- */
type MenuItem = { label: string; href: string; external?: boolean }
type MenuGroup = { label: string; href?: string; items?: MenuItem[] }

/* ---------- Nav model ---------- */
const NAV: MenuGroup[] = [
  { label: 'Store', href: '/store' },
  { label: 'Commissions', href: '/commissions' },
  {
    label: 'Support',
    items: [
      { label: 'Help Center', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Forums', href: '/forums' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Discord', href: 'https://discord.gg/A3VYwpNACB', external: true },
    ],
  },
]

const ease = cubicBezier(0.16, 1, 0.3, 1)

/* ---------- Helpers ---------- */
function avatarUrl(user: any) {
  // Prefer NextAuth image first; fall back to Discord CDN if id+avatar present
  if (user?.image) return user.image
  if (user?.id && user?.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
  }
  return '/images/avatar-placeholder.png'
}

/* Single place to render an item (handles external links) */
function NavItem({ item, className = '' }: { item: MenuItem; className?: string }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-between gap-1 rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5 ${className}`}
      >
        <span>{item.label}</span>
        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
      </a>
    )
  }
  return (
    <Link
      href={item.href}
      className={`block rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5 ${className}`}
    >
      {item.label}
    </Link>
  )
}

/* ---------- Small user dropdown (Account / Log out) ---------- */
function UserMenu({ name, image }: { name?: string | null; image?: string | null }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111015] px-2 py-1 text-sm text-gray-200 hover:bg-white/5"
      >
        <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/10">
          <Image src={image || '/images/avatar-placeholder.png'} alt="Avatar" fill className="object-cover" />
        </span>
        <span className="hidden max-w-[140px] truncate md:inline">{name || 'Account'}</span>
        <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.14, ease } }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.12, ease } }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#14101c] p-1 shadow-xl"
            role="menu"
          >
            <Link
              href="/account"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.8" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9a7 7 0 0 0-14 0" />
              </svg>
              <span>Account</span>
            </Link>

            <button
              role="menuitem"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.8" d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" />
                <path strokeWidth="1.8" d="M15 12H3m0 0 3-3m-3 3 3 3" />
              </svg>
              <span>Log out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Header ---------- */
export default function Header() {
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-18 md:px-6">
        {/* Left: logo/name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500 text-white">⚙️</span>
          <span className="font-semibold tracking-tight">Prince&apos;s Development</span>
        </Link>

        {/* Center: nav (desktop) */}
        <nav className="hidden items-center gap-2 md:flex">
          {NAV.map((g) =>
            g.items ? (
              <HoverMenu key={g.label} label={g.label} items={g.items} />
            ) : (
              <Link
                key={g.label}
                href={g.href || '#'}
                className="rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
              >
                {g.label}
              </Link>
            ),
          )}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
          >
            🛒
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-pink-500 text-[10px] font-semibold text-white">
              1
            </span>
          </Link>

          {/* Auth */}
          {status === 'loading' ? (
            <div className="h-9 w-24 animate-pulse rounded-2xl bg-white/10" />
          ) : status === 'authenticated' ? (
            <UserMenu
              name={session?.user?.name ?? session?.user?.email ?? 'Account'}
              image={avatarUrl(session?.user)}
            />
          ) : (
            <button
              onClick={() => signIn('discord', { callbackUrl: '/' })}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Sign in
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-200 hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.16, ease } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease } }}
            className="md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-4">
              <div className="rounded-xl border border-white/10 bg-[#14101c] p-2">
                {NAV.map((g) =>
                  g.items ? (
                    <div key={g.label} className="mb-1">
                      <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400">
                        {g.label}
                      </div>
                      <div className="grid">
                        {g.items.map((it) =>
                          it.external ? (
                            <a
                              key={it.label}
                              href={it.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
                              onClick={() => setMobileOpen(false)}
                            >
                              {it.label}
                            </a>
                          ) : (
                            <Link
                              key={it.label}
                              href={it.href}
                              className="rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
                              onClick={() => setMobileOpen(false)}
                            >
                              {it.label}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={g.label}
                      href={g.href || '#'}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {g.label}
                    </Link>
                  ),
                )}

                {/* Auth section in mobile panel */}
                <div className="mt-2 border-t border-white/10 pt-2">
                  {status === 'authenticated' ? (
                    <>
                      <Link
                        href="/account"
                        className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        Account
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => signIn('discord', { callbackUrl: '/' })}
                      className="w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90"
                    >
                      Sign in
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- Dropdown with safe hover delay ---------- */
function HoverMenu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false)
  const timers = useRef<{ open?: number; close?: number }>({})

  useEffect(() => {
    return () => {
      if (timers.current.open) window.clearTimeout(timers.current.open)
      if (timers.current.close) window.clearTimeout(timers.current.close)
    }
  }, [])

  const onEnter = () => {
    if (timers.current.close) window.clearTimeout(timers.current.close)
    timers.current.open = window.setTimeout(() => setOpen(true), 80)
  }
  const onLeave = () => {
    if (timers.current.open) window.clearTimeout(timers.current.open)
    timers.current.close = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <button
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
          open ? 'bg-white/5 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <span className="text-xs">▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease } }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15, ease } }}
            className="absolute left-1/2 z-50 -translate-x-1/2 pt-2"
          >
            <div
              className="w-56 overflow-hidden rounded-xl border border-white/10 bg-[#14101c] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {items.map((it) => (
                <NavItem key={it.label} item={it} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
