import Link from 'next/link'

export const metadata = { title: 'Payment Canceled — Prince\'s Development' }

export default function CancelPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Payment canceled</h1>
      <p className="mt-2 text-gray-700">No charges were made. You can resume shopping anytime.</p>
      <div className="mt-8">
        <Link href="/products" className="rounded-lg bg-brand-600 px-5 py-3 text-white font-medium">Return to Store</Link>
      </div>
    </div>
  )
}