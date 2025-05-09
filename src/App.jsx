import { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Destinations from './components/Destinations';
import About from './components/About';
import { AnimatePresence, motion } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css';


function App() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 },
  };

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/destination"
            element={
              <motion.div {...pageTransition}>
                <Destinations />
              </motion.div>
            }
          />
          <Route
            path="/destinations/:id"
            element={
              <motion.div {...pageTransition}>
                <Destinations />
              </motion.div>
            }
          />

          <Route
            path="/about"
            element={
              <motion.div {...pageTransition}>
                <About />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
