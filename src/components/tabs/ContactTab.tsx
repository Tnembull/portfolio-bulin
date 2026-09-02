"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import PipelineWidget from "@/components/PipelineWidget";
import {
  Send,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Terminal,
  Clock,
  MapPin,
  Share2,
} from "lucide-react";

export default function ContactTab() {
  const { state } = usePortfolio();
  const { cta, hero } = state;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const email = cta?.email || hero?.email || "muhammadnurashiddiqi@gmail.com";
  const linkedinUrl = cta?.linkedinUrl || "https://www.linkedin.com/in/muhammadnurashiddiqi";
  const githubUrl = cta?.githubUrl || "https://github.com/Tnembull";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulating quick dispatch / mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
    }, 600);
  };

  return (
    <div className="space-y-8 pb-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-1.5">
            <Send size={13} />
            <span>START A CONVERSATION</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
            Let&apos;s Build Something Great
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Average response: &lt; 24h</span>
        </div>
      </div>

      {/* 2. Direct Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Email Card */}
        <div className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-all shadow-sm">
          <div className="flex items-start justify-between">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Mail size={18} />
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Email Address</span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 truncate mt-0.5">{email}</h3>
          </div>

          <a
            href={`mailto:${email}`}
            className="flex items-center justify-between text-xs text-emerald-400 font-semibold pt-1 border-t border-white/[0.06]"
          >
            <span>Compose Email</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* LinkedIn Card */}
        <div className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between space-y-4 hover:border-sky-500/30 transition-all shadow-sm">
          <div className="flex items-start justify-between">
            <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Linkedin size={18} />
            </div>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
              Professional
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">LinkedIn</span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 truncate mt-0.5">Muhammad Nur Ashiddiqi</h3>
          </div>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-sky-400 font-semibold pt-1 border-t border-white/[0.06]"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* GitHub Card */}
        <div className="p-5 rounded-2xl bg-[#121722] border border-white/[0.06] flex flex-col justify-between space-y-4 hover:border-purple-500/30 transition-all shadow-sm">
          <div className="flex items-start justify-between">
            <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Github size={18} />
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              Source Code
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">GitHub</span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 truncate mt-0.5">@Tnembull</h3>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-xs text-purple-400 font-semibold pt-1 border-t border-white/[0.06]"
          >
            <span>View Repositories</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* 3. Direct Message Form */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#121722] border border-white/[0.06] space-y-5 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-100">
            Send a Direct Message
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fill out the form below to initiate an instant email conversation.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="size-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-100">Message Dispatched!</h3>
            <p className="text-xs text-slate-300">
              Your email client has been prepared. I will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="text-xs font-mono text-emerald-400 hover:underline pt-2 cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-[#0c0f16] border border-white/10 focus:border-emerald-500 text-slate-100 px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 font-medium">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-[#0c0f16] border border-white/10 focus:border-emerald-500 text-slate-100 px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 font-medium">Subject / Topic</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="DevOps Consultation / Job Opportunity / Project Collab"
                className="w-full bg-[#0c0f16] border border-white/10 focus:border-emerald-500 text-slate-100 px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 font-medium">Your Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, timeline, or technical requirements..."
                className="w-full bg-[#0c0f16] border border-white/10 focus:border-emerald-500 text-slate-100 px-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-slate-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0b0e14] font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_15px_rgba(0,216,146,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Send size={15} />
              <span>{isSubmitting ? "Preparing Dispatch..." : "Send Message"}</span>
            </button>
          </form>
        )}
      </section>

      {/* 4. Interactive CI/CD Telemetry Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-slate-100">
            Automated CI/CD Delivery Pipeline
          </h2>
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-[#121722]">
          <PipelineWidget />
        </div>
      </section>
    </div>
  );
}
