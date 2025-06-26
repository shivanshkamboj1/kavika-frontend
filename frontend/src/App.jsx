import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Destinations from './components/Destinations';
import Aboutus from './components/About';
import { AnimatePresence, motion } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css';
import ScrollToTop from './scroll';

function App() {
  const location = useLocation();


  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2,ease: "easeOut"  },
  };
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
          <Route path="/destination" element={<motion.div {...pageTransition}><Destinations /></motion.div>} />
          <Route path="/destinations/:id" element={<motion.div {...pageTransition}><Destinations /></motion.div>} />
          <Route path="/about" element={<motion.div {...pageTransition}><Aboutus /></motion.div>} />
          <Route path="*" element={<motion.div {...pageTransition}><Navigate to="/" replace /></motion.div>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
