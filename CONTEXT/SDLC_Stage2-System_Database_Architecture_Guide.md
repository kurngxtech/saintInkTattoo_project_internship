# SDLC Stage 2: System & Database Architecture Guide

**Project:** Website Tattoo Saint Ink
**Fokus Tahapan:** Inisialisasi Monorepo, Konfigurasi Supabase CLI, dan Perancangan Skema Database (DDL & RLS).

## INSTRUKSI MUTLAK UNTUK AI AGENT (ANTIGRAVITY IDE)

Pada tahap ini, AI HANYA diizinkan untuk membuat dan mengonfigurasi struktur dasar dan database. DILARANG membuat komponen UI (React) pada tahap ini.

### 1. Inisialisasi & Konfigurasi Workspace

- Buat struktur monorepo yang memisahkan folder `frontend/` (Vite+React+TS) dan `supabase/` (Backend).
- Pastikan berkas `.gitignore` di root directory memblokir berkas kredensial (`.env`), folder dependensi (`node_modules`), dan log lokal Supabase (`supabase/.temp/`).

### 2. Perancangan Skema Database (Supabase PostgreSQL)

Buat berkas migrasi SQL (contoh: `supabase/migrations/20260718_init.sql`) berdasarkan Class Diagram. Tabel yang wajib dibuat:

- **Modul Studio:** `studio_profile`, `location`, `contact_information`, `operating_hours`
- **Modul Layanan:** `service_category`, `service`, `service_price`, `service_image`
- **Modul Galeri:** `gallery_category`, `gallery_photo`
- **Modul FAQ:** `faq_category`, `faq`, `after_care`
- **Modul Pesan:** `contact_message`

### 3. Konfigurasi Keamanan (Row Level Security - RLS)

- Terapkan kebijakan RLS pada SEMUA tabel.
- **Aturan Publik:** Hanya diizinkan operasi `SELECT` (Membaca data).
- **Aturan Admin:** Operasi `INSERT`, `UPDATE`, `DELETE` HANYA diizinkan untuk pengguna yang terautentikasi melalui Supabase Auth (`auth.uid() != null`).
  """
