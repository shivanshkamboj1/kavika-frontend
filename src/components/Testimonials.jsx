import React from 'react';
import Logo from '/images/image1.png'; // adjust the path based on your project structure

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-16 lg:px-32 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-5xl font-extrabold text-center text-blue-700">
          About Us
        </h2>


        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-blue-700">Our Story</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Kavika Travels was founded by explorers who believe travel is more than just sightseeing—it’s about connection, culture, and discovery. From humble beginnings to becoming a global travel partner, our journey has been incredible.
          </p>
        </div>
                  <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-8 border-t pt-8">
          {/* Left: Contact Details */}
          <div className="text-left text-gray-700 space-y-2 text-2xl">
            <p><span className="font-semibold">Name:</span> Prince</p>
            <p><span className="font-semibold">Address:</span> VPO Karnal</p>
            <p><span className="font-semibold">Mobile:</span> 8708606666</p>
            <p><span className="font-semibold">Available:</span> All days, 9 AM – 9 PM</p>
          </div>

          {/* Right: Logo */}
          <div>
            <img src={Logo} alt="Kavika Travels Logo" className="h-24 w-auto" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-blue-700">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
            <li>🌍 Carefully crafted tours in over 50 countries</li>
            <li>🧭 Friendly local guides for immersive experiences</li>
            <li>🛡️ End-to-end travel planning with 24/7 support</li>
            <li>💬 Loved by 10,000+ travelers (4.9/5 avg. rating)</li>
          </ul>
        </div>

        {/* Contact & Logo Section */}

      </div>
    </div>
  );
};

export default AboutUs;
