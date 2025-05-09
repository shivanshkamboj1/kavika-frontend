import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destination } from '../data';
import { motion } from 'framer-motion';

const Destinations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null); // State for modal

  const fadeVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  if (id) {
    const dest = destination.find((ele) => ele.id === parseInt(id));
    if (!dest) {
      return <div className="text-center py-20 text-xl">Destination not found</div>;
    }

    return (
      <motion.div {...fadeVariant} className="max-w-screen-xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/destination')}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Back to Destinations
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">{dest.name} Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {dest.images.map((img, idx) => (
            <img
              key={idx}
              loading="lazy"
              src={img}
              alt={`Image ${idx + 1}`}
              className="w-full h-full object-cover rounded-lg shadow cursor-pointer"
              onClick={() => setSelectedImg(img)} // Set selected image
            />
          ))}
        </div>

        {/* Fullscreen Modal */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            onClick={() => setSelectedImg(null)} // Close modal
          >
            <img
              src={selectedImg}
              alt="Selected"
              className="max-w-[90%] max-h-[90%] rounded shadow-lg"
            />
          </div>
        )}
      </motion.div>
    );
  }

  // Grid of all destinations (no `id` in URL)
  return (
    <motion.div {...fadeVariant} className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid gap-6 cursor-pointer grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {destination.map((ele) => (
          <div
            key={ele.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            onClick={() => navigate(`/destinations/${ele.id}`)}
          >
            <img
              loading="lazy"
              src={ele.images[0]}
              alt={ele.name}
              className="w-full h-52 object-cover"
            />
            <h1 className="text-xl font-semibold text-center py-4">{ele.name}</h1>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Destinations;
