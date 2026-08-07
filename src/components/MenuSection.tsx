import { useState } from "react";
import {
  ArrowRight,
  CupSoda,
  Drumstick,
  IceCreamCone,
  Popcorn,
  Sandwich,
  TreePalm,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import menuImage from "@/assets/menu.jpg";

const categories = [
  {
    icon: Sandwich,
    title: "Smash burgers",
    text: "Hand-pressed patties, crispy edges, juicy inside.",
  },
  {
    icon: Drumstick,
    title: "Chicken burgers",
    text: "Crispy or grilled chicken, bold flavors, made fresh.",
  },
  {
    icon: Popcorn,
    title: "Sides",
    text: "Fries, loaded fries, tenders, onion rings and more.",
  },
  {
    icon: CupSoda,
    title: "Drinks",
    text: "Iced teas, sodas, beers & waters to keep it refreshing.",
  },
  {
    icon: IceCreamCone,
    title: "Desserts",
    text: "Cookies, brownies, sundaes and daily sweet treats.",
  },
  {
    icon: TreePalm,
    title: "Merch",
    text: "T-shirts, caps, stickers and more from the club.",
  },
];

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <section id="menu" className="bg-sand py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="flex flex-col text-4xl uppercase leading-[0.85] tracking-[0.01em] text-charcoal sm:text-5xl lg:text-6xl">
          <span>Our</span>
          <span>Menu</span>
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, title, text }) => (
            <button
              key={title}
              type="button"
              onClick={() => setOpen(true)}
              className="group flex flex-col items-center rounded-lg border border-charcoal/25 bg-transparent px-4 pb-4 pt-6 text-center transition-colors hover:bg-charcoal/5"
              aria-label={`Open the full menu — ${title}`}
            >
              <Icon className="h-10 w-10 text-charcoal" strokeWidth={1.5} aria-hidden />
              <span className="mt-4 font-subhead text-sm font-bold uppercase tracking-[0.04em] text-charcoal">
                {title}
              </span>
              <span className="mt-2 text-xs leading-snug text-charcoal/70">{text}</span>
              <ArrowRight
                className="mt-4 h-4 w-4 self-end text-charcoal transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-charcoal/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Full menu"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal-foreground/10 px-4 py-2 text-sm font-semibold text-charcoal-foreground"
            >
              {zoomed ? (
                <ZoomOut className="h-4 w-4" aria-hidden />
              ) : (
                <ZoomIn className="h-4 w-4" aria-hidden />
              )}
              {zoomed ? "Zoom out" : "Zoom in"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setZoomed(false);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-foreground/10 text-charcoal-foreground"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-3">
            <img
              src={menuImage}
              alt="The Potato Bun Club full menu"
              width={1200}
              height={1600}
              onClick={() => setZoomed((z) => !z)}
              className={
                zoomed
                  ? "max-w-none cursor-zoom-out rounded-xl"
                  : "mx-auto h-auto max-h-full w-auto max-w-full cursor-zoom-in rounded-xl"
              }
              style={zoomed ? { width: "220%" } : undefined}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
