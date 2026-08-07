"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Github, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Navbar() {
  const { state } = usePortfolio();
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initials = "MNA";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-line transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs font-bold tracking-tight hover:opacity-90 transition-opacity shrink-0"
            aria-label="Home"
          >
            <div className="size-7 rounded-md border border-[#48b685]/50 bg-[#48b685]/15 flex items-center justify-center font-mono text-[11px] font-extrabold text-[#48b685]">
              {initials}
            </div>
            <span className="hidden xs:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#48b685] uppercase bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md font-bold">
              <span className="size-1.5 rounded-full bg-[#48b685] animate-pulse" />
              ONLINE
            </span>
          </Link>

          {/* Nav links (Desktop lg+) - Carbon Code Tabs style */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-mono">
            <Link
              href="/#overview"
              className="px-2.5 py-1 rounded-md bg-muted/40 border border-transparent hover:border-[#48b685]/50 hover:bg-[#48b685]/10 text-foreground transition-all flex items-center gap-1.5"
            >
              <span className="text-[#48b685] font-bold text-[10px]">⚛</span>
              <span>overview.tsx</span>
            </Link>
            <Link
              href="/#experience"
              className="px-2.5 py-1 rounded-md bg-muted/40 border border-transparent hover:border-[#48b685]/50 hover:bg-[#48b685]/10 text-foreground transition-all flex items-center gap-1.5"
            >
              <span className="text-[#48b685] font-bold text-[10px]">TS</span>
              <span>experience.ts</span>
            </Link>
            <Link
              href="/#projects"
              className="px-2.5 py-1 rounded-md bg-muted/40 border border-transparent hover:border-[#f99b15]/50 hover:bg-[#f99b15]/10 text-foreground transition-all flex items-center gap-1.5"
            >
              <span className="text-[#f99b15] font-bold text-[10px]">{`{}`}</span>
              <span>projects.json</span>
            </Link>
            <Link
              href="/#skills"
              className="px-2.5 py-1 rounded-md bg-muted/40 border border-transparent hover:border-[#48b685]/50 hover:bg-[#48b685]/10 text-foreground transition-all flex items-center gap-1.5"
            >
              <span className="text-[#48b685] font-bold text-[10px]">#</span>
              <span>skills.yml</span>
            </Link>
            <Link
              href="/admin"
              className="px-2.5 py-1 rounded-md bg-[#48b685]/10 border border-[#48b685]/40 text-[#48b685] font-bold hover:bg-[#48b685]/20 transition-all flex items-center gap-1.5"
            >
              <span className="text-[#48b685] text-[10px]">⚙</span>
              <span>[Admin]</span>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Command Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="h-7 px-2 rounded-md border border-[#48b685]/30 bg-[#48b685]/10 hover:bg-[#48b685]/20 text-muted-foreground hover:text-[#48b685] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer select-none"
              title="Command Palette"
            >
              <Search size={13} className="text-[#48b685]" />
              <span className="hidden md:inline text-[11px]">Search…</span>
              <kbd className="hidden md:inline-flex h-4 items-center justify-center rounded border border-[#48b685]/30 bg-background/90 px-1 text-[9px] font-mono text-[#48b685]">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/Tnembull"
              target="_blank"
              rel="noopener noreferrer"
              className="h-7 px-2 rounded-md border border-line bg-muted/20 hover:border-[#48b685]/30 hover:bg-[#48b685]/10 text-muted-foreground hover:text-foreground text-xs font-mono flex items-center gap-1 transition-all"
              title="GitHub Profile"
            >
              <Github size={13} />
              <span className="text-[10px] font-mono text-[#48b685] font-semibold hidden xs:inline">
                ★ 1.8k
              </span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden h-7 w-7 rounded-md border border-[#48b685]/30 bg-[#48b685]/10 text-[#48b685] flex items-center justify-center cursor-pointer transition-all hover:bg-[#48b685]/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line bg-background/95 backdrop-blur-md p-4 space-y-3 font-mono text-xs animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2 uppercase tracking-wider text-muted-foreground">
              <Link
                href="/#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded hover:bg-[#48b685]/10 hover:text-[#48b685] transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded hover:bg-[#48b685]/10 hover:text-[#48b685] transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded hover:bg-[#48b685]/10 hover:text-[#48b685] transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded hover:bg-[#48b685]/10 hover:text-[#48b685] transition-colors"
              >
                Skills
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded text-[#48b685] font-bold bg-[#48b685]/10 border border-[#48b685]/30 transition-colors"
              >
                [Admin Control Panel]
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Command Palette Modal */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-[#483145] bg-[#2f1e2e] p-4 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#483145] pb-3">
              <div className="flex items-center gap-2 text-[#48b685] text-xs font-mono font-bold">
                <Search size={15} />
                <span className="tracking-widest uppercase">[ SYSTEM_COMMAND_TERMINAL ]</span>
              </div>
              <button
                onClick={() => setCommandOpen(false)}
                className="text-xs font-mono px-2 py-0.5 rounded border border-[#48b685]/30 text-[#48b685] hover:bg-[#48b685]/10 cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <p className="text-[11px] text-[#a392a3] uppercase tracking-wider mb-2 font-bold">
                Pintasan Navigasi
              </p>
              <Link
                href="/#about"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/10 text-foreground transition-all font-semibold"
              >
                01. Biografi & Profil
              </Link>
              <Link
                href="/#experience"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/10 text-foreground transition-all font-semibold"
              >
                02. Pengalaman Kerja
              </Link>
              <Link
                href="/#projects"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/10 text-foreground transition-all font-semibold"
              >
                03. Proyek & Portofolio
              </Link>
              <Link
                href="/#skills"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/10 text-foreground transition-all font-semibold"
              >
                04. Keahlian & Tech Stack
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
