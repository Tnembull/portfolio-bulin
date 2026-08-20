import { createClient } from "@supabase/supabase-js";
import { PortfolioState } from "@/context/PortfolioContext";

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://suvppsdiekwqccgrcnem.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_xzUlqjxHa9MvsBsCNRYxDg_dbT0ybvH";

export const supabase = createClient(supabaseUrl, supabaseKey);

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
 * Verify Admin Security PIN via Supabase
 */
export async function verifyAdminPinFromSupabase(inputPin: string): Promise<boolean> {
  // Hardcoded default fallback PINs for instant setup
  const validDefaults = ["@Dikidiki224", "Dikidiki##224", "BulinDev**!!", "BulinDev!###2026"];
  if (validDefaults.includes(inputPin.trim())) {
    return true;
  }

  try {
    const { data, error } = await supabase
      .from("admin_credentials")
      .select("pin_code")
      .eq("id", "master_pin")
      .single();

    if (!error && data && data.pin_code) {
      return data.pin_code === inputPin.trim();
    }
  } catch {}

  return false;
}

/**
 * Update Admin Security PIN in Supabase
 */
export async function updateAdminPinInSupabase(newPin: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("admin_credentials").upsert(
      {
        id: "master_pin",
        pin_code: newPin.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    return !error;
  } catch {
    return false;
  }
}
