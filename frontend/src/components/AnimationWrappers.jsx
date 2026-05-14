import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';

/* ─────────────────────────────────────────────
   FadeIn — scroll-triggered reveal container
   direction: 'up' | 'down' | 'left' | 'right'
   ───────────────────────────────────────────── */
const directionOffset = { up: [40, 0], down: [-40, 0], left: [-60, 0], right: [60, 0] };

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
  amount = 0.15,
  ...rest
}) {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const [start] = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: start }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   TextReveal — word-by-word heading reveal
   ───────────────────────────────────────────── */
export function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04,
  once = true,
}) {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.4 }}
        style={{ display: 'inline' }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   StaggerContainer + StaggerItem
   ───────────────────────────────────────────── */
const staggerContainerVariants = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

const staggerItemVariants = (direction = 'up') => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const [start] = directionOffset[direction] || directionOffset.up;
  return {
    hidden: { opacity: 0, [axis]: start },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
};

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.1,
  delay = 0,
  once = true,
  amount = 0.1,
  ...rest
}) {
  return (
    <motion.div
      variants={staggerContainerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', direction = 'up', ...rest }) {
  return (
    <motion.div variants={staggerItemVariants(direction)} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ParallaxImage — subtle scroll parallax
   ───────────────────────────────────────────── */
export function ParallaxImage({ src, alt, className = '', speed = 0.15, ...imgProps }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ position: 'relative' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className="w-full h-full object-cover"
        {...imgProps}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CountUp — animated number counter
   ───────────────────────────────────────────── */
export function CountUp({ to, duration = 2, suffix = '', className = '' }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  React.useEffect(() => {
    if (isInView) {
      animate(motionValue, to, { duration });
    }
  }, [isInView, to, duration, motionValue]);

  React.useEffect(() => {
    const unsubscribe = springValue.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
