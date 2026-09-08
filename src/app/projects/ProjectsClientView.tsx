"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TabType } from "@/components/app-layout/types";
import FloatingNav from "@/components/app-layout/FloatingNav";
import BottomNavBar from "@/components/app-layout/BottomNavBar";
import ProjectsTab from "@/components/tabs/ProjectsTab";

export default function ProjectsClientView() {
  const router = useRouter();

  const handleTabChange = (tab: TabType) => {
    router.push(`/?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-accent selection:text-background relative">
      {/* 1. Centered Floating Island Navigation */}
      <FloatingNav activeTab="projects" onTabChange={handleTabChange} />

      {/* 2. Main Content Stage */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-24 md:pb-16"
      >
        <ProjectsTab />
      </main>

      {/* 3. Mobile Fixed Bottom Navigation */}
      <BottomNavBar activeTab="projects" onTabChange={handleTabChange} />
    </div>
  );
}
