"use client";

import { HeroData } from "@/context/PortfolioContext";
import { Sparkles, User, Building, MapPin, Mail, Phone, Globe, ShieldCheck } from "lucide-react";

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-2xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-md">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-slate-100 uppercase tracking-wide text-sm flex items-center gap-2">
              <Sparkles size={16} className="text-[#48b685]" />
              <span>01 // KELOLA HERO BLOCK & UTAMA</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Atur nama lengkap, posisi, biografi singkat, nama perusahaan, email, dan detail kontak utama.
            </p>
          </div>
          <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2.5 py-1 rounded-md font-extrabold">
            HERO_BLOCK
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <User size={12} className="text-[#48b685]" />
                <span>NAMA LENGKAP</span>
              </label>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => onChange({ ...data, name: e.target.value })}
                placeholder="Muhammad Nur Ashiddiqi"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 font-bold outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#48b685]" />
                <span>POSISI / JABATAN</span>
              </label>
              <input
                type="text"
                value={data.role || ""}
                onChange={(e) => onChange({ ...data, role: e.target.value })}
                placeholder="DevOps & Backend Engineer"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-[#48b685] font-bold outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-[#a392a3] uppercase font-bold">
              RINGKASAN BIOGRAFI HERO (SHIMMER BIO)
            </label>
            <textarea
              rows={2}
              value={data.bio || ""}
              onChange={(e) => onChange({ ...data, bio: e.target.value })}
              placeholder="Backend Developer (S.Kom Unila) turned DevOps Engineer..."
              className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <Building size={12} className="text-[#48b685]" />
                <span>NAMA PERUSAHAAN</span>
              </label>
              <input
                type="text"
                value={data.company || ""}
                onChange={(e) => onChange({ ...data, company: e.target.value })}
                placeholder="Newus Teknologi"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                LINK WEBSITE PERUSAHAAN
              </label>
              <input
                type="text"
                value={data.companyLink || ""}
                onChange={(e) => onChange({ ...data, companyLink: e.target.value })}
                placeholder="https://newus.id"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <MapPin size={12} className="text-[#48b685]" />
                <span>LOKASI DOMISILI</span>
              </label>
              <input
                type="text"
                value={data.location || ""}
                onChange={(e) => onChange({ ...data, location: e.target.value })}
                placeholder="Bandar Lampung, Indonesia"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                LINK GOOGLE MAPS LOKASI
              </label>
              <input
                type="text"
                value={data.locationLink || ""}
                onChange={(e) => onChange({ ...data, locationLink: e.target.value })}
                placeholder="https://maps.google.com/?q=Bandar+Lampung,Indonesia"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <Mail size={12} className="text-[#48b685]" />
                <span>ALAMAT EMAIL</span>
              </label>
              <input
                type="text"
                value={data.email || ""}
                onChange={(e) => onChange({ ...data, email: e.target.value })}
                placeholder="muhammadnurashiddiqi@gmail.com"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <Phone size={12} className="text-[#48b685]" />
                <span>NOMOR TELEPON / WHATSAPP</span>
              </label>
              <input
                type="text"
                value={data.phone || ""}
                onChange={(e) => onChange({ ...data, phone: e.target.value })}
                placeholder="+62 812 3456 7890"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                <Globe size={12} className="text-[#48b685]" />
                <span>DOMAIN WEBSITE</span>
              </label>
              <input
                type="text"
                value={data.website || ""}
                onChange={(e) => onChange({ ...data, website: e.target.value })}
                placeholder="bulindev.tech"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                PRONOUNS
              </label>
              <input
                type="text"
                value={data.pronouns || ""}
                onChange={(e) => onChange({ ...data, pronouns: e.target.value })}
                placeholder="he/him"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-slate-100 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                TEKS BADGE STATUS
              </label>
              <input
                type="text"
                value={data.statusText || ""}
                onChange={(e) => onChange({ ...data, statusText: e.target.value })}
                placeholder="DevOps & Backend Engineer @ Newus Teknologi"
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] focus:border-[#48b685] rounded-xl text-[#48b685] font-bold outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
