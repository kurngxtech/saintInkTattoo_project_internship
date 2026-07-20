// =============================================================================
// Saint Ink Tattoo — Studio Service
// File   : studioService.ts
// Berisi : Functions untuk mengambil data Modul Studio Profile dari Supabase
// =============================================================================

import { supabase } from "../Supabase";
import type {
  StudioProfile,
  Location,
  ContactInformation,
  OperatingHours,
} from "../database.types";

// ---------------------------------------------------------------------------
// Tipe hasil gabungan untuk halaman profil studio
// ---------------------------------------------------------------------------
export interface StudioProfileFull {
  profile: StudioProfile;
  location: Location | null;
  contacts: ContactInformation[];
  operatingHours: OperatingHours[];
}

// ---------------------------------------------------------------------------
// getStudioProfile()
// Mengambil satu baris profil studio yang aktif (singleton pattern).
// Dipakai di: Hero section, About Us, footer.
// ---------------------------------------------------------------------------
export async function getStudioProfile(): Promise<StudioProfile | null> {
  const { data, error } = await supabase
    .from("studio_profile")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[studioService] getStudioProfile error:", error.message);
    return null;
  }

  return data;
}

// ---------------------------------------------------------------------------
// getLocation(studioProfileId)
// Mengambil lokasi fisik studio berdasarkan ID profil.
// Dipakai di: Halaman Contact, section peta lokasi.
// ---------------------------------------------------------------------------
export async function getLocation(
  studioProfileId: string
): Promise<Location | null> {
  const { data, error } = await supabase
    .from("location")
    .select("*")
    .eq("studio_profile_id", studioProfileId)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[studioService] getLocation error:", error.message);
    return null;
  }

  return data;
}

// ---------------------------------------------------------------------------
// getContactInformation(studioProfileId)
// Mengambil semua jenis kontak studio (phone, WA, Instagram, dll.)
// diurutkan berdasarkan sort_order.
// Dipakai di: Footer, halaman Contact Us.
// ---------------------------------------------------------------------------
export async function getContactInformation(
  studioProfileId: string
): Promise<ContactInformation[]> {
  const { data, error } = await supabase
    .from("contact_information")
    .select("*")
    .eq("studio_profile_id", studioProfileId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(
      "[studioService] getContactInformation error:",
      error.message
    );
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// getOperatingHours(studioProfileId)
// Mengambil jam operasional per hari dalam seminggu,
// diurutkan berdasarkan sort_order (Senin → Minggu).
// Dipakai di: Halaman Contact Us, footer.
// ---------------------------------------------------------------------------
export async function getOperatingHours(
  studioProfileId: string
): Promise<OperatingHours[]> {
  const { data, error } = await supabase
    .from("operating_hours")
    .select("*")
    .eq("studio_profile_id", studioProfileId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[studioService] getOperatingHours error:", error.message);
    return [];
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// getStudioProfileFull()
// Mengambil semua data studio dalam satu call — profile + lokasi +
// kontak + jam operasional. Berguna untuk halaman yang membutuhkan
// semua data sekaligus (misal: Contact page, Admin Dashboard overview).
// ---------------------------------------------------------------------------
export async function getStudioProfileFull(): Promise<StudioProfileFull | null> {
  const profile = await getStudioProfile();

  if (!profile) return null;

  const [location, contacts, operatingHours] = await Promise.all([
    getLocation(profile.id),
    getContactInformation(profile.id),
    getOperatingHours(profile.id),
  ]);

  return {
    profile,
    location,
    contacts,
    operatingHours,
  };
}
