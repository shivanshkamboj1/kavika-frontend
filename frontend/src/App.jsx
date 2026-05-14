import { useState, useEffect, useCallback } from 'react';
import './App.css';
import 'lenis/dist/lenis.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Destinations from './components/Destinations';
import Aboutus from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Admin from './components/Admin';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './scroll';
import FloatingButtons from './components/FloatingButtons';
import SmoothScroll from './components/SmoothScroll';
import SplashScreen from './components/SplashScreen';

function App() {
  const location = useLocation();

  // Play splash only once per browser session
  const alreadyPlayed = sessionStorage.getItem('kavika_splash_done') === '1';
  const [showSplash, setShowSplash] = useState(!alreadyPlayed);

  // Lock scroll while splash is active
  useEffect(() => {
    if (showSplash) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [showSplash]);

  // Stable callback — never changes, so SplashScreen timers won't reset
  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('kavika_splash_done', '1');
    setShowSplash(false);
  }, []);

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2, ease: "easeOut" },
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main app */}
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
        <SmoothScroll />
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
            <Route path="/destination" element={<motion.div {...pageTransition}><Destinations /></motion.div>} />
            <Route path="/destinations/:id" element={<motion.div {...pageTransition}><Destinations /></motion.div>} />
            <Route path="/about" element={<motion.div {...pageTransition}><Aboutus /></motion.div>} />
            <Route path="/contact" element={<motion.div {...pageTransition}><Contact /></motion.div>} />
            <Route path="/login" element={<motion.div {...pageTransition}><Login /></motion.div>} />
            <Route path="/admin" element={<motion.div {...pageTransition}><Admin /></motion.div>} />
            <Route path="*" element={<motion.div {...pageTransition}><Navigate to="/" replace /></motion.div>} />
          </Routes>
        </AnimatePresence>
        {!/^\/(login|admin)/.test(location.pathname) && <FloatingButtons />}
        <Footer />
      </div>
    </>
  );
}

export default App;
