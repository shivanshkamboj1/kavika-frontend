import React from 'react';

const testimonials = [
  { name: "Anuj kamboj", feedback: "This travel experience was life-changing. The service was exceptional!", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Vishal", feedback: "Absolutely loved the destination and the smooth planning. Highly recommended!", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Narendar kumar", feedback: "One of the best trips I've ever taken. Everything was well-organized.", image: "https://randomuser.me/api/portraits/men/54.jpg" },
];

const Testimonial = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0e1a2b] text-white">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center text-[#ffb84c] mb-12 drop-shadow-md">
        What Our Customers Say
      </h2>

      {/* Testimonials Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl p-6 rounded-xl shadow-2xl text-center transform hover:scale-105 transition border border-[#ffb84c]/20"
          >
            {/* User image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#ffb84c]"
            />

            {/* Name */}
            <h3 className="text-xl font-semibold mb-2 text-[#ffb84c]">
              {item.name}
            </h3>

            {/* Feedback */}
            <p className="text-white/90 italic">&ldquo;{item.feedback}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
