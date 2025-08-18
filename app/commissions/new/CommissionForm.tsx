// app/commissions/new/CommissionForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

type Service = "Static Website" | "Dynamic Website" | "Discord Bot" | "CAD/MDT System";

const SERVICES: { key: Service; blurb: string; from: string; icon: string }[] = [
  { key: "Static Website",  blurb: "Fast, responsive design",                from: "From $30", icon: "⚡️" },
  { key: "Dynamic Website", blurb: "Full-stack solution w/ DB integration",  from: "From $60", icon: "🗄️" },
  { key: "Discord Bot",     blurb: "Custom bot development (limited slots)", from: "From $30", icon: "🤖" },
  { key: "CAD/MDT System",  blurb: "Custom server development",              from: "From $20", icon: "🧩" },
];

export default function CommissionForm() {
  const { status } = useSession();
  const router = useRouter();
  const q = useSearchParams();

  const initialService = (q.get("service") as Service) || "Static Website";

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // step 1
  const [service, setService] = useState<Service>(initialService);

  // step 2
  const [details, setDetails] = useState("");
  const [pages, setPages] = useState("");
  const [design, setDesign] = useState("");

  // step 3
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [email, setEmail] = useState("");

  // ui
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  function validate() {
    setFieldError(null);
    const e = email.trim();
    if (e.length === 0) return true; // optional
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    if (!ok) {
      setFieldError("Please enter a valid email address (or leave it blank).");
      return false;
    }
    return true;
  }

  async function submit() {
    if (!validate()) return;
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          details,
          pages,
          design,
          budget,
          timeline,
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to submit");

      setMsg({ type: "ok", text: "Submitted! We’ll reach out soon." });
      setTimeout(() => router.replace("/commissions?submitted=1"), 800);
    } catch (e: any) {
      setMsg({ type: "err", text: e?.message ?? "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  if (status === "unauthenticated") {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold">Start a Project</h1>
        <p className="mt-2 text-gray-400">Log in with Discord to continue.</p>
        <button
          onClick={() => signIn("discord", { callbackUrl: "/commissions/new" })}
          className="mt-6 rounded-xl border border-pink-500/40 bg-pink-500/15 px-5 py-3 text-sm font-semibold text-pink-200 hover:bg-pink-500/20"
        >
          Login with Discord
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {/* … keep your existing form/wizard code here … */}
    </main>
  );
}
