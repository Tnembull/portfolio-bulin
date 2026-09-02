"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TabType } from "@/components/app-layout/types";
import MobileHeader from "@/components/app-layout/MobileHeader";
import BottomNavBar from "@/components/app-layout/BottomNavBar";
import DesktopSidebar from "@/components/app-layout/DesktopSidebar";
import ProjectsTab from "@/components/tabs/ProjectsTab";

export default function ProjectsClientView() {
  const router = useRouter();

  const handleTabChange = (tab: TabType) => {
    router.push(`/?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased selection:bg-accent selection:text-background">
      {/* 1. Desktop Left Sidebar Rail */}
      <DesktopSidebar activeTab="projects" onTabChange={handleTabChange} />

      {/* 2. Main Content Stage */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Sticky Top Header */}
        <MobileHeader onAvatarClick={() => handleTabChange("home")} />

        {/* Dynamic Content Viewport */}
        <main
          id="main-content"
          className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 pb-24 md:pb-16"
        >
          <ProjectsTab />
        </main>

        {/* Mobile Fixed Bottom Navigation */}
        <BottomNavBar activeTab="projects" onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
