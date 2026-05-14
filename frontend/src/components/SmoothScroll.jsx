import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initializes Lenis smooth scrolling on desktop only.
 * Mobile/touch devices use native scrolling which is already buttery smooth.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Skip Lenis on touch devices — native scroll is better on mobile
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}
