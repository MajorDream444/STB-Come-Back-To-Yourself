import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import YouAreNotBroken from "./components/YouAreNotBroken";
import WhyThisFeelsDifferent from "./components/WhyThisFeelsDifferent";
import OfferCards from "./components/OfferCards";
import AboutFlo from "./components/AboutFlo";
import FloApproach from "./components/FloApproach";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { BreathReset } from "./components/BreathReset";
import { GroundingOverlay } from "./components/GroundingOverlay";
import { AmbientSoundscape } from "./components/AmbientSoundscape";
import { BOOKING_MAILTO } from "./types";

export default function App() {
  const [groundingOpen, setGroundingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] antialiased selection:bg-[#E9EFE9] selection:text-[#1a2e1a]">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Hero onGroundingOpen={() => setGroundingOpen(true)} />

      <YouAreNotBroken />

      <WhyThisFeelsDifferent />

      <OfferCards />

      <section id="practice-section" className="bg-[#FAF6F0] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-accent text-xs tracking-widest uppercase text-[#658365] mb-4 text-center"
          >
            Start Here
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-[#1a2e1a] mb-12 text-center leading-tight"
          >
            Five Minutes
          </motion.h2>
          <BreathReset onOpenLeadModal={() => setGroundingOpen(true)} />
        </div>
      </section>

      <AboutFlo />

      <FloApproach />

      <Testimonials />

      <FinalCTA />

      <Footer />

      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none"
          >
            <div className="bg-[#1a2e1a] rounded-2xl py-3 px-5 shadow-2xl flex items-center justify-between gap-6 pointer-events-auto max-w-lg w-full">
              <div>
                <p className="font-serif text-sm text-[#FAF6F0] leading-tight">
                  60-Min Nervous System Reset
                </p>
                <p className="font-accent text-[10px] tracking-widest uppercase text-[#658365] mt-0.5">
                  €75 — private session
                </p>
              </div>
              <a
                href={BOOKING_MAILTO}
                className="bg-[#C4924A] hover:bg-[#E8D09A] hover:text-[#334233] text-[#FAF6F0] font-accent font-semibold text-xs tracking-widest px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GroundingOverlay
        isOpen={groundingOpen}
        onClose={() => setGroundingOpen(false)}
        onOpenBooking={() => {
          setGroundingOpen(false);
          window.location.href = BOOKING_MAILTO;
        }}
      />

      <AmbientSoundscape />
    </div>
  );
}
