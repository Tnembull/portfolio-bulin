export interface Project {
  id: string;
  slug?: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  tech?: string[];
  tags?: string[];
  image: string;
  year?: string;
  client?: string;
  role?: string;
  url?: string;
  link?: string;
  featured?: boolean;
  challenges?: string[];
  solutions?: string[];
  impact?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "k8s-multi-region-cluster-automation",
    title: "Multi-Region Kubernetes Cluster Automation",
    category: "Infrastructure & Kubernetes",
    description: "Automated provisioning of highly scalable, fault-tolerant Kubernetes clusters across AWS & GCP using Terraform, Helm, and Cilium CNI.",
    tags: ["Kubernetes", "Terraform", "Helm", "AWS", "Cilium"],
    tech: ["Kubernetes", "Terraform", "Helm", "AWS", "Cilium"],
    link: "https://github.com/ashiddiqi/k8s-multi-region",
    featured: true,
    image: "https://images.unsplash.com/photo-1667372335854-c072b9886360?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    client: "Cloud Scale Architecture",
    role: "DevOps Engineer"
  },
  {
    id: "proj-2",
    slug: "gitops-continuous-delivery-pipeline",
    title: "GitOps Continuous Delivery Pipeline",
    category: "CI/CD & GitOps",
    description: "Enterprise zero-downtime deployment framework leveraging ArgoCD, GitHub Actions, and Vault for automated security compliance.",
    tags: ["GitOps", "ArgoCD", "GitHub Actions", "Docker", "Vault"],
    tech: ["GitOps", "ArgoCD", "GitHub Actions", "Docker", "Vault"],
    link: "https://github.com/ashiddiqi/gitops-pipeline",
    featured: true,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
    client: "Enterprise Systems",
    role: "Senior DevOps Engineer"
  },
  {
    id: "proj-3",
    slug: "unified-observability-monitoring-stack",
    title: "Unified Observability & Monitoring Stack",
    category: "Observability & Site Reliability",
    description: "Centralized telemetry pipeline using Prometheus, Grafana, Loki, and OpenTelemetry monitoring 500+ microservices.",
    tags: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Go"],
    tech: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Go"],
    link: "https://github.com/ashiddiqi/observability-stack",
    featured: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
    client: "Distributed Cloud Platform",
    role: "SRE Specialist"
  },
  {
    id: "proj-4",
    slug: "cloud-native-security-compliance-mesh",
    title: "Cloud-Native Security & Compliance Mesh",
    category: "Infrastructure & Security",
    description: "Automated vulnerability scanning, runtime threat detection, and IAM policy enforcement across cloud workloads.",
    tags: ["Trivy", "Falco", "OPA Gatekeeper", "AWS GuardDuty", "Kubernetes"],
    tech: ["Trivy", "Falco", "OPA Gatekeeper", "AWS GuardDuty", "Kubernetes"],
    link: "https://github.com/ashiddiqi/security-mesh",
    featured: true,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
    client: "Fintech Enterprise",
    role: "DevSecOps Architect"
  }
];