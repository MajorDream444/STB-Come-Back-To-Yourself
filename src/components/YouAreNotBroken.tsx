import { motion } from "motion/react";

const paragraphs = [
  "You have been carrying a lot. The stress that never quite resolves. The anxiety that hums underneath everything. The exhaustion that sleep doesn't seem to fix.",
  "You have tried to be strong. You have tried to manage it, optimize it, push through it. You have read the books, followed the advice, kept going.",
  "And still, somewhere underneath all of it, there is a part of you that is tired of holding it together. A part of you that wants to stop performing and simply be.",
  "This is not a character flaw. It is not weakness. It is what happens when the body carries more than it can process — when there has not been a space safe enough to slow down.",
  "You do not need fixing. You may simply need a space where your body can finally feel safe enough to slow down.",
];

export default function YouAreNotBroken() {
  return (
    <section id="youarenotbroken" className="bg-[#FAF6F0] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-6"
        >
          The Reality
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-[#1a2e1a] mb-10 leading-tight"
        >
          You Are Not Broken
        </motion.h2>

        <div className="space-y-6 font-sans text-base md:text-lg text-[#334233]/80 leading-relaxed">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
