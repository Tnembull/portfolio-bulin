"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Disc, SkipBack, SkipForward } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function MusicPlayer() {
  const { state } = usePortfolio();
  const { music } = state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = music.playlist && music.playlist.length > 0
    ? music.playlist
    : [
        {
          id: "default",
          title: music.title || "Walking Back Home",
          artist: music.artist || "FUR",
          audioUrl: music.audioUrl || "/audio/FUR - Walking Back Home.mp3",
        },
      ];

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  useEffect(() => {
    const audioSrc = currentTrack.audioUrl || music.audioUrl || "/audio/FUR - Walking Back Home.mp3";
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.loop = playlist.length === 1;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (playlist.length > 1) {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [currentTrackIndex, currentTrack.audioUrl, music.audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleNext = () => {
    if (playlist.length <= 1) return;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    if (playlist.length <= 1) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec) || sec <= 0) return "00:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (music.enabled === false) return null;

  return (
    <section id="music" className="w-full bg-background py-2 px-2 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs">
          
          {/* Left Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-2.5 rounded-xl border border-[#48b685]/40 bg-[#48b685]/10 shrink-0 text-[#48b685] ${isPlaying ? "animate-spin" : ""}`}>
              <Disc size={18} />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md uppercase tracking-widest font-bold">
                  {music.sectionBadge || "08. AUDIO_PLAYER"}
                </span>
                {playlist.length > 1 && (
                  <span className="text-[9px] text-[#a392a3] bg-[#2f1e2e] border border-[#483145] px-1.5 py-0.5 rounded">
                    TRACK {currentTrackIndex + 1}/{playlist.length}
                  </span>
                )}
              </div>
              <p className="font-bold text-foreground truncate flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-[#48b685] font-sans font-bold">{currentTrack.title || music.title || "Walking Back Home"}</span>
                <span className="text-[#a392a3]">–</span>
                <span className="text-[#e7e9db] font-sans">{currentTrack.artist || music.artist || "FUR"}</span>
              </p>
            </div>
          </div>

          {/* Center Seek Bar & Time Display */}
          <div className="flex items-center gap-3 flex-1 max-w-md w-full">
            <span className="text-[10px] font-mono text-[#48b685] shrink-0 font-bold">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              id="audio-seek-bar"
              aria-label="Audio progress seek bar"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-[#483145] rounded-lg appearance-none cursor-pointer accent-[#48b685]"
            />
            <span className="text-[10px] font-mono text-[#a392a3] shrink-0">
              {formatTime(duration)}
            </span>
          </div>

          {/* Right Playback Controls */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            {playlist.length > 1 && (
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg border border-[#483145] bg-[#2f1e2e] text-[#e7e9db] hover:border-[#48b685] hover:text-[#48b685] transition-all cursor-pointer"
                title="Previous Track"
              >
                <SkipBack size={14} />
              </button>
            )}

            <button
              onClick={togglePlay}
              className="px-3.5 py-2 rounded-xl border border-[#48b685] bg-[#48b685]/20 text-[#48b685] hover:bg-[#48b685]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-bold flex items-center gap-1.5 shadow-md"
              title={isPlaying ? "Pause Track" : "Play Track"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span className="text-[10px] uppercase">{isPlaying ? "PAUSE" : "PLAY"}</span>
            </button>

            {playlist.length > 1 && (
              <button
                onClick={handleNext}
                className="p-2 rounded-lg border border-[#483145] bg-[#2f1e2e] text-[#e7e9db] hover:border-[#48b685] hover:text-[#48b685] transition-all cursor-pointer"
                title="Next Track"
              >
                <SkipForward size={14} />
              </button>
            )}

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg border border-[#483145] bg-[#2f1e2e] text-[#a392a3] hover:text-[#48b685] hover:border-[#48b685]/50 transition-colors cursor-pointer"
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
