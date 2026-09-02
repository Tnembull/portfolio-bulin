"use client";

import React from "react";
import { TabType, NAV_TABS } from "./types";
import { Home, Briefcase, FolderGit2, Cpu, Send } from "lucide-react";

interface BottomNavBarProps {
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

export default function BottomNavBar({
  activeTab,
  onTabChange,
}: BottomNavBarProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border px-1 sm:px-2 pt-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom,0.4rem))] transition-colors"
    >
      <div className="w-full max-w-md mx-auto flex items-center justify-around">
        {NAV_TABS.map((tab) => {
          const Icon = ICON_MAP[tab.iconName];
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-md transition-colors cursor-pointer select-none ${
                isActive
                  ? "text-accent"
                  : "text-muted hover:text-secondary"
              }`}
            >
              <Icon size={17} strokeWidth={isActive ? 2.2 : 1.7} />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-[60px]">
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
