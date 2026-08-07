"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect touch / mobile device
    const checkMobile = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(hasTouch || isCoarse);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorAttrEl) {
        const val = cursorAttrEl.getAttribute("data-cursor");
        if (val === "view") {
          setCursorText("LIHAT");
          setIsPointer(true);
          return;
        } else if (val === "pointer") {
          setCursorText("");
          setIsPointer(true);
          return;
        }
      }

      const interactiveEl = target.closest("a, button, input, select, textarea, [role='button']");
      if (interactiveEl) {
        setCursorText("");
        setIsPointer(true);
      } else {
        setCursorText("");
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, isMobile]);

  // High-precision Lerp Trailing Motion
  useEffect(() => {
    if (isMobile) return;

    let animFrame: number;
    const loop = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrame);
  }, [position, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Precision Center Pin Point */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#c85628] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 shadow-[0_0_8px_rgba(200,86,40,0.9)]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          opacity: cursorText ? 0 : 1,
        }}
      />

      {/* Retro Morphing Magnetic Outer Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
          cursorText
            ? "w-20 h-20 bg-foreground text-background border border-line rounded-full font-mono text-[11px] font-bold uppercase tracking-widest shadow-xl scale-100 opacity-100"
            : isPointer
            ? "w-12 h-12 border border-line bg-muted/40 rounded-full scale-100 opacity-90 backdrop-blur-xs shadow-xs"
            : "w-8 h-8 border border-line rounded-full scale-100 opacity-60"
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText && <span>{cursorText}</span>}

        {/* Crosshair Marks when idle */}
        {!cursorText && !isPointer && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-full h-[1px] bg-foreground" />
            <div className="h-full w-[1px] bg-foreground absolute" />
          </div>
        )}
      </div>
    </>
  );
}
