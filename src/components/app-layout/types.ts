export type TabType = "home" | "experience" | "projects" | "skills" | "contact";

export interface NavTabItem {
  id: TabType;
  label: string;
  shortLabel: string;
  iconName: "Home" | "Briefcase" | "FolderGit2" | "Cpu" | "Send";
  badge?: string;
}

export const NAV_TABS: NavTabItem[] = [
  { id: "home", label: "Home", shortLabel: "Home", iconName: "Home" },
  { id: "experience", label: "Experience", shortLabel: "Exp", iconName: "Briefcase" },
  { id: "projects", label: "Projects", shortLabel: "Projects", iconName: "FolderGit2" },
  { id: "skills", label: "Skills", shortLabel: "Skills", iconName: "Cpu" },
  { id: "contact", label: "Contact", shortLabel: "Contact", iconName: "Send" },
];
