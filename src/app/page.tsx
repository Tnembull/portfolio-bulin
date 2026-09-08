"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/app-layout/PageLayout";
import HomeTab from "@/components/tabs/HomeTab";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Backward-compatibility: redirect ?tab=experience etc. to /experience
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam &&
      ["experience", "projects", "skills", "contact"].includes(tabParam)
    ) {
      router.replace(`/${tabParam}`);
    }
  }, [searchParams, router]);

  return (
    <PageLayout>
      <HomeTab />
    </PageLayout>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-secondary font-mono text-xs">
          Loading...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
