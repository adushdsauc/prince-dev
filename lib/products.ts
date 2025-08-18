export type Media = { type: "image" | "video"; src: string; alt?: string };

export type Product = {
  slug: string;
  title: string;
  subtitle?: string;
  price: number; // in USD for now
  badge?: string; // e.g., "standalone"
  label?: string; // e.g., "Open Source"
  description?: string;
  cover: string;      // hero image
  media?: Media[];    // gallery / preview
};

export const PRODUCTS: Product[] = [
  {
    slug: "moderation-bot",
    title: "Moderation Bot",
    subtitle: "Essential Moderation Commands. No bloat. Just the basics.",
    price: 5.0,
    badge: "standalone",
    label: "Open Source",
    description:
      "Basic Moderation Bot, service any community.",
    cover: "/products/simplified-speedo/hero.jpg",
    media: [
      { type: "image", src: "/products/simplified-speedo/shot-1.jpg", alt: "Speedo UI" },
      { type: "video", src: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, // replace with your video
    ],
  },
];
