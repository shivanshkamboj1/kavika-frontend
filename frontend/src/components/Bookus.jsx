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
    <div className="px-4 py-12 max-w-screen-xl mx-auto">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-900 rounded-[3rem] px-4 py-20 shadow-2xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-sky-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <h1 className="relative z-10 text-4xl sm:text-5xl font-extrabold text-center mb-16 text-white tracking-tight drop-shadow-lg">
          Book Your Next Trip in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">3 Easy Steps</span>
        </h1>

        <div className="relative z-10 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto px-4">
          {steps.map(({ id, image, text }) => (
            <div
              key={id}
              className="relative flex flex-col items-center text-center p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 transform transition-all duration-500 hover:-translate-y-3 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(14,165,233,0.3)] group"
            >
              <div className="absolute -top-6 -left-6 w-14 h-14 bg-gradient-to-br from-orange-400 to-rose-500 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-orange-500/30 rotate-12 group-hover:rotate-0 transition-all duration-300 border-2 border-white/30">
                {id}
              </div>
              <img src={image} alt={text} className="w-28 h-28 mb-8 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl" />
              <p className="text-xl font-bold text-white tracking-wide">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Bookus;
