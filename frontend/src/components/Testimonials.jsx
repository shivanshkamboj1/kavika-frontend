import React from 'react';

const testimonials = [
  { name: "Anuj kamboj", feedback: "This travel experience was life-changing. The service was exceptional!", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Vishal", feedback: "Absolutely loved the destination and the smooth planning. Highly recommended!", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Narendar kumar", feedback: "One of the best trips I've ever taken. Everything was well-organized.", image: "https://randomuser.me/api/portraits/men/54.jpg" },
];

const Testimonial = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-r from-sky-200/50 to-orange-200/50 rounded-full blur-[150px] -z-10 mix-blend-multiply pointer-events-none"></div>

      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-slate-900 tracking-tight mb-20 drop-shadow-sm">
        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Customers Say</span>
      </h2>

      {/* Testimonials Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 text-center transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative mt-10 group"
          >
            {/* User image */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-orange-400 to-rose-500 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold mb-3 text-slate-900 mt-6">
              {item.name}
            </h3>

            {/* Feedback */}
            <p className="text-slate-600 italic font-medium">&ldquo;{item.feedback}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
