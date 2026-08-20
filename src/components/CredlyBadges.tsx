"use client";

import React, { useState } from "react";
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CertificationBadge } from "@/lib/supabase";

export interface CredlyBadgesProps {
  badges?: CertificationBadge[];
}

const DEFAULT_BADGES: CertificationBadge[] = [
  {
    id: "badge-oci-devops",
    name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    badge_image_url:
      "https://images.credly.com/size/340x340/images/d3752e25-1e3d-49d7-8321-7299a9b6f124/image.png",
    verification_url: "https://credly.com",
    issue_date: "2025",
    is_featured: true,
    order_index: 0,
  },
  {
    id: "badge-aws-clf",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badge_image_url:
      "https://images.credly.com/size/340x340/images/b9feab85-1a4e-4e6e-8280-f04e477e38c7/image.png",
    verification_url: "https://credly.com",
    issue_date: "2024",
    is_featured: true,
    order_index: 1,
  },
];

const BadgeImage: React.FC<{ url: string; alt: string }> = ({ url, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !url) {
    return <Award className="w-8 h-8 text-cyan-400" />;
  }

  return (
    <img
      src={url}
      alt={alt}
      className="w-full h-full object-contain filter group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"
      onError={() => setHasError(true)}
    />
  );
};

export const CredlyBadges: React.FC<CredlyBadgesProps> = ({
  badges = DEFAULT_BADGES,
}) => {
  const displayBadges = badges.length > 0 ? badges : DEFAULT_BADGES;

  return (
    <div className="w-full my-8 font-sans">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 tracking-tight">
              Verified Digital Badges & Certifications
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Official industry certifications verified via Credly & issuing bodies
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {displayBadges.length} Certified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-950/20 group"
          >
            <div className="w-16 h-16 relative flex-shrink-0 bg-slate-900/90 rounded-lg p-2 border border-slate-800 flex items-center justify-center overflow-hidden group-hover:border-cyan-500/40 transition-colors">
              <BadgeImage url={badge.badge_image_url} alt={badge.name} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                {badge.name}
              </h4>
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                {badge.issuer} {badge.issue_date ? `• ${badge.issue_date}` : ""}
              </p>
              {badge.verification_url && (
                <a
                  href={badge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline mt-1.5 transition-colors"
                >
                  Verify Badge <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CredlyBadges;
