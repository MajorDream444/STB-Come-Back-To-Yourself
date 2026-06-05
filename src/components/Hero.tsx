import { motion } from "motion/react";
import heroImage from "../assets/images/regenerated_image_1780277926011.jpg";
import { INTAKE_FORM_URL } from "../types";

interface HeroProps {
  onGroundingOpen: () => void;
}

export default function Hero({ onGroundingOpen }: HeroProps) {
  const scrollToApproach = () => {
    const el = document.getElementById("approach");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="return-section" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A peaceful rice field"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a]/85 via-[#1a2e1a]/60 to-[#1a2e1a]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-accent text-xs tracking-widest uppercase text-[#E8D09A] mb-6"
          >
            Somatic Breathwork — In Person & Online
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-[#FAF6F0] leading-tight mb-8"
          >
            Come Back To Yourself
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base md:text-lg text-[#FAF6F0]/80 leading-relaxed mb-10 space-y-4"
          >
            <p>Most people don't need another strategy.</p>
            <p>They need a place where they can stop fighting themselves.</p>
            <p>
              Through breathwork, presence, and body awareness, I create a space where you can slow down, reconnect, and return to yourself.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={INTAKE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#C4924A] text-[#FAF6F0] font-sans text-sm rounded-full hover:bg-[#E8D09A] hover:text-[#334233] transition-colors duration-200 text-center cursor-pointer"
            >
              Book a Free Discovery Call
            </a>
            <button
              onClick={scrollToApproach}
              className="inline-block px-8 py-4 border border-[#FAF6F0]/40 text-[#FAF6F0] font-sans text-sm rounded-full hover:border-[#FAF6F0] transition-colors duration-200 text-center cursor-pointer"
            >
              Explore My Approach
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            onClick={onGroundingOpen}
            className="mt-10 font-accent text-xs tracking-widest uppercase text-[#E8D09A]/70 hover:text-[#E8D09A] transition-colors duration-200 cursor-pointer"
          >
            ↓ Take a breath
          </motion.button>
        </div>
      </div>
    </section>
  );
}
