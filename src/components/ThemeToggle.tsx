"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle mode"
        className="size-7 rounded-md flex items-center justify-center text-muted-foreground border border-line bg-muted/20 hover:bg-muted/50 hover:text-foreground transition-all"
      >
        <Moon size={14} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="size-7 rounded-md flex items-center justify-center text-muted-foreground border border-line bg-muted/20 hover:bg-muted/50 hover:text-foreground transition-all cursor-pointer"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
