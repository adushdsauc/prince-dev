// app/providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import CartProvider from '@/context/CartProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  )
}
