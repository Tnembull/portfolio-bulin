"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TabType, NAV_TABS } from "./types";
import { usePortfolio } from "@/context/PortfolioContext";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Home,
  Briefcase,
  FolderGit2,
  Cpu,
  Send,
  Github,
  Linkedin,
  Mail,
  Shield,
  Disc,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface DesktopSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ICON_MAP = {
  Home: Home,
  Briefcase: Briefcase,
  FolderGit2: FolderGit2,
  Cpu: Cpu,
  Send: Send,
};

export default function DesktopSidebar({
  activeTab,
  onTabChange,
}: DesktopSidebarProps) {
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

  const toggleSidebarAudio = () => {
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
    <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 h-screen sticky top-0 shrink-0 bg-[#0e121a]/95 backdrop-blur-xl border-r border-white/[0.08] p-5 z-30 select-none">
      {/* Top Section: Identity & Status */}
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] transition-all hover:bg-white/[0.05]">
          <div className="relative shrink-0">
            <div className="size-12 rounded-full overflow-hidden border border-white/20 bg-slate-800 ring-2 ring-emerald-500/30">
              <Image
                src={avatarSrc}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
                unoptimized
              />
            </div>
            <span className="absolute bottom-0 right-0 size-3.5 bg-emerald-500 border-2 border-[#0e121a] rounded-full animate-pulse" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-slate-100 truncate">
                {name.split(" ")[0]} Bulin
              </h2>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono truncate">{role}</p>
          </div>
        </div>

        {/* Live Availability Badge */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">Open for Work</span>
          </span>
          <span className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-bold">
            2026
          </span>
        </div>

        {/* Middle: Navigation Tabs */}
        <nav className="space-y-1.5" aria-label="Desktop App Navigation">
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Navigation Menu
          </div>
          {NAV_TABS.map((tab) => {
            const Icon = ICON_MAP[tab.iconName];
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 shadow-[0_0_15px_rgba(0,216,146,0.15)] translate-x-1"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`transition-colors ${
                      isActive ? "text-emerald-400 stroke-[2.2]" : "text-slate-400"
                    }`}
                  />
                  <span>{tab.label}</span>
                </div>

                {isActive && (
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00d892]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Media, Socials & Admin */}
      <div className="space-y-4 pt-4 border-t border-white/[0.08]">
        {/* Audio Player Strip */}
        {music && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2.5 min-w-0">
              <Disc
                size={16}
                className={`text-slate-400 shrink-0 ${
                  isPlayingAudio ? "animate-spin text-emerald-400" : ""
                }`}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-slate-200 truncate">
                  {music.title || "Walking Back Home"}
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  {music.artist || "FUR"}
                </span>
              </div>
            </div>
            <button
              onClick={toggleSidebarAudio}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
              title={isPlayingAudio ? "Pause" : "Play"}
            >
              <Disc size={14} />
            </button>
          </div>
        )}

        {/* Quick Social Links */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Tnembull"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="size-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 transition-all"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com/in/bulin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="size-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="mailto:contact@bulindev.tech"
              aria-label="Send Email"
              className="size-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            >
              <Mail size={15} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/admin"
              title="Admin Portal"
              className="size-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            >
              <Shield size={14} />
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-slate-500 text-center font-mono">
          bulindev.tech &copy; 2026
        </div>
      </div>
    </aside>
  );
}
