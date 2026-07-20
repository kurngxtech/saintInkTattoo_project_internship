import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { Menu, X, ArrowRight, Instagram, Facebook, Twitter, MapPin, Clock, Phone, Mail, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';

// --- Assets / Mock Data ---

import img0423 from "./assets/image/IMG_0423.jpg";
import img1886 from "./assets/image/IMG_1886.jpg";
import img3407 from "./assets/image/IMG_3407.jpg";
import img4809 from "./assets/image/IMG_4809.jpg";
import img4917 from "./assets/image/IMG_4917.JPG.jpeg";
import img6527 from "./assets/image/IMG_6527.jpg";
import img7080 from "./assets/image/IMG_7080.jpg";
import img8550 from "./assets/image/IMG_8550.jpg";

import img3959 from "./assets/image/IMG_3959.png";

const MOCK_IMAGES = {
   hero: img4917,
   gallery: [
      img3959,
      img0423,
      img1886,
      img3407,
      img4809,
      img6527,
   ],
   studio1: img7080,
   studio2: img8550
};

const SERVICES = [
   { name: "Fine Line & Minimalist", price: "Starts from $150", desc: "Delicate, detailed, and subtle designs focusing on precise linework." },
   { name: "Black & Grey Realism", price: "Starts from $300", desc: "High-contrast, hyper-realistic portraits and surrealism." },
   { name: "Traditional & Neo-Trad", price: "Starts from $200", desc: "Bold lines, vibrant colors, and classic motifs reimagined." },
   { name: "Custom Sleeves & Large Scale", price: "By Consultation", desc: "Bespoke conceptual pieces tailored entirely to your body's flow." }
];

const FAQS = [
   { q: "How do I book an appointment?", a: "You can start by filling out our consultation form or contacting us via WhatsApp. We require a deposit to secure your booking." },
   { q: "Does getting a tattoo hurt?", a: "Pain is subjective and varies depending on placement and personal tolerance. We aim to provide a comfortable, relaxed environment." },
   { q: "How should I prepare for my session?", a: "Get plenty of rest, eat a solid meal beforehand, and stay hydrated. Avoid alcohol for at least 24 hours prior." },
   { q: "Do you accept walk-ins?", a: "We primarily operate by appointment to ensure each client receives the dedicated time they deserve, but we occasionally announce walk-in availability on Instagram." }
];

// --- Components ---

function NavBar() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const scrollTo = (id: string) => {
      setMobileMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };

   const navLinks = [
      { name: 'Gallery', id: 'gallery' },
      { name: 'Services', id: 'services' },
      { name: 'About Us', id: 'about' },
      { name: 'FAQ', id: 'faq' },
      { name: 'Contact', id: 'contact' },
   ];

   return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${isScrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
         <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <Link to="/" className="text-2xl font-serif text-white tracking-widest font-bold">
               INK<span className="font-light italic text-gray-400">NOIR</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center">
               {navLinks.map(link => (
                  <button key={link.name} onClick={() => scrollTo(link.id)} className="text-sm tracking-widest text-gray-300 hover:text-white uppercase transition-colors">
                     {link.name}
                  </button>
               ))}
            </nav>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
               <Menu className="w-6 h-6" />
            </button>
         </div>

         {/* Mobile Menu */}
         <AnimatePresence>
            {mobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 bg-[#0D0D0D] z-50 flex flex-col items-center justify-center space-y-8"
               >
                  <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)}>
                     <X className="w-8 h-8" />
                  </button>
                  {navLinks.map(link => (
                     <button key={link.name} onClick={() => scrollTo(link.id)} className="text-2xl font-serif text-gray-300 hover:text-white tracking-widest transition-colors">
                        {link.name}
                     </button>
                  ))}
               </motion.div>
            )}
         </AnimatePresence>
      </header>
   );
}

function HeroSection() {
   return (
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src={MOCK_IMAGES.hero} alt="Tattoo Artist at work" className="w-full h-full object-cover opacity-30 object-right md:object-center grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent h-48 bottom-0 top-auto"></div>
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <p className="uppercase tracking-[0.2em] text-xs text-gray-400 mb-4 border-l-2 border-gray-500 pl-4">Premium Tattoo Studio</p>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] text-white">
                     Skin <br />
                     <span className="italic text-gray-400 font-light">&</span> Canvas.
                  </h1>
               </motion.div>
               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-gray-300 text-lg md:text-xl font-light max-w-md leading-relaxed">
                  Elevating body art to fine art. A private, luxury experience for the discerning collector.
               </motion.p>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-4 bg-white text-[#0D0D0D] px-8 py-4 rounded-none hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-medium">
                     Book Consultation
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </motion.div>
            </div>

            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.3 }}
               className="hidden md:block relative aspect-[3/4] w-full max-w-md ml-auto"
            >
               <div className="absolute inset-0 border border-white/20 translate-x-4 -translate-y-4"></div>
               <img src={MOCK_IMAGES.gallery[0]} alt="Featured Work" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
         </div>
      </section>
   );
}

