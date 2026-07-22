import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { FAQS } from "../data/constants";

export default function FaqPage() {
  return (
    <section className="py-32 bg-[#111111] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">
            FAQ
          </h1>
          <Accordion.Root type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, i) => (
              <Accordion.Item
                value={`item-${i}`}
                key={i}
                className="border-b border-white/10 overflow-hidden"
              >
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
          <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">
            Tattoo After Care
          </h2>
          <div className="space-y-6 text-gray-400 font-light text-sm leading-relaxed">
            <p>
              <strong className="text-white font-medium">
                1. Keep it wrapped:
              </strong>{" "}
              Leave the initial bandage on for 2-4 hours, or follow your
              artist&apos;s specific instructions regarding second-skin
              adhesives.
            </p>
            <p>
              <strong className="text-white font-medium">
                2. Wash gently:
              </strong>{" "}
              Wash the tattoo with warm water and a fragrance-free,
              antibacterial soap. Pat dry with a clean paper towel.
            </p>
            <p>
              <strong className="text-white font-medium">3. Moisturize:</strong>{" "}
              Apply a very thin layer of aftercare ointment (like Aquaphor) for
              the first 3 days, then switch to a fragrance-free lotion.
            </p>
            <p>
              <strong className="text-white font-medium">4. Avoid:</strong>{" "}
              Direct sunlight, soaking in water (baths, pools, ocean), and
              picking or scratching at the scabs.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
