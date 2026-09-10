export interface TechIconEntry {
  name: string;
  slug: string;
  category: "devops" | "languages" | "frameworks" | "database" | "tools";
  iconUrl: string;
  aliases?: string[];
}

export const POPULAR_TECH_ICONS: TechIconEntry[] = [
  // --- DevOps & Cloud & OS ---
  {
    name: "Docker",
    slug: "docker",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:docker-icon.svg",
    aliases: ["container", "containers"],
  },
  {
    name: "Kubernetes",
    slug: "kubernetes",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:kubernetes.svg",
    aliases: ["k8s"],
  },
  {
    name: "AWS",
    slug: "aws",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:aws.svg",
    aliases: ["amazon", "amazon web services", "cloud"],
  },
  {
    name: "Google Cloud",
    slug: "googlecloud",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:google-cloud.svg",
    aliases: ["gcp"],
  },
  {
    name: "Azure",
    slug: "azure",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:microsoft-azure.svg",
    aliases: ["microsoft azure"],
  },
  {
    name: "Terraform",
    slug: "terraform",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:terraform-icon.svg",
    aliases: ["iac"],
  },
  {
    name: "Ansible",
    slug: "ansible",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:ansible.svg",
  },
  {
    name: "Jenkins",
    slug: "jenkins",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:jenkins.svg",
    aliases: ["ci/cd"],
  },
  {
    name: "Nginx",
    slug: "nginx",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:nginx.svg",
    aliases: ["webserver", "proxy"],
  },
  {
    name: "Apache",
    slug: "apache",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:apache.svg",
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:cloudflare.svg",
    aliases: ["cdn", "dns"],
  },
  {
    name: "Linux",
    slug: "linux",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:linux-tux.svg",
    aliases: ["os", "kernel"],
  },
  {
    name: "Ubuntu",
    slug: "ubuntu",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:ubuntu.svg",
  },
  {
    name: "Debian",
    slug: "debian",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:debian.svg",
  },
  {
    name: "Kali Linux",
    slug: "kalilinux",
    category: "devops",
    iconUrl: "https://api.iconify.design/simple-icons:kalilinux.svg",
    aliases: ["kali", "security"],
  },
  {
    name: "Parrot Security",
    slug: "parrot",
    category: "devops",
    iconUrl: "https://api.iconify.design/simple-icons:parrotsecurity.svg",
    aliases: ["parrot os", "security"],
  },
  {
    name: "Prometheus",
    slug: "prometheus",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:prometheus.svg",
    aliases: ["monitoring", "metrics"],
  },
  {
    name: "Grafana",
    slug: "grafana",
    category: "devops",
    iconUrl: "https://api.iconify.design/logos:grafana.svg",
    aliases: ["dashboard", "observability"],
  },

  // --- Languages ---
  {
    name: "TypeScript",
    slug: "typescript",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:typescript-icon.svg",
    aliases: ["ts"],
  },
  {
    name: "JavaScript",
    slug: "javascript",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:javascript.svg",
    aliases: ["js"],
  },
  {
    name: "Python",
    slug: "python",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:python.svg",
    aliases: ["py"],
  },
  {
    name: "Golang",
    slug: "go",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:go.svg",
    aliases: ["go"],
  },
  {
    name: "Rust",
    slug: "rust",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:rust.svg",
  },
  {
    name: "PHP",
    slug: "php",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:php.svg",
  },
  {
    name: "Java",
    slug: "java",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:java.svg",
  },
  {
    name: "Kotlin",
    slug: "kotlin",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:kotlin-icon.svg",
  },
  {
    name: "Swift",
    slug: "swift",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:swift.svg",
  },
  {
    name: "Dart",
    slug: "dart",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:dart.svg",
  },
  {
    name: "C++",
    slug: "cplusplus",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:c-plusplus.svg",
    aliases: ["cpp"],
  },
  {
    name: "C#",
    slug: "csharp",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:c-sharp.svg",
    aliases: ["c#", "dotnet"],
  },
  {
    name: "Bash",
    slug: "bash",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:bash-icon.svg",
    aliases: ["shell", "sh"],
  },
  {
    name: "HTML5",
    slug: "html5",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:html-5.svg",
    aliases: ["html"],
  },
  {
    name: "CSS3",
    slug: "css3",
    category: "languages",
    iconUrl: "https://api.iconify.design/logos:css-3.svg",
    aliases: ["css"],
  },

  // --- Frameworks & Libraries ---
  {
    name: "Next.js",
    slug: "nextjs",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:nextjs-icon.svg",
    aliases: ["next.js", "react"],
  },
  {
    name: "React",
    slug: "react",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:react.svg",
    aliases: ["reactjs"],
  },
  {
    name: "Node.js",
    slug: "nodejs",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:nodejs-icon.svg",
    aliases: ["node"],
  },
  {
    name: "Vue.js",
    slug: "vuejs",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:vue.svg",
    aliases: ["vue"],
  },
  {
    name: "Svelte",
    slug: "svelte",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:svelte-icon.svg",
  },
  {
    name: "Laravel",
    slug: "laravel",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:laravel.svg",
  },
  {
    name: "CodeIgniter",
    slug: "codeigniter",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:codeigniter-icon.svg",
    aliases: ["ci"],
  },
  {
    name: "Django",
    slug: "django",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:django-icon.svg",
  },
  {
    name: "FastAPI",
    slug: "fastapi",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:fastapi-icon.svg",
  },
  {
    name: "Express",
    slug: "express",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:express.svg",
    aliases: ["expressjs"],
  },
  {
    name: "NestJS",
    slug: "nestjs",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:nestjs.svg",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:tailwindcss-icon.svg",
    aliases: ["tailwind"],
  },
  {
    name: "Flutter",
    slug: "flutter",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:flutter.svg",
  },
  {
    name: "GraphQL",
    slug: "graphql",
    category: "frameworks",
    iconUrl: "https://api.iconify.design/logos:graphql.svg",
  },

  // --- Databases & Storage ---
  {
    name: "PostgreSQL",
    slug: "postgresql",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:postgresql.svg",
    aliases: ["postgres", "sql"],
  },
  {
    name: "MySQL",
    slug: "mysql",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:mysql.svg",
    aliases: ["sql"],
  },
  {
    name: "Redis",
    slug: "redis",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:redis.svg",
    aliases: ["cache", "in-memory"],
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:mongodb-icon.svg",
    aliases: ["nosql"],
  },
  {
    name: "SQLite",
    slug: "sqlite",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:sqlite.svg",
  },
  {
    name: "Supabase",
    slug: "supabase",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:supabase-icon.svg",
    aliases: ["postgres", "baas"],
  },
  {
    name: "Firebase",
    slug: "firebase",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:firebase.svg",
  },
  {
    name: "Elasticsearch",
    slug: "elasticsearch",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:elasticsearch.svg",
    aliases: ["elk"],
  },
  {
    name: "Apache Kafka",
    slug: "apachekafka",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:kafka-icon.svg",
    aliases: ["kafka", "queue"],
  },
  {
    name: "Prisma",
    slug: "prisma",
    category: "database",
    iconUrl: "https://api.iconify.design/logos:prisma.svg",
    aliases: ["orm"],
  },

  // --- Tools & Analytics ---
  {
    name: "Git",
    slug: "git",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:git-icon.svg",
    aliases: ["vcs"],
  },
  {
    name: "GitHub",
    slug: "github",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:github-icon.svg",
  },
  {
    name: "GitLab",
    slug: "gitlab",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:gitlab.svg",
  },
  {
    name: "VS Code",
    slug: "vscode",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:visual-studio-code.svg",
  },
  {
    name: "Postman",
    slug: "postman",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:postman-icon.svg",
    aliases: ["api"],
  },
  {
    name: "Jupyter",
    slug: "jupyter",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:jupyter.svg",
    aliases: ["notebook"],
  },
  {
    name: "Anaconda",
    slug: "anaconda",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:anaconda-icon.svg",
    aliases: ["conda"],
  },
  {
    name: "Vite",
    slug: "vite",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:vitejs.svg",
    aliases: ["vitejs"],
  },
  {
    name: "Bun",
    slug: "bun",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:bun.svg",
  },
  {
    name: "Figma",
    slug: "figma",
    category: "tools",
    iconUrl: "https://api.iconify.design/logos:figma.svg",
  },
];

