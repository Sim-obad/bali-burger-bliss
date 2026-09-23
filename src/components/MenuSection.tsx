import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { menuCategories } from "@/lib/menu-data";
// Gluten-free badge shown next to gluten-free items
import glutenFreeBadge from "@/assets/gluten-free.png";

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const open = activeIndex !== null;

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { categoryId?: string } | undefined;
      const categoryId = detail?.categoryId ?? "burgers";
      const index = menuCategories.findIndex((c) => c.id === categoryId);
      setActiveIndex(index >= 0 ? index : 0);
    };
    window.addEventListener("open-menu-category", onOpen);
    return () => window.removeEventListener("open-menu-category", onOpen);
  }, []);

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

          <div className="relative flex w-full max-w-none items-center justify-center sm:max-w-3xl sm:gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-0 z-20 inline-flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-sand/40 bg-charcoal/80 text-sand shadow-lg transition-colors hover:bg-charcoal sm:static sm:h-11 sm:w-11 sm:translate-x-0"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <div className="relative w-full max-w-none [perspective:1600px] sm:max-w-2xl">
              <div
                className="max-h-[80vh] rounded-2xl border border-charcoal/25 bg-sand shadow-2xl transition-all duration-500 ease-out [transform-style:preserve-3d] motion-reduce:duration-0 sm:max-h-[85vh]"
                style={{
                  transform: entered
                    ? "rotateY(0deg) scale(1)"
                    : "rotateY(-100deg) scale(0.85)",
                  opacity: entered ? 1 : 0,
                }}
              >
                <div className="max-h-[80vh] overflow-y-auto rounded-2xl sm:max-h-[85vh]">
                  <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-charcoal/15 bg-sand p-5 sm:p-7">
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

                  <div className="px-5 pb-5 pt-0 sm:px-7 sm:pb-7 sm:pt-0">
                    <ul className="mt-2 divide-y divide-charcoal/15">
                      {category.items.map((item, idx) => {
                        const prevGroup = idx > 0 ? category.items[idx - 1]?.group : undefined;
                        const showGroup = item.group && item.group !== prevGroup;
                        return (
                          <li key={`${item.group ?? ""}-${item.name}`} className="py-3">
                            {showGroup ? (
                              <div className="relative mb-2">
                                <div className="flex items-center gap-4">
                                  <p className="-ml-3 inline-block rounded-md bg-charcoal px-3 py-1.5 font-subhead text-[17px] font-bold uppercase tracking-[0.06em] text-charcoal-foreground sm:-ml-4 sm:px-4 sm:text-[20px]">
                                    {item.group}
                                  </p>
                                  {/* Handwritten price column note, above the price columns */}
                                  {idx === 0 && category.priceColumns ? (
                                    <span className="ml-auto inline-block w-32 translate-y-[3px] -rotate-[8deg] origin-center whitespace-nowrap text-center font-marker text-[16px] leading-none text-charcoal/80">
                                      {category.priceColumns.join(" / ")}
                                    </span>
                                  ) : null}
                                  {/* Handwritten inline note for compact extras (ex. Add vanilla ice cream) */}
                                  {category.extras &&
                                  category.extras.items.length <= 2 &&
                                  category.extras.inlineGroup === item.group ? (
                                    <span className="ml-auto inline-block -rotate-[6deg] origin-center whitespace-nowrap font-marker text-[14px] leading-none text-charcoal/80">
                                      {category.extras.title}
                                      {category.extras.items[0]?.price
                                        ? ` ${category.extras.items[0].price}`
                                        : ""}
                                    </span>
                                  ) : null}
                                </div>
                                {/* Brand subtitle on its own line, between the group title and the description (ex. Kura Kura · on tap) */}
                                {item.groupSubtitle ? (
                                  <p className="mt-1.5 flex items-baseline gap-2">
                                    <span className="font-subhead text-base font-bold uppercase tracking-[0.04em] text-charcoal/85 sm:text-lg">
                                      {item.groupSubtitle}
                                    </span>
                                    {item.groupSubtitleNote ? (
                                      <span className="ml-auto inline-block translate-y-[3px] -rotate-[8deg] origin-center whitespace-nowrap font-marker text-[16px] leading-none text-charcoal/80">
                                        {item.groupSubtitleNote}
                                      </span>
                                    ) : null}
                                  </p>
                                ) : null}
                                {item.groupDescription ? (
                                  <p className="-mt-px mt-0.5 text-xs leading-snug text-charcoal/70 sm:text-sm">
                                    {item.groupDescription}
                                  </p>
                                ) : null}
                              </div>
                            ) : null}
                            <div className="flex items-baseline justify-between gap-4">
                              <div>
                                <p className="font-subhead text-base font-bold uppercase tracking-[0.04em] text-charcoal">
                                  {item.name}
                                  {item.glutenFree ? (
                                    <img
                                      src={glutenFreeBadge}
                                      alt="Gluten free"
                                      title="Gluten free"
                                      className="ml-2 inline-block h-[18px] w-[18px] align-[-3px] sm:h-5 sm:w-5"
                                    />
                                  ) : null}
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

                    {category.extras &&
                    !(category.extras.items.length <= 2 && category.extras.inlineGroup) ? (
                      (() => {
                        const compact = category.extras.items.length <= 2;
                        const wide = category.extras.columns === 3;
                        return (
                          <div
                            className={
                              compact
                                ? "mx-auto mt-5 w-fit rounded-xl bg-charcoal px-6 py-3 text-charcoal-foreground"
                                : "mt-5 rounded-xl bg-charcoal p-4 text-charcoal-foreground"
                            }
                          >
                            <p
                              className={`font-marker text-[17px] leading-none text-charcoal-foreground/90 ${
                                compact ? "text-center" : ""
                              }`}
                            >
                              {category.extras.title}
                            </p>
                            <ul
                              className={
                                compact
                                  ? "mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                                  : wide
                                    ? "mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2"
                                    : "mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4"
                              }
                            >
                              {category.extras.items.map((extra) => {
                                const ExtraIcon = extra.icon;
                                const isSauces = category.id === "sides";
                                return (
                                  <li
                                    key={extra.name ?? extra.price}
                                    className={`flex items-center text-[12.5px] leading-tight ${
                                      wide && !compact
                                        ? "w-[calc((100%-3.5rem)/3)] min-w-[9.5rem] gap-2.5 sm:gap-4"
                                        : isSauces
                                          ? "justify-between gap-2 pr-2 sm:pr-3"
                                          : "justify-between gap-2"
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      {ExtraIcon ? (
                                        <ExtraIcon className="h-6 w-6 shrink-0" strokeWidth={1.5} />
                                      ) : null}
                                      {extra.name ? (
                                        <span className="font-subhead font-bold uppercase tracking-[0.04em]">
                                          {extra.name}
                                        </span>
                                      ) : null}
                                    </span>
                                    {extra.price ? (
                                      <span className="font-subhead font-bold">{extra.price}</span>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })()
                    ) : null}

                    {category.footnote ? (
                      <p className="mt-4 whitespace-pre-line text-center font-marker text-[15px] text-charcoal/70">
                        {/* Inline the gluten-free badge right before its "Gluten free" mention */}
                        {category.footnote.split("Gluten free").flatMap((part, i) =>
                          i === 0
                            ? [<span key={`t${i}`}>{part}</span>]
                            : [
                                <img
                                  key={`i${i}`}
                                  src={glutenFreeBadge}
                                  alt="Gluten free"
                                  title="Gluten free"
                                  className="mx-[2px] inline-block h-[13px] w-[13px] align-[-2px]"
                                />,
                                <span key={`t${i}`}>Gluten free{part}</span>,
                              ]
                        )}
                      </p>
                    ) : null}

                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-0 z-20 inline-flex h-9 w-9 translate-x-1/2 items-center justify-center rounded-full border border-sand/40 bg-charcoal/80 text-sand shadow-lg transition-colors hover:bg-charcoal sm:static sm:h-11 sm:w-11 sm:translate-x-0"
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
