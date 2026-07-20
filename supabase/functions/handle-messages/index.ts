// =============================================================================
// Saint Ink Tattoo — Edge Function: handle-messages
// File   : supabase/functions/handle-messages/index.ts  ← FILE AKTIF (deploy)
// Runtime: Deno (TypeScript) via Supabase Edge Functions
// Tujuan : Menerima, memvalidasi, dan menyimpan pesan dari form kontak
// Deploy : npx supabase functions deploy handle-messages --project-ref <PROJECT_REF>
// =============================================================================

// URL import adalah sintaks Deno — bukan error, bukan Node.js.
// Supabase Edge Functions berjalan di runtime Deno, bukan Node.js.
// @ts-expect-error — Node/TS LSP tidak mengenali URL imports; valid di Deno runtime
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


// ---------------------------------------------------------------------------
// CORS Headers
// Izinkan request dari browser (domain frontend).
// Sesuaikan ALLOWED_ORIGIN saat deployment ke production.
// ---------------------------------------------------------------------------
const CORS_HEADERS = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Methods": "POST, OPTIONS",
   "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ---------------------------------------------------------------------------
// Tipe body request dari frontend
// ---------------------------------------------------------------------------
interface ContactFormPayload {
   name: string;
   email: string;
   phone?: string;
   subject?: string;
   message: string;
}

// ---------------------------------------------------------------------------
// Tipe hasil validasi
// ---------------------------------------------------------------------------
interface ValidationResult {
   valid: boolean;
   errors: Record<string, string>;
}

// ---------------------------------------------------------------------------
// validatePayload()
// Validasi semua field input sebelum menyentuh database.
// Rules:
//   - name: wajib ada, min 2 karakter
//   - email: wajib ada, format valid (regex)
//   - message: wajib ada, min 10 karakter
//   - phone: opsional
//   - subject: opsional
// ---------------------------------------------------------------------------
function validatePayload(payload: ContactFormPayload): ValidationResult {
   const errors: Record<string, string> = {};

   // Validasi name
   if (!payload.name || typeof payload.name !== "string") {
      errors.name = "Nama wajib diisi.";
   } else if (payload.name.trim().length < 2) {
      errors.name = "Nama minimal 2 karakter.";
   }

   // Validasi email (format regex — sama dengan constraint DB)
   const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
   if (!payload.email || typeof payload.email !== "string") {
      errors.email = "Email wajib diisi.";
   } else if (!emailRegex.test(payload.email.trim())) {
      errors.email = "Format email tidak valid.";
   }

   // Validasi message
   if (!payload.message || typeof payload.message !== "string") {
      errors.message = "Pesan wajib diisi.";
   } else if (payload.message.trim().length < 10) {
      errors.message = "Pesan minimal 10 karakter.";
   }

   return {
      valid: Object.keys(errors).length === 0,
      errors,
   };
}

// ---------------------------------------------------------------------------
// Main Handler
// ---------------------------------------------------------------------------
// @ts-expect-error — Deno.serve tidak dikenali oleh Node/TS LSP; valid di Deno runtime
Deno.serve(async (req: Request) => {
   // --- Handle CORS preflight request (OPTIONS) ---
   if (req.method === "OPTIONS") {
      return new Response(null, {
         status: 204,
         headers: CORS_HEADERS,
      });
   }

   // --- Hanya terima POST ---
   if (req.method !== "POST") {
      return new Response(
         JSON.stringify({ error: "Method tidak diizinkan. Gunakan POST." }),
         {
            status: 405,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
         }
      );
   }

   // --- Parse body ---
   let payload: ContactFormPayload;
   try {
      payload = await req.json();
   } catch {
      return new Response(
         JSON.stringify({ error: "Body request tidak valid (bukan JSON)." }),
         {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
         }
      );
   }

   // --- Validasi input ---
   const validation = validatePayload(payload);
   if (!validation.valid) {
      return new Response(
         JSON.stringify({
            error: "Validasi gagal. Periksa kembali input kamu.",
            fields: validation.errors,
         }),
         {
            status: 400,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
         }
      );
   }

   // --- Inisialisasi Supabase Client dengan service_role key ---
   // service_role digunakan agar Edge Function bisa bypass RLS dan insert
   // langsung ke tabel contact_message tanpa bergantung pada session user.
   // PENTING: Jangan pernah expose service_role key ke frontend/browser.
   //   @ts-expect-error — Deno.env tidak dikenali oleh Node/TS LSP; valid di Deno runtime
   const supabaseUrl = Deno.env.get("SUPABASE_URL");
   //   @ts-expect-error — Deno.env tidak dikenali oleh Node/TS LSP; valid di Deno runtime
   const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

   if (!supabaseUrl || !supabaseServiceKey) {
      console.error(
         "[handle-messages] Environment variables SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan."
      );
      return new Response(
         JSON.stringify({ error: "Konfigurasi server bermasalah." }),
         {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
         }
      );
   }

   const supabase = createClient(supabaseUrl, supabaseServiceKey);

   // --- Ambil IP address pengunjung (opsional, untuk anti-spam) ---
   const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("cf-connecting-ip") ??
      null;

   // --- Insert ke tabel contact_message ---
   const { error: insertError } = await supabase
      .from("contact_message")
      .insert({
         name: payload.name.trim(),
         email: payload.email.trim().toLowerCase(),
         phone: payload.phone?.trim() || null,
         subject: payload.subject?.trim() || null,
         message: payload.message.trim(),
         status: "new",
         ip_address: ipAddress,
      });

   if (insertError) {
      console.error("[handle-messages] Insert error:", insertError.message);
      return new Response(
         JSON.stringify({
            error: "Gagal menyimpan pesan. Silakan coba lagi nanti.",
         }),
         {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
         }
      );
   }

   // --- Sukses ---
   return new Response(
      JSON.stringify({
         success: true,
         message:
            "Pesan berhasil dikirim! Kami akan menghubungimu segera. Terima kasih 🙏",
      }),
      {
         status: 201,
         headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
   );
});
