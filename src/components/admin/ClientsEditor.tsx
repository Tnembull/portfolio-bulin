"use client";

import React from "react";
import { ClientsData, ClientItem } from "@/context/PortfolioContext";
import { Building2, Plus, Trash2, ExternalLink } from "lucide-react";

interface ClientsEditorProps {
  data?: ClientsData;
  onChange: (data: ClientsData) => void;
}

export default function ClientsEditor({ data, onChange }: ClientsEditorProps) {
  const currentData: ClientsData = data || {
    sectionBadge: "COLLABORATIONS // CLIENTS",
    titleMain: "Organizations &",
    titleHighlight: "Clients",
    subText: "Selected companies, startups, and initiatives I've engineered solutions for.",
    items: [],
  };

  const items = currentData.items || [];

  const handleAdd = () => {
    const newItem: ClientItem = {
      id: `client-${Date.now()}`,
      name: "Nama Klien / Partner",
      logoSrc: "",
      industry: "DevOps & Cloud Infrastructure",
      url: "",
    };
    onChange({ ...currentData, items: [newItem, ...items] });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...currentData,
      items: items.filter((item) => item.id !== id),
    });
  };

  const handleItemUpdate = (index: number, key: keyof ClientItem, val: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...currentData, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-border bg-surface space-y-6 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-extrabold text-foreground uppercase tracking-wide text-sm flex items-center gap-2">
              <Building2 size={16} className="text-accent" />
              <span>KELOLA KLIEN & REKANAN (CLIENTS & PARTNERS)</span>
            </h3>
            <p className="text-secondary text-[11px] mt-0.5 font-sans">
              Atur logo dan daftar klien yang pernah Anda tangani untuk ditampilkan di Homepage Marquee.
            </p>
          </div>
          <span className="text-[10px] text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-md font-extrabold">
            CLIENTS
          </span>
        </div>

        {/* Section Metadata */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Section Badge
            </label>
            <input
              type="text"
              value={currentData.sectionBadge || ""}
              onChange={(e) => onChange({ ...currentData, sectionBadge: e.target.value })}
              placeholder="e.g. COLLABORATIONS // CLIENTS"
              className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-foreground outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Main Title
              </label>
              <input
                type="text"
                value={currentData.titleMain || ""}
                onChange={(e) => onChange({ ...currentData, titleMain: e.target.value })}
                placeholder="e.g. Organizations &"
                className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-foreground outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-secondary uppercase font-bold block">
                Highlight Title
              </label>
              <input
                type="text"
                value={currentData.titleHighlight || ""}
                onChange={(e) => onChange({ ...currentData, titleHighlight: e.target.value })}
                placeholder="e.g. Clients"
                className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-accent font-bold outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-secondary uppercase font-bold block">
              Sub-text / Deskripsi Singkat
            </label>
            <input
              type="text"
              value={currentData.subText || ""}
              onChange={(e) => onChange({ ...currentData, subText: e.target.value })}
              placeholder="Deskripsi singkat seksi klien..."
              className="w-full px-3.5 py-2 bg-surface border border-border rounded-lg text-secondary outline-none text-xs"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold uppercase tracking-wider text-foreground text-xs">
              DAFTAR KLIEN ({items.length})
            </h4>
            <button
              type="button"
              onClick={handleAdd}
              className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-accent-text font-extrabold rounded-lg transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus size={14} />
              <span>Tambah Klien</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 text-center text-secondary border border-border rounded-lg">
              Belum ada klien terdaftar. Klik tombol &ldquo;Tambah Klien&rdquo; di atas untuk menambahkan klien atau organisasi pertama Anda.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-5 rounded-xl border border-border bg-surface-secondary space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-extrabold text-accent text-xs flex items-center gap-2">
                      <Building2 size={13} />
                      <span>#{idx + 1} {item.name || "Klien Baru"}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                      title="Hapus Klien"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Nama Klien / Perusahaan
                      </label>
                      <input
                        type="text"
                        value={item.name || ""}
                        onChange={(e) => handleItemUpdate(idx, "name", e.target.value)}
                        placeholder="e.g. CloudScale Corp / Fintech Enterprise"
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Bidang Industri / Kategori Layanan
                      </label>
                      <input
                        type="text"
                        value={item.industry || ""}
                        onChange={(e) => handleItemUpdate(idx, "industry", e.target.value)}
                        placeholder="e.g. Cloud SaaS / Banking / Logistics"
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Logo Klien URL (SVG/PNG/WebP, Opsional)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.logoSrc || ""}
                          onChange={(e) => handleItemUpdate(idx, "logoSrc", e.target.value)}
                          placeholder="e.g. https://.../client-logo.svg"
                          className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none"
                        />
                        {item.logoSrc && (
                          <div className="size-8 rounded border border-border bg-surface shrink-0 overflow-hidden flex items-center justify-center p-0.5">
                            <img
                              src={item.logoSrc}
                              alt="Client logo preview"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-secondary uppercase font-bold block">
                        Website / Link Studi Kasus (Opsional)
                      </label>
                      <input
                        type="text"
                        value={item.url || ""}
                        onChange={(e) => handleItemUpdate(idx, "url", e.target.value)}
                        placeholder="e.g. https://client-website.com"
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md text-foreground outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
