"use client"
import { FiUser, FiLink, FiImage, FiUpload } from "react-icons/fi";
import { useRef, useState } from "react";
import { createSlug, notify } from "@/library/helper";
import axios from "axios";
// import { useRouter } from "next/navigation";

export default function ModernFormUI() {
  // To Store the data of name which will be used to create slug 
  const nameRef = useRef();
  const slugRef = useRef();

  // Creating Slug with the help of Name 
  function generateSlug() {
    const slug = createSlug(nameRef.current.value);
    slugRef.current.value = slug
  }

  const [msg, setMsg] = useState("")

  function submitHandler(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value
    }
    axios.post("http://localhost:5000/category/create", data).then(
      (response) => {
        console.log(response.data)
        notify(response.data.message, response.data.success)
        if (response.data.success) {
          nameRef.current.value = ""
          slugRef.current.value = ""
        }
      }
    ).catch(
      (error) => {
        console.log(error.response?.data || error.message)
        if (error.response?.data) {
          setMsg("This Category is Already There")
        }
      }
    )
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Entry
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
                onChange={generateSlug}
                placeholder="Enter name"
                className="w-full outline-none text-gray-700"
              />
            </div>
            <span className="text-red-500">{msg}</span>
          </div>

          {/* Slug Field */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">Slug</label>
            <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FiLink className="text-gray-400 mr-2" />
              <input
                type="text"
                ref={slugRef}
                disabled
                placeholder="Enter slug"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">Image</label>
            <div className="border-dashed border-2 border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition">
              <FiImage className="mx-auto text-3xl text-gray-400" />
              <p className="text-gray-500 mt-2">Click to upload or drag & drop</p>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                  <FiUpload /> Upload Image
                </button>
              </div>
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
