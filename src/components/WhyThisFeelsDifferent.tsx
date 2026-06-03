import { motion } from "motion/react";
import fieldImage from "../assets/images/regenerated_image_1780274117711.jpg";

const lines = [
  "You do not need to arrive with the right words.",
  "You do not need to know exactly what is wrong.",
  "You do not need to have it figured out.",
  "This work is not about becoming someone else. It is about creating enough safety to reconnect with what is already true.",
  "Many people describe the experience as finally being able to exhale.",
];

export default function WhyThisFeelsDifferent() {
  return (
    <section id="whythisfeelsdifferent" className="bg-[#E9EFE9] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={fieldImage}
            alt="Peaceful nature scene"
            className="w-full h-80 md:h-[480px] object-cover rounded-2xl"
          />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#C4924A]/10 rounded-2xl -z-10" />
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-6"
          >
            Why This Feels Different
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-[#1a2e1a] mb-8 leading-tight"
          >
            A Space To Be Honest
          </motion.h2>

          <div className="space-y-5 font-sans text-base text-[#334233]/80 leading-relaxed">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
