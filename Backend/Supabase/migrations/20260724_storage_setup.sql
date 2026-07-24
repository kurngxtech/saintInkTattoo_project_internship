-- =============================================================================
-- SAINT INK TATTOO — Storage Buckets & RLS Migration
-- File   : 20260724_storage_setup.sql
-- Stage  : SDLC Stage 3 — Executing Phase (Storage Configuration)
-- Mode   : Manual execution via Supabase Dashboard → SQL Editor
-- Dibuat : 2026-07-24
-- =============================================================================
-- INSTRUKSI:
--   1. Buka https://supabase.com/dashboard → pilih project kamu
--   2. Navigasi ke SQL Editor
--   3. Paste seluruh isi file ini, lalu klik "Run" (atau Ctrl+Enter)
--   4. Verifikasi di Storage: 3 bucket harus muncul (gallery, studio, services)
--   5. Verifikasi di Authentication → Policies: RLS policies pada storage.objects
--
-- PRASYARAT:
--   - Migration 20260721_security_hardening.sql sudah dijalankan
--     (karena policies menggunakan fungsi public.is_admin())
-- =============================================================================


-- =============================================================================
-- HELPER FUNCTION: is_admin() (Diperlukan untuk RLS Storage)
-- =============================================================================
-- Membuat fungsi is_admin() jika belum ada untuk menghindari error dependency.
-- Fungsi ini memeriksa apakah user terautentikasi memiliki role 'admin'.
-- =============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- Berikan hak akses EXECUTE ke role authenticated
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;


-- =============================================================================
-- BAGIAN 1: MEMBUAT STORAGE BUCKETS
-- =============================================================================
-- Supabase Storage menyimpan metadata bucket di tabel storage.buckets.
-- Kita membuat 3 bucket publik (public = true) agar gambar bisa diakses
-- langsung via URL oleh pengunjung website tanpa autentikasi.
--
-- Catatan: "public = true" hanya berarti URL file bisa diakses tanpa token.
-- Operasi UPLOAD/DELETE tetap dikontrol oleh RLS policies di storage.objects.
-- =============================================================================

-- 1. Bucket: gallery
-- Menyimpan foto portofolio karya tato (galeri)
-- Referensi tabel: gallery_photo.image_url, gallery_photo.thumbnail_url
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  2097152,  -- 2MB dalam bytes (2 * 1024 * 1024)
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Bucket: studio
-- Menyimpan aset studio (logo, ikon kontak, dan aset visual profil)
-- Referensi tabel: studio_profile.logo_url
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'studio',
  'studio',
  true,
  2097152,  -- 2MB dalam bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Bucket: services
-- Menyimpan gambar layanan dan cover foto layanan
-- Referensi tabel: service_image.image_url
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'services',
  'services',
  true,
  2097152,  -- 2MB dalam bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;


-- =============================================================================
-- BAGIAN 2: RLS POLICIES — PUBLIC READ (SELECT) UNTUK SEMUA BUCKET
-- =============================================================================
-- Pengunjung website (role anon) dan admin (role authenticated) keduanya
-- harus bisa MELIHAT/MENGUNDUH gambar dari storage.
-- Policy ini memungkinkan akses baca publik ke ketiga bucket.
-- =============================================================================

-- ---- Bucket: gallery ----
CREATE POLICY "public_can_read_gallery"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery');

-- ---- Bucket: studio ----
CREATE POLICY "public_can_read_studio"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'studio');

-- ---- Bucket: services ----
CREATE POLICY "public_can_read_services"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'services');


-- =============================================================================
-- BAGIAN 3: RLS POLICIES — ADMIN-ONLY WRITE (INSERT/UPDATE/DELETE)
-- =============================================================================
-- Hanya authenticated users yang memiliki app_metadata.role = 'admin'
-- (divalidasi oleh fungsi public.is_admin()) yang diizinkan mengunggah,
-- memperbarui, atau menghapus file dari storage.
--
-- Ini mencegah:
--   - Pengunjung anonim mengunggah file berbahaya
--   - User terdaftar tanpa role admin memanipulasi aset gambar
-- =============================================================================

-- ---- Bucket: gallery (INSERT) ----
CREATE POLICY "admin_can_upload_gallery"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'gallery'
    AND public.is_admin()
  );

-- ---- Bucket: gallery (UPDATE) ----
CREATE POLICY "admin_can_update_gallery"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'gallery'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'gallery'
    AND public.is_admin()
  );

-- ---- Bucket: gallery (DELETE) ----
CREATE POLICY "admin_can_delete_gallery"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'gallery'
    AND public.is_admin()
  );

-- ---- Bucket: studio (INSERT) ----
CREATE POLICY "admin_can_upload_studio"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'studio'
    AND public.is_admin()
  );

-- ---- Bucket: studio (UPDATE) ----
CREATE POLICY "admin_can_update_studio"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'studio'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'studio'
    AND public.is_admin()
  );

-- ---- Bucket: studio (DELETE) ----
CREATE POLICY "admin_can_delete_studio"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'studio'
    AND public.is_admin()
  );

-- ---- Bucket: services (INSERT) ----
CREATE POLICY "admin_can_upload_services"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'services'
    AND public.is_admin()
  );

-- ---- Bucket: services (UPDATE) ----
CREATE POLICY "admin_can_update_services"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'services'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'services'
    AND public.is_admin()
  );

-- ---- Bucket: services (DELETE) ----
CREATE POLICY "admin_can_delete_services"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'services'
    AND public.is_admin()
  );


-- =============================================================================
-- VERIFIKASI (jalankan setelah migration berhasil)
-- =============================================================================
-- Query 1: Cek bucket sudah terdaftar
-- SELECT id, name, public, file_size_limit, allowed_mime_types
-- FROM storage.buckets
-- WHERE id IN ('gallery', 'studio', 'services');
--
-- Query 2: Cek semua storage policies terdaftar
-- SELECT policyname, cmd, roles, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'storage' AND tablename = 'objects'
-- ORDER BY policyname;
-- =============================================================================
