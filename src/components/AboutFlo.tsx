import { motion } from "motion/react";
import { INTAKE_FORM_URL } from "../types";

const bodyParagraphs = [
  "Like many people, I spent years searching for answers.",
  "I experienced anxiety, burnout, emotional suppression, physical tension, and periods where I felt disconnected from myself.",
  "My background in mental health nursing gave me valuable insight into traditional approaches to care.",
  "But my own journey showed me that sometimes people need more than information. They need a way to reconnect with themselves.",
  "That path led me into breathwork, movement, nervous-system awareness, and body-based healing practices.",
  "Today I help people slow down, reconnect, and remember their own capacity to heal, feel, and move forward.",
];

const timeline = [
  {
    label: "Past",
    text: "I felt lost, overwhelmed, and disconnected from myself.",
  },
  {
    label: "Searching",
    text: "I tried many approaches, searching for answers outside of myself.",
  },
  {
    label: "Learning",
    text: "I began to explore the body, breath, and nervous system in a deeper way.",
  },
  {
    label: "Healing",
    text: "I found my way back to presence, through small moments and deep inner work.",
  },
  {
    label: "Now",
    text: "I hold space for others to reconnect and come back to themselves.",
  },
];

export default function AboutFlo() {
  return (
    <section id="about" className="bg-[#FAF6F0]">
      {/* Two-column intro */}
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-5"
          >
            About Flo
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-5xl md:text-6xl text-[#1a2e1a] mb-4 leading-none"
          >
            Hi, I'm Flo.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-xl md:text-2xl text-[#C4924A] mb-8 leading-snug"
          >
            My path back to myself{" "}
            <em className="italic">didn't</em> come easily.
          </motion.p>

          <div className="space-y-4 font-sans text-base text-[#334233]/80 leading-relaxed">
            {bodyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.4 }}
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-4 bg-[#334233] text-[#FAF6F0] font-sans text-sm rounded-full hover:bg-[#658365] transition-colors duration-200"
          >
            Book a Free Discovery Call
          </motion.a>
        </div>

        {/* Right: photo + quote card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="/flo-about-flowers.jpg"
              alt="Flo smiling in a natural setting"
              className="w-full h-[480px] md:h-[560px] object-cover object-top"
            />
          </div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-[-3rem] mx-6 relative z-10 bg-[#E9EFE9] rounded-2xl px-7 py-6 shadow-lg"
          >
            <span className="font-serif text-[#C4924A] text-3xl leading-none">"</span>
            <p className="font-serif text-[#1a2e1a] text-lg leading-relaxed -mt-2">
              You are not broken.
              <br />
              You may simply be carrying more than your body was meant to hold alone.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Journey timeline */}
      <div className="bg-[#F3F0E8] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-xl text-[#C4924A] mb-10 text-center md:text-left"
          >
            My journey
          </motion.p>

          {/* Timeline dots + line */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[10px] left-[10%] right-[10%] h-px bg-[#334233]/20" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.08 * i }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-5 h-5 rounded-full bg-[#334233] mb-4 shrink-0 relative z-10" />
                  <p className="font-serif text-[#1a2e1a] text-base font-medium mb-2">
                    {item.label}
                  </p>
                  <p className="font-sans text-sm text-[#334233]/70 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark green footer strip */}
      <div className="bg-[#1a2e1a] py-8 px-6 text-center">
        <p className="font-sans text-sm text-[#FAF6F0]/70 leading-relaxed">
          We don't have to have it all figured out.
        </p>
        <p className="font-serif italic text-sm text-[#C4924A] mt-1">
          We just need a safe space to come back to ourselves.
        </p>
      </div>
    </section>
  );
}
