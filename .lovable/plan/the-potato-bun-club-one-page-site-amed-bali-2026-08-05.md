# The Potato Bun Club — one-page site (Amed, Bali)

A single scrolling landing page in English, mobile-first, easy to keep alive: one page, one menu image, one WhatsApp link.

## Sections (top to bottom)

1. **Hero** — restaurant name, one-line pitch ("Smash burgers on potato buns, Amed, Bali"), background food photo, two buttons: *Order on WhatsApp* and *See the menu*.
2. **Instagram carousel** — latest posts pulled automatically from the account, swipeable on mobile, each tile links to the post, plus a "Follow us" link to the profile.
3. **Menu** — a clickable preview of the menu photo; tapping opens it full-screen with pinch/scroll zoom so it stays readable on a phone.
4. **Contact & orders** — big WhatsApp button (pre-filled message), plus opening hours, address, Google Maps link, and Instagram.
5. **Footer** — name, small print.

## Visual direction

Warm, sun-and-sea Amed feel rather than generic dark-diner: sand/charcoal base, a hot mustard-yellow accent, chunky condensed headline type, rounded photo cards. Fast-loading, no heavy animation.

## What I need from you (I'll use placeholders until you send them)

- WhatsApp number (international format)
- The menu photo (upload it)
- Instagram handle + a few food photos for the hero
- Address, opening hours, Google Maps link

## Instagram: how the automatic feed works

Instagram doesn't allow anonymous fetching, so the automatic feed needs a one-time setup:

- The Instagram account must be a **Business/Creator** account linked to a Facebook page.
- You generate an access token once; I store it as a project secret.
- A small server function fetches the latest posts and caches them, so the site never calls Instagram from the browser (keeps the token private and the page fast).
- Tokens expire roughly every 60 days; I'll add automatic refresh so it renews itself.

If you'd rather avoid that setup, I can start with a manual photo carousel and switch to the live feed later — the layout is identical.

## Technical notes

- TanStack Start single route (`/`), Tailwind design tokens, no database needed.
- Instagram: server function `getInstagramPosts` calling the Graph API with `INSTAGRAM_ACCESS_TOKEN` (secret), server-side cached; graceful fallback to local photos if the API fails, so the page never breaks.
- Menu: static image in `src/assets`, lightbox dialog with zoom/pan.
- WhatsApp: `https://wa.me/<number>?text=...` links for booking, delivery, takeaway.
- SEO: title/description/OG tags, `Restaurant` JSON-LD (name, address, hours), lazy-loaded images.
