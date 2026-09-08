"use client";

import React from "react";
import Image from "next/image";
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
} from "lucide-react";

interface FloatingNavProps {
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

export default function FloatingNav({
  activeTab,
  onTabChange,
}: FloatingNavProps) {
  const { state } = usePortfolio();
  const { hero } = state;

  const avatarSrc = hero?.avatarOff || hero?.avatarOn || "/logo/logo.png";
  const name = hero?.name || "Muhammad Nur Ashiddiqi";

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[calc(100vw-1.5rem)] select-none">
      <nav
        aria-label="Main Floating Navigation"
        className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/5 dark:shadow-black/40 transition-colors"
      >
        {/* Left: Avatar Profile Button */}
        <button
          onClick={() => onTabChange("home")}
          title={`${name} — Back to Home`}
          aria-label="Back to Home tab"
          className="group relative flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-accent/40 transition-all cursor-pointer shrink-0"
        >
          <div className="size-7 sm:size-8 rounded-full overflow-hidden border border-border bg-surface shrink-0">
            <Image
              src={avatarSrc}
              alt={name}
              width={32}
              height={32}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              priority
              sizes="32px"
              unoptimized
            />
          </div>
          <span className="size-2 rounded-full bg-accent absolute -bottom-0.5 -right-0.5 ring-2 ring-background" />
        </button>

        {/* Separator */}
        <div className="h-4 w-px bg-border/70 mx-0.5 sm:mx-1 shrink-0" />

        {/* Center: Tabs List */}
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar py-0.5">
          {NAV_TABS.map((tab) => {
            const Icon = ICON_MAP[tab.iconName];
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-surface text-accent border border-border font-semibold shadow-xs"
                    : "text-secondary hover:text-foreground hover:bg-surface/50 border border-transparent"
                }`}
              >
                <Icon size={14} strokeWidth={isActive ? 2.2 : 1.7} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="inline md:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-border/70 mx-0.5 sm:mx-1 shrink-0" />

        {/* Right: Quick Socials & Theme Toggle */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <a
            href="https://github.com/Tnembull"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub (Tnembull)"
            className="size-7 sm:size-8 rounded-full flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface transition-colors"
          >
            <Github size={14} />
          </a>

          <a
            href="https://linkedin.com/in/muhammadnurashiddiqi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
            className="size-7 sm:size-8 rounded-full hidden sm:flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface transition-colors"
          >
            <Linkedin size={14} />
          </a>

          <a
            href="mailto:muhammadnurashiddiqi@gmail.com"
            aria-label="Send email"
            title="Email"
            className="size-7 sm:size-8 rounded-full hidden sm:flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface transition-colors"
          >
            <Mail size={14} />
          </a>

          <ThemeToggle className="size-7 sm:size-8 rounded-full flex items-center justify-center text-secondary hover:text-foreground border border-border bg-surface hover:bg-surface-secondary transition-colors cursor-pointer" />
        </div>
      </nav>
    </header>
  );
}
