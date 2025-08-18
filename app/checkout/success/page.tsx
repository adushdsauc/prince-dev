// app/checkout/success/page.tsx
"use client";

import { Suspense } from "react";
import SuccessInner from "./SuccessInner";

// disable static prerender
export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
