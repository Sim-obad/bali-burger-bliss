import { createServerFn } from "@tanstack/react-start";

export type { InstagramPost } from "./instagram.server";

export const getInstagramPosts = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env["INSTAGRAM_ACCESS_TOKEN"];
  if (!token) {
    return { posts: [], error: "not_configured" as string | null };
  }
  const { fetchInstagramPosts } = await import("./instagram.server");
  return fetchInstagramPosts(token);
});
