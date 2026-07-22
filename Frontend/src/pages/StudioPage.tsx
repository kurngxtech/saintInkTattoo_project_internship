import { motion } from "motion/react";
import { MapPin, Clock } from "lucide-react";
import { MOCK_IMAGES, SERVICES } from "../data/constants";

export default function StudioPage() {
  return (
    <>
      {/* The Studio section */}
      <section className="py-32 bg-[#0D0D0D] min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8 order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-serif text-white">
              The Studio
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              InkNoir was founded on the principle that body art should be
              treated with the same reverence as fine art. We provide a private,
              sterile, and luxurious environment where your vision is brought to
              life by master artists.
            </p>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Every session is tailored. Every design is custom. We believe in
              the collaborative process between artist and collector, ensuring a
              piece that transcends time.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="text-white uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </h4>
                <p className="text-gray-400 font-light text-sm">
                  123 Atelier Avenue
                  <br />
                  Creative District, NY 10012
                </p>
              </div>
              <div>
                <h4 className="text-white uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Hours
                </h4>
                <p className="text-gray-400 font-light text-sm">
                  Tue - Sun: 11AM - 8PM
                  <br />
                  Monday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4 h-[600px]">
            <div className="mt-12 h-full">
              <img
                src={MOCK_IMAGES.studio1}
                alt="Studio Interior"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="mb-12 h-full">
              <img
                src={MOCK_IMAGES.studio2}
                alt="Tattoo Session"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services section */}
      <section className="py-24 bg-[#111111] border-y border-white/5">
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
    </>
  );
}
