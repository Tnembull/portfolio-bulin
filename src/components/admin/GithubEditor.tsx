"use client";

import { GithubData } from "@/context/PortfolioContext";

interface GithubEditorProps {
  data: GithubData;
  onChange: (data: GithubData) => void;
}

export default function GithubEditor({ data, onChange }: GithubEditorProps) {
  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-bold text-foreground uppercase tracking-wide">
            10 // GITHUB ACTIVITY & REPOSITORIES
          </h3>
          <span className="text-muted-foreground">GitHub State</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-muted-foreground font-semibold block">
              SECTION BADGE
            </label>
            <input
              type="text"
              value={data.sectionBadge || ""}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                GITHUB USERNAME
              </label>
              <input
                type="text"
                value={data.username || ""}
                onChange={(e) => onChange({ ...data, username: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                PROFILE URL
              </label>
              <input
                type="text"
                value={data.profileUrl || ""}
                onChange={(e) => onChange({ ...data, profileUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
