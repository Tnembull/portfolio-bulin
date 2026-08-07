"use client";

import { CtaData } from "@/context/PortfolioContext";

interface CtaEditorProps {
  data: CtaData;
  onChange: (data: CtaData) => void;
}

export default function CtaEditor({ data, onChange }: CtaEditorProps) {
  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-bold text-foreground uppercase tracking-wide">
            14 // CONTACT & CTA SECTION
          </h3>
          <span className="text-muted-foreground">CTA State</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-muted-foreground font-semibold block">
              SECTION TITLE
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Get In Touch"
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground font-semibold block">
              DESCRIPTION PARAGRAPH
            </label>
            <textarea
              rows={3}
              value={data.description || ""}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="Interested in collaborating or have a question..."
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                EMAIL ADDRESS
              </label>
              <input
                type="text"
                value={data.email || ""}
                onChange={(e) => onChange({ ...data, email: e.target.value })}
                placeholder="ashiddiqi.devops@gmail.com"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                LINKEDIN URL
              </label>
              <input
                type="text"
                value={data.linkedinUrl || ""}
                onChange={(e) => onChange({ ...data, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/ashiddiqi"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                GITHUB URL
              </label>
              <input
                type="text"
                value={data.githubUrl || ""}
                onChange={(e) => onChange({ ...data, githubUrl: e.target.value })}
                placeholder="https://github.com/ashiddiqi"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
