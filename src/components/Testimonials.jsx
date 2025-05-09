import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div
      ref={ref}
      className="bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-16 lg:px-32 text-gray-800"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.h2
          className="text-5xl font-extrabold text-center text-blue-700"
          variants={sectionVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-lg text-center text-gray-600 leading-relaxed"
          variants={sectionVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          At <span className="font-semibold text-blue-600">WanderWorld Travels</span>, our mission is to turn your travel dreams into reality. Since 2015, we’ve been curating authentic travel experiences across the globe, ensuring every moment is unforgettable.
        </motion.p>

        <motion.div
          className="space-y-4"
          variants={sectionVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h3 className="text-2xl font-semibold text-blue-700">Our Story</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            WanderWorld was founded by explorers who believe travel is more than just sightseeing—it’s about connection, culture, and discovery. From humble beginnings to becoming a global travel partner, our journey has been incredible.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={sectionVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h3 className="text-2xl font-semibold text-blue-700">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
            <li>🌍 Carefully crafted tours in over 50 countries</li>
            <li>🧭 Friendly local guides for immersive experiences</li>
            <li>🛡️ End-to-end travel planning with 24/7 support</li>
            <li>💬 Loved by 10,000+ travelers (4.9/5 avg. rating)</li>
          </ul>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={sectionVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h3 className="text-2xl font-semibold text-blue-700">Join Our Community</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Whether you're traveling solo or with loved ones, WanderWorld is here to ensure your journey is smooth, safe, and spectacular. Start your adventure with us today!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
