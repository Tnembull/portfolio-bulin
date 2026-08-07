"use client";

import { ExperienceData } from "@/context/PortfolioContext";
import { Briefcase, Plus, Trash2 } from "lucide-react";

interface ExperienceEditorProps {
  data: ExperienceData;
  onChange: (data: ExperienceData) => void;
}

export default function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const handleAdd = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      year: "2026",
      role: "Backend & DevOps Engineer",
      company: "Nama Perusahaan",
      description: "Deskripsi tanggung jawab pekerjaan...",
      tags: ["Node.js", "Docker", "PostgreSQL"],
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const handleRemove = (id: string) => {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  };

  const handleItemUpdate = (index: number, key: string, val: string | string[]) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-slate-100 uppercase tracking-wide text-sm flex items-center gap-2">
              <Briefcase size={16} className="text-[#48b685]" />
              <span>03 // KELOLA PENGALAMAN KERJA</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur riwayat karir profesional, nama perusahaan, peranan, deskripsi, dan tag teknologi.
            </p>
          </div>
          <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md font-extrabold">
            EXPERIENCE
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
              BADGE SEKSI (SECTION BADGE)
            </label>
            <input
              type="text"
              value={data.sectionBadge}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
                JUDUL UTAMA (MAIN TITLE)
              </label>
              <input
                type="text"
                value={data.titleMain}
                onChange={(e) => onChange({ ...data, titleMain: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
                JUDUL HIGHLIGHT (HIGHLIGHT TITLE)
              </label>
              <input
                type="text"
                value={data.titleHighlight}
                onChange={(e) => onChange({ ...data, titleHighlight: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-[#48b685] font-bold outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#483145] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-100 text-xs">
              RIWAYAT PENGALAMAN KERJA ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg hover:bg-[#48b685]/90 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={15} />
              <span>+ Tambah Pengalaman</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.items.map((item, idx) => (
              <div key={item.id} className="p-4 sm:p-5 rounded-xl border border-[#483145] bg-[#19131a] space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#483145] pb-2">
                  <span className="text-[10px] text-[#48b685] font-extrabold">
                    PENGALAMAN #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Pengalaman"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleItemUpdate(idx, "role", e.target.value)}
                      placeholder="Posisi / Jabatan"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 font-bold text-xs outline-none"
                    />
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleItemUpdate(idx, "company", e.target.value)}
                      placeholder="Nama Perusahaan"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none font-bold"
                    />
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleItemUpdate(idx, "year", e.target.value)}
                      placeholder="Periode (misal: 2024 — SEKARANG)"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] text-xs outline-none font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.location || ""}
                      onChange={(e) => handleItemUpdate(idx, "location", e.target.value)}
                      placeholder="Lokasi (misal: Bandar Lampung, Indonesia)"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#a392a3] text-xs outline-none"
                    />
                    <input
                      type="text"
                      value={item.jobType || ""}
                      onChange={(e) => handleItemUpdate(idx, "jobType", e.target.value)}
                      placeholder="Tipe Pekerjaan (misal: Full-time)"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#a392a3] text-xs outline-none"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleItemUpdate(idx, "description", e.target.value)}
                    placeholder="Deskripsi tugas dan kontribusi..."
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none leading-relaxed"
                  />

                  <input
                    type="text"
                    value={item.tags?.join(", ") || ""}
                    onChange={(e) =>
                      handleItemUpdate(
                        idx,
                        "tags",
                        e.target.value.split(",").map((t) => t.trim())
                      )
                    }
                    placeholder="Tag Teknologi (pisah dengan koma: Node.js, Express, Docker)"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold text-xs outline-none"
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
