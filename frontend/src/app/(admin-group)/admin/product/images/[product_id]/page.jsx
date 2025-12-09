"use client"
import React from "react";
import { FiUser, FiLink, FiImage, FiUpload } from "react-icons/fi";
import { useRef, useState } from "react";
import { createSlug, notify } from "@/library/helper";
import { axiosInstance } from "@/library/helper";
import { getProducts } from "@/library/api-call";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useEffect } from "react";


export default function page({ params }) {
    const { product_id } = use(params);
    const [product, setProducts] = useState({});
    const router = useRouter();


    async function getProductById() {
        const productJSON = await getProducts(product_id);
        console.log(productJSON.data)
        setProducts(productJSON.data)
    }

    useEffect(
        () => {
            getProductById()
        },
        [product_id]
    )

    function submitHandler(e) {
        e.preventDefault();

        const formData = new FormData()
        const files = e.target.images.files;

        for (let images of files) {
            formData.append("images", images)
        }



        axiosInstance.patch(`product/images/${product_id}`, formData)
            .then((response) => {
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    router.push("/admin/product")
                }
            }
            ).catch(
                (error) => {
                    // console.log(error.response?.data || error.message)
                    console.log(error)
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

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
                        <div className="w-full max-w-md bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition">
                            <label className="flex flex-col items-center justify-center h-30 cursor-pointer">
                                <FiImage className="text-4xl text-gray-400" />
                                <p className="mt-2 text-gray-500">Click to upload or drag & drop</p>
                                <span className="mt-2 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                                    <FiUpload /> Choose File
                                </span>
                                <input multiple type="file" accept="image/*" name="images" className="hidden" />
                                {
                                    product.images && product.images.map((image, index) => {
                                        <img
                                            key={index}
                                            width={100}
                                            height={100}
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${image}`}
                                            alt=""
                                            className=" rounded object-cover shadow"
                                        />
                                    })
                                }
                            </label>
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
