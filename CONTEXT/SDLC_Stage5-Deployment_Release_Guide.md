# SDLC Stage 6: Deployment & Release Guide

**Project:** Website Tattoo Saint Ink
**Fokus Tahapan:** Mengunggah Database, Edge Functions, dan Build Frontend ke Lingkungan Production.

## INSTRUKSI MUTLAK UNTUK AI AGENT (ANTIGRAVITY IDE)

Tahap akhir. AI bertugas memandu atau mengeksekusi skrip perilisan aplikasi ke cloud.

### 1. Deployment Backend & Database (Supabase CLI)

- Eksekusi perintah untuk menautkan project lokal dengan Supabase Cloud (`supabase link`).
- Unggah seluruh skema migrasi database lokal ke cloud (`supabase db push`).
- Deploy fungsi serverless untuk memproses pesan kontak (`supabase functions deploy handle-messages`).

### 2. Deployment Frontend

- Eksekusi perintah `npm run build` di dalam direktori `frontend/`.
- Pastikan _output_ kompilasi di folder `dist/` berhasil dibuat tanpa _error_ TypeScript.
- Konfigurasikan file `.env.production` (variabel lingkungan untuk production).
- Siapkan konfigurasi deployment untuk platform hosting statis (seperti Vercel, Netlify, atau Firebase Hosting) dan pastikan _rewrite rules_ untuk React Router (SPA) diset agar me-redirect semua route ke `index.html`.
  """
