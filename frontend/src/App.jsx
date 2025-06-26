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
  const [loading, setLoading] = useState(true);

  // show loader for 1 second
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 },
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0e1a2b]">
        {/* Attractive loader */}
        <div className="loader border-4 border-t-[#ffb84c] border-[#132135] rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

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
