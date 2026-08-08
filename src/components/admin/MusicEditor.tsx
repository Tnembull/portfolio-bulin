"use client";

import { MusicData, TrackItem } from "@/context/PortfolioContext";
import { Plus, Trash2, Music, Check, X } from "lucide-react";

interface MusicEditorProps {
  data: MusicData;
  onChange: (data: MusicData) => void;
}

export default function MusicEditor({ data, onChange }: MusicEditorProps) {
  const playlist = data.playlist || [];

  const handleAddTrack = () => {
    const newTrack: TrackItem = {
      id: `tr-${Date.now()}`,
      title: "New Audio Track",
      artist: "Artist Name",
      audioUrl: "https://domain.com/path/to/audio.mp3",
    };
    onChange({
      ...data,
      playlist: [...playlist, newTrack],
    });
  };

  const handleUpdateTrack = (index: number, updatedTrack: TrackItem) => {
    const newPlaylist = [...playlist];
    newPlaylist[index] = updatedTrack;
    onChange({
      ...data,
      playlist: newPlaylist,
    });
  };

  const handleRemoveTrack = (index: number) => {
    const newPlaylist = playlist.filter((_, i) => i !== index);
    onChange({
      ...data,
      playlist: newPlaylist,
    });
  };

  return (
    <div className="w-full space-y-6 font-mono text-xs">
      <div className="p-6 rounded-xl border border-[#483145] bg-[#2f1e2e] space-y-6 shadow-xs cyber-card">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#483145] pb-4">
          <div className="flex items-center gap-2">
            <Music size={18} className="text-[#48b685]" />
            <h3 className="font-bold text-foreground uppercase tracking-wide">
              08 // DYNAMIC AUDIO PLAYER SETTINGS
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-[#a392a3] text-[11px] font-bold">
              {data.enabled !== false ? "ENABLED" : "DISABLED"}
            </span>
            <input
              type="checkbox"
              checked={data.enabled !== false}
              onChange={(e) => onChange({ ...data, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#19131a] border border-[#483145] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#a392a3] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#48b685] peer-checked:after:bg-[#19131a] relative" />
          </label>
        </div>

        {/* Global Settings */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[#48b685] font-semibold block text-[11px]">
              SECTION BADGE
            </label>
            <input
              type="text"
              value={data.sectionBadge || ""}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground focus:outline-none focus:border-[#48b685]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#48b685] font-semibold block text-[11px]">
                DEFAULT TRACK TITLE
              </label>
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground font-bold focus:outline-none focus:border-[#48b685]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#48b685] font-semibold block text-[11px]">
                DEFAULT ARTIST NAME
              </label>
              <input
                type="text"
                value={data.artist || ""}
                onChange={(e) => onChange({ ...data, artist: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground focus:outline-none focus:border-[#48b685]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#48b685] font-semibold block text-[11px]">
              DEFAULT AUDIO URL PATH / MP3 LINK
            </label>
            <input
              type="text"
              value={data.audioUrl || ""}
              onChange={(e) => onChange({ ...data, audioUrl: e.target.value })}
              placeholder="/audio/your-song.mp3 or https://r2.dev/song.mp3"
              className="w-full px-3.5 py-2.5 bg-[#19131a] border border-[#483145] rounded-lg text-foreground focus:outline-none focus:border-[#48b685]"
            />
          </div>
        </div>

        {/* Playlist Items Section */}
        <div className="pt-4 border-t border-[#483145] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[#48b685] text-xs uppercase tracking-wider">
              DYNAMIC PLAYLIST TRACKS ({playlist.length})
            </h4>
            <button
              onClick={handleAddTrack}
              className="px-3 py-1.5 rounded-lg border border-[#48b685] bg-[#48b685]/20 text-[#48b685] hover:bg-[#48b685]/30 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={14} />
              <span>Add Audio Track</span>
            </button>
          </div>

          {playlist.length === 0 ? (
            <p className="text-[#a392a3] text-xs italic">
              No extra playlist tracks configured. Default track will be played.
            </p>
          ) : (
            <div className="space-y-3">
              {playlist.map((track, idx) => (
                <div
                  key={track.id || idx}
                  className="p-3.5 rounded-xl border border-[#483145] bg-[#19131a] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#48b685] font-bold">
                      TRACK #{idx + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveTrack(idx)}
                      className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                      title="Remove Track"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={track.title}
                      onChange={(e) =>
                        handleUpdateTrack(idx, { ...track, title: e.target.value })
                      }
                      placeholder="Song Title"
                      className="px-3 py-2 bg-[#2f1e2e] border border-[#483145] rounded-lg text-foreground font-bold text-xs focus:outline-none focus:border-[#48b685]"
                    />
                    <input
                      type="text"
                      value={track.artist}
                      onChange={(e) =>
                        handleUpdateTrack(idx, { ...track, artist: e.target.value })
                      }
                      placeholder="Artist Name"
                      className="px-3 py-2 bg-[#2f1e2e] border border-[#483145] rounded-lg text-foreground text-xs focus:outline-none focus:border-[#48b685]"
                    />
                  </div>

                  <input
                    type="text"
                    value={track.audioUrl}
                    onChange={(e) =>
                      handleUpdateTrack(idx, { ...track, audioUrl: e.target.value })
                    }
                    placeholder="Audio URL (e.g. /audio/song.mp3 or https://...)"
                    className="w-full px-3 py-2 bg-[#2f1e2e] border border-[#483145] rounded-lg text-foreground text-xs focus:outline-none focus:border-[#48b685]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
