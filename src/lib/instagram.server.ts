export type InstagramPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
};

type CacheEntry = { posts: InstagramPost[]; fetchedAt: number };

const CACHE_TTL_MS = 1000 * 60 * 15;
let cache: CacheEntry | null = null;

export async function fetchInstagramPosts(
  token: string,
): Promise<{ posts: InstagramPost[]; error: string | null }> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return { posts: cache.posts, error: null };
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
    // "Instagram Login" tokens (IGA...) call graph.instagram.com directly;
    // "Facebook Login" tokens need the IG account resolved via the FB page.
    const mediaUrl = token.startsWith("IGA")
      ? `https://graph.instagram.com/me/media?fields=${fields}&limit=6&access_token=${token}`
      : await (async () => {
          const igUserId = await resolveInstagramUserId(token);
          return igUserId
            ? `https://graph.facebook.com/v21.0/${igUserId}/media?fields=${fields}&limit=6&access_token=${token}`
            : null;
        })();
    if (!mediaUrl) {
      return { posts: cache?.posts ?? [], error: "request_failed" };
    }
    const res = await fetch(mediaUrl);
    if (!res.ok) {
      console.error(`Instagram API failed [${res.status}]: ${await res.text()}`);
      return { posts: cache?.posts ?? [], error: "request_failed" };
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

    if (posts.length > 0) {
      cache = { posts, fetchedAt: Date.now() };
    }

    return { posts, error: null };
  } catch (err) {
    console.error("Instagram fetch error", err);
    return { posts: cache?.posts ?? [], error: "unavailable" };
  }
}

/** Finds the Instagram professional account linked to the token's Facebook page. */
async function resolveInstagramUserId(token: string): Promise<string | null> {
  const pagesRes = await fetch(
    `https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account&access_token=${token}`,
  );
  const pagesBody = await pagesRes.text();
  if (!pagesRes.ok) {
    console.error(`Instagram page lookup failed [${pagesRes.status}]: ${pagesBody}`);
    return null;
  }
  const pages = (JSON.parse(pagesBody) as {
    data?: Array<{ id: string; instagram_business_account?: { id: string } }>;
  }).data ?? [];
  const igId = pages.find((p) => p.instagram_business_account)?.instagram_business_account?.id;
  if (igId) return igId;

  // The field expansion on /me/accounts can come back empty; query each page.
  for (const page of pages) {
    const pageRes = await fetch(
      `https://graph.facebook.com/v21.0/${page.id}?fields=instagram_business_account&access_token=${token}`,
    );
    const pageBody = await pageRes.text();
    if (!pageRes.ok) continue;
    const pageDetail = JSON.parse(pageBody) as {
      instagram_business_account?: { id: string };
    };
    if (pageDetail.instagram_business_account?.id) {
      return pageDetail.instagram_business_account.id;
    }
  }
  console.error(`No instagram_business_account found (pages: ${pagesBody})`);
  return null;
}

/** Long-lived tokens last ~60 days; this extends the window. */
export async function refreshInstagramToken(token: string) {
  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
  );
  const body = await res.text();
  if (!res.ok) {
    console.error(`Instagram token refresh failed [${res.status}]: ${body}`);
    return { ok: false as const, status: res.status };
  }
  const json = JSON.parse(body) as { access_token?: string; expires_in?: number };
  return {
    ok: true as const,
    expiresInDays: json.expires_in ? Math.round(json.expires_in / 86400) : null,
    accessToken: json.access_token ?? null,
  };
}
