import { useState } from "react";
import { motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { MOCK_IMAGES } from "../data/constants";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-32 bg-[#0D0D0D] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Portfolio
            </h1>
            <p className="text-gray-400 tracking-widest uppercase text-sm">
              Selected Works
            </p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors uppercase tracking-widest text-xs"
          >
            View Instagram
          </a>
        </div>

        {/* Full Portrait Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {MOCK_IMAGES.gallery.map((img, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i}
              className="relative group cursor-pointer overflow-hidden aspect-[3/4] md:aspect-[4/5]"
              onClick={() => setSelectedImage(img)}
            >
              <div className="absolute inset-0 bg-[#0D0D0D]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img
                src={img}
                alt={`Portfolio piece ${i + 1}`}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal Popup */}
      <Dialog.Root
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90 z-[60] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[70] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-4xl max-h-[90vh] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="relative">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Detail view"
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              )}
              <Dialog.Close asChild>
                <button
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-8 h-8" />
                </button>
              </Dialog.Close>
              <div className="mt-4 flex justify-between items-center text-white">
                <span className="font-serif text-xl">Detail Foto Portofolio</span>
                <span className="text-sm uppercase tracking-widest text-gray-400">
                  InkNoir Studio
                </span>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
