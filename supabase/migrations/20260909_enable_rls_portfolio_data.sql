-- Migration: Clean and Harden RLS on portfolio_data
-- PENTING: Hapus policy "Allow public insert update" yang menyebabkan penyerang masih bisa menulis!

ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- 1. HAPUS SEMUA POLICY LAMA / TIDAK AMAN
DROP POLICY IF EXISTS "Allow public insert update" ON portfolio_data;
DROP POLICY IF EXISTS "Allow public read access" ON portfolio_data;
DROP POLICY IF EXISTS "public read portfolio" ON portfolio_data;
DROP POLICY IF EXISTS "Public Select for portfolio_data" ON portfolio_data;
DROP POLICY IF EXISTS "public read" ON portfolio_data;
DROP POLICY IF EXISTS "no anon insert" ON portfolio_data;
DROP POLICY IF EXISTS "no anon update" ON portfolio_data;
DROP POLICY IF EXISTS "no anon delete" ON portfolio_data;
DROP POLICY IF EXISTS "admin service_role write" ON portfolio_data;
DROP POLICY IF EXISTS "Allow service_role full access" ON portfolio_data;

-- 2. HANYA IZINKAN BACA (SELECT) UNTUK PUBLIK
-- Siapa pun boleh melihat portofolio di website
CREATE POLICY "Allow public read access" 
ON portfolio_data 
FOR SELECT 
TO public 
USING (true);

-- 3. HANYA IZINKAN TULIS/UBAH (INSERT, UPDATE, DELETE) UNTUK SERVICE_ROLE (SERVER)
-- Karena RLS secara default memblokir SEMUA operasi yang tidak memiliki policy,
-- dengan hanya mengizinkan 'service_role', maka anon/publik OTOMATIS DIBLOKIR 100%!
CREATE POLICY "Allow service_role full access" 
ON portfolio_data 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
