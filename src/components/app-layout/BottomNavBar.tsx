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
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0b0e14]/90 backdrop-blur-2xl border-t border-white/[0.08] px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {NAV_TABS.map((tab) => {
          const Icon = ICON_MAP[tab.iconName];
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 cursor-pointer active:scale-90 select-none ${
                isActive
                  ? "text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {/* Material You Pill Indicator for Active State */}
              <div
                className={`relative flex items-center justify-center px-4 py-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500/20 shadow-[0_0_12px_rgba(0,216,146,0.3)] border border-emerald-500/30"
                    : "bg-transparent"
                }`}
              >
                <Icon
                  size={19}
                  className={`transition-transform duration-200 ${
                    isActive ? "scale-110 stroke-[2.4]" : "stroke-[1.7]"
                  }`}
                />
              </div>

              {/* Tab Label */}
              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-all ${
                  isActive ? "font-bold text-emerald-400" : "font-medium text-slate-400"
                }`}
              >
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
