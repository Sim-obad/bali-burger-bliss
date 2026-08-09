import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { menuCategories } from "@/lib/menu-data";

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = activeIndex !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => ((i ?? 0) + 1) % menuCategories.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => ((i ?? 0) - 1 + menuCategories.length) % menuCategories.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (dir: 1 | -1) =>
    setActiveIndex((i) => ((i ?? 0) + dir + menuCategories.length) % menuCategories.length);

  return (
    <section id="menu" className="bg-sand py-14 sm:py-20">
      <div className="px-5 sm:px-8 lg:px-12">
        <h2 className="flex flex-col text-4xl uppercase leading-[0.85] tracking-[0.01em] text-charcoal sm:text-5xl lg:text-6xl">
          <span>Our Menu</span>
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-4 lg:px-12">
        {menuCategories.map((category, index) => {
          const Icon = category.icon;
          const isOpen = activeIndex === index;

          return (
            <div key={category.id} className="[perspective:1400px]">
              <div
                className="relative h-[19rem] w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:duration-0 sm:h-[21rem]"
                style={{
                  transform: isOpen ? "rotateY(180deg) scale(1.03)" : "rotateY(0deg) scale(1)",
                }}
              >
                {/* Front */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-hidden={isOpen}
                  tabIndex={isOpen ? -1 : 0}
                  aria-label={`Open ${category.title}`}
                  className="group absolute inset-0 flex flex-col rounded-xl border border-charcoal/25 bg-transparent px-5 pb-5 pt-8 text-center transition-colors [backface-visibility:hidden] hover:bg-charcoal/5 sm:px-6 sm:pb-6 sm:pt-10"
                >
                  <div className="flex h-14 items-center justify-center">
                    <Icon className="h-12 w-12 text-charcoal" strokeWidth={1.5} />
                  </div>
                  <span className="mt-5 flex h-10 items-start justify-center font-subhead text-sm font-bold uppercase leading-tight tracking-[0.04em] text-charcoal sm:text-base">
                    {category.title}
                  </span>
                  <span className="mt-1 flex h-16 items-start justify-center text-xs leading-snug text-charcoal/70 sm:text-sm">
                    {category.tagline}
                  </span>
                  <ArrowRight
                    className="mt-auto h-5 w-5 self-end text-charcoal transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </button>

                {/* Back */}
                <div
                  aria-hidden={!isOpen}
                  className="absolute inset-0 flex flex-col rounded-xl border border-charcoal/25 bg-charcoal/[0.04] p-4 text-left [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-6 w-6 shrink-0 text-charcoal" strokeWidth={1.5} />
                      <h3 className="font-subhead text-sm font-bold uppercase leading-tight tracking-[0.04em] text-charcoal">
                        {category.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(null)}
                      tabIndex={isOpen ? 0 : -1}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10"
                      aria-label="Back to categories"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  </div>

                  {category.priceColumns ? (
                    <div className="mt-2 flex justify-end gap-3 pr-1">
                      {category.priceColumns.map((col) => (
                        <span
                          key={col}
                          className="w-10 text-right font-marker text-[11px] leading-none text-charcoal/80"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <ul className="mt-2 flex-1 divide-y divide-charcoal/15 overflow-y-auto border-t border-charcoal/15 pr-1">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-3 py-2">
                        <div>
                          <p className="font-subhead text-xs font-bold uppercase tracking-[0.04em] text-charcoal">
                            {item.name}
                          </p>
                          {item.description ? (
                            <p className="mt-0.5 text-[11px] leading-snug text-charcoal/70">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                        {item.prices ? (
                          <span className="flex shrink-0 gap-3">
                            {item.prices.map((p, i) => (
                              <span
                                key={i}
                                className="w-10 text-right font-subhead text-xs font-bold text-charcoal"
                              >
                                {p}
                              </span>
                            ))}
                          </span>
                        ) : item.price ? (
                          <span className="shrink-0 font-subhead text-xs font-bold text-charcoal">
                            {item.price}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>

                  {category.extras ? (
                    <div className="mt-3 rounded-lg bg-charcoal p-3 text-charcoal-foreground">
                      <p className="font-marker text-[11px] leading-none text-charcoal-foreground/90">
                        {category.extras.title}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {category.extras.items.map((extra) => {
                          const ExtraIcon = extra.icon;
                          return (
                            <li
                              key={extra.name}
                              className="flex items-center justify-between gap-2 text-[11px] leading-tight"
                            >
                              <span className="flex items-center gap-1.5">
                                {ExtraIcon ? (
                                  <ExtraIcon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                ) : null}
                                <span className="font-subhead font-bold uppercase tracking-[0.04em]">
                                  {extra.name}
                                </span>
                              </span>
                              {extra.price ? (
                                <span className="font-subhead font-bold">{extra.price}</span>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}


                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      tabIndex={isOpen ? 0 : -1}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10"
                      aria-label="Previous category"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      tabIndex={isOpen ? 0 : -1}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10"
                      aria-label="Next category"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
