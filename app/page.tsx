export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0b0f] text-white pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1F] via-[#FF69B4]/10 to-[#1D1D1F] opacity-50 blur-3xl"></div>

      <div className="container relative mx-auto px-4 text-center flex flex-col items-center justify-center gap-8">
        {/* Heading */}
        <h1 className="max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Crafting{" "}
          <span className="bg-gradient-to-r from-[#1D1D1F] via-[#FF69B4] to-[#1D1D1F] dark:from-white dark:via-[#FF69B4] dark:to-white bg-clip-text text-transparent relative">
            extraordinary
          </span>{" "}
          experiences
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#A3A3A3] dark:text-[#868686] max-w-2xl mx-auto leading-relaxed font-light">
          Transform your FiveM server with our meticulously crafted scripts. <br />
          Designed for performance, built for excellence.
        </p>

        {/* Call to Action buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <a
            href="/scripts"
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition"
          >
            Explore Scripts
          </a>
          <a
            href="/commissions"
            className="px-6 py-3 border border-white/20 hover:border-pink-400 rounded-xl font-semibold transition"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}
