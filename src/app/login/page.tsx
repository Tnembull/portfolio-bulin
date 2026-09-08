"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!pin.trim()) {
      setError("Master Security PIN wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirection to target admin page
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || "PIN verifikasi tidak valid. Akses ditolak.");
      }
    } catch {
      setError("Gagal terhubung ke server autentikasi.");
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
          <span className="font-mono text-xs text-muted-foreground font-bold tracking-widest uppercase flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#48b685]" />
            MNA // VAULT AUTH
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
            Muhammad Nur Ashiddiqi — DevOps Control Vault
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
              MASTER SECURITY PIN
            </label>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter admin security PIN..."
                required
                autoFocus
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground focus:outline-none focus:border-[#48b685] focus:shadow-[0_0_15px_rgba(72,182,133,0.2)] transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a392a3] hover:text-[#48b685] transition-colors cursor-pointer"
              >
                {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-[#48b685] text-[#19131a] rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider hover:bg-[#48b685]/90 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-lg"
          >
            {loading ? "Verifying Credentials..." : "Authorize Admin Session"}
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
