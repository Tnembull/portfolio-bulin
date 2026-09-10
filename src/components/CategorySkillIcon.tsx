"use client";

import React from "react";
import {
  Server,
  Workflow,
  GitBranch,
  Database,
  ShieldCheck,
  Shield,
  Activity,
  Terminal,
  Cpu,
  Cloud,
  Code,
  Boxes,
  Layers,
  Lock,
  LineChart,
  HardDrive,
  Gauge,
  LucideProps,
} from "lucide-react";

export interface CategoryIconOption {
  id: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
}

export const CATEGORY_ICON_OPTIONS: CategoryIconOption[] = [
  { id: "server", label: "Server / Backend", icon: Server },
  { id: "workflow", label: "Workflow / CI-CD", icon: Workflow },
  { id: "git-branch", label: "Git / Branch", icon: GitBranch },
  { id: "database", label: "Database / SQL", icon: Database },
  { id: "shield-check", label: "Shield / Security", icon: ShieldCheck },
  { id: "activity", label: "Activity / Monitoring", icon: Activity },
  { id: "terminal", label: "Terminal / Shell", icon: Terminal },
  { id: "cpu", label: "CPU / Hardware", icon: Cpu },
  { id: "cloud", label: "Cloud / Infra", icon: Cloud },
  { id: "code", label: "Code / API", icon: Code },
  { id: "boxes", label: "Boxes / Containers", icon: Boxes },
  { id: "layers", label: "Layers / Architecture", icon: Layers },
  { id: "lock", label: "Lock / Security", icon: Lock },
  { id: "line-chart", label: "Metrics / Analytics", icon: LineChart },
  { id: "hard-drive", label: "Storage / Hard Drive", icon: HardDrive },
  { id: "gauge", label: "Performance / Gauge", icon: Gauge },
];

export function resolveCategoryIcon(
  iconName?: string,
  title?: string
): React.ComponentType<LucideProps> {
  const normIcon = (iconName || "").toLowerCase().trim().replace(/_/g, "-");

  // 1. Direct match by ID
  const matched = CATEGORY_ICON_OPTIONS.find((opt) => opt.id === normIcon);
  if (matched) return matched.icon;

  // 2. Keyword matching by title
  const t = (title || "").toLowerCase();
  if (t.includes("backend") || t.includes("api") || t.includes("rest")) return Server;
  if (
    t.includes("docker") ||
    t.includes("ci/cd") ||
    t.includes("deploy") ||
    t.includes("pipeline") ||
    t.includes("devops")
  ) {
    return Workflow;
  }
  if (t.includes("database") || t.includes("sql") || t.includes("optim")) return Database;
  if (t.includes("security") || t.includes("auth") || t.includes("hardening") || t.includes("shield")) {
    return ShieldCheck;
  }
  if (
    t.includes("monitor") ||
    t.includes("reliab") ||
    t.includes("log") ||
    t.includes("health") ||
    t.includes("metric")
  ) {
    return Activity;
  }
  if (t.includes("cloud") || t.includes("aws") || t.includes("serverless")) return Cloud;
  if (t.includes("cpu") || t.includes("system") || t.includes("kernel")) return Cpu;
  if (t.includes("container") || t.includes("k8s") || t.includes("kubernetes")) return Boxes;

  return Terminal;
}

interface CategorySkillIconProps extends LucideProps {
  icon?: string;
  title?: string;
}

export default function CategorySkillIcon({
  icon,
  title,
  ...props
}: CategorySkillIconProps) {
  const IconComponent = resolveCategoryIcon(icon, title);
  return <IconComponent {...props} />;
}
