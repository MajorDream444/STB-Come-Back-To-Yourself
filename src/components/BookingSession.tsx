/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Session enquiry flow.
 *
 * NOTE ON SCOPE: this component is currently NOT mounted anywhere in the app
 * (see App.tsx). It is repaired rather than deleted so the design work is
 * preserved, but mounting it is a separate, explicit decision.
 *
 * Four defects were removed here, all of which asserted things that were not
 * true:
 *   1. A hardcoded `mailto:` submission that bypassed the Google Form -> Sheets
 *      CRM pathway that CRM-HANDOFF.md defines as the single front door.
 *   2. A hardcoded list of specific dates with invented scarcity ("3 spots
 *      open"). There is no scheduling system behind the site, so no specific
 *      slot can be offered or held. Replaced with a coarse timing
 *      *preference* that Flo confirms by email.
 *   3. A confirmation screen reading "Your Sanctuary Space Is Set" / "I have
 *      successfully set aside this time on my register" / a "Somatic
 *      Confirmation" ticket. Nothing was booked and no register exists.
 *   4. A checklist collecting health information (chest tightness, jaw
 *      clenching, burnout, hyper-alertness) which was then placed in a
 *      plaintext mailto URL. Removed as unnecessary for arranging a first
 *      conversation.
 *
 * Flo's offers, prices, durations and descriptions are unchanged.
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Clock, Check, Sparkles, ChevronRight, AlertCircle, Heart, X } from "lucide-react";
import { openIntake, summarizeIntake, type IntakeRouteResult } from "../lib/intake";

interface BookingSessionProps {
  onClose: () => void;
  initialSessionType?: "discovery" | "reset" | "journey";
}

const TOTAL_STEPS = 3;

