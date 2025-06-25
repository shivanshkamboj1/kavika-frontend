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
      <Destinations />
      <About />
      <Testimonial />
    </>
  );
};

export default Home;
