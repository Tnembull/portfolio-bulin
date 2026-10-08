import { NextResponse } from "next/server";

export interface FeedItem {
  id: string;
  provider: "instagram" | "tiktok";
  provider_media_id: string;
  type: "image" | "video" | "carousel_album";
  caption: string | null;
  media_url: string | null;
  thumbnail_url: string | null;
  permalink: string | null;
  published_at: string;
  account_username: string | null;
}

// Curated default feed items (used when API key is not yet configured or accounts are warming up)
const DEFAULT_FEED_ITEMS: FeedItem[] = [
  {
    id: "sf_porto_1",
    provider: "instagram",
    provider_media_id: "ig_drachen_1",
    type: "image",
    caption: "Drach3n Billiard & Coffee management system deployment. Modern operational backoffice with real-time station telemetry.",
    media_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop",
    thumbnail_url: null,
    permalink: "https://instagram.com/drachen.lampung",
    published_at: "2026-10-07T14:00:00Z",
    account_username: "drachen.lampung",
  },
  {
    id: "sf_porto_2",
    provider: "tiktok",
    provider_media_id: "tt_billiard_1",
    type: "video",
    caption: "Late night calibration on our dual-boiler espresso machine. Barista workflow optimization! ☕🎱 #DevOps #Drachen",
    media_url: null, // Strict TikTok Display API semantics
    thumbnail_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop",
    permalink: "https://www.tiktok.com/@drachen_billiard",
    published_at: "2026-10-06T12:30:00Z",
    account_username: "drachen_billiard",
  },
  {
    id: "sf_porto_3",
    provider: "instagram",
    provider_media_id: "ig_priklin_1",
    type: "image",
    caption: "PriKlin B2B formulation batch inspection. Testing eco-friendly degreaser viscosity for local HOREKA eateries.",
    media_url: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=600&auto=format&fit=crop",
    thumbnail_url: null,
    permalink: "https://priklin.id",
    published_at: "2026-10-05T09:15:00Z",
    account_username: "priklin.id",
  },
  {
    id: "sf_porto_4",
    provider: "tiktok",
    provider_media_id: "tt_server_1",
    type: "video",
    caption: "Zero-downtime Nginx reverse proxy configuration & Cloudflare tunnel security walkthrough. ⚡🛡️ #DevOps #Cloud",
    media_url: null, // Strict TikTok Display API semantics
    thumbnail_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop",
    permalink: "https://www.tiktok.com/@bulindev",
    published_at: "2026-10-04T16:00:00Z",
    account_username: "bulindev",
  },
  {
    id: "sf_porto_5",
    provider: "instagram",
    provider_media_id: "ig_arch_1",
    type: "image",
    caption: "Architecture whiteboard: Multi-tenant social feed ingestion with AES-256 encrypted token casts & keyset pagination.",
    media_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop",
    thumbnail_url: null,
    permalink: "https://github.com/Tnembull/social-feed-api",
    published_at: "2026-10-03T11:20:00Z",
    account_username: "bulindev",
  },
  {
    id: "sf_porto_6",
    provider: "tiktok",
    provider_media_id: "tt_billiard_2",
    type: "video",
    caption: "Weekend 9-ball tournament highlight from Drach3n Arena Lampung. Full house night! 🏆🎱",
    media_url: null, // Strict TikTok Display API semantics
    thumbnail_url: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=600&auto=format&fit=crop",
    permalink: "https://www.tiktok.com/@drachen_billiard",
    published_at: "2026-10-02T18:45:00Z",
    account_username: "drachen_billiard",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const rawLimit = searchParams.get("limit") || "6";
  const limit = Math.max(1, Math.min(20, parseInt(rawLimit, 10) || 6));

  const apiUrl = process.env.SOCIAL_FEED_API_URL || "http://127.0.0.1:8000/api/v1";
  const apiKey = process.env.SOCIAL_FEED_API_KEY;

  // If live backend credentials are provided, attempt upstream query
  if (apiKey) {
    try {
      const upstreamUrl = new URL(`${apiUrl.replace(/\/+$/, "")}/feed`);
      upstreamUrl.searchParams.set("limit", String(limit));
      if (provider && ["instagram", "tiktok"].includes(provider)) {
        upstreamUrl.searchParams.set("provider", provider);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const upstreamRes = await fetch(upstreamUrl.toString(), {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache on Next.js Data Cache for 5 minutes
      });

      clearTimeout(timeoutId);

      if (upstreamRes.ok) {
        const json = await upstreamRes.json();
        if (Array.isArray(json?.data) && json.data.length > 0) {
          return NextResponse.json({
            source: "live_api",
            data: json.data,
            pagination: json.pagination,
          });
        }
      }
    } catch {
      // Fallback gracefully on network timeout or warming-up accounts
    }
  }

  // Filter curated default items
  let items = DEFAULT_FEED_ITEMS;
  if (provider && ["instagram", "tiktok"].includes(provider)) {
    items = items.filter((item) => item.provider === provider);
  }
  items = items.slice(0, limit);

  return NextResponse.json({
    source: "curated_feed",
    data: items,
    pagination: {
      has_more: false,
      next_cursor: null,
    },
  });
}
