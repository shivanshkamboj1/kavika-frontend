import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-sky-800 to-emerald-800 opacity-90 z-0"></div>
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-orange-400 font-bold tracking-widest uppercase text-sm sm:text-base mb-4 inline-block bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30"
        >
          Discover Your Next Adventure
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Explore The World <br/> With <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Kavika Travels</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl text-sky-100 mb-10 max-w-2xl drop-shadow-md font-medium"
        >
          Customized trips to Himachal, Chandigarh, Shimla, Haridwar, Manali, and beyond. Your dream vacation starts here.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={() => navigate('/destination')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
          >
            Explore Destinations
          </button>
          <a 
            href="tel:+919355580007"
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Call Us Now
          </a>
        </motion.div>
      </div>

      {/* Wave bottom separator */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[50px] sm:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,198.71,115.62,241.1,108.89,282.61,84.14,321.39,56.44Z" className="fill-slate-50"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
