# SDLC Stage 5: Debugging & Optimization Guide

**Project:** Website Tattoo Saint Ink
**Fokus Tahapan:** Pembersihan Kode (Refactoring), Optimasi Aset, dan Pencegahan Context Drift.

## INSTRUKSI MUTLAK UNTUK AI AGENT (ANTIGRAVITY IDE)

Tugas utama AI di tahap ini adalah menganalisis ulang kode yang sudah ditulis di Tahap 3 dan melakukan optimasi performa.

### 1. Optimasi Gambar dan UI

- Pastikan semua gambar yang di-render di halaman publik (khususnya Gallery) menggunakan teknik _Lazy Loading_ (`loading="lazy"`).
- Pastikan komponen UI tidak melakukan _re-render_ yang tidak perlu (gunakan `React.memo` atau optimasi dependencies pada `useEffect` & `useCallback` jika perlu).

### 2. Code Refactoring & Context Drift Check

- Pindai seluruh _codebase_. Hapus variabel yang tidak digunakan, _console.log_ yang tersisa, dan komponen yang redundan (bloatware).
- Pastikan tidak ada kredensial (_API Keys, Supabase URL_) yang ditulis langsung (hardcoded) di dalam file `.ts` atau `.tsx`. Semua harus merujuk pada `import.meta.env`.

### 3. Optimasi Bundle Size

- Pastikan konfigurasi Vite (PostCSS & Autoprefixer) berjalan efisien dan membuang class Tailwind yang tidak terpakai saat mode _production_.
  """
