import React from 'react';
import { destination } from '../data';
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
        .then(res => res.json())
        .then(data => {
          setContents(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching contents:', err);
          setLoading(false);
        });
    }, [apiUrl]);

    if (loading) return <div>Loading…</div>;
  return (
    <>
      <DestinationSlider contents={contents}/>
      <ResponsiveVideoPlayer/>
      <Bookus />
      <Destinations contents={contents}/>
      <About />
      <Testimonial />
    </>
  );
};

export default Home;
