/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Check, Sparkles, ChevronRight, AlertCircle, Heart, X, Sparkle } from "lucide-react";
import { CORE_OFFER } from "../types";

interface BookingSessionProps {
  onClose: () => void;
  initialSessionType?: "discovery" | "reset" | "journey";
}

export function BookingSession({ onClose, initialSessionType = "discovery" }: BookingSessionProps) {
  const [sessionType, setSessionType] = useState<"discovery" | "reset" | "journey">(initialSessionType);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptom, setSymptom] = useState<string[]>([]);
  const [customMsg, setCustomMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      price: "€75",
      accent: "Regulation",
      desc: "A gentle, physical introduction focused on regulation, grounding, body awareness, and down-regulation."
    },
    journey: {
      title: "Private Breathwork Journey",
      duration: "90 minutes",
      price: "€150",
      accent: "Signature Offer",
      desc: "Arrival • Intention • Conscious connected breathwork • Integration • Grounded Reflection (Signature Experience)."
    }
  };

  const activeSession = sessionInfos[sessionType];

  const availableDates = [
    { value: "2026-06-02", label: "Tues, June 2", secondary: "3 spots open" },
    { value: "2026-06-03", label: "Wed, June 3", secondary: "2 spots open" },
    { value: "2026-06-04", label: "Thurs, June 4", secondary: "1 spot left" },
    { value: "2026-06-08", label: "Mon, June 8", secondary: "4 spots open" },
    { value: "2026-06-10", label: "Wed, June 10", secondary: "3 spots open" }
  ];

  const availableHours = [
    { value: "09:00", label: "09:00 AM", desc: "Dusk breathwork & morning reflection" },
    { value: "11:30", label: "11:30 AM", desc: "Midday regulation and breath grounding" },
    { value: "14:30", label: "02:30 PM", desc: "Afternoon soft somatic releases" },
    { value: "17:00", label: "05:00 PM", desc: "Golden-hour sunset integration" }
  ];

  const symptomsList = [
    "Overthinking & mental exhausting",
    "Tightness in my chest or throat",
    "Clenched jaw / shoulder blockages",
    "Feeling chronically 'on' or hyper-alert",
    "Burnout / physical fatigue",
    "Disconnected from physical emotions"
  ];

  const handleSymptomToggle = (item: string) => {
    if (symptom.includes(item)) {
      setSymptom(symptom.filter((s) => s !== item));
    } else {
      setSymptom([...symptom, item]);
    }
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !termsAccepted) return;

    setLoading(true);

    const dateLabel = availableDates.find((d) => d.value === selectedDate)?.label || selectedDate;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Session: ${activeSession.title} (${activeSession.price})`,
      `Date: ${dateLabel} at ${selectedTime}`,
      symptom.length ? `Symptoms: ${symptom.join(", ")}` : null,
      customMsg ? `Notes: ${customMsg}` : null,
    ]
      .filter(Boolean)
      .join("%0D%0A");

    setTimeout(() => {
      setLoading(false);
      setStep(4);
      window.location.href = `mailto:hi@floortjedeliefde.com?subject=Booking Request — ${encodeURIComponent(activeSession.title)} from ${encodeURIComponent(name)}&body=${bodyLines}`;
    }, 800);
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
        <div className="relative px-6 py-5 bg-sage-800 text-cream-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold-300 animate-pulse fill-gold-300" />
            <div>
              <h3 className="font-serif text-lg font-medium tracking-wide">{activeSession.title}</h3>
              <p className="text-xs text-sage-200 font-accent">Somatic container with Floortje de Liefde</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-sage-700/65 text-cream-50 hover:bg-sage-600 transition-colors cursor-pointer"
            title="Close booking"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="w-full bg-sage-200/40 h-1">
          <div
            className="bg-gold-500 h-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto no-scrollbar">
          
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-center md:text-left mb-2">
                <span className="text-[10px] font-accent font-bold tracking-widest text-[#658365] bg-sage-100/70 border border-sage-200 px-3 py-1 rounded-full uppercase">
                  Step 1 of 3: Session & Bodily Status
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

                <h4 className="text-lg font-serif text-sage-900 mt-5 font-semibold">
                  Where are you carrying stress in your body?
                </h4>
                <p className="text-xs text-sage-600 mt-1 font-accent">
                  Checking these areas helps Flo establish a trauma-informed and beautifully regulated flow.
                </p>
              </div>

              {/* Symptom Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {symptomsList.map((item) => {
                  const isSelected = symptom.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => handleSymptomToggle(item)}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs font-accent ${
                        isSelected
                          ? "bg-sage-600 border-sage-700 text-cream-50"
                          : "bg-white/90 hover:bg-[#FAF6F0] border-sage-200/70 text-sage-800"
                      }`}
                    >
                      <span>{item}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-gold-300 shrink-0 ml-2" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-sage-300 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Free-form somatic note */}
              <div>
                <label className="block text-xs font-accent font-medium text-sage-800 mb-1.5">
                  Anything else you've noticed lately? (e.g., shallow chest breathing, burnout boundary)
                </label>
                <textarea
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="I find myself shallow breathing all afternoon at the screen..."
                  className="w-full text-xs font-accent border border-sage-200 rounded-xl p-3 bg-white/95 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500 min-h-[80px]"
                />
              </div>

              {/* Action */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="bg-sage-800 hover:bg-sage-900 text-cream-50 text-xs font-accent font-medium tracking-wide py-3 px-6 rounded-full flex items-center gap-1 shadow-xs ml-auto cursor-pointer"
                >
                  Choose Date & Time <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="text-center md:text-left mb-2">
                <span className="text-[10px] font-accent font-bold tracking-widest text-[#658365] bg-sage-100/70 border border-sage-200 px-3 py-1 rounded-full uppercase">
                  Step 2 of 3: Scheduling
                </span>
                <h4 className="text-xl font-serif text-sage-900 mt-3 font-medium">
                  Select a sacred space on your horizon
                </h4>
                <p className="text-xs text-sage-600 mt-1 font-accent">
                  The session takes 60 minutes. All times are guided live either in-person or online.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Dates */}
                <div className="md:col-span-6 space-y-2">
                  <span className="block text-xs font-accent font-bold text-sage-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sage-500" /> Choose Date
                  </span>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                    {availableDates.map((dateObj) => (
                      <button
                        key={dateObj.value}
                        onClick={() => setSelectedDate(dateObj.value)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-accent transition-all ${
                          selectedDate === dateObj.value
                            ? "bg-sage-50 border-sage-500 font-medium"
                            : "bg-white/90 border-sage-200/50 hover:bg-white"
                        }`}
                      >
                        <p className="text-sage-900">{dateObj.label}</p>
                        <p className="text-[10px] text-sage-500 mt-0.5">{dateObj.secondary}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="md:col-span-6 space-y-2">
                  <span className="block text-xs font-accent font-bold text-sage-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sage-500" /> Choose Time Block
                  </span>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                    {availableHours.map((hourObj) => (
                      <button
                        key={hourObj.value}
                        onClick={() => setSelectedTime(hourObj.value)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-accent transition-all ${
                          selectedTime === hourObj.value
                            ? "bg-sage-50 border-sage-500 font-medium"
                            : "bg-white/90 border-sage-200/50 hover:bg-white"
                        }`}
                      >
                        <p className="text-sage-900">{hourObj.label}</p>
                        <p className="text-[10px] text-sage-500 mt-0.5 leading-tight">{hourObj.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Navigation */}
              <div className="flex justify-between pt-4 border-t border-sage-200/40">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-accent text-sage-600 hover:text-sage-900 py-2.5 transition-colors"
                >
                  Back to somatic check
                </button>
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  className="bg-sage-800 disabled:opacity-50 hover:bg-sage-900 text-cream-50 text-xs font-accent font-medium tracking-wide py-3 px-6 rounded-full flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  Contact & Confirm <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="text-center md:text-left mb-2">
                <span className="text-[10px] font-accent font-bold tracking-widest text-[#658365] bg-sage-100/70 border border-sage-200 px-3 py-1 rounded-full uppercase">
                  Step 3 of 3: Secure Booking
                </span>
                <h4 className="text-xl font-serif text-sage-900 mt-3 font-medium">
                  Provide safe container contact details
                </h4>
                <p className="text-xs text-sage-600 mt-1 font-accent">
                  Your details will not be shared. Floortje will reach out personally prior to your reset.
                </p>
              </div>

              {/* Selected summary */}
              <div className="bg-sage-50 border border-sage-200/60 p-3.5 rounded-2xl flex flex-wrap gap-x-4 gap-y-2 justify-between items-center text-xs text-sage-800 font-accent">
                <div>
                  <span className="font-semibold text-sage-900 uppercase tracking-wider text-[10px] block mb-0.5 opacity-70">Chosen Space</span>
                  <p>{availableDates.find((d) => d.value === selectedDate)?.label} — {selectedTime}</p>
                </div>
                <div>
                  <span className="font-semibold text-sage-900 uppercase tracking-wider text-[10px] block mb-0.5 opacity-70">Somatic Cost</span>
                  <p className="font-bold text-sage-900">{activeSession.price}</p>
                </div>
              </div>

              <form onSubmit={submitBooking} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-accent text-sage-700 font-medium mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-accent text-sage-700 font-medium mb-1">Email Address</label>
                    <input
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
                  <label className="block text-xs font-accent text-sage-700 font-medium mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +31 6 12345678"
                    className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                {/* Somatic safety reminder */}
                <div className="bg-gold-50/70 border border-gold-400/20 p-3.5 rounded-xl flex gap-2.5">
                  <AlertCircle className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                  <div className="text-[10px] text-sage-800 font-accent leading-relaxed">
                    <strong>Somantical Guidance Waiver:</strong> I understand that breathwork is a powerful somatic awareness doorway to help me slow down. This is not medical diagnostics or a mental health crisis intervention.
                  </div>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                     onChange={(e) => setTermsAccepted(e.target.checked)}
                     className="mt-0.5 rounded border-sage-300 text-sage-600 focus:ring-sage-500 w-3.5 h-3.5 cursor-pointer"
                   />
                   <span className="text-[11px] text-sage-600 font-accent leading-tight">
                     I agree to the {activeSession.duration} Somatic Containment and understand payment will be settled in-person or securely post-conformation.
                   </span>
                 </label>

                {/* Actions Navigation */}
                <div className="flex justify-between pt-3 border-t border-sage-200/40">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-accent text-sage-600 hover:text-sage-900 py-2.5 transition-colors"
                  >
                    Back to appointment scheduler
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !termsAccepted}
                    className="bg-sage-800 disabled:opacity-50 hover:bg-sage-900 text-cream-50 text-xs font-accent font-semibold tracking-wide py-3 px-8 rounded-full flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    {loading ? "Aligning alignment container..." : "Align My Somatic Space"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 px-4 space-y-5"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-500 text-cream-50 shadow-md">
                <Sparkle className="w-7 h-7 text-gold-200 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-serif text-sage-900 font-medium">Your Sanctuary Space Is Set</h4>
                <p className="text-xs text-sage-600 max-w-sm mx-auto font-accent">
                  Thank you, <strong>{name}</strong>. I have successfully set aside this time on my register. I'll reach out directly at <strong>{email}</strong> within 12 hours with preparatory notes.
                </p>
              </div>

              {/* Custom appointment ticket mockup */}
              <div className="inline-block bg-white/60 border border-sage-200 rounded-2xl p-5 text-left max-w-xs w-full shadow-xs mx-auto">
                <span className="text-[9px] font-accent font-bold text-sage-600 bg-sage-200/70 px-2.5 py-0.5 rounded-full uppercase mb-2 inline-block">Somatic Confirmation</span>
                <p className="text-xs font-serif font-semibold text-sage-900">{activeSession.title}</p>
                <div className="mt-2.5 space-y-1 bg-sage-50/50 p-2.5 rounded-lg text-[10px] font-accent text-sage-700">
                  <p><strong>Practitioner:</strong> Floortje de Liefde</p>
                  <p><strong>Time:</strong> {availableDates.find((d) => d.value === selectedDate)?.label} @ {selectedTime}</p>
                  <p><strong>Duration:</strong> {activeSession.duration}</p>
                  <p><strong>Cost:</strong> {activeSession.price} (Settled post-session)</p>
                </div>
              </div>

              <div className="pt-2">
                <button
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
