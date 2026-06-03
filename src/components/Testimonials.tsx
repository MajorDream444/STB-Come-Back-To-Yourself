import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../types";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="testimonials" className="bg-[#334233] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent text-xs tracking-widest uppercase text-[#E8D09A] mb-4"
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl text-[#FAF6F0] mb-16 leading-tight"
        >
          Words From The Work
        </motion.h2>

        <div className="relative min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-center gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#C4924A] text-[#C4924A]" />
                ))}
              </div>

              <p className="font-serif text-xl md:text-2xl text-[#FAF6F0]/90 italic leading-relaxed max-w-2xl mx-auto">
                "{TESTIMONIALS[current].quote}"
              </p>

              <div>
                <p className="font-accent text-xs tracking-widest uppercase text-[#E8D09A] font-semibold">
                  {TESTIMONIALS[current].name}
                </p>
                <p className="font-sans text-sm text-[#FAF6F0]/50 mt-1">
                  {TESTIMONIALS[current].role}, {TESTIMONIALS[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "w-8 h-2 bg-[#C4924A]"
                  : "w-2 h-2 bg-[#FAF6F0]/20 hover:bg-[#FAF6F0]/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
