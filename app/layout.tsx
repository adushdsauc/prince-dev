import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = { title: "Prince's Development" }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
