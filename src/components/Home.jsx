import React from 'react';
import { destination } from '../data';
import Bookus from './Bookus';
import DestinationSlider from './DestinationSlider';
import Destinations from './Destinations';
import About from './About';
import Testimonial from './Testimonials';
import ResponsiveVideoPlayer from './ResponsiveVideo';

const Home = () => {
  return (
    <>
      <DestinationSlider />
      <ResponsiveVideoPlayer/>
      <Bookus />
      <div className="py-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8">
          Our Journeys
        </h2>
        <Destinations />
      </div>
      <About />
      <Testimonial />
    </>
  );
};

export default Home;
