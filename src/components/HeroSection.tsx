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
      frame = requestAnimationFrame(() => setOffset(window.scrollY * 0.12));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-charcoal-foreground">
      <img
        src={heroNight}
        alt="The Potato Bun Club restaurant in Amed, Bali at blue hour, warm lights and a full dining room"
        width={1920}
        height={1280}
        className="absolute inset-0 h-[112%] w-full object-cover"
        style={{ transform: `translate3d(0, -${offset}px, 0)` }}
      />
      <div className="absolute inset-0 bg-charcoal/65" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-12">
        {/* Upper-right handwritten block + palm */}
        <div className="hero-fade flex justify-end" style={{ animationDelay: "80ms" }}>
          <div className="flex items-stretch gap-3 sm:gap-5">
            <div className="flex flex-col items-end text-right">
              <p className="font-marker text-sm leading-[1.5] text-charcoal-foreground sm:text-base">
                Daily made
                <br />
                butter toasted
                <br />
                potato buns
              </p>
              <span className="my-3 block h-px w-24 bg-charcoal-foreground/50 sm:w-32" />
              <p className="font-subhead text-xs font-bold uppercase tracking-[0.32em] text-charcoal-foreground/85 sm:text-sm">
                Amed, Bali
              </p>
            </div>
            <img
              src={palmTree}
              alt=""
              aria-hidden="true"
              width={512}
              height={1024}
              className="w-auto self-stretch opacity-70 [filter:brightness(0)_invert(1)]"
            />
          </div>
        </div>

        {/* Left stacked title */}
        <div className="mt-auto">
          <h1 className="hero-fade flex flex-col uppercase leading-[0.82] tracking-[0.01em]">
            <span className="text-[15vw] sm:text-[8.5rem] lg:text-[10rem]">The</span>
            <span className="text-[15vw] sm:text-[8.5rem] lg:text-[10rem]">Potato</span>
            <span className="flex items-stretch gap-4 sm:gap-6">
              <span className="flex flex-col">
                <span className="text-[15vw] sm:text-[8.5rem] lg:text-[10rem]">Bun</span>
                <span className="text-[15vw] sm:text-[8.5rem] lg:text-[10rem]">Club</span>
              </span>
              <img
                src={logo.url}
                alt="The Potato Bun Club logo"
                width={320}
                height={320}
                className="w-auto self-stretch"
              />
            </span>
          </h1>

          <div
            className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "160ms" }}
          >
            <a
              href={waLinks.order}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full bg-charcoal-foreground px-8 font-subhead text-sm font-bold uppercase tracking-[0.14em] text-charcoal"
            >
              Order on WhatsApp
            </a>
            <a
              href="#menu"
              className="inline-flex h-14 items-center justify-center rounded-full border border-charcoal-foreground/70 px-8 font-subhead text-sm font-bold uppercase tracking-[0.14em] text-charcoal-foreground transition-colors hover:bg-charcoal-foreground/10"
            >
              See the menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
