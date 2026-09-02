"use client";

import React, { useState } from "react";
import { Award, ArrowUpRight, ExternalLink, X } from "lucide-react";
import { CertificationBadge } from "@/lib/supabase";

export interface CredlyBadgesProps {
  badges?: CertificationBadge[];
}

const BadgeImage: React.FC<{ url: string; alt: string }> = ({ url, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !url) {
    return <Award className="w-5 h-5 text-[#00c896] shrink-0" />;
  }

  return (
    <img
      src={url}
      alt={alt}
      className="w-full h-full object-contain"
      onError={() => setHasError(true)}
    />
  );
};

export const CredlyBadges: React.FC<CredlyBadgesProps> = ({ badges = [] }) => {
  const displayBadges = badges;
  const [selectedBadge, setSelectedBadge] = useState<CertificationBadge | null>(null);

  if (displayBadges.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-[#252a30] gap-2">
        <div>
          <p className="font-mono text-xs tracking-wider text-[#00c896] uppercase mb-1">
            Verified Digital Credentials
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f2f4f5]">
            Certifications & Badges
          </h3>
        </div>
        <span className="font-mono text-xs text-[#6f7781]">
          {displayBadges.length} Verified
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className="p-5 rounded-md bg-[#111418] border border-[#252a30] flex flex-col justify-between cursor-pointer hover:border-[#00c896] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#161a1f] border border-[#252a30] rounded-md p-1">
                <BadgeImage url={badge.badge_image_url} alt={badge.name} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-[#f2f4f5] leading-snug line-clamp-2">
                  {badge.name}
                </h4>
                <p className="text-xs font-mono text-[#9aa1a9] mt-1">
                  {badge.issuer}
                  {badge.issue_date ? ` • ${badge.issue_date}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#252a30] pt-3 mt-4 text-xs font-mono">
              <span className="text-[10px] text-[#00c896] uppercase tracking-wider">
                Verified
              </span>
              <span className="text-[#9aa1a9] hover:text-[#f2f4f5] text-xs inline-flex items-center gap-1 transition-colors">
                <span>Details</span>
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Credential Inspection Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-[#252a30] bg-[#111418] p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#252a30] pb-3">
              <span className="text-xs text-[#00c896] font-mono uppercase">
                Credential Verification
              </span>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-[#9aa1a9] hover:text-[#f2f4f5] p-1 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="w-24 h-24 bg-[#161a1f] border border-[#252a30] rounded-md p-2 flex items-center justify-center">
                <BadgeImage url={selectedBadge.badge_image_url} alt={selectedBadge.name} />
              </div>
              <div>
                <h4 className="font-medium text-base text-[#f2f4f5]">
                  {selectedBadge.name}
                </h4>
                <p className="text-xs text-[#9aa1a9] mt-1 font-mono">
                  Issued by <strong className="text-[#f2f4f5]">{selectedBadge.issuer}</strong>
                </p>
                {selectedBadge.issue_date && (
                  <p className="text-xs text-[#00c896] font-mono mt-1">
                    Valid from: {selectedBadge.issue_date}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-[#252a30] pt-4 flex gap-3">
              {selectedBadge.verification_url && (
                <a
                  href={selectedBadge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-md bg-[#00c896] hover:bg-[#00b084] text-[#0b0d0f] font-semibold text-xs font-mono inline-flex items-center justify-center gap-2 text-center"
                >
                  <span>Verify on Credly</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2.5 rounded-md bg-[#161a1f] hover:bg-[#252a30] text-[#9aa1a9] text-xs font-mono cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredlyBadges;
