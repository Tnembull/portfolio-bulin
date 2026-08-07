"use client";

import { TestimonialsData } from "@/context/PortfolioContext";
import { Plus, Trash2 } from "lucide-react";

interface TestimonialsEditorProps {
  data: TestimonialsData;
  onChange: (data: TestimonialsData) => void;
}

export default function TestimonialsEditor({ data, onChange }: TestimonialsEditorProps) {
  const handleAdd = () => {
    const newItem = {
      id: `tm-${Date.now()}`,
      num: `0${data.items.length + 1}`,
      content: "Great working with Muhammad. Exceptional DevOps skills and cluster resilience.",
      author: "Tech Leader",
      role: "VP of Engineering",
      company: "Cloud Scale",
    };
    onChange({ ...data, items: [...data.items, newItem] });
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
            13 // ENDORSEMENTS & RECOMMENDATIONS
          </h3>
          <span className="text-muted-foreground">Testimonials State</span>
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
              placeholder="e.g. 09 // RECOMMENDATIONS"
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
                placeholder="e.g. Client & Peer"
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
                placeholder="e.g. Endorsements"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold uppercase tracking-wider text-foreground">
              RECOMMENDATIONS ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 bg-foreground text-background font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:opacity-90"
            >
              <Plus size={14} />
              <span>Add Endorsement</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.items.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-bold">
                    ENDORSEMENT #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={item.content}
                    onChange={(e) => handleItemUpdate(idx, "content", e.target.value)}
                    placeholder="Quote Content"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground focus:outline-none focus:border-foreground leading-relaxed"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={item.author}
                      onChange={(e) => handleItemUpdate(idx, "author", e.target.value)}
                      placeholder="Author Name"
                      className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
                    />
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleItemUpdate(idx, "role", e.target.value)}
                      placeholder="Role Title"
                      className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleItemUpdate(idx, "company", e.target.value)}
                      placeholder="Company"
                      className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-muted-foreground focus:outline-none focus:border-foreground"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
