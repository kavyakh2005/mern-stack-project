'use client'
import { createSlug, axiosInstance, notify } from "@/library/helper";
import React from "react";
import Select from 'react-select'
import {
    FaTag,
    FaDollarSign,
    FaPercentage,
    FaClipboardList,
    FaRegListAlt,
    FaStore,
    FaBoxOpen,
    FaImage,
    FaImages,
    FaPalette,
} from "react-icons/fa";
import { MdOutlineCategory, MdSell } from "react-icons/md";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TextEditor from "./TextEditor";

export default function ProductForm({ category, brand, color }) {
    const router = useRouter();

    const [msg, setMsg] = useState("")
    const [selColors, setSelColors] = useState([])
    const [selCategory, setSelCategory] = useState(null)
    const [selBrand, setSelBrand] = useState(null)
    const [longDescription, setLongDescription] = useState("");

    const nameRef = useRef();
    const slugRef = useRef();
    const originalRef = useRef();
    const discountRef = useRef();
    const finalPriceRef = useRef();

    // Creating Slug with the help of Name
    function generateSlug(name) {
        const slug = createSlug(nameRef.current.value);
        slugRef.current.value = slug;
    }

        console.log("long Description ", longDescription)

    function priceCalculator() {
        const originalPrice = parseFloat(originalRef.current.value) || 0;
        const discountPercentage = parseFloat(discountRef.current.value) || 0;
        const discountAmount = (originalPrice * discountPercentage) / 100;
        const finalPrice = originalPrice - discountAmount;
        finalPriceRef.current.value = finalPrice.toFixed(2);
    }

    function submitHandler(e) {
        e.preventDefault();

        const formData = new FormData()

        formData.append("name", nameRef.current.value);
        formData.append("slug", slugRef.current.value);
        formData.append("originalPrice", originalRef.current.value);
        formData.append("dicountPercentage", discountRef.current.value);
        formData.append("finalPrice", finalPriceRef.current.value);
        formData.append("shortDescription", e.target.shortDescription.value);
        formData.append("longDescription", e.target.longDescription.value);
        // formData.append("longDescription", longDescription);
        formData.append("categoryID", selCategory?.value);
        formData.append("brandId", selBrand?.value);
        // formData.append("colorID", JSON.stringify(selColors))
        formData.append("colorID", JSON.stringify(selColors || []));
        // formData.append("colors", JSON.stringify(selColors))
        if (e.target.thumbnail.files.length > 0) {
            formData.append("thumbnail", e.target.thumbnail.files[0]);
        }
        // formData.append("stock", e.target.stock.value);
        // formData.append("topSelling", e.target.topSelling.checked ? true : false);
        // formData.append("images", e.target.category_image.files[0]);


        axiosInstance.post('product/create', formData).then(
            (response) => {
                console.log(response.data)
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    nameRef.current.value = ""
                    slugRef.current.value = ""
                    router.push("/admin/product")
                }
            }
        ).catch(
            (error) => {
                // console.log(error.response?.data || error.message)
                console.log(error)
                // notify(error.response?.data?.message || error.message, false)
                // if (error.response?.status == 400) {
                //     setMsg("Category Already There")
                // } else {
                //     setMsg("All Fields are Required")
                // }

                const msg =
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong";

                notify(msg, false);
                setMsg(msg);
            }
        )
    }


    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
                🛒 Add New Product
            </h2>

            <form className="space-y-6" onSubmit={submitHandler}>
                {/* Product Name */}
                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                    <FaTag className="text-gray-500 text-xl mr-3" />
                    <input
                        name="name"
                        type="text"
                        onChange={generateSlug}
                        ref={nameRef}
                        placeholder="Product Name"
                        className="w-full outline-none text-gray-700"
                    />
                </div>

                {/* Slug */}
                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                    <FaClipboardList className="text-gray-500 text-xl mr-3" />
                    <input
                        name="slug"
                        type="text"
                        ref={slugRef}
                        disabled
                        placeholder="Slug (unique)"
                        className="w-full outline-none text-gray-700"
                    />
                </div>

                {/* Short Description */}
                <div className="flex items-center border border-gray-300 rounded-lg p-2">
                    <FaRegListAlt className="text-gray-500 text-xl mr-3" />
                    <input
                        name="shortDescription"
                        type="text"
                        placeholder="Short Description"
                        className="w-full outline-none text-gray-700"
                    />
                </div>

                {/* Full Description */}
                <div className="border border-gray-300 rounded-lg p-2">
                    <textarea
                        name="longDescription"
                        placeholder="Full Description"
                        rows="4"
                        className="w-full outline-none text-gray-700 resize-none"
                    ></textarea>
                    {/* <TextEditor value={longDescription} onChangeHandler={(value)=>setLongDescription(value)}/> */}
                </div>

                {/* Pricing Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg p-2">
                        <FaDollarSign className="text-gray-500 text-xl mr-3" />
                        <input
                            name="originalPrice"
                            type="number"
                            ref={originalRef}
                            onChange={priceCalculator}
                            placeholder="Original Price"
                            className="w-full outline-none text-gray-700"
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg p-2">
                        <FaPercentage className="text-gray-500 text-xl mr-3" />
                        <input
                            name="dicountPercentage"
                            type="number"
                            ref={discountRef}
                            onChange={priceCalculator}
                            placeholder="Discount (%)"
                            className="w-full outline-none text-gray-700"
                        />
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg p-2">
                        <FaDollarSign className="text-gray-500 text-xl mr-3" />
                        <input
                            name="finalPrice"
                            type="number"
                            ref={finalPriceRef}
                            readOnly
                            placeholder="Final Price"
                            className="w-full outline-none text-gray- cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Category, Brand, and Color */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-2">
                        <MdOutlineCategory className="text-gray-500 text-xl mr-3" />
                        <Select
                            name="categoryID"
                            onChange={setSelCategory}
                            placeholder="Category"
                            className="w-full outline-none text-gray-700 bg-transparent"
                            options={category?.map((cat) => ({
                                value: cat._id,
                                label: cat.name,
                            }))} />
                    </div>

                    {/* Brand */}
                    <div className="flex items-center bord  er border-gray-300 rounded-lg p-2">
                        <FaStore className="text-gray-500 text-xl mr-3" />
                        <Select
                            name="brandID"
                            onChange={setSelBrand}
                            placeholder="Brand"
                            className="w-full outline-none text-gray-700 bg-transparent"
                            options={brand?.map((br) => ({
                                value: br._id,
                                label: br.name,
                            }))} />

                    </div>

                    {/* Color */}
                    <div className="flex items-center border border-gray-300 rounded-lg p-2">
                        <FaPalette className="text-gray-500 text-xl mr-3" />
                        <Select
                            name="colorID"
                            onChange={(data) => {
                                const colorsData = data?.map((item) => item.value)
                                setSelColors(colorsData)    
                            }}
                            placeholder="Color"
                            className="w-full outline-none text-gray-700 bg-transparent"
                            isMulti
                            closeMenuOnSelect={false}
                            options={color?.map((col) => ({
                                value: col._id,
                                label: col.name,
                            }))} />
                    </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <FaImage className="text-gray-600 text-2xl" />
                        <span className="text-gray-700 font-medium">Thumbnail Image</span>
                    </div>
                    <input
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                    />
                </div>

                {/* Product Gallery Images */}
                <div className="border border-gray-300 rounded-lg p-4">
                    {/* <div className="flex items-center gap-3 mb-3">
                        <FaImages className="text-gray-600 text-2xl" />
                        <span className="text-gray-700 font-medium">Product Gallery Images</span>
                    </div> */}

                    {/* <input
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                    /> */}

                    {/* 5 Image Preview Boxes */}
                    {/* <div className="flex gap-3 mt-3 flex-wrap">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-20 h-20 rounded-lg border border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center"
                            >
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt={`preview-${i}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div> */}
                </div>

               

                {/* Submit Button */}
                <button
                    className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                    Submit Product
                </button>
            </form >
        </div >
    );
}