function GallerySection() {
   const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Portfolio</h2>
                  <p className="text-gray-400 tracking-widest uppercase text-sm">Selected Works</p>
               </div>
               <button className="text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors uppercase tracking-widest text-xs">
                  View Instagram
               </button>
            </div>

            {/* Portrait Grid */}
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
         <Dialog.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <Dialog.Portal>
               <Dialog.Overlay className="fixed inset-0 bg-black/90 z-[60] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
               <Dialog.Content className="fixed left-[50%] top-[50%] z-[70] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-4xl max-h-[90vh] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                  <div className="relative">
                     {selectedImage && (
                        <img src={selectedImage} alt="Detail view" className="w-full h-auto max-h-[85vh] object-contain" />
                     )}
                     <Dialog.Close asChild>
                        <button className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors" aria-label="Close">
                           <X className="w-8 h-8" />
                        </button>
                     </Dialog.Close>
                     <div className="mt-4 flex justify-between items-center text-white">
                        <span className="font-serif text-xl">Detail Foto Portofolio</span>
                        <span className="text-sm uppercase tracking-widest text-gray-400">InkNoir Studio</span>
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
               <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Services</h2>
               <div className="w-12 h-[1px] bg-gray-500 mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto">
               {SERVICES.map((service, i) => (
                  <div key={i} className="group border-b border-white/10 py-8 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/40 transition-colors">
                     <div className="flex-1">
                        <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gray-300 transition-colors">{service.name}</h3>
                        <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg">{service.desc}</p>
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

function AboutSection() {
   return (
      <section id="about" className="py-24 bg-[#0D0D0D]">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center"
         >
            <div className="space-y-8 order-2 md:order-1">
               <h2 className="text-4xl md:text-6xl font-serif text-white">The Studio</h2>
               <p className="text-gray-400 text-lg font-light leading-relaxed">
                  InkNoir was founded on the principle that body art should be treated with the same reverence as fine art. We provide a private, sterile, and luxurious environment where your vision is brought to life by master artists.
               </p>
               <p className="text-gray-400 text-lg font-light leading-relaxed">
                  Every session is tailored. Every design is custom. We believe in the collaborative process between artist and collector, ensuring a piece that transcends time.
               </p>

               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                     <h4 className="text-white uppercase tracking-widest text-xs mb-3 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h4>
                     <p className="text-gray-400 font-light text-sm">123 Atelier Avenue<br />Creative District, NY 10012</p>
                  </div>
                  <div>
                     <h4 className="text-white uppercase tracking-widest text-xs mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Hours</h4>
                     <p className="text-gray-400 font-light text-sm">Tue - Sun: 11AM - 8PM<br />Monday: Closed</p>
                  </div>
               </div>
            </div>

            <div className="order-1 md:order-2 grid grid-cols-2 gap-4 h-[600px]">
               <div className="mt-12 h-full">
                  <img src={MOCK_IMAGES.studio1} alt="Studio Interior" className="w-full h-full object-cover grayscale" />
               </div>
               <div className="mb-12 h-full">
                  <img src={MOCK_IMAGES.studio2} alt="Tattoo Session" className="w-full h-full object-cover grayscale" />
               </div>
            </div>
         </motion.div>
      </section>
   );
}

function FAQSection() {
   return (
      <section id="faq" className="py-24 bg-[#111111]">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16"
         >
            <div>
               <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">FAQ</h2>
               <Accordion.Root type="single" collapsible className="w-full space-y-4">
                  {FAQS.map((faq, i) => (
                     <Accordion.Item value={`item-${i}`} key={i} className="border-b border-white/10 overflow-hidden">
                        <Accordion.Header>
                           <Accordion.Trigger className="flex w-full items-center justify-between py-6 text-left text-lg text-white font-serif hover:text-gray-300 transition-colors group">
                              {faq.q}
                              <span className="transform transition-transform duration-300 group-data-[state=open]:rotate-180">
                                 +
                              </span>
                           </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="text-gray-400 font-light text-sm leading-relaxed pb-6 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                           {faq.a}
                        </Accordion.Content>
                     </Accordion.Item>
                  ))}
               </Accordion.Root>
            </div>

            <div className="bg-[#0D0D0D] p-8 md:p-12 border border-white/5">
               <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">Tattoo After Care</h2>
               <div className="space-y-6 text-gray-400 font-light text-sm leading-relaxed">
                  <p><strong className="text-white font-medium">1. Keep it wrapped:</strong> Leave the initial bandage on for 2-4 hours, or follow your artist's specific instructions regarding second-skin adhesives.</p>
                  <p><strong className="text-white font-medium">2. Wash gently:</strong> Wash the tattoo with warm water and a fragrance-free, antibacterial soap. Pat dry with a clean paper towel.</p>
                  <p><strong className="text-white font-medium">3. Moisturize:</strong> Apply a very thin layer of aftercare ointment (like Aquaphor) for the first 3 days, then switch to a fragrance-free lotion.</p>
                  <p><strong className="text-white font-medium">4. Avoid:</strong> Direct sunlight, soaking in water (baths, pools, ocean), and picking or scratching at the scabs.</p>
               </div>
            </div>
         </motion.div>
      </section>
   );
}

function ContactSection() {
   const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormStatus('submitting');
      setTimeout(() => setFormStatus('success'), 1500);
   };

   return (
      <section id="contact" className="py-24 bg-[#0D0D0D]">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 md:px-12"
         >
            <div className="grid md:grid-cols-2 gap-16">

               <div>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Get in Touch</h2>
                  <p className="text-gray-400 font-light text-lg mb-12 max-w-md">
                     Ready to begin your project? Contact us to schedule a consultation or inquire about artist availability.
                  </p>

                  <div className="space-y-8">
                     <a href="#" className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors group">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                           <Phone className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="uppercase tracking-widest text-xs text-gray-500 mb-1">WhatsApp / Phone</div>
                           <div className="font-serif text-xl">+1 (555) 123-4567</div>
                        </div>
                     </a>

                     <a href="#" className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors group">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                           <Mail className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="uppercase tracking-widest text-xs text-gray-500 mb-1">Email</div>
                           <div className="font-serif text-xl">booking@inknoir.com</div>
                        </div>
                     </a>
                  </div>
               </div>

               <div className="bg-[#111111] p-8 md:p-12 border border-white/5 relative">
                  <h3 className="text-2xl font-serif text-white mb-8">Form Pesan</h3>

                  {formStatus === 'success' ? (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[#111111] flex flex-col items-center justify-center text-center p-8 border border-white/5">
                        <CheckCircle2 className="w-16 h-16 text-white mb-4" />
                        <h4 className="text-2xl font-serif text-white mb-2">Message Sent</h4>
                        <p className="text-gray-400 font-light">We will get back to you within 24-48 hours.</p>
                        <button onClick={() => setFormStatus('idle')} className="mt-8 text-xs uppercase tracking-widest border-b border-white pb-1 text-white">Send Another</button>
                     </motion.div>
                  ) : (
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                           <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                           <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white transition-colors" placeholder="Your full name" />
                        </div>
                        <div>
                           <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                           <input required type="email" className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white transition-colors" placeholder="your@email.com" />
                        </div>
                        <div>
                           <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message / Idea</label>
                           <textarea required rows={4} className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white transition-colors resize-none" placeholder="Tell us about your tattoo idea, placement, and preferred style..."></textarea>
                        </div>
                        <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-white text-[#0D0D0D] py-4 uppercase tracking-widest text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                           {formStatus === 'submitting' ? 'Sending...' : 'Kirim Pesan'}
                        </button>
                     </form>
                  )}
               </div>

            </div>
         </motion.div>
      </section>
   );
}

function Footer() {
   return (
      <footer className="bg-[#0D0D0D] border-t border-white/5 py-12">
         <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-serif text-white tracking-widest font-bold">
               INK<span className="font-light italic text-gray-400">NOIR</span>
            </div>

            <div className="flex gap-6 text-gray-400">
               <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
               <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>

            <div className="flex gap-6 text-xs uppercase tracking-widest text-gray-600">
               <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
            </div>

            <div className="text-xs text-gray-700">
               © {new Date().getFullYear()} InkNoir Studio.
            </div>
         </div>
      </footer>
   );
}

// --- Pages ---

function LandingPage() {
   return (
      <div className="bg-[#0D0D0D] min-h-screen text-white font-sans selection:bg-white selection:text-black">
         <NavBar />
         <main>
            <HeroSection />
            <GallerySection />
            <ServicesSection />
            <AboutSection />
            <FAQSection />
            <ContactSection />
         </main>
         <Footer />
      </div>
   );
}

function AdminLoginPage() {
   return (
      <div className="bg-[#0D0D0D] min-h-screen flex items-center justify-center p-6 font-sans text-white">
         <div className="w-full max-w-md bg-[#111111] p-8 border border-white/10">
            <div className="text-center mb-10">
               <div className="text-2xl font-serif text-white tracking-widest font-bold mb-2">
                  INK<span className="font-light italic text-gray-400">NOIR</span>
               </div>
               <p className="text-gray-500 uppercase tracking-widest text-xs">Admin Portal</p>
            </div>

            <form className="space-y-6">
               <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Username</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" />
               </div>
               <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
                  <input type="password" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" />
               </div>
               <button type="button" className="w-full bg-white text-[#0D0D0D] py-3 uppercase tracking-widest text-sm font-medium hover:bg-gray-200 transition-colors mt-4">
                  Sign In
               </button>
               <div className="text-center mt-6">
                  <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest">← Back to Site</Link>
               </div>
            </form>
         </div>
      </div>
   );
}

// --- Main App ---

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
         </Routes>
      </BrowserRouter>
   );
}
