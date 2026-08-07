"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageLightboxProps {
  src: string | null;
  alt: string;
  category?: string;
  onClose: () => void;
}

export default function ImageLightbox({
  src,
  alt,
  category,
  onClose,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-in fade-in duration-300 select-none text-foreground font-mono"
    >
      {/* Lightbox Top Header Controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
      >
        <div className="space-y-0.5">
          {category && (
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest block">
              {category}
            </span>
          )}
          <h3 className="text-base md:text-xl font-bold text-foreground font-sans tracking-tight">
            {alt}
          </h3>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-muted/30 border border-line text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-muted/30 border border-line text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-muted/30 border border-line text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-foreground text-background font-bold hover:opacity-90 transition-colors cursor-pointer ml-2"
            title="Close (ESC)"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Image Display Box */}
      <div className="flex-1 flex items-center justify-center relative w-full h-full overflow-hidden my-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-6xl w-full aspect-[16/10] transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain rounded-xl drop-shadow-2xl"
            unoptimized
            priority
          />
        </div>
      </div>

      {/* Lightbox Footer Instruction */}
      <div className="text-center font-mono text-xs text-muted-foreground z-10">
        Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-foreground font-bold">ESC</kbd> or click outside image to close
      </div>
    </div>
  );
}
