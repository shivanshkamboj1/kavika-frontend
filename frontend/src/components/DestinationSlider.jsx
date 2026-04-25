import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute left-[-80px] top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:bg-sky-50 transition-all duration-300 group z-10 border border-sky-100"
  >
    <FaChevronLeft size={24} className="text-sky-600 group-hover:-translate-x-1 transition-transform" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute right-[-80px] top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:bg-sky-50 transition-all duration-300 group z-10 border border-sky-100"
  >
    <FaChevronRight size={24} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
  </button>
);

const DestinationSlider = ({ contents, loading }) => {
  const navigate = useNavigate();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => <ul style={{ bottom: '-3rem' }}>{dots}</ul>,
    customPaging: () => <div className="w-4 h-2 bg-sky-200 hover:bg-sky-400 rounded-full transition-colors mt-4"></div>,
  };

  if (loading) {
    return (
      <section className="bg-slate-50 w-full py-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-sky-500 border-sky-200 rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-50 z-0">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-sky-200/40 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-[100px] -z-10"></div>
      
      <h2 className="relative text-center text-4xl sm:text-5xl font-extrabold mb-16 text-slate-900 tracking-tight z-10">
        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">Top Destinations</span>
      </h2>

      <div className="relative max-w-screen-xl mx-auto px-4 overflow-visible">
        <Slider {...settings} className="overflow-visible">
          {contents.map((ele) => {
            const firstPackage = ele.packages && ele.packages.length > 0 ? ele.packages[0] : null;
            return (
              <div
                key={ele._id}
                className="px-4 py-4 cursor-pointer"
                onClick={() => navigate(`/destinations/${ele._id}`)}
              >
                <div className="relative rounded-2xl shadow-md bg-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group overflow-hidden border border-gray-100">
                  <img
                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${ele.coverImage}.jpg`}
                    alt={ele.name}
                    className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-0 right-0 text-center text-white drop-shadow-md px-4">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-wide">{ele.name}</h1>
                    {firstPackage && (
                      <span className="inline-block bg-orange-500 text-white text-sm sm:text-base px-4 py-1.5 rounded-full font-semibold shadow-sm">
                        {firstPackage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default DestinationSlider;
