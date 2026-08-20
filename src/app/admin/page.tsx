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
import { Mail } from "lucide-react";

type SectionTab =
  | "overview"
  | "hero"
  | "about"
  | "experience"
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
    { id: "skills" as SectionTab, label: "04 / DevOps Capabilities", icon: Wrench },
    { id: "tools" as SectionTab, label: "05 / Tech Toolbox", icon: Cpu },
    { id: "process" as SectionTab, label: "06 / Pipeline Phases", icon: GitBranch },
    { id: "projects" as SectionTab, label: "07 / Infrastructure Projects", icon: FolderKanban },
    { id: "music" as SectionTab, label: "08 / Music Player", icon: Music },
    { id: "stats" as SectionTab, label: "09 / Metrics & SLA", icon: BarChart3 },
    { id: "github" as SectionTab, label: "10 / GitHub Activity", icon: Github },
    { id: "faq" as SectionTab, label: "11 / FAQ Section", icon: HelpCircle },
    { id: "awards" as SectionTab, label: "12 / Certifications", icon: Award },
    { id: "testimonials" as SectionTab, label: "13 / Endorsements", icon: MessageSquareQuote },
    { id: "cta" as SectionTab, label: "14 / Contact & CTA", icon: Mail },
    { id: "pipeline" as SectionTab, label: "15 / DevOps Pipeline", icon: GitBranch },
    { id: "progress" as SectionTab, label: "16 / Learning Progress", icon: TrendingUp },
    { id: "badges" as SectionTab, label: "17 / Digital Badges", icon: ShieldCheck },
  ];

  // Render Admin Login Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="dark min-h-screen bg-[#19131a] text-[#e7e9db] font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#2f1e2e] border border-[#483145] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="scanline-overlay absolute inset-0 pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="size-12 rounded-2xl bg-[#48b685]/15 border border-[#48b685]/40 text-[#48b685] mx-auto flex items-center justify-center font-bold">
              <Lock size={22} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#e7e9db]">
              [ ADMIN CONSOLE ]
            </h1>
            <p className="text-xs text-[#a392a3]">
              Restricted Area • Authentication Required
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#48b685] tracking-wider block">
                SECURITY PIN / ACCESS KEY
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
                  className="w-full bg-[#19131a] border border-[#483145] focus:border-[#48b685] text-[#e7e9db] px-3.5 py-2.5 rounded-xl text-sm font-mono outline-none transition-all pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a392a3] hover:text-[#48b685] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {pinError && (
              <div className="p-3 rounded-lg border border-[#ef6155]/40 bg-[#ef6155]/10 text-[#ef6155] text-xs font-bold flex items-center gap-2">
                <X size={15} />
                <span>Access Denied: Invalid Security PIN.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl border border-[#48b685] bg-[#48b685] text-[#19131a] font-extrabold text-xs uppercase tracking-wider hover:bg-[#48b685]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(72,182,133,0.3)] flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              <span>Authenticate & Enter Console</span>
            </button>
          </form>

          {/* Footer Back */}
          <div className="pt-2 text-center border-t border-[#483145] relative z-10">
            <Link
              href="/"
              className="text-xs text-[#a392a3] hover:text-[#48b685] transition-colors font-bold inline-flex items-center gap-1.5"
            >
              ➔ Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark flex h-screen overflow-hidden bg-[#19131a] text-[#e7e9db] font-mono">
      {/* Cyber Toast */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#2f1e2e] text-[#48b685] px-5 py-3 rounded-xl font-mono text-xs font-bold flex items-center gap-2 shadow-2xl border border-[#48b685]/50 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} className="text-[#48b685]" />
          <span>[ SUCCESS ] All Portfolio Matrix Data Saved!</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#2f1e2e] border-r border-[#483145] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-14 px-4 border-b border-[#483145] flex items-center justify-between shrink-0 bg-muted/20">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#48b685]">
              [ ADMIN_CONTROL_TERMINAL ]
            </span>
            <h2 className="text-sm font-bold text-slate-100 font-mono truncate">
              {state.hero.name || "MUHAMMAD NUR ASHIDDIQI"}
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#48b685] hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav data-lenis-prevent className="flex-1 overflow-y-auto p-3 space-y-1 font-mono text-xs">
          <div className="px-2 pb-2 text-[10px] text-[#a392a3] uppercase tracking-wider font-bold italic">
            MODULAR_EDITOR_NODES (17 PANELS)
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
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#48b685]/20 text-[#48b685] border border-[#48b685] font-bold"
                    : "text-[#e7e9db]/80 hover:text-white hover:bg-[#48b685]/10 hover:border-[#48b685]/30 border border-transparent"
                }`}
              >
                <Icon size={14} className={isActive ? "text-[#48b685]" : "text-[#48b685]"} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#483145] space-y-2 font-mono text-xs bg-muted/20">
          <div className="flex items-center justify-between px-2.5 py-1 bg-[#19131a] rounded-md border border-[#483145] text-[10px] text-[#a392a3]">
            <span>[ SYSTEM_STATUS ]</span>
            <span className="text-[#48b685] font-bold flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-[#48b685] animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#48b685]/30 bg-[#48b685]/10 hover:bg-[#48b685]/20 text-[#48b685] rounded-lg font-semibold transition-all"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all cursor-pointer"
              title="Lock Console / Logout"
            >
              <LogOut size={14} />
            </button>

            <button
              onClick={() => {
                if (confirm("Reset portfolio back to default DevOps data?")) {
                  resetAll();
                }
              }}
              className="p-2 border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg transition-all cursor-pointer"
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
        <header className="h-14 border-b border-[#483145] bg-[#2f1e2e] px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#48b685] hover:text-white p-1"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xs font-bold text-[#48b685] uppercase tracking-wide truncate flex items-center gap-2">
              <span className="text-[#a392a3]">SECTION:</span>
              <span className="bg-[#48b685]/10 border border-[#48b685]/30 px-2 py-0.5 rounded-md text-[#48b685]">
                {navMenuItems.find((m) => m.id === activeTab)?.label}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={triggerSave}
              className="px-4 py-1.5 bg-[#48b685]/20 text-[#48b685] border border-[#48b685] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#48b685]/30 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <Save size={14} className="text-[#48b685]" />
              <span>Save Matrix</span>
            </button>
          </div>
        </header>

        {/* Modular Canvas */}
        <main data-lenis-prevent className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-[#07090e]">
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