export function BookingSession({ onClose, initialSessionType = "discovery" }: BookingSessionProps) {
  const [sessionType, setSessionType] = useState<"discovery" | "reset" | "journey">(initialSessionType);
  const [step, setStep] = useState(1);
  const [timingPreference, setTimingPreference] = useState("");
  const [customMsg, setCustomMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState<IntakeRouteResult | null>(null);
  const [copied, setCopied] = useState(false);

  const sessionInfos = {
    discovery: {
      title: "Free Discovery Call",
      duration: "30 minutes",
      price: "Free",
      accent: "Discovery",
      desc: "A safe initial conversation to map where you are and see if this somatic container is the right path for you."
    },
    reset: {
      title: "Nervous System Reset",
      duration: "30–45 minutes",
      price: "€111",
      accent: "Regulation",
      desc: "A gentle, physical introduction focused on regulation, grounding, body awareness, and down-regulation."
    },
    journey: {
      title: "Private Breathwork Journey",
      duration: "90 minutes",
      price: "€188",
      accent: "Signature Offer",
      desc: "Arrival • Intention • Conscious connected breathwork • Integration • Grounded Reflection (Signature Experience)."
    }
  };

  const activeSession = sessionInfos[sessionType];

  /**
   * Coarse preferences only. Deliberately not specific dates or times: the
   * site cannot check or hold availability, so offering a slot would imply a
   * booking that nothing can honour.
   */
  const timingPreferences = [
    { value: "Mornings", desc: "Earlier in the day" },
    { value: "Midday", desc: "Around the middle of the day" },
    { value: "Afternoons", desc: "Later in the day" },
    { value: "Flexible", desc: "Whatever suits Flo's schedule" }
  ];

  const payload = {
    name,
    email,
    phone,
    interest: `${activeSession.title} (${activeSession.price})`,
    timingPreference,
    note: customMsg
  };

  const submitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !termsAccepted) return;

    setLoading(true);
    const result = openIntake(payload);
    setLoading(false);
    setRouteResult(result);
    setStep(TOTAL_STEPS + 1);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summarizeIntake(payload));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2a312a]/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#FAF6F0] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-sage-100"
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 p-6 md:p-8 pb-0">
          <div>
            <h3 className="text-xl md:text-2xl font-serif text-sage-900 font-medium flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold-500" /> Request a session
            </h3>
            <p className="text-xs text-sage-600 mt-1 font-accent">
              Flo reads every request personally and replies by email to arrange a time.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-sage-500 hover:text-sage-900 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-sage-100 mx-6 md:mx-8 mt-5 rounded-full overflow-hidden">
          <div
            className="bg-gold-500 h-full transition-all duration-500"
            style={{ width: `${(Math.min(step, TOTAL_STEPS) / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto no-scrollbar">

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-center md:text-left mb-2">
                <span className="text-[10px] font-accent font-bold tracking-widest text-[#658365] bg-sage-100/70 border border-sage-200 px-3 py-1 rounded-full uppercase">
                  Step 1 of {TOTAL_STEPS}: Choose a session
                </span>

                {/* Session Type Quick Tabs Selector */}
                <div className="mt-4 grid grid-cols-3 gap-2 p-1.5 bg-sage-100/50 rounded-2xl border border-sage-200/40">
                  {(Object.keys(sessionInfos) as Array<keyof typeof sessionInfos>).map((typeKey) => (
                    <button
                      key={typeKey}
                      type="button"
                      onClick={() => setSessionType(typeKey)}
                      className={`py-2 px-3 rounded-xl text-[10px] md:text-xs font-accent font-medium tracking-wide transition-all ${
                        sessionType === typeKey
                          ? "bg-sage-800 text-cream-50 shadow-sm"
                          : "text-sage-700 hover:text-sage-955 hover:bg-sage-200/30"
                      }`}
                    >
                      <span className="block font-semibold">{sessionInfos[typeKey].accent}</span>
                      <span className="block text-[8px] opacity-75 mt-0.5">{sessionInfos[typeKey].price}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 bg-white/70 p-3.5 rounded-xl border border-sage-200/30 text-left text-xs text-sage-800 font-light leading-relaxed">
                  <strong>Selected Container Detail:</strong> {activeSession.desc} ({activeSession.duration})
                </div>
              </div>

              {/* Optional, visitor-written note. No health checklist. */}
              <div>
                <label htmlFor="booking-note" className="block text-xs font-accent font-medium text-sage-800 mb-1.5">
                  Anything you'd like Flo to know before you meet? (optional)
                </label>
                <textarea
                  id="booking-note"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Share only what you want to share."
                  className="w-full text-xs font-accent border border-sage-200 rounded-xl p-3 bg-white/95 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500 min-h-[80px]"
                />
                <p className="text-[10px] text-sage-500 mt-1.5 font-accent">
                  Please don't include medical or health details here — Flo will ask
                  anything she needs to know when you speak.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-accent font-medium tracking-wide py-3 px-6 rounded-full flex items-center gap-1 shadow-xs ml-auto cursor-pointer"
                >
                  Choose a timing preference <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-center md:text-left mb-2">
                <span className="text-[10px] font-accent font-bold tracking-widest text-[#658365] bg-sage-100/70 border border-sage-200 px-3 py-1 rounded-full uppercase">
                  Step 2 of {TOTAL_STEPS}: Timing preference
                </span>
                <h4 className="text-xl font-serif text-sage-900 mt-3 font-medium">
                  When is generally easiest for you?
                </h4>
                <p className="text-xs text-sage-600 mt-1 font-accent">
                  This is a preference, not a booking. Flo will reply by email to
                  agree an exact time with you.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-accent font-bold text-sage-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sage-500" /> Preferred time of day
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {timingPreferences.map((option) => {
                    const isSelected = timingPreference === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTimingPreference(option.value)}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs font-accent ${
                          isSelected
                            ? "bg-sage-600 border-sage-700 text-cream-50"
                            : "bg-white/90 hover:bg-[#FAF6F0] border-sage-200/70 text-sage-800"
                        }`}
                      >
                        <span>
                          <span className="block font-semibold">{option.value}</span>
                          <span className="block text-[10px] opacity-75 mt-0.5">{option.desc}</span>
                        </span>
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-gold-300 shrink-0 ml-2" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-sage-300 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-3 border-t border-sage-200/40">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-accent text-sage-600 hover:text-sage-900 py-2.5 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-accent font-medium tracking-wide py-3 px-6 rounded-full flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  Your details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="text-center md:text-left mb-2">
                <span className="text-[10px] font-accent font-bold tracking-widest text-[#658365] bg-sage-100/70 border border-sage-200 px-3 py-1 rounded-full uppercase">
                  Step {TOTAL_STEPS} of {TOTAL_STEPS}: Your details
                </span>
              </div>

              {/* Selected summary — a request, not a reservation */}
              <div className="bg-sage-50 border border-sage-200/60 p-3.5 rounded-2xl flex flex-wrap gap-x-4 gap-y-2 justify-between items-center text-xs text-sage-800 font-accent">
                <div>
                  <span className="font-semibold text-sage-900 uppercase tracking-wider text-[10px] block mb-0.5 opacity-70">Requesting</span>
                  <p>{activeSession.title}{timingPreference ? ` — ${timingPreference}` : ""}</p>
                </div>
                <div>
                  <span className="font-semibold text-sage-900 uppercase tracking-wider text-[10px] block mb-0.5 opacity-70">Somatic Cost</span>
                  <p className="font-bold text-sage-900">{activeSession.price}</p>
                </div>
              </div>

              <form onSubmit={submitEnquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="booking-name" className="block text-xs font-accent text-sage-700 font-medium mb-1">Your Full Name</label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block text-xs font-accent text-sage-700 font-medium mb-1">Email Address</label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maya@domain.com"
                      className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-accent text-sage-700 font-medium mb-1">Phone Number (Optional)</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +31 6 12345678"
                    className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                {/* Somatic safety reminder — wording unchanged */}
                <div className="bg-gold-50/70 border border-gold-400/20 p-3.5 rounded-xl flex gap-2.5">
                  <AlertCircle className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div className="text-[10px] text-sage-800 font-accent leading-relaxed">
                    <strong>Somantical Guidance Waiver:</strong> I understand that breathwork is a powerful somatic awareness doorway to help me slow down. This is not medical diagnostics or a mental health crisis intervention.
                  </div>
                </div>

                {/* Consent — a request, with no payment or confirmation promise */}
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-sage-300 text-sage-600 focus:ring-sage-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className="text-[11px] text-sage-600 font-accent leading-tight">
                    I understand this is a request for a {activeSession.duration} session,
                    not a confirmed booking, and that Flo will contact me to arrange a time.
                  </span>
                </label>

                <div className="flex justify-between pt-3 border-t border-sage-200/40">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-accent text-sage-600 hover:text-sage-900 py-2.5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !termsAccepted}
                    className="bg-sage-800 disabled:opacity-50 hover:bg-sage-900 text-cream-50 text-xs font-accent font-semibold tracking-wide py-3 px-8 rounded-full flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    {loading ? "Opening intake form..." : "Continue to intake form"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step > TOTAL_STEPS && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 px-4 space-y-5"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-500 text-cream-50 shadow-md">
                <Sparkles className="w-7 h-7 text-gold-200" />
              </div>

              {routeResult?.ok ? (
                <div className="space-y-2">
                  <h4 className="text-2xl font-serif text-sage-900 font-medium">One last step</h4>
                  <p className="text-xs text-sage-600 max-w-sm mx-auto font-accent">
                    Thank you, <strong>{name}</strong>. Flo's intake form has opened in a
                    new tab — complete it there and she'll reply to <strong>{email}</strong>{" "}
                    to arrange a time. Nothing is booked until she confirms.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-2xl font-serif text-sage-900 font-medium">
                    Open the intake form to finish
                  </h4>
                  <p className="text-xs text-sage-600 max-w-sm mx-auto font-accent">
                    The form could not open automatically — your browser may have
                    blocked it. Open it with the link below. You can copy your answers
                    first so nothing is retyped.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <a
                      href={routeResult?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-6 rounded-full bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-accent font-medium tracking-wide shadow-xs inline-block"
                    >
                      Open the intake form
                    </a>
                    <button
                      type="button"
                      onClick={copySummary}
                      className="py-2.5 px-6 rounded-full border border-sage-300 text-sage-800 hover:bg-sage-100 text-xs font-accent font-medium tracking-wide inline-block cursor-pointer"
                    >
                      {copied ? "Copied" : "Copy my answers"}
                    </button>
                  </div>
                  <pre className="text-[10px] text-left text-sage-700 bg-white/60 border border-sage-200 rounded-xl p-3 max-w-xs mx-auto whitespace-pre-wrap font-accent">
                    {summarizeIntake(payload)}
                  </pre>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-6 rounded-full bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-accent font-medium tracking-wide shadow-xs cursor-pointer inline-block"
                >
                  Return to Sanctuary
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
