import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-himalayas.jpg';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-8 pt-12 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Content */}
      <div className="lg:col-span-5 animate-soft-up">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[0.9] mb-8">
          Explore the beauty of{' '}
          <span className="italic text-primary">India.</span>
        </h1>
        <p className="max-w-[40ch] text-lg text-muted-foreground mb-10 leading-relaxed">
          Customized journeys to Himachal, Shimla, Haridwar, Manali & beyond. Your dream vacation starts here with Kavika Travels.
        </p>
        <div className="relative">
          <span className="absolute -top-10 left-2 font-hand text-2xl text-secondary -rotate-6">
            adventure awaits...
          </span>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/destination')}
              className="inline-block px-10 py-4 border-2 border-foreground rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-all"
            >
              Explore Destinations
            </button>
            <a
              href="tel:+919355580007"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold uppercase tracking-widest text-xs hover:scale-105 transition-transform text-center"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="lg:col-span-7 animate-soft-up" style={{ animationDelay: '200ms' }}>
        <div className="relative">
          <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl">
            <img
              src={heroImg}
              alt="Misty peaks of the Indian Himalayas at golden hour"
              width={1200}
              height={1504}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 md:-left-8 bg-card p-6 rounded-2xl shadow-xl max-w-[280px] ring-1 ring-black/5">
            <p className="font-display italic text-xl mb-2">Kavika Journeys</p>
            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">
              Customized Trips · Personal Guide · Best Stays
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
