// app/api/commissions/route.ts
import { NextResponse } from "next/server";

type Payload = {
  service: "Static Website" | "Dynamic Website" | "Discord Bot" | "CAD/MDT System"; // <-- plural
  pages?: string;
  details?: string;
  design?: string;
  budget?: string;
  timeline?: string;
  email?: string;
};

const SERVICE_COLORS: Record<string, number> = {
  "Static Website": 0x60a5fa,
  "Dynamic Website": 0x34d399,
  "Discord Bot": 0xf472b6,
  "CAD/MDT System": 0xf59e0b, // <-- match
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Basic validation
    if (!body?.service) {
      return NextResponse.json({ ok: false, error: "Missing service" }, { status: 400 });
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (!webhook) {
      return NextResponse.json({ ok: false, error: "Missing DISCORD_WEBHOOK_URL" }, { status: 500 });
    }

    // Build a clean embed
    const fields = [
      body.pages ? { name: "Pages / Scope", value: body.pages.slice(0, 1024) } : null,
      body.details ? { name: "Project Details", value: body.details.slice(0, 1024) } : null,
      body.design ? { name: "Design Ideas", value: body.design.slice(0, 1024) } : null,
      body.budget ? { name: "Budget", value: body.budget.slice(0, 1024), inline: true } : null,
      body.timeline ? { name: "Timeline", value: body.timeline.slice(0, 1024), inline: true } : null,
      body.email ? { name: "Contact Email", value: body.email.slice(0, 1024), inline: true } : null,
    ].filter(Boolean);

    const embed = {
      title: `New Commission – ${body.service}`,
      color: SERVICE_COLORS[body.service] ?? 0x6366f1,
      timestamp: new Date().toISOString(),
      fields,
      footer: { text: "Start a Project form" },
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Commission Bot",
        avatar_url:
          "https://cdn-icons-png.flaticon.com/512/5968/5968853.png", // optional
        embeds: [embed],
      }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: `Discord webhook failed: ${res.status} ${txt}` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
