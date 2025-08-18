"use client";

import { useState } from "react";

type Service = "Static Website" | "Dynamic Website" | "Discord Bot" | "FiveM Script";

const SERVICES: { key: Service; desc: string; from: string; icon: string }[] = [
  { key: "Static Website", desc: "Fast, responsive website with modern design", from: "From $30", icon: "⚡" },
  { key: "Dynamic Website", desc: "Full-stack solution with database integration", from: "From $60", icon: "🗄️" },
  { key: "Discord Bot", desc: "Custom bot development (limited availability)", from: "From $30", icon: "🤖" },
  { key: "FiveM Script", desc: "Custom server development", from: "From $20", icon: "⌥" },
];

export default function StartProjectModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1
  const [service, setService] = useState<Service>("Static Website");

  // Step 2
  const [details, setDetails] = useState("");
  const [pages, setPages] = useState("");
  const [design, setDesign] = useState("");

  // Step 3
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const resetAll = () => {
    setStep(1);
    setService("Static Website");
    setDetails(""); setPages(""); setDesign("");
    setBudget(""); setTimeline(""); setEmail("");
    setMsg(null);
  };

  async function submit() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          details: details.trim(),
          pages: pages.trim(),
          design: design.trim(),
          budget: budget.trim(),
          timeline: timeline.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to submit");

      setMsg({ type: "ok", text: "Submitted! We’ll reach out shortly." });
      // optional: auto-close after a moment
      setTimeout(() => { setOpen(false); resetAll(); }, 1500);
    } catch (e: any) {
      setMsg({ type: "err", text: e?.message ?? "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Trigger button – place this wherever you want */}
      <button
        onClick={() => { setOpen(true); }}
        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      >
        Start a Project
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setOpen(false); resetAll(); }} />
          <div className="relative mx-4 w-full max-w-2xl rounded-2xl bg-[#121217] p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Start a Project</h2>
              <button onClick={() => { setOpen(false); resetAll(); }} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {/* Stepper */}
            <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div className={`grid h-6 w-6 place-items-center rounded-full border ${step === n ? "border-white text-white" : "border-white/20"}`}>{n}</div>
                  {n < 3 && <div className="h-px w-10 bg-white/10" />}
                </div>
              ))}
            </div>

            {/* Steps */}
            {step === 1 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Choose Your Service</h3>
                <p className="text-xs text-gray-400">Select the service that best fits your needs</p>

                <div className="mt-3 space-y-3">
                  {SERVICES.map((s) => (
                    <label
                      key={s.key}
                      className={`block cursor-pointer rounded-xl border p-4 transition ${
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
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                              <span>{s.icon}</span>
                              <span>{s.key}</span>
                            </div>
                            <div className="text-xs text-gray-400">{s.desc}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-300">{s.from}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 text-sm font-medium text-white">Project Details</div>

                  <label className="mb-3 block text-xs text-gray-300">
                    Tell us what you need
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={4}
                      placeholder="Describe what you want us to make for you…"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white outline-none placeholder:text-gray-500"
                      maxLength={500}
                    />
                  </label>

                  <label className="mb-3 block text-xs text-gray-300">
                    How many pages do you need?
                    <input
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      placeholder="Example: Homepage, About, Contact"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white outline-none placeholder:text-gray-500"
                      maxLength={100}
                    />
                  </label>

                  <label className="block text-xs text-gray-300">
                    Any design ideas?
                    <input
                      value={design}
                      onChange={(e) => setDesign(e.target.value)}
                      placeholder="Example: modern, dark mode; brand colors blue & white"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white outline-none placeholder:text-gray-500"
                      maxLength={200}
                    />
                  </label>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 text-sm font-medium text-white">Timeline & Budget</div>

                  <label className="mb-3 block text-xs text-gray-300">
                    What’s your budget?
                    <input
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Example: $30–50, or $100 maximum"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white outline-none placeholder:text-gray-500"
                      maxLength={50}
                    />
                  </label>

                  <label className="mb-3 block text-xs text-gray-300">
                    When do you need this by?
                    <input
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="Example: Within 2 weeks, or by next month"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white outline-none placeholder:text-gray-500"
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
                      className="mt-1 w-full rounded-lg border border-white/10 bg-[#0b0b0f] p-3 text-sm text-white outline-none placeholder:text-gray-500"
                      maxLength={100}
                    />
                  </label>
                </div>

                {msg && (
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      msg.type === "ok" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-60"
                  >
                    {loading ? "Submitting…" : "Submit Request →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
