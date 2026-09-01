"use client";

import React, { useState } from "react";
import { Award, ArrowUpRight, CheckCircle2, ExternalLink, X, ShieldCheck } from "lucide-react";
import { CertificationBadge } from "@/lib/supabase";

export interface CredlyBadgesProps {
  badges?: CertificationBadge[];
}

const DEFAULT_BADGES: CertificationBadge[] = [
  {
    id: "badge-oci-devops",
    name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle Corporation",
    badge_image_url:
      "https://images.credly.com/size/340x340/images/d3752e25-1e3d-49d7-8321-7299a9b6f124/image.png",
    verification_url: "https://www.credly.com/org/oracle/badge/oracle-cloud-infrastructure-2025-certified-devops-professional",
    issue_date: "2025",
    is_featured: true,
    order_index: 0,
  },
  {
    id: "badge-aws-clf",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    badge_image_url:
      "https://images.credly.com/size/340x340/images/b9feab85-1a4e-4e6e-8280-f04e477e38c7/image.png",
    verification_url: "https://www.credly.com/org/amazon-web-services/badge/aws-certified-cloud-practitioner",
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
  const [selectedBadge, setSelectedBadge] = useState<CertificationBadge | null>(null);

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
          {displayBadges.length} VERIFIED CREDENTIALS
        </span>
      </div>

      {/* Oxide Panel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className="oxide-panel-interactive p-5 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              {/* Badge Image container */}
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#1f2124] border border-[#303235] rounded-[1px] p-1 group-hover:border-[#00d892] transition-colors">
                <BadgeImage url={badge.badge_image_url} alt={badge.name} />
              </div>

              {/* Certification Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-[#dedede] group-hover:text-[#00d892] transition-colors leading-snug line-clamp-2">
                  {badge.name}
                </h4>
                <p className="text-xs font-mono text-[#818284] tracking-[0.053em] mt-1">
                  {badge.issuer}
                  {badge.issue_date ? ` • ${badge.issue_date}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#303235] pt-3 mt-4 text-xs font-mono">
              <span className="text-[10px] text-[#00d892] uppercase tracking-[0.058em] flex items-center gap-1">
                <ShieldCheck size={12} /> VERIFIED
              </span>
              <span className="text-[#818284] group-hover:text-[#dedede] text-[11px] inline-flex items-center gap-1 transition-colors">
                DETAILS <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Credential Inspection Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-[#0b0e12]/85 backdrop-blur-sm flex items-center justify-center p-4 font-mono"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="w-full max-w-md rounded-[1px] border border-[#303235] bg-[#14171b] p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#303235] pb-3">
              <span className="text-xs text-[#00d892] uppercase tracking-[0.064em]">
                [ CREDENTIAL_VERIFICATION ]
              </span>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-[#818284] hover:text-[#dedede] p-1 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="w-24 h-24 bg-[#1f2124] border border-[#303235] rounded-[1px] p-2 flex items-center justify-center">
                <BadgeImage url={selectedBadge.badge_image_url} alt={selectedBadge.name} />
              </div>
              <div>
                <h4 className="font-sans font-normal text-lg text-[#dedede]">
                  {selectedBadge.name}
                </h4>
                <p className="font-mono text-xs text-[#818284] mt-1">
                  Issued by <strong className="text-[#bababb]">{selectedBadge.issuer}</strong>
                </p>
                {selectedBadge.issue_date && (
                  <p className="font-mono text-[11px] text-[#00d892] mt-1">
                    Valid from: {selectedBadge.issue_date}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-[#303235] pt-4 flex gap-3">
              {selectedBadge.verification_url && (
                <a
                  href={selectedBadge.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oxide-button-filled w-full py-2.5 inline-flex items-center justify-center gap-2 text-xs text-center"
                >
                  <span>VERIFY ON CREDLY</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button
                onClick={() => setSelectedBadge(null)}
                className="oxide-button-ghost px-4 py-2.5 text-xs cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredlyBadges;
