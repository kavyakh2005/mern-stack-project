'use client'
import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const PriceFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [price, setPrice] = useState([]);

    useEffect(() => {
        const min = searchParams.get("min") || 0;
        const max = searchParams.get("max") || 100000;
        setPrice([Number(min), Number(max)]);
    }, [searchParams])

    function changeHandler(data) {
        setPrice(data)
        const query = new URLSearchParams();
        query.set("min", data[0]);
        query.set("max", data[1]);
        router.push(`?${query.toString()}`);
    }


    return (
        <div className="bg-[#f1f2f6] rounded-lg p-4 w-[360px] font-sans">
            <h2 className="font-bold text-lg mb-4">COLORS</h2>

            <div className='flex justify-between my-3'>
                <label>{price[0]}</label>
                <span>-</span>
                <label>{price[1]}</label>
            </div>
            <RangeSlider min="1" max="100000" defaultValue={[1000, 10000]} onInput={changeHandler} value={price} />

        </div>
    );
};

export default PriceFilter;