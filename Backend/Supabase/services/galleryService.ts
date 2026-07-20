// =============================================================================
// Saint Ink Tattoo — Gallery Service
// File   : galleryService.ts
// Berisi : Functions untuk mengambil data Modul Galeri dari Supabase
// =============================================================================

import { supabase } from "../Supabase";
import type {
  GalleryCategory,
  GalleryPhoto,
  GalleryPhotoWithCategory,
} from "../database.types";

// ---------------------------------------------------------------------------
// getGalleryCategories()
// Mengambil semua kategori galeri yang aktif (Traditional, Blackwork, dll.)
// diurutkan berdasarkan sort_order.
// Dipakai di: Halaman Gallery — tab/filter kategori.
// ---------------------------------------------------------------------------
export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  const { data, error } = await supabase
    .from("gallery_category")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(
      "[galleryService] getGalleryCategories error:",
      error.message
    );
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// getGalleryPhotos(options?)
// Mengambil foto galeri dengan opsi filter:
//   - categoryId: filter per kategori tertentu
//   - featuredOnly: hanya tampilkan foto yang is_featured = true
//   - limit: batasi jumlah foto yang diambil
// Dipakai di:
//   - Homepage: featured gallery (featuredOnly: true, limit: 6)
//   - Halaman Gallery: semua foto (per kategori atau semua)
// ---------------------------------------------------------------------------
export async function getGalleryPhotos(options?: {
  categoryId?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<GalleryPhoto[]> {
  let query = supabase
    .from("gallery_photo")
    .select("*")
    .order("sort_order", { ascending: true });

  if (options?.categoryId) {
    query = query.eq("gallery_category_id", options.categoryId);
  }

  if (options?.featuredOnly) {
    query = query.eq("is_featured", true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("[galleryService] getGalleryPhotos error:", error.message);
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// getGalleryPhotosWithCategory()
// Mengambil foto galeri beserta data kategorinya (JOIN).
// Dipakai di: Admin Dashboard — tabel manajemen foto galeri.
// ---------------------------------------------------------------------------
export async function getGalleryPhotosWithCategory(options?: {
  categoryId?: string;
  limit?: number;
}): Promise<GalleryPhotoWithCategory[]> {
  let query = supabase
    .from("gallery_photo")
    .select(
      `
      *,
      gallery_category(*)
      `
    )
    .order("sort_order", { ascending: true });

  if (options?.categoryId) {
    query = query.eq("gallery_category_id", options.categoryId);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(
      "[galleryService] getGalleryPhotosWithCategory error:",
      error.message
    );
    return [];
  }

  return (data ?? []) as GalleryPhotoWithCategory[];
}

// ---------------------------------------------------------------------------
// getFeaturedGalleryPhotos(limit?)
// Shorthand: mengambil foto featured untuk homepage gallery.
// Dipakai di: Homepage — preview galeri.
// ---------------------------------------------------------------------------
export async function getFeaturedGalleryPhotos(
  limit = 6
): Promise<GalleryPhoto[]> {
  return getGalleryPhotos({ featuredOnly: true, limit });
}
