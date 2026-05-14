import React from 'react';
import { FadeIn, TextReveal, StaggerContainer, StaggerItem } from './AnimationWrappers';

const testimonials = [
  { name: "Anuj Kamboj", feedback: "This travel experience was life-changing. The service was exceptional!", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Vishal", feedback: "Absolutely loved the destination and the smooth planning. Highly recommended!", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Narendar Kumar", feedback: "One of the best trips I've ever taken. Everything was well-organized.", image: "https://randomuser.me/api/portraits/men/54.jpg" },
];

const Testimonial = () => {
  return (
    <section className="relative py-24 px-6 md:px-8 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-r from-accent/20 to-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {/* Heading */}
      <div className="text-center mb-20">
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Testimonials</p>
        </FadeIn>
        <TextReveal as="h2" className="font-display text-4xl md:text-5xl">
          What Our Travelers Say
        </TextReveal>
      </div>

      {/* Testimonials Grid */}
      <StaggerContainer className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto" stagger={0.15}>
        {testimonials.map((item, index) => (
          <StaggerItem key={index}>
            <div
              className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-sm ring-1 ring-border text-center transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative mt-10 group"
            >
              {/* User image */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-primary to-accent shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full rounded-full border-3 border-card object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-display italic mb-3 text-foreground mt-6">
                {item.name}
              </h3>

              {/* Feedback */}
              <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{item.feedback}&rdquo;</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

export default Testimonial;
