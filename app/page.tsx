import Hero from "../components/Hero";
import FeaturedCarousel, { FeaturedItem } from "../components/FeaturedCarousel";

const featured: FeaturedItem[] = [
  {
    id: "moderation-bot",
    title: "Moderation Bot",
    blurb: "Essential Moderation Bot. No bloat. Just the basics.",
    price: "$5.00",
    image: "/placeholder.png",
    badge: "Available Now",
  },
  {
    id: "network-utilities-bot",
    title: "Network Utilities Bot",
    blurb: "Your one-stop bot, everything from moderation to tickets.",
    price: "$15",
    image: "/placeholder.png",
    badge: "Preorder",
  },

];

export default function HomePage() {
  return (
    <div className="bg-[#0b0b0f] text-white min-h-screen">
      <main>
        <Hero />
        <FeaturedCarousel items={featured} />
      </main>
    </div>
  );
}
