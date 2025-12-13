'use client'

import { FaTrash } from "react-icons/fa";
import React, { use } from 'react'
import { axiosInstance, notify } from "@/library/helper";
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function DeleteBtn({ id, url }) {
    const router = useRouter();
    function deleteHandler() {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
                }).then((result) => {
            if (result.isConfirmed) {
                
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });

                axiosInstance.delete(`${url}/delete/${id}`)
            .then((res) => {
                notify(res.data.message, res.data.success)
                if (res.data.success) {
                    router.refresh();
                }
            }).catch((err) => {
                notify("Deletion Failed", false)
                console.log(err)
            })
            }
        });

        
    }
    return (
        <button onClick={deleteHandler} className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
            <FaTrash />{" "}
            <span className="hidden sm:inline">Delete</span>
        </button>
    )
}
