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
    className="hidden lg:flex absolute z-10 left-[-80px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-yellow-100 hover:scale-125 transition"
  >
    <FaChevronLeft size={30} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute z-10 right-[-80px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-yellow-100 hover:scale-125 transition"
  >
    <FaChevronRight size={30} />
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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 py-16">
      <Slider {...settings}>
        {destination.map((ele) => (
          <div
            key={ele.id}
            className="px-4"
            onClick={() => navigate(`/destinations/${ele.id}`)}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer">
              <img
                src={ele.images[0]}
                alt={ele.name}
                className="w-full h-[350px] object-cover"
              />
              <h1 className="text-2xl font-bold text-center py-6">{ele.name}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DestinationSlider;
