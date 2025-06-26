import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Bookus from './Bookus';
import DestinationSlider from './DestinationSlider';
import Destinations from './Destinations';
import About from './About';
import Testimonial from './Testimonials';
import ResponsiveVideoPlayer from './ResponsiveVideo';

const Home = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/contents`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setContents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching contents:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0e1a2b]">
        <div className="w-16 h-16 border-4 border-t-[#ffb84c] border-[#132135] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {/* SEO META */}
      <Helmet>
        <title>
          Kavika Travels | Book Trips from Karnal, Kurukshetra, Radaur, Indri & Ladwa to Himachal, Chandigarh, Shimla, Haridwar, Manali
        </title>
        <meta
          name="description"
          content="KavikaTravels offers customized trips to Himachal, Chandigarh, Shimla, Haridwar & Manali. Serving Karnal, Kurukshetra, Radaur, Indri, Ladwa & nearby cities. Book your next tour with us!"
        />
        <meta
          name="keywords"
          content="KavikaTravels, Tour Packages, Karnal Travel, Kurukshetra Travel, Radaur Trips, Indri Tours, Ladwa Travel, Himachal, Shimla, Chandigarh, Haridwar, Manali"
        />
      </Helmet>

      {/* Existing page sections */}
      <DestinationSlider contents={contents} loading={loading} />
      <ResponsiveVideoPlayer />
      <Bookus />
      <Destinations contents={contents} />
      <About />
      <Testimonial />
    </>
  );
};

export default Home;
