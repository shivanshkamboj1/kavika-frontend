import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current;
    // Only hide after scrolling down past 80px, show immediately on scroll up
    if (latest > 80 && diff > 5) setHidden(true);
    if (diff < -5) setHidden(false);
    lastY.current = latest;
  });

  const linkClass = ({ isActive }) =>
    `hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`;

  return (
    <>
      {/* ── Navbar bar ── */}
      <motion.nav
        className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold italic tracking-tight text-primary">Kavika</span>
            <span className="text-[10px] font-mono uppercase tracking-widest bg-accent/20 text-foreground px-1.5 py-0.5 rounded">Travels</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <NavLink to="/destination" className={linkClass}>Destinations</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            <a
              href="tel:+919355580007"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-transform active:scale-95 text-xs font-bold"
            >
              Call: +91 9355580007
            </a>
          </div>

          {/* Mobile CTA + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:+919355580007"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest"
            >
              Call Us
            </a>
            <button
              className="text-foreground p-2 hover:bg-muted rounded-full transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay (OUTSIDE nav to escape stacking context) ── */}
      <div
        className={`lg:hidden fixed inset-0 bg-ink/40 backdrop-blur-sm z-[9999] transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`bg-card w-4/5 max-w-sm h-full p-8 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-10">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <span className="font-display text-xl font-bold italic text-primary">Kavika</span>
              <span className="text-[9px] font-mono uppercase tracking-widest bg-accent/20 px-1.5 py-0.5 rounded">Travels</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted">
              <FaTimes size={22} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-1" onClick={() => setMenuOpen(false)}>
            {[
              { to: '/', label: 'Home' },
              { to: '/destination', label: 'Destinations' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    isActive ? 'text-primary bg-primary/5 font-bold' : 'text-foreground hover:text-primary hover:bg-muted/50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Drawer CTA */}
          <div className="mt-auto pt-8 border-t border-border">
            <a
              href="tel:+919355580007"
              className="flex items-center justify-center w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-full text-xs uppercase tracking-widest hover:bg-primary/90 transition"
            >
              Call Us: +91 9355580007
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
