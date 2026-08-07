"use client";

import { LucideIcon, ArrowRight } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OverviewEditorProps {
  items: MenuItem[];
  onSelectTab: (tab: string) => void;
}

export default function OverviewEditor({ items, onSelectTab }: OverviewEditorProps) {
  return (
    <div className="w-full space-y-6 font-mono">
      {/* Top Banner Card */}
      <div className="p-6 rounded-2xl border border-[#483145] bg-[#2f1e2e] space-y-2.5 shadow-md">
        <span className="text-[10px] font-mono text-[#48b685] font-extrabold uppercase tracking-widest block bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-0.5 rounded-md w-fit">
          [ PANEL KONTROL PORTOFOLIO ]
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
          Pusat Pengelolaan Konten & Data
        </h2>
        <p className="text-xs text-[#a392a3] leading-relaxed max-w-2xl">
          Pilih salah satu panel modul di bawah ini atau gunakan menu navigasi samping untuk memperbarui biografi, proyek, pengalaman kerja, sertifikat, dan statistik portofolio Anda.
        </p>
      </div>

      {/* Grid Overview Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="cyber-card p-5 rounded-xl border border-[#483145] bg-[#2f1e2e] hover:border-[#48b685] hover:bg-[#48b685]/15 transition-all cursor-pointer space-y-3 group shadow-xs transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl border border-[#48b685]/40 bg-[#48b685]/15 flex items-center justify-center text-[#48b685] group-hover:scale-105 transition-transform font-bold">
                  <Icon size={18} />
                </div>
                <ArrowRight size={14} className="text-[#a392a3] group-hover:text-[#48b685] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-[#48b685] transition-colors">
                  {item.label}
                </h3>
                <p className="text-[11px] text-[#48b685] font-semibold">
                  Kelola konten & data modul ➔
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
