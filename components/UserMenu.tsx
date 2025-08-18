'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

type Props = {
  name?: string | null
  image?: string | null
}

export default function UserMenu({ name = '', image }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // close on click outside / escape
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
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111015] px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
      >
        {/* small avatar */}
        <span className="relative h-6 w-6 overflow-hidden rounded-full bg-white/10">
          {image ? (
            <Image src={image} alt="Avatar" fill className="object-cover" />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-xs text-gray-400">👤</span>
          )}
        </span>
        <span className="max-w-[120px] truncate">{name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20" fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#14101c] p-1 shadow-xl"
        >
          <Link
            href="/account"
            role="menuitem"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            {/* account icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.8" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9a7 7 0 0 0-14 0" />
            </svg>
            <span>Account</span>
          </Link>

          <button
            role="menuitem"
            onClick={() => signOut()}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            {/* logout icon */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.8" d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" />
              <path strokeWidth="1.8" d="M15 12H3m0 0 3-3m-3 3 3 3" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  )
}
