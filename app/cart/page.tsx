// app/cart/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartProvider'
import { useMemo } from 'react'

export default function CartPage() {
  const { items, setQty, remove, clear, subtotal } = useCart()

  const isEmpty = items.length === 0
  const fee = 0 // add fees/tax later
  const total = useMemo(() => subtotal + fee, [subtotal, fee])

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Your Cart</h1>
          <p className="mt-1 text-sm text-gray-400">
            Review items before checkout. Quantities update instantly.
          </p>
        </div>
        {!isEmpty && (
          <button
            onClick={clear}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Clear cart
          </button>
        )}
      </header>

      {isEmpty ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-sm text-gray-400">Your cart is empty.</p>
          <Link
            href="/store"
            className="mt-4 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Browse the store
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {/* Items */}
          <ul className="md:col-span-2 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
            {items.map((i) => (
              <li key={i.productId} className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                  <Image
                    src={i.image || '/images/placeholder-dark.jpg'}
                    alt={i.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/store/${i.productId}`} className="truncate text-sm font-medium text-white hover:underline">
                    {i.title}
                  </Link>
                  <div className="mt-1 text-xs text-gray-400">${i.price.toFixed(2)} each</div>
                  <button
                    onClick={() => remove(i.productId)}
                    className="mt-2 text-xs text-red-300 hover:text-red-200"
                  >
                    Remove
                  </button>
                </div>
                {/* Qty */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty(i.productId, Math.max(1, i.qty - 1))}
                    className="h-8 w-8 rounded-lg border border-white/10 text-center text-sm hover:bg-white/5"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <input
                    value={i.qty}
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(/\D/g, '')) || 1
                      setQty(i.productId, Math.max(1, n))
                    }}
                    className="h-8 w-12 rounded-lg border border-white/10 bg-transparent text-center text-sm"
                    inputMode="numeric"
                  />
                  <button
                    onClick={() => setQty(i.productId, i.qty + 1)}
                    className="h-8 w-8 rounded-lg border border-white/10 text-center text-sm hover:bg-white/5"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <div className="w-20 text-right text-sm font-semibold">
                  ${(i.price * i.qty).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="md:col-span-1">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-white">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Subtotal</dt>
                  <dd className="text-white">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Fees</dt>
                  <dd className="text-white">${fee.toFixed(2)}</dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-white/10 pt-2 text-base">
                  <dt className="font-semibold text-white">Total</dt>
                  <dd className="font-semibold text-white">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <CheckoutButton />
              <p className="mt-2 text-xs text-gray-400">You’ll be redirected to a secure Stripe checkout.</p>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}

function CheckoutButton() {
  const { items } = useCart()
  async function go() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // guests: send items; authed users: server will ignore and read DB
      body: JSON.stringify({ items: items.map(i => ({ productId: i.productId, qty: i.qty })) })
    })
    const data = await res.json()
    if (data?.url) window.location.href = data.url
  }
  return (
    <button
      onClick={go}
      className="mt-5 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90"
    >
      Proceed to Checkout →
    </button>
  )
}
