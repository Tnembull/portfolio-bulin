"use client";

import { MusicData } from "@/context/PortfolioContext";

interface MusicEditorProps {
  data: MusicData;
  onChange: (data: MusicData) => void;
}

export default function MusicEditor({ data, onChange }: MusicEditorProps) {
  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-bold text-foreground uppercase tracking-wide">
            08 // MUSIC PLAYER
          </h3>
          <span className="text-muted-foreground">Music State</span>
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
                TRACK TITLE
              </label>
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                ARTIST NAME
              </label>
              <input
                type="text"
                value={data.artist || ""}
                onChange={(e) => onChange({ ...data, artist: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-muted-foreground font-semibold block">
              AUDIO URL PATH
            </label>
            <input
              type="text"
              value={data.audioUrl || ""}
              onChange={(e) => onChange({ ...data, audioUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
