import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/HeroSection";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import { LocalSection } from "@/components/LocalSection";
import { MenuSection } from "@/components/MenuSection";
import { ContactSection } from "@/components/ContactSection";
import { site } from "@/lib/site-config";
import logo from "@/assets/tpbc-logo.webp";
import heroNight from "@/assets/hero-restaurant-night.jpg.asset.json";

const title = "The Potato Bun Club — Burgers in Amed, Bali";
const description =
  "Good buns, good beer, good times in Amed, Bali. See the menu, follow us on Instagram, and order delivery or takeaway on WhatsApp.";
const siteUrl = "https://thepotatobunclub.com";
const ogImage = `${siteUrl}/og-cover.jpg`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  servesCuisine: "Burgers",
  image: ogImage,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jalan Raya Amed",
    addressLocality: "Amed, Karangasem",
    addressRegion: "Bali",
    addressCountry: "ID",
  },
  openingHours: "Th-Tu 17:00-23:00",
  url: siteUrl,
  sameAs: [site.instagramUrl],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      // Preload the hero photo (LCP image on mobile)
      { rel: "preload", as: "image", href: heroNight.url, fetchPriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: HomePage,
});


function HomePage() {
  return (
    <main>
      <HeroSection />
      <MenuSection />
      <LocalSection />
      <InstagramCarousel />
      <ContactSection />
      <footer className="flex flex-col items-center gap-3 bg-charcoal px-5 pt-[10px] pb-[30px] text-center text-sm text-charcoal-foreground/60">
        <img
          src={logo}
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
