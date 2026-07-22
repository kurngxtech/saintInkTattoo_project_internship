import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { MOCK_IMAGES, SERVICES } from "../data/constants";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={MOCK_IMAGES.hero}
          alt="Tattoo Artist at work"
          className="w-full h-full object-cover opacity-30 object-right md:object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent h-48 bottom-0 top-auto"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.2em] text-xs text-gray-400 mb-4 border-l-2 border-gray-500 pl-4">
              Premium Tattoo Studio
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] text-white">
              Skin <br />
              <span className="italic text-gray-400 font-light">&</span>{" "}
              Canvas.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl font-light max-w-md leading-relaxed"
          >
            Elevating body art to fine art. A private, luxury experience for
            the discerning collector.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="group flex items-center gap-4 bg-white text-[#0D0D0D] px-8 py-4 rounded-none hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-medium w-fit"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:block relative aspect-[3/4] w-full max-w-md ml-auto"
        >
          <div className="absolute inset-0 border border-white/20 translate-x-4 -translate-y-4"></div>
          <img
            src={MOCK_IMAGES.gallery[0]}
            alt="Featured Work"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}

function GalleryPreviewSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const previewImages = MOCK_IMAGES.gallery.slice(0, 3);

  return (
    <section id="gallery" className="py-24 bg-[#0D0D0D]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
              Portfolio
            </h2>
            <p className="text-gray-400 tracking-widest uppercase text-sm">
              Selected Works
            </p>
          </div>
          <Link
            to="/gallery"
            className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors uppercase tracking-widest text-xs"
          >
            View All Works
          </Link>
        </div>

        {/* Portrait Grid — preview 3 images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {previewImages.map((img, i) => (
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

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-4 border border-white/30 text-white px-8 py-4 hover:bg-white hover:text-[#0D0D0D] transition-all uppercase tracking-widest text-sm"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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

function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#111111] border-y border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Services
          </h2>
          <div className="w-12 h-[1px] bg-gray-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="group border-b border-white/10 py-8 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/40 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg">
                  {service.desc}
                </p>
              </div>
              <div className="text-left md:text-right">
                <span className="inline-block uppercase tracking-widest text-xs text-white border border-white/20 px-4 py-2 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GalleryPreviewSection />
      <ServicesSection />
    </>
  );
}
