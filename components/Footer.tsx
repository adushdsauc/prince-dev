import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/70">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4 text-sm">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" width={28} height={28} alt="Prince's Development"/>
              <span className="font-semibold">Prince's Development</span>
            </div>
            <p className="mt-3 text-gray-400 max-w-md">
              Crafting extraordinary experiences that redefine what's possible in development.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white">Scripts</Link></li>
              <li><Link href="/videos" className="hover:text-white">Videos</Link></li>
              <li><Link href="/downloads" className="hover:text-white">Downloads</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://discord.gg/" className="hover:text-white" target="_blank">Discord</a></li>
              <li><Link href="/support" className="hover:text-white">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 text-sm text-gray-400">
          <div className="md:col-span-2">© {new Date().getFullYear()} Prince's Development. All rights reserved.</div>
          <div className="flex gap-4 md:justify-end">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
