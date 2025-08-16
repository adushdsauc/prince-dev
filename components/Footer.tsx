import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0f] text-sm text-gray-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <Image src="/logo.svg" alt="Inkwell Studios" width={40} height={40} />
          <h2 className="mt-4 text-xl font-semibold text-white">Inkwell Studios</h2>
          <p className="mt-4">
            Crafting extraordinary experiences that redefine what's possible in FiveM development.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Products</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/products" className="hover:text-white">Scripts</Link></li>
            <li><Link href="/videos" className="hover:text-white">Videos</Link></li>
            <li><Link href="/downloads" className="hover:text-white">Downloads</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a></li>
            <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
