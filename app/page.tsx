import FeaturedCarousel from '@/components/FeaturedCarousel'

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0f] pt-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1F] via-[#FF69B4]/10 to-[#1D1D1F] opacity-50 blur-3xl" />
        <div className="container relative mx-auto flex flex-col items-center justify-center gap-8 px-4 text-center">
          <p className="text-sm tracking-widest text-pink-400">DEVELOPMENT STUDIO</p>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Crafting{' '}
            <span className="bg-gradient-to-r from-[#1D1D1F] via-[#FF69B4] to-[#1D1D1F] bg-clip-text text-transparent">extraordinary</span>{' '}
            experiences
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-[#A3A3A3] md:text-xl">
            Transform your FiveM server with our meticulously crafted scripts.
            <br />
            Designed for performance, built for excellence.
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row">
            <a
              href="/products"
              className="rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
            >
              Explore Scripts
            </a>
            <a
              href="/commissions"
              className="rounded-xl border border-white/20 px-6 py-3 font-semibold transition hover:border-pink-400"
            >
              Start a Project
            </a>
          </div>
        </div>
      </section>
      <FeaturedCarousel />
    </main>
  )
}
