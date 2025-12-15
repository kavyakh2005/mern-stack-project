import { getBrand, getCategories } from '@/library/api-call';
import React from 'react';
import Link from 'next/link';

const BrandFilter = async () => {
    const brandData = await getBrand(null);
    const brands = brandData.data

    return (
        <div className="bg-[#f1f2f6] rounded-lg p-4 w-[360px] font-sans">
            <h2 className="font-bold text-lg mb-4">BRANDS</h2>
        <Link href="/store">
                <button className="bg-white font-semibold text-sm px-4 py-2 rounded-md shadow-sm mb-4">
                    All Brands
                </button>
            </Link>


            <div>
                <ul className="space-y-1 text-sm text-gray-700">
                    {brands.map((item, index) => (
                        <li key={index} className="cursor-pointer space-y-3 hover:font-bold flex justify-between ">
                            <Link href={`/store/${item.slug}`}><span> {item.name}</span></Link>
                            <b>({item.productCount})</b>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BrandFilter;