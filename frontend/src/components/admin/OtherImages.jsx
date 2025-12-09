'use client'
import React from 'react'
import { FaImages } from "react-icons/fa";

export default function OtherImages() {
    return (
        <div>
            <button className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
                <FaImages />{" "}
                <span className="hidden sm:inline">Images</span>
            </button>
        </div>
    )
}
