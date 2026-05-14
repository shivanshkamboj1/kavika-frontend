import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

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
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Plan Your Trip</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          Tell us about the trip you've been <span className="italic text-primary">dreaming of.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          A few sentences is all we need to start. Call us or fill the form below — we reply within 24 hours.
        </p>

        {/* Quick CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-12">
          {/* <a
            href="tel:+919355580007"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <FaPhone size={14} /> Call +91 9355580007
          </a>
          <a
            href="https://wa.me/919355580007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-foreground px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
          >
            <FaWhatsapp size={16} /> WhatsApp Us
          </a> */}
        </div>

        {/* Contact Form */}
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
