export const metadata = { title: 'Commissions — Prince\'s Development' }

export default function CommissionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Commissions</h1>
      <p className="mt-2 text-gray-600">
        Need something custom? I build Discord bots, CAD/MDT systems, payment-enabled dashboards, and full-stack web apps.
      </p>
      <div className="mt-8 grid gap-6">
        <div className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">Discord Bots</h3>
          <p className="mt-1 text-gray-600">Moderation, ticketing, economy, shifts, webhooks, Stripe payments, Google Sheets, and more.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">CAD/MDT & RP Systems</h3>
          <p className="mt-1 text-gray-600">Civilian/Police/EMS flows, DMV, wallet/bank, citations & fines, warrants, dashboards.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">Web Apps & APIs</h3>
          <p className="mt-1 text-gray-600">Next.js, MongoDB, REST/GraphQL, OAuth, Admin panels.</p>
        </div>
      </div>
      <div className="mt-10 rounded-xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">Request a Quote</h2>
        <p className="mt-1 text-gray-600">Email: <a href="mailto:contact@princes.dev" className="underline">contact@princes.dev</a></p>
      </div>
    </div>
  )
}