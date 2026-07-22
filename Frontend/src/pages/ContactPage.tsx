import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <section className="py-32 bg-[#0D0D0D] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12"
      >
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">
              Get in Touch
            </h1>
            <p className="text-gray-400 font-light text-lg mb-12 max-w-md">
              Ready to begin your project? Contact us to schedule a consultation
              or inquire about artist availability.
            </p>

            <div className="space-y-8">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="uppercase tracking-widest text-xs text-gray-500 mb-1">
                    WhatsApp / Phone
                  </div>
                  <div className="font-serif text-xl">+1 (555) 123-4567</div>
                </div>
              </a>

              <a
                href="mailto:booking@inknoir.com"
                className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="uppercase tracking-widest text-xs text-gray-500 mb-1">
                    Email
                  </div>
                  <div className="font-serif text-xl">booking@inknoir.com</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-[#111111] p-8 md:p-12 border border-white/5 relative">
            <h2 className="text-2xl font-serif text-white mb-8">Form Pesan</h2>

            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#111111] flex flex-col items-center justify-center text-center p-8 border border-white/5"
              >
                <CheckCircle2 className="w-16 h-16 text-white mb-4" />
                <h3 className="text-2xl font-serif text-white mb-2">
                  Message Sent
                </h3>
                <p className="text-gray-400 font-light">
                  We will get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 text-xs uppercase tracking-widest border-b border-white pb-1 text-white"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    Message / Idea
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Tell us about your tattoo idea, placement, and preferred style..."
                  ></textarea>
                </div>
                <button
                  disabled={formStatus === "submitting"}
                  type="submit"
                  className="w-full bg-white text-[#0D0D0D] py-4 uppercase tracking-widest text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {formStatus === "submitting" ? "Sending..." : "Kirim Pesan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
