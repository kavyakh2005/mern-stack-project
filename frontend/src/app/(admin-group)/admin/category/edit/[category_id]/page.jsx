"use client"
import React from "react";
import { FiUser, FiLink, FiImage, FiUpload } from "react-icons/fi";
import { useRef, useState } from "react";
import { createSlug, notify } from "@/library/helper";
import { axiosInstance } from "@/library/helper";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { getCategories } from "@/library/api-call";
import { useEffect } from "react";

export default function categoryEdit({ params }) {
  const [category, setCategory] = useState({});
  const router = useRouter();
  // To Store the data of name which will be used to create slug 
  const nameRef = useRef();
  const slugRef = useRef();

  async function getcategory() {
    const categoryJSON = await getCategories(params?.category_id);
    console.log(categoryJSON.data)
    setCategory(categoryJSON.data)
  }

  useEffect(
    () => {
      getcategory()
    },
    [params?.category_id]
  )


  // Creating Slug with the help of Name 
  function generateSlug() {
    const slug = createSlug(nameRef.current.value);
    if (slugRef.current) {
      slugRef.current.value = slug;
    }
  }

  console.log(category, "category")


  function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData()
    formData.append("name", nameRef.current.value)
    formData.append("slug", slugRef.current.value)
    // formData.append("image", e.target.category_image.files[0])
    formData.append("image", e.target.category_image.files[0]);


    axiosInstance.put(`category/update/${category._id}`, formData).then(
      (response) => {
        notify(response.data.message, response.data.success)
        if (response.data.success) {
          nameRef.current.value = ""
          slugRef.current.value = ""
          router.push("/admin/category")
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
          {/* Name Field */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">Name</label>
            <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                ref={nameRef}
                defaultValue={category.name}
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
                defaultValue={category.slug}
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
              <label className="flex flex-col items-center justify-center h-30 cursor-pointer">
                <FiImage className="text-4xl text-gray-400" />
                <p className="mt-2 text-gray-500">Click to upload or drag & drop</p>
                <span className="mt-2 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                  <FiUpload /> Choose File
                </span>
                <input type="file" accept="image/*" name="category_image" className="hidden" />
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/category/${category.image}`}
                  alt={category.name}
                  className="h-10 w-10 rounded object-cover shadow"
                />
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
