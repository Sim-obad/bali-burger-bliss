# Restore the composed share image (link preview)

The user wants the link preview image (what messaging apps show when the site link is shared) back to the earlier composed design, matching the reference screenshot:

- Navy background #1b3957, full 1200x630 canvas
- Circular TPBC logo centered at top
- "THE POTATO BUN CLUB" in Anton, cream (#f5f1e8)
- Thin cream divider line
- Baseline "Good Buns. Good Beer. Good Time."
- "BURGERS IN AMED, BALI" below in smaller League Spartan/Montserrat

## Steps

1. Compose `public/og-cover.jpg` (1200x630) with PIL using:
   - `src/assets/tpbc-logo.webp` (existing logo asset)
   - Brand fonts (Anton, League Spartan, Montserrat — fetch TTFs, cache in /tmp)
   - Colors: navy #1b3957 background, cream #f5f1e8 text, layout per the reference screenshot (logo top-center, title, divider, baseline, subtitle).
2. Keep all head metadata in `src/routes/index.tsx` as-is (it already points at `/og-cover.jpg`).
3. Verify the output image visually (open the generated file).

No code changes needed — only the image file is replaced.

## Notes for the user

- The change goes live after publishing.
- Messaging apps cache link previews: re-send the link with a `?v=4` suffix (or delete/re-paste) to see the new image in iMessage/WhatsApp.
