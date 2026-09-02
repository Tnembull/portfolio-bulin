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
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0b0d0f] border-t border-[#252a30] px-2 py-1.5"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {NAV_TABS.map((tab) => {
          const Icon = ICON_MAP[tab.iconName];
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                isActive
                  ? "text-[#00c896]"
                  : "text-[#6f7781] hover:text-[#9aa1a9]"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />
              <span className="text-[10px] mt-1 font-medium tracking-tight">
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
