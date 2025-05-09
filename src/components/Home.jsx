import React from 'react';
import { destination } from '../data';
import Bookus from './Bookus';
import DestinationSlider from './DestinationSlider';

const Home = () => {
  return (
    <>
      <DestinationSlider/>
      <Bookus/>
    </>
  );
};

export default Home;
