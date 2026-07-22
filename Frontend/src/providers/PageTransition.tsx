import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Full-screen black overlay with centered logo that fades in then out
 * on every route change. Inspired by premium tattoo studio sites.
 * Duration: ~800ms total — no white flash, no layout shift.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState<"idle" | "covering" | "revealing">("idle");

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    // Step 1: cover with overlay
    setStage("covering");

    const coverTimer = setTimeout(() => {
      // Step 2: swap the page content while overlay is opaque
      setDisplayLocation(location);
      window.scrollTo({ top: 0, behavior: "instant" });
      setStage("revealing");
    }, 500);

    const doneTimer = setTimeout(() => {
      setStage("idle");
    }, 1000);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(doneTimer);
    };
  }, [location, displayLocation.pathname]);

  return (
    <>
      {/* Render page using displayLocation so content swaps happen mid-transition */}
      <div key={displayLocation.pathname}>{children}</div>

      {/* Overlay */}
      <AnimatePresence>
        {(stage === "covering" || stage === "revealing") && (
          <motion.div
            key="page-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "covering" ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-[#0D0D0D] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl font-serif text-white tracking-widest font-bold select-none"
            >
              INK<span className="font-light italic text-gray-400">NOIR</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
