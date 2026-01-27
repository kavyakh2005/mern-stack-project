'use client'
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addtocart } from '@/redux/features/cartSlice';

export default function AddToCart({ product }) {
    const dispatcher = useDispatch();
    return (
        <div>
            {/* Add to Cart */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                onClick={() => {
                    dispatcher(addtocart({
                        productId: product._id,
                        originalPrice: product.originalPrice,
                        finalPrice: product.finalPrice,
                    }))
                }}>
                <FaShoppingCart />
                Add to Cart
            </button>
        </div>
    )
}
