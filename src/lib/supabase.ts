import { createClient } from "@supabase/supabase-js";
import { PortfolioState } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";

export interface PipelineStage {
  id: string;
  title: string;
  description?: string;
  status: "success" | "running" | "idle" | "failed";
  icon_name?: string;
  logs: string[];
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface LearningProgress {
  id: string;
  title: string;
  provider: string;
  progress_percent: number;
  target_date?: string;
  status: "in_progress" | "planned" | "completed";
  description?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface CertificationBadge {
  id: string;
  name: string;
  issuer: string;
  badge_image_url: string;
  verification_url?: string;
  issue_date?: string;
  is_featured: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

// Initialize Supabase client cleanly with safe placeholders during static compilation
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseKey || "placeholder-anon-key"
);

export const PORTFOLIO_ROW_ID = "main-portfolio";

/**
 * Fetch portfolio state from Supabase table `portfolio_data`
 */
export async function fetchPortfolioFromSupabase(): Promise<Partial<PortfolioState> | null> {
  try {
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("content")
      .eq("id", PORTFOLIO_ROW_ID)
      .single();

    if (error || !data) {
      return null;
    }

    return data.content as Partial<PortfolioState>;
  } catch {
    return null;
  }
}

/**
 * Save portfolio state to Supabase table `portfolio_data`
 */
export async function savePortfolioToSupabase(state: PortfolioState): Promise<boolean> {
  // If running on browser, route through server-side authenticated endpoint
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // Server-side direct upsert
  try {
    const { error } = await supabase.from("portfolio_data").upsert(
      {
        id: PORTFOLIO_ROW_ID,
        content: state,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    return !error;
  } catch {
    return false;
  }
}

/**
 * Fetch a single project by slug or ID from Supabase for dynamic SSR & Open Graph metadata
 */
export async function getProjectBySlugOrId(slugOrId: string): Promise<Project | null> {
  try {
    const portfolio = await fetchPortfolioFromSupabase();
    if (portfolio?.projects?.items?.length) {
      const match = portfolio.projects.items.find(
        (p) => p.slug === slugOrId || p.id === slugOrId
      );
      if (match) return match;
    }
  } catch { }

  const { PROJECTS } = await import("@/data/projects");
  return PROJECTS.find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
}

/**
 * Verify Admin Security PIN via server auth API
 */
export async function verifyAdminPinFromSupabase(inputPin: string): Promise<boolean> {
  const trimmed = inputPin.trim();
  if (!trimmed) return false;

  try {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: trimmed }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
