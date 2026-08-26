"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0e12] py-8 text-[#818284] font-mono text-xs border-t border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00d892]" />
          <span className="text-[11px] text-[#00d892] uppercase tracking-[0.064em]">
            STATUS: ALL_SYSTEMS_OPERATIONAL
          </span>
          <span className="text-[#303235]">•</span>
          <span className="text-[#bababb]">
            Muhammad Nur Ashiddiqi // DevOps System Architecture
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.053em]">
          <Link href="/" className="hover:text-[#dedede] transition-colors">
            OVERVIEW
          </Link>
          <Link href="/#projects" className="hover:text-[#dedede] transition-colors">
            SYSTEMS
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#dedede] cursor-pointer transition-colors"
            title="Scroll To Top"
          >
            ↑ TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
