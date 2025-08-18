'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, cubicBezier } from 'framer-motion'
import { useSession, signIn } from 'next-auth/react'

const ease = cubicBezier(0.16, 1, 0.3, 1)

type Service = {
  icon: string
  title: string
  blurb: string
  priceFrom: string
}
const SERVICES: Service[] = [
  { icon: '⚡️', title: 'Static Website',  blurb: 'Fast, responsive design',           priceFrom: '$30' },
  { icon: '🗄️', title: 'Dynamic Website', blurb: 'Full-stack solutions',               priceFrom: '$60' },
  { icon: '🧩', title: 'CAD/MDT System',   blurb: 'Custom CAD System',                priceFrom: '$50' },
  { icon: '🤖', title: 'Discord Bot',     blurb: 'Limited availability',               priceFrom: '$30' },
]

type Project = {
  side: 'left' | 'right'
  title: string
  client: string
  blurb: string
  tags: string[]
  image: string
}
const PROJECTS: Project[] = [
  {
    side: 'right',
    title: 'Custom Discord Bot',
    client: 'Prime RP',
    blurb:
      'A comprehensive discord bot aimed to manage an entire network of servers.',
    tags: ['Discord'],
    image: '/images/portfolio-1.jpg',
  },
  {
    side: 'left',
    title: 'Portfolio Website',
    client: 'Prince',
    blurb:
      'A minimalist portfolio that showcases work through elegant animations and thoughtful interactions. Powered by Next.js and Tailwind CSS.',
    tags: ['Next.js', 'Tailwind', 'Portfolio'],
    image: '/images/portfolio-2.jpg',
  },
  {
    side: 'right',
    title: 'CAD System',
    client: 'Prime RP',
    blurb:
      'A complete reimagining of emergency dispatch software. Every interaction refined for efficiency, wrapped in a clean, professional interface.',
    tags: ['UI/UX', 'React', 'TypeScript'],
    image: '/images/portfolio-3.jpg',
  },

]

export default function CommissionsPage() {
  const { status } = useSession()

  return (
    <div className="pb-20">
      {/* ===== Hero ===== */}
      <section className="relative border-b border-white/10 bg-[#0b0b0f] py-16 md:py-24">
        <div className="absolute inset-0 bg-diagonal-stripes opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
          {/* Left copy */}
          <div>
            <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-300">
              Custom Development Solutions
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              Bring Your Vision
              <br /> <span className="text-pink-400">To Life</span>
            </h1>
            <p className="mt-4 max-w-xl text-gray-400">
              Specializing in high-performance Next.js, React applications, and FiveM
              development. We transform ideas into seamless digital experiences.
            </p>

            <ol className="mt-6 space-y-3">
              {[
                'Share your vision and requirements',
                'We develop your solution with regular updates',
                'Receive your project with 100% ownership',
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>

            <div className="mt-7">
              {status === 'authenticated' ? (
                <Link
                  href="/commissions/new"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Start a Project <span>↗</span>
                </Link>
              ) : (
                <button
                  onClick={() => import('next-auth/react').then(m => m.signIn('discord', { callbackUrl: '/commissions' })) }
                  className="inline-flex items-center gap-2 rounded-2xl border border-pink-500/40 bg-pink-500/15 px-5 py-3 text-sm font-semibold text-pink-200 hover:bg-pink-500/20"
                >
                  🔒 Login to Start Project
                </button>
              )}
            </div>
          </div>

          {/* Right services list */}
          <div className="flex flex-col gap-4">
            {SERVICES.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: idx * 0.04, ease } }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#17131f]/90 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg">
                    {s.icon}
                  </span>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-gray-400">{s.blurb}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-200">
                  <span className="font-semibold">From {s.priceFrom}</span>
                </div>
              </motion.div>
            ))}

            <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
              <span>🧑‍💻</span> Built with Next.js &amp; React for optimal performance
            </div>
          </div>
        </div>
      </section>

      {/* ===== Portfolio ===== */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">
            Our Portfolio
          </div>
          <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">
            Crafted with precision.
            <br className="hidden md:block" /> Built for performance.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-gray-400">
            Explore our collection of bespoke solutions, each meticulously designed to elevate digital experiences.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
              viewport={{ once: true, amount: 0.25 }}
              className={`grid items-center gap-8 md:grid-cols-2 ${
                p.side === 'right' ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              {/* Text */}
              <div>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-500/30 bg-gradient-to-b from-pink-500/10 to-orange-500/10 text-pink-400">
                  {'</>'}
                </div>
                <h3 className="text-3xl font-bold">{p.title}</h3>
                <div className="mt-1 text-sm text-gray-400">{p.client}</div>
                <p className="mt-3 text-gray-400">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#14101c]">
                <div className="absolute inset-0 bg-diagonal-stripes opacity-[0.12]" />
                <Image
  src={p.image || "/images/placeholder-dark.jpg"}
  alt={p.title}
  width={1280}
  height={720}
  className="relative rounded-2xl"
  unoptimized
  onError={(e) => ((e.target as HTMLImageElement).src = "/images/placeholder-dark.jpg")}
/>

              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
