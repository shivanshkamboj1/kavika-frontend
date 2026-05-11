import React from 'react';
import G1 from '../assets/a1.png';
import G2 from '../assets/a2.png';
import G3 from '../assets/a3.png';

const steps = [
  { id: 1, image: G1, text: 'Choose Your Favourite Destination' },
  { id: 2, image: G2, text: 'Call Us at Our Number' },
  { id: 3, image: G3, text: 'Get Ready for Your Journey' },
];

const Bookus = () => {
  return (
    <div className="px-6 md:px-8 py-12 max-w-7xl mx-auto">
      <section className="relative overflow-hidden bg-ink rounded-3xl px-6 py-20 shadow-2xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-16 relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-saffron mb-4">Simple Process</p>
          <h2 className="text-4xl sm:text-5xl font-display text-cream tracking-tight">
            Book Your Trip in <span className="italic text-primary">3 Steps</span>
          </h2>
        </div>

        <div className="relative z-10 grid gap-10 sm:grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto px-4">
          {steps.map(({ id, image, text }) => (
            <div
              key={id}
              className="relative flex flex-col items-center text-center p-10 rounded-2xl bg-cream/5 backdrop-blur-md border border-cream/10 transform transition-all duration-500 hover:-translate-y-3 hover:bg-cream/10 group"
            >
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                {id}
              </div>
              <img src={image} alt={text} className="w-24 h-24 mb-8 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl" />
              <p className="text-lg font-display italic text-cream tracking-wide">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Bookus;
