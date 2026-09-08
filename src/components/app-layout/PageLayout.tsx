import React from "react";
import TopNavbar from "./TopNavbar";
import BottomNavBar from "./BottomNavBar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-accent selection:text-background">
      {/* 1. Full-Width Sticky Top Navigation Bar */}
      <TopNavbar />

      {/* 2. Main Content Viewport */}
      <main
        id="main-content"
        className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 pb-24 md:pb-16"
      >
        {children}
      </main>

      {/* 3. Mobile Fixed Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}
