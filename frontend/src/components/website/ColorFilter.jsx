import { getColor } from '@/library/api-call';
import React from 'react';
import Link from 'next/link';

const ColorFilter = async () => {
    const colorData = await getColor(null)
    const colors = colorData.data

    return (
        <div className="bg-[#f1f2f6] rounded-lg p-4 w-[360px] font-sans">
            <h2 className="font-bold text-lg mb-4">COLORS</h2>
            <Link href="/store">
                <button className="bg-white font-semibold text-sm px-4 py-2 rounded-md shadow-sm mb-4">
                    All Colors
                </button>
            </Link>


            <div>
                <ul className="flex flex-wrap gap-3 text-sm text-gray-700">
                    {colors.map((item, index) => (
                        <li key={index}>
                            <div
                                className="w-8 h-8 rounded-md cursor-pointer"
                                style={{ backgroundColor: item.hexcode }}
                            ></div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default ColorFilter;