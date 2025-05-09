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
    <section className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-700">
        Book Your Next Trip in 3 Easy Steps
      </h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {steps.map(({ id, image, text }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center p-6 rounded-lg bg-white transition-transform duration-300 transform hover:scale-115"
            style={{
              boxShadow: '0 4px 20px bg-yellow',
            }}
          >
            <img src={image} alt={text} className="w-24 h-24 mb-6" />
            <p className="text-lg font-medium text-gray-700">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bookus;
