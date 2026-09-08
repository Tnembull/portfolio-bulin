"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabType, NAV_TABS } from "./types";
import { usePortfolio } from "@/context/PortfolioContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Github, Linkedin, Mail } from "lucide-react";

interface TopNavbarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export default function TopNavbar({
  activeTab,
  onTabChange,
}: TopNavbarProps = {}) {
  const pathname = usePathname();
  const { state } = usePortfolio();
  const { hero } = state;

  const avatarSrc = hero?.avatarOff || hero?.avatarOn || "/logo/logo.png";
  const name = hero?.name || "Muhammad Nur Ashiddiqi";
  const role = hero?.role || "DevOps & Backend Engineer";

  const getIsActive = (tabId: TabType, tabHref: string) => {
    if (activeTab) return activeTab === tabId;
    if (tabHref === "/") return pathname === "/";
    return pathname.startsWith(tabHref);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md border-b border-border transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Avatar */}
        <Link
          href="/"
          className="flex items-center gap-3 text-left cursor-pointer group shrink-0 select-none"
          title={`${name} — Back to Home`}
        >
          <div className="size-9 rounded-md overflow-hidden border border-border bg-surface shrink-0 group-hover:border-accent transition-colors">
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
            <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors truncate">
              {name}
            </span>
            <span className="text-xs text-secondary truncate hidden sm:block">
              {role}
            </span>
          </div>
        </Link>

        {/* Center: Navigation Tabs (Desktop & Tablet) - Clean Text Navigation without Card or Icons */}
        <nav
          aria-label="Top Navigation Tabs"
          className="hidden md:flex items-center gap-1 sm:gap-2"
        >
          {NAV_TABS.map((tab) => {
            const isActive = getIsActive(tab.id, tab.href);

            const itemClass = `px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? "text-accent font-semibold"
                : "text-secondary hover:text-foreground hover:bg-surface/40"
            }`;

            if (onTabChange) {
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={itemClass}
                >
                  {tab.label}
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={itemClass}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Social Quick Links & ThemeToggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="https://github.com/Tnembull"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub (Tnembull)"
            className="size-8 rounded-md flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
          >
            <Github size={15} />
          </a>

          <a
            href="https://linkedin.com/in/muhammadnurashiddiqi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
            className="size-8 rounded-md hidden sm:flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
          >
            <Linkedin size={15} />
          </a>

          <a
            href="mailto:muhammadnurashiddiqi@gmail.com"
            aria-label="Send email"
            title="Email"
            className="size-8 rounded-md hidden sm:flex items-center justify-center text-secondary hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
          >
            <Mail size={15} />
          </a>

          <div className="pl-1 border-l border-border/80">
            <ThemeToggle className="size-8 rounded-md flex items-center justify-center text-secondary hover:text-foreground border border-border bg-surface hover:bg-surface-secondary transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}
