"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/data/projects";
import { PipelineStage, LearningProgress, CertificationBadge, fetchPortfolioFromSupabase, savePortfolioToSupabase } from "@/lib/supabase";

export interface HeroData {
  name: string;
  role: string;
  bio: string;
  avatarOff: string;
  avatarOn: string;
  statusText: string;
  company: string;
  companyLink: string;
  location: string;
  locationLink: string;
  timezone: string;
  phone: string;
  email: string;
  website: string;
  pronouns: string;
}

export interface ValueItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export interface HighlightItem {
  id: string;
  label: string;
  value: string;
}

export interface AboutData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  bioText: string;
  profileBadge: string;
  highlights: HighlightItem[];
  coreTechStack: string[];
  values: ValueItem[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  tags?: string[];
  location?: string;
  jobType?: string;
}

export interface ExperienceData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  subText: string;
  ctaText: string;
  ctaLink: string;
  items: ExperienceItem[];
}

export interface SkillItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export interface SkillsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: SkillItem[];
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  logoSrc: string;
  isMonochrome?: boolean;
}

export interface ToolsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: ToolItem[];
}

export interface ProcessStep {
  id: string;
  num: string;
  phase: string;
  title: string;
  desc: string;
}

export interface ProcessData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  subText: string;
  items: ProcessStep[];
}

export interface ProjectsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  ctaText: string;
  ctaLink: string;
  items: Project[];
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
}

export interface MusicData {
  sectionBadge: string;
  title: string;
  artist: string;
  audioUrl: string;
  subText: string;
  enabled: boolean;
  playlist?: TrackItem[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface GithubData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  username: string;
  profileUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: FaqItem[];
}

export interface AwardItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  image?: string;
  link?: string;
  credentialId?: string;
}

export interface TestimonialItem {
  id: string;
  num: string;
  content: string;
  author: string;
  role: string;
  company: string;
}

export interface TestimonialsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: TestimonialItem[];
}

export interface CtaData {
  title: string;
  description: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface EducationItem {
  id: string;
  year: string;
  degree: string;
  institution: string;
  gpa?: string;
  details?: string;
}

export interface EducationData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: EducationItem[];
}

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  faviconUrl: string;
  appleTouchIconUrl: string;
  googleAnalyticsId: string;
}

export interface PortfolioState {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceData;
  education: EducationData;
  skills: SkillsData;
  tools: ToolsData;
  process: ProcessData;
  projects: ProjectsData;
  music: MusicData;
  stats: StatItem[];
  github: GithubData;
  faq: FaqData;
  awards: AwardItem[];
  testimonials: TestimonialsData;
  cta: CtaData;
  seo?: SeoData;
  pipeline?: PipelineStage[];
  progress?: LearningProgress[];
  badges?: CertificationBadge[];
}

const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  hero: {
    name: "Muhammad Nur Ashiddiqi",
    role: "DevOps & Backend Engineer",
    bio: "",
    avatarOff: "/avatar.jpg",
    avatarOn: "/avatar.jpg",
    statusText: "Available for collaboration",
    company: "",
    companyLink: "",
    location: "Indonesia",
    locationLink: "",
    timezone: "Asia/Jakarta",
    phone: "",
    email: "muhammadnurashiddiqi@gmail.com",
    website: "bulindev.tech",
    pronouns: "",
  },
  about: {
    sectionBadge: "BIOGRAPHY",
    titleMain: "Engineering &",
    titleHighlight: "Architecture",
    bioText: "",
    profileBadge: "",
    highlights: [],
    coreTechStack: [],
    values: [],
  },
  experience: {
    sectionBadge: "EXPERIENCE",
    titleMain: "Work",
    titleHighlight: "Experience",
    subText: "",
    ctaText: "Get in touch",
    ctaLink: "mailto:muhammadnurashiddiqi@gmail.com",
    items: [],
  },
  education: {
    sectionBadge: "EDUCATION",
    titleMain: "Academic",
    titleHighlight: "Background",
    items: [],
  },
  skills: {
    sectionBadge: "SKILLS",
    titleMain: "Technical",
    titleHighlight: "Capabilities",
    items: [],
  },
  tools: {
    sectionBadge: "TECH STACK",
    titleMain: "Tools &",
    titleHighlight: "Technologies",
    items: [],
  },
  process: {
    sectionBadge: "WORK PROCESS",
    titleMain: "Execution",
    titleHighlight: "Flow",
    subText: "",
    items: [],
  },
  projects: {
    sectionBadge: "PROJECTS",
    titleMain: "Featured",
    titleHighlight: "Projects",
    ctaText: "View all projects",
    ctaLink: "/projects",
    items: [],
  },
  music: {
    sectionBadge: "AUDIO PLAYER",
    title: "",
    artist: "",
    audioUrl: "",
    subText: "",
    enabled: false,
    playlist: [],
  },
  stats: [],
  github: {
    sectionBadge: "GITHUB",
    titleMain: "GitHub &",
    titleHighlight: "Open Source",
    username: "Tnembull",
    profileUrl: "https://github.com/Tnembull",
  },
  faq: {
    sectionBadge: "FAQ",
    titleMain: "Frequently Asked",
    titleHighlight: "Questions",
    items: [],
  },
  awards: [],
  testimonials: {
    sectionBadge: "TESTIMONIALS",
    titleMain: "Client & Peer",
    titleHighlight: "Endorsements",
    items: [],
  },
  cta: {
    title: "Get In Touch",
    description: "",
    email: "muhammadnurashiddiqi@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/muhammadnurashiddiqi",
    githubUrl: "https://github.com/Tnembull",
  },
  seo: {
    metaTitle: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
    metaDescription: "Official portfolio of Muhammad Nur Ashiddiqi. DevOps & Backend Engineer specializing in REST APIs, PostgreSQL optimization, Kubernetes orchestration, Docker containerization, and automated CI/CD pipelines.",
    keywords: "Muhammad Nur Ashiddiqi, DevOps Engineer, Backend Developer, Cloud Engineer, Kubernetes, Docker, Terraform, CI/CD, GitHub Actions, Node.js, PostgreSQL",
    ogTitle: "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
    ogDescription: "DevOps & Backend Engineer creating high availability cloud infrastructure, automated pipelines, and containerized backend systems.",
    ogImage: "https://media.bulindev.tech/uploads/1788351777889-34541.png",
    canonicalUrl: "https://bulindev.tech",
    faviconUrl: "https://media.bulindev.tech/uploads/1788351857850-34542.png",
    appleTouchIconUrl: "https://media.bulindev.tech/uploads/1788351857850-34542.png",
    googleAnalyticsId: "G-FC0GRRZXY3",
  },
  pipeline: [],
  progress: [],
  badges: [],
};

