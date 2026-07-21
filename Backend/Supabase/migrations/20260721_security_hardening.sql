-- =============================================================================
-- SAINT INK TATTOO — Security Hardening Migration
-- File   : 20260721_security_hardening.sql
-- Stage  : SDLC Stage 5 — Debugging & Optimization (Security Patch)
-- Mode   : Manual execution via Supabase Dashboard → SQL Editor
-- Dibuat : 2026-07-21
-- =============================================================================
-- INSTRUKSI:
--   1. Buka https://supabase.com/dashboard → pilih project kamu
--   2. Navigasi ke SQL Editor
--   3. Paste seluruh isi file ini, lalu klik "Run" (atau Ctrl+Enter)
--   4. PENTING: Setelah migrasi, set app_metadata pada admin user:
--      - Buka Authentication → Users → pilih admin → Edit
--      - Set app_metadata: {"role": "admin"}
--   5. PENTING: Disable Sign-Up di Authentication → Settings
-- =============================================================================


-- =============================================================================
-- BAGIAN 1: HELPER FUNCTION — is_admin()
-- =============================================================================
-- Fungsi ini memeriksa apakah user yang sedang login memiliki
-- app_metadata.role = 'admin' di dalam JWT token-nya.
--
-- Mengapa auth.uid() IS NOT NULL saja TIDAK CUKUP:
--   Supabase Auth secara default mengizinkan sign-up publik.
--   Siapapun yang mendaftar dan login akan menjadi 'authenticated',
--   sehingga mendapat akses CRUD penuh jika policy hanya mengecek uid.
--
-- Dengan is_admin(), hanya user yang secara EKSPLISIT diberi
-- app_metadata {"role": "admin"} oleh super-admin (via Dashboard atau
-- service_role API) yang memiliki hak kelola data.
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
-- BAGIAN 2: DROP SEMUA POLICY ADMIN YANG NAIF
-- =============================================================================
-- Menghapus 15 policy admin lama yang menggunakan kondisi
-- ((SELECT auth.uid()) IS NOT NULL) — kondisi yang terlalu permisif.
-- =============================================================================

-- Modul 1: Studio Profile
DROP POLICY IF EXISTS "admin_can_manage_studio_profile"    ON public.studio_profile;
DROP POLICY IF EXISTS "admin_can_manage_location"          ON public.location;
DROP POLICY IF EXISTS "admin_can_manage_contact_information" ON public.contact_information;
DROP POLICY IF EXISTS "admin_can_manage_operating_hours"    ON public.operating_hours;

-- Modul 2: Layanan
DROP POLICY IF EXISTS "admin_can_manage_service_category"  ON public.service_category;
DROP POLICY IF EXISTS "admin_can_manage_service"           ON public.service;
DROP POLICY IF EXISTS "admin_can_manage_service_price"     ON public.service_price;
DROP POLICY IF EXISTS "admin_can_manage_service_image"     ON public.service_image;

-- Modul 3: Galeri
DROP POLICY IF EXISTS "admin_can_manage_gallery_category"  ON public.gallery_category;
DROP POLICY IF EXISTS "admin_can_manage_gallery_photo"     ON public.gallery_photo;

-- Modul 4: FAQ & After Care
DROP POLICY IF EXISTS "admin_can_manage_faq_category"      ON public.faq_category;
DROP POLICY IF EXISTS "admin_can_manage_faq"               ON public.faq;
DROP POLICY IF EXISTS "admin_can_manage_after_care"        ON public.after_care;

-- Modul 5: Contact Message
DROP POLICY IF EXISTS "admin_can_read_contact_message"     ON public.contact_message;
DROP POLICY IF EXISTS "admin_can_update_contact_message"   ON public.contact_message;
DROP POLICY IF EXISTS "admin_can_delete_contact_message"   ON public.contact_message;


-- =============================================================================
-- BAGIAN 3: RE-CREATE SEMUA POLICY ADMIN DENGAN is_admin()
-- =============================================================================
-- Setiap policy sekarang menggunakan public.is_admin() yang memeriksa
-- app_metadata.role = 'admin', bukan hanya auth.uid() IS NOT NULL.
-- =============================================================================

-- ---- Modul 1: Studio Profile ----

CREATE POLICY "admin_can_manage_studio_profile"
  ON public.studio_profile FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_location"
  ON public.location FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_contact_information"
  ON public.contact_information FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_operating_hours"
  ON public.operating_hours FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---- Modul 2: Layanan ----

CREATE POLICY "admin_can_manage_service_category"
  ON public.service_category FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_service"
  ON public.service FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_service_price"
  ON public.service_price FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_service_image"
  ON public.service_image FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---- Modul 3: Galeri ----

CREATE POLICY "admin_can_manage_gallery_category"
  ON public.gallery_category FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_gallery_photo"
  ON public.gallery_photo FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---- Modul 4: FAQ & After Care ----

CREATE POLICY "admin_can_manage_faq_category"
  ON public.faq_category FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_faq"
  ON public.faq FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_manage_after_care"
  ON public.after_care FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---- Modul 5: Contact Message (Pengecualian Khusus) ----

CREATE POLICY "admin_can_read_contact_message"
  ON public.contact_message FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "admin_can_update_contact_message"
  ON public.contact_message FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "admin_can_delete_contact_message"
  ON public.contact_message FOR DELETE TO authenticated
  USING (public.is_admin());


-- =============================================================================
-- BAGIAN 4: DATABASE-LEVEL CONSTRAINT — Pertahanan Berlapis
-- =============================================================================
-- Constraint ini menjadi "pertahanan terakhir" di level database,
-- bahkan jika validasi Edge Function dibypass (misal via direct API call).
-- =============================================================================

-- Batasi panjang kolom phone pada tabel contact_message (max 20 karakter)
ALTER TABLE public.contact_message
  ADD CONSTRAINT chk_contact_message_phone_length
  CHECK (phone IS NULL OR length(phone) <= 20);

-- Batasi panjang kolom subject (max 200 karakter)
ALTER TABLE public.contact_message
  ADD CONSTRAINT chk_contact_message_subject_length
  CHECK (subject IS NULL OR length(subject) <= 200);

-- Batasi panjang kolom name (max 100 karakter)
ALTER TABLE public.contact_message
  ADD CONSTRAINT chk_contact_message_name_length
  CHECK (length(name) <= 100);

-- Batasi panjang kolom message (max 5000 karakter)
ALTER TABLE public.contact_message
  ADD CONSTRAINT chk_contact_message_message_length
  CHECK (length(message) <= 5000);


-- =============================================================================
-- VERIFIKASI (jalankan setelah migration berhasil)
-- =============================================================================
-- Query 1: Cek fungsi is_admin() terdaftar
-- SELECT proname, prosrc FROM pg_proc WHERE proname = 'is_admin';

-- Query 2: Cek semua policy sudah menggunakan is_admin()
-- SELECT schemaname, tablename, policyname, qual, with_check
-- FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, cmd;

-- Query 3: Cek constraint baru pada contact_message
-- SELECT conname, pg_get_constraintdef(oid)
-- FROM pg_constraint
-- WHERE conrelid = 'public.contact_message'::regclass;
-- =============================================================================
