import { Clock, MapPin, MessageCircle, Instagram } from "lucide-react";

import { site, waLinks } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section id="contact" className="bg-charcoal py-16 text-charcoal-foreground sm:py-24">
      <div className="px-5 sm:px-8 lg:px-12">
        <p className="font-marker text-sm tracking-wide text-charcoal-foreground">
          Book · Delivery · Takeaway
        </p>
        <h2 className="mt-2 flex flex-col text-3xl uppercase leading-[0.85] tracking-[0.01em] sm:text-4xl">
          <span>Order</span>
          <span>or reserve</span>
        </h2>
        <p className="mt-3 max-w-md text-charcoal-foreground/75">
          Everything happens on WhatsApp — one message and we've got you.
        </p>

        <a
          href={waLinks.order}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-16 w-full items-center justify-center gap-3 rounded-full bg-charcoal-foreground px-8 text-lg font-bold uppercase tracking-wide text-charcoal transition-transform hover:scale-[1.01] active:scale-95 sm:w-auto"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
          Message us on WhatsApp
        </a>

        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "Book a table", href: waLinks.booking },
            { label: "Delivery", href: waLinks.delivery },
            { label: "Takeaway", href: waLinks.takeaway },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-charcoal-foreground/25 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-charcoal-foreground/10"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-lg uppercase">
              <Clock className="h-5 w-5 text-charcoal-foreground/70" aria-hidden />
              Opening hours
            </h3>
            <ul className="mt-3 space-y-1 text-charcoal-foreground/75">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="font-semibold">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg uppercase">
              <MapPin className="h-5 w-5 text-charcoal-foreground/70" aria-hidden />
              Find us
            </h3>
            <p className="mt-3 text-charcoal-foreground/75">{site.address}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-charcoal-foreground/70"
              >
                Open in Google Maps
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-charcoal-foreground/70"
              >
                <Instagram className="h-4 w-4" aria-hidden />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
