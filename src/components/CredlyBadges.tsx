"use client";

import React, { useState } from "react";
import { Award, ExternalLink } from "lucide-react";
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
    return <Award className="w-8 h-8 text-cyan-400 shrink-0" />;
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

export const CredlyBadges: React.FC<CredlyBadgesProps> = ({
  badges = DEFAULT_BADGES,
}) => {
  const displayBadges = badges.length > 0 ? badges : DEFAULT_BADGES;

  return (
    <div className="w-full font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-slate-800/80 gap-2">
        <div>
          <p className="font-mono text-xs tracking-wider text-cyan-400 uppercase mb-1">
            Certifications & Badges
          </p>
          <h3 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-slate-100">
            Verified Digital Credentials
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-400">
          {displayBadges.length} Verified
        </span>
      </div>

      {/* Open Minimal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/80"
          >
            {/* Badge Image / Fallback Icon */}
            <div className="w-12 h-12 shrink-0 flex items-center justify-center">
              <BadgeImage url={badge.badge_image_url} alt={badge.name} />
            </div>

            {/* Certification Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                {badge.name}
              </h4>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {badge.issuer}
                {badge.issue_date ? ` • ${badge.issue_date}` : ""}
              </p>
              {badge.verification_url && (
                <a
                  href={badge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 mt-2 transition-colors"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
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
