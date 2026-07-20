// =============================================================================
// Saint Ink Tattoo — FAQ & After Care Service
// File   : faqService.ts
// Berisi : Functions untuk mengambil data Modul FAQ & After Care dari Supabase
// =============================================================================

import { supabase } from "../Supabase";
import type {
   FaqCategory,
   Faq,
   FaqWithCategory,
   AfterCare,
} from "../database.types";

// ---------------------------------------------------------------------------
// getFaqCategories()
// Mengambil semua kategori FAQ yang aktif, diurutkan by sort_order.
// Dipakai di: Halaman FAQ — tab/accordion per kategori.
// ---------------------------------------------------------------------------
export async function getFaqCategories(): Promise<FaqCategory[]> {
   const { data, error } = await supabase
      .from("faq_category")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

   if (error) {
      console.error("[faqService] getFaqCategories error:", error.message);
      return [];
   }

   return data ?? [];
}

// ---------------------------------------------------------------------------
// getFaqs(categoryId?)
// Mengambil semua FAQ yang aktif. Jika categoryId diberikan, filter per kategori.
// Dipakai di: Halaman FAQ — accordion pertanyaan-jawaban.
// ---------------------------------------------------------------------------
export async function getFaqs(categoryId?: string): Promise<Faq[]> {
   let query = supabase
      .from("faq")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

   if (categoryId) {
      query = query.eq("faq_category_id", categoryId);
   }

   const { data, error } = await query;

   if (error) {
      console.error("[faqService] getFaqs error:", error.message);
      return [];
   }

   return data ?? [];
}

// ---------------------------------------------------------------------------
// getFaqsWithCategory()
// Mengambil semua FAQ aktif beserta data kategorinya (JOIN).
// Dipakai di: Admin Dashboard — tabel manajemen FAQ.
// ---------------------------------------------------------------------------
export async function getFaqsWithCategory(): Promise<FaqWithCategory[]> {
   const { data, error } = await supabase
      .from("faq")
      .select(
         `
      *,
      faq_category(*)
      `
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

   if (error) {
      console.error("[faqService] getFaqsWithCategory error:", error.message);
      return [];
   }

   return (data ?? []) as FaqWithCategory[];
}

// ---------------------------------------------------------------------------
// getFaqsGroupedByCategory()
// Mengambil semua FAQ dan mengelompokkannya per kategori.
// Return: Map dari category.id -> { category, faqs[] }
// Dipakai di: Halaman FAQ — render accordion per kelompok kategori.
// ---------------------------------------------------------------------------
export interface FaqGroup {
   category: FaqCategory;
   faqs: Faq[];
}

export async function getFaqsGroupedByCategory(): Promise<FaqGroup[]> {
   const [categories, faqs] = await Promise.all([
      getFaqCategories(),
      getFaqs(),
   ]);

   return categories.map((category) => ({
      category,
      faqs: faqs.filter((faq) => faq.faq_category_id === category.id),
   }));
}

// ---------------------------------------------------------------------------
// getAfterCare()
// Mengambil semua panduan perawatan pasca tato yang aktif,
// diurutkan berdasarkan sort_order.
// Dipakai di: Halaman After Care, section perawatan di homepage.
// ---------------------------------------------------------------------------
export async function getAfterCare(): Promise<AfterCare[]> {
   const { data, error } = await supabase
      .from("after_care")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

   if (error) {
      console.error("[faqService] getAfterCare error:", error.message);
      return [];
   }

   return data ?? [];
}
