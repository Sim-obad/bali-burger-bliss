import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

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
      setRot(0);

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
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Live 3D page turn: the card follows the finger, then finishes the rotation
  // at a speed matching the swipe. It is never off screen — at 90deg it is
  // simply edge-on, exactly like a real page being turned.
  const [rot, setRot] = useState(0);
  const [dur, setDur] = useState(0);
  const timers = useRef<number[]>([]);
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // Turn to the next/previous category, half-turn out then half-turn in.
  const go = (dir: 1 | -1, speed = 0) => {
    clearTimers();
    // speed is px/ms of the swipe: faster finger, faster page turn.
    const half = Math.max(140, Math.min(420, 380 - speed * 160));
    setDur(half);
    setRot(dir === 1 ? -90 : 90);
    timers.current.push(
      window.setTimeout(() => {
        setActiveIndex((i) => ((i ?? 0) + dir + menuCategories.length) % menuCategories.length);
        setDur(0);
        setRot(dir === 1 ? 90 : -90);
        timers.current.push(
          window.setTimeout(() => {
            setDur(half);
            setRot(0);
          }, 20),
        );
      }, half),
    );
  };

  // Same page turn, but straight to a given category (carousel dots).
  const goTo = (target: number) => {
    const dir: 1 | -1 = (activeIndex ?? 0) < target ? 1 : -1;
    clearTimers();
    const half = 320;
    setDur(half);
    setRot(dir === 1 ? -90 : 90);
    timers.current.push(
      window.setTimeout(() => {
        setActiveIndex(target);
        setDur(0);
        setRot(dir === 1 ? 90 : -90);
        timers.current.push(
          window.setTimeout(() => {
            setDur(half);
            setRot(0);
          }, 20),
        );
      }, half),
    );
  };


  // Swipe navigation on touch screens (in addition to the carousel dots).
  const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragging = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches.item(0);
    if (!t) return;
    clearTimers();
    dragging.current = false;
    touchStart.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const start = touchStart.current;
    const t = e.touches.item(0);
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Horizontal swipes only: never hijack vertical scrolling of the menu list.
    if (!dragging.current && (Math.abs(dx) < 12 || Math.abs(dx) < Math.abs(dy) * 1.2)) return;
    dragging.current = true;
    const width = cardRef.current?.offsetWidth ?? 320;
    setDur(0);
    setRot(Math.max(-80, Math.min(80, (dx / width) * 90)));
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    const t = e.changedTouches.item(0);
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const speed = Math.abs(dx) / Math.max(1, Date.now() - start.t);
    if (dragging.current && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      go(dx < 0 ? 1 : -1, speed);
    } else if (dragging.current) {
      // Not far enough: let the page fall back flat.
      setDur(260);
      setRot(0);
    }
    dragging.current = false;
  };


  const category = activeIndex !== null ? menuCategories[activeIndex] : null;
  const ActiveIcon = category?.icon;

  return (
    <section id="menu" className="texture-grain relative overflow-hidden bg-background py-14 sm:pt-20 sm:pb-[120px]">
      {/* Giant watermark for layered depth — same crop as the contact section */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-70px] right-0 select-none font-display text-[180px] leading-none text-charcoal opacity-20 sm:text-[240px]"
      >
        TPBC
      </span>
      <div className="relative z-[2] px-5 sm:px-8 lg:px-12">
        <h2 className="flex flex-col text-4xl uppercase leading-[0.85] tracking-[0.01em] text-charcoal sm:text-5xl lg:text-6xl">
          <span>Our Menu</span>
        </h2>
      </div>


      <div className="relative z-[2] mt-8 grid grid-cols-2 gap-3 px-5 sm:grid-cols-4 sm:gap-4 sm:px-8 lg:px-12">
        {menuCategories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setRot(0);
                setActiveIndex(index);
              }}
              aria-label={`Open ${cat.title}`}
              className="group flex h-[11.5rem] flex-col rounded-xl border border-charcoal/25 bg-card/70 px-3 pb-3 pt-5 text-center shadow-relief transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-relief-lg sm:h-[12.5rem] sm:px-4 sm:pb-4 sm:pt-6"
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
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            aria-label="Close menu category"
            onClick={() => setActiveIndex(null)}
            className={`absolute inset-0 bg-charcoal/60 transition-opacity duration-300 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="relative flex w-full max-w-none flex-col items-center sm:max-w-3xl">
            <div className="relative w-full max-w-none [perspective:1100px] sm:max-w-2xl">
              <div
                className="transition-all duration-[850ms] [transition-timing-function:cubic-bezier(0.3,0,0.2,1)] [transform-style:preserve-3d] motion-reduce:duration-0"
                style={{
                  transform: entered
                    ? "rotateY(0deg) scale(1)"
                    : "rotateY(-85deg) scale(0.92)",
                  opacity: entered ? 1 : 0,
                }}
              >
                {/* The whole card pivots in 3D, paper, border and shadow included. */}
                <div
                  ref={cardRef}
                  className="max-h-[75vh] rounded-2xl border border-charcoal/25 bg-sand shadow-2xl [backface-visibility:hidden] [transform-style:preserve-3d] sm:max-h-[85vh]"
                  style={{
                    transform: `rotateY(${rot}deg)`,
                    transformOrigin: "center",
                    transition: dur ? `transform ${dur}ms cubic-bezier(0.33,0,0.3,1), filter ${dur}ms linear` : "none",
                    // Shading follows the angle so the page catches the light.
                    filter: `brightness(${1 - Math.min(0.28, Math.abs(rot) / 320)})`,
                  }}
                >

                <div className="max-h-[75vh] overflow-y-auto rounded-2xl sm:max-h-[85vh]">
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
                                  {item.icon ? (
                                    <item.icon
                                      className="ml-2 inline-block h-[18px] w-[18px] align-[-3px] text-charcoal sm:h-5 sm:w-5"
                                      strokeWidth={1.8}
                                    />
                                  ) : null}
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
                                        <ExtraIcon className="h-6 w-6 shrink-0 -translate-y-0.5" strokeWidth={1.5} />
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
            </div>

            {/* Carousel dots: tap a dot to jump straight to that category */}
            <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Menu categories">
              {menuCategories.map((cat, i) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={cat.title}
                  onClick={() => {
                    if (i === activeIndex) return;
                    goTo(i);
                  }}

                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-7 bg-sand" : "w-2.5 bg-sand/40 hover:bg-sand/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
