"use client"

import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

export default function ProductListing() {
  // Dummy product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality sound with noise cancellation",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and notifications",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable and powerful sound",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Laptop Backpack",
      description: "Durable backpack for daily use",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Gaming Mouse",
      description: "High precision and ergonomic design",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Wireless Charger",
      description: "Fast charging for all devices",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{product.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-indigo-600">${product.price}</span>
                <button className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 flex items-center gap-1">
                  <FaCartPlus /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
