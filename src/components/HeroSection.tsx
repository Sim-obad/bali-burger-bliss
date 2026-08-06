import { useEffect, useState } from "react";

import { waLinks } from "@/lib/site-config";
import heroNight from "@/assets/hero-restaurant-night.jpg";
import palmTree from "@/assets/palm-tree.png";
import logo from "@/assets/tpbc-logo.png.asset.json";

export function HeroSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(window.scrollY * 0.1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-charcoal-foreground lg:grid lg:min-h-[92svh] lg:grid-cols-[46%_1fr]">
      {/* Photograph — full bleed on mobile, right column on desktop */}
      <div className="absolute inset-0 overflow-hidden lg:relative lg:col-start-2 lg:row-start-1 lg:inset-auto lg:h-full">
        <img
          src={heroNight}
          alt="The Potato Bun Club restaurant in Amed, Bali at blue hour, warm lights and a full dining room"
          width={1920}
          height={1280}
          className="h-[110%] w-full object-cover"
          style={{ transform: `translate3d(0, -${offset}px, 0)` }}
        />
        <div className="absolute inset-0 bg-charcoal/70 lg:bg-charcoal/25" />
        <div className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-charcoal to-transparent lg:hidden" />
      </div>

      {/* Handwritten block + palm — upper right */}
      <div
        className="hero-fade absolute right-5 top-8 z-10 flex items-center gap-3 sm:right-8 sm:top-10 lg:right-12 lg:top-12"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex flex-col items-end text-right">
          <p className="font-marker text-sm uppercase leading-[1.5] text-charcoal-foreground sm:text-base lg:text-lg">
            Daily made
            <br />
            butter toasted
            <br />
            potato buns
          </p>
          <span className="my-3 block h-px w-28 bg-charcoal-foreground/60 sm:w-40" />
          <p className="font-marker text-sm uppercase text-charcoal-foreground sm:text-base lg:text-lg">
            Amed, Bali
          </p>
        </div>
        <img
          src={palmTree}
          alt=""
          aria-hidden="true"
          width={512}
          height={1024}
          className="h-[7rem] w-auto opacity-85 sm:h-[8.5rem] [filter:brightness(0)_invert(1)]"
        />
      </div>

      {/* Title + CTAs */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 lg:col-start-1 lg:row-start-1 lg:min-h-0 lg:justify-center lg:bg-charcoal lg:px-12 lg:py-16">
        <h1 className="hero-fade flex flex-col uppercase leading-[0.82] tracking-[0.01em]">
          <span className="text-[15vw] lg:text-[7.5vw]">The</span>
          <span className="text-[15vw] lg:text-[7.5vw]">Potato</span>
          <span className="flex items-center gap-4 lg:gap-6">
            <span className="flex flex-col">
              <span className="text-[15vw] lg:text-[7.5vw]">Bun</span>
              <span className="text-[15vw] lg:text-[7.5vw]">Club</span>
            </span>
            <img
              src={logo.url}
              alt="The Potato Bun Club logo"
              width={320}
              height={320}
              className="h-[24.6vw] w-auto lg:h-[12.3vw]"
            />
          </span>
        </h1>

        <div
          className="hero-fade mt-9 flex w-full max-w-[22rem] flex-col gap-3"
          style={{ animationDelay: "160ms" }}
        >
          <a
            href={waLinks.order}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-between rounded-xl bg-charcoal-foreground px-6 font-subhead text-base font-bold uppercase tracking-[0.04em] text-charcoal"
          >
            Order on WhatsApp
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-charcoal text-charcoal-foreground">
              <MessageCircle className="h-4 w-4" aria-hidden />
            </span>
          </a>
          <a
            href="#menu"
            className="inline-flex h-14 items-center justify-center rounded-xl border border-charcoal-foreground/80 bg-charcoal/40 px-6 font-subhead text-base font-bold uppercase tracking-[0.04em] text-charcoal-foreground transition-colors hover:bg-charcoal-foreground/10"
          >
            See the menu
          </a>
        </div>
      </div>
    </section>
  );
}
