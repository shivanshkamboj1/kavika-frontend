import React from 'react';
import Slider from 'react-slick';
import { destination } from '../data';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute z-10 left-[-80px] top-1/2 transform -translate-y-1/2 bg-[#ffb84c] p-3 rounded-full shadow-lg hover:bg-[#ffd580]  "
  >
    <FaChevronLeft size={24} className="text-[#0e1a2b]" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute z-10 right-[-80px] top-1/2 transform -translate-y-1/2 bg-[#ffb84c] p-3 rounded-full shadow-lg hover:bg-[#ffd580]  "
  >
    <FaChevronRight size={24} className="text-[#0e1a2b]" />
  </button>
);

const DestinationSlider = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => <ul style={{ bottom: '-2rem' }}>{dots}</ul>,
    customPaging: () => <div className="w-3 h-3 bg-[#ffb84c]/50 rounded-full"></div>,
  };

  return (
    <section className="bg-[#0e1a2b] relative w-full py-16 overflow-visible"> {/* ✅ allow overflow */}
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-8 text-[#ffb84c] tracking-wider">
        Explore Our Top Destinations
      </h2>

      <div className="relative max-w-screen-xl mx-auto px-4 overflow-visible"> {/* ✅ allow overflow */}
        <Slider {...settings} className="overflow-visible"> {/* ✅ allow overflow */}
          {destination.map((ele) => (
            <div
              key={ele.id}
              className="px-4 cursor-pointer"
              onClick={() => navigate(`/destinations/${ele.id}`)}
            >
              <div className="relative rounded-2xl shadow-xl border border-[#ffb84c]/20 bg-[#132135] transform transition-transform duration-300 "> {/* ✅ increased scale & z-index */}
                <img
                  src={ele.images[0]}
                  alt={ele.name}
                  className="w-full h-[320px] object-cover opacity-90 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                <h1 className="absolute bottom-4 left-0 right-0 text-center text-xl sm:text-2xl font-bold text-[#F2E9DC] drop-shadow-xl transform transition-transform duration-300 ">
                  {ele.name}
                </h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DestinationSlider;
