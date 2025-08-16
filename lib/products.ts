export type CatalogItem = {
    id: string
    name: string
    description: string
    priceCents: number
    image: string
    stripePriceId?: string // Replace with real price IDs from Stripe
  }
  
  export const products: CatalogItem[] = [
    {
      id: 'bot-starter',
      name: 'Discord Bot Starter',
      description: 'Command handler, MongoDB models, slash commands, and logging.',
      priceCents: 1999,
      image: '/placeholder.png',
      stripePriceId: '' // e.g. 'price_12345'
    },
    {
      id: 'cad-starter',
      name: 'CAD/MDT Starter',
      description: 'Next.js + REST API skeleton with auth-ready structure.',
      priceCents: 3999,
      image: '/placeholder.png',
      stripePriceId: ''
    },
    {
      id: 'payments-kit',
      name: 'Stripe Payments Kit',
      description: 'Drop-in Stripe Checkout + webhook boilerplate.',
      priceCents: 1499,
      image: '/placeholder.png',
      stripePriceId: ''
    }
  ]