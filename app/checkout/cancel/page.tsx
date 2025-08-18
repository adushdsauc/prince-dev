export default function CancelPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold text-white">Checkout canceled</h1>
      <p className="mt-2 text-sm text-gray-400">Your cart is still saved if you want to try again.</p>
      <a href="/cart" className="mt-6 inline-block rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
        Back to Cart
      </a>
    </main>
  )
}
