import { motion } from "motion/react";
import fieldImage from "../assets/images/regenerated_image_1780274117711.jpg";

const lines = [
  "You do not need all the words.",
  "You do not need to know exactly what is limiting you.",
  "And it's okay if you do not have it all figured out.",
  "This work is not about proving anything.",
  "It is not about becoming someone else.",
  "But rather, what happens when you let go of the masks, the stories, and the protective patterns that have been keeping you small?",
  "Find and reconnect with your truth.",
  "I am not here to give you the answers.",
  "I guide you back to your own wisdom and help you reclaim your power.",
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
            className="w-full h-80 md:h-[480px] object-cover object-top rounded-2xl"
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
            OUT OF THE MIND, INTO THE BODY
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
