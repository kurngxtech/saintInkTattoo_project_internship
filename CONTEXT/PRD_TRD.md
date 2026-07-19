#Product & Technical Requirements Document (PRD & TRD)
**Project Name:** Website Tattoo Saint Ink
**Tech Stack:** React, Vite, TypeScript, TailwindCSS, Supabase (PostgreSQL, Auth, Storage, Edge Functions)

## Bagian I: Product Requirements (PRD)

### 1. Problem Statement

Studio Saint Ink Tattoo membutuhkan platform digital terpusat untuk menampilkan portofolio karya, informasi layanan, dan edukasi perawatan (_aftercare_), sekaligus mempermudah pemilik studio dalam memperbarui konten (CMS) tanpa harus menyentuh kode program.

### 2. Goals

- Membangun _landing page_ yang interaktif dan responsif untuk menarik calon pelanggan.
- Menyediakan _dashboard_ admin (CMS) yang aman dan mudah digunakan untuk mengelola data operasional.
- Menerapkan arsitektur _serverless_ untuk efisiensi biaya dan kemudahan pemeliharaan infrastruktur _cloud_.

### 3. Target User

- **Pengunjung/Klien:** Orang yang mencari layanan tato, ingin melihat portofolio, atau ingin menghubungi studio.
- **Admin/Pemilik Studio:** Staf internal yang mengelola profil studio, layanan, galeri, FAQ, dan membaca pesan klien.

### 4. User Stories

- _Sebagai pengunjung_, saya ingin melihat daftar layanan dan harga agar bisa menyiapkan anggaran.
- _Sebagai pengunjung_, saya ingin melihat galeri portofolio berdasarkan kategori agar bisa menilai kualitas artis.
- _Sebagai pengunjung_, saya ingin mengirim pesan melalui formulir kontak untuk berkonsultasi.
- _Sebagai admin_, saya ingin mengunggah foto portofolio baru ke galeri melalui _dashboard_ agar website selalu _up-to-date_.
- _Sebagai admin_, saya ingin mengedit informasi kontak dan jam operasional studio secara _real-time_.

### 5. Functional Requirements (FR)

- Sistem harus menampilkan halaman utama, layanan, galeri, tentang kami, FAQ, dan kontak untuk publik.
- Sistem harus menyediakan portal _login_ khusus admin.
- Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada data Layanan, Kategori Layanan, Harga, dan Gambar Layanan.
- Admin dapat melakukan CRUD pada Galeri Kategori dan Foto Galeri.
- Admin dapat melakukan CRUD pada data FAQ dan After Care.
- Admin dapat membaca dan mengubah status pesan yang dikirim oleh pengunjung.
- Pengunjung dapat mengirimkan pesan ke sistem.

### 6. Non-Functional Requirements (NFR)

- **Performa:** Ukuran unggahan gambar maksimal 2MB per file (direkomendasikan format `.webp`).
- **Keamanan:** Akses modifikasi database hanya diizinkan untuk _authenticated users_ melalui kebijakan RLS (Row Level Security). Kredensial tidak disimpan mentah, melainkan dikelola oleh _Supabase Auth_.
- **Ketersediaan:** Menggunakan _cloud edge functions_ (Deno/TypeScript) untuk memastikan _uptime_ tinggi pada pemrosesan pesan kontak.
- **UI/UX:** Tampilan harus responsif (Mobile, Tablet, Desktop) menggunakan TailwindCSS.

### 7. Scope (Ruang Lingkup)

- **In-Scope:** Pembuatan _landing page_ dinamis, CMS khusus admin, integrasi database relasional, manajemen aset gambar (Cloud Storage).
- **Out-of-Scope:** Sistem _booking_ jadwal kalender otomatis, sistem pembayaran (_payment gateway_).

---

## Bagian II: Technical Requirements (TRD)

### 1. Spesifikasi Frontend (Client-Side & Admin UI)

