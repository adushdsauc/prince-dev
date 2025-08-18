'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";

type CartItem = { productId: string; title: string; price: number; image: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  totalQty: number;
};

const Ctx = createContext<CartCtx | null>(null);
export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

const KEY = "cart_v1";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const changed = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
    changed.current = true;
  }, [items]);

  // Sync with server when authenticated
  useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      // 1) load server cart
      const res = await fetch("/api/cart", { cache: "no-store" });
      const server = (await res.json())?.items ?? [];
      // 2) if we have local changes, merge them into server
      if ((items?.length ?? 0) > 0 && changed.current) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        changed.current = false;
        const latest = await (await fetch("/api/cart", { cache: "no-store" })).json();
        setItems(latest.items ?? []);
      } else {
        setItems(server);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const api: CartCtx = useMemo(() => ({
    items,
    add: (item, qty = 1) => {
      setItems((prev) => {
        const map = new Map(prev.map((p) => [p.productId, p]));
        const cur = map.get(item.productId);
        if (cur) cur.qty = Math.max(1, cur.qty + qty);
        else map.set(item.productId, { ...item, qty: Math.max(1, qty) });
        return Array.from(map.values());
      });
    },
    remove: (productId) => setItems((prev) => prev.filter((p) => p.productId !== productId)),
    setQty: (productId, qty) =>
      setItems((prev) =>
        prev.map((p) => (p.productId === productId ? { ...p, qty: Math.max(1, qty) } : p)),
      ),
    clear: () => setItems([]),
    subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
    totalQty: items.reduce((s, i) => s + i.qty, 0),
  }), [items]);

  // push to server on any subsequent change while authed
  useEffect(() => {
    const id = setTimeout(async () => {
      if (status !== "authenticated") return;
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    }, 300);
    return () => clearTimeout(id);
  }, [items, status]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
