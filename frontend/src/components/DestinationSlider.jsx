import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cloudinaryUrl, cloudinarySrcSet } from '../utils/cloudinaryUrl';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute left-[-60px] top-1/2 -translate-y-1/2 bg-card p-3.5 rounded-full shadow-lg ring-1 ring-border hover:bg-muted transition-all group z-10"
  >
    <FaChevronLeft size={18} className="text-foreground group-hover:-translate-x-0.5 transition-transform" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute right-[-60px] top-1/2 -translate-y-1/2 bg-card p-3.5 rounded-full shadow-lg ring-1 ring-border hover:bg-muted transition-all group z-10"
  >
    <FaChevronRight size={18} className="text-foreground group-hover:translate-x-0.5 transition-transform" />
  </button>
);

const DestinationSlider = ({ contents, loading }) => {
  const navigate = useNavigate();

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
    customPaging: () => <div className="w-3 h-1.5 bg-border hover:bg-primary rounded-full transition-colors mt-4"></div>,
  };

  if (loading) {
    return (
      <section className="w-full py-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-primary border-muted rounded-full animate-spin"></div>
      </section>
    );
  }

  if (!contents || contents.length === 0) return null;

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="text-center mb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Our Journeys</p>
        <h2 className="font-display text-4xl md:text-5xl">Popular Destinations</h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-20">
        <Slider {...settings}>
          {contents.map((ele) => {
            const firstPackage = ele.packages && ele.packages.length > 0 ? ele.packages[0] : null;
            return (
              <div
                key={ele._id}
                className="px-3 py-2 cursor-pointer"
                onClick={() => navigate(`/destinations/${ele._id}`)}
              >
                <article className="flex flex-col group">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-sm ring-1 ring-black/5">
                    <img
                      src={cloudinaryUrl(ele.coverImage, { width: 800 })}
                      srcSet={cloudinarySrcSet(ele.coverImage, [400, 800, 1200])}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={ele.name}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-3 gap-4 px-1">
                    <h3 className="font-display text-2xl capitalize">{ele.name}</h3>
                    {firstPackage && (
                      <span className="font-mono text-xs font-bold text-primary whitespace-nowrap bg-primary/10 px-2 py-1 rounded-full">
                        {firstPackage}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-3 px-1">
                    <span>{ele.image?.length || 0} Photos</span>
                    <span className="w-1 h-1 rounded-full bg-border my-auto" />
                    <span>{ele.video?.length || 0} Videos</span>
                  </div>
                  <span className="text-left font-bold text-xs uppercase tracking-widest border-b-2 border-primary w-fit pb-1 hover:text-primary transition-colors px-1">
                    View Details
                  </span>
                </article>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default DestinationSlider;
