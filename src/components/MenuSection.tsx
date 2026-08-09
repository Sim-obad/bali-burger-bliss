import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { menuCategories } from "@/lib/menu-data";

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const open = activeIndex !== null;

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => ((i ?? 0) + 1) % menuCategories.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => ((i ?? 0) - 1 + menuCategories.length) % menuCategories.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (dir: 1 | -1) =>
    setActiveIndex((i) => ((i ?? 0) + dir + menuCategories.length) % menuCategories.length);

  const category = activeIndex !== null ? menuCategories[activeIndex] : null;
  const ActiveIcon = category?.icon;

  return (
    <section id="menu" className="bg-sand py-14 sm:py-20">
      <div className="px-5 sm:px-8 lg:px-12">
        <h2 className="flex flex-col text-4xl uppercase leading-[0.85] tracking-[0.01em] text-charcoal sm:text-5xl lg:text-6xl">
          <span>Our Menu</span>
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 px-5 sm:grid-cols-4 sm:gap-4 sm:px-8 lg:px-12">
        {menuCategories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${cat.title}`}
              className="group flex h-[11.5rem] flex-col rounded-xl border border-charcoal/25 bg-transparent px-3 pb-3 pt-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/5 sm:h-[12.5rem] sm:px-4 sm:pb-4 sm:pt-6"
            >
              <div className="flex h-9 items-center justify-center">
                <Icon className="h-8 w-8 text-charcoal" strokeWidth={1.5} />
              </div>
              <span className="mt-3 flex h-8 items-start justify-center font-subhead text-[11px] font-bold uppercase leading-tight tracking-[0.04em] text-charcoal sm:text-xs">
                {cat.title}
              </span>
              <span className="mt-1 flex h-12 items-start justify-center text-[10px] leading-snug text-charcoal/70 sm:text-[11px]">
                {cat.tagline}
              </span>
              <ArrowRight
                className="mt-auto h-4 w-4 self-end text-charcoal transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* Zoomed flip panel */}
      {category && ActiveIcon ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={category.title}
        >
          <button
            type="button"
            aria-label="Close menu category"
            onClick={() => setActiveIndex(null)}
            className={`absolute inset-0 bg-charcoal/60 transition-opacity duration-300 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="relative flex w-full max-w-none items-center justify-center gap-1 sm:max-w-3xl sm:gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand/40 bg-charcoal/80 text-sand shadow-lg transition-colors hover:bg-charcoal sm:h-11 sm:w-11"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <div className="relative w-full max-w-none [perspective:1600px] sm:max-w-2xl">
              <div
                className="max-h-[80vh] overflow-y-auto rounded-2xl border border-charcoal/25 bg-sand p-5 shadow-2xl transition-all duration-500 ease-out [transform-style:preserve-3d] motion-reduce:duration-0 sm:max-h-[85vh] sm:p-7"
                style={{
                  transform: entered
                    ? "rotateY(0deg) scale(1)"
                    : "rotateY(-100deg) scale(0.85)",
                  opacity: entered ? 1 : 0,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ActiveIcon className="h-9 w-9 shrink-0 text-charcoal" strokeWidth={1.5} />
                    <h3 className="font-subhead text-lg font-bold uppercase leading-tight tracking-[0.04em] text-charcoal sm:text-2xl">
                      {category.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10"
                    aria-label="Back to categories"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>

                {category.priceColumns ? (
                  <div className="mt-4 flex justify-end gap-4 pr-1">
                    {category.priceColumns.map((col) => (
                      <span
                        key={col}
                        className="w-14 text-right font-marker text-sm leading-none text-charcoal/80"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                ) : null}

                <ul className="mt-2 divide-y divide-charcoal/15 border-t border-charcoal/15">
                  {category.items.map((item, idx) => {
                    const prevGroup = idx > 0 ? category.items[idx - 1]?.group : undefined;
                    const showGroup = item.group && item.group !== prevGroup;
                    return (
                      <li key={`${item.group ?? ""}-${item.name}`} className="py-3">
                        {showGroup ? (
                          <div className="mb-2">
                            <p className="inline-block rounded-md bg-charcoal px-2.5 py-1 font-subhead text-[11px] font-bold uppercase tracking-[0.06em] text-charcoal-foreground">
                              {item.group}
                            </p>
                            {item.groupDescription ? (
                              <p className="mt-1 text-xs leading-snug text-charcoal/70 sm:text-sm">
                                {item.groupDescription}
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                        <div className="flex items-baseline justify-between gap-4">
                          <div>
                            <p className="font-subhead text-sm font-bold uppercase tracking-[0.04em] text-charcoal">
                              {item.name}
                              {item.note ? (
                                <span className="ml-2 font-marker text-[11px] font-normal normal-case tracking-normal text-charcoal/70">
                                  {item.note}
                                </span>
                              ) : null}
                            </p>
                            {item.description ? (
                              <p
                                className={`mt-0.5 text-xs leading-snug text-charcoal/70 sm:text-sm ${
                                  item.group === "Beer" ? "hidden sm:block" : ""
                                }`}
                              >
                                {item.description}
                              </p>
                            ) : null}
                          </div>
                          {item.prices ? (
                            <span className="flex shrink-0 gap-4">
                              {item.prices.map((p, i) => (
                                <span
                                  key={i}
                                  className="w-14 text-right font-subhead text-sm font-bold text-charcoal"
                                >
                                  {p}
                                </span>
                              ))}
                            </span>
                          ) : item.price ? (
                            <span className="shrink-0 font-subhead text-sm font-bold text-charcoal">
                              {item.price}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {category.extras ? (
                  <div className="mt-5 rounded-xl bg-charcoal p-4 text-charcoal-foreground">
                    <p className="font-marker text-sm leading-none text-charcoal-foreground/90">
                      {category.extras.title}
                    </p>
                    <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                      {category.extras.items.map((extra) => {
                        const ExtraIcon = extra.icon;
                        return (
                          <li
                            key={extra.name}
                            className="flex items-center justify-between gap-2 text-xs leading-tight"
                          >
                            <span className="flex items-center gap-2">
                              {ExtraIcon ? (
                                <ExtraIcon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
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

                {category.footnote ? (
                  <p className="mt-4 text-center font-marker text-[11px] text-charcoal/70">
                    {category.footnote}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand/40 bg-charcoal/80 text-sand shadow-lg transition-colors hover:bg-charcoal sm:h-11 sm:w-11"
              aria-label="Next category"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
