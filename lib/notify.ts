export async function notifyDiscordSales(payload: {
    title: string
    description?: string
    fields?: { name: string; value: string; inline?: boolean }[]
  }) {
    const url = process.env.DISCORD_SALES_WEBHOOK_URL
    if (!url) {
      console.warn('[discord] DISCORD_SALES_WEBHOOK_URL missing; skipping notification')
      return
    }
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Store Bot',
        embeds: [{
          title: payload.title,
          description: payload.description,
          color: 0x22c55e,
          fields: payload.fields,
        }],
      }),
    }).catch(err => console.error('[discord] notify error:', err))
  }
  