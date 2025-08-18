export const metadata = {
    title: "FAQ",
    description: "Frequently asked questions about our site, store, and services.",
  };
  
  export default function FAQPage() {
    const faqs = [
      {
        q: "What is this site?",
        a: "A hub for our community, products, and updates. We’ll keep expanding features over time.",
      },
      {
        q: "How do purchases work?",
        a: "Right now purchases are informational only. Stripe checkout integration is coming soon.",
      },
      {
        q: "Do I need an account?",
        a: "Some features (forums, orders) will require an account once released. For now you can browse freely.",
      },
      {
        q: "How do I contact support?",
        a: "Use the contact link in the footer or email support@example.com. We typically reply within 24–48 hours.",
      },
    ];
  
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-white">FAQ</h1>
          <p className="mt-2 text-sm text-gray-400">
            Quick answers to common questions. We’ll keep this page updated as new features roll out.
          </p>
        </header>
  
        {/* FAQ list using native details/summary for zero-JS accordions */}
        <section className="space-y-4">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-4 open:bg-white/10 transition"
            >
              <summary className="cursor-pointer select-none text-base font-medium text-white outline-none">
                {item.q}
              </summary>
              <div className="mt-2 text-sm leading-6 text-gray-300">{item.a}</div>
            </details>
          ))}
        </section>
  
        {/* Still need help */}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Still need help?</h2>
          <p className="mt-2 text-sm text-gray-300">
            Can’t find the answer you’re looking for? Reach out and we’ll get back to you.
          </p>
          <div className="mt-4">
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Contact Support
            </a>
          </div>
        </section>
      </main>
    );
  }
  