export type TabType = "home" | "experience" | "projects" | "skills" | "contact";

export interface NavTabItem {
  id: TabType;
  label: string;
  shortLabel: string;
  href: string;
  iconName: "Home" | "Briefcase" | "FolderGit2" | "Cpu" | "Send";
  badge?: string;
}

export const NAV_TABS: NavTabItem[] = [
  { id: "home", label: "Home", shortLabel: "Home", href: "/", iconName: "Home" },
  { id: "experience", label: "Experience", shortLabel: "Exp", href: "/experience", iconName: "Briefcase" },
  { id: "projects", label: "Projects", shortLabel: "Projects", href: "/projects", iconName: "FolderGit2" },
  { id: "skills", label: "Skills", shortLabel: "Skills", href: "/skills", iconName: "Cpu" },
  { id: "contact", label: "Contact", shortLabel: "Contact", href: "/contact", iconName: "Send" },
];
