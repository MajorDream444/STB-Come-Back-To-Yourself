/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Wind, Check, Calendar } from "lucide-react";

interface GroundingOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function GroundingOverlay({ isOpen, onClose, onOpenBooking }: GroundingOverlayProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Determine tick in current 10-second cycle (Inhale 4s, Hold 2s, Exhale 4s)
  const elapsed = 30 - timeLeft;
  const cycleTick = elapsed % 10;

  let currentPhase: "inhale" | "hold" | "exhale" = "inhale";
  let phaseProgress = 0; // 0 to 1 progress within the active phase for smooth scaling if needed

  if (cycleTick < 4) {
    currentPhase = "inhale";
    phaseProgress = cycleTick / 4;
  } else if (cycleTick < 6) {
    currentPhase = "hold";
    phaseProgress = (cycleTick - 4) / 2;
  } else {
    currentPhase = "exhale";
    phaseProgress = (cycleTick - 6) / 4;
  }

  // Chime generator
  const playSomaticChime = (frequency: number, type: "sine" | "triangle" = "sine", duration = 0.8) => {
    if (!soundEnabled) return;
    try {
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

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context blocked:", e);
    }
  };

  // Sound triggers on phase change
  useEffect(() => {
    if (!isOpen || !isPlaying || isCompleted) return;
    
    // Play sound right at the beginning of each phase
    if (cycleTick === 0) {
      // Inhale
      playSomaticChime(523.25, "sine", 0.8); // High C
    } else if (cycleTick === 4) {
      // Hold
      playSomaticChime(659.25, "triangle", 0.6); // E5
    } else if (cycleTick === 6) {
      // Exhale
      playSomaticChime(440.00, "sine", 0.8); // A4
    }
  }, [cycleTick, isOpen, isPlaying, isCompleted, soundEnabled]);

  // Main countdown timer effect
  useEffect(() => {
    if (!isOpen || !isPlaying || isCompleted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          // Play complete long elegant bell chime
          playSomaticChime(523.25, "sine", 1.8);
          setTimeout(() => {
            playSomaticChime(659.25, "sine", 1.2);
          }, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, isCompleted]);

  // Reset function
  const handleReset = () => {
    setTimeLeft(30);
    setIsCompleted(false);
    setIsPlaying(true);
    playSomaticChime(523.25, "sine", 0.6);
  };

  // Retrieve contextual gentle helper sentence
  const getSomaticCaption = () => {
    if (isCompleted) {
      return "You have returned. Feel the expansion in your chest.";
    }

    if (timeLeft > 26) return "Let's begin. Relax your jaw, release the teeth spacing.";
    if (timeLeft > 24) return "Pause. Feel the abundance of air.";
    if (timeLeft > 20) return "Sigh it out. Let the weight fall.";
    if (timeLeft > 16) return "Deep breath. Notice the warmth entering your lungs.";
    if (timeLeft > 14) return "Hold inside. Ground your posture, drop your shoulders.";
    if (timeLeft > 10) return "Exhale completely, sinking deeper into safety.";
    if (timeLeft > 6) return "Final deep cycle. Draw in new energy and presence.";
    if (timeLeft > 4) return "Hold. Enjoy the brief suspension of time.";
    return "Letting go. Trusting the earth beneath to carry you.";
  };

  const getPhaseName = () => {
    if (isCompleted) return "Arrived";
    if (currentPhase === "inhale") return "Breathe In";
    if (currentPhase === "hold") return "Hold & Feel";
    return "Exhale Slowly";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-sage-955/90 backdrop-blur-xl"
        >
          {/* Main Card Frame */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-[#FAF6F0] w-full max-w-2xl rounded-3xl overflow-hidden border border-sage-200/50 shadow-2xl relative p-6 md:p-12 text-center"
          >
            {/* Top Close bar */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-full hover:bg-sage-100 text-sage-600 transition-colors cursor-pointer"
                title={soundEnabled ? "Mute sound cues" : "Unmute sound cues"}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-sage-100 text-sage-800 transition-colors cursor-pointer"
                aria-label="Close Grounding Space"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content block */}
            <div className="flex flex-col items-center justify-between min-h-[420px] pt-4">
              
              {/* Decorative badge header */}
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs font-accent tracking-[0.25em] font-bold text-gold-700 bg-gold-100/60 px-3 py-1 rounded-full uppercase">
                  Grounding Moment
                </span>
                <p className="text-xs text-sage-500 font-sans font-light mt-1">
                  Introduce your nervous system to presence
                </p>
              </div>

              {!isCompleted ? (
                /* 1. RUNNING PACER SCREEN */
                <div className="my-8 flex flex-col items-center justify-center relative w-full h-56">
                  
                  {/* Glowing, expanding visual circle indicators */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    
                    {/* Ring 3 (Outer guide boundary) */}
                    <div className="w-48 h-48 rounded-full border border-sage-200/50 absolute scale-110 opacity-30 pointer-events-none" />

                    {/* Ring 2 (Interactive breathing expander) */}
                    <motion.div
                      animate={{
                        scale: currentPhase === "inhale" ? [1, 1.45] : currentPhase === "hold" ? 1.45 : [1.45, 1],
                        borderColor: currentPhase === "inhale" ? "rgba(101, 131, 101, 0.4)" : currentPhase === "hold" ? "rgba(182, 147, 85, 0.5)" : "rgba(101, 131, 101, 0.2)",
                        backgroundColor: currentPhase === "inhale" ? "rgba(233, 239, 233, 0.5)" : currentPhase === "hold" ? "rgba(250, 246, 240, 0.8)" : "rgba(242, 235, 226, 0.4)",
                      }}
                      transition={{
                        duration: currentPhase === "inhale" ? 4 : currentPhase === "hold" ? 2 : 4,
                        ease: "easeInOut",
                        repeat: 0
                      }}
                      className="w-36 h-36 rounded-full border-2 absolute opacity-80 pointer-events-none shadow-5xs"
                    />

                    {/* Innermost static anchor node */}
                    <motion.div
                      animate={{
                        scale: currentPhase === "hold" ? [1.0, 1.05, 1.0] : 1.0
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 rounded-full bg-sage-800 flex items-center justify-center text-white relative z-10 shadow-xs"
                    >
                      <Wind className="w-5 h-5 text-gold-300 animate-pulse" />
                    </motion.div>

                  </div>

                  {/* Breathing state readout */}
                  <div className="absolute bottom-2 inset-x-0 space-y-1 z-20">
                    <motion.h4
                      key={currentPhase}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-serif text-lg md:text-xl font-medium text-sage-955 capitalize"
                    >
                      {getPhaseName()}
                    </motion.h4>
                    
                    {/* Animated visual cycle bar */}
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: 3 }).map((_, stepIdx) => {
                        const cycleNum = Math.floor(elapsed / 10);
                        const isPast = stepIdx < cycleNum;
                        const isCurrent = stepIdx === cycleNum;
                        return (
                          <div
                            key={stepIdx}
                            className={`h-1 rounded-full transition-all duration-500 ${
                              isPast ? "w-6 bg-sage-700" : isCurrent ? "w-10 bg-gold-550" : "w-3 bg-sage-200"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                /* 2. COMPLETION CELEBRATION SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-8 flex flex-col items-center justify-center space-y-6 max-w-sm mx-auto"
                >
                  <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center text-[#658365] border border-sage-200 shadow-sm">
                    <Check className="w-10 h-10 stroke-[2]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-sage-955">
                      Grounding Complete
                    </h3>
                    <p className="text-xs text-sage-700 font-light leading-relaxed">
                      You completed 3 conscious breath cycles with Flo. How does your body feel right now? Notice any tension that softened.
                    </p>
                  </div>

                  {/* Somatic feedback tags */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="text-[10px] font-accent bg-sage-50 text-sage-800 border border-sage-200 px-3 py-1 rounded-full">🌿 Lighter chest</span>
                    <span className="text-[10px] font-accent bg-sage-50 text-sage-800 border border-sage-200 px-3 py-1 rounded-full">🧘 Lower shoulders</span>
                    <span className="text-[10px] font-accent bg-sage-50 text-sage-800 border border-sage-200 px-3 py-1 rounded-full">✨ Calmer mind</span>
                  </div>
                </motion.div>
              )}

              {/* captions and time reads */}
              <div className="space-y-1 w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={timeLeft}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs md:text-sm font-sans font-light text-sage-800 inline-block px-4 italic"
                  >
                    "{getSomaticCaption()}"
                  </motion.p>
                </AnimatePresence>

                {!isCompleted && (
                  <div className="pt-2 text-xs font-mono text-sage-500 font-semibold uppercase tracking-widest">
                    <span>{timeLeft}s remaining</span>
                  </div>
                )}
              </div>

              {/* Progress Bar indicator */}
              {!isCompleted && (
                <div className="w-full bg-sage-200/40 h-1 rounded-full overflow-hidden mt-6 mb-2">
                  <motion.div
                    animate={{ width: `${(timeLeft / 30) * 100}%` }}
                    className="h-full bg-gold-500"
                    transition={{ ease: "linear" }}
                  />
                </div>
              )}

              {/* Action row */}
              <div className="pt-6 w-full flex flex-wrap items-center justify-center gap-3 border-t border-sage-200/50">
                {!isCompleted ? (
                  <>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="py-2.5 px-6 rounded-full border border-sage-300 hover:border-sage-500 text-xs font-accent font-semibold tracking-wider flex items-center gap-1.5 transition-all text-sage-800 cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" /> Play
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      className="py-2.5 px-5 rounded-full hover:bg-sage-100 text-xs font-accent font-semibold tracking-wider flex items-center gap-1.5 transition-all text-sage-700 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Restart
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleReset}
                      className="py-3 px-6 rounded-full border border-sage-300 hover:bg-sage-50 text-xs font-accent font-semibold tracking-wider flex items-center gap-1.5 transition-all text-sage-800 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Practice Again
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="py-3 px-7 rounded-full bg-sage-800 hover:bg-sage-900 border border-transparent text-cream-50 text-xs font-accent font-semibold tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      Deepen via 60-Min Rest
                      <Calendar className="w-4 h-4 text-gold-300" />
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
