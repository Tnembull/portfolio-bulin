"use client";

import { AboutData } from "@/context/PortfolioContext";
import { User, Plus, Trash2, ShieldCheck } from "lucide-react";

interface AboutEditorProps {
  data: AboutData;
  onChange: (data: AboutData) => void;
}

export default function AboutEditor({ data, onChange }: AboutEditorProps) {
  const handleHighlightUpdate = (index: number, key: "label" | "value", val: string) => {
    const updated = [...(data.highlights || [])];
    updated[index] = { ...updated[index], [key]: val };
    onChange({ ...data, highlights: updated });
  };

  const handleValueUpdate = (index: number, key: "num" | "title" | "desc", val: string) => {
    const updated = [...(data.values || [])];
    updated[index] = { ...updated[index], [key]: val };
    onChange({ ...data, values: updated });
  };

  const addHighlight = () => {
    const newHl = { id: `h-${Date.now()}`, label: "Field Baru", value: "Nilai Field" };
    onChange({ ...data, highlights: [...(data.highlights || []), newHl] });
  };

  const removeHighlight = (id: string) => {
    onChange({ ...data, highlights: (data.highlights || []).filter((h) => h.id !== id) });
  };

  const addValue = () => {
    const count = (data.values || []).length + 1;
    const newVal = {
      id: `v-${Date.now()}`,
      num: count < 10 ? `0${count}` : `${count}`,
      title: "PRINSIP UTAMA BARU",
      desc: "Deskripsi prinsip kerja...",
    };
    onChange({ ...data, values: [...(data.values || []), newVal] });
  };

  const removeValue = (id: string) => {
    onChange({ ...data, values: (data.values || []).filter((v) => v.id !== id) });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-slate-100 uppercase tracking-wide text-sm flex items-center gap-2">
              <User size={16} className="text-[#48b685]" />
              <span>02 // KELOLA BIOGRAFI & PROFIL</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur teks narasi biografi, baris informasi profil, dan prinsip kerja utama.
            </p>
          </div>
          <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md font-extrabold">
            BIOGRAPHY
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
              BADGE SEKSI (SECTION BADGE)
            </label>
            <input
              type="text"
              value={data.sectionBadge || ""}
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
                value={data.titleMain || ""}
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
                value={data.titleHighlight || ""}
                onChange={(e) => onChange({ ...data, titleHighlight: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-[#48b685] font-bold outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-[#a392a3] uppercase font-bold block">
              PARAGRAF NARASI BIOGRAFI
            </label>
            <textarea
              rows={3}
              value={data.bioText || ""}
              onChange={(e) => onChange({ ...data, bioText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Highlights List */}
        <div className="pt-6 border-t border-[#483145] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-100 text-xs">
              INFORMASI HIGHLIGHT PROFIL
            </h4>
            <button
              onClick={addHighlight}
              className="px-3 py-1.5 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg hover:bg-[#48b685]/90 transition-all text-[10px] flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>+ Tambah Baris Profil</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.highlights?.map((hl, idx) => (
              <div key={hl.id} className="p-3.5 rounded-xl border border-[#483145] bg-[#19131a] space-y-2 relative group">
                <div className="flex items-center justify-between border-b border-[#483145] pb-1.5">
                  <span className="text-[10px] text-[#48b685] font-extrabold">BARIS #{idx + 1}</span>
                  <button
                    onClick={() => removeHighlight(hl.id)}
                    className="text-red-400 hover:text-red-300 text-[10px] font-bold cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
                <input
                  type="text"
                  value={hl.label}
                  onChange={(e) => handleHighlightUpdate(idx, "label", e.target.value)}
                  placeholder="Label (e.g. Pendidikan)"
                  className="w-full px-2.5 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none"
                />
                <input
                  type="text"
                  value={hl.value}
                  onChange={(e) => handleHighlightUpdate(idx, "value", e.target.value)}
                  placeholder="Nilai (e.g. S.Kom - Universitas Lampung)"
                  className="w-full px-2.5 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold text-xs outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Principles / Values */}
        <div className="pt-6 border-t border-[#483145] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-100 text-xs">
              PRINSIP KERJA UTAMA (BENTO CARDS)
            </h4>
            <button
              onClick={addValue}
              className="px-3 py-1.5 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg hover:bg-[#48b685]/90 transition-all text-[10px] flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>+ Tambah Prinsip</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.values?.map((val, idx) => (
              <div key={val.id} className="p-3.5 rounded-xl border border-[#483145] bg-[#19131a] space-y-2 relative group">
                <div className="flex items-center justify-between border-b border-[#483145] pb-1.5">
                  <span className="text-[10px] text-[#48b685] font-extrabold">{val.num}</span>
                  <button
                    onClick={() => removeValue(val.id)}
                    className="text-red-400 hover:text-red-300 text-[10px] font-bold cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => handleValueUpdate(idx, "title", e.target.value)}
                  placeholder="Judul Prinsip"
                  className="w-full px-2.5 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 font-bold text-xs outline-none"
                />
                <textarea
                  rows={2}
                  value={val.desc}
                  onChange={(e) => handleValueUpdate(idx, "desc", e.target.value)}
                  placeholder="Deskripsi..."
                  className="w-full px-2.5 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#a392a3] text-xs outline-none leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
