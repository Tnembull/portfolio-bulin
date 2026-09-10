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
  logo?: string;
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

export interface SkillPillItem {
  id: string;
  name: string;
  icon?: string;
}

export interface SkillsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: SkillItem[];
  pills?: SkillPillItem[];
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
  logo?: string;
  gpa?: string;
  details?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logoSrc?: string;
  industry?: string;
  url?: string;
}

export interface ClientsData {
  sectionBadge?: string;
  titleMain?: string;
  titleHighlight?: string;
  subText?: string;
  items: ClientItem[];
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
  clients?: ClientsData;
  seo?: SeoData;
  pipeline?: PipelineStage[];
  progress?: LearningProgress[];
  badges?: CertificationBadge[];
}

const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  "cta": {
    "email": "muhammadnurashiddiqi@gmail.com",
    "title": "Get In Touch",
    "githubUrl": "https://github.com/Tnembull",
    "description": "",
    "linkedinUrl": "https://www.linkedin.com/in/muhammadnurashiddiqi"
  },
  "faq": {
    "items": [],
    "titleMain": "Frequently Asked",
    "sectionBadge": "FAQ",
    "titleHighlight": "Questions"
  },
  "seo": {
    "ogImage": "https://media.bulindev.tech/uploads/1788369377840-og-image_opt.webp",
    "ogTitle": "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
    "keywords": "Muhammad Nur Ashiddiqi, DevOps Engineer, Backend Developer, Cloud Engineer, Kubernetes, Docker, Terraform, CI/CD, GitHub Actions, Node.js, PostgreSQL",
    "metaTitle": "Muhammad Nur Ashiddiqi — DevOps & Backend Engineer",
    "faviconUrl": "https://media.bulindev.tech/uploads/1788351857850-34542.png",
    "canonicalUrl": "https://bulindev.tech",
    "ogDescription": "DevOps & Backend Engineer creating high availability cloud infrastructure, automated pipelines, and containerized backend systems.",
    "metaDescription": "Official portfolio of Muhammad Nur Ashiddiqi. DevOps & Backend Engineer specializing in REST APIs, PostgreSQL optimization, Kubernetes orchestration, Docker containerization, and automated CI/CD pipelines.",
    "appleTouchIconUrl": "https://media.bulindev.tech/uploads/1788351857850-34542.png",
    "googleAnalyticsId": "G-FC0GRRZXY3"
  },
  "hero": {
    "bio": "Backend Developer turned DevOps Engineer with hands-on experience building REST APIs, working with PostgreSQL, managing Docker containers, and setting up CI/CD pipelines for automated deployments.",
    "name": "Muhammad Nur Ashiddiqi",
    "role": "DevOps & Backend Engineer",
    "email": "muhammadnurashiddiqi@gmail.com",
    "phone": "+62 813 7788 6296",
    "company": "Newus Technology",
    "website": "bulindev.tech",
    "avatarOn": "https://avatars.githubusercontent.com/u/43430326?v=4",
    "location": "Bandar Lampung, Indonesia",
    "pronouns": "",
    "timezone": "Asia/Jakarta",
    "avatarOff": "https://avatars.githubusercontent.com/u/43430326?v=4",
    "statusText": "Available for collaboration",
    "companyLink": "https://newus.id",
    "locationLink": ""
  },
  "about": {
    "values": [],
    "bioText": "",
    "titleMain": "Engineering &",
    "highlights": [],
    "profileBadge": "",
    "sectionBadge": "BIOGRAPHY",
    "coreTechStack": [],
    "titleHighlight": "Architecture"
  },
  "music": {
    "title": "",
    "artist": "",
    "enabled": false,
    "subText": "",
    "audioUrl": "",
    "playlist": [],
    "sectionBadge": "AUDIO PLAYER"
  },
  "stats": [],
  "tools": {
    "items": [],
    "titleMain": "Tools &",
    "sectionBadge": "TECH STACK",
    "titleHighlight": "Technologies"
  },
  "awards": [],
  "badges": [],
  "github": {
    "username": "Tnembull",
    "titleMain": "GitHub &",
    "profileUrl": "https://github.com/Tnembull",
    "sectionBadge": "GITHUB",
    "titleHighlight": "Open Source"
  },
  "skills": {
    "items": [
      {
        "id": "s-1788356187230",
        "num": "01",
        "desc": "Building and maintaining REST APIs with Node.js, Express, Prisma, and Django, focusing on authentication, integrations, and reliable backend services.",
        "title": "Backend Engineering & API Development"
      },
      {
        "id": "s-1788356328026",
        "num": "02",
        "desc": "Containerizing applications with Docker and building CI/CD pipelines for automated testing, builds, and deployments across staging and production environments.",
        "title": "Docker, CI/CD & Deployment"
      },
      {
        "id": "s-1788356328515",
        "num": "03",
        "desc": "Optimizing Database queries, managing database schemas and migrations, and improving application performance, reliability, and resource usage.",
        "title": "Database & Performance Optimization"
      },
      {
        "id": "s-1788356328940",
        "num": "04",
        "desc": "Applying security practices such as authentication, authorization, secure API configuration, environment management, access control, and basic application hardening.",
        "title": "Application Security"
      },
      {
        "id": "s-1788356329663",
        "num": "05",
        "desc": "Monitoring application and server health, analyzing logs and resource usage, troubleshooting production issues, and maintaining system reliability.",
        "title": "Monitoring & System Reliability"
      }
    ],
    "pills": [
      { "id": "p-1", "name": "Next.js", "icon": "nextjs" },
      { "id": "p-2", "name": "Typescript", "icon": "typescript" },
      { "id": "p-3", "name": "Node.js", "icon": "nodejs" },
      { "id": "p-4", "name": "Python", "icon": "python" },
      { "id": "p-5", "name": "Anaconda", "icon": "anaconda" },
      { "id": "p-6", "name": "Jupyter", "icon": "jupyter" },
      { "id": "p-7", "name": "PHP", "icon": "php" },
      { "id": "p-8", "name": "MySQL", "icon": "mysql" },
      { "id": "p-9", "name": "AWS", "icon": "aws" },
      { "id": "p-10", "name": "Laravel", "icon": "laravel" },
      { "id": "p-11", "name": "Codeigniter", "icon": "codeigniter" },
      { "id": "p-12", "name": "Postgres", "icon": "postgresql" },
      { "id": "p-13", "name": "Docker", "icon": "docker" },
      { "id": "p-14", "name": "Kubernetes", "icon": "kubernetes" },
      { "id": "p-15", "name": "Golang", "icon": "go" },
      { "id": "p-16", "name": "Parrot", "icon": "parrot" },
      { "id": "p-17", "name": "Redis", "icon": "redis" }
    ],
    "titleMain": "Technical",
    "sectionBadge": "SKILLS",
    "titleHighlight": "Capabilities"
  },
  "clients": {
    "items": [
      {
        "id": "client-1788887516343",
        "url": "https://drachen.id/",
        "name": "Drachen",
        "logoSrc": "https://media.bulindev.tech/uploads/1788887579983-ChatGPT_Image_Aug_28__2026__01_15_41_PM_opt.webp",
        "industry": "Software Development"
      },
      {
        "id": "client-1788887135579",
        "url": "https://berdikari.co/",
        "name": "Berdikari",
        "logoSrc": "https://berdikari.co/uploads/logo.png",
        "industry": "DevOps & Cloud Infrastructure"
      },
      {
        "id": "client-1788887013404",
        "url": "https://kupastuntas.co/",
        "name": "Kupas Tuntas",
        "logoSrc": "https://kupastuntas.co/uploads/kupastuntas/logo.png",
        "industry": "DevOps & Cloud Infrastructure"
      },
      {
        "id": "client-1788886913088",
        "url": "technocare.id",
        "name": "Technocare",
        "logoSrc": "https://technocare.id/technocare-logo.png",
        "industry": "Software Development"
      }
    ],
    "subText": "Selected companies, startups, and initiatives I've engineered solutions for.",
    "titleMain": "Organizations &",
    "sectionBadge": "COLLABORATIONS // CLIENTS",
    "titleHighlight": "Partners"
  },
  "process": {
    "items": [],
    "subText": "",
    "titleMain": "Execution",
    "sectionBadge": "WORK PROCESS",
    "titleHighlight": "Flow"
  },
  "pipeline": [],
  "progress": [],
  "projects": {
    "items": [
      {
        "id": "proj-1788366502488",
        "link": "https://github.com/Tnembull/enterprise-backup-system",
        "role": "DevOps Engineer",
        "slug": "enterprise-backup-system",
        "tech": [
          "Bash",
          "Linux",
          "Disaster Recovery",
          "DevOps",
          "Rclone",
          "CloudPanel",
          "Backup",
          "Ubuntu"
        ],
        "year": "2026",
        "image": "https://media.bulindev.tech/uploads/1788367633519-EBS_opt.webp",
        "title": "Enterprise Backup System",
        "client": "Personal Project",
        "impact": [
          "Automated backup coverage across websites, databases, server configurations, Docker environments, PM2 processes, and SSL/TLS certificates.",
          "Enabled scheduled daily backups through cron, reducing the need for manual backup execution.",
          "Improved backup integrity assurance through SHA256 checksum generation and verification.",
          "Enabled remote backup synchronization to Google Drive with configurable 30-day remote retention.",
          "Provided both interactive and command-line restore workflows for multiple infrastructure components."
        ],
        "liveUrl": "",
        "category": "DevOps & Infrastructure",
        "githubUrl": "",
        "solutions": [
          "Built modular Bash scripts for websites, databases, Nginx, CloudPanel, Docker, PM2, and SSL/TLS components, allowing each backup operation to be managed independently.",
          "Implemented flock-based process locking, strict Bash error handling, structured logging, and SHA256 checksum verification to improve backup reliability and integrity.",
          "Added gzip/pigz compression, optional GPG encryption, configurable retention policies, and rclone-based synchronization to Google Drive for remote backup storage.",
          "Developed a dedicated restore engine with interactive and CLI modes for recovering databases, websites, Nginx, SSL, Docker, and CloudPanel data."
        ],
        "challenges": [
          "Backing up different application stacks and infrastructure components requires handling multiple file structures, databases, and service configurations.",
          "Backup processes must protect data integrity while avoiding duplicate or conflicting backup operations.",
          "Large backup archives need to be compressed, transferred to remote storage, and verified without making the process difficult to maintain.",
          "A backup system is only useful if the stored data can be reliably restored when needed."
        ],
        "description": "A modular Bash-based backup and restore system for automating VPS data protection, database backups, server configuration backups, and remote storage synchronization.",
        "longDescription": "Enterprise Backup System is a modular Bash-based backup and restore toolkit designed for production VPS environments running Ubuntu Server 24.04 LTS.\n\nThe system automates backups for websites, databases, server configurations, Docker environments, PM2 processes, and SSL/TLS certificates. It supports MySQL, MariaDB, and PostgreSQL databases and can automatically discover supported application and infrastructure components.\n\nTo improve backup reliability, the system includes compressed archives, optional GPG encryption, SHA256 integrity verification, configurable retention policies, process locking, structured logging, and automated synchronization to Google Drive using rclone.\n\nThe project also includes a dedicated restore engine that supports both interactive and command-line recovery for databases, websites, Nginx, SSL certificates, Docker, and CloudPanel environments.\n"
      },
      {
        "id": "proj-1788365366634",
        "link": "https://github.com/Tnembull/InfraShield",
        "role": "DevOps Engineer",
        "slug": "infrashield",
        "tech": [
          "Bash",
          "Linux",
          "Ubuntu",
          "Security Hardening",
          "Prometheus",
          "Docker",
          "Grafana",
          "Loki",
          "UFW",
          "Fail2ban",
          "Nginx"
        ],
        "year": "2026",
        "image": "https://media.bulindev.tech/uploads/1788365484708-Infrashield_opt.webp",
        "title": "InfraShield",
        "client": "Personal Project",
        "impact": [
          "Automated the provisioning and hardening of Ubuntu 24.04 LTS VPS environments through a single modular framework.",
          "Standardized security configuration across multiple infrastructure components, including SSH, UFW, Fail2ban, Auditd, Docker, and Nginx.",
          "Reduced the risk of configuration loss by introducing automatic backups and transactional rollback capabilities.",
          "Improved infrastructure visibility through integrated monitoring, logging, auditing, and security scanning tools.",
          "Enabled both interactive and non-interactive provisioning workflows for manual administration and automated deployment environments."
        ],
        "liveUrl": "",
        "category": "DevSecOps & Infrastructure",
        "githubUrl": "",
        "solutions": [
          "Built a modular automation framework that standardizes server provisioning and security configuration into repeatable installation modules.",
          "Implemented configuration backups and a rollback mechanism to restore previous configurations when a module fails.",
          "Added dry-run and non-interactive execution modes to support safer testing and automated provisioning workflows.",
          "Integrated monitoring, audit logging, security scanning, and log management into the provisioning workflow to improve infrastructure visibility and maintenance."
        ],
        "challenges": [
          "Manually provisioning and securing a fresh VPS requires many repetitive configuration steps and can lead to inconsistent server baselines.",
          "Applying system-level security changes can introduce configuration errors or unexpected service failures.",
          "Infrastructure changes need to be validated before being applied to production systems.",
          "Security and infrastructure health require continuous visibility after the initial server setup."
        ],
        "description": "An enterprise-grade Bash automation framework for provisioning, security hardening, monitoring, and maintaining Ubuntu 24.04 LTS VPS environments.",
        "longDescription": "InfraShield is a modular DevSecOps framework designed to automate the provisioning, security hardening, monitoring, and maintenance of Ubuntu 24.04 LTS servers. The project was built to reduce repetitive manual configuration and provide a more consistent baseline when preparing VPS environments for production workloads.\n\nThe framework uses a modular architecture, allowing individual components to be executed independently or as part of a complete provisioning workflow. It includes system hardening, firewall configuration, SSH security, intrusion prevention, audit logging, malware scanning, web server hardening, SSL automation, Docker security, backup automation, security scanning, monitoring, and automated security updates.\n\nInfraShield also includes validation, configuration backups, dry-run execution, non-interactive automation, progress reporting, audit logs, and rollback mechanisms to make infrastructure changes safer and easier to manage."
      },
      {
        "id": "1788356514000",
        "link": "https://github.com/Tnembull/ndeploy",
        "role": "DevOps Engineer",
        "slug": "ndeploy",
        "tech": [
          "GitHub Actions",
          "CI/CD",
          "Deployment",
          "Linux",
          "Automation"
        ],
        "year": "2026",
        "image": "https://media.bulindev.tech/uploads/1788356863530-ndeploy_opt.webp",
        "title": "nDeploy",
        "client": "Personal Project",
        "impact": [
          "Reduced repetitive manual tasks involved in application deployment.",
          "Improved deployment consistency by using a standardized and repeatable workflow.",
          "Made deployment progress and failures easier to identify during troubleshooting.",
          "Created a reusable deployment workflow that can be adapted for different application environments."
        ],
        "category": "DevOps & Automation",
        "solutions": [
          "Designed an automated deployment workflow to standardize the deployment process and reduce unnecessary manual intervention.",
          "Structured the deployment workflow into repeatable steps so application releases can follow a consistent process from source code to server.",
          "Added structured deployment steps and logging to make deployment progress easier to inspect and troubleshoot when an error occurs."
        ],
        "challenges": [
          "Reducing repetitive manual steps during application deployment.",
          "Maintaining a consistent deployment process across different environments.",
          "Handling deployment failures and making troubleshooting easier."
        ],
        "description": "A lightweight deployment automation tool designed to simplify application deployment, reduce manual server tasks, and provide a consistent and repeatable deployment workflow.",
        "longDescription": "nDeploy is a personal DevOps project focused on simplifying the application deployment process. The project was built to reduce repetitive manual tasks when deploying applications to servers and to provide a more structured and consistent deployment workflow.\n\nThe project focuses on deployment automation, server-side workflows, and repeatable application delivery. It reflects my interest in improving the development-to-production process by reducing manual intervention and making deployments easier to manage and maintain.\n\nThrough nDeploy, I explored practical DevOps concepts such as deployment automation, CI/CD workflows, Linux server environments, and application delivery."
      }
    ],
    "ctaLink": "/projects",
    "ctaText": "View all projects",
    "titleMain": "Featured",
    "sectionBadge": "PROJECTS",
    "titleHighlight": "Projects"
  },
  "education": {
    "items": [
      {
        "id": "edu-1788356255960",
        "gpa": "IPK 3.50",
        "year": "2020 — 2024",
        "degree": "Sarjana Ilmu Komputer (S.Kom)",
        "details": "Fokus Rekayasa Perangkat Lunak, Arsitektur Sistem Backend...",
        "institution": "Universitas Lampung"
      },
      {
        "id": "edu-1788356229704",
        "gpa": "",
        "year": "2014 – 2017",
        "degree": "Automotive Engineering",
        "details": "Automotive Engineering, Vehicle Maintenance, and Basic Mechanical Systems",
        "institution": "Yadika Bandar Lampung Vocational School"
      }
    ],
    "titleMain": "Academic",
    "sectionBadge": "EDUCATION",
    "titleHighlight": "Background"
  },
  "experience": {
    "items": [
      {
        "id": "exp-1788355975265",
        "role": "Backend & DevOps Engineer",
        "tags": [
          "Node.js",
          "Express.js",
          "Prisma",
          "PostgreSQL",
          "Docker",
          "CI/CD",
          "TypeScript"
        ],
        "year": "December 2024 – Present",
        "company": "Newus Teknologi",
        "jobType": "Full-time",
        "location": "Bandar Lampung, Indonesia",
        "description": "Developed and improved Node.js, Express, and Prisma-based APIs for E-Gov applications and internal products, integrated payment and authentication gateways, optimized PostgreSQL queries, and built job workers and deployment pipelines to improve system stability and efficiency."
      },
      {
        "id": "exp-1788356015797",
        "role": "Fullstack Developer",
        "tags": [
          "React",
          "React Bootstrap",
          "Django",
          "Python",
          "MySQL"
        ],
        "year": "July 2024 – September 2024",
        "company": "PT. Giga Prima Lestari",
        "jobType": "Contract / On-site",
        "location": "Bandar Lampung, Indonesia",
        "description": "Developed and maintained an internal ERP system for an Internet Service Provider (ISP) using React, React Bootstrap, and Django. Built accounting modules to support financial management and daily business operations, while improving the overall application workflow."
      },
      {
        "id": "exp-1788356078766",
        "role": "Software Engineer",
        "tags": [
          "Laravel",
          "PHP",
          "WordPress",
          "Google Sheets",
          "OJS 3",
          "MySQL"
        ],
        "year": "October 2022 – December 2024",
        "company": "BP-KKN Universitas Lampung",
        "jobType": "Project Contract",
        "location": "Bandar Lampung, Indonesia",
        "description": "Managed and organized KKN participant data using Laravel and Google Sheets, including participant distribution and regional classification based on their local areas. Maintained the KKN profile website using WordPress and set up an OJS 3 platform for the Buguh Journal to support academic journal management and publication."
      }
    ],
    "ctaLink": "mailto:muhammadnurashiddiqi@gmail.com",
    "ctaText": "Get in touch",
    "subText": "",
    "titleMain": "Work",
    "sectionBadge": "EXPERIENCE",
    "titleHighlight": "Experience"
  },
  "testimonials": {
    "items": [],
    "titleMain": "Client & Peer",
    "sectionBadge": "TESTIMONIALS",
    "titleHighlight": "Endorsements"
  }
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
    } catch { }
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
        const isCompromised = supabaseData.hero?.name === "HACKED BY ATTACKER" ||
          (!supabaseData.projects?.items?.length && !supabaseData.experience?.items?.length);
        if (!isCompromised) {
          const cleanData = sanitizeState(supabaseData);
          setState(cleanData);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanData));
          } catch { }
          setInitialized(true);
          return;
        } else {
          console.warn("[SECURITY] Supabase portfolio_data contained invalid or compromised payload. Falling back to secure default state.");
        }
      }

      // 2. Fallback to localStorage
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const isCompromised = parsed.hero?.name === "HACKED BY ATTACKER" ||
            (!parsed.projects?.items?.length && !parsed.experience?.items?.length);
          if (!isCompromised) {
            const cleanData = sanitizeState(parsed);
            setState(cleanData);
            setInitialized(true);
            return;
          } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }
      } catch { }

      setState(DEFAULT_PORTFOLIO_STATE);
      setInitialized(true);
    }

    loadInitialState();
  }, []);

  const updateSection = <K extends keyof PortfolioState>(key: K, data: PortfolioState[K]) => {
    setState((prev) => {
      const updated = { ...prev, [key]: data };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch { }
      // Sync to Supabase in background
      savePortfolioToSupabase(updated);
      return updated;
    });
  };

  const resetAll = () => {
    setState(DEFAULT_PORTFOLIO_STATE);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch { }
    savePortfolioToSupabase(DEFAULT_PORTFOLIO_STATE);
  };

  const saveEntirePortfolio = async (newState: PortfolioState): Promise<boolean> => {
    setState(newState);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch { }
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
