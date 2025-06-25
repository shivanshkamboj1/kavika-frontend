import React from 'react';
import G1 from '../assets/Group-7.png';
import G2 from '../assets/Group-11.png';
import G3 from '../assets/Group-12.png';

const steps = [
  { id: 1, image: G1, text: 'Choose Your Favourite Destination' },
  { id: 2, image: G2, text: 'Call Us at This Number' },
  { id: 3, image: G3, text: 'Get Ready for Your Journey' },
];

const Bookus = () => {
  return (
    <section className="bg-[#0e1a2b] max-w-screen-xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#ffb84c]">
        Book Your Next Trip in 3 Easy Steps
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {steps.map(({ id, image, text }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-[#132135] border border-[#ffb84c]/20 transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(255,184,76,0.3)]"
          >
            <img src={image} alt={text} className="w-24 h-24 mb-6" />
            <p className="text-lg font-medium text-[#F2E9DC]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bookus;
