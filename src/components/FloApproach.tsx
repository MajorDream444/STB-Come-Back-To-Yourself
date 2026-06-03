import { motion } from "motion/react";
import { APPROACH_STEPS } from "../types";

export default function FloApproach() {
  return (
    <section id="approach" className="bg-[#FAF6F0] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-4 text-center"
        >
          The Approach
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-[#1a2e1a] mb-4 text-center leading-tight"
        >
          The Flo Approach
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-accent text-sm tracking-widest uppercase text-[#C4924A] text-center mb-16"
        >
          Simple. Practical. Sustainable.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          {APPROACH_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="text-center"
            >
              <p className="font-serif text-6xl text-[#E9EFE9] mb-4 leading-none select-none">
                {step.number}
              </p>
              <h3 className="font-serif text-2xl text-[#1a2e1a] mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-[#658365] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
