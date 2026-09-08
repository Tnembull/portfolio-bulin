"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TabType } from "./types";
import FloatingNav from "./FloatingNav";
import BottomNavBar from "./BottomNavBar";
import HomeTab from "@/components/tabs/HomeTab";
import ExperienceTab from "@/components/tabs/ExperienceTab";
import ProjectsTab from "@/components/tabs/ProjectsTab";
import SkillsTab from "@/components/tabs/SkillsTab";
import ContactTab from "@/components/tabs/ContactTab";

function AppShellContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("home");

  // Sync tab from URL query (?tab=...) on mount & url changes
  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabType;
    if (
      tabParam &&
      ["home", "experience", "projects", "skills", "contact"].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    } else {
      const hash = window.location.hash.replace("#", "") as TabType;
      if (
        hash &&
        ["home", "experience", "projects", "skills", "contact"].includes(hash)
      ) {
        setActiveTab(hash);
      }
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-accent selection:text-background relative">
      {/* 1. Centered Floating Island Navigation */}
      <FloatingNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 2. Main Content Viewport (Expanded full-width) */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-24 md:pb-16"
      >
        {activeTab === "home" && <HomeTab onNavigateTab={handleTabChange} />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "contact" && <ContactTab />}
      </main>

      {/* 3. Mobile Fixed Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default function AppShell() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-secondary font-mono text-xs">
          Loading...
        </div>
      }
    >
      <AppShellContent />
    </Suspense>
  );
}
