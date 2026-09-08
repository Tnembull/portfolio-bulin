"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio, ClientItem } from "@/context/PortfolioContext";
import { Building2, ExternalLink } from "lucide-react";

export default function ClientsMarquee() {
  const { state } = usePortfolio();
  const clients = state.clients;

  const rawItems: ClientItem[] = clients?.items || [];
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  if (rawItems.length === 0) {
    return null;
  }

  // Duplicate items to make an unbroken infinite scroll loop
  const marqueeItems = [...rawItems, ...rawItems];

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const sectionBadge = clients?.sectionBadge || "COLLABORATIONS // CLIENTS";
  const titleMain = clients?.titleMain || "Organizations &";
  const titleHighlight = clients?.titleHighlight || "Clients";
  const subText = clients?.subText;

  return (
    <section id="clients" className="w-full space-y-6 pt-2 pb-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            <span>{sectionBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {titleMain} <span className="text-accent">{titleHighlight}</span>
          </h2>
          {subText && (
            <p className="text-xs sm:text-sm text-secondary mt-1">
              {subText}
            </p>
          )}
        </div>
      </div>

      {/* Marquee Wrapper with edge fade masks */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Right Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="animate-marquee flex items-center gap-4">
          {marqueeItems.map((item, idx) => {
            const hasError = imageErrors[`${item.id}-${idx}`];
            const hasLogo = item.logoSrc && item.logoSrc.trim() !== "" && !hasError;

            const CardContent = (
              <div className="flex items-center gap-3.5 px-4 py-3 rounded-lg border border-border bg-surface hover:bg-surface-secondary hover:border-accent/50 transition-all duration-300 shrink-0 group">
                {/* Logo or Icon Fallback */}
                <div className="size-10 rounded-md border border-border bg-surface-secondary flex items-center justify-center shrink-0 overflow-hidden relative">
                  {hasLogo ? (
                    <Image
                      src={item.logoSrc!}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                      onError={() => handleImageError(`${item.id}-${idx}`)}
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center font-mono text-xs font-bold text-accent">
                      {item.name ? item.name.charAt(0).toUpperCase() : <Building2 size={16} />}
                    </div>
                  )}
                </div>

                {/* Information */}
                <div className="min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    {item.url && (
                      <ExternalLink
                        size={11}
                        className="text-muted group-hover:text-accent transition-colors shrink-0 opacity-70"
                      />
                    )}
                  </div>
                  {item.industry && (
                    <p className="font-mono text-[11px] text-muted truncate">
                      {item.industry}
                    </p>
                  )}
                </div>
              </div>
            );

            if (item.url) {
              return (
                <a
                  key={`${item.id}-${idx}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                  title={item.name}
                >
                  {CardContent}
                </a>
              );
            }

            return <div key={`${item.id}-${idx}`}>{CardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
