"use client";

import React, { useState } from "react";
import { HeroData } from "@/context/PortfolioContext";
import { compressImage } from "@/lib/image-compressor";
import { Sparkles, User, Building, MapPin, Mail, Phone, Globe, ShieldCheck, Upload, AlertCircle } from "lucide-react";

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (field: keyof HeroData, file: File) => {
    setUploadingField(field);
    setUploadError(null);

    try {
      const fileToUpload = await compressImage(file, {
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.85,
        targetFormat: "image/webp",
      });

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Gagal mengunggah gambar ke Cloudflare R2.");
      }

      onChange({
        ...data,
        [field]: json.url,
      });
    } catch (err: unknown) {
      setUploadError((err as Error).message || "Upload gagal.");
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-border bg-surface space-y-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-extrabold text-foreground uppercase tracking-wide text-sm flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <span>01 // KELOLA PROFIL HERO & AVATAR</span>
            </h3>
            <p className="text-secondary text-[11px] mt-0.5 font-sans">
              Atur nama lengkap, jabatan, foto profil avatar (R2), biografi singkat, perusahaan, dan kontak utama.
            </p>
          </div>
          <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md font-extrabold">
            HERO_BLOCK
          </span>
        </div>

        {uploadError && (
          <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Avatar Upload to R2 */}
          <div className="p-4 rounded-xl border border-border bg-surface-secondary space-y-3">
            <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="text-accent">📸 //</span>
              <span>Foto Profil / Avatar Hero (Cloudflare R2)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-secondary uppercase font-bold block">
                  Foto Profil Utama (Avatar Default)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.avatarOff || ""}
                    onChange={(e) => onChange({ ...data, avatarOff: e.target.value })}
                    placeholder="/logo/logo.png atau URL Cloudflare R2"
                    className="flex-1 px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none font-mono text-xs"
                  />
                  <label className="px-3 py-2 bg-accent hover:bg-accent-hover text-accent-text font-bold rounded-md cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                    <Upload size={13} />
                    <span>{uploadingField === "avatarOff" ? "Uploading..." : "Upload R2"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingField !== null}
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload("avatarOff", f);
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-secondary uppercase font-bold block">
                  Foto Profil Hover / Expression (Opsional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={data.avatarOn || ""}
                    onChange={(e) => onChange({ ...data, avatarOn: e.target.value })}
                    placeholder="/logo/logo.png atau URL Cloudflare R2"
                    className="flex-1 px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none font-mono text-xs"
                  />
                  <label className="px-3 py-2 bg-surface hover:bg-border text-foreground border border-border font-bold rounded-md cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                    <Upload size={13} />
                    <span>{uploadingField === "avatarOn" ? "Uploading..." : "Upload R2"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingField !== null}
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload("avatarOn", f);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <User size={12} className="text-accent" />
                <span>NAMA LENGKAP</span>
              </label>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => onChange({ ...data, name: e.target.value })}
                placeholder="Muhammad Nur Ashiddiqi"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground font-bold outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <ShieldCheck size={12} className="text-accent" />
                <span>POSISI / JABATAN</span>
              </label>
              <input
                type="text"
                value={data.role || ""}
                onChange={(e) => onChange({ ...data, role: e.target.value })}
                placeholder="DevOps & Backend Engineer"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-accent font-bold outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold">
              RINGKASAN BIOGRAFI HERO
            </label>
            <textarea
              rows={3}
              value={data.bio || ""}
              onChange={(e) => onChange({ ...data, bio: e.target.value })}
              placeholder="Backend Developer turned DevOps Engineer..."
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none leading-relaxed font-sans text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <Building size={12} className="text-accent" />
                <span>NAMA PERUSAHAAN</span>
              </label>
              <input
                type="text"
                value={data.company || ""}
                onChange={(e) => onChange({ ...data, company: e.target.value })}
                placeholder="Newus Teknologi"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold">
                LINK WEBSITE PERUSAHAAN
              </label>
              <input
                type="text"
                value={data.companyLink || ""}
                onChange={(e) => onChange({ ...data, companyLink: e.target.value })}
                placeholder="https://newus.id"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <MapPin size={12} className="text-accent" />
                <span>LOKASI DOMISILI</span>
              </label>
              <input
                type="text"
                value={data.location || ""}
                onChange={(e) => onChange({ ...data, location: e.target.value })}
                placeholder="Bandar Lampung, Indonesia"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold">
                LINK GOOGLE MAPS LOKASI
              </label>
              <input
                type="text"
                value={data.locationLink || ""}
                onChange={(e) => onChange({ ...data, locationLink: e.target.value })}
                placeholder="https://maps.google.com/?q=Bandar+Lampung,Indonesia"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <Mail size={12} className="text-accent" />
                <span>ALAMAT EMAIL</span>
              </label>
              <input
                type="text"
                value={data.email || ""}
                onChange={(e) => onChange({ ...data, email: e.target.value })}
                placeholder="muhammadnurashiddiqi@gmail.com"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <Phone size={12} className="text-accent" />
                <span>NOMOR TELEPON / WHATSAPP</span>
              </label>
              <input
                type="text"
                value={data.phone || ""}
                onChange={(e) => onChange({ ...data, phone: e.target.value })}
                placeholder="+62 812 3456 7890"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <Globe size={12} className="text-accent" />
                <span>DOMAIN WEBSITE</span>
              </label>
              <input
                type="text"
                value={data.website || ""}
                onChange={(e) => onChange({ ...data, website: e.target.value })}
                placeholder="bulindev.tech"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-foreground outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold">
                TEKS BADGE STATUS
              </label>
              <input
                type="text"
                value={data.statusText || ""}
                onChange={(e) => onChange({ ...data, statusText: e.target.value })}
                placeholder="Available for collaboration"
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-md text-accent font-bold outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
