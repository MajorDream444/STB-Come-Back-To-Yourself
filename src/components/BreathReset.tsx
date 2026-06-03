/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Mail, Check, Leaf, Sparkles, BookOpen } from "lucide-react";

interface BreathResetProps {
  onOpenLeadModal?: () => void;
}

export function BreathReset({ onOpenLeadModal }: BreathResetProps) {
  // Breathing states: 'idle', 'breathing', 'complete'
  const [status, setStatus] = useState<"idle" | "breathing" | "complete">("idle");
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "hold-empty">("inhale");
  const [secondsInPhase, setSecondsInPhase] = useState(0);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState<"reset" | "box" | "calming">("reset");

  // Lead generation states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Rhythms: inhale, hold, exhale, hold-empty times in seconds
  const rhythms = {
    reset: { inhale: 4, hold: 2, exhale: 5, holdEmpty: 0, label: "Gentle Reset (4-2-5)", desc: "Slightly extended exhalations to calm the heart rate." },
    box: { inhale: 4, hold: 4, exhale: 4, holdEmpty: 4, label: "Cohesive Box (4-4-4-4)", desc: "Symmetric balancing for centered focus and clarity." },
    calming: { inhale: 4, hold: 7, exhale: 8, holdEmpty: 0, label: "Deep Somatic (4-7-8)", desc: "Deep nervous system down-regulation and deep ease." }
  };

  const currentRhythm = rhythms[selectedRhythm];

  // Ref to track audio state
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound generator
  const playChime = (frequency: number, type: "sine" | "triangle" = "sine", duration = 0.8) => {
    if (!soundEnabled) return;
    try {
      // Lazy init AudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Low velocity, warm gentle curve
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05); // low volume, safe
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  // Breathing Loop Timer
  useEffect(() => {
    let timer: any = null;

    if (status === "breathing") {
      timer = setInterval(() => {
        setSecondsInPhase((prev) => {
          const limit =
            phase === "inhale"
              ? currentRhythm.inhale
              : phase === "hold"
              ? currentRhythm.hold
              : phase === "exhale"
              ? currentRhythm.exhale
              : currentRhythm.holdEmpty;

          const nextSec = prev + 1;
          setTotalSecondsElapsed((t) => t + 1);

          if (nextSec >= limit) {
            // Determine next phase
            let nextPhase: typeof phase = "inhale";
            if (phase === "inhale") {
              nextPhase = currentRhythm.hold > 0 ? "hold" : "exhale";
            } else if (phase === "hold") {
              nextPhase = "exhale";
            } else if (phase === "exhale") {
              nextPhase = currentRhythm.holdEmpty > 0 ? "hold-empty" : "inhale";
            } else if (phase === "hold-empty") {
              nextPhase = "inhale";
            }

            // Sound cue for phase change
            const chimeFreq = nextPhase === "inhale" ? 523.25 : nextPhase === "hold" ? 659.25 : nextPhase === "exhale" ? 440.00 : 392.00; // C5, E5, A4, G4
            const chimeType = nextPhase === "inhale" || nextPhase === "exhale" ? "sine" : "triangle";
            playChime(chimeFreq, chimeType, 0.6);

            setPhase(nextPhase);
            return 0; // reset phase clock
          }
          return nextSec;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [status, phase, selectedRhythm, soundEnabled]);

  // Handle Complete state after 2 minutes of practice
  useEffect(() => {
    if (totalSecondsElapsed >= 120 && status === "breathing") {
      setStatus("complete");
      playChime(523.25, "sine", 1.5); // long nice ring
    }
  }, [totalSecondsElapsed, status]);

  const toggleBreathing = () => {
    if (status === "idle" || status === "complete") {
      setStatus("breathing");
      setPhase("inhale");
      setSecondsInPhase(0);
      setTotalSecondsElapsed(0);
      // Play initial beautiful chime
      playChime(523.25, "sine", 1.0);
    } else {
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setPhase("inhale");
    setSecondsInPhase(0);
    setTotalSecondsElapsed(0);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "lead", name, email }),
      });
    } catch {
      // Still show success UX
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  // Calculate motion scale and label
  let scale = 1.0;
  let textLabel = "Prepare";
  let colorGlow = "rgba(115, 143, 115, 0.15)"; // Sage
  let phasePercent = 0;

  if (status === "breathing") {
    const limit =
      phase === "inhale"
        ? currentRhythm.inhale
        : phase === "hold"
        ? currentRhythm.hold
        : phase === "exhale"
        ? currentRhythm.exhale
        : currentRhythm.holdEmpty;

    phasePercent = (secondsInPhase / limit) * 100;

    switch (phase) {
      case "inhale":
        scale = 1.0 + (secondsInPhase / limit) * 0.55; // Expand
        textLabel = "Breathe In";
        colorGlow = "rgba(197, 168, 128, 0.25)"; // Gold
        break;
      case "hold":
        scale = 1.55; // Keep large
        textLabel = "Hold Restfully";
        colorGlow = "rgba(115, 143, 115, 0.25)"; // Sage
        break;
      case "exhale":
        scale = 1.55 - (secondsInPhase / limit) * 0.55; // Contract
        textLabel = "Breathe Out";
        colorGlow = "rgba(197, 168, 128, 0.15)"; // Light Gold
        break;
      case "hold-empty":
        scale = 1.0; // Keep small
        textLabel = "Pause & Wait";
        colorGlow = "rgba(42, 49, 42, 0.1)"; // Darker
        break;
    }
  }

  return (
    <div id="breathwork-pacer-box" className="w-full max-w-4xl mx-auto bg-[#FAF6F0] rounded-3xl border border-sage-200/50 p-6 md:p-10 shadow-sm relative overflow-hidden">
      
      {/* Background soft blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sage-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gold-100 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: PACER */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-sage-200/40 pb-8 lg:pb-0 lg:pr-8">
          
          {/* Controls bar */}
          <div className="flex items-center justify-between w-full mb-6">
            <span className="text-xs font-accent tracking-widest text-sage-600 uppercase flex items-center gap-1.5 font-medium">
              <Leaf className="w-3.5 h-3.5 text-sage-500 animate-pulse" /> 
              Somatic Reset
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-full transition-colors ${soundEnabled ? "bg-sage-100/80 text-sage-800" : "bg-transparent text-sage-400 hover:text-sage-600"}`}
                title={soundEnabled ? "Mute chimes" : "Enable chimes"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-full bg-transparent text-sage-400 hover:text-sage-600 hover:bg-sage-50 transition-all"
                title="Reset session"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Breathing Circle Ring Visualizer */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center my-6">
            
            {/* Outer pulsating rings for energy waves */}
            <AnimatePresence>
              {status === "breathing" && (
                <motion.div
                  key={phase}
                  initial={{ scale: 0.9, opacity: 0.1 }}
                  animate={{ scale: scale + 0.15, opacity: [0.1, 0.2, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: phase === "inhale" ? currentRhythm.inhale : currentRhythm.exhale, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-gold-300 pointer-events-none"
                  style={{ backdropFilter: "blur(1px)" }}
                />
              )}
            </AnimatePresence>

            {/* Main Interactive Circle */}
            <motion.div
              animate={{
                scale: scale,
                backgroundColor: status === "breathing" ? (phase === "inhale" ? "#fbf8f0" : "#e9ece9") : "#FAF6F0",
                boxShadow: `0 0 40px ${colorGlow}, inset 0 0 20px rgba(255,255,255,0.7)`
              }}
              transition={{
                duration: status === "breathing" ? (secondsInPhase === 0 ? 0.3 : 1) : 0.8,
                ease: "easeInOut"
              }}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-sage-300 flex flex-col items-center justify-center cursor-pointer relative select-none"
              onClick={toggleBreathing}
            >
              
              {/* Central Copy and feedback */}
              <div className="text-center z-12 px-4">
                <p className="text-xs font-accent tracking-widest text-[#88a388] uppercase mb-1">
                  {status === "breathing" ? `Phase ${phase.toUpperCase()}` : "Grounded"}
                </p>
                <h3 className="text-xl md:text-2xl font-serif text-sage-900 font-medium leading-tight">
                  {status === "idle" ? "Return" : textLabel}
                </h3>
                {status === "breathing" && (
                  <p className="text-xs font-mono text-sage-600 mt-2 font-medium">
                    {secondsInPhase}s / {
                      phase === "inhale"
                        ? currentRhythm.inhale
                        : phase === "hold"
                        ? currentRhythm.hold
                        : phase === "exhale"
                        ? currentRhythm.exhale
                        : currentRhythm.holdEmpty
                    }s
                  </p>
                )}
                {status === "idle" && (
                  <p className="text-xs text-sage-500 mt-2 font-accent">
                    Click to begin
                  </p>
                )}
                {status === "complete" && (
                  <p className="text-xs text-gold-600 mt-1 font-accent font-medium">
                    2 min reset complete
                  </p>
                )}
              </div>

              {/* Progress filling arc */}
              {status === "breathing" && (
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    className="stroke-sage-200/20 fill-none"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    className="stroke-sage-500 fill-none transition-all duration-300"
                    strokeWidth="3"
                    strokeDasharray="295"
                    strokeDashoffset={295 - (295 * phasePercent) / 100}
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </motion.div>
          </div>

          {/* Player controls */}
          <div className="flex flex-col items-center gap-2 mt-2 w-full">
            <button
              onClick={toggleBreathing}
              className="py-2.5 px-6 rounded-full bg-sage-800 text-cream-100 hover:bg-sage-900 transition-all flex items-center gap-2 text-sm font-medium tracking-wide shadow-sm"
            >
              {status === "breathing" ? <Pause className="w-4 h-4 fill-cream-100" /> : <Play className="w-4 h-4 fill-cream-100" />}
              {status === "breathing" ? "Pause Practice" : status === "complete" ? "Practice Again" : "Begin 5-Min practice"}
            </button>
            {status === "breathing" && (
              <p className="text-xs text-sage-600 mt-1 font-accent italic">
                Total session time: {Math.floor(totalSecondsElapsed / 60)}m {totalSecondsElapsed % 60}s (Highly recommended value: 5 minutes)
              </p>
            )}
            {status === "idle" && (
              <p className="text-xs text-sage-500 mt-1 text-center font-accent">
                Just 5 minutes of focused exhalation switches your nervous system back to safety.
              </p>
            )}
          </div>

        </div>

        {/* Right Column: GUIDES & LEAD CAPTURE */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full pt-4 lg:pt-0">
          
          <div className="mb-6">
            <h4 className="text-sm font-accent font-semibold tracking-wider text-sage-800 uppercase mb-3">
              1. Choose a Rhythm
            </h4>
            <div className="space-y-3.5">
              {(Object.keys(rhythms) as Array<keyof typeof rhythms>).map((key) => (
                <button
                  key={key}
                  disabled={status === "breathing"}
                  onClick={() => {
                    setSelectedRhythm(key);
                    setSecondsInPhase(0);
                    setPhase("inhale");
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedRhythm === key
                      ? "bg-sage-50 border-sage-400 shadow-xs"
                      : "bg-white/40 border-sage-200/50 hover:bg-white hover:border-sage-300"
                  } ${status === "breathing" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <p className="text-sm font-accent font-medium text-sage-900 flex justify-between">
                    <span>{rhythms[key].label}</span>
                    {selectedRhythm === key && <span className="text-xs bg-sage-200 text-sage-800 py-0.5 px-2 rounded-full font-medium">Selected</span>}
                  </p>
                  <p className="text-xs text-sage-600 mt-1 leading-relaxed">
                    {rhythms[key].desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-sage-200/50 pt-6">
            <div className="bg-gold-50/60 rounded-2xl border border-gold-300/40 p-4 md:p-5 relative">
              <span className="absolute -top-3.5 right-4 bg-gold-500 text-cream-50 text-[10px] uppercase font-accent font-bold tracking-widest px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Companion Guide
              </span>
              
              <h4 className="text-sm font-accent font-semibold text-sage-900 flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-4 h-4 text-gold-600" />
                The 3x5 Breath Reset Guide
              </h4>
              <p className="text-xs text-sage-700 leading-relaxed mb-4">
                Receive the offline sanctuary companion. Contains exact timings, somatic checks, and sensory anchors to return to yourself in 5 minutes, 3 times a day.
              </p>

              {submitted ? (
                <div className="bg-sage-100/50 border border-sage-200 p-4 rounded-xl text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sage-500 text-cream-50 mb-2">
                    <Check className="w-4 h-4" />
                  </div>
                  <h5 className="text-sm font-accent font-semibold text-sage-900">
                    Somatic Booklet Prepared!
                  </h5>
                  <p className="text-xs text-sage-600 mt-1 leading-relaxed">
                    I have sent it to <strong>{email}</strong>. Look for an email from <em>Floortje</em> to begin today.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your First Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white/90 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs font-accent border border-sage-200 rounded-lg p-2.5 bg-white/90 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sage-800 hover:bg-sage-900 disabled:opacity-50 text-cream-50 font-accent font-medium tracking-wide py-2.5 px-4 rounded-lg text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    {loading ? "Preparing Somatic Package..." : "Get PDF + Companion Blueprint"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
