import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Destinations = ({ contents: passedContents }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const [contents, setContents] = useState(passedContents || []);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(!passedContents); 

  useEffect(() => {
    if (passedContents) return;
    fetch(`${apiUrl}/contents`)
      .then(res => res.json())
      .then(data => {
        setContents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiUrl, passedContents]);

  const fadeVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-sky-500 text-xl animate-pulse font-medium">Loading contents…</div>
      </div>
    );
  }

  if (id) {
    const dest = contents.find((c) => c._id === id);
    if (!dest) {
      return (
        <div className="text-center py-20 text-xl text-slate-600 min-h-screen bg-slate-50">
          Destination not found
        </div>
      );
    }

    return (
      <>
        <Helmet>
          <title>{`${dest.name} | KavikaTravels — Book Trips from Karnal, Kurukshetra & Ladwa`}</title>
          <meta
            name="description"
            content={`Discover ${dest.name} with KavikaTravels. Book affordable and customized trips from Karnal, Kurukshetra, Radaur, Indri, Ladwa, Haridwar & Manali.`}
          />
          <link rel="canonical" href={`https://www.kavikatravels.in/destinations/${dest._id}`} />
        </Helmet>

        <motion.div {...fadeVariant} className="bg-slate-50 min-h-screen pb-16">
          {/* Stunning Mini-Hero for Destination */}
          <div className="relative w-full py-24 sm:py-32 bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-sky-900/90 to-emerald-900/90 z-0"></div>
            {/* Animated Blobs */}
            <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-pink-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-sky-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse delay-700"></div>

            <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate('/destination')}
                className="mb-8 inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full shadow-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                ← Back to Destinations
              </motion.button>

              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl"
              >
                {dest.name}
              </motion.h1>
            </div>
            
            {/* Wave Separator */}
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
              <svg className="relative block w-full h-[40px] sm:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,198.71,115.62,241.1,108.89,282.61,84.14,321.39,56.44Z" className="fill-slate-50"></path>
              </svg>
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-4 py-12">

          {/* Packages */}
          {dest.packages && dest.packages.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl mb-12 border border-gray-100 shadow-xl shadow-sky-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -z-10"></div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Available <span className="text-orange-500">Packages</span></h2>
              <ul className="flex flex-wrap gap-4">
                {dest.packages.map((pkg, index) => (
                  <motion.li 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    key={index} 
                    className="bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-700 px-5 py-2.5 rounded-xl font-bold border border-sky-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-default"
                  >
                    {pkg}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Images */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            aria-label={`${dest.name} images`} 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12"
          >
            {dest.image?.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-2xl shadow-md border border-gray-100 cursor-pointer group"
                onClick={() => setSelectedImg(`https://res.cloudinary.com/${cloudName}/image/upload/${img}.jpg`)}
              >
                <img
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/${img}.jpg`}
                  alt={`KavikaTravels destination ${dest.name} image ${idx + 1}`}
                  className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-sky-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-sky-900 font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">View</span>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* Videos */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            aria-label={`${dest.name} videos`} 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
          >
            {dest.video?.map((vid, idx) => (
              <div key={idx} className="overflow-hidden rounded-2xl shadow-xl border border-gray-100">
                <video
                  src={`https://res.cloudinary.com/${cloudName}/video/upload/${vid}.mp4`}
                  className="w-full h-64 sm:h-80 object-cover"
                  autoPlay muted playsInline loop
                />
              </div>
            ))}
          </motion.section>

          {/* Modal preview */}
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setSelectedImg(null)}
            >
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={selectedImg}
                alt="Full size preview"
                className="max-w-[95%] max-h-[95%] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/20"
              />
            </motion.div>
          )}
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Destinations | KavikaTravels — Book Trips from Karnal, Kurukshetra & Ladwa</title>
        <meta
          name="description"
          content="Browse our exciting travel destinations from Karnal, Kurukshetra, Radaur, Indri, Ladwa & nearby cities. Customized trips to Shimla, Haridwar, Manali & more!"
        />
        <link rel="canonical" href="https://www.kavikatravels.in/destination" />
      </Helmet>

      <motion.div {...fadeVariant} className="relative bg-slate-50 min-h-screen overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[10%] left-[-20%] w-[60%] h-[60%] bg-teal-200/40 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-4 py-16 sm:py-24 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-extrabold mb-16 text-center text-slate-900 tracking-tight drop-shadow-sm"
          >
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Destinations</span>
          </motion.h1>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {contents.map((ele) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              key={ele._id}
              className="cursor-pointer bg-white pb-4 rounded-2xl border border-gray-100 shadow-sm transform transition-all hover:-translate-y-2 hover:shadow-xl group"
              onClick={() => navigate(`/destinations/${ele._id}`)}
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/${ele.coverImage}.jpg`}
                  alt={`KavikaTravels destination ${ele.name}`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h2 className="mt-5 text-center text-xl font-bold text-slate-800">{ele.name}</h2>
            </motion.div>
          ))}
        </motion.div>

        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Popular Packages</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contents
              .filter((dest) => dest.packages && dest.packages.length > 0)
              .map((dest) => (
                <div
                  key={dest._id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <h3 className="text-xl font-bold text-sky-600 mb-4 group-hover:text-orange-500 transition-colors">{dest.name}</h3>
                  <ul className="flex flex-col gap-2">
                    {dest.packages.map((pkg, index) => (
                      <li key={index} className="flex items-start text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 group-hover:border-sky-100 transition-colors">
                        <span className="text-sky-500 mr-2 mt-0.5">•</span> {pkg}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </motion.section>

        {/* Hidden keywords for extra local SEO */}
        <p className="sr-only">
          Book trips from Karnal, Kurukshetra, Radaur, Indri, Ladwa, Haridwar, Manali, Chandigarh & Shimla with KavikaTravels.
        </p>
        </div>
      </motion.div>
    </>
  );
};

export default Destinations;
