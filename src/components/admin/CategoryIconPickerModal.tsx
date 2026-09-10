"use client";

import React, { useState, useMemo } from "react";
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
  Radio,
  Binary,
  Network,
  Settings,
  Key,
  FileCode,
  Wrench,
  Zap,
  Globe,
  Router,
  Sparkles,
  Search,
  X,
  LucideProps,
} from "lucide-react";

export interface CategoryIconDef {
  id: string;
  label: string;
  category: string;
  icon: React.ComponentType<LucideProps>;
}

export const ALL_CATEGORY_ICONS: CategoryIconDef[] = [
  { id: "server", label: "Server / Backend", category: "Backend", icon: Server },
  { id: "workflow", label: "Workflow / CI-CD", category: "DevOps", icon: Workflow },
  { id: "git-branch", label: "Git / Branch", category: "DevOps", icon: GitBranch },
  { id: "database", label: "Database / SQL", category: "Data", icon: Database },
  { id: "shield-check", label: "Shield Check / Security", category: "Security", icon: ShieldCheck },
  { id: "shield", label: "Shield / Security", category: "Security", icon: Shield },
  { id: "activity", label: "Activity / Monitoring", category: "DevOps", icon: Activity },
  { id: "terminal", label: "Terminal / CLI", category: "DevOps", icon: Terminal },
  { id: "cpu", label: "CPU / Hardware", category: "System", icon: Cpu },
  { id: "cloud", label: "Cloud / Infra", category: "DevOps", icon: Cloud },
  { id: "code", label: "Code / API", category: "Backend", icon: Code },
  { id: "boxes", label: "Boxes / Containers", category: "DevOps", icon: Boxes },
  { id: "layers", label: "Layers / Architecture", category: "Architecture", icon: Layers },
  { id: "lock", label: "Lock / Auth", category: "Security", icon: Lock },
  { id: "key", label: "Key / Access Control", category: "Security", icon: Key },
  { id: "line-chart", label: "Metrics / Analytics", category: "Monitoring", icon: LineChart },
  { id: "hard-drive", label: "Storage / Disk", category: "Data", icon: HardDrive },
  { id: "gauge", label: "Gauge / Performance", category: "Monitoring", icon: Gauge },
  { id: "network", label: "Network / Cluster", category: "System", icon: Network },
  { id: "radio", label: "Radio / Telemetry", category: "Monitoring", icon: Radio },
  { id: "binary", label: "Binary / Assembly", category: "System", icon: Binary },
  { id: "router", label: "Router / Gateway", category: "System", icon: Router },
  { id: "zap", label: "Zap / Event-driven", category: "Backend", icon: Zap },
  { id: "file-code", label: "File Code / Scripts", category: "Backend", icon: FileCode },
  { id: "wrench", label: "Wrench / Maintenance", category: "DevOps", icon: Wrench },
  { id: "settings", label: "Settings / Config", category: "DevOps", icon: Settings },
  { id: "globe", label: "Globe / Distributed", category: "Architecture", icon: Globe },
  { id: "sparkles", label: "Sparkles / AI", category: "Architecture", icon: Sparkles },
];

interface CategoryIconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconId: string) => void;
}

export default function CategoryIconPickerModal({
  isOpen,
  onClose,
  onSelect,
}: CategoryIconPickerModalProps) {
  const [query, setQuery] = useState("");

  const filteredIcons = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ALL_CATEGORY_ICONS;
    return ALL_CATEGORY_ICONS.filter(
      (item) =>
        item.id.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl border border-[#483145] bg-[#1d141e] text-slate-100 shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#483145] bg-[#261826]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#48b685]/10 border border-[#48b685]/20 text-[#48b685]">
              <Layers size={16} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-100">
                PILIH IKON KATEGORI
              </h3>
              <p className="text-[11px] text-[#a392a3]">
                Cari icon kategori engineering untuk kotak keahlian Anda.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#a392a3] hover:text-slate-100 hover:bg-[#483145]/50 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-[#483145] bg-[#19131a]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a392a3]"
            />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari icon (contoh: server, cloud, database, shield, lock, cpu)..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 placeholder-[#a392a3]/60 outline-none text-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a392a3] hover:text-slate-100 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Grid of Category Icons */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[50vh]">
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredIcons.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelect(item.id);
                      onClose();
                    }}
                    className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-[#483145] bg-[#261826]/70 hover:bg-[#2f1e2e] hover:border-[#48b685] transition-all text-left cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-[#48b685]/10 border border-[#48b685]/20 text-[#48b685] group-hover:scale-110 transition-transform shrink-0">
                      <IconComponent size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-100 truncate group-hover:text-[#48b685] transition-colors">
                        {item.id}
                      </div>
                      <div className="text-[10px] text-[#a392a3] truncate">
                        {item.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#a392a3]">
              Tidak ada icon yang cocok untuk &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#483145] bg-[#261826] flex items-center justify-between text-[10px] text-[#a392a3]">
          <span>{ALL_CATEGORY_ICONS.length} Ikon Tersedia</span>
          <button
            type="button"
            onClick={() => {
              onSelect("");
              onClose();
            }}
            className="text-[#48b685] hover:underline cursor-pointer"
          >
            Set Otomatis (Default)
          </button>
        </div>
      </div>
    </div>
  );
}
