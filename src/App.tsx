import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import YouAreNotBroken from "./components/YouAreNotBroken";
import WhyThisFeelsDifferent from "./components/WhyThisFeelsDifferent";
import OfferCards from "./components/OfferCards";
import AboutFlo from "./components/AboutFlo";
import FloApproach from "./components/FloApproach";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import { GroundingOverlay } from "./components/GroundingOverlay";
import { AmbientSoundscape } from "./components/AmbientSoundscape";
import { BreathReset } from "./components/BreathReset";
import { BOOKING_MAILTO } from "./types";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [groundingOpen, setGroundingOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCta(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] antialiased selection:bg-sage-200 selection:text-sage-900">
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <Hero onGroundingOpen={() => setGroundingOpen(true)} />
        <YouAreNotBroken />
        <WhyThisFeelsDifferent />
        <OfferCards />

        {/* Free Practice Section */}
        <section id="practice-section" className="py-20 md:py-28 bg-[#E9EFE9]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 space-y-3">
              <span className="text-xs font-accent tracking-widest text-[#658365] uppercase font-semibold">
                Start Here
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#334233]">
                Five minutes to feel it.
              </h2>
              <p className="text-sm text-[#658365] max-w-md mx-auto font-light leading-relaxed">
                Before anything else — try this. A simple breath practice to begin the return.
              </p>
            </div>
            <BreathReset onOpenLeadModal={() => {}} />
          </div>
        </section>

        <AboutFlo />
        <FloApproach />
        <Testimonials />
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="bg-[#1a2e1a] text-[#8fa88f] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-2">
            <p className="font-serif text-lg text-[#FAF6F0]">Floortje de Liefde</p>
            <p className="text-xs font-accent tracking-widest uppercase text-[#658365]">Somatic Practitioner</p>
          </div>
          <div className="space-y-1.5 text-xs font-light">
            <p>Ubud, Bali &amp; Online Worldwide</p>
            <p>
              <a href="mailto:hi@floortjedeliefde.com" className="text-[#E8D09A] hover:text-[#FAF6F0] transition-colors">
                hi@floortjedeliefde.com
              </a>
            </p>
          </div>
          <p className="text-xs text-[#4a5f4a]">© 2026 Floortje de Liefde. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-5 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none"
          >
            <div className="bg-[#1a2e1a] border border-[#334233] rounded-2xl py-3 px-5 shadow-2xl flex items-center justify-between gap-6 pointer-events-auto max-w-sm w-full">
              <div>
                <p className="text-xs font-serif text-[#FAF6F0] leading-tight">Book a Free Discovery Call</p>
                <p className="text-[10px] text-[#658365] font-accent">30 minutes · No commitment</p>
              </div>
              <a
                href={BOOKING_MAILTO}
                className="bg-[#C4924A] hover:bg-[#b07d3a] text-[#1a2e1a] text-xs font-accent font-bold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer"
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
        onOpenBooking={() => { window.location.href = BOOKING_MAILTO; }}
      />

      <AmbientSoundscape />
    </div>
  );
}
