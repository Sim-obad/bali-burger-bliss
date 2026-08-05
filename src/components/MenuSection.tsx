import { useState } from "react";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

import menuImage from "@/assets/menu.jpg";

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <section id="menu" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Burgers · Sides · Good times
        </p>
        <h2 className="mt-2 text-3xl uppercase sm:text-4xl">Our menu</h2>
        <p className="mt-3 text-muted-foreground">
          Tap the menu to open it full screen and zoom in.
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative mt-8 block w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-transform hover:scale-[1.01]"
          aria-label="Open the full menu"
        >
          <img
            src={menuImage}
            alt="The Potato Bun Club menu with burgers, sides and drinks"
            loading="lazy"
            width={1200}
            height={1600}
            className="h-[60vh] w-full object-cover object-top"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-charcoal/85 to-transparent px-4 pb-5 pt-16 text-sm font-bold uppercase tracking-wide text-charcoal-foreground">
            <Maximize2 className="h-4 w-4" aria-hidden />
            Tap to enlarge
          </span>
        </button>
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
