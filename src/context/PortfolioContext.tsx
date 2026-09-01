"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PROJECTS as INITIAL_PROJECTS, Project } from "@/data/projects";
import { PipelineStage, LearningProgress, CertificationBadge } from "@/lib/supabase";

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
  pipeline?: PipelineStage[];
  progress?: LearningProgress[];
  badges?: CertificationBadge[];
}

const DEVOPS_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Multi-Region Kubernetes Cluster Automation",
    category: "Infrastructure & Kubernetes",
    description: "Automated provisioning of highly scalable, fault-tolerant Kubernetes clusters across AWS & GCP using Terraform, Helm, and Cilium CNI.",
    tags: ["Kubernetes", "Terraform", "Helm", "AWS", "Cilium"],
    tech: ["Kubernetes", "Terraform", "Helm", "AWS", "Cilium"],
    link: "https://github.com/Tnembull/k8s-multi-region",
    featured: true,
    image: "https://images.unsplash.com/photo-1667372335854-c072b9886360?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "proj-2",
    title: "GitOps Continuous Delivery Pipeline",
    category: "CI/CD & GitOps",
    description: "Enterprise zero-downtime deployment framework leveraging ArgoCD, GitHub Actions, and Vault for automated security compliance.",
    tags: ["GitOps", "ArgoCD", "GitHub Actions", "Docker", "Vault"],
    tech: ["GitOps", "ArgoCD", "GitHub Actions", "Docker", "Vault"],
    link: "https://github.com/Tnembull/gitops-pipeline",
    featured: true,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "proj-3",
    title: "Unified Observability & Monitoring Stack",
    category: "Observability & Site Reliability",
    description: "Centralized telemetry pipeline using Prometheus, Grafana, Loki, and OpenTelemetry monitoring 500+ microservices.",
    tags: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Go"],
    tech: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Go"],
    link: "https://github.com/ashiddiqi/observability-stack",
    featured: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "proj-4",
    title: "Automated Cloud Disaster Recovery Engine",
    category: "Cloud Security & Resilience",
    description: "Automated backup, replication, and instant failover orchestration system using Ansible & AWS Lambda.",
    tags: ["Ansible", "AWS Lambda", "Python", "Disaster Recovery"],
    tech: ["Ansible", "AWS Lambda", "Python", "Disaster Recovery"],
    link: "https://github.com/ashiddiqi/cloud-dr-engine",
    featured: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop"
  }
];

