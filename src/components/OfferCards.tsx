import { motion } from "motion/react";
import { OFFER_CARDS, INTAKE_FORM_URL } from "../types";

export default function OfferCards() {
  return (
    <section id="work" className="bg-[#FAF6F0] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-4 text-center"
        >
          How We Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-[#1a2e1a] mb-16 text-center leading-tight"
        >
          Choose Your Starting Point
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {OFFER_CARDS.map((card, i) => {
            const ctaLabel =
              card.price === "Free"
                ? "Book a Discovery Call"
                : card.title === "Weekly Breath & Integration Circle"
                ? "Join the Circle"
                : "Book a Session";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  card.isPrimary
                    ? "bg-[#334233] text-[#FAF6F0]"
                    : "bg-[#E9EFE9] text-[#1a2e1a]"
                }`}
              >
                {card.isPrimary && (
                  <span className="absolute top-6 right-6 font-accent text-[10px] tracking-widest uppercase bg-[#C4924A] text-[#FAF6F0] px-3 py-1 rounded-full">
                    Signature
                  </span>
                )}

                <p
                  className={`font-accent text-xs tracking-widest uppercase mb-4 ${
                    card.isPrimary ? "text-[#E8D09A]" : "text-[#658365]"
                  }`}
                >
                  {card.duration}
                </p>

                <h3
                  className={`font-serif text-2xl mb-2 ${
                    card.isPrimary ? "text-[#FAF6F0]" : "text-[#1a2e1a]"
                  }`}
                >
                  {card.title}
                </h3>

                <p
                  className={`font-serif text-3xl font-light mb-6 ${
                    card.isPrimary ? "text-[#E8D09A]" : "text-[#C4924A]"
                  }`}
                >
                  {card.price}
                </p>

                <p
                  className={`font-sans text-sm leading-relaxed flex-1 mb-8 ${
                    card.isPrimary ? "text-[#FAF6F0]/75" : "text-[#334233]/70"
                  }`}
                >
                  {card.description}
                </p>

                <a
                  href={INTAKE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-sans text-sm px-6 py-3 rounded-full text-center transition-colors duration-200 cursor-pointer ${
                    card.isPrimary
                      ? "bg-[#C4924A] text-[#FAF6F0] hover:bg-[#E8D09A] hover:text-[#334233]"
                      : "border border-[#334233]/30 text-[#334233] hover:bg-[#334233] hover:text-[#FAF6F0]"
                  }`}
                >
                  {ctaLabel}
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center space-y-2"
        >
          <p className="font-sans text-sm text-[#658365]">
            Flo is currently taking a small number of private clients.
          </p>
          <p className="font-sans text-sm text-[#658365]">
            If the calendar is full, you may be added to the waiting list.
          </p>
          <p className="font-sans text-xs text-[#658365]/70 mt-3 italic">
            Flo personally reviews each request and schedules manually —
            keeping the process human, intentional, and paced.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
