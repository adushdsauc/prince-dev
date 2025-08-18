// app/api/cart/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { dbConnect } from '@/lib/mongo'
import Cart, { type ICart, type ICartItem } from '@/models/Cart'

export async function GET() {
  const session = await getServerSession(authOptions)
  const uid = (session?.user as any)?.id
  if (!uid) return NextResponse.json({ items: [] }, { status: 200 })

  await dbConnect()
  const doc = await Cart.findOne({ userId: uid }).lean<ICart | null>()
  return NextResponse.json({ items: doc?.items ?? [] })
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  const uid = (session?.user as any)?.id
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const items = (Array.isArray(body?.items) ? body.items : []) as ICartItem[]

  await dbConnect()
  const saved = await Cart.findOneAndUpdate(
    { userId: uid },
    { userId: uid, items },
    { upsert: true, new: true }
  ).lean<ICart | null>()

  return NextResponse.json({ items: saved?.items ?? [] })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const uid = (session?.user as any)?.id
  if (!uid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const incoming = (Array.isArray(body?.items) ? body.items : []) as ICartItem[]

  await dbConnect()
  const existing = await Cart.findOne({ userId: uid }).lean<ICart | null>()

  const map = new Map<string, ICartItem>()
  for (const i of existing?.items ?? []) map.set(i.productId, { ...i })
  for (const i of incoming) {
    const cur = map.get(i.productId)
    if (cur) cur.qty = Math.max(1, cur.qty + (i.qty ?? 1))
    else map.set(i.productId, { ...i, qty: Math.max(1, i.qty ?? 1) })
  }

  const merged = Array.from(map.values())
  const saved = await Cart.findOneAndUpdate(
    { userId: uid },
    { userId: uid, items: merged },
    { upsert: true, new: true }
  ).lean<ICart | null>()

  return NextResponse.json({ items: saved?.items ?? [] })
}
