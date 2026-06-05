import { motion } from "motion/react";

const paragraphs = [
  "You've been carrying a lot. The stress that never quite resolves. The anxiety that hums beneath the surface. The exhaustion that rest does not seem to touch.",
  "You've been strong for a long time. You've read the books. Listened to the podcasts. Done the work. And kept going.",
  "And still, somewhere underneath it all, there is a part of you that feels tired. A part of you that longs to let go of the pressure. A part of you that wants to stop performing and simply be.",
  "You're not alone in this.",
  "More people than you realize are carrying stress, self-doubt, anxiety, grief, or old patterns beneath the surface while trying to hold everything together.",
  "This is not a character flaw, nor is it a sign of weakness. It is often what happens when the body has carried more than it has had the opportunity to process. When life has required you to keep moving, even when something inside you needed space, attention, and care.",
  "The answers are not outside of you.",
  "You may simply need the space and guidance to slow down, listen deeply, and reconnect with what has been there all along.",
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
          DOING LESS, NOT MORE
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
