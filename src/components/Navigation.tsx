import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, BOOKING_MAILTO } from "../types";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const handleNav = (sectionId: string) => {
    setMobileMenuOpen(false);
    scrollTo(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-sage-200/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          onClick={() => handleNav("return-section")}
          className="flex flex-col cursor-pointer text-left"
        >
          <span className="font-serif text-lg font-medium text-[#1a2e1a] tracking-wide">
            Floortje de Liefde
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#658365] font-semibold">
            Somatic Practitioner
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => handleNav(link.sectionId)}
              className="text-xs tracking-widest uppercase font-medium text-[#658365] hover:text-[#1a2e1a] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={BOOKING_MAILTO}
            className="py-2.5 px-6 rounded-full border border-[#334233] text-[#334233] text-xs tracking-widest uppercase font-medium hover:bg-[#334233] hover:text-[#FAF6F0] transition-all cursor-pointer"
          >
            Book a Call
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1a2e1a]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#FAF6F0] border-b border-sage-200/30"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleNav(link.sectionId)}
                  className="text-left text-sm tracking-widest uppercase font-medium text-[#1a2e1a] py-1 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={BOOKING_MAILTO}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-3.5 rounded-full bg-[#334233] text-[#FAF6F0] text-xs tracking-widest uppercase font-semibold"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
