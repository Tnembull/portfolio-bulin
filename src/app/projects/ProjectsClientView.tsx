"use client";

import React from "react";
import PageLayout from "@/components/app-layout/PageLayout";
import ProjectsTab from "@/components/tabs/ProjectsTab";

export default function ProjectsClientView() {
  return (
    <PageLayout>
      <ProjectsTab />
    </PageLayout>
  );
}
