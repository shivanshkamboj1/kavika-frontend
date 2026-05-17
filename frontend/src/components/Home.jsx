import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import DestinationSlider from './DestinationSlider';
import ResponsiveVideoPlayer from './ResponsiveVideo';
import Testimonial from './Testimonials';
import { FadeIn, TextReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';
import Logo from '../assets/Logo.jpeg';

// Static destination images
import HaridwarImg from '../assets/Haridwar.jpg';
import ManaliImg from '../assets/Manali.jpg';
import Tungnath from '../assets/Tungnath.jpg';

// Destination Mosaic Card
function DestCard({ className, img, name, caption }) {
  return (
    <StaggerItem className={className}>
      <Link to="/destination" className="group relative overflow-hidden rounded-2xl block h-full">
        <img
          src={img}
          alt={caption ? `${name} — ${caption}` : name}
          loading="lazy"
          decoding="async"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 md:p-6 text-white">
          {caption && <p className="font-display text-lg md:text-2xl">{caption}</p>}
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-80 mt-1">{name}</p>
        </div>
      </Link>
    </StaggerItem>
  );
}

// FAQ Accordion Item
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-display text-base md:text-lg pr-4">{question}</span>
        <span
          className={`text-primary text-xl shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
        }`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "What destinations do you cover?",
    answer: "We cover all major North Indian destinations including Himachal Pradesh (Shimla, Manali, Dharamshala), Uttarakhand (Haridwar, Rishikesh, Tungnath), Chandigarh, and many more. Custom routes are also available on request.",
  },
  {
    question: "How do I book a trip?",
    answer: "You can book by calling us at +91 9355580007, sending a WhatsApp message, or filling out the contact form on our website. We'll get back to you within 24 hours with a custom itinerary.",
  },
  {
    question: "Do you offer customized trip packages?",
    answer: "Absolutely! Every itinerary is built from scratch based on your preferences — budget, duration, group size, interests, and travel style. No two trips are the same.",
  },
  {
    question: "What are your service areas?",
    answer: "We primarily serve travelers from Karnal, Kurukshetra, Radaur, Indri, Ladwa, and nearby cities in Haryana. However, we welcome bookings from anywhere in India.",
  }
];

const Home = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <img src={Logo} alt="Loading..." className="w-24 h-24 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <main>
      {/* SEO META */}
      <Helmet>
        <title>
          Kavika Travels | Book Trips from Karnal, Kurukshetra, Radaur, Indri & Ladwa to Himachal, Chandigarh, Shimla, Haridwar, Manali
        </title>
        <meta
          name="description"
          content="KavikaTravels offers customized trips to Himachal, Chandigarh, Shimla, Haridwar & Manali. Serving Karnal, Kurukshetra, Radaur, Indri, Ladwa & nearby cities."
        />
        <link rel="canonical" href="https://www.kavikatravels.in/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* 1. Hero */}
      <Hero />

      {/* 2. Destinations Mosaic */}
      <section className="px-6 md:px-8 py-14 md:py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 md:mb-12 gap-6">
            <div>
              <TextReveal as="h2" className="font-display text-4xl md:text-5xl mb-3 italic">
                Featured Terrains
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-muted-foreground">The diverse soul of North India.</p>
              </FadeIn>
            </div>
            <FadeIn direction="left" delay={0.3}>
              <Link to="/destination" className="font-mono text-xs uppercase tracking-widest border-b border-primary text-primary pb-1 shrink-0">
                View All
              </Link>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-4 gap-4 md:gap-6 auto-rows-[140px] md:auto-rows-[280px]" stagger={0.12}>
            <DestCard className="col-span-4 md:col-span-2 row-span-2" img={HaridwarImg} name="Haridwar" caption="Religious Beauty" />
            <DestCard className="col-span-2" img={ManaliImg} name="Manali" />
            <DestCard className="col-span-2" img={Tungnath} name="Tungnath" />
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Destination Slider (from backend) */}
      <FadeIn>
        <DestinationSlider contents={contents} loading={loading} />
      </FadeIn>

      {/* 4. Video Section */}
      <FadeIn>
        <ResponsiveVideoPlayer />
      </FadeIn>

      {/* 5. Why Choose Us */}
      <section className="bg-ink text-cream py-14 md:py-20 px-6 md:px-8">
        <StaggerContainer className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" stagger={0.1}>
          {[
            { t: "Local Guides", d: "Travel with people who know the roads by heart." },
            { t: "Best Stays", d: "Handpicked hotels, resorts & homestays." },
            { t: "Custom Trips", d: "Every itinerary built just for you." },
            { t: "24/7 Support", d: "We're always a call away." },
          ].map((f) => (
            <StaggerItem key={f.t}>
              <div className="text-center">
                <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <div className="size-2 bg-primary rounded-full" />
                </div>
                <h4 className="font-display italic text-xl mb-3">{f.t}</h4>
                <p className="text-xs text-cream/60 leading-relaxed uppercase tracking-widest">{f.d}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 6. Testimonials */}
      <Testimonial />

      {/* 7. FAQ */}
      <section className="px-6 md:px-8 py-14 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <FadeIn>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">FAQ</p>
            </FadeIn>
            <TextReveal as="h2" className="font-display text-4xl md:text-5xl">
              Common Questions
            </TextReveal>
          </div>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-card rounded-2xl p-6 md:p-10 ring-1 ring-border shadow-sm">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === i}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="relative py-16 md:py-28 px-6 md:px-8 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <TextReveal as="h2" className="font-display text-4xl md:text-6xl mb-6 md:mb-8 leading-tight">
            Ready to plan your next adventure?
          </TextReveal>
          <FadeIn delay={0.3}>
            <p className="text-lg text-muted-foreground mb-8 md:mb-10">
              Talk to us — we build every trip from scratch, just for you.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <a
              href="tel:+919355580007"
              className="inline-block bg-primary text-primary-foreground px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Call +91 9355580007
            </a>
          </FadeIn>
        </div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
      </section>
    </main>
  );
};

export default Home;
