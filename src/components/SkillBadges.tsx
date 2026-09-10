"use client";

import React, { useState } from "react";
import { Wrench } from "lucide-react";
import { resolveTechIconUrl } from "@/data/techIcons";

export const TECH_ICON_MAP: Record<string, string> = {
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "nextjs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "ts": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "nodejs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "anaconda": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg",
  "jupyter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  "php": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  "mysql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "aws": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "codeigniter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain.svg",
  "postgres": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "postgresql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  "k8s": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  "golang": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  "go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  "parrot": "https://api.iconify.design/simple-icons:parrotsecurity.svg",
  "parrot security": "https://api.iconify.design/simple-icons:parrotsecurity.svg",
  "redis": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  "git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "github": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "nginx": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
  "terraform": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
  "react": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "tailwindcss": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "mongodb": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "graphql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  "bash": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "grafana": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
  "prometheus": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
  "ansible": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg",
  "jenkins": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
};

export interface SkillPillItem {
  id: string;
  name: string;
  icon?: string;
}

export const DEFAULT_SKILL_PILLS: SkillPillItem[] = [
  { id: "p-1", name: "Next.js", icon: "nextjs" },
  { id: "p-2", name: "Typescript", icon: "typescript" },
  { id: "p-3", name: "Node.js", icon: "nodejs" },
  { id: "p-4", name: "Python", icon: "python" },
  { id: "p-5", name: "Anaconda", icon: "anaconda" },
  { id: "p-6", name: "Jupyter", icon: "jupyter" },
  { id: "p-7", name: "PHP", icon: "php" },
  { id: "p-8", name: "MySQL", icon: "mysql" },
  { id: "p-9", name: "AWS", icon: "aws" },
  { id: "p-10", name: "Laravel", icon: "laravel" },
  { id: "p-11", name: "Codeigniter", icon: "codeigniter" },
  { id: "p-12", name: "Postgres", icon: "postgresql" },
  { id: "p-13", name: "Docker", icon: "docker" },
  { id: "p-14", name: "Kubernetes", icon: "kubernetes" },
  { id: "p-15", name: "Golang", icon: "go" },
  { id: "p-16", name: "Parrot", icon: "parrot" },
  { id: "p-17", name: "Redis", icon: "redis" },
];

export function resolveSkillIcon(name: string, iconOverride?: string): string | null {
  if (iconOverride && (iconOverride.startsWith("http://") || iconOverride.startsWith("https://") || iconOverride.startsWith("/"))) {
    return iconOverride;
  }

  const query = (iconOverride || name).toLowerCase().trim();
  if (TECH_ICON_MAP[query]) {
    return TECH_ICON_MAP[query];
  }

  return resolveTechIconUrl(name, iconOverride);
}

interface SkillBadgesProps {
  title?: string;
  items?: SkillPillItem[];
  className?: string;
}

function PillBadge({ item }: { item: SkillPillItem }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = resolveSkillIcon(item.name, item.icon);

  return (
    <div
      className="inline-flex items-center gap-2 bg-white text-[#111827] px-3.5 py-1.5 rounded-lg border border-neutral-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md hover:scale-[1.03] transition-all duration-150 cursor-default select-none"
    >
      {iconUrl && !imgError ? (
        <img
          src={iconUrl}
          alt={item.name}
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] object-contain shrink-0"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <Wrench size={14} className="text-neutral-600 shrink-0" />
      )}
      <span className="font-sans font-semibold text-xs sm:text-[13px] tracking-tight text-neutral-900 whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

export default function SkillBadges({
  title = "Keahlian",
  items = DEFAULT_SKILL_PILLS,
  className = "",
}: SkillBadgesProps) {
  const displayItems = items && items.length > 0 ? items : DEFAULT_SKILL_PILLS;

  return (
    <section className={`w-full space-y-4 ${className}`}>
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
          {title}
        </h2>
      )}

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {displayItems.map((item, idx) => (
          <PillBadge key={item.id || idx} item={item} />
        ))}
      </div>
    </section>
  );
}
