"use client";

import { ProcessData } from "@/context/PortfolioContext";
import { Plus, Trash2 } from "lucide-react";

interface ProcessEditorProps {
  data: ProcessData;
  onChange: (data: ProcessData) => void;
}

export default function ProcessEditor({ data, onChange }: ProcessEditorProps) {
  const handleAdd = () => {
    const numStr = data.items.length < 9 ? `0${data.items.length + 1}` : `${data.items.length + 1}`;
    const newStep = {
      id: `proc-${Date.now()}`,
      num: numStr,
      phase: `PHASE ${numStr}`,
      title: "New Phase",
      desc: "Execution phase description.",
    };
    onChange({ ...data, items: [...data.items, newStep] });
  };

  const handleRemove = (id: string) => {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  };

  const handleItemUpdate = (index: number, key: string, val: string) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-bold text-foreground uppercase tracking-wide">
            06 // PIPELINE PHASES
          </h3>
          <span className="text-muted-foreground">Process State</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-muted-foreground font-semibold block">
              SECTION BADGE
            </label>
            <input
              type="text"
              value={data.sectionBadge}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                MAIN TITLE
              </label>
              <input
                type="text"
                value={data.titleMain}
                onChange={(e) => onChange({ ...data, titleMain: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-muted-foreground font-semibold block">
                HIGHLIGHT TITLE
              </label>
              <input
                type="text"
                value={data.titleHighlight}
                onChange={(e) => onChange({ ...data, titleHighlight: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold uppercase tracking-wider text-foreground">
              EXECUTION PHASES ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 bg-foreground text-background font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:opacity-90"
            >
              <Plus size={14} />
              <span>Add Phase</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.items.map((step, idx) => (
              <div key={step.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-bold">
                    PHASE #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(step.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={step.phase}
                      onChange={(e) => handleItemUpdate(idx, "phase", e.target.value)}
                      placeholder="PHASE 01"
                      className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
                    />
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleItemUpdate(idx, "title", e.target.value)}
                      placeholder="Phase Title"
                      className="md:col-span-2 w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={step.desc}
                    onChange={(e) => handleItemUpdate(idx, "desc", e.target.value)}
                    placeholder="Phase Description"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-muted-foreground focus:outline-none focus:border-foreground leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
