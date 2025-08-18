// app/api/support/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { subject, message, user } = await req.json()

    if (!subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Optional: forward to Discord via webhook
    const webhook = process.env.DISCORD_TICKETS_WEBHOOK
    if (webhook) {
      const content = [
        `**New Support Ticket**`,
        `**Subject:** ${subject}`,
        `**From:** ${user?.name ?? 'Guest'} ${user?.id ? `(Discord ID: ${user.id})` : ''}`,
        '```',
        message,
        '```',
      ].join('\n')

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
    }

    // You could also write to a DB here...

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
