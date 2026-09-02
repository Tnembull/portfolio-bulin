"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/data/projects";
import { compressImage } from "@/lib/image-compressor";
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
  Github,
  Globe,
  Sparkles,
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
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      slug: `project-${Date.now()}`,
      title: "New Engineering Project",
      category: "Infrastructure & DevOps",
      description: "Short technical overview of the project.",
      longDescription: "Detailed case study covering the system architecture, motivation, design choices, and technical implementation.",
      tech: ["Docker", "Kubernetes", "TypeScript"],
      image: "https://media.bulindev.tech/uploads/1788351777889-34541.png",
      year: new Date().getFullYear().toString(),
      client: "Internal / Client",
      role: "DevOps Engineer",
      challenges: ["Handling high-concurrency traffic", "Ensuring zero-downtime deployments"],
      solutions: ["Implemented automated CI/CD pipeline", "Configured horizontal pod autoscaling"],
      impact: ["99.99% uptime achieved", "50% reduction in deployment latency"],
      githubUrl: "",
      liveUrl: "",
    };

    onChange({
      ...data,
      items: [newProject, ...(data.items || [])],
    });
    setExpandedId(newId);
  };

  const confirmDeleteProject = () => {
    if (!deleteTarget) return;
    onChange({
      ...data,
      items: (data.items || []).filter((item) => item.id !== deleteTarget.id),
    });
    setDeleteTarget(null);
  };

  const handleUpdateField = (index: number, key: keyof Project, val: string | string[]) => {
    const updatedItems = [...(data.items || [])];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  const handleArrayItemChange = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    itemIndex: number,
    val: string
  ) => {
    const updatedItems = [...(data.items || [])];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray[itemIndex] = val;
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleAddArrayItem = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    defaultVal: string = "New Item"
  ) => {
    const updatedItems = [...(data.items || [])];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray.push(defaultVal);
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleRemoveArrayItem = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    itemIndex: number
  ) => {
    const updatedItems = [...(data.items || [])];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray.splice(itemIndex, 1);
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleUploadProjectImage = async (pIdx: number, file: File) => {
    setUploadingIndex(pIdx);
    try {
      const fileToUpload = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.85,
        targetFormat: "image/webp",
      });
      const formData = new FormData();
      formData.append("file", fileToUpload);

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
      alert("Terjadi kesalahan koneksi saat upload ke R2.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const items = data.items || [];

  return (
    <div className="w-full space-y-6 font-mono text-xs relative">
      {/* DELETE MODAL */}
      {deleteTarget &&
        isClient &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-surface border border-border rounded-xl p-6 space-y-4 shadow-2xl relative z-[10000] text-foreground">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-sans text-foreground">Konfirmasi Hapus</h4>
                    <p className="text-[11px] text-secondary">Tindakan ini tidak dapat dibatalkan</p>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="text-secondary hover:text-foreground cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-xs text-secondary leading-relaxed bg-surface-secondary p-3 rounded-lg border border-border">
                Apakah Anda yakin ingin menghapus proyek <span className="text-foreground font-bold">&quot;{deleteTarget.title}&quot;</span>?
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-3 py-1.5 bg-surface-secondary hover:bg-border text-foreground rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteProject}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Ya, Hapus Proyek
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Header Config Panel */}
      <div className="p-6 rounded-2xl border border-border bg-surface space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-extrabold text-foreground uppercase tracking-wide text-sm flex items-center gap-2">
              <FolderKanban size={16} className="text-accent" />
              <span>08 // KELOLA PROYEK & CASE STUDIES</span>
            </h3>
            <p className="text-secondary text-[11px] mt-0.5 font-sans">
              Atur proyek engineering, link GitHub repository, link live demo/website, kategori dinamis, dan tantangan teknis.
            </p>
          </div>
          <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md font-extrabold">
            PROJECTS
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
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none"
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
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none font-bold"
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
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-accent font-bold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-foreground text-xs">
              DAFTAR PROYEK ({items.length} PROYEK)
            </h4>
            <button
              onClick={handleAddProject}
              className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-accent-text font-extrabold rounded-lg transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={15} />
              <span>+ Tambah Proyek Baru</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-center text-secondary border border-border rounded-lg">
              Belum ada proyek. Klik tombol &ldquo;+ Tambah Proyek Baru&rdquo; di atas untuk menambahkan.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((proj, pIdx) => {
                const isExpanded = expandedId === proj.id;

                return (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-border bg-surface-secondary overflow-hidden transition-all shadow-xs"
                  >
                    <div
                      onClick={() => toggleExpand(proj.id)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="size-7 rounded-lg bg-accent/15 border border-accent/40 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                          {pIdx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground text-sm truncate font-sans">
                            {proj.title}
                          </h4>
                          <p className="text-[11px] text-secondary truncate font-mono">
                            {proj.category || "General"} • {proj.year || "2026"}
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
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Hapus Proyek"
                        >
                          <Trash2 size={15} />
                        </button>
                        <div className="p-1 text-accent">
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 sm:p-5 border-t border-border bg-surface space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase">Judul Proyek</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => handleUpdateField(pIdx, "title", e.target.value)}
                              className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground font-bold text-xs outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase">Slug URL (untuk /projects/slug)</label>
                            <input
                              type="text"
                              value={proj.slug || ""}
                              onChange={(e) => handleUpdateField(pIdx, "slug", e.target.value)}
                              placeholder="e.g. k8s-cluster-automation"
                              className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground text-xs outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase">Kategori Dinamis</label>
                            <input
                              type="text"
                              value={proj.category || ""}
                              onChange={(e) => handleUpdateField(pIdx, "category", e.target.value)}
                              placeholder="e.g. DEVOPS & CLOUD / BACKEND / AUTOMATION"
                              className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-accent font-bold text-xs outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase">Tahun</label>
                            <input
                              type="text"
                              value={proj.year || ""}
                              onChange={(e) => handleUpdateField(pIdx, "year", e.target.value)}
                              className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground text-xs outline-none font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase">Klien / Perusahaan</label>
                            <input
                              type="text"
                              value={proj.client || ""}
                              onChange={(e) => handleUpdateField(pIdx, "client", e.target.value)}
                              className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground text-xs outline-none"
                            />
                          </div>
                        </div>

                        {/* Dedicated Links: GitHub & Live Website */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-surface-secondary">
                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase flex items-center gap-1">
                              <Github size={12} className="text-accent" />
                              <span>LINK GITHUB REPOSITORY</span>
                            </label>
                            <input
                              type="text"
                              value={proj.githubUrl || proj.link || ""}
                              onChange={(e) => {
                                handleUpdateField(pIdx, "githubUrl", e.target.value);
                                handleUpdateField(pIdx, "link", e.target.value);
                              }}
                              placeholder="https://github.com/Tnembull/..."
                              className="w-full px-3 py-2 bg-surface border border-border focus:border-accent rounded-md text-foreground text-xs outline-none font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-secondary block text-[10px] font-bold uppercase flex items-center gap-1">
                              <Globe size={12} className="text-accent" />
                              <span>LINK LIVE DEMO / PRODUCTION WEBSITE</span>
                            </label>
                            <input
                              type="text"
                              value={proj.liveUrl || proj.url || ""}
                              onChange={(e) => {
                                handleUpdateField(pIdx, "liveUrl", e.target.value);
                                handleUpdateField(pIdx, "url", e.target.value);
                              }}
                              placeholder="https://myproject.com"
                              className="w-full px-3 py-2 bg-surface border border-border focus:border-accent rounded-md text-foreground text-xs outline-none font-mono"
                            />
                          </div>
                        </div>

                        {/* Project Image & Upload to R2 */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-secondary block text-[10px] font-bold uppercase flex items-center gap-1">
                              <ImageIcon size={12} className="text-accent" />
                              <span>GAMBAR PROYEK (URL ATAU UPLOAD CLOUDFLARE R2)</span>
                            </label>
                            <label className="text-[10px] text-accent bg-accent/15 border border-accent/40 hover:bg-accent/30 px-2 py-0.5 rounded font-bold cursor-pointer transition-colors flex items-center gap-1">
                              <Upload size={11} />
                              <span>{uploadingIndex === pIdx ? "Uploading..." : "Upload Gambar ke R2"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={uploadingIndex !== null}
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleUploadProjectImage(pIdx, file);
                                }}
                              />
                            </label>
                          </div>
                          <input
                            type="text"
                            value={proj.image}
                            onChange={(e) => handleUpdateField(pIdx, "image", e.target.value)}
                            placeholder="https://media.bulindev.tech/uploads/... atau URL R2"
                            className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground text-xs outline-none font-mono"
                          />
                        </div>

                        {/* Short Description */}
                        <div className="space-y-1">
                          <label className="text-secondary block text-[10px] font-bold uppercase">Deskripsi Ringkas</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => handleUpdateField(pIdx, "description", e.target.value)}
                            className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground text-xs leading-relaxed outline-none"
                          />
                        </div>

                        {/* Long Description / Case Study */}
                        <div className="space-y-1">
                          <label className="text-secondary block text-[10px] font-bold uppercase">Deskripsi Lengkap / Case Study Arsitektur</label>
                          <textarea
                            rows={3}
                            value={proj.longDescription || ""}
                            onChange={(e) => handleUpdateField(pIdx, "longDescription", e.target.value)}
                            placeholder="Penjelasan mendalam arsitektur sistem, infrastruktur, atau backend..."
                            className="w-full px-3 py-2 bg-surface-secondary border border-border focus:border-accent rounded-lg text-foreground text-xs leading-relaxed outline-none"
                          />
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="space-y-2 pt-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <label className="text-accent font-bold block text-[11px] uppercase">TAG TEKNOLOGI</label>
                            <button
                              type="button"
                              onClick={() => handleAddArrayItem(pIdx, "tech", "Docker")}
                              className="text-[10px] text-accent font-bold hover:underline cursor-pointer"
                            >
                              + Tambah Tag
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(proj.tech || []).map((tItem, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-1.5 bg-surface-secondary border border-accent/40 px-2.5 py-1 rounded-lg">
                                <input
                                  type="text"
                                  value={tItem}
                                  onChange={(e) => handleArrayItemChange(pIdx, "tech", tIdx, e.target.value)}
                                  className="bg-transparent text-xs text-accent font-mono font-bold w-24 focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveArrayItem(pIdx, "tech", tIdx)}
                                  className="text-rose-400 hover:text-rose-300 cursor-pointer"
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Engineering Challenges */}
                        <div className="space-y-2 pt-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <label className="text-secondary font-bold block text-[11px] uppercase">TANTANGAN TEKNIS (CHALLENGES)</label>
                            <button
                              type="button"
                              onClick={() => handleAddArrayItem(pIdx, "challenges", "Tantangan teknis...")}
                              className="text-[10px] text-accent font-bold hover:underline cursor-pointer"
                            >
                              + Tambah Tantangan
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            {(proj.challenges || []).map((cItem, cIdx) => (
                              <div key={cIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={cItem}
                                  onChange={(e) => handleArrayItemChange(pIdx, "challenges", cIdx, e.target.value)}
                                  className="flex-1 px-3 py-1.5 bg-surface-secondary border border-border rounded-md text-foreground text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveArrayItem(pIdx, "challenges", cIdx)}
                                  className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Implemented Solutions */}
                        <div className="space-y-2 pt-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <label className="text-secondary font-bold block text-[11px] uppercase">SOLUSI TEKNIS (SOLUTIONS)</label>
                            <button
                              type="button"
                              onClick={() => handleAddArrayItem(pIdx, "solutions", "Solusi implementasi...")}
                              className="text-[10px] text-accent font-bold hover:underline cursor-pointer"
                            >
                              + Tambah Solusi
                            </button>
                          </div>
                          <div className="space-y-1.5">
                            {(proj.solutions || []).map((sItem, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={sItem}
                                  onChange={(e) => handleArrayItemChange(pIdx, "solutions", sIdx, e.target.value)}
                                  className="flex-1 px-3 py-1.5 bg-surface-secondary border border-border rounded-md text-foreground text-xs outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveArrayItem(pIdx, "solutions", sIdx)}
                                  className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                                >
                                  <X size={14} />
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
          )}
        </div>
      </div>
    </div>
  );
}
