/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wind,
  Heart,
  Compass,
  ChevronDown,
  Calendar,
  ChevronRight,
  Check,
  Leaf,
  Star,
  ArrowRight,
  ShieldCheck,
  Lock,
  Menu,
  X,
  Sparkles,
  Clock,
  UserCheck,
  ArrowUpRight
} from "lucide-react";

import {
  IMAGES,
  TESTIMONIALS,
  PILLARS,
  CORE_OFFER,
  FUTURE_PATHS
} from "./types";

import { BreathReset } from "./components/BreathReset";
import { BookingSession } from "./components/BookingSession";
import { GroundingOverlay } from "./components/GroundingOverlay";
import { AmbientSoundscape } from "./components/AmbientSoundscape";
import regeneratedImage from "./assets/images/regenerated_image_1780274117711.jpg";
import aboutFloPortrait from "./assets/images/regenerated_image_1780277926011.jpg";
import somaticProblemImage from "./assets/images/regenerated_image_1780275760582.jpg";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"discovery" | "reset" | "journey">("discovery");
  const [groundingOpen, setGroundingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"return" | "problem" | "doorway" | "practice" | "about">("return");
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const openBooking = (type: "discovery" | "reset" | "journey") => {
    setBookingType(type);
    setBookingOpen(true);
  };

  // Monitor scroll height to show sticky CTA & highlight active navigation sections
  useEffect(() => {
    const handleScroll = () => {
      // Sticky CTA trigger height
      if (window.scrollY > 450) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }

      // Check section anchors positioning
      const sections = ["return-section", "problem-section", "doorway-section", "practice-section", "about-section"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active state highlight when section is near top of viewport
          if (rect.top <= 160 && rect.bottom >= 160) {
            const shortName = id.replace("-section", "") as any;
            setActiveTab(shortName);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  // Botanical floating leaf component renderers for organic feeling
  const renderFloatingLeaves = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Leaf 1 */}
        <div className="absolute top-[12%] left-[4%] animate-float-slower opacity-15">
          <svg className="w-10 h-10 text-sage-400 rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L8,18C12,20 16,17 17,8M12,14C10,12 11,8 11,8C11,8 13,11 15,10C17,9 18,6 18,6C18,6 18.5,10 16,11C13.5,12 12,14 12,14Z" />
          </svg>
        </div>
        {/* Leaf 2 */}
        <div className="absolute top-[40%] right-[3%] animate-float-slow opacity-20">
          <svg className="w-12 h-12 text-sage-300 -rotate-45" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L8,18C12,20 16,17 17,8M12,14C10,12 11,8 11,8C11,8 13,11 15,10C17,9 18,6 18,6C18,6 18.5,10 16,11C13.5,12 12,14 12,14Z" />
          </svg>
        </div>
        {/* Leaf 3 */}
        <div className="absolute bottom-[25%] left-[2%] animate-float-slower opacity-15">
          <svg className="w-14 h-14 text-gold-300 rotate-45" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L8,18C12,20 16,17 17,8M12,14C10,12 11,8 11,8C11,8 13,11 15,10C17,9 18,6 18,6C18,6 18.5,10 16,11C13.5,12 12,14 12,14Z" />
          </svg>
        </div>
        {/* Leaf 4 */}
        <div className="absolute top-[75%] right-[5%] animate-float-slow opacity-10">
          <svg className="w-9 h-9 text-gold-200 rotate-90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L8,18C12,20 16,17 17,8M12,14C10,12 11,8 11,8C11,8 13,11 15,10C17,9 18,6 18,6C18,6 18.5,10 16,11C13.5,12 12,14 12,14Z" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div id="sanctuary-framework" className="min-h-screen bg-[#FAF6F0] selection:bg-sage-200 selection:text-sage-900 relative antialiased">
      
      {/* 1. TOP TRANSLUCENT HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-sage-200/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Personal Branding */}
          <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection("return-section")}>
            <span className="font-serif text-lg md:text-xl font-medium text-sage-955 tracking-wider">
              Floortje de Liefde
            </span>
            <span className="text-[10px] uppercase font-accent tracking-[0.25em] text-[#658365] font-semibold">
              Somatic Practitioner
            </span>
          </div>

          {/* Desktop Navigation Map based on user request flow */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button
              onClick={() => scrollToSection("return-section")}
              className={`text-xs font-accent tracking-widest uppercase font-medium transition-all hover:text-sage-850 cursor-pointer ${
                activeTab === "return" ? "text-sage-955 scale-105 border-b-2 border-gold-450 pb-1" : "text-sage-500/80"
              }`}
            >
              The Return
            </button>
            <button
              onClick={() => scrollToSection("problem-section")}
              className={`text-xs font-accent tracking-widest uppercase font-medium transition-all hover:text-sage-850 cursor-pointer ${
                activeTab === "problem" ? "text-sage-955 scale-105 border-b-2 border-gold-450 pb-1" : "text-sage-500/80"
              }`}
            >
              The Reality
            </button>
            <button
              onClick={() => scrollToSection("doorway-section")}
              className={`text-xs font-accent tracking-widest uppercase font-medium transition-all hover:text-sage-850 cursor-pointer ${
                activeTab === "doorway" ? "text-sage-955 scale-105 border-b-2 border-gold-450 pb-1" : "text-sage-500/80"
              }`}
            >
              The Doorway
            </button>
            <button
              onClick={() => scrollToSection("practice-section")}
              className={`text-xs font-accent tracking-widest uppercase font-medium transition-all hover:text-sage-850 cursor-pointer ${
                activeTab === "practice" ? "text-sage-955 scale-105 border-b-2 border-gold-450 pb-1" : "text-sage-500/80"
              }`}
            >
              The Practice
            </button>
            <button
              onClick={() => scrollToSection("about-section")}
              className={`text-xs font-accent tracking-widest uppercase font-medium transition-all hover:text-sage-850 cursor-pointer ${
                activeTab === "about" ? "text-sage-955 scale-105 border-b-2 border-gold-450 pb-1" : "text-sage-500/80"
              }`}
            >
              About Flo
            </button>
          </nav>

          {/* Right Header Controls / CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setBookingOpen(true)}
              className="py-2.5 px-6 rounded-full border border-sage-800 text-[#334233] text-xs font-accent font-medium tracking-wider hover:bg-sage-800 hover:text-cream-50 transition-all cursor-pointer"
            >
              Book Reset
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-sage-900 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-sage-200/50 bg-[#FAF6F0] overflow-hidden"
            >
              <div className="px-6 pt-2 pb-6 space-y-4 flex flex-col">
                <button
                  onClick={() => scrollToSection("return-section")}
                  className="text-left text-sm font-accent tracking-wider font-medium text-sage-900 py-1"
                >
                  The Return
                </button>
                <button
                  onClick={() => scrollToSection("problem-section")}
                  className="text-left text-sm font-accent tracking-wider font-medium text-sage-900 py-1"
                >
                  The Reality
                </button>
                <button
                  onClick={() => scrollToSection("doorway-section")}
                  className="text-left text-sm font-accent tracking-wider font-medium text-sage-900 py-1"
                >
                  The Doorway
                </button>
                <button
                  onClick={() => scrollToSection("practice-section")}
                  className="text-left text-sm font-accent tracking-wider font-medium text-sage-900 py-1"
                >
                  The Practice
                </button>
                <button
                  onClick={() => scrollToSection("about-section")}
                  className="text-left text-sm font-accent tracking-wider font-medium text-sage-900 py-1"
                >
                  About Flo
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingOpen(true);
                  }}
                  className="w-full text-center py-3.5 rounded-full bg-sage-800 text-cream-50 text-xs font-accent font-semibold tracking-wider hover:bg-sage-955 transition-all"
                >
                  Book 60-Min Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1: HERO (Come Back To Yourself) */}
      <section
        id="return-section"
        className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden py-16 lg:py-28 border-b border-sage-200/30"
      >
        {renderFloatingLeaves()}

        {/* Full-bleed Nature Panoramic Backdrop of Bali Rice Fields with Soft Parallax Feeling */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0]/95 via-[#FAF6F0]/70 to-[#FAF6F0]/30 md:from-[#FAF6F0]/95 md:via-[#FAF6F0]/60 md:to-transparent z-10" />
          <img
            src={aboutFloPortrait}
            alt="A group of women standing together in a lush green Bali rice field, aligned in stillness and grounding"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[65%_center] filter brightness-105 saturate-90 scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Hero Copy Panel structured for luxury typography and breath space */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
          <div className="max-w-2xl text-left space-y-6 md:space-y-8 bg-[#FAF6F0]/90 backdrop-blur-md md:backdrop-blur-lg p-8 md:p-14 rounded-3xl shadow-xl border border-gold-300/10">
            
            {/* Small trust line at head */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-sage-100/90 border border-sage-200/40 rounded-full px-4 py-1.5 shadow-5xs"
            >
              <Leaf className="w-3.5 h-3.5 text-sage-600 animate-pulse" />
              <span className="text-[9px] md:text-xs font-accent tracking-widest text-sage-850 font-bold uppercase">
                A Safe Space to Exhale
              </span>
            </motion.div>

            {/* Core Message Headline spec with elegant serif typography */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif text-sage-900 leading-[1.12] font-semibold tracking-tight"
              >
                Come Back <br />
                <span className="italic font-normal text-gold-600">To Yourself</span>
              </motion.h1>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="w-24 h-0.5 bg-gold-400 origin-left"
              />
            </div>

            {/* Subheadline spec literal description */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-sm md:text-base text-sage-800 font-sans leading-relaxed font-light"
              >
                When stress, overwhelm, anxiety, and constant pressure disconnect you from yourself, your body often knows before your mind does.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-sm md:text-base text-sage-800 font-sans leading-relaxed font-medium"
              >
                Through breathwork, body awareness, and nervous-system support, Flo creates a safe space to slow down, reconnect, and return to yourself.
              </motion.p>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => openBooking("discovery")}
                className="py-4 px-8 rounded-full bg-sage-800 hover:bg-sage-900 border border-transparent text-[#FAF6F0] text-xs md:text-sm font-accent font-semibold tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </button>
              <button
                onClick={() => scrollToSection("doorway-section")}
                className="py-4 px-7 border border-sage-300 hover:border-sage-500 bg-white/40 hover:bg-[#FAF6F0] text-sage-800 text-xs md:text-sm font-accent font-semibold tracking-wider rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                Explore My Approach
              </button>
            </motion.div>

            {/* Botanical micro interactive grounding moment overlay trigger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              onClick={() => setGroundingOpen(true)}
              className="p-4 rounded-2xl bg-white/60 border border-sage-200/40 backdrop-blur-sm max-w-md flex items-center gap-4 cursor-pointer hover:bg-white/80 hover:shadow-xs transition-all border-l-4 border-l-gold-500 group text-left"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-sage-100 shrink-0">
                <div className="absolute inset-0 rounded-full bg-sage-300 animate-ping opacity-25" />
                <Wind className="w-4 h-4 text-sage-700" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] uppercase font-accent font-bold text-gold-700 tracking-wider">A Somatic Invitation</span>
                  <Sparkles className="w-3 h-3 text-gold-500" />
                </div>
                <h4 className="font-serif text-xs md:text-sm font-bold text-sage-950 flex items-center gap-1">
                  Pause for a 30s Somatic Grounding
                  <ArrowUpRight className="w-3.5 h-3.5 text-sage-600 transform group-hover:translate-x-0.5 transition-transform" />
                </h4>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Slow breathing animated scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-sage-400 select-none pointer-events-none z-10">
          <span className="text-[9px] font-accent tracking-[0.25em] uppercase font-bold text-sage-600">Exhale to begin</span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-gold-600" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM (You are not broken) */}
      <section id="problem-section" className="py-20 md:py-28 bg-[#E9EFE9]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait of Flo under the palms left side */}
          <div className="lg:col-span-5 space-y-4 order-last lg:order-first">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xs border border-sage-200/40 bg-sage-50 group">
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sage-950/20 via-transparent to-transparent h-1/4 z-10" />
              <img
                src={somaticProblemImage}
                alt="Flo sitting peacefully under lush palm leaves in Ubud, Bali"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover saturate-95 group-hover:scale-102 transition-transform duration-700"
              />
            </div>
            <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-sage-200/40 text-center italic text-xs text-sage-800 font-serif leading-relaxed h-auto shadow-5xs">
              "We have trained our minds to carry everything, yet our body is what holds the physical cost of that speed. Grounding is the process of putting down the weight."
            </div>
          </div>

          {/* Core Problem Narrative copy block */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <span className="text-xs font-accent font-bold tracking-widest text-[#658365] uppercase block">
              Somatic Grounding
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-sage-900 leading-tight font-semibold tracking-tight">
              You are not broken. <br />
              <span className="italic font-normal text-gold-600 font-serif">You do not need fixing.</span>
            </h2>

            <div className="w-16 h-0.5 bg-gold-400" />

            <div className="text-base md:text-lg text-sage-850 font-light leading-relaxed space-y-5">
              <p>
                When overwhelm, stress, anxiety, and deep emotional exhaustion take over, your mind goes into overdrive. You try to analyze it, solve it, or push through.
              </p>
              <p>
                But this constant activation creates a persistent disconnection from yourself. Your body keeps score, carrying the physical weight of stress beneath the busy noise.
              </p>
              <p className="border-l-2 border-gold-400 pl-4 text-sage-955 font-medium italic font-serif">
                You do not need fixing. You may simply need a space where your body can feel safe enough to slow down, soften its armor, and finally exhale.
              </p>
              <p className="text-base text-sage-800 font-light font-sans pt-2">
                Floortje de Liefde creates that safe container. Integrating her background in mental health nursing with powerful somatic breathwork, she helps you cross the bridge from cognitive noise back into a safe, grounded physiology.
              </p>
            </div>

            {/* Highlighted core features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sage-200/30 mt-6 text-left">
              <div className="space-y-1">
                <span className="text-xs font-serif font-semibold text-sage-900 block">Somatic Safety</span>
                <p className="text-[11px] text-sage-650 font-light">Grounded in clinical nursing science and trauma-informed nervous-system care.</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-serif font-semibold text-sage-900 block font-serif">No Clichés</span>
                <p className="text-[11px] text-sage-650 font-light">An honest, stable space free of spiritual performance, guru posture, or forced manifestation.</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-serif font-semibold text-sage-900 block">Deep Regulation</span>
                <p className="text-[11px] text-sage-650 font-light">Slowing heart rates, down-regulating muscle tension, and physical discharge of anxiety.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: HOW WE WORK TOGETHER */}
      <section id="doorway-section" className="py-20 md:py-28 bg-[#FAF6F0] relative overflow-hidden border-b border-sage-200/20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20 space-y-3">
            <span className="text-xs font-accent font-bold tracking-widest text-[#658365] uppercase">
              Healing Containers
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif text-sage-955 font-semibold leading-tight tracking-tight">
              How We Work Together
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
            <p className="text-sm md:text-base text-sage-705 leading-relaxed font-light">
              Nervous-system regulation and somatic integration require stable, physical support. Here are the three direct paths to begin your body-based reconnection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* CARD 1: Discovery Call */}
            <div className="bg-white rounded-3xl border border-sage-200/40 p-8 shadow-5xs flex flex-col justify-between hover:border-sage-300 transition-all duration-300 hover:shadow-2xs">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-accent font-bold text-sage-600 bg-sage-50 border border-sage-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    Somatic Alignment
                  </span>
                  <h3 className="text-2xl font-serif text-sage-900 mt-3 font-semibold leading-tight">
                    Discovery Call
                  </h3>
                  <p className="text-xs text-sage-500 font-accent mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-600" /> 30 minutes
                  </p>
                </div>

                <p className="text-xs md:text-sm text-sage-700 font-light leading-relaxed font-sans">
                  A gentle, honest conversation to map exactly where your stress cycles are currently localized, and understand whether this somatic containment is the right doorway for you.
                </p>

                <div className="pt-4 border-t border-sage-100 flex justify-between items-center text-xs">
                  <span className="text-sage-550 uppercase font-accent font-bold tracking-widest">Investment</span>
                  <span className="text-lg font-serif font-semibold text-sage-900">Free</span>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => openBooking("discovery")}
                  className="w-full py-3.5 rounded-full bg-sage-50 text-sage-800 hover:bg-sage-100/80 border border-sage-200 text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book Discovery Call
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </button>
              </div>
            </div>

            {/* CARD 2: Nervous System Reset */}
            <div className="bg-white rounded-3xl border border-sage-200/40 p-8 shadow-5xs flex flex-col justify-between hover:border-sage-300 transition-all duration-300 hover:shadow-2xs">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-accent font-bold text-sage-600 bg-sage-50 border border-sage-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    Foundation
                  </span>
                  <h3 className="text-2xl font-serif text-sage-900 mt-3 font-semibold leading-tight">
                    Nervous System Reset
                  </h3>
                  <p className="text-xs text-sage-500 font-accent mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-600" /> 30–45 minutes
                  </p>
                </div>

                <p className="text-xs md:text-sm text-sage-700 font-light leading-relaxed font-sans">
                  A gentle, somatic introduction focused entirely on regulation, grounding, breath awareness, and simple body connection to alleviate physical tightness and anxiety loops.
                </p>

                <div className="pt-4 border-t border-sage-100 flex justify-between items-center text-xs">
                  <span className="text-sage-550 uppercase font-accent font-bold tracking-widest">Investment</span>
                  <span className="text-lg font-serif font-semibold text-sage-900 font-serif">€75</span>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => openBooking("reset")}
                  className="w-full py-3.5 rounded-full bg-sage-50 text-sage-800 hover:bg-sage-100/80 border border-sage-200 text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Book Reset Session
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </button>
              </div>
            </div>

            {/* CARD 3: Private Breathwork Journey (Signature Offer) */}
            <div className="bg-[#EAE4D8]/30 rounded-3xl border border-gold-300/40 p-8 shadow-xs flex flex-col justify-between hover:border-gold-400/50 transition-all duration-300 hover:shadow-md relative">
              <div className="absolute -top-3.5 right-6 bg-gold-600 text-[#FAF6F0] px-3.5 py-1 rounded-full text-[9px] font-accent font-bold uppercase tracking-widest shadow-5xs">
                Signature Offer
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-accent font-bold text-gold-700 bg-gold-100/70 border border-gold-200/50 px-3.5 py-1 rounded-full uppercase tracking-wider">
                    Full Integration
                  </span>
                  <h3 className="text-2xl font-serif text-sage-900 mt-3 font-semibold leading-tight">
                    Private Breathwork Journey
                  </h3>
                  <p className="text-xs text-sage-550 font-accent mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-600 font-bold" /> 90 minutes
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-sage-800 font-light leading-relaxed font-sans">
                    A deep, trauma-informed somatic voyage crossing the five essential keys of authentic physical release and heavy integration:
                  </p>
                  <ul className="grid grid-cols-2 gap-y-1.5 gap-x-2 bg-white/70 p-3 rounded-2xl border border-gold-200/10 text-[10px] text-sage-800 font-accent font-medium">
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gold-500" />
                      <span>Arrival</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gold-500" />
                      <span>Intention</span>
                    </li>
                    <li className="flex items-center gap-1 col-span-2 text-[#4a5f4a] font-semibold">
                      <span className="w-1 h-1 rounded-full bg-gold-600" />
                      <span>Conscious Connected Breath</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gold-500" />
                      <span>Integration</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gold-500" />
                      <span>Reflection</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gold-200/20 flex justify-between items-center text-xs">
                  <span className="text-gold-700 uppercase font-accent font-bold tracking-widest">Investment</span>
                  <span className="text-lg font-serif font-bold text-sage-900 font-serif">€150</span>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => openBooking("journey")}
                  className="w-full py-3.5 rounded-full bg-sage-800 text-cream-50 hover:bg-sage-900 text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  Book Signature Journey
                  <Calendar className="w-4 h-4 text-gold-300" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: FREE PRACTICE (Start with five minutes) */}
      <section id="practice-section" className="py-20 md:py-28 bg-[#E9EFE9]/20 relative overflow-hidden">
        {renderFloatingLeaves()}
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18 space-y-3">
            <span className="text-xs font-accent font-bold tracking-widest text-gold-650 uppercase">
              Practical Medicine
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-sage-955 font-semibold tracking-tight">
              Start with <span className="italic font-normal text-gold-600">five minutes.</span>
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* The 3x5 Lead Magnet Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-sage-200/40 p-6 md:p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-block bg-sage-50 px-3.5 py-1 rounded-full text-[#658365] border border-sage-200/20">
                  <span className="text-[9px] font-accent font-bold uppercase tracking-wider">Unplug & Return</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif text-sage-955 font-bold leading-tight">
                  The 3x5 Breath Reset
                </h3>

                <div className="space-y-3 text-xs md:text-sm text-sage-750 font-light leading-relaxed">
                  <p>
                    A simple practice: five minutes, three times a day.
                  </p>
                  <p className="font-semibold text-sage-900 bg-gold-50/55 p-2 rounded-lg inline-block border border-gold-200/30">
                    Morning. Midday. Evening.
                  </p>
                  <p>
                    No special equipment. No perfect routine. Just a small doorway back to breath, body, and presence.
                  </p>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <button
                  onClick={() => {
                    const el = document.getElementById("breathwork-pacer-box");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                      setGroundingOpen(true);
                    }
                  }}
                  className="w-full py-3 px-5 rounded-full bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-accent font-semibold tracking-wider transition-all shadow-5xs text-center cursor-pointer"
                >
                  Get the Free 3x5 Breath Reset
                </button>
                <p className="text-[10px] text-center text-sage-500 font-sans">
                  *Instantly scroll and configure pacer settings live inside the player
                </p>
              </div>
            </div>

            {/* Live Interactive BreathReset component rendering */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <BreathReset onOpenLeadModal={() => setBookingOpen(true)} />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: ABOUT FLO (Hi, I’m Flo.) */}
      <section id="about-section" className="py-20 md:py-28 bg-[#FAF6F0] relative overflow-hidden">
        {renderFloatingLeaves()}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Portrait Column with Close-Up Palms backdrop */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xs border border-sage-205/30 bg-sage-50 group">
                <img
                  src={aboutFloPortrait}
                  alt="Floortje de Liefde smiling happily under the tropical palms backdrop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover saturate-95 group-hover:scale-101 transition-transform duration-500"
                />
              </div>
              <div className="bg-sage-100/40 p-4.5 rounded-2xl border border-sage-200/40 text-center">
                <p className="text-[11px] text-sage-800 font-light leading-normal italic">
                  "I am not here to convince you of a fantasy version of yourself. I am here to create a secure, scientifically-grounded buffer where your natural body systems can exhale."
                </p>
              </div>
            </div>

            {/* Bio detailed Copy Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <span className="text-xs font-accent font-bold tracking-widest text-[#658365] uppercase block">
                The Safe Anchor
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-sage-955 font-bold leading-tight">
                Hi, I’m <span className="italic font-normal text-gold-650 text-gold-600">Flo.</span>
              </h2>

              <div className="w-16 h-0.5 bg-gold-400" />

              <div className="text-base text-sage-850 font-light leading-relaxed space-y-5">
                <p>
                  I did not arrive here because everything was easy.
                </p>
                <p>
                  My path has moved through mental health care, movement, breathwork, body awareness, and my own search for what helps people feel safe enough to reconnect with themselves.
                </p>
                <p>
                  I am not here to make you become someone else.
                </p>
                <p className="border-l-2 border-[#658365] pl-4 italic text-sage-905 font-medium">
                  I am here to create a space where you can come back to yourself.
                </p>
              </div>

              {/* Verified credentials list layout */}
              <div className="pt-6 border-t border-sage-200/30 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#E9EFE9]/20 border border-sage-200/30">
                  <h4 className="font-serif text-sm font-semibold text-sage-900 flex items-center gap-1.5 pb-1">
                    <ShieldCheck className="w-4 h-4 text-[#658365]" /> Traditional Background
                  </h4>
                  <p className="text-xs text-sage-700 leading-normal font-light">
                    Years spent as a registered psychiatric nurse mapping clinical models gives me standard compliance boundaries for holding clean healing circles.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-gold-50/50 border border-gold-200/30">
                  <h4 className="font-serif text-sm font-semibold text-sage-900 flex items-center gap-1.5 pb-1">
                    <UserCheck className="w-4 h-4 text-gold-600" /> Zero Spiritual Hype
                  </h4>
                  <p className="text-xs text-sage-700 leading-normal font-light">
                    No complicated chakra checklists, gurus expectations, or mystical claims. Simply authentic human holding containers to help you slow down.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: THE FLO APPROACH */}
      <section id="approach-section" className="py-20 md:py-28 bg-[#faf6f0]/60 relative overflow-hidden border-t border-b border-sage-200/20">
        {renderFloatingLeaves()}
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-3">
            <span className="text-xs font-accent font-bold tracking-widest text-[#658365] uppercase block">
              Our Blueprint
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-sage-955 font-semibold tracking-tight">
              The Flo Approach
            </h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
            <p className="text-sm text-sage-600 font-accent italic">
              Simple. Practical. Grounded.
            </p>
          </div>

          {/* Staggered elegant horizontal/vertical timeline keys */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto pt-4">
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border border-sage-200/30 shadow-5xs relative group hover:shadow-xs transition-all duration-300"
            >
              <div className="absolute -top-7 left-8 w-14 h-14 bg-sage-800 text-cream-50 font-serif text-xl font-bold rounded-2xl flex items-center justify-center shadow-md group-hover:bg-[#4a5f4a] transition-colors">
                01
              </div>
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-serif font-semibold text-sage-900">
                  Slow Down
                </h3>
                <p className="text-xs md:text-sm text-sage-700 font-light leading-relaxed font-sans">
                  We begin by transitioning your active system out of mental defense and cognitive analysis. Creating a stable somatic landing space allows your baseline pulse to finally decelerate.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl p-8 border border-gold-300/30 shadow-5xs relative group hover:shadow-xs transition-all duration-300"
            >
              <div className="absolute -top-7 left-8 w-14 h-14 bg-gold-600 text-cream-50 font-serif text-xl font-bold rounded-2xl flex items-center justify-center shadow-md group-hover:bg-gold-700 transition-colors">
                02
              </div>
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-serif font-semibold text-sage-900">
                  Breathe
                </h3>
                <p className="text-xs md:text-sm text-sage-700 font-light leading-relaxed font-sans">
                  Using safe, trauma-informed conscious connected breathing rhythms, we expand respiratory capability, bypass restrictive mental blocks, and gently discharge stored somatic tension.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 border border-sage-200/30 shadow-5xs relative group hover:shadow-xs transition-all duration-300"
            >
              <div className="absolute -top-7 left-8 w-14 h-14 bg-sage-800 text-cream-50 font-serif text-xl font-bold rounded-2xl flex items-center justify-center shadow-md group-hover:bg-[#4a5f4a] transition-colors">
                03
              </div>
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-serif font-semibold text-sage-900">
                  Integrate
                </h3>
                <p className="text-xs md:text-sm text-sage-700 font-light leading-relaxed font-sans">
                  We close with gentle, grounded somatic anchors and nurse-supported verbal integration. Giving your biology the presence and space to capture its newly discovered safety state.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SPRECKEL TESTIMONIAL PANEL */}
      <section className="py-20 bg-sage-900 text-cream-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-sage-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-25">
          <div className="space-y-2">
            <span className="text-xs font-accent font-bold tracking-widest text-gold-300 uppercase block">
              Somatic Evidence
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-cream-50">
              Letters from the center.
            </h2>
            <p className="text-xs text-sage-300 max-w-md mx-auto font-light">
              Read simple, honest comments from people who completed the first reset doorway.
            </p>
          </div>

          {/* Testimonial Active Slider block */}
          <div className="relative min-h-[170px] max-w-2xl mx-auto flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-center gap-0.5 text-gold-400">
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                  <Star className="w-3.5 h-3.5 fill-gold-400" />
                </div>

                <p className="font-serif text-base md:text-lg md:leading-relaxed text-cream-105 italic font-light">
                  “{TESTIMONIALS[currentTestimonialIndex].quote}”
                </p>

                <div>
                  <h4 className="font-accent text-xs font-bold tracking-wider text-gold-300">
                    {TESTIMONIALS[currentTestimonialIndex].author}
                  </h4>
                  <p className="text-[10px] font-accent text-sage-350">
                    {TESTIMONIALS[currentTestimonialIndex].role} — {TESTIMONIALS[currentTestimonialIndex].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Pagination Controls */}
          <div className="flex justify-center items-center gap-2.5">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentTestimonialIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentTestimonialIndex === idx ? "bg-gold-400 w-5" : "bg-sage-750 hover:bg-sage-600"
                }`}
                title={`Review of ${t.author}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* SPRECKEL INTEGRATIONS CARD */}
      <section className="py-14 md:py-18 bg-[#E9EFE9]/10 border-t border-b border-sage-200/30">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <Leaf className="w-5 h-5 text-sage-400 mx-auto animate-pulse" />
          <h3 className="font-serif text-xl font-medium text-sage-900">Setting up Sanctuary in Nature</h3>
          <p className="text-xs text-sage-700 max-w-lg mx-auto leading-relaxed font-light">
            Flo's practice incorporates physical session blocks surrounded by palm fields and rustling rice terraces. Active sessions can be enjoyed <strong>Live in Bali</strong> (Ubud holistic zone) or <strong>Online Worldwide</strong> with clinical nurse compliance standards.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs font-accent text-[#658365] bg-white border border-sage-200/30 rounded-full py-1.5 px-4 shadow-5xs">
            <span className="font-bold uppercase tracking-wider text-[9px]">Locations:</span>
            <span>Ubud Sanctuary, Bali</span>
            <span className="w-1.5 h-1.5 bg-sage-100 rounded-full" />
            <span>Secure Virtual Zoom Room</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA (You do not need the whole path today.) */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-sage-955 text-cream-50">
        
        {/* Soft immersive nature background with elegant dark contrast */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={aboutFloPortrait}
            alt="A group of women standing together in a lush green Bali rice field, aligned in stillness and grounding (IMG_3267)"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sage-955/95 via-sage-955/90 to-sage-955/95" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center space-y-8 relative z-10">
          
          <span className="text-xs font-accent font-semibold tracking-widest text-[#b1c3b1] uppercase block">
            The Safe Invitation
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight font-medium">
            You do not need <br />
            <span className="italic font-normal text-gold-300">the whole path today.</span>
          </h2>

          <div className="w-20 h-0.5 bg-gold-400 mx-auto" />

          <p className="text-sm md:text-base text-sage-350 leading-relaxed font-light max-w-xl mx-auto">
            You only need the first safe step.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full sm:w-auto py-4 px-10 rounded-full bg-gold-500 hover:bg-gold-600 font-accent font-semibold text-sage-950 tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Book a 60-Minute Nervous System Reset
              <ArrowUpRight className="w-4 h-4 text-sage-955" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("practice-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto py-4 px-8 border border-sage-600 hover:border-sage-400 bg-white/5 hover:bg-white/10 rounded-full font-accent text-xs font-medium tracking-wider transition-colors cursor-pointer"
            >
              Test Guided Rest First
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sage-955 text-sage-400 border-t border-sage-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-6 space-y-4">
            <p className="font-serif text-lg text-cream-50 font-medium tracking-wider">Floortje de Liefde</p>
            <p className="text-xs text-sage-400 max-w-sm leading-relaxed font-light">
              Tailoring custom somatic breathwork packages with background clinical nurse safety standards. Aman Resort meets modern somatic healing.
            </p>
            <div className="pt-2 text-[10px] text-sage-500 uppercase tracking-widest flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Licensed Clinical Nurse Background Standard
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-accent font-bold uppercase text-gold-400 tracking-widest">Somatic Spaces</p>
            <ul className="space-y-2 text-xs font-light">
              <li>Ubud Rice Terraces Sanctuary, Bali</li>
              <li>Somatic virtual consulting via Zoom</li>
              <li>Inquiries: <span className="text-cream-100 font-medium font-sans">hi@floortjedeliefde.com</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-accent font-bold uppercase text-gold-400 tracking-widest">Integrity & Safety</p>
            <p className="text-xs text-sage-530 leading-normal font-light">
              © 2026 Floortje de Liefde. Licensed psychiatric nursing standard. All materials are copyrighted.
            </p>
            <p className="text-[10px] text-sage-350 flex items-center gap-1 font-bold">
              <Lock className="w-3.5 h-3.5" /> One breath. One body. One doorway back to yourself.
            </p>
          </div>

        </div>
      </footer>

      {/* PERSISTENT STICKY CTA BAR - Keeps CTA visible and intuitive on mobile and desktop */}
      <AnimatePresence>
        {showStickyCta && !bookingOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-0 right-0 z-35 px-4 pointer-events-none flex justify-center"
          >
            <div className="bg-sage-900 border border-sage-800 backdrop-blur-md rounded-2xl py-3 px-4 md:px-6 shadow-2xl flex items-center justify-between gap-6 pointer-events-auto max-w-xl w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-gold-400 rounded-full animate-ping" />
                <div>
                  <p className="text-xs font-serif font-medium text-cream-50 leading-tight">60-Min Nervous System Reset</p>
                  <p className="text-[10px] font-accent text-sage-350 font-medium">{CORE_OFFER.investment} — private session</p>
                </div>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-gold-550 hover:bg-gold-600 text-sage-955 text-xs font-accent font-bold px-4 py-2.5 rounded-full shadow-md transition-colors cursor-pointer"
              >
                Reserve Space
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BOOKING SESSION MODAL */}
      <AnimatePresence>
        {bookingOpen && (
          <BookingSession initialSessionType={bookingType} onClose={() => setBookingOpen(false)} />
        )}
      </AnimatePresence>

      {/* GROUNDING MOMENT OVERLAY */}
      <GroundingOverlay
        isOpen={groundingOpen}
        onClose={() => setGroundingOpen(false)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* SUBTLE BACKGROUND AUDIO SANCTUARY CONTROLLER */}
      <AmbientSoundscape />

    </div>
  );
}
