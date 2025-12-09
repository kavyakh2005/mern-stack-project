'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { axiosInstance ,notify} from '@/library/helper'


export default function StockAvailabilty({url,stock,id}) {
   const router =useRouter();
       function stockHandler() {
        axiosInstance.patch(`/${url}/stock/${id}`)
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
        <button onClick={stockHandler} className={`${stock ? "bg-green-500 text-white" : "bg-red-500 text-white"} rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium cursor-pointer`}>{/* hover:bg-gray-200 */}
            {
                stock ? "In Stock" : "Out of Stock"
            }
        </button>
    )
}
