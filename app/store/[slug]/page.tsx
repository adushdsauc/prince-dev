// app/store/[slug]/page.tsx
import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  return {
    title: product ? product.title : "Product",
    description: product?.subtitle ?? "Product details",
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound(); // ✅ don't "return notFound()", just call it

  const cover = product.cover || "/images/placeholder-dark.jpg";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Top: media + summary */}
      <section className="grid gap-8 md:grid-cols-5">
        {/* Media / Hero */}
        <div className="md:col-span-3">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={cover}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-diagonal-stripes opacity-[0.12]" />
          </div>

          {product.badge && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                <span className="text-[10px]">⌘</span> {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="md:col-span-2">
          <h1 className="text-3xl font-semibold text-white">{product.title}</h1>
          {product.subtitle && <p className="mt-2 text-sm text-gray-400">{product.subtitle}</p>}

          <div className="mt-6 flex items-center gap-4">
            <div className="text-2xl font-semibold text-white">${product.price.toFixed(2)}</div>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cursor-not-allowed rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-gray-300"
              title="Cart coming soon"
            >
              Add to Cart
            </button>
          </div>

          {product.label && (
            <div className="mt-4 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
              <span className="text-sm text-gray-300">{product.label}</span>
            </div>
          )}

          {product.description && (
            <p className="mt-6 text-sm leading-6 text-gray-300">{product.description}</p>
          )}
        </aside>
      </section>

      {/* Preview */}
      {!!product.media?.length && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">Preview</h2>
          <p className="mt-1 text-sm text-gray-400">Take a closer look at {product.title}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {product.media!.map((m, i) =>
              m.type === "image" ? (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={m.src || "/images/placeholder-dark.jpg"}
                      alt={m.alt ?? product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="aspect-video">
                    <iframe
                      src={m.src}
                      title={`${product.title} video ${i + 1}`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}
