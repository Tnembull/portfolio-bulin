"use client";

import { SkillsData } from "@/context/PortfolioContext";
import { Wrench, Plus, Trash2 } from "lucide-react";

interface SkillsEditorProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export default function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const handleAdd = () => {
    const numStr = data.items.length < 9 ? `0${data.items.length + 1}` : `${data.items.length + 1}`;
    const newSkill = {
      id: `s-${Date.now()}`,
      num: numStr,
      title: "Kategori Keahlian Baru",
      desc: "Node.js, Express, Docker, PostgreSQL",
    };
    onChange({ ...data, items: [...data.items, newSkill] });
  };

  const handleRemove = (id: string) => {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  };

  const handleItemUpdate = (index: number, key: string, val: string) => {
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
              <Wrench size={16} className="text-[#48b685]" />
              <span>04 // KELOLA KEAHLIAN & TECH STACK</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur grup kategori keahlian dan daftar pill teknologi di portofolio.
            </p>
          </div>
          <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md font-extrabold">
            SKILLS_MATRIX
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
              DAFTAR KATEGORI KEAHLIAN ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg hover:bg-[#48b685]/90 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={15} />
              <span>+ Tambah Keahlian</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.items.map((skill, idx) => (
              <div key={skill.id} className="p-4 rounded-xl border border-[#483145] bg-[#19131a] space-y-3">
                <div className="flex items-center justify-between border-b border-[#483145] pb-2">
                  <span className="text-[10px] text-[#48b685] font-extrabold">
                    KEAHLIAN #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(skill.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Keahlian"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={skill.num}
                      onChange={(e) => handleItemUpdate(idx, "num", e.target.value)}
                      placeholder="01"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold outline-none text-center"
                    />
                    <input
                      type="text"
                      value={skill.title}
                      onChange={(e) => handleItemUpdate(idx, "title", e.target.value)}
                      placeholder="Nama Kategori Keahlian"
                      className="md:col-span-3 w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 font-bold outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={skill.desc}
                    onChange={(e) => handleItemUpdate(idx, "desc", e.target.value)}
                    placeholder="Daftar teknologi yang dipisahkan dengan koma (misal: Docker, Kubernetes, Nginx)"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#a392a3] outline-none leading-relaxed"
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