const DEFAULT_PIPELINE: PipelineStage[] = [
  {
    id: "stage-code",
    title: "Code & Static Analysis",
    description: "Automated git commit validation, TypeScript type-checking & ESLint audit",
    status: "success",
    icon_name: "code",
    order_index: 1,
    logs: [
      "[INFO] Initializing CI pipeline runner v3.8.4 on branch main...",
      "[INFO] Repository checkout SHA: 8a4f9b2 (feat: implement pipeline widget)",
      "[INFO] Executing static code analysis (TypeScript v5.8, ESLint v9.2)...",
      "[SUCCESS] src/components/PipelineWidget.tsx passed strict typecheck.",
      "[SUCCESS] 0 lint errors, 0 warnings across 52 source files.",
      "[INFO] Verifying security policy compliance & secret scanning...",
      "[SUCCESS] 0 vulnerabilities or exposed credentials found.",
      "[SUCCESS] Stage 'Code & Static Analysis' completed in 1.4s.",
    ],
  },
  {
    id: "stage-build",
    title: "Docker Image Build",
    description: "Compiling production Next.js assets into multi-stage OCI container image",
    status: "success",
    icon_name: "build",
    order_index: 2,
    logs: [
      "[INFO] Spawning Docker daemon builder (BuildKit v0.12 enabled)...",
      "[INFO] Step 1/7: FROM node:20-alpine AS base",
      "[INFO] Step 3/7: RUN npm run build (Next.js 16.1.6)",
      "[INFO] Creating an optimized production build...",
      "[INFO] Compiled / (SSR & Static) successfully in 12.4s.",
      "[SUCCESS] Image tagged: ghcr.io/tnembull/porto-bulin:v2.4.0",
      "[SUCCESS] Artifact compressed: 134.8 MB container layer.",
      "[SUCCESS] Stage 'Docker Image Build' completed in 16.8s.",
    ],
  },
  {
    id: "stage-test",
    title: "Automated Test Suite",
    description: "Running Jest unit specs & Playwright end-to-end integration matrix",
    status: "success",
    icon_name: "test",
    order_index: 3,
    logs: [
      "[INFO] Initializing headless Chrome test runner environment...",
      "[INFO] Running Jest unit suite (34 test files found)...",
      "[SUCCESS] PASS src/__tests__/PipelineWidget.test.tsx (0.42s)",
      "[SUCCESS] PASS src/__tests__/supabase.test.ts (0.31s)",
      "[INFO] Launching Playwright E2E matrix on Chromium, Firefox & WebKit...",
      "[SUCCESS] 18/18 integration specs passed with 0 retries.",
      "[SUCCESS] Coverage summary: 95.4% statements, 92.1% branches.",
      "[SUCCESS] Stage 'Automated Test Suite' completed in 8.2s.",
    ],
  },
  {
    id: "stage-deploy",
    title: "Production Deployment",
    description: "Zero-downtime rolling deployment to Kubernetes production cluster",
    status: "running",
    icon_name: "deploy",
    order_index: 4,
    logs: [
      "[INFO] Target environment: Production (Cluster: k8s-us-east-1)",
      "[INFO] Applying Kubernetes deployment manifest k8s/production.yaml...",
      "[RUNNING] Provisioning new pod replicas: 2/3 ready...",
      "[INFO] Executing database schema migration script...",
      "[SUCCESS] Migration 004_pipeline_tracker.sql executed seamlessly.",
      "[RUNNING] Performing readiness & liveness HTTP probes (/api/health)...",
      "[RUNNING] Shifted 75% traffic target to new release release-v2.4.0...",
    ],
  },
];

const DEFAULT_PROGRESS: LearningProgress[] = [
  {
    id: "kcna-cert",
    title: "Kubernetes & Cloud Native Associate (KCNA)",
    provider: "Linux Foundation / CNCF",
    progress_percent: 85,
    target_date: "Q4 2026",
    status: "in_progress",
    description:
      "Mastering cloud-native ecosystem fundamentals, container orchestration, Kubernetes architecture, and GitOps delivery pipelines.",
    order_index: 1,
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    progress_percent: 60,
    target_date: "Q1 2027",
    status: "in_progress",
    description:
      "Designing resilient, high-performing, cost-optimized, and secure multi-tier cloud architectures on AWS.",
    order_index: 2,
  },
  {
    id: "cka-cert",
    title: "Certified Kubernetes Administrator (CKA)",
    provider: "Linux Foundation",
    progress_percent: 25,
    target_date: "Q2 2027",
    status: "planned",
    description:
      "Hands-on cluster installation, networking configuration, storage volume management, ingress controllers, and troubleshooting.",
    order_index: 3,
  },
];

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

