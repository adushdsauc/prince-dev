'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// 🚀 This disables static prerendering
export const dynamic = 'force-dynamic'

export default function SuccessPage() {
  const qs = useSearchParams()
  const sessionId = qs.get('session_id')
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')

  useEffect(() => {
    let done = false
    async function ping() {
      if (!sessionId) return
      try {
        const res = await fetch('/api/notify/checkout-success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        })
        if (!done) setStatus(res.ok ? 'ok' : 'err')
      } catch {
        if (!done) setStatus('err')
      }
    }
    ping()
    return () => { done = true }
  }, [sessionId])

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold text-white">Payment successful 🎉</h1>
      <p className="mt-2 text-sm text-gray-400">
        Thanks for your purchase{status === 'ok' ? ' — receipt noted.' : '.'}
      </p>
      {status === 'err' && (
        <p className="mt-2 text-xs text-red-400">
          We couldn’t confirm your order automatically. Don’t worry — you still paid. We’ll verify on our end.
        </p>
      )}
      <a
        href="/account"
        className="mt-6 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
      >
        Go to Account
      </a>
    </main>
  )
}
