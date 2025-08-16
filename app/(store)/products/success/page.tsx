import Link from 'next/link'

export const metadata = { title: 'Payment Success — Prince\'s Development' }

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold">Thank you! 🎉</h1>
      <p className="mt-2 text-gray-700">Your payment was successful. A receipt has been emailed to you by Stripe.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/downloads" className="rounded-lg bg-brand-600 px-5 py-3 text-white font-medium">Go to Downloads</Link>
        <Link href="/products" className="rounded-lg border px-5 py-3 font-medium">Back to Store</Link>
      </div>
    </div>
  )
}