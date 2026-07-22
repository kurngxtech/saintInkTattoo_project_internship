import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { motion } from "motion/react";
import { MainLayout } from "./layouts/MainLayout";
import { PageTransition } from "./providers/PageTransition";
import { ScrollToTop } from "./hooks/useScrollToTop";

// --- Lazy-loaded pages ---

const HomePage = React.lazy(() => import("./pages/HomePage"));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage"));
const StudioPage = React.lazy(() => import("./pages/StudioPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const FaqPage = React.lazy(() => import("./pages/FaqPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));

// --- Page loading fallback ---

function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#0D0D0D] flex items-center justify-center z-[998]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-3xl font-serif text-white tracking-widest font-bold select-none"
      >
        INK<span className="font-light italic text-gray-400">NOIR</span>
      </motion.div>
    </div>
  );
}

// --- Admin login page (standalone, no MainLayout) ---

function AdminLoginPage() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen flex items-center justify-center p-6 font-sans text-white">
      <div className="w-full max-w-md bg-[#111111] p-8 border border-white/10">
        <div className="text-center mb-10">
          <div className="text-2xl font-serif text-white tracking-widest font-bold mb-2">
            INK<span className="font-light italic text-gray-400">NOIR</span>
          </div>
          <p className="text-gray-500 uppercase tracking-widest text-xs">
            Admin Portal
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <button
            type="button"
            className="w-full bg-white text-[#0D0D0D] py-3 uppercase tracking-widest text-sm font-medium hover:bg-gray-200 transition-colors mt-4"
          >
            Sign In
          </button>
          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              ← Back to Site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Router — rendered inside BrowserRouter so hooks work ---

function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <ScrollToTop />
      <Routes location={location}>
        {/* Public routes — wrapped in MainLayout (NavBar + Footer) */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<PageLoader />}>
                <GalleryPage />
              </Suspense>
            }
          />
          <Route
            path="/studio"
            element={
              <Suspense fallback={<PageLoader />}>
                <StudioPage />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/faq"
            element={
              <Suspense fallback={<PageLoader />}>
                <FaqPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
        </Route>

        {/* Standalone admin route — no NavBar/Footer */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Routes>
    </PageTransition>
  );
}

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
