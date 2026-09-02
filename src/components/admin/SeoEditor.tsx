"use client";

import React, { useState } from "react";
import { SeoData } from "@/context/PortfolioContext";
import { compressImage } from "@/lib/image-compressor";
import { Globe, Upload, Image as ImageIcon, ExternalLink, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface SeoEditorProps {
  data?: SeoData;
  onChange: (data: SeoData) => void;
}

const DEFAULT_SEO: SeoData = {
  metaTitle: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
  metaDescription:
    "Official portfolio of Muhammad Nur Ashiddiqi. DevOps & Backend Engineer specializing in REST APIs, PostgreSQL optimization, Kubernetes orchestration, Docker containerization, and automated CI/CD pipelines.",
  keywords:
    "Muhammad Nur Ashiddiqi, DevOps Engineer, Backend Developer, Cloud Engineer, Kubernetes, Docker, Terraform, CI/CD, GitHub Actions, Node.js, PostgreSQL",
  ogTitle: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
  ogDescription:
    "DevOps & Backend Engineer creating high availability cloud infrastructure, automated pipelines, and containerized backend systems.",
  ogImage: "https://media.bulindev.tech/uploads/1788351777889-34541.png",
  canonicalUrl: "https://bulindev.tech",
  faviconUrl: "https://media.bulindev.tech/uploads/1788351857850-34542.png",
  appleTouchIconUrl: "https://media.bulindev.tech/uploads/1788351857850-34542.png",
  googleAnalyticsId: "G-FC0GRRZXY3",
};

export default function SeoEditor({ data, onChange }: SeoEditorProps) {
  const currentData: SeoData = {
    ...DEFAULT_SEO,
    ...(data || {}),
  };
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (field: keyof SeoData, file: File) => {
    setUploadingField(field);
    setUploadError(null);

    try {
      let fileToUpload = file;
      if (field === "ogImage") {
        fileToUpload = await compressImage(file, { maxWidth: 1200, maxHeight: 630, quality: 0.85, targetFormat: "image/webp" });
      } else if (field === "faviconUrl" || field === "appleTouchIconUrl") {
        fileToUpload = await compressImage(file, { maxWidth: 192, maxHeight: 192, quality: 0.9, targetFormat: "image/png" });
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Gagal mengunggah file ke Cloudflare R2.");
      }

      onChange({
        ...currentData,
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
              <Globe size={16} className="text-accent" />
              <span>PENGATURAN SEO & SOCIAL OPEN GRAPH (OG)</span>
            </h3>
            <p className="text-secondary text-[11px] mt-0.5 font-sans">
              Kelola judul meta, deskripsi pencarian Google, kata kunci, gambar Open Graph (untuk preview di WhatsApp/Twitter/IG/FB), Favicon, dan Google Analytics.
            </p>
          </div>
          <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md font-extrabold">
            SEO & OG
          </span>
        </div>

        {uploadError && (
          <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{uploadError}</span>
          </div>
        )}

        {/* 1. Core Meta Search Engine */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <span className="text-accent font-mono">01 //</span>
            <span>Meta Search Engine (Google / Bing / Yahoo)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Meta Title (Judul Halaman Utama di Google Search)
            </label>
            <input
              type="text"
              value={currentData.metaTitle}
              onChange={(e) => onChange({ ...currentData, metaTitle: e.target.value })}
              placeholder="e.g. Muhammad Nur Ashiddiqi — DevOps & Backend Engineer"
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Meta Description (Deskripsi Ringkasan di Hasil Pencarian)
            </label>
            <textarea
              rows={3}
              value={currentData.metaDescription}
              onChange={(e) => onChange({ ...currentData, metaDescription: e.target.value })}
              placeholder="Deskripsi ringkas keahlian dan portofolio kamu..."
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none resize-none font-sans text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Keywords (Kata Kunci Pencarian - Pisahkan dengan Koma)
            </label>
            <input
              type="text"
              value={currentData.keywords}
              onChange={(e) => onChange({ ...currentData, keywords: e.target.value })}
              placeholder="DevOps Engineer, Backend Developer, Kubernetes, Docker, Node.js..."
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Canonical URL
            </label>
            <input
              type="text"
              value={currentData.canonicalUrl}
              onChange={(e) => onChange({ ...currentData, canonicalUrl: e.target.value })}
              placeholder="https://bulindev.tech"
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none font-mono"
            />
          </div>
        </div>

        {/* 2. Open Graph & Social Share Preview */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <span className="text-accent font-mono">02 //</span>
            <span>Social Open Graph (WhatsApp, Twitter/X, LinkedIn, FB, IG)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                OpenGraph Share Title
              </label>
              <input
                type="text"
                value={currentData.ogTitle}
                onChange={(e) => onChange({ ...currentData, ogTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                OpenGraph Share Description
              </label>
              <input
                type="text"
                value={currentData.ogDescription}
                onChange={(e) => onChange({ ...currentData, ogDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none"
              />
            </div>
          </div>

          {/* OG Image Upload / URL */}
          <div className="space-y-2">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              OpenGraph Preview Image URL (Resolusi Rekomendasi: 1200 × 630 px)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={currentData.ogImage}
                onChange={(e) => onChange({ ...currentData, ogImage: e.target.value })}
                placeholder="https://media.bulindev.tech/uploads/... atau https://bulindev.tech/opengraph-image"
                className="flex-1 px-3.5 py-2.5 bg-surface border border-border rounded-lg text-foreground outline-none font-mono text-xs"
              />
              <label className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-accent-text font-bold rounded-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2 shrink-0">
                <Upload size={14} />
                <span>{uploadingField === "ogImage" ? "Mengunggah..." : "Upload ke R2"}</span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingField !== null}
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileUpload("ogImage", f);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 3. Favicon & Web Icons */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <span className="text-accent font-mono">03 //</span>
            <span>Favicon & Browser App Icons</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Favicon */}
            <div className="space-y-2">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Favicon URL (.ico / .png)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentData.faviconUrl}
                  onChange={(e) => onChange({ ...currentData, faviconUrl: e.target.value })}
                  placeholder="/favicon.ico atau https://media.bulindev.tech/uploads/..."
                  className="flex-1 px-3.5 py-2 bg-surface border border-border rounded-lg text-foreground outline-none font-mono text-xs"
                />
                <label className="px-3 py-2 bg-surface-secondary hover:bg-border text-foreground font-bold rounded-lg border border-border cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                  <Upload size={13} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*,.ico"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileUpload("faviconUrl", f);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Apple Touch Icon */}
            <div className="space-y-2">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Apple Touch Icon URL (.png)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentData.appleTouchIconUrl}
                  onChange={(e) => onChange({ ...currentData, appleTouchIconUrl: e.target.value })}
                  placeholder="/logo/logo.png atau https://media.bulindev.tech/uploads/..."
                  className="flex-1 px-3.5 py-2 bg-surface border border-border rounded-lg text-foreground outline-none font-mono text-xs"
                />
                <label className="px-3 py-2 bg-surface-secondary hover:bg-border text-foreground font-bold rounded-lg border border-border cursor-pointer inline-flex items-center gap-1.5 shrink-0">
                  <Upload size={13} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*,.png"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileUpload("appleTouchIconUrl", f);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Analytics & Google Tag */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
            <span className="text-accent font-mono">04 //</span>
            <span>Analytics & Tracking</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Google Analytics Measurement ID (gtag.js)
            </label>
            <input
              type="text"
              value={currentData.googleAnalyticsId}
              onChange={(e) => onChange({ ...currentData, googleAnalyticsId: e.target.value })}
              placeholder="e.g. G-FC0GRRZXY3"
              className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-lg text-accent font-bold outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
