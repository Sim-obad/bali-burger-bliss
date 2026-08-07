export const site = {
  name: "The Potato Bun Club",
  tagline: "Good Buns. Good Beer. Good Time.",
  whatsappNumber: "6281325163826",
  instagramHandle: "thepotatobunclub",
  instagramUrl: "https://instagram.com/thepotatobunclub",
  address: "Jalan Raya Amed, Karangasem, Bali 80852, Indonesia",
  mapsUrl: "https://maps.app.goo.gl/rNpdTAzmV19xFdLx9?g_st=ic",
  hours: [
    { days: "Thursday – Tuesday", time: "17:00 – 23:00" },
    { days: "Kitchen last order", time: "22:30" },
    { days: "Wednesday", time: "Closed" },
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
