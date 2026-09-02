"use client";

import React from "react";
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
  const { hero } = state;

  const avatarSrc = hero.avatarOff || hero.avatarOn || "/avatar.jpg";
  const name = hero.name || "Muhammad Nur Ashiddiqi";
  const role = hero.role || "DevOps & Backend Engineer";

  return (
    <aside className="hidden md:flex flex-col justify-between w-64 h-screen sticky top-0 shrink-0 bg-[#0b0d0f] border-r border-[#252a30] p-6 z-30 select-none">
      {/* Top: Identity & Navigation */}
      <div className="space-y-8">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-md overflow-hidden border border-[#252a30] bg-[#111418] shrink-0">
            <Image
              src={avatarSrc}
              alt={name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="text-sm font-semibold text-[#f2f4f5] truncate">
              {name}
            </h2>
            <p className="text-xs text-[#9aa1a9] truncate">{role}</p>
          </div>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-2 text-xs text-[#9aa1a9]">
          <span className="size-1.5 rounded-full bg-[#00c896]" />
          <span>Available for collaboration</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1" aria-label="Sidebar navigation">
          {NAV_TABS.map((tab) => {
            const Icon = ICON_MAP[tab.iconName];
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? "bg-[#111418] text-[#00c896] border border-[#252a30]"
                    : "text-[#9aa1a9] hover:text-[#f2f4f5] hover:bg-[#111418] border border-transparent"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.7} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Socials & Controls */}
      <div className="space-y-4 pt-4 border-t border-[#252a30]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Tnembull"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="size-8 rounded-md flex items-center justify-center bg-[#111418] border border-[#252a30] text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors"
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com/in/muhammadnurashiddiqi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="size-8 rounded-md flex items-center justify-center bg-[#111418] border border-[#252a30] text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:muhammadnurashiddiqi@gmail.com"
              aria-label="Email"
              className="size-8 rounded-md flex items-center justify-center bg-[#111418] border border-[#252a30] text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors"
            >
              <Mail size={14} />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/admin"
              title="Admin console"
              className="size-8 rounded-md flex items-center justify-center bg-[#111418] border border-[#252a30] text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors"
            >
              <Shield size={13} />
            </Link>
          </div>
        </div>

        <div className="text-[11px] text-[#6f7781]">
          &copy; 2026 Muhammad Nur Ashiddiqi
        </div>
      </div>
    </aside>
  );
}
