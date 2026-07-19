-- =============================================================================
-- SAINT INK TATTOO — Database Migration
-- File   : 20260719_init_schema.sql
-- Stage  : SDLC Stage 2 — System & Database Architecture
-- Mode   : Manual execution via Supabase Dashboard → SQL Editor
-- Dibuat : 2026-07-19
-- =============================================================================
-- INSTRUKSI:
--   1. Buka https://supabase.com/dashboard → pilih project kamu
--   2. Navigasi ke SQL Editor
--   3. Paste seluruh isi file ini, lalu klik "Run" (atau Ctrl+Enter)
--   4. Verifikasi di Table Editor: 14 tabel harus muncul semua
-- =============================================================================

-- -----------------------------------------------------------------------------
-- HELPER: Auto-update `updated_at` timestamp
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


-- =============================================================================
-- MODUL 1: STUDIO PROFILE
-- =============================================================================

-- 1.1 studio_profile
-- Satu baris = satu profil studio (singleton pattern untuk CMS)
CREATE TABLE IF NOT EXISTS public.studio_profile (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  tagline     TEXT,
  description TEXT,
  logo_url    TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_studio_profile_updated_at
  BEFORE UPDATE ON public.studio_profile
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 1.2 location
-- Informasi lokasi fisik studio
CREATE TABLE IF NOT EXISTS public.location (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_profile_id UUID        NOT NULL REFERENCES public.studio_profile(id) ON DELETE CASCADE,
  address_line      TEXT        NOT NULL,
  city              TEXT        NOT NULL,
  province          TEXT,
  postal_code       TEXT,
  maps_url          TEXT,
  maps_embed_url    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_location_updated_at
  BEFORE UPDATE ON public.location
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 1.3 contact_information
-- Berbagai jenis kontak (phone, whatsapp, email, instagram, tiktok, dll.)
CREATE TABLE IF NOT EXISTS public.contact_information (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_profile_id UUID        NOT NULL REFERENCES public.studio_profile(id) ON DELETE CASCADE,
  type              TEXT        NOT NULL, -- phone | whatsapp | email | instagram | tiktok | website
  label             TEXT,                -- contoh: "WhatsApp Booking"
  value             TEXT        NOT NULL, -- nomor / handle / url
  is_primary        BOOLEAN     NOT NULL DEFAULT false,
  sort_order        INT         NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_contact_information_updated_at
  BEFORE UPDATE ON public.contact_information
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 1.4 operating_hours
-- Jam operasional per hari dalam seminggu
CREATE TABLE IF NOT EXISTS public.operating_hours (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_profile_id UUID        NOT NULL REFERENCES public.studio_profile(id) ON DELETE CASCADE,
  day_of_week       TEXT        NOT NULL, -- monday | tuesday | ... | sunday
  open_time         TIME,                 -- NULL jika is_closed = true
  close_time        TIME,                 -- NULL jika is_closed = true
  is_closed         BOOLEAN     NOT NULL DEFAULT false,
  note              TEXT,                 -- contoh: "Open by appointment only"
  sort_order        INT         NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_operating_hours_day CHECK (
    day_of_week IN ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')
  )
);
CREATE TRIGGER trg_operating_hours_updated_at
  BEFORE UPDATE ON public.operating_hours
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- MODUL 2: LAYANAN (Services)
-- =============================================================================

-- 2.1 service_category
-- Kategori layanan: Tato Custom, Tato Flash, Piercing, dll.
CREATE TABLE IF NOT EXISTS public.service_category (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  description TEXT,
  sort_order  INT         NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_service_category_updated_at
  BEFORE UPDATE ON public.service_category
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2.2 service
-- Detail layanan dalam sebuah kategori
CREATE TABLE IF NOT EXISTS public.service (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  service_category_id UUID        NOT NULL REFERENCES public.service_category(id) ON DELETE CASCADE,
  name                TEXT        NOT NULL,
  slug                TEXT        NOT NULL UNIQUE,
  description         TEXT,
  short_description   TEXT,
  duration_minutes    INT,
  is_available        BOOLEAN     NOT NULL DEFAULT true,
  sort_order          INT         NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_service_updated_at
  BEFORE UPDATE ON public.service
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2.3 service_price
-- Rentang harga per layanan (bisa ada beberapa tier harga)
CREATE TABLE IF NOT EXISTS public.service_price (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id  UUID        NOT NULL REFERENCES public.service(id) ON DELETE CASCADE,
  label       TEXT        NOT NULL, -- contoh: "Ukuran Kecil (< 5cm)", "Per Jam"
  price_min   NUMERIC(12,2),
  price_max   NUMERIC(12,2),
  unit        TEXT,                 -- contoh: "IDR", "per session"
  note        TEXT,
  sort_order  INT         NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_service_price_updated_at
  BEFORE UPDATE ON public.service_price
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2.4 service_image
-- Gambar-gambar untuk setiap layanan (bisa lebih dari satu)
CREATE TABLE IF NOT EXISTS public.service_image (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id  UUID        NOT NULL REFERENCES public.service(id) ON DELETE CASCADE,
  image_url   TEXT        NOT NULL,
  alt_text    TEXT,
  is_cover    BOOLEAN     NOT NULL DEFAULT false,
  sort_order  INT         NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_service_image_updated_at
  BEFORE UPDATE ON public.service_image
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- MODUL 3: GALERI (Gallery)
-- =============================================================================

-- 3.1 gallery_category
-- Kategori galeri: Traditional, Blackwork, Minimalist, dll.
CREATE TABLE IF NOT EXISTS public.gallery_category (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  description TEXT,
  sort_order  INT         NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_gallery_category_updated_at
  BEFORE UPDATE ON public.gallery_category
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3.2 gallery_photo
-- Foto portofolio dalam galeri
CREATE TABLE IF NOT EXISTS public.gallery_photo (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_category_id UUID        REFERENCES public.gallery_category(id) ON DELETE SET NULL,
  image_url           TEXT        NOT NULL,
  thumbnail_url       TEXT,
  alt_text            TEXT,
  title               TEXT,
  description         TEXT,
  is_featured         BOOLEAN     NOT NULL DEFAULT false,
  sort_order          INT         NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_gallery_photo_updated_at
  BEFORE UPDATE ON public.gallery_photo
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- MODUL 4: FAQ & AFTER CARE
-- =============================================================================

-- 4.1 faq_category
-- Kelompok FAQ: Sebelum Tato, Saat Proses, After Care, dll.
CREATE TABLE IF NOT EXISTS public.faq_category (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        NOT NULL UNIQUE,
  sort_order  INT         NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_faq_category_updated_at
  BEFORE UPDATE ON public.faq_category
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4.2 faq
-- Pertanyaan dan jawaban yang umum diajukan
CREATE TABLE IF NOT EXISTS public.faq (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_category_id UUID        REFERENCES public.faq_category(id) ON DELETE SET NULL,
  question        TEXT        NOT NULL,
  answer          TEXT        NOT NULL,
  is_active       BOOLEAN     NOT NULL DEFAULT true,
  sort_order      INT         NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_faq_updated_at
  BEFORE UPDATE ON public.faq
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4.3 after_care
-- Panduan perawatan pasca tato (konten markdown/rich text)
CREATE TABLE IF NOT EXISTS public.after_care (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  content     TEXT        NOT NULL, -- markdown / rich text
  icon_name   TEXT,                 -- nama ikon (misal: "droplet", "sun")
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  sort_order  INT         NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_after_care_updated_at
  BEFORE UPDATE ON public.after_care
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- MODUL 5: PESAN KONTAK (Contact Message)
-- =============================================================================

-- 5.1 contact_message
-- Pesan yang dikirim oleh pengunjung melalui form kontak
CREATE TABLE IF NOT EXISTS public.contact_message (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT        NOT NULL,
  status      TEXT        NOT NULL DEFAULT 'new', -- new | read | replied | archived
  ip_address  TEXT,                               -- opsional, untuk anti-spam
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_contact_message_status CHECK (
    status IN ('new', 'read', 'replied', 'archived')
  ),
  CONSTRAINT chk_contact_message_email CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$')
);
CREATE TRIGGER trg_contact_message_updated_at
  BEFORE UPDATE ON public.contact_message
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
-- Aturan:
--   anon        → SELECT hanya (publik bisa baca)
--   authenticated → SELECT + INSERT + UPDATE + DELETE (admin)
-- Pengecualian contact_message:
--   anon        → INSERT saja (kirim pesan), TIDAK bisa SELECT (privasi)
--   authenticated → SELECT + UPDATE (ubah status) + DELETE
-- =============================================================================

-- --- Enable RLS pada semua tabel ---
ALTER TABLE public.studio_profile       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_information  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operating_hours      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_category     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_price        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_image        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_category     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photo        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_category         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.after_care           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_message      ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- POLICIES — studio_profile
-- =============================================================================
CREATE POLICY "public_can_read_studio_profile"
  ON public.studio_profile FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_studio_profile"
  ON public.studio_profile FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — location
-- =============================================================================
CREATE POLICY "public_can_read_location"
  ON public.location FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_location"
  ON public.location FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — contact_information
-- =============================================================================
CREATE POLICY "public_can_read_contact_information"
  ON public.contact_information FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_contact_information"
  ON public.contact_information FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — operating_hours
-- =============================================================================
CREATE POLICY "public_can_read_operating_hours"
  ON public.operating_hours FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_operating_hours"
  ON public.operating_hours FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — service_category
-- =============================================================================
CREATE POLICY "public_can_read_service_category"
  ON public.service_category FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_service_category"
  ON public.service_category FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — service
-- =============================================================================
CREATE POLICY "public_can_read_service"
  ON public.service FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_service"
  ON public.service FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — service_price
-- =============================================================================
CREATE POLICY "public_can_read_service_price"
  ON public.service_price FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_service_price"
  ON public.service_price FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — service_image
-- =============================================================================
CREATE POLICY "public_can_read_service_image"
  ON public.service_image FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_service_image"
  ON public.service_image FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — gallery_category
-- =============================================================================
CREATE POLICY "public_can_read_gallery_category"
  ON public.gallery_category FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_gallery_category"
  ON public.gallery_category FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — gallery_photo
-- =============================================================================
CREATE POLICY "public_can_read_gallery_photo"
  ON public.gallery_photo FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_gallery_photo"
  ON public.gallery_photo FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — faq_category
-- =============================================================================
CREATE POLICY "public_can_read_faq_category"
  ON public.faq_category FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_faq_category"
  ON public.faq_category FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — faq
-- =============================================================================
CREATE POLICY "public_can_read_faq"
  ON public.faq FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_faq"
  ON public.faq FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — after_care
-- =============================================================================
CREATE POLICY "public_can_read_after_care"
  ON public.after_care FOR SELECT TO anon USING (true);

CREATE POLICY "admin_can_manage_after_care"
  ON public.after_care FOR ALL TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- =============================================================================
-- POLICIES — contact_message (PENGECUALIAN KHUSUS)
-- =============================================================================
-- Pengunjung (anon) hanya boleh INSERT — tidak boleh baca pesan orang lain
CREATE POLICY "public_can_submit_contact_message"
  ON public.contact_message FOR INSERT TO anon
  WITH CHECK (true);

-- Admin (authenticated) boleh baca semua, ubah status, dan hapus
CREATE POLICY "admin_can_read_contact_message"
  ON public.contact_message FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "admin_can_update_contact_message"
  ON public.contact_message FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "admin_can_delete_contact_message"
  ON public.contact_message FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);


-- =============================================================================
-- GRANT — Expose ke Supabase Data API (REST)
-- =============================================================================
-- Diperlukan agar tabel bisa diakses via supabase-js client library.
-- Tanpa GRANT ini, tabel tidak akan visible meskipun RLS sudah benar.
-- =============================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- anon: boleh SELECT semua tabel publik
GRANT SELECT ON
  public.studio_profile,
  public.location,
  public.contact_information,
  public.operating_hours,
  public.service_category,
  public.service,
  public.service_price,
  public.service_image,
  public.gallery_category,
  public.gallery_photo,
  public.faq_category,
  public.faq,
  public.after_care
TO anon;

-- anon: boleh INSERT ke contact_message saja
GRANT INSERT ON public.contact_message TO anon;

-- authenticated (admin): boleh semua operasi pada semua tabel
GRANT ALL ON
  public.studio_profile,
  public.location,
  public.contact_information,
  public.operating_hours,
  public.service_category,
  public.service,
  public.service_price,
  public.service_image,
  public.gallery_category,
  public.gallery_photo,
  public.faq_category,
  public.faq,
  public.after_care,
  public.contact_message
TO authenticated;


-- =============================================================================
-- VERIFIKASI (opsional — jalankan setelah migration berhasil)
-- =============================================================================
-- Query 1: Cek semua tabel terbentuk (harus ada 14 baris)
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
-- ORDER BY table_name;

-- Query 2: Cek RLS aktif di semua tabel (kolom rowsecurity harus 't' semua)
-- SELECT tablename, rowsecurity FROM pg_tables
-- WHERE schemaname = 'public' ORDER BY tablename;

-- Query 3: Cek semua policies
-- SELECT schemaname, tablename, policyname, roles, cmd
-- FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, cmd;
-- =============================================================================
