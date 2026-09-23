import { useQuery } from "@tanstack/react-query";
import { Instagram } from "lucide-react";

import { getInstagramPosts, type InstagramPost } from "@/lib/instagram.functions";
import { site } from "@/lib/site-config";
import ig1 from "@/assets/ig-1.webp";
import ig2 from "@/assets/ig-2.webp";
import ig3 from "@/assets/ig-3.webp";
import ig4 from "@/assets/ig-4.webp";

const fallbackPosts: InstagramPost[] = [
  { id: "f1", imageUrl: ig1, permalink: site.instagramUrl, caption: "Crispy tenders, dip & a cold Santai" },
  { id: "f2", imageUrl: ig2, permalink: site.instagramUrl, caption: "Smash burgers, fries & good beer" },
  { id: "f3", imageUrl: ig3, permalink: site.instagramUrl, caption: "Good buns, good beer, good time" },
  { id: "f4", imageUrl: ig4, permalink: site.instagramUrl, caption: "Hand-breaded, made to order" },
];

export function InstagramCarousel() {
  const { data } = useQuery({
    queryKey: ["instagram-posts"],
    queryFn: () => getInstagramPosts(),
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

  const posts = data?.posts?.length ? data.posts : fallbackPosts;

  return (
    <section id="instagram" className="texture-grain relative z-20 -mt-10 overflow-hidden bg-background pb-[84px] pt-16 shadow-overlap sm:pb-[116px] sm:pt-24">
      {/* Giant watermark for layered depth — same crop as the menu section */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-30px] right-0 select-none font-display text-[180px] leading-none text-charcoal opacity-20 sm:text-[240px]"
      >
        TPBC
      </span>
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-4 text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Fresh off the grill
            </p>
            <h2 className="mt-2 flex flex-col text-3xl uppercase leading-[0.85] tracking-[0.01em] sm:text-4xl">
              <span>Latest Instagram</span>
            </h2>
          </div>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-ghost inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <Instagram className="h-4 w-4" aria-hidden />@{site.instagramHandle}
          </a>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 px-5 pb-10 sm:grid-cols-3 sm:px-8 sm:pb-14 lg:grid-cols-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full overflow-hidden rounded-2xl border border-charcoal/25 bg-card shadow-relief transition-all duration-300 hover:-translate-y-1 hover:shadow-relief-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={post.imageUrl}
                alt={post.caption || "Instagram post from The Potato Bun Club"}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {post.caption ? (
              <div className="border-t border-border/40 p-3">
                <p className="line-clamp-3 text-xs leading-relaxed text-foreground/80">{post.caption}</p>
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
