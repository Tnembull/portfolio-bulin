"use client";

import React, { useState } from "react";
import { SkillsData, SkillPillItem } from "@/context/PortfolioContext";
import { DEFAULT_SKILL_PILLS, resolveSkillIcon } from "@/components/SkillBadges";
import { Wrench, Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Layers } from "lucide-react";

interface SkillsEditorProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export default function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const pills: SkillPillItem[] = data.pills || DEFAULT_SKILL_PILLS;

  const [newPillName, setNewPillName] = useState("");
  const [newPillIcon, setNewPillIcon] = useState("");

  const handleAddPill = () => {
    if (!newPillName.trim()) return;
    const newPill: SkillPillItem = {
      id: `pill-${Date.now()}`,
      name: newPillName.trim(),
      icon: newPillIcon.trim() || undefined,
    };
    onChange({ ...data, pills: [...pills, newPill] });
    setNewPillName("");
    setNewPillIcon("");
  };

  const handleRemovePill = (id: string) => {
    onChange({ ...data, pills: pills.filter((p) => p.id !== id) });
  };

  const handleMovePill = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pills.length) return;
    const updated = [...pills];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange({ ...data, pills: updated });
  };

  const handleResetDefaultPills = () => {
    if (window.confirm("Kembalikan daftar pill keahlian ke bawaan awal?")) {
      onChange({ ...data, pills: DEFAULT_SKILL_PILLS });
    }
  };

  // CATEGORY ITEMS HANDLERS
  const handleAddCategory = () => {
    const numStr = data.items.length < 9 ? `0${data.items.length + 1}` : `${data.items.length + 1}`;
    const newSkill = {
      id: `s-${Date.now()}`,
      num: numStr,
      title: "Kategori Keahlian Baru",
      desc: "Node.js, Express, Docker, PostgreSQL",
    };
    onChange({ ...data, items: [...data.items, newSkill] });
  };

  const handleRemoveCategory = (id: string) => {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  };

  const handleCategoryUpdate = (index: number, key: string, val: string) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-slate-100 uppercase tracking-wide text-sm flex items-center gap-2">
              <Wrench size={16} className="text-[#48b685]" />
              <span>05 // KELOLA KEAHLIAN (TECH BADGES PILLS)</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur pill badge keahlian dengan logo resmi (Next.js, Docker, Python, AWS, dll).
            </p>
          </div>
          <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md font-extrabold">
            PILLS_MATRIX
          </span>
        </div>

        {/* Section Config */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
                BADGE SEKSI (SECTION BADGE)
              </label>
              <input
                type="text"
                value={data.sectionBadge || "SKILLS"}
                onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
                JUDUL UTAMA (MAIN TITLE)
              </label>
              <input
                type="text"
                value={data.titleMain || "Keahlian"}
                onChange={(e) => onChange({ ...data, titleMain: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
                JUDUL HIGHLIGHT
              </label>
              <input
                type="text"
                value={data.titleHighlight || ""}
                placeholder="(Opsional)"
                onChange={(e) => onChange({ ...data, titleHighlight: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-[#48b685] font-bold outline-none"
              />
            </div>
          </div>
        </div>

        {/* 1. TECH PILL BADGES SECTION */}
        <div className="pt-6 border-t border-[#483145] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-slate-100 text-xs flex items-center gap-2">
                <Sparkles size={14} className="text-[#48b685]" />
                <span>DAFTAR PILL KEAHLIAN BERLOGO ({pills.length})</span>
              </h4>
              <p className="text-[11px] text-[#a392a3] mt-0.5">
                Pill badge dengan logo resmi teknologi yang tampil rapi di halaman Keahlian.
              </p>
            </div>
            <button
              onClick={handleResetDefaultPills}
              className="text-[11px] text-[#a392a3] hover:text-slate-100 underline cursor-pointer self-start sm:self-auto"
            >
              Reset ke 17 Badge Bawaan
            </button>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl border border-[#483145] bg-[#19131a] space-y-2">
            <span className="text-[10px] text-[#a392a3] uppercase font-bold block">
              PREVIEW TAMPILAN:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {pills.map((pill) => {
                const icon = resolveSkillIcon(pill.name, pill.icon);
                return (
                  <div
                    key={pill.id}
                    className="inline-flex items-center gap-2 bg-white text-[#111827] px-3 py-1.5 rounded-lg border border-neutral-300 shadow-xs"
                  >
                    {icon && (
                      <img
                        src={icon}
                        alt={pill.name}
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <span className="font-sans font-semibold text-xs text-neutral-900">
                      {pill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add New Pill Form */}
          <div className="p-4 rounded-xl border border-[#483145] bg-[#19131a] space-y-3">
            <span className="text-[10px] text-[#48b685] font-extrabold uppercase block">
              + TAMBAH PILL KEAHLIAN BARU
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={newPillName}
                  onChange={(e) => setNewPillName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddPill();
                    }
                  }}
                  placeholder="Contoh: Next.js, Docker, Python, Rust..."
                  className="w-full px-3.5 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 outline-none"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  value={newPillIcon}
                  onChange={(e) => setNewPillIcon(e.target.value)}
                  placeholder="Icon override / URL (opsional)"
                  className="w-full px-3.5 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={handleAddPill}
                  disabled={!newPillName.trim()}
                  className="w-full h-full py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg hover:bg-[#48b685]/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Plus size={15} />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
            <p className="text-[10px] text-[#a392a3]">
              Tip: Cukup ketik nama teknologi (Next.js, Python, AWS, Docker, dll), logo resminya akan otomatis terpasang!
            </p>
          </div>

          {/* Manage Existing Pills List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {pills.map((pill, idx) => {
              const icon = resolveSkillIcon(pill.name, pill.icon);
              return (
                <div
                  key={pill.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#483145] bg-[#19131a] gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] text-[#a392a3] font-mono w-4">
                      {idx + 1}.
                    </span>
                    {icon && (
                      <img
                        src={icon}
                        alt={pill.name}
                        className="w-4 h-4 object-contain shrink-0"
                      />
                    )}
                    <span className="text-slate-100 font-bold truncate">
                      {pill.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMovePill(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 text-[#a392a3] hover:text-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Geser ke kiri/atas"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMovePill(idx, "down")}
                      disabled={idx === pills.length - 1}
                      className="p-1 text-[#a392a3] hover:text-slate-100 disabled:opacity-30 cursor-pointer"
                      title="Geser ke kanan/bawah"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemovePill(pill.id)}
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CATEGORY DESCRIPTIONS (OPTIONAL MATRIX) */}
        <div className="pt-6 border-t border-[#483145] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-slate-100 text-xs flex items-center gap-2">
                <Layers size={14} className="text-[#48b685]" />
                <span>KATEGORI KEAHLIAN / MATRIKS TAMBAHAN ({data.items.length})</span>
              </h4>
              <p className="text-[11px] text-[#a392a3] mt-0.5">
                Penjelasan detail per kategori keahlian (Backend, DevOps, dsb).
              </p>
            </div>
            <button
              onClick={handleAddCategory}
              className="px-3 py-1.5 bg-[#483145] text-slate-200 font-bold rounded-lg hover:bg-[#48b685] hover:text-[#19131a] transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>+ Tambah Kategori</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.items.map((skill, idx) => (
              <div key={skill.id} className="p-3.5 rounded-xl border border-[#483145] bg-[#19131a] space-y-2">
                <div className="flex items-center justify-between border-b border-[#483145] pb-2">
                  <span className="text-[10px] text-[#48b685] font-extrabold">
                    KATEGORI #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveCategory(skill.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Kategori"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={skill.num}
                      onChange={(e) => handleCategoryUpdate(idx, "num", e.target.value)}
                      placeholder="01"
                      className="w-full px-3 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold outline-none text-center"
                    />
                    <input
                      type="text"
                      value={skill.title}
                      onChange={(e) => handleCategoryUpdate(idx, "title", e.target.value)}
                      placeholder="Nama Kategori Keahlian"
                      className="md:col-span-3 w-full px-3 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 font-bold outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={skill.desc}
                    onChange={(e) => handleCategoryUpdate(idx, "desc", e.target.value)}
                    placeholder="Deskripsi keahlian..."
                    className="w-full px-3 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#a392a3] outline-none leading-relaxed text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
