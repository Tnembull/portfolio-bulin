"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePortfolio, AwardItem } from "@/context/PortfolioContext";
import { ChevronLeft, ChevronRight, ExternalLink, Award, Maximize2, X, Check, Copy, FileText } from "lucide-react";

export default function AwardsMarquee() {
  const { state } = usePortfolio();
  const awardsList = state.awards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Auto-advance slide every 5 seconds if not paused
  useEffect(() => {
    if (awardsList.length <= 1 || isPaused || selectedAward) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awardsList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [awardsList.length, isPaused, selectedAward]);

  if (awardsList.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + awardsList.length) % awardsList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % awardsList.length);
  };

  const handleCopyId = (idStr: string) => {
    navigator.clipboard.writeText(idStr);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const currentAward = awardsList[currentIndex];

  return (
    <section id="certifications" className="w-full bg-background py-2 px-2 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Header */}
        <div className="screen-line-top screen-line-bottom p-4 border-b border-line bg-muted/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#48b685]/10 border border-[#48b685]/30 text-[#48b685] px-2.5 py-0.5 rounded-md font-bold text-[10px]">
              07. CERTIFICATIONS & ACCREDITATIONS
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[#48b685] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#48b685] animate-pulse" />
              VERIFIED_CREDENTIALS [{awardsList.length}]
            </span>
          </div>
        </div>

        {/* Certificate Image Carousel */}
        <div
          className="p-3 sm:p-6 bg-background border-b border-line"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative cyber-card rounded-2xl border border-line p-3.5 sm:p-6 bg-card overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
              {/* Left Column: Image Preview Frame or PDF Viewer */}
              <div
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-line bg-[#19131a] group cursor-pointer flex items-center justify-center"
                onClick={() => setSelectedAward(currentAward)}
              >
                {currentAward.image?.toLowerCase().includes(".pdf") ? (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#2f1e2e] via-[#19131a] to-[#2f1e2e] border border-[#483145] relative overflow-hidden group-hover:border-[#48b685] transition-all">
                    <div className="flex items-center justify-between border-b border-[#483145] pb-3">
                      <span className="text-[10px] text-[#48b685] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                        <FileText size={15} />
                        <span>DOKUMEN SERTIFIKAT PDF</span>
                      </span>
                      <span className="text-[10px] text-[#a392a3] font-bold">
                        {currentAward.date || "VERIFIED"}
                      </span>
                    </div>

                    <div className="my-auto space-y-2">
                      <h3 className="font-extrabold text-slate-100 text-base sm:text-lg leading-tight font-sans tracking-tight">
                        {currentAward.title}
                      </h3>
                      {currentAward.credentialId && (
                        <p className="text-[11px] text-[#48b685] font-bold font-mono">
                          ID: {currentAward.credentialId}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#483145] z-20">
                      <span className="text-[10px] text-[#a392a3]">PDF DOCUMENT ATTACHED</span>
                      <a
                        href={currentAward.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#48b685] text-black px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 shadow-md hover:bg-[#48b685]/90 transition-all cursor-pointer min-h-[44px] min-w-[44px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} />
                        <span>Buka PDF Dokumen</span>
                      </a>
                    </div>
                  </div>
                ) : currentAward.image ? (
                  <Image
                    src={currentAward.image}
                    alt={currentAward.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  /* Cyber Graphic Card Fallback when no image is uploaded */
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#2f1e2e] via-[#19131a] to-[#2f1e2e] border border-[#483145] relative overflow-hidden group-hover:border-[#48b685] transition-colors">
                    <div className="flex items-center justify-between border-b border-[#483145] pb-3">
                      <span className="text-[10px] text-[#48b685] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                        <Award size={14} />
                        <span>{currentAward.issuer || "OFFICIAL CERTIFICATION"}</span>
                      </span>
                      <span className="text-[10px] text-[#a392a3] font-bold">
                        {currentAward.date || "VERIFIED"}
                      </span>
                    </div>

                    <div className="my-auto space-y-2">
                      <h3 className="font-extrabold text-slate-100 text-base sm:text-lg leading-tight font-sans tracking-tight">
                        {currentAward.title}
                      </h3>
                      {currentAward.credentialId && (
                        <p className="text-[11px] text-[#48b685] font-bold font-mono">
                          ID: {currentAward.credentialId}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#483145] text-[10px] text-[#a392a3]">
                      <span>VERIFIED CREDENTIAL</span>
                      <span className="text-[#48b685] font-bold">ASHIDDIQI.DEV</span>
                    </div>
                  </div>
                )}

                <div className="scanline-overlay absolute inset-0 pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[#19131a]/90 backdrop-blur-md border border-[#48b685]/40 text-[#48b685] px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 z-10">
                  <Award size={12} />
                  <span>{currentAward.issuer || "OFFICIAL CERTIFICATE"}</span>
                </div>

                {/* Enlarge Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAward(currentAward);
                  }}
                  className="absolute bottom-3 right-3 bg-[#19131a]/90 backdrop-blur-md border border-line hover:border-[#48b685] text-foreground p-2 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="View Certificate Details"
                  title="View Certificate Details"
                >
                  <Maximize2 size={14} className="text-[#48b685]" />
                </button>
              </div>

              {/* Right Column: Certificate Meta Details */}
              <div className="space-y-4 font-mono">
                <div className="space-y-1.5 border-b border-line pb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#f99b15] font-bold block">
                    ISSUED BY: {currentAward.issuer || "ACCREDITATION BODY"}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug">
                    {currentAward.title}
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-[#a392a3]">
                  {currentAward.date && (
                    <div className="flex items-center justify-between">
                      <span>ISSUE DATE:</span>
                      <span className="font-bold text-foreground">{currentAward.date}</span>
                    </div>
                  )}
                  {currentAward.credentialId && (
                    <div className="flex items-center justify-between">
                      <span>CREDENTIAL ID:</span>
                      <span className="font-bold text-[#48b685]">{currentAward.credentialId}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setSelectedAward(currentAward)}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border border-[#48b685]/40 bg-[#48b685]/15 text-[#48b685] hover:bg-[#48b685]/25 hover:border-[#48b685] text-xs font-bold transition-all cursor-pointer"
                  >
                    <Maximize2 size={13} />
                    <span>View Detail Modal</span>
                  </button>

                  {currentAward.link && (
                    <a
                      href={currentAward.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border border-line bg-muted/30 hover:bg-muted text-foreground text-xs font-bold transition-all cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      <span>Verify Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1 right-1 sm:-left-3 sm:-right-3 flex justify-between pointer-events-none z-20">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-2 rounded-full border border-line bg-[#19131a]/80 text-[#48b685] hover:bg-[#48b685]/20 hover:border-[#48b685] transition-all cursor-pointer shadow-md"
                title="Previous Certificate"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto p-2 rounded-full border border-line bg-[#19131a]/80 text-[#48b685] hover:bg-[#48b685]/20 hover:border-[#48b685] transition-all cursor-pointer shadow-md"
                title="Next Certificate"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex justify-center items-center gap-2 pt-4">
            {awardsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-[#48b685]"
                    : "w-2 bg-line hover:bg-[#48b685]/40"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Certificate Specification Detail Modal */}
      {selectedAward && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedAward(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[88vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl border border-[#483145] bg-[#2f1e2e] p-3.5 sm:p-5 space-y-3.5 sm:space-y-5 shadow-2xl animate-in fade-in zoom-in-95 font-mono my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-1.5 text-[#48b685] text-[10px] sm:text-xs font-bold truncate">
                <Award size={16} className="shrink-0" />
                <span className="uppercase tracking-widest truncate">[ CERTIFICATE_SPECIFICATION_MATRIX ]</span>
              </div>
              <button
                onClick={() => setSelectedAward(null)}
                className="p-1 rounded-lg border border-line text-foreground/80 hover:text-foreground hover:bg-muted cursor-pointer transition-colors shrink-0"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Left Column: Image Frame or PDF Viewer */}
              <div className="relative aspect-[16/10] max-h-[220px] sm:max-h-[340px] w-full rounded-xl overflow-hidden border border-line bg-[#19131a] flex items-center justify-center">
                {selectedAward.image?.toLowerCase().includes(".pdf") ? (
                  <div className="w-full h-full relative flex items-center justify-center bg-[#19131a] overflow-hidden">
                    <iframe
                      src={`${selectedAward.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={selectedAward.title}
                      className="w-full h-full border-0 pointer-events-none opacity-90 overflow-hidden"
                      style={{ overflow: "hidden" }}
                      scrolling="no"
                    />
                    <a
                      href={selectedAward.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 left-3 bg-[#48b685] text-[#19131a] px-3 py-1 rounded-md text-[11px] font-extrabold flex items-center gap-1.5 shadow-lg hover:bg-[#48b685]/90 transition-all z-20"
                    >
                      <ExternalLink size={13} />
                      <span>Buka Dokumen PDF</span>
                    </a>
                  </div>
                ) : selectedAward.image ? (
                  <Image
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full p-5 flex flex-col justify-between bg-gradient-to-br from-[#2f1e2e] via-[#19131a] to-[#2f1e2e] border border-[#483145]">
                    <div className="flex items-center justify-between border-b border-[#483145] pb-2">
                      <span className="text-[10px] text-[#48b685] font-extrabold uppercase tracking-widest flex items-center gap-1">
                        <Award size={13} />
                        <span>{selectedAward.issuer || "OFFICIAL CERTIFICATE"}</span>
                      </span>
                      <span className="text-[10px] text-[#a392a3] font-bold">{selectedAward.date || "2024"}</span>
                    </div>
                    <div className="my-auto space-y-1">
                      <h4 className="font-extrabold text-slate-100 text-sm leading-snug">{selectedAward.title}</h4>
                      {selectedAward.credentialId && (
                        <p className="text-[10px] text-[#48b685] font-bold font-mono">ID: {selectedAward.credentialId}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-[#48b685] font-bold pt-2 border-t border-[#483145]">ASHIDDIQI.DEV</span>
                  </div>
                )}
                <div className="scanline-overlay absolute inset-0 pointer-events-none" />
              </div>

              {/* Right Column: Information Specs */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#f99b15] font-bold uppercase tracking-wider block mb-1">
                    ISSUER / AUTHORITY
                  </span>
                  <p className="font-extrabold text-foreground text-sm">
                    {selectedAward.issuer || "Accreditation Organization"}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-[#a392a3] font-bold uppercase tracking-wider block mb-1">
                    CERTIFICATE NAME
                  </span>
                  <h3 className="font-bold text-foreground text-base leading-snug">
                    {selectedAward.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-line">
                  <div>
                    <span className="text-[10px] text-[#a392a3] font-bold block mb-0.5">ISSUE DATE</span>
                    <span className="font-bold text-foreground">{selectedAward.date || "2024"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#a392a3] font-bold block mb-0.5">STATUS</span>
                    <span className="font-extrabold text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded inline-block text-[10px]">
                      ACTIVE / VALIDATED
                    </span>
                  </div>
                </div>

                {selectedAward.credentialId && (
                  <div className="pt-2 border-t border-line space-y-1">
                    <span className="text-[10px] text-[#a392a3] font-bold block">CREDENTIAL ID:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-[#48b685] font-bold bg-[#19131a] border border-[#483145] px-2.5 py-1 rounded text-[11px] flex-1 truncate">
                        {selectedAward.credentialId}
                      </code>
                      <button
                        onClick={() => handleCopyId(selectedAward.credentialId!)}
                        className="p-1.5 rounded border border-line bg-muted/20 hover:bg-muted text-foreground transition-colors cursor-pointer"
                        title="Copy ID"
                      >
                        {copiedId ? <Check size={14} className="text-[#48b685]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 pt-3 border-t border-line">
              {selectedAward.link && (
                <a
                  href={selectedAward.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-2 rounded-lg border border-[#48b685]/50 bg-[#48b685]/20 text-[#48b685] hover:bg-[#48b685]/30 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Verify On Official Portal</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button
                onClick={() => setSelectedAward(null)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-line bg-muted/20 hover:bg-muted text-foreground font-bold text-xs cursor-pointer transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

