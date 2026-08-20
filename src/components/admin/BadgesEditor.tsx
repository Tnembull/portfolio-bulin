"use client";

import React from "react";
import { CertificationBadge } from "@/lib/supabase";
import {
  Award,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Star,
} from "lucide-react";

interface BadgesEditorProps {
  items: CertificationBadge[];
  onChange: (items: CertificationBadge[]) => void;
}

export default function BadgesEditor({ items = [], onChange }: BadgesEditorProps) {
  const handleAddItem = () => {
    const newItem: CertificationBadge = {
      id: `badge-${Date.now()}`,
      name: "Badged Certification Baru",
      issuer: "Penerbit Certification (e.g. AWS / Oracle / CNCF)",
      badge_image_url:
        "https://images.credly.com/size/340x340/images/d3752e25-1e3d-49d7-8321-7299a9b6f124/image.png",
      verification_url: "https://credly.com",
      issue_date: "2025",
      is_featured: true,
      order_index: items.length,
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleItemFieldChange = (
    index: number,
    field: keyof CertificationBadge,
    value: unknown
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    const reordered = updated.map((item, i) => ({ ...item, order_index: i }));
    onChange(reordered);
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-[#e7e9db] uppercase tracking-wide text-sm flex items-center gap-2">
              <Award size={16} className="text-[#48b685]" />
              <span>KELOLA DIGITAL CERTIFICATION BADGES (CREDLY/VERIFIABLE)</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur lencana digital, URL verifikasi Credly/issuer, gambar badge, dan status featured badge.
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#48b685]/90"
          >
            <Plus size={15} />
            <span>+ Tambah Badge</span>
          </button>
        </div>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <div
              key={item.id || `badge-${idx}`}
              className="p-5 rounded-xl border border-[#483145] bg-[#19131a] space-y-5 shadow-sm relative group"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#483145] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded text-[10px]">
                    BADGE #{String(idx + 1).padStart(2, "0")}
                  </span>
                  {item.is_featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/40 bg-amber-500/10 text-amber-400 flex items-center gap-1 uppercase">
                      <Star size={11} className="fill-amber-400" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveItem(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-[#a392a3] hover:text-[#48b685] disabled:opacity-30 disabled:hover:text-[#a392a3] cursor-pointer"
                    title="Pindahkan Ke Atas"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    onClick={() => handleMoveItem(idx, "down")}
                    disabled={idx === items.length - 1}
                    className="p-1 text-[#a392a3] hover:text-[#48b685] disabled:opacity-30 disabled:hover:text-[#a392a3] cursor-pointer"
                    title="Pindahkan Ke Bawah"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Badge"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-5 items-start">
                {/* Badge Image Preview */}
                <div className="space-y-2">
                  <label className="text-[10px] text-[#48b685] uppercase font-bold flex items-center gap-1">
                    <ImageIcon size={12} />
                    <span>PREVIEW BADGE</span>
                  </label>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[#483145] bg-[#0d090d] p-2 flex items-center justify-center">
                    {item.badge_image_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.badge_image_url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Award size={32} className="text-[#48b685]/50" />
                    )}
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Badge Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                      Nama Lencana / Certification Title
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemFieldChange(idx, "name", e.target.value)}
                      placeholder="e.g. AWS Certified Cloud Practitioner"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] font-bold text-xs outline-none"
                    />
                  </div>

                  {/* Issuer */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                      Penerbit / Issuer
                    </label>
                    <input
                      type="text"
                      value={item.issuer}
                      onChange={(e) => handleItemFieldChange(idx, "issuer", e.target.value)}
                      placeholder="e.g. Amazon Web Services / Oracle"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none"
                    />
                  </div>

                  {/* Issue Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                      Tahun / Tanggal Terbit
                    </label>
                    <input
                      type="text"
                      value={item.issue_date || ""}
                      onChange={(e) => handleItemFieldChange(idx, "issue_date", e.target.value)}
                      placeholder="e.g. 2025"
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none"
                    />
                  </div>

                  {/* Badge Image URL + Upload */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                        Badge Image URL (Atau Upload File ke Cloudflare R2)
                      </label>
                      <label className="text-[10px] text-[#48b685] bg-[#48b685]/15 border border-[#48b685]/40 hover:bg-[#48b685]/30 px-2 py-0.5 rounded font-bold cursor-pointer transition-colors flex items-center gap-1">
                        <Upload size={11} />
                        <span>Upload R2</span>
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
                                handleItemFieldChange(idx, "badge_image_url", resData.url);
                              } else {
                                alert(resData.error || "Gagal mengunggah gambar ke R2.");
                              }
                            } catch {
                              alert("Terjadi kesalahan saat mengunggah file ke R2.");
                            }
                          }}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={item.badge_image_url}
                      onChange={(e) => handleItemFieldChange(idx, "badge_image_url", e.target.value)}
                      placeholder="https://images.credly.com/..."
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none font-mono"
                    />
                  </div>

                  {/* Verification URL */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                      <ExternalLink size={11} className="text-[#48b685]" />
                      <span>URL Verifikasi Credly / Badge Public Link</span>
                    </label>
                    <input
                      type="text"
                      value={item.verification_url || ""}
                      onChange={(e) => handleItemFieldChange(idx, "verification_url", e.target.value)}
                      placeholder="https://www.credly.com/badges/..."
                      className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="sm:col-span-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={item.is_featured}
                        onChange={(e) =>
                          handleItemFieldChange(idx, "is_featured", e.target.checked)
                        }
                        className="accent-[#48b685] size-4 rounded cursor-pointer"
                      />
                      <span className="text-xs text-[#e7e9db] font-bold">
                        Tampilkan sebagai Featured Badge (Highlight di Beranda)
                      </span>
                    </label>
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
