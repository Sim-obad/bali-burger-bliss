import { site, waLinks } from "@/lib/site-config";
import heroBurger from "@/assets/hero-burger.jpg";
import logo from "@/assets/tpbc-logo.png.asset.json";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-charcoal text-charcoal-foreground">
      <img
        src={heroBurger}
        alt="Smash burger on a golden potato bun at The Potato Bun Club in Amed, Bali"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-3xl flex-col justify-end px-5 pb-14 pt-16 sm:px-8">
        <img
          src={logo.url}
          alt="The Potato Bun Club logo — Amed, Bali"
          width={320}
          height={320}
          className="mb-6 h-32 w-32 sm:h-40 sm:w-40"
        />
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-charcoal-foreground px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
          Amed · Bali
        </span>
        <h1 className="text-[2.75rem] uppercase leading-[0.92] sm:text-7xl">
          The Potato
          <br />
          Bun Club
        </h1>
        <p className="mt-5 max-w-md text-lg text-charcoal-foreground/85">
          <span className="font-marker block text-xl text-charcoal-foreground">
            {site.tagline}
          </span>
          <span className="mt-2 block">
            Hand-pressed patties, house sauces, and fries worth the walk from the beach.
          </span>
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLinks.order}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center rounded-full bg-charcoal-foreground px-8 text-base font-bold uppercase tracking-wide text-charcoal transition-transform hover:scale-[1.02] active:scale-95"
          >
            Order on WhatsApp
          </a>
          <a
            href="#menu"
            className="inline-flex h-14 items-center justify-center rounded-full border border-charcoal-foreground/40 bg-charcoal-foreground/5 px-8 text-base font-bold uppercase tracking-wide text-charcoal-foreground backdrop-blur transition-colors hover:bg-charcoal-foreground/15"
          >
            See the menu
          </a>
        </div>
      </div>
    </section>
  );
}
