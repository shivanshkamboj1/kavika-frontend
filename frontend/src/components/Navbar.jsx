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
      ? 'block text-sky-600 border-b-2 border-sky-500 transition-colors font-semibold'
      : 'block text-slate-700 hover:text-sky-600 transition-colors font-medium';

  return (
    <header className="bg-white/90 sticky top-0 left-0 w-full z-50 backdrop-blur-lg border-b border-gray-200 shadow-sm transition-all duration-300">
      {/* Small screen call banner */}
      <div className="bg-sky-600 text-white text-center py-2 px-4 text-sm font-medium lg:hidden">
        Need Help? Call Us:{' '}
        <a href="tel:+919355580007" className="underline hover:text-sky-100 transition font-bold">
         +91 9355580007
        </a>
      </div>

      {/* Main navbar */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex-shrink-0">
          <img src="/images/image1.png" width="120" alt="Kavika Travels Logo" loading="eager" className="hover:opacity-90 transition"/>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex space-x-10 text-base items-center">
          <NavLink to="/" className={aClass}>Home</NavLink>
          <NavLink to="/destination" className={aClass}>Destinations</NavLink>
          <NavLink to="/about" className={aClass}>About</NavLink>
          <a
            href="tel:+919355580007"
            className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            Call Us: +91 9355580007
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-slate-800 p-2 focus:outline-none hover:bg-slate-100 rounded-full transition"
          onClick={handleMenuToggle}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleMenuToggle}
      >
        <div
          className={`bg-white w-4/5 max-w-sm h-full p-6 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <img src="/images/image1.png" width="100" alt="Kavika Travels Logo" />
            <button onClick={handleMenuToggle} className="text-slate-500 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100">
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-6 text-lg" onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600 font-medium'}>Home</NavLink>
            <NavLink to="/destination" className={({ isActive }) => isActive ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600 font-medium'}>Destinations</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-sky-600 font-bold' : 'text-slate-700 hover:text-sky-600 font-medium'}>About</NavLink>
            
            <div className="pt-6 border-t border-gray-100 mt-auto">
              <a
                href="tel:+919355580007"
                className="flex items-center justify-center w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:bg-orange-600 transition"
              >
                Call Us: +91 9355580007
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
