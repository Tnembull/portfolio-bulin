"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Github, Menu, X, Search, Copy, Check, Terminal, ExternalLink, ArrowRight, Sun, Moon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface CommandItem {
  id: string;
  label: string;
  category: "NAVIGATION" | "ACTIONS" | "EXTERNAL";
  href?: string;
  action?: () => void;
  shortcut?: string;
}

export default function Navbar() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll spy for active section highlight
  useEffect(() => {
    const sectionIds = ["overview", "projects", "skills", "progress", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        setSearchQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setCommandOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("muhammadnurashiddiqi@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const commandItems: CommandItem[] = useMemo(
    () => [
      { id: "nav-overview", label: "Overview & Biography", category: "NAVIGATION", href: "/#overview" },
      { id: "nav-systems", label: "Infrastructure & Systems (Projects)", category: "NAVIGATION", href: "/#projects" },
      { id: "nav-capabilities", label: "Technical Capabilities & Certs", category: "NAVIGATION", href: "/#skills" },
      { id: "nav-roadmap", label: "Certification & Study Roadmap", category: "NAVIGATION", href: "/#progress" },
      { id: "nav-contact", label: "Pipeline & Initiate Contact", category: "NAVIGATION", href: "/#contact" },
      { id: "nav-all-projects", label: "Full Project Catalog (/projects)", category: "NAVIGATION", href: "/projects" },
      { id: "act-copy-email", label: copiedEmail ? "Copied Email to Clipboard!" : "Copy Email: muhammadnurashiddiqi@gmail.com", category: "ACTIONS", action: handleCopyEmail },
      { id: "ext-github", label: "GitHub Profile (Tnembull)", category: "EXTERNAL", href: "https://github.com/Tnembull" },
      { id: "ext-linkedin", label: "LinkedIn Profile", category: "EXTERNAL", href: "https://www.linkedin.com/in/muhammadnurashiddiqi" },
    ],
    [copiedEmail]
  );

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return commandItems;
    const query = searchQuery.toLowerCase();
    return commandItems.filter(
      (item) => item.label.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    );
  }, [commandItems, searchQuery]);

  // Handle arrow navigation in command palette
  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        if (current.action) {
          current.action();
        } else if (current.href) {
          window.location.href = current.href;
          setCommandOpen(false);
        }
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0b0e12]/95 backdrop-blur-md border-b border-[#303235] text-[#bababb] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex h-14 items-center justify-between gap-4">
          {/* Logo Mark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-mono text-xs font-normal tracking-[0.053em] hover:text-[#dedede] transition-colors shrink-0 group"
            aria-label="Home"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d892] status-dot-pulse" />
            <span className="text-[#00d892] font-semibold text-sm group-hover:text-[#38efb0] transition-colors">mna</span>
            <span className="text-[#303235]">/</span>
            <span className="text-[#818284] text-[11px] uppercase tracking-[0.064em]">
              cloud_sys
            </span>
          </Link>

          {/* Desktop Nav links with scroll spy indicator */}
          <nav className="hidden md:flex items-center gap-7 text-[12px] font-mono tracking-[0.053em] uppercase">
            {[
              { id: "overview", label: "OVERVIEW", href: "/#overview" },
              { id: "projects", label: "SYSTEMS", href: "/#projects" },
              { id: "skills", label: "CAPABILITIES", href: "/#skills" },
              { id: "progress", label: "ROADMAP", href: "/#progress" },
              { id: "contact", label: "CONTACT", href: "/#contact" },
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors font-mono ${
                    isActive ? "text-[#00d892] font-medium" : "text-[#bababb] hover:text-[#dedede]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d892] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Command Trigger */}
            <button
              onClick={() => {
                setCommandOpen(true);
                setSearchQuery("");
                setSelectedIndex(0);
              }}
              className="h-7 px-2.5 rounded-[1px] border border-[#303235] bg-[#181a1d] hover:border-[#00d892] hover:text-[#dedede] text-[#818284] text-[11px] font-mono tracking-[0.053em] flex items-center gap-2 transition-all cursor-pointer group"
              title="CLI Command Palette (⌘K)"
            >
              <Terminal size={12} className="text-[#00d892] group-hover:rotate-12 transition-transform" />
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
              className="h-7 w-7 rounded-[1px] border border-[#303235] bg-[#181a1d] text-[#bababb] hover:text-[#00d892] hover:border-[#00d892] flex items-center justify-center transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={14} />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden h-7 w-7 rounded-[1px] border border-[#303235] bg-[#181a1d] text-[#bababb] flex items-center justify-center cursor-pointer transition-all hover:border-[#00d892]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#303235] bg-[#0b0e12]/98 backdrop-blur-md p-4 font-mono text-xs tracking-[0.053em]">
            <nav className="flex flex-col space-y-3 uppercase text-[#bababb]">
              {[
                { id: "overview", label: "OVERVIEW", href: "/#overview" },
                { id: "projects", label: "SYSTEMS", href: "/#projects" },
                { id: "skills", label: "CAPABILITIES", href: "/#skills" },
                { id: "progress", label: "ROADMAP", href: "/#progress" },
                { id: "contact", label: "CONTACT", href: "/#contact" },
              ].map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 transition-colors flex items-center justify-between ${
                    activeSection === link.id ? "text-[#00d892]" : "hover:text-[#dedede]"
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="text-[10px] text-[#00d892]">• ACTIVE</span>}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Interactive Command Palette Modal */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0b0e12]/85 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-4"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-[1px] border border-[#303235] bg-[#14171b] p-4 space-y-3 shadow-2xl font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleCommandKeyDown}
          >
            {/* Header & Search Bar */}
            <div className="flex items-center gap-2 border-b border-[#303235] pb-3">
              <Search size={15} className="text-[#00d892] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent border-none text-[#dedede] placeholder-[#818284] text-xs font-mono focus:outline-none focus:ring-0"
              />
              <button
                onClick={() => setCommandOpen(false)}
                className="text-[10px] tracking-[0.053em] px-2 py-0.5 rounded-[1px] border border-[#303235] text-[#818284] hover:text-[#dedede] hover:border-[#bababb] cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Filtered Command List */}
            <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-[#818284] font-mono text-xs">
                  No matching commands found for &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredCommands.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.category === "EXTERNAL" ? "_blank" : undefined}
                      rel={item.category === "EXTERNAL" ? "noopener noreferrer" : undefined}
                      onClick={() => setCommandOpen(false)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-[1px] border transition-all ${
                        isSelected
                          ? "bg-[#002923] border-[#00d892] text-[#dedede]"
                          : "bg-[#181a1d] border-[#303235] text-[#bababb] hover:border-[#4a4d52]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#00d892] font-mono uppercase">[{item.category}]</span>
                        <span>{item.label}</span>
                      </div>
                      {item.category === "EXTERNAL" ? (
                        <ExternalLink size={12} className="text-[#818284]" />
                      ) : (
                        <ArrowRight size={12} className={isSelected ? "text-[#00d892]" : "text-[#818284]"} />
                      )}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => item.action?.()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left flex items-center justify-between p-2.5 rounded-[1px] border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#002923] border-[#00d892] text-[#dedede]"
                          : "bg-[#181a1d] border-[#303235] text-[#bababb] hover:border-[#4a4d52]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#00d892] font-mono uppercase">[{item.category}]</span>
                        <span>{item.label}</span>
                      </div>
                      {copiedEmail ? (
                        <Check size={13} className="text-[#00d892]" />
                      ) : (
                        <Copy size={13} className="text-[#818284]" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer status tip */}
            <div className="border-t border-[#303235] pt-2 flex items-center justify-between text-[10px] text-[#818284]">
              <span>Use ↑ ↓ to navigate, Enter to select</span>
              <span className="text-[#00d892]">CLI STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
