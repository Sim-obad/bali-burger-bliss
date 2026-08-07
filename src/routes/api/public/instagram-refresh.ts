import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/instagram-refresh")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["INSTAGRAM_REFRESH_SECRET"];
        const token = process.env["INSTAGRAM_ACCESS_TOKEN"];
        if (!secret || !token) {
          return new Response("Not configured", { status: 503 });
        }
        if (request.headers.get("x-refresh-secret") !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }
        const { refreshInstagramToken } = await import("@/lib/instagram.server");
        const result = await refreshInstagramToken(token);
        if (!result.ok) {
          return Response.json({ refreshed: false }, { status: 502 });
        }
        return Response.json({
          refreshed: true,
          expiresInDays: result.expiresInDays,
        });
      },
    },
  },
});
