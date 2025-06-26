import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  
  const aClass = ({ isActive }) =>
    isActive
      ? 'block text-[#ffb84c] border-b-2 border-[#ffb84c] transition-colors'
      : 'block text-[#F2E9DC] hover:text-[#ffb84c] transition-colors';

  return (
    <header className="bg-[#0e1a2b]/80 sticky top-0 left-0 w-full z-50 backdrop-blur-md border-b border-[#ffb84c]/20">
      {/* Small screen call banner */}
      <div className="bg-[#132135] text-[#F2E9DC] text-center py-2 px-4 text-sm font-medium lg:hidden border-b border-[#ffb84c]/20">
        Call Us:{' '}
        <a href="tel:+919355580007" className="underline hover:text-[#ffb84c] transition">
         +91 9355580007
        </a>
      </div>

      {/* Main navbar */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-2">
        <Link to="/">
          <img src="/images/image1.png" width="120" alt="Kavika Travels Logo" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex space-x-8 text-lg font-medium items-center">
          <NavLink to="/" className={aClass}>Home</NavLink>
          <NavLink to="/destination" className={aClass}>Destinations</NavLink>
          <NavLink to="/about" className={aClass}>About</NavLink>
          <a
            href="tel:+919355580007"
            className="bg-[#132135] text-[#ffb84c] px-4 py-2 rounded-full border border-[#ffb84c]/50 hover:bg-[#ffb84c]/10 transition"
          >
            Call Us: +91 9355580007
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-[#F2E9DC] focus:outline-none"
          onClick={handleMenuToggle}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-[1080px] z-[9999]backdrop-blur-sm z-40 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={handleMenuToggle}
      >
        <div
          className="bg-[#132135] w-3/4 h-full p-6 shadow-xl border-r border-[#ffb84c]/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6 text-lg" onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink to="/" className="block text-[#F2E9DC] hover:text-[#ffb84c]">Home</NavLink>
            <NavLink to="/destination" className="block text-[#F2E9DC] hover:text-[#ffb84c]">Destinations</NavLink>
            <NavLink to="/about" className="block text-[#F2E9DC] hover:text-[#ffb84c]">About</NavLink>
            <a
              href="tel:+919355580007"
              className="inline-block bg-[#ffb84c] text-[#132135] font-medium py-2 px-4 rounded-full hover:bg-[#ffb84c]/80 transition"
            >
              Call Us: +91 9355580007
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
