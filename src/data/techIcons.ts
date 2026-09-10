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
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    aliases: ["container", "containers"],
  },
  {
    name: "Kubernetes",
    slug: "kubernetes",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
    aliases: ["k8s"],
  },
  {
    name: "AWS",
    slug: "aws",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    aliases: ["amazon", "amazon web services", "cloud"],
  },
  {
    name: "Google Cloud",
    slug: "googlecloud",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    aliases: ["gcp"],
  },
  {
    name: "Azure",
    slug: "azure",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    aliases: ["microsoft azure"],
  },
  {
    name: "Terraform",
    slug: "terraform",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    aliases: ["iac"],
  },
  {
    name: "Ansible",
    slug: "ansible",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg",
  },
  {
    name: "Jenkins",
    slug: "jenkins",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
    aliases: ["ci/cd"],
  },
  {
    name: "Nginx",
    slug: "nginx",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    aliases: ["webserver", "proxy"],
  },
  {
    name: "Apache",
    slug: "apache",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg",
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
    aliases: ["cdn", "dns"],
  },
  {
    name: "Linux",
    slug: "linux",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    aliases: ["os", "kernel"],
  },
  {
    name: "Ubuntu",
    slug: "ubuntu",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
  },
  {
    name: "Debian",
    slug: "debian",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg",
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
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
    aliases: ["monitoring", "metrics"],
  },
  {
    name: "Grafana",
    slug: "grafana",
    category: "devops",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
    aliases: ["dashboard", "observability"],
  },

  // --- Languages ---
  {
    name: "TypeScript",
    slug: "typescript",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    aliases: ["ts"],
  },
  {
    name: "JavaScript",
    slug: "javascript",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    aliases: ["js"],
  },
  {
    name: "Python",
    slug: "python",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    aliases: ["py"],
  },
  {
    name: "Golang",
    slug: "go",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    aliases: ["go"],
  },
  {
    name: "Rust",
    slug: "rust",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
  },
  {
    name: "PHP",
    slug: "php",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "Java",
    slug: "java",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "Kotlin",
    slug: "kotlin",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Swift",
    slug: "swift",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
  },
  {
    name: "Dart",
    slug: "dart",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  },
  {
    name: "C++",
    slug: "cplusplus",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    aliases: ["cpp"],
  },
  {
    name: "C#",
    slug: "csharp",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    aliases: ["c#", "dotnet"],
  },
  {
    name: "Bash",
    slug: "bash",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
    aliases: ["shell", "sh"],
  },
  {
    name: "HTML5",
    slug: "html5",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    aliases: ["html"],
  },
  {
    name: "CSS3",
    slug: "css3",
    category: "languages",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    aliases: ["css"],
  },

  // --- Frameworks & Libraries ---
  {
    name: "Next.js",
    slug: "nextjs",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    aliases: ["next.js", "react"],
  },
  {
    name: "React",
    slug: "react",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    aliases: ["reactjs"],
  },
  {
    name: "Node.js",
    slug: "nodejs",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    aliases: ["node"],
  },
  {
    name: "Vue.js",
    slug: "vuejs",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    aliases: ["vue"],
  },
  {
    name: "Svelte",
    slug: "svelte",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
  },
  {
    name: "Laravel",
    slug: "laravel",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "CodeIgniter",
    slug: "codeigniter",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain.svg",
    aliases: ["ci"],
  },
  {
    name: "Django",
    slug: "django",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
  },
  {
    name: "FastAPI",
    slug: "fastapi",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "Express",
    slug: "express",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    aliases: ["expressjs"],
  },
  {
    name: "NestJS",
    slug: "nestjs",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    aliases: ["tailwind"],
  },
  {
    name: "Flutter",
    slug: "flutter",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
  {
    name: "GraphQL",
    slug: "graphql",
    category: "frameworks",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  },

  // --- Databases & Storage ---
  {
    name: "PostgreSQL",
    slug: "postgresql",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    aliases: ["postgres", "sql"],
  },
  {
    name: "MySQL",
    slug: "mysql",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    aliases: ["sql"],
  },
  {
    name: "Redis",
    slug: "redis",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    aliases: ["cache", "in-memory"],
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    aliases: ["nosql"],
  },
  {
    name: "SQLite",
    slug: "sqlite",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
  },
  {
    name: "Supabase",
    slug: "supabase",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    aliases: ["postgres", "baas"],
  },
  {
    name: "Firebase",
    slug: "firebase",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    name: "Elasticsearch",
    slug: "elasticsearch",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg",
    aliases: ["elk"],
  },
  {
    name: "Apache Kafka",
    slug: "apachekafka",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
    aliases: ["kafka", "queue"],
  },
  {
    name: "Prisma",
    slug: "prisma",
    category: "database",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    aliases: ["orm"],
  },

  // --- Tools & Analytics ---
  {
    name: "Git",
    slug: "git",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    aliases: ["vcs"],
  },
  {
    name: "GitHub",
    slug: "github",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "GitLab",
    slug: "gitlab",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
  },
  {
    name: "VS Code",
    slug: "vscode",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  {
    name: "Postman",
    slug: "postman",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    aliases: ["api"],
  },
  {
    name: "Jupyter",
    slug: "jupyter",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
    aliases: ["notebook"],
  },
  {
    name: "Anaconda",
    slug: "anaconda",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg",
    aliases: ["conda"],
  },
  {
    name: "Vite",
    slug: "vite",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    aliases: ["vitejs"],
  },
  {
    name: "Bun",
    slug: "bun",
    category: "tools",
    iconUrl: "https://api.iconify.design/simple-icons:bun.svg",
  },
  {
    name: "Figma",
    slug: "figma",
    category: "tools",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
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

  // 2. Devicon direct convention fallback
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${clean}/${clean}-original.svg`;
}
