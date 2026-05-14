import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaWhatsapp, FaPhone, FaUser, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';
import { FadeIn, TextReveal } from './AnimationWrappers';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name')?.toString().trim();
    const phone = form.get('phone')?.toString().trim();
    const destination = form.get('destination')?.toString().trim();
    const message = form.get('message')?.toString().trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setSubmitting(true);

    // Build WhatsApp message
    const waMessage = `Hello Kavika Travels!%0A%0AName: ${name}%0APhone: ${phone}${destination ? `%0ADestination: ${destination}` : ''}${message ? `%0AMessage: ${message}` : ''}`;

    // Open WhatsApp
    window.open(`https://wa.me/919355580007?text=${waMessage}`, '_blank');

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      e.target.reset();
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>Plan Your Trip — Kavika Travels</title>
        <meta name="description" content="Tell us about the trip you've been dreaming of. Our travel curators reply within 24 hours." />
      </Helmet>

      <section className="px-6 md:px-8 pt-16 pb-24 max-w-4xl mx-auto">
        <FadeIn>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Plan Your Trip</p>
        </FadeIn>
        <TextReveal as="h1" className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          Tell us about the trip you've been dreaming of.
        </TextReveal>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            A few sentences is all we need to start. Call us or fill the form below — we reply within 24 hours.
          </p>
        </FadeIn>


        {/* Contact Form */}
        <FadeIn direction="up" delay={0.25}>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-border"
          >
            <Field label="Your name" name="name" required />
            <Field label="Phone number" name="phone" type="tel" required />
            <Field label="Destination of interest" name="destination" placeholder="e.g. Shimla, Manali…" className="md:col-span-2" />
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Tell us more</label>
              <textarea
                name="message"
                rows={5}
                maxLength={2000}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="When are you thinking of traveling, how many people, what kind of experiences excite you…"
              />
            </div>
            <button
              disabled={submitting}
              className="md:col-span-2 justify-self-start bg-primary text-primary-foreground px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send via WhatsApp'}
            </button>
            {submitted && (
              <p className="md:col-span-2 text-sm text-secondary font-medium">
                ✓ Great! You should see a WhatsApp window opening. We'll reply within 24 hours.
              </p>
            )}
          </form>
        </FadeIn>
        
        {/* Contact Info Grid */}
        <FadeIn direction="up" delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm mt-12 mb-16 bg-card/50 p-8 rounded-3xl border border-border">
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
        </FadeIn>
      </section>
    </>
  );
};

function Field({ label, name, type = 'text', required, placeholder, className }) {
  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default Contact;
