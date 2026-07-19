"""# SDLC Stage 4: Testing & Quality Assurance Guide
**Project:** Website Tattoo Saint Ink
**Fokus Tahapan:** Pengujian Unit, Integrasi, Validasi Keamanan RLS, dan Batasan Upload Media.

## INSTRUKSI MUTLAK UNTUK AI AGENT (ANTIGRAVITY IDE)

Tahap ini berfokus pada validasi. AI tidak boleh menambahkan fitur baru, melainkan harus menulis dan menjalankan skenario pengujian.

### 1. Pengujian Keamanan & RLS (Database)

- Lakukan simulasi query sebagai "Anonymous User". Pastikan operasi `INSERT` ke tabel `gallery_photo` DITOLAK oleh database.
- Lakukan simulasi query sebagai "Authenticated Admin". Pastikan operasi `INSERT` dan `UPDATE` BERHASIL.

### 2. Pengujian Validasi Media (Supabase Storage & Frontend)

- Buat script pengujian/simulasi di komponen upload Admin Dashboard.
- **Wajib Lulus Uji:** File gambar di atas 2MB HARUS ditolak oleh sistem sebelum di-upload. File selain format gambar (misal `.pdf` atau `.exe`) HARUS ditolak. Format yang disarankan adalah `.webp` atau `.jpeg/png`.

### 3. Pengujian Integrasi Edge Functions

- Simulasikan pengiriman _payload_ kosong atau email tidak valid ke endpoint Edge Function `handle-messages`. Pastikan serverless backend mengembalikan status HTTP 400 (Bad Request).
- Simulasikan _payload_ valid, pastikan data berhasil masuk ke tabel `contact_message` dan merespons dengan HTTP 200.
  """
