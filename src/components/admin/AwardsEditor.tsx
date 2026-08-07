"use client";

import { AwardItem } from "@/context/PortfolioContext";
import { Plus, Trash2, Award, Image as ImageIcon, ExternalLink, ShieldCheck, Upload, FileText } from "lucide-react";
import Image from "next/image";

interface AwardsEditorProps {
  items: AwardItem[];
  onChange: (items: AwardItem[]) => void;
}

export default function AwardsEditor({ items, onChange }: AwardsEditorProps) {
  const handleAdd = () => {
    const newItem: AwardItem = {
      id: `cert-${Date.now()}`,
      title: "Sertifikasi Baru",
      issuer: "Lembaga Penerbit",
      date: "2024",
      credentialId: `CRED-${Math.floor(100000 + Math.random() * 900000)}`,
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.cncf.io/",
    };
    onChange([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleFieldChange = (index: number, key: keyof AwardItem, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-extrabold text-foreground uppercase tracking-wide text-sm flex items-center gap-2">
              <Award size={16} className="text-[#48b685]" />
              <span>12 // KELOLA SERTIFIKAT & LISENSI</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur gambar carousel, judul sertifikat, penerbit, ID lisensi, dan link verifikasi resmi.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#48b685]/90"
          >
            <Plus size={15} />
            <span>+ Tambah Sertifikat</span>
          </button>
        </div>

        <div className="space-y-4">
          {items.map((aw, idx) => (
            <div key={aw.id} className="p-4 sm:p-5 rounded-xl border border-[#483145] bg-[#19131a] space-y-4 shadow-sm relative group">
              <div className="flex items-center justify-between border-b border-[#483145] pb-2.5">
                <span className="font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded text-[10px]">
                  CERTIFICATE #{String(idx + 1).padStart(2, "0")}
                </span>
                <button
                  onClick={() => handleRemove(aw.id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Hapus Sertifikat"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start">
                {/* Image Preview */}
                <div className="space-y-2">
                  <label className="text-[10px] text-[#48b685] uppercase font-bold flex items-center gap-1">
                    <ImageIcon size={12} />
                    <span>PREVIEW GAMBAR</span>
                  </label>
                  {/* Live Certificate Image or PDF Preview */}
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#483145] bg-black/40 flex items-center justify-center">
                    {aw.image?.toLowerCase().includes(".pdf") ? (
                      <div className="w-full h-full flex flex-col items-center justify-between p-3 bg-gradient-to-br from-[#2f1e2e] via-[#19131a] to-[#2f1e2e] border border-[#483145] rounded-lg text-center relative group">
                        <div className="flex items-center gap-1 text-[#48b685] text-[10px] font-bold uppercase tracking-widest pt-1">
                          <FileText size={16} />
                          <span>FILE DOKUMEN PDF</span>
                        </div>
                        <p className="text-[10px] text-slate-200 font-bold truncate max-w-[130px] my-auto">
                          {aw.title || "Sertifikat PDF"}
                        </p>
                        <a
                          href={aw.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#48b685] text-[#19131a] py-1 px-2 rounded-md text-[10px] font-extrabold flex items-center justify-center gap-1 shadow-md hover:bg-[#48b685]/90 transition-all cursor-pointer"
                        >
                          <ExternalLink size={12} />
                          <span>Lihat / Buka PDF</span>
                        </a>
                      </div>
                    ) : (
                      <Image
                        src={aw.image || "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop"}
                        alt={aw.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Title */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                      Judul Sertifikat / Ujian
                    </label>
                    <input
                      type="text"
                      value={aw.title}
                      onChange={(e) => handleFieldChange(idx, "title", e.target.value)}
                      placeholder="e.g. CKA: Certified Kubernetes Administrator"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-foreground font-bold text-xs outline-none"
                    />
                  </div>

                  {/* Issuer */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                      Lembaga Penerbit
                    </label>
                    <input
                      type="text"
                      value={aw.issuer || ""}
                      onChange={(e) => handleFieldChange(idx, "issuer", e.target.value)}
                      placeholder="e.g. Cloud Native Computing Foundation (CNCF)"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-foreground text-xs outline-none"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                      Tahun / Tanggal Terbit
                    </label>
                    <input
                      type="text"
                      value={aw.date || ""}
                      onChange={(e) => handleFieldChange(idx, "date", e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-foreground text-xs outline-none"
                    />
                  </div>

                  {/* Credential ID */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                      <ShieldCheck size={11} className="text-[#48b685]" />
                      <span>ID Kredensial / Lisensi</span>
                    </label>
                    <input
                      type="text"
                      value={aw.credentialId || ""}
                      onChange={(e) => handleFieldChange(idx, "credentialId", e.target.value)}
                      placeholder="e.g. LF-CKA-982341"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold text-xs outline-none"
                    />
                  </div>

                  {/* Image URL with R2 Upload Button */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                        URL Gambar Sertifikat (Atau Upload ke Cloudflare R2)
                      </label>
                      <label className="text-[10px] text-[#48b685] bg-[#48b685]/15 border border-[#48b685]/40 hover:bg-[#48b685]/30 px-2 py-0.5 rounded font-bold cursor-pointer transition-colors flex items-center gap-1">
                        <Upload size={11} />
                        <span>Upload File ke R2</span>
                        <input
                          type="file"
                          accept="image/*,.pdf,application/pdf"
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
                                handleFieldChange(idx, "image", resData.url);
                              } else {
                                alert(resData.error || "Gagal mengunggah file ke R2.");
                              }
                            } catch {
                              alert("Terjadi kesalahan jaringan saat upload ke R2.");
                            }
                          }}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={aw.image || ""}
                      onChange={(e) => handleFieldChange(idx, "image", e.target.value)}
                      placeholder="https://images.unsplash.com/... atau URL Cloudflare R2"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-foreground text-xs outline-none"
                    />
                  </div>

                  {/* Verification Link */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                      <ExternalLink size={11} className="text-[#48b685]" />
                      <span>Link Verifikasi Resmi (Credential URL)</span>
                    </label>
                    <input
                      type="text"
                      value={aw.link || ""}
                      onChange={(e) => handleFieldChange(idx, "link", e.target.value)}
                      placeholder="https://www.cncf.io/certification/cka/"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-foreground text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
