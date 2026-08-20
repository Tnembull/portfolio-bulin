"use client";

import React, { useState } from "react";
import { PipelineStage } from "@/lib/supabase";
import {
  GitBranch,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Terminal,
} from "lucide-react";

interface PipelineEditorProps {
  stages: PipelineStage[];
  onChange: (stages: PipelineStage[]) => void;
}

export default function PipelineEditor({ stages = [], onChange }: PipelineEditorProps) {
  const [newLogInputs, setNewLogInputs] = useState<{ [key: string]: string }>({});

  const handleAddStage = () => {
    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      title: "Tahap Pipeline Baru",
      description: "Deskripsi tahap otomatisasi pipeline...",
      status: "idle",
      icon_name: "code",
      order_index: stages.length + 1,
      logs: [
        `[INFO] Initializing step ${stages.length + 1}...`,
        "[SUCCESS] Step created successfully.",
      ],
    };
    onChange([...stages, newStage]);
  };

  const handleRemoveStage = (id: string) => {
    onChange(stages.filter((s) => s.id !== id));
  };

  const handleStageFieldChange = (
    index: number,
    field: keyof PipelineStage,
    value: unknown
  ) => {
    const updated = [...stages];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleMoveStage = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= stages.length) return;
    const updated = [...stages];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    // Update order_index
    const reordered = updated.map((stg, i) => ({ ...stg, order_index: i + 1 }));
    onChange(reordered);
  };

  const handleAddLogLine = (stageIndex: number, stageId: string) => {
    const text = newLogInputs[stageId]?.trim();
    if (!text) return;

    const updated = [...stages];
    const currentLogs = updated[stageIndex].logs || [];
    updated[stageIndex] = {
      ...updated[stageIndex],
      logs: [...currentLogs, text],
    };
    onChange(updated);
    setNewLogInputs({ ...newLogInputs, [stageId]: "" });
  };

  const handleEditLogLine = (stageIndex: number, logIndex: number, value: string) => {
    const updated = [...stages];
    const logs = [...(updated[stageIndex].logs || [])];
    logs[logIndex] = value;
    updated[stageIndex] = { ...updated[stageIndex], logs };
    onChange(updated);
  };

  const handleRemoveLogLine = (stageIndex: number, logIndex: number) => {
    const updated = [...stages];
    const logs = (updated[stageIndex].logs || []).filter((_, i) => i !== logIndex);
    updated[stageIndex] = { ...updated[stageIndex], logs };
    onChange(updated);
  };

  const getStatusBadgeClass = (status: PipelineStage["status"]) => {
    switch (status) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
      case "running":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 animate-pulse";
      case "failed":
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
      case "idle":
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/40";
    }
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div>
            <h3 className="font-extrabold text-[#e7e9db] uppercase tracking-wide text-sm flex items-center gap-2">
              <GitBranch size={16} className="text-[#48b685]" />
              <span>KELOLA DEVOPS PIPELINE STAGES</span>
            </h3>
            <p className="text-[#a392a3] text-[11px] mt-0.5">
              Edit tahapan CI/CD pipeline, status eksekusi, re-order urutan, dan log output terminal.
            </p>
          </div>
          <button
            onClick={handleAddStage}
            className="px-3.5 py-2 bg-[#48b685] text-[#19131a] font-extrabold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-[#48b685]/90"
          >
            <Plus size={15} />
            <span>+ Tambah Stage</span>
          </button>
        </div>

        <div className="space-y-6">
          {stages.map((stage, idx) => (
            <div
              key={stage.id || `stage-${idx}`}
              className="p-5 rounded-xl border border-[#483145] bg-[#19131a] space-y-5 shadow-sm relative group"
            >
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#483145] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded text-[10px]">
                    STAGE #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadgeClass(stage.status)} uppercase`}>
                    {stage.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveStage(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 text-[#a392a3] hover:text-[#48b685] disabled:opacity-30 disabled:hover:text-[#a392a3] cursor-pointer"
                    title="Pindahkan Ke Atas"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    onClick={() => handleMoveStage(idx, "down")}
                    disabled={idx === stages.length - 1}
                    className="p-1 text-[#a392a3] hover:text-[#48b685] disabled:opacity-30 disabled:hover:text-[#a392a3] cursor-pointer"
                    title="Pindahkan Ke Bawah"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    onClick={() => handleRemoveStage(stage.id)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Hapus Stage"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Title */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Judul Stage
                  </label>
                  <input
                    type="text"
                    value={stage.title}
                    onChange={(e) => handleStageFieldChange(idx, "title", e.target.value)}
                    placeholder="e.g. Code & Static Analysis"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] font-bold text-xs outline-none"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Status Eksekusi
                  </label>
                  <select
                    value={stage.status}
                    onChange={(e) =>
                      handleStageFieldChange(
                        idx,
                        "status",
                        e.target.value as PipelineStage["status"]
                      )
                    }
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#48b685] font-bold text-xs outline-none cursor-pointer"
                  >
                    <option value="success">Success (Selesai)</option>
                    <option value="running">Running (Berjalan)</option>
                    <option value="idle">Idle (Menunggu)</option>
                    <option value="failed">Failed (Gagal)</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Deskripsi Singkat Stage
                  </label>
                  <input
                    type="text"
                    value={stage.description || ""}
                    onChange={(e) => handleStageFieldChange(idx, "description", e.target.value)}
                    placeholder="e.g. Automated git commit validation & ESLint audit"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none"
                  />
                </div>

                {/* Icon Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#a392a3] uppercase font-bold">
                    Icon Identitas
                  </label>
                  <select
                    value={stage.icon_name || "code"}
                    onChange={(e) => handleStageFieldChange(idx, "icon_name", e.target.value)}
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs outline-none cursor-pointer"
                  >
                    <option value="code">Code / Static Analysis</option>
                    <option value="build">Build / Docker</option>
                    <option value="test">Test / Suite</option>
                    <option value="deploy">Deploy / Kubernetes</option>
                  </select>
                </div>
              </div>

              {/* Logs Section */}
              <div className="space-y-3 pt-2 border-t border-[#483145]">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-[#48b685] uppercase font-bold flex items-center gap-1.5">
                    <Terminal size={13} />
                    <span>LOG OUTPUT TERMINAL ({stage.logs?.length || 0} BARIS)</span>
                  </label>
                </div>

                {/* Log Lines List */}
                <div className="space-y-2 bg-[#0d090d] border border-[#483145] p-3 rounded-lg max-h-56 overflow-y-auto">
                  {stage.logs && stage.logs.length > 0 ? (
                    stage.logs.map((logLine, logIdx) => (
                      <div key={logIdx} className="flex items-center gap-2 group/log">
                        <span className="text-[#a392a3]/60 text-[10px] select-none min-w-[24px] text-right font-mono">
                          {logIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={logLine}
                          onChange={(e) => handleEditLogLine(idx, logIdx, e.target.value)}
                          className="flex-1 bg-[#19131a] border border-[#483145]/60 focus:border-[#48b685] rounded px-2 py-1 text-[11px] font-mono text-[#e7e9db] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveLogLine(idx, logIdx)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors opacity-80 group-hover/log:opacity-100 cursor-pointer"
                          title="Hapus Baris Log"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-[#a392a3] italic text-center py-2">
                      Belum ada baris log untuk stage ini.
                    </p>
                  )}
                </div>

                {/* Add Log Line Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newLogInputs[stage.id] || ""}
                    onChange={(e) =>
                      setNewLogInputs({ ...newLogInputs, [stage.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLogLine(idx, stage.id);
                      }
                    }}
                    placeholder="[INFO] Enter new log line here... (Tekan Enter)"
                    className="flex-1 px-3 py-1.5 bg-[#2f1e2e] border border-[#483145] focus:border-[#48b685] rounded-lg text-[#e7e9db] text-xs font-mono outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddLogLine(idx, stage.id)}
                    className="px-3 py-1.5 bg-[#48b685]/20 text-[#48b685] border border-[#48b685]/40 hover:bg-[#48b685]/30 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Tambah Log</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
