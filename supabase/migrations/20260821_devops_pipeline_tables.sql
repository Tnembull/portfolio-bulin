-- Migration: DevOps Pipeline, Learning Progress, and Certification Badges tables
-- Date: 2026-08-21

-- 1. Pipeline Stages Table
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('success', 'running', 'idle', 'failed')),
  icon_name TEXT,
  logs TEXT[] NOT NULL DEFAULT '{}'::text[],
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Learning Progress Table
CREATE TABLE IF NOT EXISTS learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  target_date TEXT,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('in_progress', 'planned', 'completed')),
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Certification Badges Table
CREATE TABLE IF NOT EXISTS certification_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  badge_image_url TEXT NOT NULL,
  verification_url TEXT,
  issue_date TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certification_badges ENABLE ROW LEVEL SECURITY;

-- Public Select RLS Policies
CREATE POLICY "Public Select for pipeline_stages" ON pipeline_stages FOR SELECT USING (true);
CREATE POLICY "Public Select for learning_progress" ON learning_progress FOR SELECT USING (true);
CREATE POLICY "Public Select for certification_badges" ON certification_badges FOR SELECT USING (true);

-- Admin Write RLS Policies (Allow write for authenticated users & service role)
CREATE POLICY "Admin Write for pipeline_stages" ON pipeline_stages FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin Write for learning_progress" ON learning_progress FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin Write for certification_badges" ON certification_badges FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
