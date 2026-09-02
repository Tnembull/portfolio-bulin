"use client";

import React from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import ThemeToggle from "@/components/ThemeToggle";

interface MobileHeaderProps {
  onAvatarClick?: () => void;
}

export default function MobileHeader({ onAvatarClick }: MobileHeaderProps) {
  const { state } = usePortfolio();
  const { hero } = state;

  const avatarSrc = hero.avatarOff || hero.avatarOn || "/logo/logo.png";
  const name = hero.name || "Muhammad Nur Ashiddiqi";
  const role = hero.role || "DevOps & Backend Engineer";

  return (
    <header className="sticky top-0 z-40 w-full md:hidden bg-background border-b border-border px-3 sm:px-4 py-2.5 pt-[max(0.65rem,env(safe-area-inset-top,0.65rem))] flex items-center justify-between transition-colors">
      {/* Left: Avatar & Identity */}
      <button
        onClick={onAvatarClick}
        className="flex items-center gap-2.5 text-left cursor-pointer select-none min-w-0"
      >
        <div className="size-8 sm:size-9 rounded-md overflow-hidden border border-border bg-surface shrink-0">
          <Image
            src={avatarSrc}
            alt={name}
            width={36}
            height={36}
            className="w-full h-full object-cover"
            priority
            sizes="36px"
            unoptimized
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-foreground truncate max-w-[200px] sm:max-w-[260px]">
            {name}
          </span>
          <span className="text-[10px] sm:text-[11px] text-secondary truncate max-w-[200px] sm:max-w-[260px]">
            {role}
          </span>
        </div>
      </button>

      {/* Right: Theme Toggle Only (No public Admin button) */}
      <div className="flex items-center shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
}
