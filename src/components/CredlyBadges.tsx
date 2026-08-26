"use client";

import React, { useState } from "react";
import { Award, ArrowUpRight } from "lucide-react";
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
    return <Award className="w-5 h-5 text-[#00d892] shrink-0" />;
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-[#303235] gap-2">
        <div>
          <p className="font-mono text-xs tracking-[0.064em] text-[#00d892] uppercase mb-1">
            VERIFIED DIGITAL CREDENTIALS
          </p>
          <h3 className="text-xl sm:text-2xl font-normal font-sans tracking-tight text-[#dedede]">
            Certifications & Badges
          </h3>
        </div>
        <span className="font-mono text-xs text-[#818284] tracking-[0.053em]">
          {displayBadges.length} VERIFIED
        </span>
      </div>

      {/* Oxide Panel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="oxide-panel p-4 flex items-start gap-4 hover:border-[#bababb] transition-colors"
          >
            {/* Badge Image */}
            <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-[#1f2124] border border-[#303235] rounded-[1px] p-1">
              <BadgeImage url={badge.badge_image_url} alt={badge.name} />
            </div>

            {/* Certification Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-normal text-[#dedede] leading-snug">
                {badge.name}
              </h4>
              <p className="text-xs font-mono text-[#818284] tracking-[0.053em] mt-1">
                {badge.issuer}
                {badge.issue_date ? ` • ${badge.issue_date}` : ""}
              </p>
              {badge.verification_url && (
                <a
                  href={badge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oxide-button-ghost inline-flex items-center gap-1 text-[11px] px-2 py-0.5 mt-3"
                >
                  <span>VERIFY</span>
                  <ArrowUpRight className="w-3 h-3 text-[#00d892]" />
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
