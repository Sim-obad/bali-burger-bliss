import { site, waLinks } from "@/lib/site-config";
import heroBurger from "@/assets/hero-burger.jpg";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-charcoal text-charcoal-foreground">
      <img
        src={heroBurger}
        alt="Smash burger on a golden potato bun at The Potato Bun Club in Amed, Bali"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/45 to-charcoal" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-3xl flex-col justify-end px-5 pb-14 pt-24 sm:px-8">
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
          Amed · Bali
        </span>
        <h1 className="text-[2.75rem] uppercase leading-[0.92] sm:text-7xl">
          The Potato
          <br />
          Bun Club
        </h1>
        <p className="mt-5 max-w-md text-lg text-charcoal-foreground/85">
          {site.tagline} Hand-pressed patties, house sauces, and fries worth the
          walk from the beach.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLinks.order}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Order on WhatsApp
          </a>
          <a
            href="#menu"
            className="inline-flex h-14 items-center justify-center rounded-full border border-charcoal-foreground/30 bg-charcoal-foreground/5 px-8 text-base font-bold uppercase tracking-wide text-charcoal-foreground backdrop-blur transition-colors hover:bg-charcoal-foreground/15"
          >
            See the menu
          </a>
        </div>
      </div>
    </section>
  );
}
