// app/about/page.tsx
'use client'

import { motion, cubicBezier } from 'framer-motion'

const ease = cubicBezier(0.16, 1, 0.3, 1)

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* ===== Hero ===== */}
      <section className="relative border-b border-white/10 bg-[#0b0b0f]">
        <div aria-hidden className="absolute inset-0 bg-diagonal-stripes opacity-[0.06]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center rounded-full border border-pink-400/25 bg-pink-400/10 px-3 py-1 text-xs font-semibold text-pink-300">
              Extraordinary Experiences
            </span>

            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Transforming <span className="text-pink-400">Development</span>
            </h1>

            <p className="mt-4 max-w-xl text-gray-400">
              We&apos;re not just developers; we&apos;re innovators crafting extraordinary
              experiences that redefine what&apos;s possible.
            </p>
          </div>

          {/* Stacked cards (aesthetic) */}
          <div className="relative h-[320px] md:h-[420px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.35, delay: 0.05 * i, ease },
                }}
                className={`absolute inset-0 rounded-[28px] border border-white/10 bg-[radial-gradient(1200px_600px_at_70%_-20%,rgba(255,92,179,.15),transparent),linear-gradient(140deg,#2a1935,40%,#1b1730_70%,#2a2120)]`}
                style={{
                  transform: `translate(${i * 10 - 10}px, ${i * 10 - 10}px)`,
                  filter: `saturate(${1 - i * 0.08}) brightness(${1 - i * 0.05})`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Core Values ===== */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-300">
            Our Philosophy
          </span>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Core Values</h2>
          <p className="mx-auto mt-3 max-w-3xl text-gray-400">
            The principles that drive our innovation and shape our vision.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ValueCard
            title="Innovation"
            accent="from-pink-400 to-orange-300"
            blurb="Pushing boundaries and setting new standards in development. We’re committed to pioneering solutions that elevate your experience."
            delay={0}
          />
          <ValueCard
            title="Quality"
            accent="from-yellow-300 to-amber-500"
            blurb="Crafting exceptional experiences with meticulous attention to detail. Every line of code is written with precision and purpose."
            delay={0.05}
          />
          <ValueCard
            title="Community"
            accent="from-fuchsia-400 to-violet-400"
            blurb="Building and nurturing a thriving ecosystem of developers and users. Together, we’re shaping the future of development."
            delay={0.1}
          />
        </div>
      </section>

      {/* ===== Mini CTA (optional) ===== */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl border border-white/10 bg-[#14101c] p-6 text-center md:p-8"
        >
          <h3 className="text-2xl font-bold">Let’s build something great.</h3>
          <p className="mt-2 text-gray-400">
            Have an idea? We’ll turn it into a performant, polished experience.
          </p>
          <a
            href="/commissions"
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Start a Project
          </a>
        </motion.div>
      </section>
    </div>
  )
}

/* ============== Helpers ============== */

function ValueCard({
  title,
  blurb,
  accent,
  delay = 0,
}: {
  title: string
  blurb: string
  accent: string
  delay?: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.25, delay, ease } }}
      viewport={{ once: true, amount: 0.25 }}
      className="rounded-2xl border border-white/10 bg-[#111015] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] md:p-6"
    >
      <div className="mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-white/10 to-white/10">
        <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${accent}`} />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400">{blurb}</p>
    </motion.article>
  )
}
