import React from 'react';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-slate-900 text-white text-center py-10 mt-16 shadow-inner">
    <p className="text-sky-200 text-sm mb-4 font-medium">
      © {new Date().getFullYear()} Kavika Travels — Crafted with 🩵.
    </p>

    {/* Contact Information */}
    <div className="text-white/70 text-sm space-y-1 mb-4">
      <p><strong>Name:</strong> Prince</p>
      <p><strong>Phone:</strong> +91 9355580007</p>
      <p><strong>Email:</strong> contact@kavikatravels.in</p>
    </div>

    {/* Facebook Link */}
    <a
      href="https://facebook.com/kavikatravels"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sky-200 hover:text-white transition-colors mt-2"
    >
      <FaFacebook size={24} /> Facebook
    </a>
  </footer>
);

export default Footer;
