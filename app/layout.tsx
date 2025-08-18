// app/layout.tsx
import type { Metadata, Viewport } from "next"
import "./globals.css"

import Providers from "./providers" // keep if your Providers is in app/providers.tsx
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const siteName = "Prince's Development"
const description =
  "Crafting extraordinary experiences that redefine what's possible in FiveM development."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s • ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url: siteUrl,
    siteName,
    images: [
      {
        url: "/images/og-banner.png", // ensure this exists under /public/images
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/images/og-banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0b0b0f] text-gray-200 antialiased selection:bg-pink-500/30">
        <Providers>
          <Header />
          <main className="min-h-[80vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
