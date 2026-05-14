import { useState, useEffect } from 'react';
import './App.css';
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

function App() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
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
  );
}

export default App;
