"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background pb-8 pt-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        <div className="screen-line-top p-4 sm:p-5 border-t border-b border-line bg-muted/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#a392a3]">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[#48b685] animate-pulse" />
            <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded font-bold uppercase">
              STATUS: ALL_SYSTEMS_OPERATIONAL
            </span>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <span className="hidden sm:inline">Engineered by </span>
            <span className="text-[#48b685] font-bold hidden sm:inline">
              Muhammad Nur Ashiddiqi (Bulin)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-bold">
            <Link href="/" className="hover:text-[#48b685] text-[#a392a3] transition-colors">
              [Overview]
            </Link>
            <Link href="/#projects" className="hover:text-[#48b685] text-[#a392a3] transition-colors">
              [Projects]
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[#a392a3] hover:text-[#48b685] cursor-pointer transition-colors p-1"
              title="Scroll To Top"
            >
              ➔ TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