export type Language = "en" | "id";

interface PortfolioContextType {
  state: PortfolioState;
  initialized: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
  updateSection: <K extends keyof PortfolioState>(key: K, data: PortfolioState[K]) => void;
  saveEntirePortfolio: (newState: PortfolioState) => Promise<boolean>;
  resetAll: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "porto_ashiddiqi_devops_v3";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(DEFAULT_PORTFOLIO_STATE);
  const [lang, setLangState] = useState<Language>("en");
  const [initialized, setInitialized] = useState(false);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("porto_lang", newLang);
    } catch {}
  };

  useEffect(() => {
    function sanitizeState(data: Partial<PortfolioState>): PortfolioState {
      const merged: PortfolioState = {
        ...DEFAULT_PORTFOLIO_STATE,
        ...data,
      };

      // Ensure array fields strictly use loaded arrays or default empty
      if (data.projects && Array.isArray(data.projects.items)) {
        merged.projects = {
          ...DEFAULT_PORTFOLIO_STATE.projects,
          ...data.projects,
          items: data.projects.items,
        };
      } else if (!merged.projects) {
        merged.projects = { ...DEFAULT_PORTFOLIO_STATE.projects, items: [] };
      }

      if (data.experience && Array.isArray(data.experience.items)) {
        merged.experience = {
          ...DEFAULT_PORTFOLIO_STATE.experience,
          ...data.experience,
          items: data.experience.items,
        };
      } else if (!merged.experience) {
        merged.experience = { ...DEFAULT_PORTFOLIO_STATE.experience, items: [] };
      }

      if (data.education && Array.isArray(data.education.items)) {
        merged.education = {
          ...DEFAULT_PORTFOLIO_STATE.education,
          ...data.education,
          items: data.education.items,
        };
      } else if (!merged.education) {
        merged.education = { ...DEFAULT_PORTFOLIO_STATE.education, items: [] };
      }

      if (data.skills && Array.isArray(data.skills.items)) {
        merged.skills = {
          ...DEFAULT_PORTFOLIO_STATE.skills,
          ...data.skills,
          items: data.skills.items,
        };
      } else if (!merged.skills) {
        merged.skills = { ...DEFAULT_PORTFOLIO_STATE.skills, items: [] };
      }

      if (data.awards && Array.isArray(data.awards)) {
        merged.awards = data.awards;
      } else {
        merged.awards = merged.awards || [];
      }

      if (data.badges && Array.isArray(data.badges)) {
        merged.badges = data.badges;
      } else {
        merged.badges = merged.badges || [];
      }

      if (data.progress && Array.isArray(data.progress)) {
        merged.progress = data.progress;
      } else {
        merged.progress = merged.progress || [];
      }

      if (data.pipeline && Array.isArray(data.pipeline)) {
        merged.pipeline = data.pipeline;
      } else {
        merged.pipeline = merged.pipeline || [];
      }

      if (data.seo) {
        merged.seo = {
          ...DEFAULT_PORTFOLIO_STATE.seo,
          ...data.seo,
        };
      } else {
        merged.seo = DEFAULT_PORTFOLIO_STATE.seo;
      }

      return merged;
    }

    async function loadInitialState() {
      // 1. Try loading from Supabase first
      const supabaseData = await fetchPortfolioFromSupabase();
      if (supabaseData) {
        const cleanData = sanitizeState(supabaseData);
        setState(cleanData);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanData));
        } catch {}
        setInitialized(true);
        return;
      }

      // 2. Fallback to localStorage
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const cleanData = sanitizeState(parsed);
          setState(cleanData);
        } else {
          setState(DEFAULT_PORTFOLIO_STATE);
        }
      } catch {
        setState(DEFAULT_PORTFOLIO_STATE);
      }
      setInitialized(true);
    }

    loadInitialState();
  }, []);

  const updateSection = <K extends keyof PortfolioState>(key: K, data: PortfolioState[K]) => {
    setState((prev) => {
      const updated = { ...prev, [key]: data };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      // Sync to Supabase in background
      savePortfolioToSupabase(updated);
      return updated;
    });
  };

  const resetAll = () => {
    setState(DEFAULT_PORTFOLIO_STATE);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
    savePortfolioToSupabase(DEFAULT_PORTFOLIO_STATE);
  };

  const saveEntirePortfolio = async (newState: PortfolioState): Promise<boolean> => {
    setState(newState);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch {}
    const success = await savePortfolioToSupabase(newState);
    return success;
  };

  return (
    <PortfolioContext.Provider value={{ state, initialized, lang, setLang, updateSection, saveEntirePortfolio, resetAll }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
