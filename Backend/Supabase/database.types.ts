// =============================================================================
// Saint Ink Tattoo — Database Type Definitions
// File   : database.types.ts
// Stage  : SDLC Stage 3 — Execution & Development
// Sumber : Dihasilkan secara manual berdasarkan skema 20260719_init_schema.sql
// =============================================================================

export type Json =
   | string
   | number
   | boolean
   | null
   | { [key: string]: Json | undefined }
   | Json[];

export interface Database {
   public: {
      Tables: {

         // -----------------------------------------------------------------------
         // MODUL 1: STUDIO PROFILE
         // -----------------------------------------------------------------------

         studio_profile: {
            Row: {
               id: string;
               name: string;
               tagline: string | null;
               description: string | null;
               logo_url: string | null;
               is_active: boolean;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               name: string;
               tagline?: string | null;
               description?: string | null;
               logo_url?: string | null;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               name?: string;
               tagline?: string | null;
               description?: string | null;
               logo_url?: string | null;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
         };

         location: {
            Row: {
               id: string;
               studio_profile_id: string;
               address_line: string;
               city: string;
               province: string | null;
               postal_code: string | null;
               maps_url: string | null;
               maps_embed_url: string | null;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               studio_profile_id: string;
               address_line: string;
               city: string;
               province?: string | null;
               postal_code?: string | null;
               maps_url?: string | null;
               maps_embed_url?: string | null;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               studio_profile_id?: string;
               address_line?: string;
               city?: string;
               province?: string | null;
               postal_code?: string | null;
               maps_url?: string | null;
               maps_embed_url?: string | null;
               created_at?: string;
               updated_at?: string;
            };
         };

         contact_information: {
            Row: {
               id: string;
               studio_profile_id: string;
               type: string;
               label: string | null;
               value: string;
               is_primary: boolean;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               studio_profile_id: string;
               type: string;
               label?: string | null;
               value: string;
               is_primary?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               studio_profile_id?: string;
               type?: string;
               label?: string | null;
               value?: string;
               is_primary?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         operating_hours: {
            Row: {
               id: string;
               studio_profile_id: string;
               day_of_week: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
               open_time: string | null;
               close_time: string | null;
               is_closed: boolean;
               note: string | null;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               studio_profile_id: string;
               day_of_week: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
               open_time?: string | null;
               close_time?: string | null;
               is_closed?: boolean;
               note?: string | null;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               studio_profile_id?: string;
               day_of_week?: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
               open_time?: string | null;
               close_time?: string | null;
               is_closed?: boolean;
               note?: string | null;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         // -----------------------------------------------------------------------
         // MODUL 2: LAYANAN (Services)
         // -----------------------------------------------------------------------

         service_category: {
            Row: {
               id: string;
               name: string;
               slug: string;
               description: string | null;
               sort_order: number;
               is_active: boolean;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               name: string;
               slug: string;
               description?: string | null;
               sort_order?: number;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               name?: string;
               slug?: string;
               description?: string | null;
               sort_order?: number;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
         };

         service: {
            Row: {
               id: string;
               service_category_id: string;
               name: string;
               slug: string;
               description: string | null;
               short_description: string | null;
               duration_minutes: number | null;
               is_available: boolean;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               service_category_id: string;
               name: string;
               slug: string;
               description?: string | null;
               short_description?: string | null;
               duration_minutes?: number | null;
               is_available?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               service_category_id?: string;
               name?: string;
               slug?: string;
               description?: string | null;
               short_description?: string | null;
               duration_minutes?: number | null;
               is_available?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         service_price: {
            Row: {
               id: string;
               service_id: string;
               label: string;
               price_min: number | null;
               price_max: number | null;
               unit: string | null;
               note: string | null;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               service_id: string;
               label: string;
               price_min?: number | null;
               price_max?: number | null;
               unit?: string | null;
               note?: string | null;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               service_id?: string;
               label?: string;
               price_min?: number | null;
               price_max?: number | null;
               unit?: string | null;
               note?: string | null;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         service_image: {
            Row: {
               id: string;
               service_id: string;
               image_url: string;
               alt_text: string | null;
               is_cover: boolean;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               service_id: string;
               image_url: string;
               alt_text?: string | null;
               is_cover?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               service_id?: string;
               image_url?: string;
               alt_text?: string | null;
               is_cover?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         // -----------------------------------------------------------------------
         // MODUL 3: GALERI (Gallery)
         // -----------------------------------------------------------------------

         gallery_category: {
            Row: {
               id: string;
               name: string;
               slug: string;
               description: string | null;
               sort_order: number;
               is_active: boolean;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               name: string;
               slug: string;
               description?: string | null;
               sort_order?: number;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               name?: string;
               slug?: string;
               description?: string | null;
               sort_order?: number;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
         };

         gallery_photo: {
            Row: {
               id: string;
               gallery_category_id: string | null;
               image_url: string;
               thumbnail_url: string | null;
               alt_text: string | null;
               title: string | null;
               description: string | null;
               is_featured: boolean;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               gallery_category_id?: string | null;
               image_url: string;
               thumbnail_url?: string | null;
               alt_text?: string | null;
               title?: string | null;
               description?: string | null;
               is_featured?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               gallery_category_id?: string | null;
               image_url?: string;
               thumbnail_url?: string | null;
               alt_text?: string | null;
               title?: string | null;
               description?: string | null;
               is_featured?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         // -----------------------------------------------------------------------
         // MODUL 4: FAQ & AFTER CARE
         // -----------------------------------------------------------------------

         faq_category: {
            Row: {
               id: string;
               name: string;
               slug: string;
               sort_order: number;
               is_active: boolean;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               name: string;
               slug: string;
               sort_order?: number;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               name?: string;
               slug?: string;
               sort_order?: number;
               is_active?: boolean;
               created_at?: string;
               updated_at?: string;
            };
         };

         faq: {
            Row: {
               id: string;
               faq_category_id: string | null;
               question: string;
               answer: string;
               is_active: boolean;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               faq_category_id?: string | null;
               question: string;
               answer: string;
               is_active?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               faq_category_id?: string | null;
               question?: string;
               answer?: string;
               is_active?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         after_care: {
            Row: {
               id: string;
               title: string;
               content: string;
               icon_name: string | null;
               is_active: boolean;
               sort_order: number;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               title: string;
               content: string;
               icon_name?: string | null;
               is_active?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               title?: string;
               content?: string;
               icon_name?: string | null;
               is_active?: boolean;
               sort_order?: number;
               created_at?: string;
               updated_at?: string;
            };
         };

         // -----------------------------------------------------------------------
         // MODUL 5: PESAN KONTAK (Contact Message)
         // -----------------------------------------------------------------------

         contact_message: {
            Row: {
               id: string;
               name: string;
               email: string;
               phone: string | null;
               subject: string | null;
               message: string;
               status: "new" | "read" | "replied" | "archived";
               ip_address: string | null;
               created_at: string;
               updated_at: string;
            };
            Insert: {
               id?: string;
               name: string;
               email: string;
               phone?: string | null;
               subject?: string | null;
               message: string;
               status?: "new" | "read" | "replied" | "archived";
               ip_address?: string | null;
               created_at?: string;
               updated_at?: string;
            };
            Update: {
               id?: string;
               name?: string;
               email?: string;
               phone?: string | null;
               subject?: string | null;
               message?: string;
               status?: "new" | "read" | "replied" | "archived";
               ip_address?: string | null;
               created_at?: string;
               updated_at?: string;
            };
         };
      };

      Views: {
         [_ in never]: never;
      };

      Functions: {
         [_ in never]: never;
      };

      Enums: {
         day_of_week: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
         contact_status: "new" | "read" | "replied" | "archived";
      };
   };
}

// =============================================================================
// Helper Types — shorthand untuk dipakai di komponen React / service functions
// =============================================================================

type Tables<T extends keyof Database["public"]["Tables"]> =
   Database["public"]["Tables"][T]["Row"];

type InsertTables<T extends keyof Database["public"]["Tables"]> =
   Database["public"]["Tables"][T]["Insert"];

type UpdateTables<T extends keyof Database["public"]["Tables"]> =
   Database["public"]["Tables"][T]["Update"];

// Modul 1 — Studio Profile
export type StudioProfile = Tables<"studio_profile">;
export type Location = Tables<"location">;
export type ContactInformation = Tables<"contact_information">;
export type OperatingHours = Tables<"operating_hours">;

// Modul 2 — Layanan
export type ServiceCategory = Tables<"service_category">;
export type Service = Tables<"service">;
export type ServicePrice = Tables<"service_price">;
export type ServiceImage = Tables<"service_image">;

// Modul 3 — Galeri
export type GalleryCategory = Tables<"gallery_category">;
export type GalleryPhoto = Tables<"gallery_photo">;

// Modul 4 — FAQ & After Care
export type FaqCategory = Tables<"faq_category">;
export type Faq = Tables<"faq">;
export type AfterCare = Tables<"after_care">;

// Modul 5 — Pesan Kontak
export type ContactMessage = Tables<"contact_message">;
export type InsertContactMessage = InsertTables<"contact_message">;
export type UpdateContactMessage = UpdateTables<"contact_message">;

// Insert types yang sering dipakai
export type InsertStudioProfile = InsertTables<"studio_profile">;
export type InsertLocation = InsertTables<"location">;
export type InsertContactInformation = InsertTables<"contact_information">;
export type InsertOperatingHours = InsertTables<"operating_hours">;
export type InsertServiceCategory = InsertTables<"service_category">;
export type InsertService = InsertTables<"service">;
export type InsertServicePrice = InsertTables<"service_price">;
export type InsertServiceImage = InsertTables<"service_image">;
export type InsertGalleryCategory = InsertTables<"gallery_category">;
export type InsertGalleryPhoto = InsertTables<"gallery_photo">;
export type InsertFaqCategory = InsertTables<"faq_category">;
export type InsertFaq = InsertTables<"faq">;
export type InsertAfterCare = InsertTables<"after_care">;

// Composite types — untuk JOIN queries di frontend
export type ServiceWithDetails = Service & {
   service_category: ServiceCategory | null;
   service_price: ServicePrice[];
   service_image: ServiceImage[];
};

export type GalleryPhotoWithCategory = GalleryPhoto & {
   gallery_category: GalleryCategory | null;
};

export type FaqWithCategory = Faq & {
   faq_category: FaqCategory | null;
};
