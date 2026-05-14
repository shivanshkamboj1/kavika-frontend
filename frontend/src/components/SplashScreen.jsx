import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.jpeg';

/**
 * Cinematic splash screen:
 * 0. Wait for Logo image to load
 * 1. Logo fades in with glow + subtle rotation  (0 → 1.2s)
 * 2. Camera zooms forward — logo scales up to fill screen  (1.2 → 2.8s)
 * 3. Screen whiteout / fade-out to reveal website  (2.8 → 3.5s)
 *
 * Plays only once per browser session via sessionStorage.
 */
const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading');   // 'loading' | 'enter' | 'zoom' | 'done'

  // Safety fallback: if image takes too long (e.g. slow 3G), start anyway after 1.5s
  useEffect(() => {
    if (phase === 'loading') {
      const fallback = setTimeout(() => setPhase('enter'), 1500);
      return () => clearTimeout(fallback);
    }
  }, [phase]);

  // Start animation sequence only AFTER phase changes to 'enter'
  useEffect(() => {
    if (phase !== 'enter') return;

    // Phase 1 → 2: start zoom after logo settles
    const t1 = setTimeout(() => setPhase('zoom'), 1200);
    // Phase 2 → 3: dismiss after zoom completes
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete?.(); // Unlock scrollbar immediately when fade starts
    }, 3000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Radial glow behind logo */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320,
              height: 320,
              background: 'radial-gradient(circle, oklch(0.58 0.16 38 / 0.2) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              phase === 'enter'
                ? { opacity: 1, scale: 1 }
                : phase === 'zoom' 
                ? { opacity: 0, scale: 3 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: phase === 'enter' ? 1 : 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Logo */}
          <motion.img
            src={Logo}
            alt="Kavika Travels"
            onLoad={() => {
              if (phase === 'loading') setPhase('enter');
            }}
            className="relative rounded-3xl"
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            animate={
              phase === 'enter'
                ? { opacity: 1, scale: 1, rotate: 0 }
                : phase === 'zoom'
                ? { opacity: 0, scale: 12, rotate: 2 }
                : { opacity: 0, scale: 0.7, rotate: -6 }
            }
            transition={
              phase === 'enter'
                ? { duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
                : { duration: 1.6, ease: [0.4, 0, 0.2, 1] }
            }
            // Responsive sizing
            width={192}
            height={192}
          />

          {/* Subtle particle rings (decorative) */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: 180 + i * 60,
                height: 180 + i * 60,
                borderColor: 'oklch(0.58 0.16 38 / 0.12)',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                phase === 'enter'
                  ? { opacity: 1, scale: 1 }
                  : phase === 'zoom'
                  ? { opacity: 0, scale: 2.5 }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={{
                duration: phase === 'enter' ? 1.2 : 1.4,
                delay: phase === 'enter' ? 0.2 + i * 0.1 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
