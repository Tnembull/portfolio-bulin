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

export const PROJECTS: Project[] = [];
