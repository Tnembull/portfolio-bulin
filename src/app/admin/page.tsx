"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Briefcase,
  Wrench,
  Cpu,
  GitBranch,
  FolderKanban,
  Music,
  BarChart3,
  Github,
  HelpCircle,
  Award,
  MessageSquareQuote,
  ExternalLink,
  Save,
  CheckCircle2,
  Menu,
  X,
  LogOut,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import ThemeToggle from "@/components/ThemeToggle";

// Modular Section Editor Components
import OverviewEditor from "@/components/admin/OverviewEditor";
import HeroEditor from "@/components/admin/HeroEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import EducationEditor from "@/components/admin/EducationEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import ToolsEditor from "@/components/admin/ToolsEditor";
import ProcessEditor from "@/components/admin/ProcessEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import MusicEditor from "@/components/admin/MusicEditor";
import StatsEditor from "@/components/admin/StatsEditor";
import GithubEditor from "@/components/admin/GithubEditor";
import FaqEditor from "@/components/admin/FaqEditor";
import AwardsEditor from "@/components/admin/AwardsEditor";
import TestimonialsEditor from "@/components/admin/TestimonialsEditor";
import CtaEditor from "@/components/admin/CtaEditor";
import PipelineEditor from "@/components/admin/PipelineEditor";
import ProgressEditor from "@/components/admin/ProgressEditor";
import BadgesEditor from "@/components/admin/BadgesEditor";
import { Mail, GraduationCap } from "lucide-react";

type SectionTab =
  | "overview"
  | "hero"
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "tools"
  | "process"
  | "projects"
  | "music"
  | "stats"
  | "github"
  | "faq"
  | "awards"
  | "testimonials"
  | "cta"
  | "pipeline"
  | "progress"
  | "badges";

import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from "lucide-react";

import { verifyAdminPinFromSupabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const { state, updateSection, resetAll } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<SectionTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Check auth session on mount
  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem("admin_authenticated");
      if (isAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setPinError(false);

    try {
      const isValid = await verifyAdminPinFromSupabase(pinInput);
      if (isValid) {
        try {
          sessionStorage.setItem("admin_authenticated", "true");
          document.cookie = "porto_admin_auth=true; path=/; max-age=86400; SameSite=Strict";
        } catch {}
        setIsAuthenticated(true);
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch {
      setPinError(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("admin_authenticated");
    } catch {}
    setIsAuthenticated(false);
    setPinInput("");
  };

  // SECTION STATES
  const [heroData, setHeroData] = useState(state.hero);
  const [aboutData, setAboutData] = useState(state.about);
  const [experienceData, setExperienceData] = useState(state.experience);
  const [educationData, setEducationData] = useState(state.education);
  const [skillsData, setSkillsData] = useState(state.skills);
  const [toolsData, setToolsData] = useState(state.tools);
  const [processData, setProcessData] = useState(state.process);
  const [projectsData, setProjectsData] = useState(state.projects);
  const [musicData, setMusicData] = useState(state.music);
  const [statsData, setStatsData] = useState(state.stats);
  const [githubData, setGithubData] = useState(state.github);
  const [faqData, setFaqData] = useState(state.faq);
  const [awards, setAwards] = useState(state.awards);
  const [testimonialsData, setTestimonialsData] = useState(state.testimonials);
  const [ctaData, setCtaData] = useState(state.cta);
  const [pipelineData, setPipelineData] = useState(state.pipeline || []);
  const [progressData, setProgressData] = useState(state.progress || []);
  const [badgesData, setBadgesData] = useState(state.badges || []);

  useEffect(() => {
    setHeroData(state.hero);
    setAboutData(state.about);
    setExperienceData(state.experience);
    setEducationData(state.education);
    setSkillsData(state.skills);
    setToolsData(state.tools);
    setProcessData(state.process);
    setProjectsData(state.projects);
    setMusicData(state.music);
    setStatsData(state.stats);
    setGithubData(state.github);
    setFaqData(state.faq);
    setAwards(state.awards);
    setTestimonialsData(state.testimonials);
    setCtaData(state.cta);
    setPipelineData(state.pipeline || []);
    setProgressData(state.progress || []);
    setBadgesData(state.badges || []);
  }, [state]);

  const triggerSave = () => {
    updateSection("hero", heroData);
    updateSection("about", aboutData);
    updateSection("experience", experienceData);
    updateSection("education", educationData);
    updateSection("skills", skillsData);
    updateSection("tools", toolsData);
    updateSection("process", processData);
    updateSection("projects", projectsData);
    updateSection("music", musicData);
    updateSection("stats", statsData);
    updateSection("github", githubData);
    updateSection("faq", faqData);
    updateSection("awards", awards);
    updateSection("testimonials", testimonialsData);
    updateSection("cta", ctaData);
    updateSection("pipeline", pipelineData);
    updateSection("progress", progressData);
    updateSection("badges", badgesData);

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const navMenuItems = [
    { id: "overview" as SectionTab, label: "Overview Dashboard", icon: LayoutDashboard },
    { id: "hero" as SectionTab, label: "01 / Hero Block", icon: Sparkles },
    { id: "about" as SectionTab, label: "02 / About & Bio", icon: User },
    { id: "experience" as SectionTab, label: "03 / Career Timeline", icon: Briefcase },
    { id: "education" as SectionTab, label: "04 / Academic Education", icon: GraduationCap },
    { id: "skills" as SectionTab, label: "05 / DevOps Capabilities", icon: Wrench },
    { id: "tools" as SectionTab, label: "06 / Tech Toolbox", icon: Cpu },
    { id: "process" as SectionTab, label: "07 / Pipeline Phases", icon: GitBranch },
    { id: "projects" as SectionTab, label: "08 / Infrastructure Projects", icon: FolderKanban },
    { id: "music" as SectionTab, label: "09 / Music Player", icon: Music },
    { id: "stats" as SectionTab, label: "10 / Metrics & SLA", icon: BarChart3 },
    { id: "github" as SectionTab, label: "11 / GitHub Activity", icon: Github },
    { id: "faq" as SectionTab, label: "12 / FAQ Section", icon: HelpCircle },
    { id: "awards" as SectionTab, label: "13 / Certifications", icon: Award },
    { id: "testimonials" as SectionTab, label: "14 / Endorsements", icon: MessageSquareQuote },
    { id: "cta" as SectionTab, label: "15 / Contact & CTA", icon: Mail },
    { id: "pipeline" as SectionTab, label: "16 / DevOps Pipeline", icon: GitBranch },
    { id: "progress" as SectionTab, label: "17 / Learning Progress", icon: TrendingUp },
    { id: "badges" as SectionTab, label: "18 / Digital Badges", icon: ShieldCheck },
  ];

  // Render Admin Login Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0d0f] text-[#f2f4f5] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#111418] border border-[#252a30] rounded-lg p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="size-10 rounded-md bg-[#161a1f] border border-[#252a30] text-[#00c896] mx-auto flex items-center justify-center font-bold">
              <Lock size={18} />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-[#f2f4f5]">
              Admin Authentication
            </h1>
            <p className="text-xs text-[#9aa1a9]">
              Enter security PIN to access the console
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9aa1a9] block">
                Security PIN
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(false);
                  }}
                  placeholder="Enter Security PIN"
                  className="w-full bg-[#0b0d0f] border border-[#252a30] focus:border-[#00c896] text-[#f2f4f5] px-3.5 py-2.5 rounded-md text-sm outline-none transition-all pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-medium flex items-center gap-2">
                <X size={14} />
                <span>Invalid Security PIN.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded-md bg-[#00c896] hover:bg-[#00b084] text-[#0b0d0f] font-semibold text-sm transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>{isLoggingIn ? "Verifying..." : "Authenticate & Enter Console"}</span>
            </button>
          </form>

          {/* Footer Back */}
          <div className="pt-2 text-center border-t border-[#252a30]">
            <Link
              href="/"
              className="text-xs text-[#9aa1a9] hover:text-[#f2f4f5] transition-colors inline-flex items-center gap-1.5"
            >
              ➔ Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans">
      {/* Save Toast */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 bg-surface border border-accent text-accent px-5 py-3 rounded-lg font-mono text-xs font-bold flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} className="text-accent" />
          <span>All Portfolio Data Saved & Synced to Database!</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-surface border-r border-border flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-14 px-4 border-b border-border flex items-center justify-between shrink-0 bg-surface-secondary">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
              ADMIN CONTROL PANEL
            </span>
            <h2 className="text-sm font-semibold text-foreground truncate">
              {state.hero.name || "Muhammad Nur Ashiddiqi"}
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-secondary hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav data-lenis-prevent className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          <div className="px-2 pb-2 text-[10px] text-muted uppercase tracking-wider font-mono font-bold">
            EDITOR SECTIONS (17 PANELS)
          </div>
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                  isActive
                    ? "bg-surface-secondary text-accent border border-border font-semibold"
                    : "text-secondary hover:text-foreground hover:bg-surface-secondary border border-transparent"
                }`}
              >
                <Icon size={14} className={isActive ? "text-accent" : "text-secondary"} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border space-y-2 text-xs bg-surface-secondary">
          <div className="flex items-center justify-between px-2.5 py-1 bg-surface rounded-md border border-border text-[10px] text-secondary font-mono">
            <span>DATABASE SYNC</span>
            <span className="text-accent font-bold flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-accent" />
              ONLINE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border bg-surface hover:bg-surface-secondary text-secondary hover:text-foreground rounded-md text-xs font-medium transition-colors"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md transition-colors cursor-pointer"
              title="Lock Console / Logout"
            >
              <LogOut size={14} />
            </button>

            <button
              onClick={() => {
                if (confirm("Reset portfolio back to default data?")) {
                  resetAll();
                }
              }}
              className="p-2 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-md transition-colors cursor-pointer"
              title="Reset All Data"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-14 border-b border-border bg-surface px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-secondary hover:text-foreground p-1 cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xs font-semibold text-foreground uppercase tracking-wide truncate flex items-center gap-2">
              <span className="text-muted font-mono">SECTION:</span>
              <span className="bg-surface-secondary border border-border px-2 py-0.5 rounded-md text-accent font-mono">
                {navMenuItems.find((m) => m.id === activeTab)?.label}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={triggerSave}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-accent-text rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
            >
              <Save size={14} />
              <span>Save & Sync</span>
            </button>
          </div>
        </header>

        {/* Modular Canvas */}
        <main data-lenis-prevent className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-background">
          {activeTab === "overview" && (
            <OverviewEditor items={navMenuItems.slice(1)} onSelectTab={(tab) => setActiveTab(tab as SectionTab)} />
          )}

          {activeTab === "hero" && (
            <HeroEditor data={heroData} onChange={(data) => setHeroData(data)} />
          )}

          {activeTab === "about" && (
            <AboutEditor data={aboutData} onChange={(data) => setAboutData(data)} />
          )}

          {activeTab === "experience" && (
            <ExperienceEditor data={experienceData} onChange={(data) => setExperienceData(data)} />
          )}

          {activeTab === "education" && (
            <EducationEditor data={educationData} onChange={(data) => setEducationData(data)} />
          )}

          {activeTab === "skills" && (
            <SkillsEditor data={skillsData} onChange={(data) => setSkillsData(data)} />
          )}

          {activeTab === "tools" && (
            <ToolsEditor data={toolsData} onChange={(data) => setToolsData(data)} />
          )}

          {activeTab === "process" && (
            <ProcessEditor data={processData} onChange={(data) => setProcessData(data)} />
          )}

          {activeTab === "projects" && (
            <ProjectsEditor data={projectsData} onChange={(data) => setProjectsData(data)} />
          )}

          {activeTab === "music" && (
            <MusicEditor data={musicData} onChange={(data) => setMusicData(data)} />
          )}

          {activeTab === "stats" && (
            <StatsEditor items={statsData} onChange={(items) => setStatsData(items)} />
          )}

          {activeTab === "github" && (
            <GithubEditor data={githubData} onChange={(data) => setGithubData(data)} />
          )}

          {activeTab === "faq" && (
            <FaqEditor data={faqData} onChange={(data) => setFaqData(data)} />
          )}

          {activeTab === "awards" && (
            <AwardsEditor items={awards} onChange={(items) => setAwards(items)} />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsEditor data={testimonialsData} onChange={(data) => setTestimonialsData(data)} />
          )}

          {activeTab === "cta" && (
            <CtaEditor data={ctaData} onChange={(data) => setCtaData(data)} />
          )}

          {activeTab === "pipeline" && (
            <PipelineEditor stages={pipelineData} onChange={(stages) => setPipelineData(stages)} />
          )}

          {activeTab === "progress" && (
            <ProgressEditor items={progressData} onChange={(items) => setProgressData(items)} />
          )}

          {activeTab === "badges" && (
            <BadgesEditor items={badgesData} onChange={(items) => setBadgesData(items)} />
          )}
        </main>
      </div>
    </div>
  );
}
