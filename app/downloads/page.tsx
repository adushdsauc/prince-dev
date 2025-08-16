export const metadata = { title: 'Downloads — Prince\'s Development' }

export default function DownloadsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Downloads</h1>
      <p className="mt-2 text-gray-600">After purchase, your download links will be emailed automatically. Contact me if you need help accessing files.</p>
      <ul className="mt-6 list-disc pl-6 text-gray-700">
        <li>Basic Bot Template — includes command handler and MongoDB setup.</li>
        <li>CAD/MDT Starter — frontend + API skeleton.</li>
        <li>Stripe-Ready Checkout boilerplate for web apps.</li>
      </ul>
    </div>
  )
}