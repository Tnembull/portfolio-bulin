"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Disc } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function MusicPlayer() {
  const { state } = usePortfolio();
  const { music } = state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioSrc = music.audioUrl || "/audio/FUR - Walking Back Home.mp3";
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [music.audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (music.enabled === false) return null;

  return (
    <section id="music" className="w-full bg-background py-2 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20 flex items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`p-2 rounded-lg border border-[#48b685]/40 bg-[#48b685]/10 shrink-0 text-[#48b685] ${isPlaying ? "animate-spin" : ""}`}>
              <Disc size={16} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block mb-1 font-bold">
                {music.sectionBadge || "08. AUDIO_PLAYER"}
              </span>
              <p className="font-bold text-foreground truncate flex items-center gap-2">
                <span className="text-[#48b685]">{music.title || "Walking Back Home"}</span>
                <span className="text-muted-foreground">–</span>
                <span className="text-[#48b685]">{music.artist || "FUR"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg border border-[#48b685]/40 bg-[#48b685]/20 text-[#48b685] hover:bg-[#48b685]/30 transition-all cursor-pointer font-bold"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg border border-[#48b685]/30 bg-[#48b685]/10 text-[#48b685] hover:bg-[#48b685]/20 transition-colors cursor-pointer font-bold"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
