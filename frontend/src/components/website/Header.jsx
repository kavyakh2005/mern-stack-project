'use client'

import { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Example cart count

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-indigo-600">
              ShopLogo
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Shop</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>
          </nav>

          {/* Right side: Search + Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              className="hidden md:block border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Cart */}
            <div className="relative">
              <FaShoppingCart className="h-6 w-6 text-gray-700 cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <FaTimes className="h-6 w-6 text-gray-700" />
              ) : (
                <FaBars className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-indigo-600">Home</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">Shop</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">About</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600">Contact</a>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-md px-3 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </nav>
      )}
    </header>
  );
}
