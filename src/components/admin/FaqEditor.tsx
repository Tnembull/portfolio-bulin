"use client";

import { FaqData } from "@/context/PortfolioContext";
import { Plus, Trash2 } from "lucide-react";

interface FaqEditorProps {
  data: FaqData;
  onChange: (data: FaqData) => void;
}

export default function FaqEditor({ data, onChange }: FaqEditorProps) {
  const handleAdd = () => {
    const newItem = {
      id: `faq-${Date.now()}`,
      question: "Question text?",
      answer: "Answer explanation details.",
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const handleRemove = (id: string) => {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  };

  const handleItemUpdate = (index: number, key: "question" | "answer", val: string) => {
    const updated = [...data.items];
    updated[index] = { ...updated[index], [key]: val };
    onChange({ ...data, items: updated });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="font-bold text-foreground uppercase tracking-wide">
            11 // FREQUENTLY ASKED QUESTIONS
          </h3>
          <span className="text-muted-foreground">FAQ State</span>
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
              FAQ ITEMS ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 bg-foreground text-background font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:opacity-90"
            >
              <Plus size={14} />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.items.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-bold">
                    FAQ #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleItemUpdate(idx, "question", e.target.value)}
                    placeholder="Question?"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-foreground font-bold focus:outline-none focus:border-foreground"
                  />
                  <textarea
                    rows={2}
                    value={item.answer}
                    onChange={(e) => handleItemUpdate(idx, "answer", e.target.value)}
                    placeholder="Answer details"
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
