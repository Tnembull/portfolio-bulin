"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { lang, setLang } = usePortfolio();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "id" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="h-7 px-2 rounded-md border border-[#48b685]/30 bg-[#48b685]/10 hover:bg-[#48b685]/20 text-[#48b685] text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer font-bold"
      title={`Switch to ${lang === "en" ? "Indonesian (ID)" : "English (EN)"}`}
    >
      <Globe size={13} className="text-[#48b685]" />
      <span className="font-bold tracking-wider">{lang.toUpperCase()}</span>
    </button>
  );
}
