import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { cloudinaryUrl, cloudinarySrcSet, cloudinaryVideoUrl } from '../utils/cloudinaryUrl';
import { FadeIn, TextReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';
import Logo from '../assets/Logo.jpeg';

const Destinations = ({ contents: passedContents }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [contents, setContents] = useState(passedContents || []);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(!passedContents);

  useEffect(() => {
    if (passedContents) return;
    fetch(`${apiUrl}/contents`)
      .then(res => res.json())
      .then(data => {
        setContents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [apiUrl, passedContents]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <img src={Logo} alt="Loading..." className="w-24 h-24 rounded-2xl animate-pulse" />
      </div>
    );
  }

  // ── DETAIL VIEW ──
  if (id) {
    const dest = contents.find((c) => c._id === id);
    if (!dest) {
      return (
        <div className="text-center py-20 text-xl text-muted-foreground min-h-screen">
          Destination not found
        </div>
      );
    }

    return (
      <>
        <Helmet>
          <title>{`${dest.name} | KavikaTravels — Book Trips from Karnal, Kurukshetra & Ladwa`}</title>
          <meta
            name="description"
            content={`Discover ${dest.name} with KavikaTravels. Book affordable and customized trips.`}
          />
        </Helmet>

        <div>
          {/* Detail Header */}
          <header className="px-6 md:px-8 pt-16 pb-12 max-w-7xl mx-auto">
            <FadeIn>
              <button
                onClick={() => navigate('/destination')}
                className="font-mono text-xs uppercase tracking-widest text-primary border-b border-primary pb-1 mb-8 inline-block hover:text-primary/80 transition-colors"
              >
                ← Back to Destinations
              </button>
            </FadeIn>
            <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-balance leading-[0.95] capitalize">
              {dest.name}
            </TextReveal>
          </header>

          <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
            {/* Packages */}
            {dest.packages && dest.packages.length > 0 && (
              <FadeIn direction="up" delay={0.1}>
                <section className="bg-card p-8 rounded-2xl ring-1 ring-border mb-12">
                  <h2 className="font-display text-2xl mb-6">
                    Available <span className="italic text-primary">Packages</span>
                  </h2>
                  <ul className="flex flex-wrap gap-3">
                    {dest.packages.map((pkg, index) => (
                      <li
                        key={index}
                        className="bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20"
                      >
                        {pkg}
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeIn>
            )}

            {/* Images Grid */}
            {dest.image && dest.image.length > 0 && (
              <StaggerContainer
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12"
                stagger={0.08}
              >
                {dest.image.map((img, idx) => (
                  <StaggerItem key={idx}>
                    <div
                      className="relative overflow-hidden rounded-2xl cursor-pointer group ring-1 ring-black/5 shadow-sm"
                      onClick={() => setSelectedImg(cloudinaryUrl(img, { width: 1600 }))}
                    >
                      <img
                        src={cloudinaryUrl(img, { width: 600 })}
                        srcSet={cloudinarySrcSet(img, [300, 600, 900])}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        alt={`${dest.name} image ${idx + 1}`}
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-card/90 text-foreground font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">View</span>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {/* Videos */}
            {dest.video && dest.video.length > 0 && (
              <FadeIn direction="up">
                <section aria-label={`${dest.name} videos`} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  {dest.video.map((vid, idx) => (
                    <div key={idx} className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
                      <video
                        src={cloudinaryVideoUrl(vid)}
                        className="w-full h-64 sm:h-80 object-cover"
                        autoPlay muted playsInline loop
                        preload="metadata"
                      />
                    </div>
                  ))}
                </section>
              </FadeIn>
            )}

            {/* CTA */}
            <FadeIn direction="up" delay={0.1}>
              <div className="text-center mt-16">
                <h3 className="font-display text-3xl mb-6">
                  Want to visit <span className="italic text-primary capitalize">{dest.name}</span>?
                </h3>
                <a
                  href="tel:+919355580007"
                  className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Call +91 9355580007
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Modal preview */}
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setSelectedImg(null)}
            >
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={selectedImg}
                alt="Full size preview"
                className="max-w-[95%] max-h-[95%] rounded-3xl shadow-2xl"
              />
            </motion.div>
          )}
        </div>
      </>
    );
  }

  // ── LIST VIEW ──
  return (
    <>
      <Helmet>
        <title>Destinations | KavikaTravels — Book Trips from Karnal, Kurukshetra & Ladwa</title>
        <meta
          name="description"
          content="Browse our exciting travel destinations. Customized trips to Shimla, Haridwar, Manali & more!"
        />
      </Helmet>

      <div>
        <header className="px-6 md:px-8 pt-16 pb-12 max-w-7xl mx-auto">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Destinations</p>
          </FadeIn>
          <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-3xl">
            The places we take you.
          </TextReveal>
        </header>

        <StaggerContainer
          className="px-6 md:px-8 pb-24 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          stagger={0.1}
        >
          {contents.map((ele) => (
            <StaggerItem key={ele._id} className="h-full">
              <article
                className="group cursor-pointer h-full flex flex-col"
                onClick={() => navigate(`/destinations/${ele._id}`)}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 ring-1 ring-black/5 shadow-sm">
                  <img
                    src={cloudinaryUrl(ele.coverImage, { width: 600 })}
                    srcSet={cloudinarySrcSet(ele.coverImage, [300, 600, 900])}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    alt={`KavikaTravels destination ${ele.name}`}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h2 className="font-display text-2xl mb-2 capitalize">{ele.name}</h2>
                {ele.packages && ele.packages.length > 0 && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {ele.packages.slice(0, 2).join(' · ')}
                  </p>
                )}
                <span className="font-mono text-xs uppercase tracking-widest text-primary border-b border-primary pb-1 mt-auto">
                  Explore
                </span>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Popular Packages */}
        {contents.some(d => d.packages && d.packages.length > 0) && (
          <section className="px-6 md:px-8 pb-24 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <FadeIn>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Curated Experiences</p>
              </FadeIn>
              <TextReveal as="h2" className="font-display text-4xl md:text-5xl">
                Popular Packages
              </TextReveal>
            </div>
            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start" stagger={0.1}>
              {contents
                .filter((dest) => dest.packages && dest.packages.length > 0)
                .map((dest) => (
                  <StaggerItem key={dest._id} className="h-full">
                    <div
                      className="bg-card p-6 rounded-2xl ring-1 ring-border hover:shadow-lg transition-shadow group cursor-pointer h-full"
                      onClick={() => navigate(`/destinations/${dest._id}`)}
                    >
                      <h3 className="font-display text-xl mb-4 group-hover:text-primary transition-colors capitalize italic">{dest.name}</h3>
                      <ul className="flex flex-col gap-2">
                        {dest.packages.map((pkg, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                            <span className="text-primary mr-2 mt-0.5">•</span> {pkg}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </section>
        )}

        {/* Hidden keywords for SEO */}
        <p className="sr-only">
          Book trips from Karnal, Kurukshetra, Radaur, Indri, Ladwa, Haridwar, Manali, Chandigarh & Shimla with KavikaTravels.
        </p>
      </div>
    </>
  );
};

export default Destinations;
