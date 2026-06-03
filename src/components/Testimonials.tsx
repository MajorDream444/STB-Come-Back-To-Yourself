import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "../types";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="bg-[#1a2e1a] py-24 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-4"
        >
          Letters from the center
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl text-[#FAF6F0] mb-16"
        >
          What people carry away.
        </motion.h2>

        <div className="relative min-h-[180px] flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <p className="font-serif text-xl md:text-2xl text-[#FAF6F0]/90 italic leading-relaxed">
                &ldquo;{TESTIMONIALS[active].quote}&rdquo;
              </p>
              <div>
                <p className="font-accent text-xs font-bold tracking-widest text-[#C4924A]">
                  {TESTIMONIALS[active].author}
                </p>
                <p className="text-[10px] font-accent text-[#4a5f4a] mt-0.5">
                  {TESTIMONIALS[active].role} — {TESTIMONIALS[active].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === active ? "bg-[#C4924A] w-6" : "bg-[#334233] w-1.5 hover:bg-[#4a5f4a]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
