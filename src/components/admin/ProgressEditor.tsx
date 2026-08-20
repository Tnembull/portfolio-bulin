"use client";

import React from "react";
import { LearningProgress } from "@/lib/supabase";
import {
  TrendingUp,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  BookOpen,
  Calendar,
} from "lucide-react";

interface ProgressEditorProps {
  items: LearningProgress[];
  onChange: (items: LearningProgress[]) => void;
}

export default function ProgressEditor({ items = [], onChange }: ProgressEditorProps) {
  const handleAddItem = () => {
    const newItem: LearningProgress = {
      id: `progress-${Date.now()}`,
      title: "Target Sertifikasi / Skill Baru",
      provider: "Penyelenggara / Provider",
      progress_percent: 50,
      target_date: "Q4 2026",
      status: "in_progress",
      description: "Deskripsi target pembelajaran dan sertifikasi...",
      order_index: items.length + 1,
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleItemFieldChange = (
    index: number,
    field: keyof LearningProgress,
    value: unknown
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    const reordered = updated.map((item, i) => ({ ...item, order_index: i + 1 }));
    onChange(reordered);
  };

  const getStatusBadgeClass = (status: LearningProgress["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "in_progress":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40";
      case "planned":
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/40";
    }
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-[#e7e9db] uppercase tracking-wide text-sm flex items-center gap-2">
              <TrendingUp size={16} className="text-[#48b685]" />
              <span>KELOLA TARGET PEMBELAJARAN & PROGRESS</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Kelola persentase progress, provider sertifikasi, status target, dan tanggal pencapaian.
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#48b685]/90"
          >
            <Plus size={15} />
            <span>+ Tambah Target</span>
          </button>
        </div>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <div
              key={item.id || `progress-${idx}`}
              className="p-5 rounded-xl border border-[#483145] bg-[#19131a] space-y-5 shadow-sm relative group"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#483145] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded text-[10px]">
                    TARGET #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadgeClass(item.status)} uppercase`}>
                    {item.status.replace("_", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveItem(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-[#a392a3] hover:text-[#48b685] disabled:opacity-30 disabled:hover:text-[#a392a3] cursor-pointer"
                    title="Pindahkan Ke Atas"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    onClick={() => handleMoveItem(idx, "down")}
                    disabled={idx === items.length - 1}
                    className="p-1 text-[#a392a3] hover:text-[#48b685] disabled:opacity-30 disabled:hover:text-[#a392a3] cursor-pointer"
                    title="Pindahkan Ke Bawah"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Target"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                    <BookOpen size={12} className="text-[#48b685]" />
                    <span>Judul Certification / Target Skill</span>
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemFieldChange(idx, "title", e.target.value)}
                    placeholder="e.g. Kubernetes & Cloud Native Associate (KCNA)"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] font-bold text-xs outline-none"
                  />
                </div>

                {/* Provider */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Penyelenggara / Provider
                  </label>
                  <input
                    type="text"
                    value={item.provider}
                    onChange={(e) => handleItemFieldChange(idx, "provider", e.target.value)}
                    placeholder="e.g. Linux Foundation / CNCF"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none"
                  />
                </div>

                {/* Target Date */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold flex items-center gap-1">
                    <Calendar size={12} className="text-[#48b685]" />
                    <span>Target Date / Estimasi Selesai</span>
                  </label>
                  <input
                    type="text"
                    value={item.target_date || ""}
                    onChange={(e) => handleItemFieldChange(idx, "target_date", e.target.value)}
                    placeholder="e.g. Q4 2026"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none"
                  />
                </div>

                {/* Status Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Status Progress
                  </label>
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleItemFieldChange(
                        idx,
                        "status",
                        e.target.value as LearningProgress["status"]
                      )
                    }
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold text-xs outline-none cursor-pointer"
                  >
                    <option value="in_progress">In Progress (Sedang Dipelajari)</option>
                    <option value="planned">Planned (Direncanakan)</option>
                    <option value="completed">Completed (Selesai/Lulus)</option>
                  </select>
                </div>

                {/* Progress Percentage Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-[#48b685] uppercase font-bold">
                      Progress Percentage
                    </label>
                    <span className="text-xs font-bold text-[#48b685] bg-[#48b685]/10 px-2 py-0.5 rounded border border-[#48b685]/30">
                      {item.progress_percent}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={item.progress_percent}
                      onChange={(e) =>
                        handleItemFieldChange(idx, "progress_percent", Number(e.target.value))
                      }
                      className="flex-1 accent-[#48b685] cursor-pointer"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.progress_percent}
                      onChange={(e) =>
                        handleItemFieldChange(
                          idx,
                          "progress_percent",
                          Math.min(100, Math.max(0, Number(e.target.value)))
                        )
                      }
                      className="w-16 px-2 py-1 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded text-center text-[#e7e9db] font-bold text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Deskripsi Target & Silabus
                  </label>
                  <textarea
                    rows={2}
                    value={item.description || ""}
                    onChange={(e) => handleItemFieldChange(idx, "description", e.target.value)}
                    placeholder="Mastering cloud-native ecosystem fundamentals..."
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none resize-y"
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
