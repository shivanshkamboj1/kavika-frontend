import React from 'react';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-slate-900 text-white text-center py-8 border-t border-white/10 mt-16">
    <p className="text-white/70 text-sm mb-2">
      © {new Date().getFullYear()} Kavika Travels — Crafted with 💛.
    </p>

    {/* Contact Information */}
    <div className="text-white/70 text-sm space-y-1 mb-4">
      <p><strong>Name:</strong> Prince</p>
      <p><strong>Phone:</strong> +91 9355580007</p>
      <p><strong>Email:</strong> contact@kavikatravels.com</p>
    </div>

    {/* Facebook Link */}
    <a
      href="https://facebook.com/kavikatravels"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
    >
      <FaFacebook size={20} /> Facebook
    </a>
  </footer>
);

export default Footer;
