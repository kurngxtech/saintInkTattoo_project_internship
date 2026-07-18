#Product & Technical Requirements Document (PRD & TRD)
**Project Name:** Website Tattoo Saint Ink
**Tech Stack:** React, Vite, TypeScript, TailwindCSS, Supabase (PostgreSQL, Auth, Storage, Edge Functions)

## Bagian I: Product Requirements (PRD)

### 1. Problem Statement
Studio Saint Ink Tattoo membutuhkan platform digital terpusat untuk menampilkan portofolio karya, informasi layanan, dan edukasi perawatan (*aftercare*), sekaligus mempermudah pemilik studio dalam memperbarui konten (CMS) tanpa harus menyentuh kode program.

### 2. Goals
*   Membangun *landing page* yang interaktif dan responsif untuk menarik calon pelanggan.
*   Menyediakan *dashboard* admin (CMS) yang aman dan mudah digunakan untuk mengelola data operasional.
*   Menerapkan arsitektur *serverless* untuk efisiensi biaya dan kemudahan pemeliharaan infrastruktur *cloud*.

### 3. Target User
*   **Pengunjung/Klien:** Orang yang mencari layanan tato, ingin melihat portofolio, atau ingin menghubungi studio.
*   **Admin/Pemilik Studio:** Staf internal yang mengelola profil studio, layanan, galeri, FAQ, dan membaca pesan klien.

### 4. User Stories
*   *Sebagai pengunjung*, saya ingin melihat daftar layanan dan harga agar bisa menyiapkan anggaran.
*   *Sebagai pengunjung*, saya ingin melihat galeri portofolio berdasarkan kategori agar bisa menilai kualitas artis.
*   *Sebagai pengunjung*, saya ingin mengirim pesan melalui formulir kontak untuk berkonsultasi.
*   *Sebagai admin*, saya ingin mengunggah foto portofolio baru ke galeri melalui *dashboard* agar website selalu *up-to-date*.
*   *Sebagai admin*, saya ingin mengedit informasi kontak dan jam operasional studio secara *real-time*.

### 5. Functional Requirements (FR)
*   Sistem harus menampilkan halaman utama, layanan, galeri, tentang kami, FAQ, dan kontak untuk publik.
*   Sistem harus menyediakan portal *login* khusus admin.
*   Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada data Layanan, Kategori Layanan, Harga, dan Gambar Layanan.
*   Admin dapat melakukan CRUD pada Galeri Kategori dan Foto Galeri.
*   Admin dapat melakukan CRUD pada data FAQ dan After Care.
*   Admin dapat membaca dan mengubah status pesan yang dikirim oleh pengunjung.
*   Pengunjung dapat mengirimkan pesan ke sistem.

### 6. Non-Functional Requirements (NFR)
*   **Performa:** Ukuran unggahan gambar maksimal 2MB per file (direkomendasikan format `.webp`).
*   **Keamanan:** Akses modifikasi database hanya diizinkan untuk *authenticated users* melalui kebijakan RLS (Row Level Security). Kredensial tidak disimpan mentah, melainkan dikelola oleh *Supabase Auth*.
*   **Ketersediaan:** Menggunakan *cloud edge functions* (Deno/TypeScript) untuk memastikan *uptime* tinggi pada pemrosesan pesan kontak.
*   **UI/UX:** Tampilan harus responsif (Mobile, Tablet, Desktop) menggunakan TailwindCSS.

### 7. Scope (Ruang Lingkup)
*   **In-Scope:** Pembuatan *landing page* dinamis, CMS khusus admin, integrasi database relasional, manajemen aset gambar (Cloud Storage).
*   **Out-of-Scope:** Sistem *booking* jadwal kalender otomatis, sistem pembayaran (*payment gateway*).

---

## Bagian II: Technical Requirements (TRD)

### 1. Spesifikasi Frontend (Client-Side & Admin UI)
*   **Framework:** React + Vite (TypeScript)
*   **Styling:** TailwindCSS
*   **State Management/API Client:** Supabase JS SDK

### 2. Arsitektur Database (PostgreSQL via Supabase)
Berdasarkan Class Diagram yang telah dirancang:

*   **Modul Profil Studio:** `studio_profile`, `location`, `contact_information`, `operating_hours`
*   **Modul Layanan:** `service_category`, `service`, `service_price`, `service_image`
*   **Modul Galeri:** `gallery_category`, `gallery_photo`
*   **Modul FAQ & After Care:** `faq_category`, `faq`, `after_care`
*   **Modul Pesan Kontak:** `contact_message`

### 3. Keamanan, Autentikasi & Media
*   **Autentikasi:** Supabase Auth (untuk Admin).
*   **Otorisasi:** Row Level Security (RLS) PostgreSQL.
*   **Penyimpanan Media:** Supabase Storage.
*   **Logika Backend:** Supabase Edge Functions (untuk validasi form kontak yang masuk sebelum di *insert* ke DB).
"""