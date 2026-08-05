import { createServerFn } from "@tanstack/react-start";

export type InstagramPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
};

/**
 * Fetches the latest posts from the Instagram Graph API.
 * Requires an INSTAGRAM_ACCESS_TOKEN secret (Business/Creator account).
 * Returns an empty list on any failure so the page can fall back to
 * curated local photos instead of breaking.
 */
export const getInstagramPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: InstagramPost[]; error: string | null }> => {
    const token = process.env["INSTAGRAM_ACCESS_TOKEN"];
    if (!token) {
      return { posts: [], error: "not_configured" };
    }

    try {
      const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
      const res = await fetch(
        `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`,
      );
      if (!res.ok) {
        console.error(`Instagram API failed [${res.status}]: ${await res.text()}`);
        return { posts: [], error: "request_failed" };
      }
      const json = (await res.json()) as {
        data?: Array<{
          id: string;
          caption?: string;
          media_type: string;
          media_url?: string;
          thumbnail_url?: string;
          permalink: string;
        }>;
      };

      const posts = (json.data ?? [])
        .map((item) => ({
          id: item.id,
          imageUrl:
            item.media_type === "VIDEO"
              ? (item.thumbnail_url ?? item.media_url ?? "")
              : (item.media_url ?? ""),
          permalink: item.permalink,
          caption: item.caption ?? "",
        }))
        .filter((p) => p.imageUrl !== "");

      return { posts, error: null };
    } catch (err) {
      console.error("Instagram fetch error", err);
      return { posts: [], error: "unavailable" };
    }
  },
);
