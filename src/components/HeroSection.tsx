import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal text-charcoal-foreground lg:min-h-[760px]">
      {/* Photograph — full bleed */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroNight}
          alt="The Potato Bun Club restaurant in Amed, Bali at blue hour, warm lights and a full dining room"
          width={1920}
          height={1280}
          className="h-[110%] w-full object-cover object-[50%_60%]"
          style={{ transform: `translate3d(0, -${offset}px, 0)` }}
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-charcoal/85 via-charcoal/45 to-transparent lg:w-[70%]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 pb-12 pt-10 sm:px-8 sm:pt-12 lg:min-h-[760px] lg:px-12 lg:pt-14">
        <div className="flex items-start justify-between gap-6">
          <h1 className="hero-fade flex flex-col gap-[0.12em] uppercase leading-[0.82] tracking-[0.01em]">
            <span className="text-[15vw] lg:text-[7.5vw]">The</span>
            <span className="text-[15vw] lg:text-[7.5vw]">Potato</span>
            <span className="flex items-center gap-4 lg:gap-6">
              <span className="flex flex-col gap-[0.12em]">
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

          {/* Handwritten block + palm — top aligned with the title */}
          <div
            className="hero-fade flex shrink-0 items-start gap-3"
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
        </div>

        <div
          className="hero-fade mt-10 flex w-full max-w-[22rem] flex-col gap-3"
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
