import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
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
      <section className="relative bg-slate-50 py-20 px-6 md:px-20 lg:px-32 text-slate-800 min-h-screen overflow-hidden">
        {/* Colorful Background Blobs */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-rose-300/30 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-sky-300/30 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="relative z-10 max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl p-10 sm:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-16"
        >

          {/* Main heading */}
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="text-4xl sm:text-6xl font-extrabold text-center text-slate-900 tracking-tight drop-shadow-sm"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Us</span>
          </motion.h1>

          {/* Our Story */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Kavika Travels was founded by explorers who believe travel is more than just sightseeing — it’s about connection, culture, and discovery. From humble beginnings to becoming a trusted travel partner across North India, our journey has been incredible.
            </p>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-10 h-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"></span> Why Choose Us?
            </h2>
            <ul className="list-none space-y-4 text-slate-600 text-lg">
              <li className="flex items-center gap-3"><span className="text-2xl">🌍</span> Curated tours in over 50 incredible destinations</li>
              <li className="flex items-center gap-3"><span className="text-2xl">🧭</span> Friendly local guides for authentic experiences</li>
              <li className="flex items-center gap-3"><span className="text-2xl">🛡️</span> End-to-end travel planning with 24/7 support</li>
              <li className="flex items-center gap-3"><span className="text-2xl">💬</span> Loved by 10,000+ travelers — 4.9/5 on Google</li>
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 text-lg text-slate-700">
              <p><span className="font-bold text-sky-600">Contact:</span> Prince</p>
              <p><span className="font-bold text-sky-600">Address:</span> Plot Number - C6783, Near Deep Chand Bandhu Hospital, Ashok Vihar, Delhi 110052</p>
              <p><span className="font-bold text-sky-600">Mobile:</span> <a href="tel:+919355580007" className="hover:text-orange-500 transition font-semibold">+91 9355580007</a></p>
              <p><span className="font-bold text-sky-600">Available:</span> All days, 9 AM – 9 PM</p>
              <p className='opacity-0'>
                <a href="/destination" className="text-sky-600 underline">Browse Destinations</a> |{" "}
                <a href="/contact" className="text-sky-600 underline">Contact Us</a>
              </p>
            </div>
            <img
              src={Logo}
              alt="Kavika Travels company logo"
              className="h-28 w-auto drop-shadow-xl"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutUs;
