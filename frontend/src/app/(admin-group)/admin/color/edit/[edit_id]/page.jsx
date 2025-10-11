"use client"
import React from "react";
import { FiUser, FiLink, FiImage, FiUpload } from "react-icons/fi";
import { useRef, useState } from "react";
import { createSlug, notify } from "@/library/helper";
import { axiosInstance } from "@/library/helper";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { getColor } from "@/library/api-call";
import { useEffect } from "react";

export default function categoryEdit({ params }) {
    const [color, setColor] = useState({});
    const router = useRouter();
    // To Store the data of name which will be used to create slug 
    const nameRef = useRef();
    const slugRef = useRef();

    async function getcategory() {
        // const colorJSON = await getColor(params?.colors_id);
        const colorJSON = await getColor(params?.edit_id);
        console.log(colorJSON.data)
        setColor(colorJSON.data)
    }

    useEffect(
        () => {
            getcategory()
        },
        // [params?.colors_id]
        [params?.edit_id]
    )


    // Creating Slug with the help of Name 
    function generateSlug() {
        const slug = createSlug(nameRef.current.value);
        if (slugRef.current) {
            slugRef.current.value = slug;
        }
    }

    console.log(color, "color")
    console.log(color.data)


    function submitHandler(e) {
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            slug: slugRef.current.value,
            // hexcode: e.target.hexcode.value
            hexcode: e.target.elements.hexcode?.value
        }

        axiosInstance.put(`color/update/${color._id}`, data).then(
            (response) => {
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    nameRef.current.value = ""
                    slugRef.current.value = ""
                    router.push("/admin/color")
                }
            }
        ).catch(
            (error) => {
                // console.log(error.response?.data || error.message)
                console.log(error)
                notify(error.response?.data?.message || error.message, false);
            }
        )
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6 pt-0">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 pt-0">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Update Entry
                </h2>

                <form className="space-y-5" onSubmit={submitHandler}>
                    {/* Name Field */}
                    <div>
                        <label className="block text-gray-600 mb-2 font-medium">Name</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                            <FiUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                ref={nameRef}
                                defaultValue={color.name}
                                onChange={generateSlug}
                                placeholder="Enter name"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Slug Field */}
                    <div>
                        <label className="block text-gray-600 mb-2 font-medium">Slug</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                            <FiLink className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                ref={slugRef}
                                defaultValue={color.slug}
                                disabled
                                placeholder="Enter slug"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
                        <div className="w-full max-w-md bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition">
                            <input type="color" name="hexcode" defaultValue={color.hexcode} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
