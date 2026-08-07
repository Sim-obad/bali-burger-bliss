import { useQuery } from "@tanstack/react-query";
import { Instagram } from "lucide-react";

import { getInstagramPosts, type InstagramPost } from "@/lib/instagram.functions";
import { site } from "@/lib/site-config";
import ig1 from "@/assets/ig-1.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";

const fallbackPosts: InstagramPost[] = [
  { id: "f1", imageUrl: ig1, permalink: site.instagramUrl, caption: "Burger & fries by the beach" },
  { id: "f2", imageUrl: ig2, permalink: site.instagramUrl, caption: "Double smash, extra cheese" },
  { id: "f3", imageUrl: ig3, permalink: site.instagramUrl, caption: "Sunset on the terrace" },
  { id: "f4", imageUrl: ig4, permalink: site.instagramUrl, caption: "Skin-on fries & a cold one" },
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
    <section id="instagram" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <Instagram className="h-4 w-4" aria-hidden />@{site.instagramHandle}
          </a>
        </div>
      </div>

      <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[72vw] max-w-[280px] shrink-0 snap-center overflow-hidden rounded-2xl bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:w-[240px]"
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
