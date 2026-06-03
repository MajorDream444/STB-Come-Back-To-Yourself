import { motion } from "motion/react";
import floImage from "../assets/images/regenerated_image_1780275760582.jpg";
import { BOOKING_MAILTO } from "../types";

export default function AboutFlo() {
  return (
    <section id="about" className="bg-[#E9EFE9] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-6"
          >
            About Flo
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-[#1a2e1a] mb-8 leading-tight"
          >
            My Path Back To Myself
          </motion.h2>

          <div className="space-y-5 font-sans text-base text-[#334233]/80 leading-relaxed">
            {[
              "I spent years working in mental health nursing — holding space for others while quietly learning that the clinical system rarely had time for the most human part of healing.",
              "I also spent years in my own pattern of managing, pushing through, and performing wellness while something underneath stayed tight and unresolved.",
              "My turning point came through the body. Not through more thinking or more strategies, but through the quiet, steady intelligence of breath — and the realization that my nervous system had been trying to communicate with me for years.",
              "I discovered body-based approaches not as a trend, but as a doorway I hadn't known existed. Breathwork became the practice that changed everything — not because it fixed me, but because it taught me to stop fighting myself.",
              "Now I create the space I once needed for other people. People who are tired of performing. People who want something real.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 pl-6 border-l-2 border-[#C4924A] font-serif text-xl text-[#334233] italic"
          >
            "I am not here to convince you of a fantasy version of yourself. I
            am here to create a space where you can finally exhale."
          </motion.blockquote>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href={BOOKING_MAILTO}
            className="inline-block mt-8 px-8 py-4 bg-[#334233] text-[#FAF6F0] font-sans text-sm rounded-full hover:bg-[#658365] transition-colors duration-200 cursor-pointer"
          >
            Book a Free Discovery Call
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img
            src={floImage}
            alt="Flo under palms"
            className="w-full h-80 md:h-[560px] object-cover rounded-2xl"
          />
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C4924A]/10 rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
