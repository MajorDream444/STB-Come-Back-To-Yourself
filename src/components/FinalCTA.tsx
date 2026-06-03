import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BOOKING_MAILTO } from "../types";

export default function FinalCTA() {
  return (
    <section id="finalcta" className="bg-[#FAF6F0] py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent text-xs tracking-widest uppercase text-[#658365]"
        >
          The First Step
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl text-[#1a2e1a] leading-tight"
        >
          You Do Not Need The Whole Path Today
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-16 h-px bg-[#C4924A] mx-auto origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="font-sans text-base md:text-lg text-[#658365] leading-relaxed"
        >
          You only need the first step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <a
            href={BOOKING_MAILTO}
            className="inline-flex items-center gap-3 bg-[#334233] hover:bg-[#1a2e1a] text-[#FAF6F0] font-accent font-semibold text-sm tracking-wider px-8 py-4 rounded-full transition-colors cursor-pointer shadow-lg"
          >
            Book a Free Discovery Call
            <ArrowRight className="w-4 h-4 text-[#C4924A]" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="font-serif italic text-[#8fa88f] text-sm md:text-base max-w-md mx-auto leading-relaxed"
        >
          Healing doesn't always begin with doing more.
          <br />
          Sometimes it begins with feeling safe enough to be honest.
        </motion.p>
      </div>
    </section>
  );
}
