import { motion } from "motion/react";
import { OFFER_CARDS, BOOKING_MAILTO } from "../types";

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
          {OFFER_CARDS.map((card, i) => (
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
                href={BOOKING_MAILTO}
                className={`font-sans text-sm px-6 py-3 rounded-full text-center transition-colors duration-200 cursor-pointer ${
                  card.isPrimary
                    ? "bg-[#C4924A] text-[#FAF6F0] hover:bg-[#E8D09A] hover:text-[#334233]"
                    : "border border-[#334233]/30 text-[#334233] hover:bg-[#334233] hover:text-[#FAF6F0]"
                }`}
              >
                {card.price === "Free" ? "Book a Call" : "Book a Session"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
