import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { FriesIcon } from "@/components/icons/FriesIcon";
import { menuCategories } from "@/lib/menu-data";

void FriesIcon;

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = activeIndex !== null;
  const active = open ? menuCategories[activeIndex] : null;

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

  const ActiveIcon = active?.icon;

  return (
    <section id="menu" className="bg-sand py-14 sm:py-20">
      <div className="px-5 sm:px-8 lg:px-12">
        <h2 className="flex flex-col text-4xl uppercase leading-[0.85] tracking-[0.01em] text-charcoal sm:text-5xl lg:text-6xl">
          <span>Our Menu</span>
        </h2>
      </div>

      <div className="mt-8 px-5 sm:px-8 lg:px-12 [perspective:1600px]">
        <div
          className="grid transition-transform duration-500 ease-out motion-reduce:duration-0 [transform-style:preserve-3d]"
          style={{
            transform: open ? "rotateY(180deg) scale(1.02)" : "rotateY(0deg) scale(1)",
          }}
        >
          {/* Front: categories */}
          <div
            className="col-start-1 row-start-1 [backface-visibility:hidden]"
            aria-hidden={open}
            style={{ visibility: open ? "hidden" : "visible" }}
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {menuCategories.map(({ id, icon: Icon, title, tagline }, index) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group flex flex-col items-center rounded-xl border border-charcoal/25 bg-transparent px-5 pb-5 pt-8 text-center transition-colors hover:bg-charcoal/5 sm:px-6 sm:pb-6 sm:pt-10"
                  aria-label={`Open ${title}`}
                >
                  <Icon className="h-12 w-12 text-charcoal" strokeWidth={1.5} aria-hidden />
                  <span className="mt-5 font-subhead text-sm font-bold uppercase tracking-[0.04em] text-charcoal sm:text-base">
                    {title}
                  </span>
                  <span className="mt-2 text-xs leading-snug text-charcoal/70 sm:text-sm">
                    {tagline}
                  </span>
                  <ArrowRight
                    className="mt-5 h-5 w-5 self-end text-charcoal transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Back: category detail */}
          <div
            className="col-start-1 row-start-1 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            aria-hidden={!open}
            style={{ visibility: open ? "visible" : "hidden" }}
          >
            {active && ActiveIcon ? (
              <div className="rounded-xl border border-charcoal/25 bg-charcoal/[0.03] p-5 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10 sm:inline-flex"
                      aria-label="Previous category"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                    <div className="flex items-center gap-3">
                      <ActiveIcon className="h-10 w-10 text-charcoal" strokeWidth={1.5} aria-hidden />
                      <div>
                        <h3 className="text-2xl uppercase leading-[0.9] text-charcoal sm:text-4xl">
                          {active.title}
                        </h3>
                        <p className="mt-1 text-xs text-charcoal/70 sm:text-sm">{active.tagline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10 sm:inline-flex"
                      aria-label="Next category"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(null)}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-charcoal/30 text-charcoal transition-colors hover:bg-charcoal/10"
                      aria-label="Back to categories"
                    >
                      <X className="h-5 w-5" aria-hidden />
                    </button>
                  </div>
                </div>

                <ul className="mt-6 divide-y divide-charcoal/15 border-t border-charcoal/15">
                  {active.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <div>
                        <p className="font-subhead text-sm font-bold uppercase tracking-[0.04em] text-charcoal sm:text-base">
                          {item.name}
                        </p>
                        {item.description ? (
                          <p className="mt-1 text-xs leading-snug text-charcoal/70 sm:text-sm">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      {item.price ? (
                        <span className="shrink-0 font-subhead text-sm font-bold text-charcoal sm:text-base">
                          {item.price}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between sm:hidden">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/30 text-charcoal"
                    aria-label="Previous category"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <span className="text-xs uppercase tracking-[0.12em] text-charcoal/60">
                    {(activeIndex ?? 0) + 1} / {menuCategories.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/30 text-charcoal"
                    aria-label="Next category"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
