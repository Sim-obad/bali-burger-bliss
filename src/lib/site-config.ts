export const site = {
  name: "The Potato Bun Club",
  tagline: "Good Buns. Good Beer. Good Time.",
  whatsappNumber: "6281325163826",
  instagramHandle: "thepotatobunclub",
  instagramUrl: "https://instagram.com/thepotatobunclub",
  address: "Jalan Raya Amed, Karangasem, Bali 80852, Indonesia",
  mapsUrl: "https://maps.app.goo.gl/rNpdTAzmV19xFdLx9?g_st=ic",
  hours: [
    { days: "Monday – Sunday", time: "11:00 – 22:00" },
    { days: "Kitchen last order", time: "21:30" },
  ],
} as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const waLinks = {
  order: waLink("Hi The Potato Bun Club! I'd like to place an order 🍔"),
  delivery: waLink("Hi! I'd like a delivery order in Amed, please."),
  takeaway: waLink("Hi! I'd like to order takeaway, please."),
  booking: waLink("Hi! I'd like to book a table."),
};
