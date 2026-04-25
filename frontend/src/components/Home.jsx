import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Bookus from './Bookus';
import DestinationSlider from './DestinationSlider';
import Destinations from './Destinations';
import About from './About';
import Testimonial from './Testimonials';
import ResponsiveVideoPlayer from './ResponsiveVideo';

const Home = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/contents`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setContents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching contents:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-t-sky-500 border-sky-200 rounded-full animate-spin shadow-sm"></div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="overflow-x-hidden">
      {/* SEO META */}
      <Helmet>
        <title>
          Kavika Travels | Book Trips from Karnal, Kurukshetra, Radaur, Indri & Ladwa to Himachal, Chandigarh, Shimla, Haridwar, Manali
        </title>
        <meta
          name="description"
          content="KavikaTravels offers customized trips to Himachal, Chandigarh, Shimla, Haridwar & Manali. Serving Karnal, Kurukshetra, Radaur, Indri, Ladwa & nearby cities. Book your next tour with us!"
        />
        <meta
          name="keywords"
          content="KavikaTravels, Tour Packages, Karnal Travel, Kurukshetra Travel, Radaur Trips, Indri Tours, Ladwa Travel, Himachal, Shimla, Chandigarh, Haridwar, Manali"
        />
      </Helmet>

      <Hero />
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp}>
        <DestinationSlider contents={contents} loading={loading} />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
        <ResponsiveVideoPlayer />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
        <Bookus />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp}>
        <Destinations contents={contents} />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
        <About />
      </motion.div>
      
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
        <Testimonial />
      </motion.div>
    </div>
  );
};

export default Home;
