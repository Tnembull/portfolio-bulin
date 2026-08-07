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
      <main className="w-full max-w-md mx-auto my-auto p-6 sm:p-8 rounded-xl border border-border bg-card shadow-2xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="size-10 rounded-full border border-border bg-muted flex items-center justify-center mx-auto text-foreground">
            <Lock size={18} />
          </div>
          <h1 className="text-2xl font-bold font-sans tracking-tight text-foreground uppercase">
            Admin Authentication
          </h1>
          <p className="text-xs font-mono text-muted-foreground">
            Muhammad Nur Ashiddiqi — DevOps Portfolio Control
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-muted-foreground block font-semibold">
              ADMIN EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ashiddiqi.devops@gmail.com"
              required
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground block font-semibold">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-3.5 pr-10 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-foreground text-background rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-md"
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
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
