'use client'
import { axiosInstance, notify } from '@/library/helper'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function StatusBtn({ status, id, url }) {
    const router = useRouter();

    function statusHandler() {
        axiosInstance.patch(`${url}/status/${id}`)
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
        <button onClick={statusHandler} className={`${status ? "bg-green-500 text-white" : "bg-red-500 text-white"} rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium cursor-pointer`}>{/* hover:bg-gray-200 */}
            {
                status ? "Active" : "InActive"
            }
        </button>
    )
}
