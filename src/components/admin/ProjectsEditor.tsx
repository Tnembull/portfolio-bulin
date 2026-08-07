"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/data/projects";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X,
  FolderKanban,
  Upload,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";

export interface ProjectsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  ctaText: string;
  ctaLink: string;
  items: Project[];
}

interface ProjectsEditorProps {
  data: ProjectsData;
  onChange: (data: ProjectsData) => void;
}

const emptySubscribe = () => () => {};

export default function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [expandedId, setExpandedId] = useState<string | null>(data.items[0]?.id || null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddProject = () => {
    const newId = Date.now().toString();
    const newProject: Project = {
      id: newId,
      slug: `proyek-baru-${newId}`,
      title: "Judul Proyek Baru",
      category: "Infrastructure & Kubernetes",
      description: "Deskripsi ringkas proyek.",
      longDescription: "Deskripsi rincian mengenai latar belakang, fitur utama, dan tujuan dari proyek ini.",
      tech: ["Kubernetes", "Terraform", "AWS"],
      image: "https://images.unsplash.com/photo-1667372335854-c072b9886360?q=80&w=1200&auto=format&fit=crop",
      year: new Date().getFullYear().toString(),
      client: "Nama Klien / Instansi",
      role: "DevOps Engineer",
      challenges: ["Tantangan teknis pertama..."],
      solutions: ["Solusi dan pendekatan teknis..."],
      impact: ["Hasil dan dampak positif proyek..."],
      link: "https://github.com/ashiddiqi",
    };

    onChange({
      ...data,
      items: [newProject, ...data.items],
    });
    setExpandedId(newId);
  };

  const confirmDeleteProject = () => {
    if (!deleteTarget) return;
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== deleteTarget.id),
    });
    setDeleteTarget(null);
  };

  const handleUpdateField = (index: number, key: keyof Project, val: string | string[]) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  const handleArrayItemChange = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    itemIndex: number,
    val: string
  ) => {
    const updatedItems = [...data.items];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray[itemIndex] = val;
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleAddArrayItem = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact"
  ) => {
    const updatedItems = [...data.items];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray.push(arrayKey === "tech" ? "Teknologi Baru" : "Poin item baru...");
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleRemoveArrayItem = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    itemIndex: number
  ) => {
    const updatedItems = [...data.items];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray.splice(itemIndex, 1);
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs relative">
      {/* DELETE MODAL */}
      {deleteTarget &&
        isClient &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 space-y-4 shadow-2xl relative z-[10000] text-foreground">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-sans text-foreground">Konfirmasi Hapus</h4>
                    <p className="text-[11px] text-muted-foreground">Tindakan ini tidak dapat dibatalkan</p>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border">
                Apakah Anda yakin ingin menghapus proyek <span className="text-foreground font-bold">&quot;{deleteTarget.title}&quot;</span>?
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteProject}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Ya, Hapus Proyek
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Header Config Panel */}
      <div className="p-6 rounded-2xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-slate-100 uppercase tracking-wide text-sm flex items-center gap-2">
              <FolderKanban size={16} className="text-[#48b685]" />
              <span>07 // KELOLA PROYEK & PORTOFOLIO</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Tambah, ubah, atau hapus item proyek portofolio, teknologi yang digunakan, serta gambar preview.
            </p>
          </div>
          <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md font-extrabold">
            PROJECTS_VAULT
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

        {/* Projects Accordion List */}
        <div className="pt-6 border-t border-[#483145] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-100 text-xs">
              DAFTAR ITEM PROYEK ({data.items.length} PROYEK)
            </h4>
            <button
              onClick={handleAddProject}
              className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg hover:bg-[#48b685]/90 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={15} />
              <span>+ Tambah Proyek Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.items.map((proj, pIdx) => {
              const isExpanded = expandedId === proj.id;

              return (
                <div
                  key={proj.id}
                  className="rounded-xl border border-[#483145] bg-[#19131a] overflow-hidden transition-all shadow-xs"
                >
                  <div
                    onClick={() => toggleExpand(proj.id)}
                    className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#48b685]/5 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="size-7 rounded-lg bg-[#48b685]/15 border border-[#48b685]/40 text-[#48b685] text-xs font-bold flex items-center justify-center shrink-0">
                        {pIdx + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-100 text-sm truncate font-sans">
                          {proj.title}
                        </h4>
                        <p className="text-[11px] text-[#a392a3] truncate">
                          {proj.category} • {proj.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget({ id: proj.id, title: proj.title });
                        }}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Hapus Proyek"
                      >
                        <Trash2 size={15} />
                      </button>
                      <div className="p-1 text-[#48b685]">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-[#483145] bg-[#2f1e2e]/40 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[#a392a3] block text-[10px] font-bold uppercase">Judul Proyek</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateField(pIdx, "title", e.target.value)}
                            className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 font-bold text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#a392a3] block text-[10px] font-bold uppercase">Slug URL</label>
                          <input
                            type="text"
                            value={proj.slug || ""}
                            onChange={(e) => handleUpdateField(pIdx, "slug", e.target.value)}
                            className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[#a392a3] block text-[10px] font-bold uppercase">Kategori</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => handleUpdateField(pIdx, "category", e.target.value)}
                            className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#a392a3] block text-[10px] font-bold uppercase">Tahun</label>
                          <input
                            type="text"
                            value={proj.year || ""}
                            onChange={(e) => handleUpdateField(pIdx, "year", e.target.value)}
                            className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#a392a3] block text-[10px] font-bold uppercase">Klien / Instansi</label>
                          <input
                            type="text"
                            value={proj.client || ""}
                            onChange={(e) => handleUpdateField(pIdx, "client", e.target.value)}
                            className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[#a392a3] block text-[10px] font-bold uppercase flex items-center gap-1">
                            <ImageIcon size={12} className="text-[#48b685]" />
                            <span>URL GAMBAR PREVIEW (ATAU UPLOAD KE R2)</span>
                          </label>
                          <label className="text-[10px] text-[#48b685] bg-[#48b685]/15 border border-[#48b685]/40 hover:bg-[#48b685]/30 px-2 py-0.5 rounded font-bold cursor-pointer transition-colors flex items-center gap-1">
                            <Upload size={11} />
                            <span>Upload Gambar Proyek ke R2</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const formData = new FormData();
                                formData.append("file", file);
                                try {
                                  const res = await fetch("/api/upload", {
                                    method: "POST",
                                    body: formData,
                                  });
                                  const resData = await res.json();
                                  if (resData.url) {
                                    handleUpdateField(pIdx, "image", resData.url);
                                  } else {
                                    alert(resData.error || "Gagal mengunggah gambar proyek.");
                                  }
                                } catch {
                                  alert("Terjadi kesalahan koneksi saat upload.");
                                }
                              }}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={proj.image}
                          onChange={(e) => handleUpdateField(pIdx, "image", e.target.value)}
                          placeholder="https://images.unsplash.com/... atau URL Cloudflare R2"
                          className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-slate-100 text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#a392a3] block text-[10px] font-bold uppercase">Deskripsi Ringkas</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => handleUpdateField(pIdx, "description", e.target.value)}
                          className="w-full px-3 py-2 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#a392a3] text-xs leading-relaxed outline-none"
                        />
                      </div>

                      {/* Tech Stack List */}
                      <div className="space-y-2 pt-3 border-t border-[#483145]">
                        <div className="flex items-center justify-between">
                          <label className="text-[#48b685] font-bold block text-[11px] uppercase">TAG TEKNOLOGI</label>
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem(pIdx, "tech")}
                            className="text-[10px] text-[#48b685] font-bold hover:underline cursor-pointer"
                          >
                            + Tambah Tag
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(proj.tech || []).map((tItem, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-1.5 bg-[#19131a] border border-[#48b685]/40 px-2.5 py-1 rounded-lg">
                              <input
                                type="text"
                                value={tItem}
                                onChange={(e) => handleArrayItemChange(pIdx, "tech", tIdx, e.target.value)}
                                className="bg-transparent text-xs text-[#48b685] font-mono font-bold w-24 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(pIdx, "tech", tIdx)}
                                className="text-red-400 hover:text-red-300 cursor-pointer"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
