"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      window.location.href = "/admin";
    } catch {
      setError("Email atau password tidak sesuai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Top Header */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-2 border-b border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Site</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground font-bold tracking-widest uppercase">
            MNA // ADMIN
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md mx-auto my-auto p-6 sm:p-8 rounded-xl border border-line bg-[#2f1e2e] shadow-2xl space-y-6 cyber-card">
        <div className="space-y-2 text-center">
          <div className="size-12 rounded-xl border border-[#48b685]/40 bg-[#48b685]/15 flex items-center justify-center mx-auto text-[#48b685] shadow-[0_0_20px_rgba(72,182,133,0.2)]">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-foreground uppercase pt-1">
            Admin Authentication
          </h1>
          <p className="text-xs font-mono text-[#a392a3]">
            Muhammad Nur Ashiddiqi — DevOps Portfolio Control
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[#48b685] block font-semibold text-[11px] tracking-wider">
              ADMIN EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ashiddiqi.devops@gmail.com"
              required
              className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground placeholder:text-[#a392a3] focus:outline-none focus:border-[#48b685] focus:shadow-[0_0_15px_rgba(72,182,133,0.2)] transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#48b685] block font-semibold text-[11px] tracking-wider">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground placeholder:text-[#a392a3] focus:outline-none focus:border-[#48b685] focus:shadow-[0_0_15px_rgba(72,182,133,0.2)] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a392a3] hover:text-[#48b685] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-[#48b685] text-[#19131a] rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider hover:bg-[#48b685]/90 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-lg"
          >
            {loading ? "Authenticating System..." : "Sign In to Admin Terminal"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center font-mono text-[11px] text-muted-foreground py-4">
        © Muhammad Nur Ashiddiqi — DevOps Engineer
      </footer>
    </div>
  );
}
