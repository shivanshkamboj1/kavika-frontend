import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destination } from '../data';
import { motion } from 'framer-motion';

const Destinations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null); // Modal state

  const fadeVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  if (id) {
    const dest = destination.find((ele) => ele.id === parseInt(id));
    if (!dest) {
      return (
        <div className="text-center py-20 text-xl text-[#F2E9DC] bg-[#0e1a2b] min-h-screen">
          Destination not found
        </div>
      );
    }

    return (
      <motion.div
        {...fadeVariant}
        className="bg-[#0e1a2b] min-h-screen max-w-screen-xl mx-auto px-4 py-8"
      >
        <button
          onClick={() => navigate('/destination')}
          className="mb-6 px-5 py-2 bg-[#ffb84c] text-[#0e1a2b] font-medium rounded-full hover:scale-105 transition"
        >
          ← Back to Destinations
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#F2E9DC] tracking-wide">
          {dest.name} Gallery
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {dest.images.map((img, idx) => (
            <img
              key={idx}
              loading="lazy"
              src={img}
              alt={`Image ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl shadow cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
            onClick={() => setSelectedImg(null)}
          >
            <img
              src={selectedImg}
              alt="Selected"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl border-4 border-[#ffb84c]"
            />
          </div>
        )}
      </motion.div>
    );
  }

  // Destination grid view
  return (
    <motion.div
      {...fadeVariant}
      className="bg-[#0e1a2b] min-h-screen max-w-screen-xl mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-[#ffb84c] tracking-wider">
        Explore Our Destinations
      </h2>

      <div className="grid gap-6 cursor-pointer grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {destination.map((ele) => (
          <div
            key={ele.id}
            className="bg-[#132135] border border-[#ffb84c]/20 rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate(`/destinations/${ele.id}`)}
          >
            <img
              loading="lazy"
              src={ele.images[0]}
              alt={ele.name}
              className="w-full h-52 object-cover"
            />
            <h1 className="text-lg font-semibold text-center py-4 text-[#F2E9DC]">
              {ele.name}
            </h1>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Destinations;
