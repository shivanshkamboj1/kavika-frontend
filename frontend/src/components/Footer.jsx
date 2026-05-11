import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-background border-t border-border pt-20 pb-10 px-6 md:px-8 mt-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
      {/* Brand */}
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-display text-2xl font-bold italic text-primary">Kavika Travels</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your trusted travel partner across North India. Customized trips to Himachal, Chandigarh, Shimla, Haridwar, Manali & beyond.
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 text-accent-foreground/70">Explore</h5>
          <ul className="space-y-3 text-sm">
            <li><Link to="/destination" className="hover:text-primary transition-colors">Destinations</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Plan a Trip</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 text-accent-foreground/70">Contact</h5>
          <ul className="space-y-3 text-sm">
            <li><a href="tel:+919355580007" className="hover:text-primary transition-colors">+91 9355580007</a></li>
            <li><a href="mailto:contact@kavikatravels.in" className="hover:text-primary transition-colors">contact@kavikatravels.in</a></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Admin</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 text-accent-foreground/70">Connect</h5>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://instagram.com/KavikaTravels" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <FaInstagram size={16} /> Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com/kavikatravels" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <FaFacebook size={16} /> Facebook
              </a>
            </li>
            <li>
              <a href="https://wa.me/919355580007" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <FaWhatsapp size={16} /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        © {new Date().getFullYear()} Kavika Travels — Crafted for soul seekers.
      </p>
      <div className="flex gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
