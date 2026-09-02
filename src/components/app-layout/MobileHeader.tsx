"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles, Shield, Disc, Volume2, VolumeX, Pause, Play } from "lucide-react";
import Link from "next/link";

interface MobileHeaderProps {
  onAvatarClick?: () => void;
}

export default function MobileHeader({ onAvatarClick }: MobileHeaderProps) {
  const { state } = usePortfolio();
  const { hero, music } = state;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioRef] = useState<HTMLAudioElement | null>(() => {
    if (typeof window !== "undefined") {
      const audioUrl = music?.audioUrl || "/audio/FUR - Walking Back Home.mp3";
      return new Audio(audioUrl);
    }
    return null;
  });

  const toggleMiniAudio = () => {
    if (!audioRef) return;
    if (isPlayingAudio) {
      audioRef.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(false));
    }
  };

  const avatarSrc = hero.avatarOn || hero.avatarOff || "/avatar.jpg";
  const name = hero.name || "Muhammad Nur Ashiddiqi";
  const role = hero.role || "DevOps & Cloud Engineer";

  return (
    <header className="sticky top-0 z-40 w-full md:hidden bg-[#0b0e14]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between transition-all">
      {/* Left: Avatar & Identity */}
      <div
        onClick={onAvatarClick}
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <div className="relative">
          <div className="size-9 rounded-full overflow-hidden border border-white/20 bg-slate-800 relative ring-2 ring-emerald-500/30">
            <Image
              src={avatarSrc}
              alt={name}
              width={36}
              height={36}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              priority
              unoptimized
            />
          </div>
          {/* Live indicator dot */}
          <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-[#0b0e14] rounded-full animate-pulse" />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xs font-bold text-slate-100 tracking-tight truncate max-w-[150px]">
              {name.split(" ")[0]} Bulin
            </h1>
            <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
              PRO
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono truncate max-w-[155px]">
            {role}
          </p>
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-1.5">
        {/* Audio Ambient Button */}
        {music && (
          <button
            onClick={toggleMiniAudio}
            aria-label="Toggle background sound"
            title={isPlayingAudio ? "Pause background track" : "Play background track"}
            className={`size-8 rounded-full flex items-center justify-center border transition-all ${
              isPlayingAudio
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-spin-slow"
                : "bg-white/[0.04] text-slate-400 border-white/10 hover:text-slate-200"
            }`}
          >
            <Disc size={15} className={isPlayingAudio ? "animate-spin" : ""} />
          </button>
        )}

        {/* Theme Toggle */}
        <div className="p-0.5">
          <ThemeToggle />
        </div>

        {/* Admin Link shortcut */}
        <Link
          href="/admin"
          aria-label="Admin Portal"
          className="size-8 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
        >
          <Shield size={14} />
        </Link>
      </div>
    </header>
  );
}
