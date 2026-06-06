import { motion } from "motion/react";
import { INTAKE_FORM_URL } from "../types";

const paragraphs = [
  "For many years, I felt lost.",
  "I struggled with depression, anxiety, emotional eating, and a deep disconnection from myself.",
  "No matter how much I tried to push through or understand what was wrong, I would always end up in emotional breakdowns again.",
  "Looking back, I can see how much of my life was shaped by conditioning, expectations, and patterns that were never truly mine.",
  "I spent years suppressing emotions, ignoring the signals of my body, and searching for answers outside of myself.",
  "Eventually, my body spoke louder.",
  "Burnout, chronic pain, and complete exhaustion forced me to stop and listen.",
  "I genuinely loved my job as a psychiatric nurse, but it also took its toll, supporting others through deep struggles while navigating my own.",
  "Over the years, breathwork, somatic practices, therapy, coaching, and a deep commitment to self-inquiry became part of my path.",
  "They helped me understand what my body had been trying to tell me for years. They helped me meet parts of myself that I had spent a lifetime avoiding.",
  "This journey did not lead me to perfection.",
  "It led me back to my true self.",
  "Today, I feel more grounded and at peace than I once believed possible.",
  "And at the same time, I know that growth never truly ends.",
  "I am still learning. Still uncovering new layers.",
  "But now, I meet those layers with curiosity and compassion instead of self-judgment.",
  "That is why I love this work. I can combine my clinical background with my own lived experience.",
  "I do not have all the answers, but I know what it feels like to lose yourself — and what it feels like to find your way back.",
];

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
            MY PATH BACK TO MYSELF
          </motion.h2>

          <div className="space-y-5 font-sans text-base text-[#334233]/80 leading-relaxed">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.04 * i }}
              >
                {para}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.04 * paragraphs.length }}
              className="font-serif italic text-[#334233]/90"
            >
              The goal is not perfection. The goal is freedom.
            </motion.p>
          </div>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-4 bg-[#334233] text-[#FAF6F0] font-sans text-sm rounded-full hover:bg-[#658365] transition-colors duration-200"
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
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/flo-first-doorway.jpg"
              alt="Flo smiling in a natural setting"
              className="w-full h-[480px] md:h-[560px] object-cover object-top"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C4924A]/10 rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
