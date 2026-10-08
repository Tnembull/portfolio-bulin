"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, RefreshCw } from "lucide-react";

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

export default function SocialFeedSection() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [filter, setFilter] = useState<"all" | "instagram" | "tiktok">("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchFeed = async (selectedProvider: "all" | "instagram" | "tiktok") => {
    try {
      const url =
        selectedProvider === "all"
          ? "/api/feed?limit=6"
          : `/api/feed?limit=6&provider=${selectedProvider}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json?.data)) {
          setItems(json.data);
        }
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFeed(filter);
  }, [filter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchFeed(filter);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
              LIVE SOCIAL FEED
            </h2>
          </div>
          <p className="text-sm text-secondary mt-1">
            Official normalized updates synced from Instagram &amp; TikTok accounts.
          </p>
        </div>

        {/* Filter Pills & Refresh */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-md border border-border p-0.5 bg-surface text-xs font-mono">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === "all"
                  ? "bg-accent text-accent-text font-semibold"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("instagram")}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === "instagram"
                  ? "bg-accent text-accent-text font-semibold"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Instagram
            </button>
            <button
              onClick={() => setFilter("tiktok")}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === "tiktok"
                  ? "bg-accent text-accent-text font-semibold"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              TikTok
            </button>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-md border border-border bg-surface hover:bg-surface-secondary text-secondary hover:text-foreground transition-colors disabled:opacity-50"
            title="Refresh feed"
            aria-label="Refresh feed"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-accent" : ""} />
          </button>
        </div>
      </div>

      {/* Feed Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-lg border border-border bg-surface p-3 space-y-3 animate-pulse"
            >
              <div className="aspect-square w-full rounded bg-surface-secondary" />
              <div className="h-3 w-3/4 rounded bg-surface-secondary" />
              <div className="h-2.5 w-1/2 rounded bg-surface-secondary" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-xs text-muted font-mono">
          No social posts available for this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const isTikTok = item.provider === "tiktok";
            const imageUrl = item.media_url || item.thumbnail_url || "";
            const permalink = item.permalink || "#";
            const formattedDate = new Date(item.published_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-lg border border-border bg-surface overflow-hidden hover:border-accent/50 transition-all duration-200"
              >
                {/* Media Aspect Container */}
                <div className="relative aspect-square w-full bg-surface-secondary overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.caption || "Social post"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-muted">
                      No Media Preview
                    </div>
                  )}

                  {/* Provider Pill */}
                  <span
                    className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md ${
                      isTikTok
                        ? "bg-black/75 text-cyan-300 border border-cyan-500/30"
                        : "bg-pink-950/75 text-pink-300 border border-pink-500/30"
                    }`}
                  >
                    {item.provider}
                  </span>

                  {/* Type Badge */}
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/60 text-white/90">
                    {item.type === "carousel_album" ? "Album" : item.type === "video" ? "Video" : "Photo"}
                  </span>

                  {/* TikTok Play Overlay */}
                  {isTikTok && (
                    <a
                      href={permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-x-2.5 bottom-2.5 py-1.5 px-2.5 rounded bg-black/80 hover:bg-black text-white text-[11px] font-mono font-medium flex items-center justify-center gap-1.5 backdrop-blur-sm transition-colors"
                    >
                      <Play size={10} className="fill-white" />
                      <span>Watch on TikTok</span>
                      <ArrowUpRight size={11} className="opacity-70 ml-auto" />
                    </a>
                  )}
                </div>

                {/* Card Meta & Caption */}
                <div className="p-3.5 flex flex-col flex-1 gap-2 text-xs">
                  <div className="flex items-center justify-between text-muted font-mono text-[11px]">
                    <span className="text-secondary font-medium">
                      @{item.account_username || "user"}
                    </span>
                    <time dateTime={item.published_at}>{formattedDate}</time>
                  </div>

                  <p className="text-secondary line-clamp-2 leading-relaxed flex-1">
                    {item.caption || "No caption provided."}
                  </p>

                  {!isTikTok && permalink !== "#" && (
                    <div className="pt-1 mt-auto">
                      <a
                        href={permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
                      >
                        <span>View on Instagram</span>
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
