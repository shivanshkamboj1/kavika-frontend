import React, { useState } from 'react';
import { destination } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

const Destinations = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (id) => {
    setSelectedIndex(id);
  };

  const handleBack = () => {
    setSelectedIndex(null);
  };

  const fadeVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {selectedIndex === null ? (
          <motion.div
            key="grid"
            {...fadeVariant}
            className="grid gap-6 cursor-pointer grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {destination.map((ele) => (
              <div
                key={ele.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                onClick={() => handleClick(ele.id)}
              >
                <img
                  src={ele.images[0]}
                  alt={ele.name}
                  className="w-full h-52 object-cover"
                />
                <h1 className="text-xl font-semibold text-center py-4">{ele.name}</h1>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            {...fadeVariant}
          >
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ← Back to Destinations
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {destination[selectedIndex].name} Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {destination[selectedIndex].images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Destinations;
