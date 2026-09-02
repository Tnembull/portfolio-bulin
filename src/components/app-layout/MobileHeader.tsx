"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Shield } from "lucide-react";

interface MobileHeaderProps {
  onAvatarClick?: () => void;
}

export default function MobileHeader({ onAvatarClick }: MobileHeaderProps) {
  const { state } = usePortfolio();
  const { hero } = state;

  const avatarSrc = hero.avatarOff || hero.avatarOn || "/avatar.jpg";
  const name = hero.name || "Muhammad Nur Ashiddiqi";
  const role = hero.role || "DevOps & Backend Engineer";

  return (
    <header className="sticky top-0 z-40 w-full md:hidden bg-[#0b0d0f] border-b border-[#252a30] px-4 py-3 flex items-center justify-between">
      {/* Left: Avatar & Identity */}
      <button
        onClick={onAvatarClick}
        className="flex items-center gap-3 text-left cursor-pointer select-none"
      >
        <div className="size-9 rounded-md overflow-hidden border border-[#252a30] bg-[#111418] shrink-0">
          <Image
            src={avatarSrc}
            alt={name}
            width={36}
            height={36}
            className="w-full h-full object-cover"
            priority
            unoptimized
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-[#f2f4f5] truncate">
            {name}
          </span>
          <span className="text-[11px] text-[#9aa1a9] truncate">
            {role}
          </span>
        </div>
      </button>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/admin"
          aria-label="Admin console"
          className="size-7 rounded-md flex items-center justify-center bg-[#111418] border border-[#252a30] text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors"
        >
          <Shield size={13} />
        </Link>
      </div>
    </header>
  );
}
