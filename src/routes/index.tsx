import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/HeroSection";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import { MenuSection } from "@/components/MenuSection";
import { ContactSection } from "@/components/ContactSection";
import { site } from "@/lib/site-config";
import logo from "@/assets/tpbc-logo.png.asset.json";


const title = "The Potato Bun Club — Burgers in Amed, Bali";
const description =
  "Good buns, good beer, good times in Amed, Bali. See the menu, follow us on Instagram, and order delivery or takeaway on WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: "Burgers",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jalan Raya Amed",
    addressLocality: "Amed, Karangasem",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
  openingHours: "Mo-Su 11:00-22:00",
  url: site.instagramUrl,
};

function HomePage() {
  return (
    <main>
      <HeroSection />
      <InstagramCarousel />
      <MenuSection />
      <ContactSection />
      <footer className="flex flex-col items-center gap-3 bg-charcoal px-5 pb-10 text-center text-sm text-charcoal-foreground/60">
        <img
          src={logo.url}
          alt="The Potato Bun Club logo"
          width={96}
          height={96}
          loading="lazy"
          className="h-16 w-16"
        />
        <span>
          © {new Date().getFullYear()} {site.name} · Amed, Bali
        </span>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
