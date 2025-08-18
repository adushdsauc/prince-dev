// app/commissions/new/page.tsx
"use client";

import { Suspense } from "react";
import CommissionForm from "./CommissionForm";

export default function NewCommissionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <CommissionForm />
    </Suspense>
  );
}
