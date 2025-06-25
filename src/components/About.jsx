import React from 'react';
import Logo from '/images/image1.png';

const AboutUs = () => {
  return (
    <section className="bg-[#0e1a2b] py-16 px-6 md:px-16 lg:px-32 text-white min-h-screen">
      <div className="max-w-5xl mx-auto bg-[#132135] border border-[#ffb84c]/40 rounded-2xl p-10 shadow-2xl space-y-12">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-center text-[#ffb84c] mb-8 tracking-wide drop-shadow-md">
          About Us
        </h2>

        {/* Our Story */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#ffb84c]">Our Story</h3>
          <p className="text-base leading-relaxed text-white/90">
            Kavika Travels was founded by explorers who believe travel is more than just sightseeing—it’s about connection, culture, and discovery. From humble beginnings to becoming a global travel partner, our journey has been incredible.
          </p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-8 border-t border-[#ffb84c]/40 pt-8">
          <div className="text-left space-y-2 text-xl text-white/90">
            <p><span className="font-semibold text-[#ffb84c]">Name:</span> Prince</p>
            <p><span className="font-semibold text-[#ffb84c]">Address:</span> VPO Karnal</p>
            <p><span className="font-semibold text-[#ffb84c]">Mobile:</span> 8708606666</p>
            <p><span className="font-semibold text-[#ffb84c]">Available:</span> All days, 9 AM – 9 PM</p>
          </div>
          <img src={Logo} alt="Kavika Travels Logo" className="h-28 w-auto drop-shadow-xl" />
        </div>

        {/* Why Choose Us */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-[#ffb84c]">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2 text-white/90 marker:text-[#ffb84c]">
            <li>🌍 Carefully crafted tours in over 50 countries</li>
            <li>🧭 Friendly local guides for immersive experiences</li>
            <li>🛡️ End-to-end travel planning with 24/7 support</li>
            <li>💬 Loved by 10,000+ travelers (4.9/5 avg. rating)</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
