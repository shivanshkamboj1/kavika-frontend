import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.jpeg';

/**
 * Splash screen — starts immediately, no image-load gating.
 * enter (0-1s) → zoom (1-2.4s) → done (fade out 0.35s)
 * Total: ~2.7s
 */
const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('zoom'), 1000);
    const t2 = setTimeout(() => {
      setPhase('done');
      onCompleteRef.current?.();
    }, 2400);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Radial glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320, height: 320,
              background: 'radial-gradient(circle, oklch(0.58 0.16 38 / 0.2) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              phase === 'enter'
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 3 }
            }
            transition={{ duration: phase === 'enter' ? 0.8 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Logo — eager loaded, no onLoad gating */}
          <motion.img
            src={Logo}
            alt="Kavika Travels"
            className="relative rounded-3xl"
            style={{ willChange: 'transform, opacity' }}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={
              phase === 'enter'
                ? { opacity: 1, scale: 1, rotate: 0 }
                : { opacity: 0, scale: 8, rotate: 1 }
            }
            transition={
              phase === 'enter'
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
            }
            width={192}
            height={192}
          />

          {/* Decorative rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: 180 + i * 60, height: 180 + i * 60,
                borderColor: 'oklch(0.58 0.16 38 / 0.12)',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                phase === 'enter'
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 2.5 }
              }
              transition={{
                duration: phase === 'enter' ? 1 : 1.1,
                delay: phase === 'enter' ? 0.1 + i * 0.08 : 0,
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
