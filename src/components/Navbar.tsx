"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 w-full bg-[#0b0e12] border-b border-[#303235] text-[#bababb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex h-14 items-center justify-between gap-4">
          {/* Logo Mark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-mono text-xs font-normal tracking-[0.053em] hover:text-[#dedede] transition-colors shrink-0"
            aria-label="Home"
          >
            <span className="text-[#00d892] font-semibold text-sm">mna</span>
            <span className="text-[#303235]">/</span>
            <span className="text-[#818284] text-[11px] uppercase tracking-[0.064em]">
              cloud_sys
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-[12px] font-mono tracking-[0.053em] uppercase">
            <Link
              href="/#overview"
              className="text-[#bababb] hover:text-[#dedede] transition-colors py-1"
            >
              OVERVIEW
            </Link>
            <Link
              href="/#projects"
              className="text-[#bababb] hover:text-[#dedede] transition-colors py-1"
            >
              SYSTEMS
            </Link>
            <Link
              href="/#skills"
              className="text-[#bababb] hover:text-[#dedede] transition-colors py-1"
            >
              CAPABILITIES
            </Link>
            <Link
              href="/#progress"
              className="text-[#bababb] hover:text-[#dedede] transition-colors py-1"
            >
              ROADMAP
            </Link>
            <Link
              href="/#contact"
              className="text-[#bababb] hover:text-[#dedede] transition-colors py-1"
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Command Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="h-7 px-2.5 rounded-[1px] border border-[#303235] bg-[#181a1d] hover:border-[#bababb] hover:text-[#dedede] text-[#818284] text-[11px] font-mono tracking-[0.053em] flex items-center gap-2 transition-all cursor-pointer"
              title="CLI Command Palette"
            >
              <span className="hidden sm:inline">CLI SEARCH</span>
              <kbd className="hidden sm:inline-flex h-4 items-center justify-center rounded-[1px] border border-[#303235] bg-[#0b0e12] px-1 text-[9px] font-mono text-[#00d892]">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/Tnembull"
              target="_blank"
              rel="noopener noreferrer"
              className="h-7 w-7 rounded-[1px] border border-[#303235] bg-[#181a1d] text-[#bababb] hover:text-[#dedede] hover:border-[#bababb] flex items-center justify-center transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={14} />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden h-7 w-7 rounded-[1px] border border-[#303235] bg-[#181a1d] text-[#bababb] flex items-center justify-center cursor-pointer transition-all hover:border-[#bababb]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#303235] bg-[#0b0e12] p-4 font-mono text-xs tracking-[0.053em]">
            <nav className="flex flex-col space-y-3 uppercase text-[#bababb]">
              <Link
                href="/#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#dedede] transition-colors"
              >
                OVERVIEW
              </Link>
              <Link
                href="/#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#dedede] transition-colors"
              >
                SYSTEMS
              </Link>
              <Link
                href="/#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#dedede] transition-colors"
              >
                CAPABILITIES
              </Link>
              <Link
                href="/#progress"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#dedede] transition-colors"
              >
                ROADMAP
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#dedede] transition-colors"
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Command Palette Modal */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0b0e12]/90 flex items-start justify-center pt-24 px-4"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-[1px] border border-[#303235] bg-[#181a1d] p-4 space-y-4 shadow-none font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#303235] pb-3">
              <div className="text-[#00d892] text-xs tracking-[0.058em] uppercase">
                [ SYSTEM_CLI_INDEX ]
              </div>
              <button
                onClick={() => setCommandOpen(false)}
                className="text-[11px] tracking-[0.053em] px-2 py-0.5 rounded-[1px] border border-[#303235] text-[#818284] hover:text-[#dedede] hover:border-[#bababb] cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="space-y-1 text-xs text-[#bababb]">
              <p className="text-[10px] text-[#818284] uppercase tracking-[0.064em] mb-2">
                SYSTEM NAV DIRECTORY
              </p>
              <Link
                href="/#overview"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded-[1px] border border-[#303235] bg-[#1f2124] hover:border-[#00d892] hover:text-[#dedede] transition-all"
              >
                BIOGRAPHY & OVERVIEW
              </Link>
              <Link
                href="/#projects"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded-[1px] border border-[#303235] bg-[#1f2124] hover:border-[#00d892] hover:text-[#dedede] transition-all"
              >
                INFRASTRUCTURE & SYSTEMS
              </Link>
              <Link
                href="/#skills"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded-[1px] border border-[#303235] bg-[#1f2124] hover:border-[#00d892] hover:text-[#dedede] transition-all"
              >
                TECHNICAL CAPABILITIES & CERTS
              </Link>
              <Link
                href="/#progress"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded-[1px] border border-[#303235] bg-[#1f2124] hover:border-[#00d892] hover:text-[#dedede] transition-all"
              >
                CERTIFICATION ROADMAP
              </Link>
              <Link
                href="/#contact"
                onClick={() => setCommandOpen(false)}
                className="block p-2 rounded-[1px] border border-[#303235] bg-[#1f2124] hover:border-[#00d892] hover:text-[#dedede] transition-all"
              >
                TERMINAL & INITIATE CONTACT
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
