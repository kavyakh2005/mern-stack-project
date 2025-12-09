'use client'
import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";

export default function ProductView({prod}) {
  const [toggle , setToggle] = useState(null);
  return (
    <div>
      <button onClick={()=> setToggle(prod)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
                  <IoEye />{" "}
                  <span className="hidden sm:inline">View</span>
              </button>
              {toggle && <ProductViewModel product={toggle} close={()=>setToggle(null)} /> }
    </div>
  )
}


const ProductViewModel = ({ product, close }) => {
    return (
        <div className="w-full fixed bottom-0 right-0 z-20 p-6 bg-white shadow-xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                onClick={close}
            >
                Close
            </button>

            <div className="flex flex-col md:flex-row gap-6 ">
                {/* Thumbnail */}
                <div className="w-full md:w-1/3">
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product.thumbnail}`}
                        alt={product.name}
                        className="rounded-lg w-full object-cover h-52"
                    />

                    {product.images?.length > 0 && (
                        <div className="mt-4 flex gap-2 flex-wrap">
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`}
                                    alt={`product-${idx}`}
                                    className="w-16 h-16 object-cover rounded border"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{product.shortDescription}</p>

                    {/* Rating */}
                    {/* <div className="flex items-center gap-2 text-yellow-500 text-sm">

                        <span className="text-sm font-medium text-gray-700">4.2</span>
                    </div> */}


                    <div
                        className="mt-4 space-y-2 text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: product.longDescription }}
                    />



                </div>


                {/* Pricing */}
                <div className="mt-4 flex items-center gap-3">
                    <p className="text-2xl font-bold text-green-600">₹{product.finalPrice}</p>
                    <p className="line-through text-gray-400">₹{product.originalPrice}</p>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        {product.dicountPercentage}% OFF
                    </span>
                </div>


            </div>
        </div>


    );
};