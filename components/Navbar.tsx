// components/Navbar.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-inkBlack border-b border-gray-800 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold">Inkwell Studios</span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/store">Store</Link>
          <Link href="/commissions">Commissions</Link>
          <Link href="/videos">Videos</Link>
          <div className="relative group">
            <button className="hover:text-inkPink">About</button>
            <div className="absolute hidden group-hover:block bg-inkGray text-sm rounded-lg mt-2 shadow-lg">
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-700">About Us</Link>
              <Link href="https://discord.gg/yourlink" target="_blank" className="block px-4 py-2 hover:bg-gray-700">Discord</Link>
            </div>
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ShoppingCart className="w-6 h-6 cursor-pointer" />
          <button className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
