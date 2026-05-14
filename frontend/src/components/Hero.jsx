import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-himalayas.jpg';
import { FadeIn, TextReveal } from './AnimationWrappers';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-8 pt-12 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Content */}
      <div className="lg:col-span-5">
        <TextReveal
          as="h1"
          className="font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[0.9] mb-8"
          stagger={0.05}
        >
          Explore the beauty of India.
        </TextReveal>

        <FadeIn direction="up" delay={0.3}>
          <p className="max-w-[40ch] text-lg text-muted-foreground mb-10 leading-relaxed">
            Customized journeys to Himachal, Shimla, Haridwar, Manali & beyond. Your dream vacation starts here with Kavika Travels.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.45}>
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
              <button
                onClick={() => navigate('/contact')}
                className="inline-block px-10 py-4 bg-primary text-primary-foreground rounded-full font-semibold uppercase tracking-widest text-xs hover:scale-105 transition-transform text-center"
              >
                Book Now
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Right Image */}
      <FadeIn direction="right" delay={0.2} className="lg:col-span-7">
        <div className="relative">
          <img
            src={heroImg}
            alt="Misty peaks of the Indian Himalayas at golden hour"
            className="w-full aspect-[4/5] rounded-3xl ring-1 ring-black/5 shadow-2xl object-cover"
            width={1200}
            height={1504}
            fetchPriority="high"
            decoding="async"
          />
          <FadeIn direction="up" delay={0.6}>
            <div className="absolute -bottom-8 -left-4 md:-left-8 bg-card p-6 rounded-2xl shadow-xl max-w-[280px] ring-1 ring-black/5">
              <p className="font-display italic text-xl mb-2">Kavika Journeys</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">
                Customized Trips · Personal Guide · Best Stays
              </p>
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    </section>
  );
};

export default Hero;
