import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Products — Prince\'s Development'
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-3xl font-bold">Products</h2>
      <p className="mt-2 text-gray-600">Instant-delivery scripts and utilities. Checkout is powered by Stripe.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}