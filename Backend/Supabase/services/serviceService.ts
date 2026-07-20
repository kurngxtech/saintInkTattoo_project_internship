// =============================================================================
// Saint Ink Tattoo — Service (Layanan) Service
// File   : serviceService.ts
// Berisi : Functions untuk mengambil data Modul Layanan dari Supabase
// =============================================================================

import { supabase } from "../Supabase";
import type {
  ServiceCategory,
  Service,
  ServiceWithDetails,
} from "../database.types";

// ---------------------------------------------------------------------------
// getServiceCategories()
// Mengambil semua kategori layanan yang aktif, diurutkan by sort_order.
// Dipakai di: Halaman Services — untuk render tab/filter kategori.
// ---------------------------------------------------------------------------
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const { data, error } = await supabase
    .from("service_category")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(
      "[serviceService] getServiceCategories error:",
      error.message
    );
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// getServices(categoryId?)
// Mengambil daftar layanan. Jika categoryId diberikan, filter per kategori.
// Hanya layanan yang is_available = true yang ditampilkan di publik.
// Dipakai di: Halaman Services, section layanan di homepage.
// ---------------------------------------------------------------------------
export async function getServices(
  categoryId?: string
): Promise<Service[]> {
  let query = supabase
    .from("service")
    .select("*")
    .eq("is_available", true)
    .order("sort_order", { ascending: true });

  if (categoryId) {
    query = query.eq("service_category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[serviceService] getServices error:", error.message);
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// getServiceBySlug(slug)
// Mengambil satu layanan berdasarkan slug URL-friendly.
// Dipakai di: Halaman detail layanan.
// ---------------------------------------------------------------------------
export async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const { data, error } = await supabase
    .from("service")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[serviceService] getServiceBySlug error:", error.message);
    return null;
  }

  return data;
}

// ---------------------------------------------------------------------------
// getServiceWithDetails(serviceId)
// Mengambil detail lengkap satu layanan beserta:
//   - kategori induknya
//   - semua range harga (service_price)
//   - semua gambar (service_image, cover image duluan)
// Dipakai di: Modal/halaman detail layanan, Admin Dashboard edit form.
// ---------------------------------------------------------------------------
export async function getServiceWithDetails(
  serviceId: string
): Promise<ServiceWithDetails | null> {
  const { data, error } = await supabase
    .from("service")
    .select(
      `
      *,
      service_category(*),
      service_price(*),
      service_image(*)
      `
    )
    .eq("id", serviceId)
    .maybeSingle();

  if (error) {
    console.error(
      "[serviceService] getServiceWithDetails error:",
      error.message
    );
    return null;
  }

  if (!data) return null;

  // Cast ke ServiceWithDetails agar TypeScript dapat mengenali shape JOIN result.
  const result = data as unknown as ServiceWithDetails;

  // Urutkan: cover image di depan, lalu by sort_order
  const sortedImages = (result.service_image ?? []).sort(
    (a, b) => {
      if (a.is_cover && !b.is_cover) return -1;
      if (!a.is_cover && b.is_cover) return 1;
      return a.sort_order - b.sort_order;
    }
  );

  return { ...result, service_image: sortedImages };
}

// ---------------------------------------------------------------------------
// getAllServicesWithDetails()
// Mengambil semua layanan lengkap dengan kategori, harga, dan gambar.
// Dipakai di: Admin Dashboard — tabel manajemen layanan.
// ---------------------------------------------------------------------------
export async function getAllServicesWithDetails(): Promise<ServiceWithDetails[]> {
  const { data, error } = await supabase
    .from("service")
    .select(
      `
      *,
      service_category(*),
      service_price(*),
      service_image(*)
      `
    )
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(
      "[serviceService] getAllServicesWithDetails error:",
      error.message
    );
    return [];
  }

  return (data ?? []) as ServiceWithDetails[];
}