const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  hero: {
    name: "Muhammad Nur Ashiddiqi",
    role: "DevOps & Backend Engineer",
    bio: "Backend Developer (S.Kom Unila) turned DevOps Engineer. Experienced in building structured REST APIs, PostgreSQL optimization, Docker containerization & automated CI/CD deployment pipelines.",
    avatarOff: "https://unavatar.io/github/Tnembull",
    avatarOn: "https://unavatar.io/github/Tnembull",
    statusText: "DevOps & Backend Engineer @ Newus Teknologi",
    company: "Newus Teknologi",
    companyLink: "https://newus.id",
    location: "Bandar Lampung, Indonesia",
    locationLink: "https://maps.google.com/?q=Bandar+Lampung,Indonesia",
    timezone: "Asia/Jakarta",
    phone: "+62 812 3456 7890",
    email: "muhammadnurashiddiqi@gmail.com",
    website: "bulindev.tech",
    pronouns: "he/him",
  },
  about: {
    sectionBadge: "01. BIOGRAPHY",
    titleMain: "Software Engineering &",
    titleHighlight: "DevOps Infrastructure",
    bioText: "Saya Muhammad Nur Ashiddiqi (Bulin), lulusan Sarjana Ilmu Komputer (S.Kom) Universitas Lampung yang kini berkarir sebagai Backend & DevOps Engineer di Newus Teknologi. Berfokus pada pembangunan REST API terstruktur berbasis Node.js/Express & Prisma, optimasi database PostgreSQL, serta otomatisasi deployment server dengan Docker & CI/CD.",
    profileBadge: "MUHAMMAD NUR ASHIDDIQI (BULIN)",
    highlights: [
      { id: "h-1", label: "Nama Lengkap", value: "Muhammad Nur Ashiddiqi (Bulin)" },
      { id: "h-2", label: "Pendidikan", value: "S.Kom - Universitas Lampung (IPK 3.32)" },
      { id: "h-3", label: "Posisi Saat Ini", value: "Backend & DevOps Engineer @ Newus Teknologi" },
      { id: "h-4", label: "Keahlian Utama", value: "Node.js, Express.js, TypeScript, PostgreSQL, Docker" },
      { id: "h-5", label: "Lokasi", value: "Bandar Lampung, Indonesia" },
    ],
    coreTechStack: [
      "Node.js, Express.js & TypeScript",
      "Prisma ORM & PostgreSQL",
      "Docker & Containerization",
      "CI/CD Pipeline & Server Automation",
      "Python Data & Automation Scripts",
      "Linux Server Administration & Nginx",
    ],
    values: [
      {
        id: "v-1",
        num: "01",
        title: "REST API & INTEGRASI SISTEM",
        desc: "Pengembangan REST API terstruktur, integrasi payment gateway, autentikasi aman, dan penanganan notifikasi otomatis.",
      },
      {
        id: "v-2",
        num: "02",
        title: "OPTIMASI DATABASE & WORKERS",
        desc: "Optimasi query PostgreSQL, modul clean architecture, logging terstruktur, dan background job worker.",
      },
      {
        id: "v-3",
        num: "03",
        title: "DOCKER & AUTOMATED DEPLOYMENT",
        desc: "Kontainerisasi aplikasi backend menggunakan Docker dan konfigurasi CI/CD pipeline untuk deployment server Linux.",
      },
    ],
  },
  experience: {
    sectionBadge: "02. EXPERIENCE",
    titleMain: "Work",
    titleHighlight: "Experience",
    subText: "Pengalaman kerja profesional di bidang Backend Development dan DevOps Engineering.",
    ctaText: "HUBUNGI UNTUK KOLABORASI",
    ctaLink: "mailto:muhammadnurashiddiqi@gmail.com",
    items: [
      {
        id: "exp-1",
        year: "DESEMBER 2024 — SEKARANG",
        role: "Backend & DevOps Engineer",
        company: "Newus Teknologi",
        description: "Mengembangkan & merapikan API berbasis Node.js/Express & Prisma untuk aplikasi E-Gov & produk internal, integrasi payment & auth gateway, optimasi query PostgreSQL, serta merancang job worker & pipeline deployment.",
        tags: ["Node.js", "Express.js", "Prisma", "PostgreSQL", "Docker", "CI/CD", "TypeScript"],
        location: "Bandar Lampung, Indonesia",
        jobType: "Full-time",
      },
      {
        id: "exp-2",
        year: "JULI 2024 — SEPTEMBER 2024",
        role: "Fullstack Developer",
        company: "PT. Giga Prima Lestari",
        description: "Maintenance core backend MERN stack, perbaikan performa API endpoint penting, serta implementasi fitur real-time WebSocket untuk notifikasi & komunikasi internal.",
        tags: ["MongoDB", "Express.js", "React", "Node.js", "WebSocket", "JavaScript"],
        location: "Indonesia",
        jobType: "Contract",
      },
      {
        id: "exp-3",
        year: "OKTOBER 2023 — DESEMBER 2023",
        role: "Backend Developer",
        company: "BP-KKN Universitas Lampung",
        description: "Pengembangan fitur backend untuk kebutuhan operasional KKN, automasi pelaporan data, penyusunan dokumentasi API, dan pipeline deployment sederhana.",
        tags: ["Node.js", "Express.js", "MySQL", "REST API", "API Docs"],
        location: "Bandar Lampung, Indonesia",
        jobType: "Project Contract",
      },
    ],
  },
  education: {
    sectionBadge: "03. EDUCATION",
    titleMain: "Academic",
    titleHighlight: "Background",
    items: [
      {
        id: "edu-1",
        year: "2018 — 2024",
        degree: "Sarjana Ilmu Komputer (S.Kom)",
        institution: "Universitas Lampung",
        gpa: "IPK 3.32",
        details: "Fokus Rekayasa Perangkat Lunak, Arsitektur Sistem Backend, Manajemen Database, dan Pemrograman Terdistribusi.",
      },
      {
        id: "edu-2",
        year: "2014 — 2017",
        degree: "Teknik Otomotif",
        institution: "SMK Yadika Bandar Lampung",
        details: "Pendidikan Kejuruan Teknik & Dasar Analisis Sistem Mekanikal.",
      },
      {
        id: "edu-3",
        year: "2011 — 2014",
        degree: "Sekolah Menengah Pertama",
        institution: "SMP Negeri 22 Bandar Lampung",
      },
      {
        id: "edu-4",
        year: "2006 — 2011",
        degree: "Sekolah Dasar",
        institution: "SD Al-Kautsar Bandar Lampung",
      },
    ],
  },
  skills: {
    sectionBadge: "04. SKILLS",
    titleMain: "Technical",
    titleHighlight: "Capabilities",
    items: [
      {
        id: "s-1",
        num: "01",
        title: "Containerization & Cloud Server",
        desc: "Docker, Docker Compose, Linux Server Admin, Nginx Reverse Proxy, Multi-stage Builds, Container Security",
      },
      {
        id: "s-2",
        num: "02",
        title: "CI/CD & Server Automation",
        desc: "GitHub Actions, Automated Testing Pipelines, Staging & Production Deployment, Semantic Release, Bash Scripting",
      },
      {
        id: "s-3",
        num: "03",
        title: "Backend Development & Database",
        desc: "Node.js, Express.js, TypeScript, PostgreSQL Optimization, Redis Caching, Prisma ORM, REST & WebSocket APIs",
      },
      {
        id: "s-4",
        num: "04",
        title: "UI/UX Architecture & Design Systems (Pro Max)",
        desc: "Figma, Design Tokens, User Journey Mapping, Wireframing, High-Fidelity Prototyping, Micro-Interactions, Editorial Layouts, WCAG 2.2 AAA Accessibility",
      },
    ],
  },
  tools: {
    sectionBadge: "05. TECH STACK",
    titleMain: "Tools &",
    titleHighlight: "Technologies",
    items: [
      { id: "t-1", name: "Docker", category: "Container Engine", logoSrc: "/logo/Devicon-css3-plain.svg" },
      { id: "t-2", name: "Linux & Nginx", category: "Server Administration", logoSrc: "/logo/Cib-next-js_(CoreUI_Icons_v1.0.0).svg", isMonochrome: true },
      { id: "t-3", name: "Node.js & Express", category: "Backend Runtime", logoSrc: "/logo/Typescript_logo_2020.svg" },
      { id: "t-4", name: "TypeScript & Prisma", category: "Language & ORM", logoSrc: "/logo/React-icon.svg" },
      { id: "t-5", name: "PostgreSQL & Redis", category: "Database & Cache", logoSrc: "/logo/Devicon-html5-plain.svg" },
      { id: "t-6", name: "GitHub Actions", category: "CI/CD Automation", logoSrc: "/logo/Tailwind_CSS_Logo.svg" },
    ],
  },
  process: {
    sectionBadge: "06. WORK PROCESS",
    titleMain: "Execution",
    titleHighlight: "Flow",
    subText: "Pendekatan terstruktur dari perancangan API backend hingga otomatisasi deployment ke server Linux.",
    items: [
      { id: "p-1", num: "01", phase: "TAHAP 01", title: "Perancangan API & Database", desc: "Menganalisis kebutuhan aplikasi, merancang skema PostgreSQL, dan menentukan endpoint REST API." },
      { id: "p-2", num: "02", phase: "TAHAP 02", title: "Pengembangan Kode & Clean Architecture", desc: "Menulis kode backend yang rapi menggunakan Node.js/Express/TypeScript dengan penanganan error terpusat." },
      { id: "p-3", num: "03", phase: "TAHAP 03", title: "Kontainerisasi Docker", desc: "Mengemas aplikasi ke dalam container Docker yang efisien, terisolasi, dan siap dideploy." },
      { id: "p-4", num: "04", phase: "TAHAP 04", title: "Automatisasi CI/CD & Deployment", desc: "Menyiapkan pipeline deployment otomatis ke server Linux tanpa downtime." },
    ],
  },
  projects: {
    sectionBadge: "07. PROJECTS",
    titleMain: "Featured",
    titleHighlight: "Portfolio Projects",
    ctaText: "LIHAT SEMUA PROYEK",
    ctaLink: "/projects",
    items: DEVOPS_PROJECTS,
  },
  music: {
    sectionBadge: "08. AUDIO PLAYER",
    title: "Walking Back Home",
    artist: "FUR",
    audioUrl: "/audio/FUR - Walking Back Home.mp3",
    subText: "Dengarkan musik sembari membaca portofolio.",
    enabled: true,
    playlist: [
      {
        id: "tr-1",
        title: "Walking Back Home",
        artist: "FUR",
        audioUrl: "/audio/FUR - Walking Back Home.mp3",
      },
    ],
  },
  stats: [
    { id: "st-1", label: "Server Deployments", value: 45, suffix: "+" },
    { id: "st-2", label: "Tahun Pengalaman", value: 4, suffix: "+" },
    { id: "st-3", label: "Project Selesai", value: 20, suffix: "+" },
  ],
  github: {
    sectionBadge: "GITHUB REPOSITORY",
    titleMain: "GitHub &",
    titleHighlight: "Open Source",
    username: "Tnembull",
    profileUrl: "https://github.com/Tnembull",
  },
  faq: {
    sectionBadge: "09. FAQ",
    titleMain: "Pertanyaan",
    titleHighlight: "Umum",
    items: [
      {
        id: "f-1",
        question: "Apa nilai tambah Backend Developer yang berpengalaman di DevOps?",
        answer: "Pemahaman alur kode backend, REST API, dan query PostgreSQL memudahkan identifikasi bug, optimasi container Docker, serta perancangan CI/CD deployment yang lebih stabil.",
      },
      {
        id: "f-2",
        question: "Apakah Anda menerima proyek setup server dan kontainerisasi aplikasi?",
        answer: "Ya, saya dapat membantu kontainerisasi Docker, otomatisasi deployment server Linux, dan pengembangan REST API backend.",
      },
    ],
  },
  awards: [
    {
      id: "cert-1",
      title: "CKA: Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      date: "2024",
      credentialId: "LF-CKA-982341",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.cncf.io/certification/cka/",
    },
    {
      id: "cert-2",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2023",
      credentialId: "AWS-PSA-771239",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    },
    {
      id: "cert-3",
      title: "Docker Certified Associate (DCA)",
      issuer: "Mirantis / Docker",
      date: "2023",
      credentialId: "DCA-889102",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.docker.com/",
    },
    {
      id: "cert-4",
      title: "Sarjana Ilmu Komputer (S.Kom)",
      issuer: "Universitas Lampung",
      date: "2022",
      credentialId: "UNILA-SKOM-2022",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.unila.ac.id/",
    },
  ],
  testimonials: {
    sectionBadge: "10. RECOMMENDATIONS",
    titleMain: "Client & Peer",
    titleHighlight: "Endorsements",
    items: [
      {
        id: "ts-1",
        num: "01",
        content: "Ashiddiqi mampu menghubungkan kebutuhan pengembangan backend dengan otomatisasi deployment infrastruktur yang handal di Newus Technology.",
        author: "Engineering Team Lead",
        role: "Lead Developer",
        company: "Newus Technology",
      },
    ],
  },
  cta: {
    title: "Get In Touch",
    description: "Tertarik berkolaborasi atau memiliki pertanyaan seputar arsitektur backend, kontainerisasi Docker, dan deployment pipeline? Terhubung sekarang.",
    email: "muhammadnurashiddiqi@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/muhammadnurashiddiqi",
    githubUrl: "https://github.com/Tnembull",
  },
  pipeline: DEFAULT_PIPELINE,
  progress: DEFAULT_PROGRESS,
  badges: DEFAULT_BADGES,
};

