'use client'

import React from "react";
import { FaCheckCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {

  const cartItems = useSelector((state)=> state.cart);
  // console.log(cart)

  return (
    <header className="w-full border-b bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span className="bg-gray-100 px-3 py-1 rounded-md">Hotline 24/7</span>
          <span>(+91) 9982521612 </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-black">Sell on Swoo</a>
          <a href="#" className="hover:text-black">Order Tracking</a>

          {/* Currency */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span>USD</span>
            <IoIosArrowDown />
          </div>

          {/* Language */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span role="img" aria-label="usa flag">🇺🇸</span>
            <span>Eng</span>
            <IoIosArrowDown />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <FaCheckCircle className="text-white text-xl" />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold">SWOO</h1>
            <p className="text-sm text-gray-600">TECH MART</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            <Link href="/">
              HOMES
            </Link>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            PAGES 
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            <Link href="/store">STORE</Link>
          </div>
          <a href="#" className="hover:text-black">CONTACT</a>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
            <FaHeart className="text-gray-500" />
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">WELCOME</p>
            <p className="text-sm font-semibold cursor-pointer hover:text-black">
              LOG IN / REGISTER
            </p>
          </div>

          {/* Cart */}
          <div className="relative flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <FaShoppingCart className="text-gray-600" />
            </div>
            <span className="absolute bottom-5 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.cart ? cartItems.cart.length : 0}
            </span>

            <p className="font-semibold">₹{cartItems.final_total}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
