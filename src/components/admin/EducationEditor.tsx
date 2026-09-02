"use client";

import React from "react";
import { EducationData, EducationItem } from "@/context/PortfolioContext";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface EducationEditorProps {
  data: EducationData;
  onChange: (data: EducationData) => void;
}

export default function EducationEditor({ data, onChange }: EducationEditorProps) {
  const items = data.items || [];

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      year: "2020 — 2024",
      degree: "Sarjana Ilmu Komputer (S.Kom)",
      institution: "Universitas Lampung",
      gpa: "IPK 3.50",
      details: "Fokus Rekayasa Perangkat Lunak, Arsitektur Sistem Backend...",
    };
    onChange({ ...data, items: [newItem, ...items] });
  };

  const handleRemove = (id: string) => {
    onChange({ ...data, items: items.filter((item) => item.id !== id) });
  };

  const handleItemUpdate = (index: number, key: keyof EducationItem, val: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-border bg-surface space-y-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-extrabold text-foreground uppercase tracking-wide text-sm flex items-center gap-2">
              <GraduationCap size={16} className="text-accent" />
              <span>KELOLA RIWAYAT PENDIDIKAN</span>
            </h3>
            <p className="text-secondary text-[11px] mt-0.5 font-sans">
              Atur riwayat pendidikan formal (Universitas, SMK, SMP, SD), gelar, IPK, dan detail studi.
            </p>
          </div>
          <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md font-extrabold">
            EDUCATION
          </span>
        </div>

        {/* Section Metadata */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Section Badge
              </label>
              <input
                type="text"
                value={data.sectionBadge || ""}
                onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
                className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-foreground outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Main Title
              </label>
              <input
                type="text"
                value={data.titleMain || ""}
                onChange={(e) => onChange({ ...data, titleMain: e.target.value })}
                className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-foreground outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Highlight Title
              </label>
              <input
                type="text"
                value={data.titleHighlight || ""}
                onChange={(e) => onChange({ ...data, titleHighlight: e.target.value })}
                className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-accent font-bold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-foreground text-xs">
              DAFTAR PENDIDIKAN ({items.length})
            </h4>
            <button
              type="button"
              onClick={handleAdd}
              className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-accent-text font-extrabold rounded-lg transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={14} />
              <span>Tambah Pendidikan</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 text-center text-secondary border border-border rounded-lg">
              Belum ada riwayat pendidikan. Klik tombol &ldquo;Tambah Pendidikan&rdquo; di atas untuk menambahkan.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-5 rounded-xl border border-border bg-surface-secondary space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-extrabold text-accent text-xs">
                      #{idx + 1} {item.institution || "Pendidikan Baru"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                      title="Hapus item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Nama Institusi / Sekolah / Universitas
                      </label>
                      <input
                        type="text"
                        value={item.institution || ""}
                        onChange={(e) => handleItemUpdate(idx, "institution", e.target.value)}
                        placeholder="e.g. Universitas Lampung / SMK..."
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Gelar / Jurusan / Tingkat
                      </label>
                      <input
                        type="text"
                        value={item.degree || ""}
                        onChange={(e) => handleItemUpdate(idx, "degree", e.target.value)}
                        placeholder="e.g. Sarjana Ilmu Komputer (S.Kom)"
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Tahun / Periode
                      </label>
                      <input
                        type="text"
                        value={item.year || ""}
                        onChange={(e) => handleItemUpdate(idx, "year", e.target.value)}
                        placeholder="e.g. 2018 — 2024"
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        IPK / Nilai (Opsional)
                      </label>
                      <input
                        type="text"
                        value={item.gpa || ""}
                        onChange={(e) => handleItemUpdate(idx, "gpa", e.target.value)}
                        placeholder="e.g. IPK 3.32"
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-accent outline-none font-bold font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Keterangan / Fokus Studi (Opsional)
                      </label>
                      <input
                        type="text"
                        value={item.details || ""}
                        onChange={(e) => handleItemUpdate(idx, "details", e.target.value)}
                        placeholder="e.g. Fokus Rekayasa Perangkat Lunak & Sistem Backend..."
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
