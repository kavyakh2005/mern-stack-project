'use client'
import React from 'react'
import { IoIosPricetag } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { axiosInstance, notify } from '@/library/helper'

export default function TopSelling({ url,TopSelling , id, }) {
   const router =useRouter();
       function sellingHandler() {
        axiosInstance.patch(`${url}/topSelling/${id}`)
            .then((res) => {
                notify(res.data.message, res.data.success)
                if (res.data.success) {
                    router.refresh();
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className=''>
            <button onClick={sellingHandler} className={`${TopSelling ? "bg-green-500 text-white" : "bg-red-500 text-white"} rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium cursor-pointer`}>{/* hover:bg-gray-200 */}
                {
                    TopSelling ? "Yes" : "No"
                }
            </button>
        </div>
    )
}
