"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Terminal, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setTimeStr(`${formatted} WIB (UTC+7)`);
      } catch {
        setTimeStr("UTC+7");
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full bg-[#0b0e12] py-10 text-[#818284] font-mono text-xs border-t border-[#303235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Status Readout */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-[#00d892]">
            <span className="w-2 h-2 rounded-full bg-[#00d892] status-dot-pulse" />
            <span className="font-medium tracking-[0.064em]">ALL SYSTEMS OPERATIONAL</span>
          </span>
          <span className="text-[#303235]">•</span>
          <span className="text-[#bababb]">
            Muhammad Nur Ashiddiqi // DevOps Architecture
          </span>
          {timeStr && (
            <>
              <span className="text-[#303235] hidden sm:inline">•</span>
              <span className="text-[#818284] hidden sm:inline">LOCAL: {timeStr}</span>
            </>
          )}
        </div>

        {/* Right Navigation & Scroll to top */}
        <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.053em]">
          <Link href="/#overview" className="hover:text-[#00d892] transition-colors">
            OVERVIEW
          </Link>
          <Link href="/#projects" className="hover:text-[#00d892] transition-colors">
            SYSTEMS
          </Link>
          <Link href="/#skills" className="hover:text-[#00d892] transition-colors">
            CAPABILITIES
          </Link>
          <Link href="/#progress" className="hover:text-[#00d892] transition-colors">
            ROADMAP
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#00d892] cursor-pointer inline-flex items-center gap-1 px-2 py-1 rounded-[1px] border border-[#303235] hover:border-[#00d892] bg-[#14171b] transition-all"
            title="Scroll To Top"
          >
            <span>TOP</span>
            <ArrowUp size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}
