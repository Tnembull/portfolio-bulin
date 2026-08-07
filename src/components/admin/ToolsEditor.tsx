"use client";

import { ToolsData } from "@/context/PortfolioContext";
import { Plus, Trash2 } from "lucide-react";

interface ToolsEditorProps {
  data: ToolsData;
  onChange: (data: ToolsData) => void;
}

export default function ToolsEditor({ data, onChange }: ToolsEditorProps) {
  const handleAdd = () => {
    const newTool = {
      id: `t-${Date.now()}`,
      name: "New Tool",
      category: "Infrastructure Stack",
      logoSrc: "/logo/React-icon.svg",
    };
    onChange({ ...data, items: [...data.items, newTool] });
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
            05 // TECH TOOLBOX & ECOSYSTEM
          </h3>
          <span className="text-muted-foreground">Tools Section</span>
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
              placeholder="e.g. 04 // TECH TOOLBOX"
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
                placeholder="e.g. Technologies &"
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
                placeholder="e.g. DevOps Stack"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold uppercase tracking-wider text-foreground">
              TOOLS LIST ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 bg-foreground text-background font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:opacity-90"
            >
              <Plus size={14} />
              <span>Add Tool</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.items.map((tool, idx) => (
              <div key={tool.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-bold">
                    TOOL #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(tool.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={tool.name}
                    onChange={(e) => handleItemUpdate(idx, "name", e.target.value)}
                    placeholder="Tool Name"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
                  />
                  <input
                    type="text"
                    value={tool.category}
                    onChange={(e) => handleItemUpdate(idx, "category", e.target.value)}
                    placeholder="Category"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-muted-foreground focus:outline-none focus:border-foreground"
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