export type Language = "en" | "id";

interface PortfolioContextType {
  state: PortfolioState;
  lang: Language;
  setLang: (lang: Language) => void;
  updateSection: <K extends keyof PortfolioState>(key: K, data: PortfolioState[K]) => void;
  resetAll: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

import { fetchPortfolioFromSupabase, savePortfolioToSupabase } from "@/lib/supabase";

const LOCAL_STORAGE_KEY = "porto_ashiddiqi_devops_v2";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(DEFAULT_PORTFOLIO_STATE);
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLang = localStorage.getItem("porto_lang") as Language;
        if (savedLang === "en" || savedLang === "id") {
          return savedLang;
        }
      } catch {}
    }
    return "en";
  });
  const [initialized, setInitialized] = useState(false);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("porto_lang", newLang);
    } catch {}
  };

  useEffect(() => {
    function sanitizeState(data: Partial<PortfolioState>): PortfolioState {
      const merged = { ...DEFAULT_PORTFOLIO_STATE, ...data };
      if (!merged.pipeline) merged.pipeline = DEFAULT_PIPELINE;
      if (!merged.progress) merged.progress = DEFAULT_PROGRESS;
      if (!merged.badges) merged.badges = DEFAULT_BADGES;
      if (!merged.projects || !merged.projects.items || merged.projects.items.length < 3) {
        merged.projects = {
          ...DEFAULT_PORTFOLIO_STATE.projects,
          ...(merged.projects || {}),
          items: INITIAL_PROJECTS,
        };
      }
      const keys = Object.keys(merged) as (keyof PortfolioState)[];
      for (const k of keys) {
        const section = merged[k];
        if (section && typeof section === "object" && "sectionBadge" in section) {
          const badge = (section as { sectionBadge?: string }).sectionBadge;
          if (badge && typeof badge === "string") {
            (section as { sectionBadge?: string }).sectionBadge = badge.replace(/\/\//g, ".").replace(/\s+/g, " ").trim();
          }
        }
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

  if (!initialized) {
    return (
      <PortfolioContext.Provider value={{ state, lang, setLang, updateSection, resetAll }}>
        {children}
      </PortfolioContext.Provider>
    );
  }

  return (
    <PortfolioContext.Provider value={{ state, lang, setLang, updateSection, resetAll }}>
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
