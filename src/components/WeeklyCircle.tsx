import { motion } from "motion/react";
import { INTAKE_FORM_URL } from "../types";

export default function WeeklyCircle() {
  return (
    <section id="weekly-circle" className="bg-[#E9EFE9] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-4 text-center"
        >
          Every Week
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-[#1a2e1a] mb-8 text-center leading-tight"
        >
          A Weekly Space To Exhale
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-12 h-px bg-[#C4924A] mx-auto mb-12 origin-left"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-sans text-lg text-[#334233] leading-relaxed">
              A simple weekly breath and integration circle for people who are
              used to carrying a lot alone.
            </p>

            <div className="space-y-4 text-[#334233]/80 font-sans text-base leading-relaxed">
              <p>This is not a performance space.</p>
              <p>
                It is a place to slow down, breathe, listen, and reconnect with
                what is true.
              </p>
            </div>

            <div className="border-l-2 border-[#C4924A] pl-5 space-y-2">
              <p className="font-serif text-[#1a2e1a] text-lg italic">Come once.</p>
              <p className="font-serif text-[#1a2e1a] text-lg italic">Come as you are.</p>
              <p className="font-serif text-[#1a2e1a] text-lg italic">
                No need to have the right words.
              </p>
            </div>

            <p className="font-sans text-sm text-[#658365]">
              Especially supportive for people who are used to carrying
              everything alone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="bg-[#FAF6F0] rounded-2xl p-8 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-accent text-[10px] tracking-widest uppercase text-[#658365]">
                  Format
                </span>
                <span className="font-sans text-sm text-[#334233]">
                  Small group · 2 hours · weekly
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-accent text-[10px] tracking-widest uppercase text-[#658365]">
                  Includes
                </span>
                <span className="font-sans text-sm text-[#334233]">
                  Breath · reflection · integration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-accent text-[10px] tracking-widest uppercase text-[#658365]">
                  Where
                </span>
                <span className="font-sans text-sm text-[#334233]">
                  Online · open to all
                </span>
              </div>
            </div>

            <div className="h-px bg-[#E9EFE9]" />

            <p className="font-sans text-sm text-[#658365] leading-relaxed">
              Flo is currently holding space for a small number of people. If
              the circle is full, you will be added to the waiting list.
            </p>

            <a
              href={INTAKE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              className="block w-full text-center font-sans text-sm px-6 py-3.5 rounded-full bg-[#334233] text-[#FAF6F0] hover:bg-[#1a2e1a] transition-colors duration-200 cursor-pointer"
            >
              Join the Weekly Circle
            </a>

            <p className="font-sans text-xs text-[#658365] text-center leading-relaxed">
              Flo personally reviews each request and schedules manually.
              <br />
              This keeps the process human, intentional, and paced.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
