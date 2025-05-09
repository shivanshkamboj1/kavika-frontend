import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const aClass =({ isActive }) =>
      isActive
        ? 'block text-gray-800 hover:text-blue-500 border-b-8 border-black transition-all-3s'
        : 'block text-gray-800 hover:text-blue-500'
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-sans">
          <div className="bg-yellow-100 text-black text-center py-2 px-4 text-sm font-medium lg:hidden">
        Call Us: <a href="tel:+1234567890" className="underline hover:text-blue-600">+1 (234) 567-890</a>
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-3xl font-extrabold text-blue-600 tracking-wide">
          TravelSite
        </Link>

        <nav className="hidden lg:flex space-x-8 text-lg font-medium items-baseline">
          <NavLink
          to="/"
              className={aClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/destination"
            className={aClass}
          >
            Destinations
          </NavLink>
          <NavLink
            to="/about"
            className={aClass}
          >
            About
          </NavLink>
          <a
            href="tel:+1234567890"
            className={aClass}
            style={{ backgroundColor: '#fff1da' }}
          >
            Call Us: +1 (234) 567-890
          </a>
        </nav>

        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={handleMenuToggle}
        >
        <i className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full backdrop-blur-sm z-40 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={handleMenuToggle}
      >
        <div
          className="bg-white w-3/4 h-full p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6 text-lg" onClick={()=>setMenuOpen(!menuOpen)}>
            <NavLink
              to="/"
              className="block text-gray-800 hover:text-blue-500"
              activeClassName="border-b-2 border-black"
            >
              Home
            </NavLink>
            <NavLink
              to="/destination"
              className="block text-gray-800 hover:text-blue-500"
              activeClassName="border-b-2 border-black"
            >
              Destinations
            </NavLink>
            <NavLink
              to="/about"
              className="block text-gray-800 hover:text-blue-500"
              activeClassName="border-b-2 border-black"
            >
              About
            </NavLink>
            <a
              href="tel:+1234567890"
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Call Us: +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
