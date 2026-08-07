"use client";

import { useState, useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  CodeXml,
  Lightbulb,
  MapPin,
  Clock,
  Phone,
  Mail,
  Link as LinkIcon,
  Mars,
  Copy,
  Check,
  Volume2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function SequenceScroll() {
  const { state } = usePortfolio();
  const { hero } = state;

  const [avatarLights, setAvatarLights] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [timeDiff, setTimeDiff] = useState("");
  const [greeting, setGreeting] = useState("Good morning");

  // Dynamic greeting & time calculation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 0 && hours < 12) setGreeting("Good morning");
      else if (hours >= 12 && hours < 17) setGreeting("Good afternoon");
      else setGreeting("Good evening");

      const timeString = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      setCurrentTime(timeString);

      const localOffset = -now.getTimezoneOffset();
      const targetOffset = 420; // UTC+7 in minutes
      const diffHours = Math.abs(targetOffset - localOffset) / 60;

      if (diffHours < 0.5) {
        setTimeDiff(" • same time");
      } else {
        const aheadOrBehind = targetOffset > localOffset ? "ahead" : "behind";
        setTimeDiff(` • ${Math.floor(diffHours)}h ${aheadOrBehind}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const initials = "MNA";

  const playAudioPronounce = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(hero.name || "Muhammad Nur Ashiddiqi");
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const iconBoxClass = "tech-icon-box";

  return (
    <section id="about" className="w-full bg-background pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-line">
        {/* Top Header Block — Responsive Layout */}
        {/* Mobile: stacked (monogram → avatar+name row) */}
        {/* Tablet/Desktop: 2-col grid (avatar left | monogram top-right, name bottom-right) */}
        <div className="screen-line-bottom overflow-hidden border-b border-line">
          {/* === Mobile Layout (< sm) === */}
          <div className="flex flex-col sm:hidden">
            {/* Monogram Image — Full Width */}
            <figure className="relative overflow-hidden flex items-center justify-center h-48 border-b border-line bg-[#0d090f]">
              <div className="absolute inset-0 bg-radial from-[#48b685]/15 via-[#48b685]/5 to-transparent blur-2xl pointer-events-none z-10" />
              <img
                src="/logo/logo-monogram.png"
                alt="MNA Monogram 3D Perspective Design"
                className="w-full h-full object-contain p-2 select-none pointer-events-none"
                draggable={false}
              />
            </figure>

            {/* Avatar + Name Row */}
            <div className="flex items-center gap-3 p-3 border-b border-line">
              {/* Avatar Badge */}
              <button
                onClick={() => setAvatarLights((prev) => !prev)}
                className="group/avatar-lights-toggle flex outline-none cursor-pointer shrink-0"
                title="Toggle MNA Monogram Glow"
              >
                <div className="relative size-16 rounded-full border border-[#48b685]/40 p-0.5 bg-[#48b685]/5 transition-all duration-300 group-hover/avatar-lights-toggle:scale-105 group-hover/avatar-lights-toggle:border-[#48b685]">
                  <div
                    className={`size-full rounded-full flex items-center justify-center overflow-hidden p-1 transition-all duration-500 ${
                      avatarLights
                        ? "bg-[#19131a] border border-[#48b685] shadow-[0_0_30px_rgba(72,182,133,0.6)]"
                        : "bg-[#19131a] border border-line"
                    }`}
                  >
                    <img
                      src="/logo/logo.png"
                      alt="MNA Monogram Logo"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(72,182,133,0.8)]"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[#48b685] border-2 border-background animate-pulse shadow-[0_0_10px_rgba(72,182,133,0.8)]" />
                </div>
              </button>

              {/* Name & Badge */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-lg font-bold tracking-tight text-foreground font-sans truncate">
                    {hero.name || "Muhammad Nur Ashiddiqi"}
                  </h1>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#48b685] shrink-0" aria-hidden="true">
                    <path d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z" />
                  </svg>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-1.5 py-0.5 rounded font-bold w-fit">
                  [ DEVOPS_ARCHITECT ]
                </span>
              </div>
            </div>

            {/* Shimmer Bio */}
            <div className="py-1.5 px-3 bg-[#48b685]/5 border-b border-line">
              <p className="shimmer font-mono text-xs text-[#48b685]">
                {hero.bio || "Creating with code. High availability & automation matter."}
              </p>
            </div>
          </div>

          {/* === Tablet/Desktop Layout (>= sm) === */}
          <div className="hidden sm:grid grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
            {/* Top Right: 3D Perspective MNA Monogram */}
            <figure className="relative col-span-1 col-start-2 overflow-hidden flex items-center justify-center min-h-[200px] md:min-h-[240px] lg:min-h-[260px]">
              <div className="absolute inset-0 bg-radial from-[#48b685]/15 via-[#48b685]/5 to-transparent blur-3xl pointer-events-none z-10" />
              <img
                src="/logo/logo-monogram.png"
                alt="MNA Monogram 3D Perspective Design"
                className="w-full h-full min-h-[200px] md:min-h-[240px] lg:min-h-[260px] object-cover object-[50%_28%] select-none pointer-events-none"
                draggable={false}
              />
            </figure>

            {/* Left Column: Official MNA Logo Mark */}
            <div className="flex flex-col row-span-2 row-start-1">
              <div className="screen-line-top mt-auto shrink-0 border-r border-line p-2 md:p-3">
                <button
                  onClick={() => setAvatarLights((prev) => !prev)}
                  className="group/avatar-lights-toggle flex outline-none cursor-pointer"
                  title="Toggle MNA Monogram Glow"
                >
                  <div className="relative size-20 md:size-24 lg:size-28 rounded-full border border-[#48b685]/40 p-0.5 bg-[#48b685]/5 transition-all duration-300 group-hover/avatar-lights-toggle:scale-105 group-hover/avatar-lights-toggle:border-[#48b685]">
                    <div
                      className={`size-full rounded-full flex items-center justify-center overflow-hidden p-1.5 transition-all duration-500 ${
                        avatarLights
                          ? "bg-[#19131a] border border-[#48b685] shadow-[0_0_30px_rgba(72,182,133,0.6)]"
                          : "bg-[#19131a] border border-line"
                      }`}
                    >
                      <img
                        src="/logo/logo.png"
                        alt="MNA Monogram Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(72,182,133,0.8)] group-hover/avatar-lights-toggle:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="absolute bottom-0.5 right-0.5 size-3 rounded-full bg-[#48b685] border-2 border-background animate-pulse shadow-[0_0_10px_rgba(72,182,133,0.8)]" />
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Right: Name & Bio Row */}
            <div className="flex flex-col col-start-2">
              <div className="z-1 mt-auto border-t border-line">
                <div className="flex items-center gap-2 pl-4 py-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground font-sans">
                    {hero.name || "Muhammad Nur Ashiddiqi"}
                  </h1>

                  {/* Verified SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4.5 text-[#48b685] shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z" />
                  </svg>

                  <span className="text-[10px] font-mono tracking-widest text-[#48b685] bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md font-bold">
                    [ DEVOPS_ARCHITECT ]
                  </span>

                  {/* Speaker Button */}
                  <button
                    onClick={playAudioPronounce}
                    className="text-[#48b685] hover:text-[#48b685]/80 transition-colors p-1 rounded hover:bg-[#48b685]/10 cursor-pointer border border-[#48b685]/30"
                    title="Pronounce name"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                {/* Shimmer Bio */}
                <div className="border-t border-line py-1.5 pl-4 bg-[#48b685]/5">
                  <p className="shimmer font-mono text-xs sm:text-sm text-[#48b685]">
                    {hero.bio || "Creating with code. High availability & automation matter."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Grid Panel */}
        <div className="screen-line-top screen-line-bottom p-4 sm:p-5 grid gap-x-4 gap-y-3 sm:grid-cols-2 text-xs font-mono border-b border-line bg-background">
          {/* Row 1: Role */}
          <div className="flex items-center gap-3 sm:col-span-2 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all">
            <div className={iconBoxClass}>
              <CodeXml size={13} />
            </div>
            <p className="text-foreground font-semibold">
              {hero.role || "DevOps Engineer"}{" "}
              <span className="text-[#48b685]">@</span>{" "}
              <a
                href={hero.companyLink || "#experience"}
                className="font-bold text-[#48b685] hover:underline underline-offset-4"
              >
                {hero.company || "Cloud Infrastructure"}
              </a>
            </p>
          </div>

          {/* Row 2: Focus */}
          <div className="flex items-center gap-3 sm:col-span-2 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all">
            <div className={iconBoxClass}>
              <Lightbulb size={13} />
            </div>
            <p className="text-foreground">
              Infrastructure Automation Specialist{" "}
              <span className="text-[#48b685]">@</span>{" "}
              <span className="font-bold text-[#48b685]">
                Kubernetes & Cloud Systems
              </span>
            </p>
          </div>

          {/* Row 3: Location */}
          <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all">
            <div className={iconBoxClass}>
              <MapPin size={13} />
            </div>
            <a
              href={
                hero.locationLink ||
                "https://maps.google.com/?q=Bandar+Lampung,Indonesia"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-[#48b685] font-medium"
            >
              {hero.location || "Bandar Lampung, Indonesia"}
            </a>
          </div>

          {/* Row 4: Live Clock */}
          <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all">
            <div className={iconBoxClass}>
              <Clock size={13} />
            </div>
            <p className="text-foreground font-medium">
              <span className="text-[#48b685] font-bold">{currentTime || "12:00 PM"}</span>
              <span className="text-[#a392a3]">{timeDiff}</span>
            </p>
          </div>

          {/* Row 5: Phone */}
          <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all group">
            <div className={iconBoxClass}>
              <Phone size={13} />
            </div>
            <p className="text-foreground font-mono font-medium">{hero.phone || "+62 812 3456 7890"}</p>
            <button
              onClick={() => handleCopy(hero.phone || "+62 812 3456 7890", "phone")}
              className="text-[#a392a3] hover:text-[#48b685] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded border border-transparent hover:border-[#48b685]/30"
              title="Copy Phone"
            >
              {copiedField === "phone" ? (
                <Check size={12} className="text-[#48b685]" />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>

          {/* Row 6: Email */}
          <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all group">
            <div className={iconBoxClass}>
              <Mail size={13} />
            </div>
            <p className="text-foreground font-mono font-medium truncate">{hero.email || "muhammadnurashiddiqi@gmail.com"}</p>
            <button
              onClick={() =>
                handleCopy(hero.email || "muhammadnurashiddiqi@gmail.com", "email")
              }
              className="text-[#a392a3] hover:text-[#48b685] opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded border border-transparent hover:border-[#48b685]/30 shrink-0"
              title="Copy Email"
            >
              {copiedField === "email" ? (
                <Check size={12} className="text-[#48b685]" />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>

          {/* Row 7: Link */}
          <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all">
            <div className={iconBoxClass}>
              <LinkIcon size={13} />
            </div>
            <a
              href={`https://${hero.website || "bulindev.tech"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-[#48b685] font-bold"
            >
              {hero.website || "bulindev.tech"}
            </a>
          </div>

          {/* Row 8: Pronouns */}
          <div className="flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-[#48b685]/30 hover:bg-[#48b685]/5 transition-all">
            <div className={iconBoxClass}>
              <Mars size={13} />
            </div>
            <p className="text-foreground font-medium">{hero.pronouns || "he/him"}</p>
          </div>
        </div>

        {/* Compact Social Buttons List */}
        <div className="p-4 border-b border-line bg-background">
          <div className="flex flex-wrap gap-2">
            <a
              href="https://twitter.com/ashiddiqi"
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 rounded-lg border border-line bg-background hover:bg-muted text-foreground/80 hover:text-foreground flex items-center justify-center transition-all"
              title="Twitter / X"
            >
              <Twitter size={15} />
            </a>
            <a
              href="https://github.com/Tnembull"
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 rounded-lg border border-line bg-background hover:bg-muted text-foreground/80 hover:text-foreground flex items-center justify-center transition-all"
              title="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com/in/ashiddiqi"
              target="_blank"
              rel="noopener noreferrer"
              className="size-8 rounded-lg border border-line bg-background hover:bg-muted text-foreground/80 hover:text-foreground flex items-center justify-center transition-all"
              title="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={`mailto:${hero.email || "ashiddiqi.devops@gmail.com"}`}
              className="size-8 rounded-lg border border-line bg-background hover:bg-muted text-foreground/80 hover:text-foreground flex items-center justify-center transition-all"
              title="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Hello / Greeting Overview Section */}
        <div className="screen-line-top screen-line-bottom p-4 sm:p-5 border-b border-line bg-background space-y-3 font-mono text-xs">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[#48b685] font-serif italic">{greeting},</span>
            <span>selamat datang.</span>
          </h2>
          <div className="text-xs text-[#a392a3] leading-relaxed space-y-2 font-mono">
            <p>
              • Saya <strong className="text-foreground font-bold">Muhammad Nur Ashiddiqi (Bulin)</strong> — Backend & DevOps Engineer lulusan Sarjana Ilmu Komputer (S.Kom) Universitas Lampung yang berdomisili di Bandar Lampung.
            </p>
            <p>
              • Berfokus pada perancangan REST API terstruktur berbasis Node.js/Express & Prisma, optimasi query database PostgreSQL, serta otomatisasi deployment server Linux menggunakan Docker & CI/CD.
            </p>
            <p>
              • Saat ini aktif berkarir di <strong className="text-foreground font-bold">Newus Teknologi</strong> mengembangkan sistem backend E-Gov dan integrasi payment gateway.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}