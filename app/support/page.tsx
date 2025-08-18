'use client'

import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const SUBJECTS = [
  'Technical Support',
  'Billing',
  'Order Issue',
  'Feature Request',
  'Other',
] as const

export default function SupportPage() {
  const { data: session, status } = useSession()
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>('Technical Support')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const disabled = useMemo(() => !subject || message.trim().length === 0, [subject, message])

  const [brokenAvatar, setBrokenAvatar] = useState(false)
  const avatarUrl =
    !brokenAvatar &&
    session?.user &&
    (session.user as any).id &&
    (session.user as any).avatar
      ? `https://cdn.discordapp.com/avatars/${(session.user as any).id}/${(session.user as any).avatar}.png?size=64`
      : '/images/avatar-placeholder.png'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          message,
          user: {
            id: (session?.user as any)?.id ?? null,
            name: session?.user?.name ?? 'Guest',
          },
        }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setMessage('')
      alert('Thanks! Your message has been sent.')
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative border-b border-white/10 bg-[#0b0b0f] py-14 md:py-20">
        <div className="absolute inset-0 bg-diagonal-stripes opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="flex justify-center">
            <span className="rounded-full border border-pink-400/25 bg-pink-400/10 px-3 py-1 text-xs font-semibold text-pink-300">
              Customer Support
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">
            How Can We <span className="text-pink-400">Help You Today?</span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-gray-400">
            Our team is here to assist you with any questions or concerns you may have.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section className="mx-auto mt-10 max-w-3xl px-6">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1524] to-[#130f1a] p-4 md:p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* User header */}
          <div className="rounded-xl border border-white/10 bg-black/20 p-3 md:p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  width={40}
                  height={40}
                  unoptimized
                  onError={() => setBrokenAvatar(true)}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="truncate text-sm font-semibold">
                    {session?.user?.name ?? 'Guest'}
                  </div>
                  {status === 'authenticated' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                      ● Verified
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400">☑ Discord Connected</div>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-gray-300">
              • Your support ticket will be created in our Discord server and linked to your account.
            </div>
          </div>

          {/* Subject (fancy select) */}
          <label className="mt-5 block text-sm text-gray-300">Subject</label>
          <div className="mt-2">
            <FancySelect
              value={subject}
              options={SUBJECTS as unknown as string[]}
              onChange={(v) => setSubject(v as (typeof SUBJECTS)[number])}
            />
          </div>

          {/* Message */}
          <label className="mt-5 block text-sm text-gray-300">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            rows={6}
            className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#111015] px-3 py-3 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-pink-500/40"
          />

          {/* Validation note */}
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
            ◦ Message and subject are required
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-end gap-3">
            {status !== 'authenticated' && (
              <button
                type="button"
                onClick={() => signIn('discord', { callbackUrl: '/support' })}
                className="rounded-2xl border border-pink-500/40 bg-pink-500/15 px-4 py-2 text-sm font-semibold text-pink-200 hover:bg-pink-500/20"
              >
                Login with Discord
              </button>
            )}
            <button
              type="submit"
              disabled={disabled || sending || status !== 'authenticated'}
              className={`rounded-2xl px-5 py-2 text-sm font-semibold ${
                disabled || sending || status !== 'authenticated'
                  ? 'cursor-not-allowed border border-white/10 bg-white/10 text-gray-400'
                  : 'border border-transparent bg-pink-600 text-white hover:bg-pink-500'
              }`}
            >
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </div>

          {/* Footer credit */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
              <span></span>
              Powered by Project Support
              <a
                href="https://github.com/"
                className="text-pink-300 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
      
              </a>
            </div>
          </div>
        </motion.form>
      </section>
    </div>
  )
}

/* ----------------------- */
/* Fancy Select Component  */
/* ----------------------- */

function FancySelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(
    Math.max(0, options.findIndex((o) => o === value)),
  )
  const ref = useRef<HTMLDivElement | null>(null)

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [])

  // keyboard support
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setOpen(true)
      return
    }
    if (!open) return
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'ArrowDown') setActive((i) => Math.min(options.length - 1, i + 1))
    if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1))
    if (e.key === 'Enter') {
      onChange(options[active])
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* gradient double-border wrapper (to mimic that pink inner rim) */}
      <div className="rounded-2xl bg-gradient-to-r from-pink-500/60 via-pink-400/40 to-transparent p-[2px]">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onKeyDown}
          className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#111015] px-4 py-3 text-left text-sm text-gray-200 outline-none focus:ring-2 focus:ring-pink-500/30"
        >
          <span>{value}</span>
          <span className="text-gray-400">▾</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.16, ease } }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.12, ease } }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#14101c] p-1 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            {options.map((opt, i) => {
              const isActive = i === active
              const isSelected = opt === value
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                  onClick={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                    isActive ? 'bg-white/8 text-white' : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {opt}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
