"use client";

import { StatItem } from "@/context/PortfolioContext";
import { Plus, Trash2 } from "lucide-react";

interface StatsEditorProps {
  items: StatItem[];
  onChange: (items: StatItem[]) => void;
}

export default function StatsEditor({ items, onChange }: StatsEditorProps) {
  const handleAdd = () => {
    const newItem: StatItem = {
      id: `st-${Date.now()}`,
      label: "Metric Label",
      value: 10,
      suffix: "+",
    };
    onChange([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleItemUpdate = (index: number, key: string, val: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-bold text-foreground uppercase tracking-wide">
            09 // METRICS & STATS COUNTER
          </h3>
          <button
            onClick={handleAdd}
            className="px-3 py-1.5 bg-foreground text-background font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:opacity-90"
          >
            <Plus size={14} />
            <span>Add Counter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((stat, idx) => (
            <div key={stat.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-bold">
                  COUNTER #{idx + 1}
                </span>
                <button
                  onClick={() => handleRemove(stat.id)}
                  className="text-red-500 hover:text-red-600 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleItemUpdate(idx, "label", e.target.value)}
                  placeholder="Metric Label"
                  className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) => handleItemUpdate(idx, "value", Number(e.target.value))}
                    placeholder="Value"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
                  />
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => handleItemUpdate(idx, "suffix", e.target.value)}
                    placeholder="Suffix (+, %)"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
