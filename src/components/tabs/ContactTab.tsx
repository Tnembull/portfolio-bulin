"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Copy, Check, ArrowUpRight } from "lucide-react";

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
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
    }, 400);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          Contact & Collaboration
        </h1>
        <p className="text-sm text-secondary">
          Have a project in mind or interested in discussing DevOps, cloud infrastructure, or backend architecture?
        </p>
      </div>

      {/* 1. Direct Channels */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
          Direct Communication Channels
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {/* Email */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-muted uppercase">Email</span>
              <div className="text-sm font-semibold text-foreground mt-0.5">{email}</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="text-xs font-mono text-secondary hover:text-foreground inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
              <a
                href={`mailto:${email}`}
                className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
              >
                <span>Compose</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-muted uppercase">LinkedIn</span>
              <div className="text-sm font-semibold text-foreground mt-0.5">Muhammad Nur Ashiddiqi</div>
            </div>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Connect</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* GitHub */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono text-muted uppercase">GitHub</span>
              <div className="text-sm font-semibold text-foreground mt-0.5">@Tnembull</div>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Repositories</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Direct Message Form */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
          Send a Message
        </h2>

        {submitted ? (
          <div className="p-6 rounded-md bg-surface border border-border text-sm text-foreground space-y-2">
            <div className="font-semibold text-accent">Message Prepared</div>
            <p className="text-xs text-secondary">
              Your email client has been opened. If it did not open automatically, please email me directly at {email}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="text-xs font-mono text-accent hover:underline pt-2 cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-secondary">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-surface border border-border text-foreground px-3.5 py-2.5 rounded-md text-sm outline-none placeholder:text-muted"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-secondary">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full bg-surface border border-border text-foreground px-3.5 py-2.5 rounded-md text-sm outline-none placeholder:text-muted"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-secondary">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Topic / Opportunity / Consultation"
                className="w-full bg-surface border border-border text-foreground px-3.5 py-2.5 rounded-md text-sm outline-none placeholder:text-muted"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-secondary">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Message details..."
                className="w-full bg-surface border border-border text-foreground px-3.5 py-2.5 rounded-md text-sm outline-none placeholder:text-muted resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-accent-text font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
