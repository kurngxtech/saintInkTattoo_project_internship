// =============================================================================
// Saint Ink Tattoo — Services Barrel Export
// File   : index.ts
// Cara import di frontend:
//   import { getStudioProfile, getGalleryPhotos } from '../../Backend/Supabase/services';
// =============================================================================

// Modul 1: Studio Profile
export {
  getStudioProfile,
  getLocation,
  getContactInformation,
  getOperatingHours,
  getStudioProfileFull,
  type StudioProfileFull,
} from "./studioService";

// Modul 2: Layanan (Services)
export {
  getServiceCategories,
  getServices,
  getServiceBySlug,
  getServiceWithDetails,
  getAllServicesWithDetails,
} from "./serviceService";

// Modul 3: Galeri (Gallery)
export {
  getGalleryCategories,
  getGalleryPhotos,
  getGalleryPhotosWithCategory,
  getFeaturedGalleryPhotos,
} from "./galleryService";

// Modul 4: FAQ & After Care
export {
  getFaqCategories,
  getFaqs,
  getFaqsWithCategory,
  getFaqsGroupedByCategory,
  getAfterCare,
  type FaqGroup,
} from "./faqService";