- **Framework:** React + Vite (TypeScript)
- **Styling:** TailwindCSS
- **State Management/API Client:** Supabase JS SDK

### 2. Arsitektur Database (PostgreSQL via Supabase)

Berdasarkan Class Diagram yang telah dirancang:

- **Modul Profil Studio:** `studio_profile`, `location`, `contact_information`, `operating_hours`
- **Modul Layanan:** `service_category`, `service`, `service_price`, `service_image`
- **Modul Galeri:** `gallery_category`, `gallery_photo`
- **Modul FAQ & After Care:** `faq_category`, `faq`, `after_care`
- **Modul Pesan Kontak:** `contact_message`

### 3. Keamanan, Autentikasi & Media

- **Autentikasi:** Supabase Auth (untuk Admin).
- **Otorisasi:** Row Level Security (RLS) PostgreSQL.
- **Penyimpanan Media:** Supabase Storage.
- **Logika Backend:** Supabase Edge Functions (untuk validasi form kontak yang masuk sebelum di _insert_ ke DB).

## Bagian III: Automated GitIgnore Maintenance Guidelines (Instruksi Mutlak IDE)

Setiap kali Antigravity IDE atau agen kecerdasan buatan (AI) melakukan modifikasi, penambahan fitur, instalasi dependensi, atau penulisan kode baru pada struktur monorepo proyek ini, AI DIWAJIBKAN mematuhi protokol pemeliharaan keamanan berkas sebagai berikut:

### 1. Evaluasi Berkas Baru Secara Proaktif

[cite_start]Sebelum menulis berkas baru ke dalam cakupan direktori kerja (`frontend/` atau `supabase/`), lakukan analisis kelayakan publik. Jika berkas tersebut mengandung atau termasuk ke dalam golongan berikut, ia dilarang keras dilacak oleh kontrol versi Git:

- Kredensial, kunci API rahasia, token akses, atau variabel lingkungan (`.env`, `.env.*`).
- Berkas biner sementara, berkas log eksekusi runtime (`*.log`), atau _cache_ kompilasi internal.
- Konfigurasi dependensi lokal khusus mesin pengembang yang berpotensi memicu konflik antarmesin.

### 2. Protokol Pembaruan Otomatis `.gitignore`

Jika ditemukan berkas atau direktori baru dengan kriteria di atas, AI harus segera:

1. Menghentikan proses _staging_ berkas tersebut.
2. [cite_start]Membuka berkas `.gitignore` utama yang terletak di _root directory_ proyek[cite: 217].
3. [cite_start]Menambahkan _pattern_ jalur berkas atau subfolder tersebut ke dalam klaster kategori yang sesuai (misalnya di bawah klaster `Keamanan & Kredensial` atau `Supabase Local Infrastructure`) secara rapi tanpa merusak komentar struktur yang sudah ada[cite: 217].

### 3. Klasifikasi Kategori Wajib untuk `.gitignore`

Pastikan pembaruan otomatis selalu memetakan berkas ke klaster berikut:

- **Keamanan & Kredensial:** Semua variasi nama berkas yang mengandung ekstensi `.env` atau _secret keys_ lainnya.
- [cite_start]**Supabase Engine Artifacts:** Log kontainer Docker lokal, berkas status _branching_ internal CLI (`supabase/.temp/`, `supabase/.branches/`), dan kunci JWT lokal yang dihasilkan dari perintah `supabase init`[cite: 215, 216].
- [cite_start]**Frontend Output & Tooling Cache:** Folder `/dist`, `/build`, `.tsbuildinfo`, dan berkas berkala hasil _build_ bundler Vite[cite: 214, 215].
- [cite_start]**Artifacts Editor/OS:** Berkas konfigurasi tersembunyi seperti `.vscode/`, `.antigravity/`, `.DS_Store`, dan sampah indeks sistem operasi[cite: 216].
  """
