import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import varanasiImg from '../assets/dest-varanasi.jpg';
import Logo from '../assets/Logo.jpeg';
import { FadeIn, TextReveal } from './AnimationWrappers';
import { FaUser, FaPhone, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';

const AboutUs = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Kavika Travels",
    "image": "https://www.kavikatravels.in/images/image1.png",
    "url": "https://www.kavikatravels.in/about",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot Number - C6783, Near Deep Chand Bandhu Hospital, Ashok Vihar",
      "addressLocality": "Delhi",
      "postalCode": "110052",
      "addressCountry": "IN"
    },
    "telephone": "+91-9355580007",
    "openingHours": "Mo-Su 09:00-21:00",
    "sameAs": [
      "https://www.facebook.com/KavikaTravels",
      "https://www.instagram.com/KavikaTravels"
    ]
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover Kavika Travels — a trusted tour and travel agency. Book customized trips to Himachal, Chandigarh & Shimla."
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="px-6 md:px-8 pt-16 pb-20 max-w-5xl mx-auto">
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Our Story</p>
        </FadeIn>
        <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          A small team with a big heart.
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-12 mt-16 items-start">
          {/* Image */}
          <FadeIn direction="left">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg">
              <img src={varanasiImg} alt="Beautiful Indian landscape" width={800} height={1000} decoding="async" className="w-full h-full object-cover" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" delay={0.15}>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Kavika Travels</strong> was founded by explorers who believe travel is more than just sightseeing — it's about connection, culture, and discovery. From humble beginnings to becoming a trusted travel partner across North India, our journey has been incredible.
              </p>
              <p>
                We design customized journeys for travelers who want to experience the real India. No cookie-cutter packages — every itinerary is hand-built by people who've actually walked the trails, stayed in the hotels, and shared the meals.
              </p>

              {/* Why Choose Us */}
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-2xl text-foreground italic">Why Choose Us?</h3>
                <ul className="space-y-3 text-base">
                  <li className="flex items-center gap-3">
                    <span className="size-2 bg-primary rounded-full shrink-0" />
                    Curated tours in over 50 incredible destinations
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 bg-primary rounded-full shrink-0" />
                    Friendly local guides for authentic experiences
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 bg-primary rounded-full shrink-0" />
                    End-to-end travel planning with 24/7 support
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-2 bg-primary rounded-full shrink-0" />
                    Loved by 10,000+ travelers — 4.9/5 on Google
                  </li>
                </ul>
              </div>

              <Link to="/contact" className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                Start a Conversation
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Contact Details */}
        <FadeIn direction="up" delay={0.1}>
          <div className="pt-16 mt-16 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                    <FaUser size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Contact Person</p>
                    <p className="font-medium text-foreground text-base">Prince</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Mobile Number</p>
                    <a href="tel:+919355580007" className="font-medium text-foreground text-base hover:text-primary transition-colors">+91 9355580007</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                    <FaRegClock size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Availability</p>
                    <p className="font-medium text-foreground text-base">All days, 9 AM – 9 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:col-span-2">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Office Address</p>
                    <p className="font-medium text-foreground text-base leading-relaxed">Plot Number - C6783, Near Deep Chand Bandhu Hospital, Ashok Vihar, Delhi 110052</p>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={Logo}
              alt="Kavika Travels company logo"
              className="h-28 w-auto drop-shadow-lg rounded-2xl"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </section>
    </>
  );
};

export default AboutUs;
