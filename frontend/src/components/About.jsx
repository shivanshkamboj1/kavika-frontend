import React from 'react';
import { Helmet } from 'react-helmet';
import Logo from '/images/image1.png';

const AboutUs = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Kavika Travels",
    "image": "https://www.kavikatravels.in/images/image1.png",
    "url": "https://www.kavikatravels.in/about",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot Number - C6783, Near Deep Chand Bandhu Hospital, Ashok Vihar",
      "addressLocality": "Delhi",
      "postalCode": "110052",
      "addressCountry": "IN"
    },
    "telephone": "+91-9355580007",
    "openingHours": "Mo-Su 09:00-21:00",
    "sameAs": [
      "https://www.facebook.com/KavikaTravels",
      "https://www.instagram.com/KavikaTravels"
    ]
  };

  return (
    <>
      {/* SEO meta tags */}
      <Helmet>
        {/* <title>About Us | Kavika Travels</title> */}
        <meta
          name="description"
          content="Discover Kavika Travels — a trusted tour and travel agency specializing in Karnal, Kurukshetra, Radaur, Indri, Ladwa & nearby cities. Book customized trips to Himachal, Chandigarh & Shimla with KavikaTravels."
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Main Content */}
      <section className="bg-[#0e1a2b] py-20 px-6 md:px-20 lg:px-32 text-white min-h-screen">
        <div className="max-w-5xl mx-auto bg-[#132135] border border-[#ffb84c]/40 rounded-2xl p-10 shadow-2xl space-y-16">

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold text-center text-[#ffb84c] drop-shadow-md">
            About Us
          </h1>

          {/* Our Story */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#ffb84c]">Our Story</h2>
            <p className="text-lg leading-relaxed text-white/90">
              Kavika Travels was founded by explorers who believe travel is more than just sightseeing — it’s about connection, culture, and discovery. From humble beginnings to becoming a trusted travel partner across North India, our journey has been incredible.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#ffb84c]">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-3 text-white/90 marker:text-[#ffb84c] text-lg pl-2">
              <li>🌍 Curated tours in over 50 incredible destinations including Shimla, Chandigarh, Kurukshetra, Karnal, and more</li>
              <li>🧭 Friendly local guides for authentic, immersive experiences</li>
              <li>🛡️ End-to-end travel planning with 24/7 support and flexible options</li>
              <li>💬 Loved by 10,000+ travelers — 4.9/5 average rating on Google</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="pt-10 border-t border-[#ffb84c]/40 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3 text-xl text-white/90">
              <p><span className="font-semibold text-[#ffb84c]">Contact:</span> Prince</p>
              <p><span className="font-semibold text-[#ffb84c]">Address:</span> Plot Number - C6783, Near Deep Chand Bandhu Hospital, Ashok Vihar, Delhi 110052</p>
              <p><span className="font-semibold text-[#ffb84c]">Mobile:</span> <a href="tel:+919355580007" className="hover:underline">+91 9355580007</a></p>
              <p><span className="font-semibold text-[#ffb84c]">Available:</span> All days, 9 AM – 9 PM</p>
              <p className=' opacity-0'>
                <a href="/destination" className="text-[#ffb84c] underline">Browse Destinations</a> |{" "}
                <a href="/contact" className="text-[#ffb84c] underline">Contact Us</a>
              </p>
            </div>
            <img
              src={Logo}
              alt="Kavika Travels company logo"
              className="h-28 w-auto drop-shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
