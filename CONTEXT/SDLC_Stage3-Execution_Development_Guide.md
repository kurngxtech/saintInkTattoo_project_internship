"""# SDLC Stage 3: Execution & Development Guide
**Project:** Website Tattoo Saint Ink
**Fokus Tahapan:** Pengembangan UI/UX Frontend, Integrasi API, dan Pembuatan Backend Edge Functions.

## INSTRUKSI MUTLAK UNTUK AI AGENT (ANTIGRAVITY IDE)

Pada tahap ini, AI bertugas menulis kode logika aplikasi berdasarkan skema database yang sudah dibuat di Tahap 2.

### 1. Pengembangan Frontend (React + Vite + TypeScript)

- Gunakan **TailwindCSS** untuk styling yang responsif (Mobile, Tablet, Desktop).
- Buat komponen atomik di folder `src/components/ui/` dan layout di `src/layouts/` (MainLayout untuk publik, AdminLayout untuk dashboard).
- Implementasikan rute halaman menggunakan React Router. Halaman Admin WAJIB diproteksi dengan pengecekan sesi (Supabase Auth).

### 2. Integrasi Supabase JS SDK

- Gunakan tipe data statis TypeScript (`database.types.ts`) hasil dari skema database agar pengambilan data (fetch) bebas dari error (Type-Safe).
- Buat service functions di frontend untuk mengambil data portofolio, layanan, dan FAQ langsung dari PostgreSQL.

### 3. Pengembangan Serverless Backend (Supabase Edge Functions)

- Buat fungsi di `supabase/functions/handle-messages/index.ts` (menggunakan Deno/TypeScript).
- **Logika Fungsi:** Validasi input (Nama, Email, Pesan) dari frontend. Pastikan email menggunakan format regex yang valid, lalu masukkan data (insert) ke tabel `contact_message`.
  """
