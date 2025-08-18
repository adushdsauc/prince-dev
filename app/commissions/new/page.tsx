// app/commissions/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

type Service = "Static Website" | "Dynamic Website" | "Discord Bot" | "CAD/MDT System";

const SERVICES: { key: Service; blurb: string; from: string; icon: string }[] = [
  { key: "Static Website",  blurb: "Fast, responsive design",                from: "From $30", icon: "⚡️" },
  { key: "Dynamic Website", blurb: "Full-stack solution w/ DB integration",  from: "From $60", icon: "🗄️" },
  { key: "Discord Bot",     blurb: "Custom bot development (limited slots)", from: "From $30", icon: "🤖" },
  { key: "CAD/MDT System",   blurb: "Custom server development",              from: "From $20", icon: "🧩" },
];

export default function NewCommissionPage() {
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
    e.preventDefault();           // stop native submit
    submit();                     // use our JS submit
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Start a Project</h1>
        <p className="mt-1 text-gray-400">Tell us about your idea and we’ll get back to you.</p>
      </div>

      {/* Wrap the wizard in a form with noValidate */}
      <form noValidate onSubmit={onSubmit}>
        {/* stepper */}
        <div className="mb-8 flex items-center gap-2 text-xs text-gray-400">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`grid h-6 w-6 place-items-center rounded-full border ${step === n ? "border-white text-white" : "border-white/20"}`}>{n}</div>
              {n < 3 && <div className="h-px w-10 bg-white/10" />}
            </div>
          ))}
        </div>

        {/* step 1 */}
        {step === 1 && (
          <div className="space-y-3">
            <div className="text-sm font-medium">Choose your service</div>
            {SERVICES.map((s) => (
              <label
                key={s.key}
                className={`block cursor-pointer rounded-xl border p-4 ${
                  service === s.key ? "border-white/40 bg-white/5" : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="service"
                      className="accent-white"
                      checked={service === s.key}
                      onChange={() => setService(s.key)}
                    />
                    <div>
                      <div className="font-semibold">{s.icon} {s.key}</div>
                      <div className="text-xs text-gray-400">{s.blurb}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">{s.from}</div>
                </div>
              </label>
            ))}

            <div className="mt-4 flex items-center justify-between">
              <button type="button" onClick={() => history.back()} className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white">Back</button>
              <button type="button" onClick={() => setStep(2)} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">Continue →</button>
            </div>
          </div>
        )}

        {/* step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 text-sm font-medium">Project details</div>

              <label className="mb-3 block text-xs text-gray-300">
                Tell us what you need
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  placeholder="Describe what you want us to build…"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white placeholder:text-gray-500 outline-none"
                  maxLength={500}
                />
              </label>

              <label className="mb-3 block text-xs text-gray-300">
                How many pages do you need?
                <input
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="Example: Homepage, About, Contact"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white placeholder:text-gray-500 outline-none"
                  maxLength={100}
                />
              </label>

              <label className="block text-xs text-gray-300">
                Any design ideas?
                <input
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                  placeholder="Example: modern, dark; brand colors blue/white"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white placeholder:text-gray-500 outline-none"
                  maxLength={200}
                />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button type="button" onClick={() => setStep(1)} className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white">← Back</button>
              <button type="button" onClick={() => setStep(3)} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">Continue →</button>
            </div>
          </div>
        )}

        {/* step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 text-sm font-medium">Timeline & budget</div>

              <label className="mb-3 block text-xs text-gray-300">
                What’s your budget?
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Example: $30–50, or $100 max"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white placeholder:text-gray-500 outline-none"
                  maxLength={50}
                />
              </label>

              <label className="mb-3 block text-xs text-gray-300">
                When do you need this by?
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="Example: within 2 weeks"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white placeholder:text-gray-500 outline-none"
                  maxLength={50}
                />
              </label>

              <label className="block text-xs text-gray-300">
                Contact email (optional)
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white placeholder:text-gray-500 outline-none"
                  maxLength={100}
                />
              </label>
            </div>

            {fieldError && (
              <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-300">
                {fieldError}
              </div>
            )}

            {msg && (
              <div className={`rounded-lg p-3 text-sm ${msg.type === "ok" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
                {msg.text}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button type="button" onClick={() => setStep(2)} className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white">← Back</button>
              {/* submit via form onSubmit */}
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Submit Request →"}
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
