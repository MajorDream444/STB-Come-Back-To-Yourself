import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Wind, CloudRain, HelpCircle, Sliders, Waves, HeartHandshake } from "lucide-react";

type SoundscapeType = "wind" | "rain" | "breath_pulse";

export function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState<SoundscapeType>("wind");
  const [volume, setVolume] = useState(0.25); // muted default concept: started paused, and volume is a soft subtle level
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Audio Context and Node references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainVolumeRef = useRef<GainNode | null>(null);
  const sourceRefs = useRef<AudioBufferSourceNode[]>([]);
  const intervalRefs = useRef<number[]>([]);
  const gainRefs = useRef<{ [key: string]: GainNode }>({});
  const oscillatorRefs = useRef<OscillatorNode[]>([]);

  // Cleanup helper
  const stopAllAudio = () => {
    sourceRefs.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {}
    });
    sourceRefs.current = [];

    oscillatorRefs.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorRefs.current = [];

    intervalRefs.current.forEach(id => clearInterval(id));
    intervalRefs.current = [];

    const gainNodes = Object.values(gainRefs.current) as GainNode[];
    gainNodes.forEach(gainNode => {
      try {
        gainNode.disconnect();
      } catch (e) {}
    });
    gainRefs.current = {};
  };

  const initAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const mainVolume = ctx.createGain();
      mainVolume.connect(ctx.destination);
      mainVolumeRef.current = mainVolume;
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Noise Buffer creation (White noise helper)
  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Generate white noise with random samples
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  // 1. Play Golden Bali Wind (swelling bandpass pink/white noise)
  const playWind = (ctx: AudioContext, mainGain: GainNode) => {
    const buffer = createNoiseBuffer(ctx);
    const sourceNode = ctx.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = true;

    // Filter to shape wind sound
    const filterNode = ctx.createBiquadFilter();
    filterNode.type = "bandpass";
    filterNode.Q.value = 2.5;
    filterNode.frequency.value = 450;

    // Node gain for swell modulation
    const swellGain = ctx.createGain();
    swellGain.gain.value = 0.15;

    // Link
    sourceNode.connect(filterNode);
    filterNode.connect(swellGain);
    swellGain.connect(mainGain);

    sourceNode.start(0);
    sourceRefs.current.push(sourceNode);

    // Breathe modulating wind swell
    let time = 0;
    const swellInterval = setInterval(() => {
      if (ctx.state === "closed") return;
      time += 0.05;
      // Synthesize deep slow inhalation/exhalation wave pattern
      const frequencyMod = 350 + Math.sin(time * 0.3) * 150 + Math.cos(time * 0.08) * 80;
      const gainMod = 0.08 + (Math.sin(time * 0.3) * 0.06);

      try {
        filterNode.frequency.setValueAtTime(frequencyMod, ctx.currentTime);
        swellGain.gain.setValueAtTime(gainMod, ctx.currentTime);
      } catch (e) {}
    }, 50);

    intervalRefs.current.push(swellInterval as any);
  };

  // 2. Play Tropical Forest Rain (High-pass crackle + occasional water drips)
  const playRain = (ctx: AudioContext, mainGain: GainNode) => {
    // Generate rain base static hum
    const buffer = createNoiseBuffer(ctx);
    const sourceNode = ctx.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = true;

    const filterNode = ctx.createBiquadFilter();
    filterNode.type = "highpass";
    filterNode.frequency.value = 1400; // Bright crispy crackle

    const rainBaseGain = ctx.createGain();
    rainBaseGain.gain.value = 0.06;

    sourceNode.connect(filterNode);
    filterNode.connect(rainBaseGain);
    rainBaseGain.connect(mainGain);

    sourceNode.start(0);
    sourceRefs.current.push(sourceNode);

    // Discrete raindrops generation (high high frequency pings with short decay)
    const dripInterval = setInterval(() => {
      if (ctx.state === "closed" || Math.random() > 0.75) return;

      const dripOsc = ctx.createOscillator();
      const dripGain = ctx.createGain();

      dripOsc.type = "sine";
      // Natural randomness in chime-drips
      const randomPitch = 1200 + Math.random() * 800;
      dripOsc.frequency.setValueAtTime(randomPitch, ctx.currentTime);
      // Exponential frequency drop to feel like a droplet splashing
      dripOsc.frequency.exponentialRampToValueAtTime(randomPitch * 0.4, ctx.currentTime + 0.08);

      dripGain.gain.setValueAtTime(0.0, ctx.currentTime);
      dripGain.gain.linearRampToValueAtTime(0.008 + Math.random() * 0.012, ctx.currentTime + 0.01);
      dripGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      dripOsc.connect(dripGain);
      dripGain.connect(mainGain);

      try {
        dripOsc.start();
        dripOsc.stop(ctx.currentTime + 0.15);
      } catch (e) {}
    }, 180);

    intervalRefs.current.push(dripInterval as any);
  };

  // 3. Play Restorative Breath Pulse (Harmonious double-sine wave with slower breathing rise/fall)
  const playBreathPulse = (ctx: AudioContext, mainGain: GainNode) => {
    // Low frequency ocean breath pad
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const pulseGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.value = 110; // Root note A2

    osc2.type = "sine";
    osc2.frequency.value = 165; // Fifth interval E3

    pulseGain.gain.value = 0.08;

    osc1.connect(pulseGain);
    osc2.connect(pulseGain);
    pulseGain.connect(mainGain);

    try {
      osc1.start(0);
      osc2.start(0);
      oscillatorRefs.current.push(osc1, osc2);
    } catch (e) {}

    // Modulate volume slow resonance cycle: 8 second breath (4s inhale / 4s exhale)
    let time = 0;
    const pulseInterval = setInterval(() => {
      if (ctx.state === "closed") return;
      time += 0.1;
      
      // Calculate smooth sine wave normalized [0, 1] for breathing visual aid
      const breathState = (Math.sin(time * 0.25) + 1) / 2; // ~25s for nice, long respiratory loop
      const computedGain = 0.02 + breathState * 0.12;

      try {
        pulseGain.gain.setValueAtTime(computedGain, ctx.currentTime);
      } catch (e) {}
    }, 100);

    intervalRefs.current.push(pulseInterval as any);
  };

  // Start active soundscape selection
  const startAudio = () => {
    initAudioContext();
    const ctx = audioCtxRef.current;
    const mainGain = mainVolumeRef.current;
    if (!ctx || !mainGain) return;

    stopAllAudio();

    // Set master volume using state parameters
    const targetVolume = isMuted ? 0 : volume * 0.35; // Cap slightly to make sure it's soft and subtle
    mainGain.gain.setValueAtTime(targetVolume, ctx.currentTime);

    if (soundType === "wind") {
      playWind(ctx, mainGain);
    } else if (soundType === "rain") {
      playRain(ctx, mainGain);
    } else if (soundType === "breath_pulse") {
      playBreathPulse(ctx, mainGain);
    }
  };

  // Trigger state bindings of visual indicators
  useEffect(() => {
    if (isPlaying) {
      startAudio();
    } else {
      stopAllAudio();
    }
    
    // Clean up when component unmounts
    return () => {
      stopAllAudio();
    };
  }, [isPlaying, soundType]);

  // Adjust Volume in active context
  useEffect(() => {
    if (mainVolumeRef.current && audioCtxRef.current) {
      const targetVolume = isMuted ? 0 : volume * 0.35; // Maximum 35% safe soft gain
      mainVolumeRef.current.gain.setValueAtTime(targetVolume, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Handle mute toggle
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-24 left-6 z-40">
      <div className="relative flex flex-col items-start gap-2">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-gold-300/30 p-4 shadow-xl max-w-xs w-64 text-left border-l-4 border-l-gold-500"
            >
              <div className="flex items-center justify-between pb-2 border-b border-sage-100 mb-3">
                <div className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-sage-600" />
                  <span className="text-[10px] font-accent uppercase tracking-widest font-bold text-sage-800">
                    Sanctuary Audio
                  </span>
                </div>
                <span className="text-[9px] font-accent text-gold-600 bg-gold-100/60 px-2 py-0.5 rounded-full uppercase">
                  Muted on load
                </span>
              </div>

              <p className="text-[10px] text-sage-600 mb-3 leading-relaxed font-sans font-light">
                Enhance your experience with procedural, organic ambient soundscapes calibrated for somatic down-regulation.
              </p>

              {/* Selector Tabs */}
              <div className="space-y-1.5 mb-4">
                <button
                  onClick={() => { setSoundType("wind"); setIsPlaying(true); }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                    soundType === "wind" && isPlaying
                      ? "bg-sage-100 border border-sage-200 text-sage-950 font-medium"
                      : "hover:bg-sage-50 text-sage-700 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Wind className="w-3.5 h-3.5 text-[#5e7d5e]" />
                    <span>Bali Palm Wind</span>
                  </span>
                  <span className="text-[8px] font-mono text-sage-400">450Hz</span>
                </button>

                <button
                  onClick={() => { setSoundType("rain"); setIsPlaying(true); }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                    soundType === "rain" && isPlaying
                      ? "bg-sage-100 border border-sage-200 text-sage-950 font-medium"
                      : "hover:bg-sage-50 text-sage-700 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <CloudRain className="w-3.5 h-3.5 text-sage-600" />
                    <span>Tropical Forest Rain</span>
                  </span>
                  <span className="text-[8px] font-mono text-sage-400">1.4kHz</span>
                </button>

                <button
                  onClick={() => { setSoundType("breath_pulse"); setIsPlaying(true); }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                    soundType === "breath_pulse" && isPlaying
                      ? "bg-sage-100 border border-sage-200 text-sage-950 font-medium"
                      : "hover:bg-sage-50 text-sage-700 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Waves className="w-3.5 h-3.5 text-gold-600" />
                    <span>Slow Resonant Exhale</span>
                  </span>
                  <span className="text-[8px] font-mono text-sage-400">110Hz</span>
                </button>
              </div>

              {/* Volume and Play Controller */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 bg-sage-50/50 p-2 rounded-xl">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:bg-sage-100 rounded-lg text-sage-700 transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-red-500" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-sage-600" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (isMuted) setIsMuted(false);
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className="w-full accent-sage-800 h-1 bg-sage-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[9px] font-mono text-sage-500 min-w-[24px] text-right">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-[9px] text-sage-400 px-1 font-accent">
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="w-3 h-3 text-sage-500" /> Safe, low gain limit
                  </span>
                  <span>100% Procedural</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating circular activator button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`shadow-lg border h-11 px-4 rounded-full flex items-center justify-center gap-2 text-xs font-accent font-semibold tracking-wider transition-all cursor-pointer ${
              isPlaying && !isMuted
                ? "bg-sage-800 text-cream-50 border-sage-700"
                : "bg-white text-sage-800 border-sage-200/60 hover:bg-[#FAF6F0]"
            }`}
          >
            <motion.div
              animate={isPlaying && !isMuted ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="flex items-center"
            >
              {isPlaying && !isMuted ? (
                <Waves className="w-4 h-4 text-gold-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-sage-500" />
              )}
            </motion.div>
            <span>{isPlaying && !isMuted ? "Soundscape On" : "Ambient Sound"}</span>
          </motion.button>

          {/* Quick toggle mini audio play/pause controls */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-11 h-11 rounded-full shadow-lg border flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? "bg-gold-650 text-white border-gold-500"
                : "bg-white text-sage-700 border-sage-200 hover:bg-[#FAF6F0]"
            }`}
            title={isPlaying ? "Pause Soundscape" : "Play Soundscape"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-sage-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
