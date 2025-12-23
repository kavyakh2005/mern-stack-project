'use client'
import { getBrand } from '@/library/api-call';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BrandFilter = () => {


    const router = useRouter()
    const [brands, setBrands] = useState([]);
    const [selBrand, setSelBrand] = useState("")

    useEffect(
        () => {
            if (selBrand) {
                const query = new URLSearchParams({ brand: selBrand })
                console.log(query)
                router.push(`?${query.toString()}`)
            }
        }, [selBrand]
    )

    async function getData() {
        const brandData = await getBrand(null);
        setBrands(brandData.data)
    }



    useEffect(
        () => {
            getData()
        },
        []
    )

    return (
        <div className="bg-[#f1f2f6] rounded-lg p-4 w-[360px] font-sans">
            <h2 className="font-bold text-lg mb-4">BRANDS</h2>
            <Link href="/store">
                <button className="bg-white font-semibold text-sm px-4 py-2 rounded-md shadow-sm mb-4 cursor-pointer hover:bg-gray-100 w-full">
                    All Brands
                </button>
            </Link>


            <div>
                <ul className="space-y-1 text-sm text-gray-700">
                    {brands.map((item, index) => (
                        <li key={index} onClick={() => setSelBrand(item.slug)} className="cursor-pointer space-y-3 hover:font-bold flex justify-between ">
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