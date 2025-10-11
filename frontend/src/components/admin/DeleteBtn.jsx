'use client'

import { FaTrash } from "react-icons/fa";
import React, { use } from 'react'
import { axiosInstance, notify } from "@/library/helper";
import {useRouter} from 'next/navigation'

export default function DeleteBtn({ id , url}) {
    const router = useRouter();
    function deleteHandler() {
        axiosInstance.delete(`${url}/delete/${id}`)
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
        <button onClick={deleteHandler} className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
            <FaTrash />{" "}
            <span className="hidden sm:inline">Delete</span>
        </button>
    )
}
