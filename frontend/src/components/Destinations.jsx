import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Destinations = ({ contents: passedContents }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const [contents, setContents] = useState(passedContents || []);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(!passedContents); // only show loader if empty

  useEffect(() => {
    if (passedContents) return; // already loaded
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
      <div className="min-h-screen bg-[#0e1a2b] flex items-center justify-center">
        <div className="text-[#ffb84c] text-xl animate-pulse">Loading contents…</div>
      </div>
    );
  }

  if (id) {
    const dest = contents.find((c) => c._id === id);
    if (!dest) {
      return (
        <div className="text-center py-20 text-xl text-[#F2E9DC] min-h-screen bg-[#0e1a2b]">
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

        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#F2E9DC]">
          {dest.name} Gallery
        </h2>

        {/* 📦 Packages section */}
        {dest.packages && dest.packages.length > 0 && (
          <div className="bg-[#132435] p-4 rounded-xl mb-8 border border-[#ffb84c]/50 shadow-md">
            <h3 className="text-xl font-semibold text-[#ffb84c] mb-2">Packages</h3>
            <ul className="list-disc list-inside text-[#F2E9DC] space-y-1">
              {dest.packages.map((pkg, index) => (
                <li key={index}>{pkg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 🖼️ Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {dest.image?.map((img, idx) => (
            <img
              key={idx}
              src={`https://res.cloudinary.com/${cloudName}/image/upload/${img}.jpg`}
              alt={`Image ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl shadow cursor-pointer hover:scale-105 transition"
              onClick={() =>
                setSelectedImg(
                  `https://res.cloudinary.com/${cloudName}/image/upload/${img}.jpg`
                )
              }
            />
          ))}
        </div>

        {/* 🎥 Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {dest.video?.map((vid, idx) => (
            <video
              key={idx}
              src={`https://res.cloudinary.com/${cloudName}/video/upload/${vid}.mp4`}
              className="w-full h-64 object-cover rounded-xl shadow"
              autoPlay
              muted
              playsInline
              loop
              controls={false}
            />
          ))}
        </div>

        {/* 🖼️ Fullscreen image preview */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
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

  return (
    <motion.div
      {...fadeVariant}
      className="bg-[#0e1a2b] min-h-screen max-w-screen-xl mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center text-[#ffb84c] tracking-wider">
        Explore Our Destinations
      </h2>

      {/* 🎡 Destination cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contents.map((ele) => (
          <div
            key={ele._id}
            className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate(`/destinations/${ele._id}`)}
          >
            <img
              src={`https://res.cloudinary.com/${cloudName}/image/upload/${ele.coverImage}.jpg`}
              alt={ele.name}
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <h1 className="mt-4 text-center text-xl font-bold text-[#F2E9DC]">
              {ele.name}
            </h1>
          </div>
        ))}
      </div>

      {/* 📦 Packages list */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-[#ffb84c] mb-6 text-center">
          Available Packages
        </h3>
        <div className="space-y-8">
          {contents
            .filter((dest) => dest.packages && dest.packages.length > 0)
            .map((dest) => (
              <div
                key={dest._id}
                className="bg-[#132435] p-4 rounded-xl border border-[#ffb84c]/50 shadow-md"
              >
                <h4 className="text-xl font-medium text-[#F2E9DC] mb-2">
                  {dest.name}
                </h4>
                <ul className="list-disc list-inside text-[#F2E9DC] space-y-1">
                  {dest.packages.map((pkg, index) => (
                    <li key={index}>{pkg}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );

};

export default Destinations;
