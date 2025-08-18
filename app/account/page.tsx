export const metadata = { title: 'Account' }

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-white">Account</h1>
      <p className="mt-2 text-sm text-gray-400">
        Manage your profile, orders, and settings. (Stub page — we’ll flesh this out.)
      </p>
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium text-white">Profile</h2>
          <p className="mt-1 text-sm text-gray-400">Name, email, avatar</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium text-white">Orders</h2>
          <p className="mt-1 text-sm text-gray-400">Past purchases & downloads</p>
        </div>
      </section>
    </main>
  )
}