export function searchTechIcons(query: string, categoryFilter?: string): TechIconEntry[] {
  const q = query.toLowerCase().trim();

  let list = POPULAR_TECH_ICONS;
  if (categoryFilter && categoryFilter !== "all") {
    list = list.filter((item) => item.category === categoryFilter);
  }

  if (!q) return list;

  return list.filter((item) => {
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.slug.toLowerCase().includes(q)) return true;
    if (item.aliases?.some((a) => a.toLowerCase().includes(q))) return true;
    return false;
  });
}

export function resolveTechIconUrl(nameOrSlug: string, override?: string): string {
  if (override && (override.startsWith("http://") || override.startsWith("https://") || override.startsWith("/"))) {
    return override;
  }

  const clean = (override || nameOrSlug).toLowerCase().trim().replace(/[\s\.]+/g, "");

  // 1. Direct match in popular list
  const found = POPULAR_TECH_ICONS.find(
    (item) =>
      item.slug.toLowerCase() === clean ||
      item.name.toLowerCase().replace(/[\s\.]+/g, "") === clean ||
      item.aliases?.some((a) => a.toLowerCase().replace(/[\s\.]+/g, "") === clean)
  );

  if (found) return found.iconUrl;

  // 2. Iconify logos or simple-icons fallback
  return `https://api.iconify.design/logos:${clean}.svg`;
}
