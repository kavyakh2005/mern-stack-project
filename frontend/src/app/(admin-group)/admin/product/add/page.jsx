'use client'
import { createSlug, axiosInstance, notify } from "@/library/helper";
import React, { useRef, useState, useEffect } from "react";
import Select from 'react-select';
import {
  FaTag, FaDollarSign, FaPercentage, FaClipboardList, FaRegListAlt, FaStore, FaImage, FaPalette
} from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { getCategories, getBrand, getColor } from "@/library/api-call";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();

  const [msg, setMsg] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [colorList, setColorList] = useState([]);

  const [selCategory, setSelCategory] = useState(null);
  const [selBrand, setSelBrand] = useState(null);
  const [selColors, setSelColors] = useState([]);

  const nameRef = useRef();
  const slugRef = useRef();
  const originalRef = useRef();
  const discountRef = useRef();
  const finalPriceRef = useRef();

  // fetch dropdown data
  useEffect(() => {
    (async () => {
      const categoryRes = await getCategories();
      setCategoryList(categoryRes.data);

      const brandRes = await getBrand();
      setBrandList(brandRes.data);

      const colorRes = await getColor();
      setColorList(colorRes.data);
    })();
  }, []);

  function generateSlug() {
    const slug = createSlug(nameRef.current.value);
    slugRef.current.value = slug;
  }

  function priceCalculator() {
    const original = parseFloat(originalRef.current.value) || 0;
    const discount = parseFloat(discountRef.current.value) || 0;
    const final = original - (original * discount) / 100;
    finalPriceRef.current.value = final.toFixed(2);
  }

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", nameRef.current.value);
    formData.append("slug", slugRef.current.value);
    formData.append("originalPrice", originalRef.current.value);
    formData.append("discountPercentage", discountRef.current.value);
    formData.append("finalPrice", finalPriceRef.current.value);
    formData.append("shortDescription", e.target.shortDescription.value);
    formData.append("longDescription", e.target.longDescription.value);
    formData.append("categoryID", selCategory?.value);
    formData.append("brandID", selBrand.value);
    formData.append("colorID", JSON.stringify(selColors));

    if (e.target.thumbnail.files.length > 0) {
      formData.append("thumbnail", e.target.thumbnail.files[0]);
    }

    axiosInstance.post("product/create", formData)
      .then(res => {
        notify(res.data.message, res.data.success);
        if (res.data.success) router.push("/admin/product");
      })
      .catch(err => {
        const msg = err.response?.data?.message || err.message || "Something went wrong";
        notify(msg, false);
        setMsg(msg);
      });
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
          <input name="name" type="text" ref={nameRef} onChange={generateSlug} placeholder="Product Name"
            className="w-full outline-none text-gray-700" />
        </div>

        {/* Slug */}
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaClipboardList className="text-gray-500 text-xl mr-3" />
          <input name="slug" type="text" ref={slugRef} disabled placeholder="Slug (auto generated)"
            className="w-full outline-none text-gray-700" />
        </div>

        {/* Short Description */}
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaRegListAlt className="text-gray-500 text-xl mr-3" />
          <input name="shortDescription" type="text" placeholder="Short Description"
            className="w-full outline-none text-gray-700" />
        </div>

        {/* Full Description */}
        <textarea name="longDescription" rows={4} placeholder="Full Description"
          className="w-full border border-gray-300 rounded-lg p-3 outline-none text-gray-700"></textarea>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="number" ref={originalRef} onChange={priceCalculator} placeholder="Original Price"
            className="border border-gray-300 rounded-lg p-2 outline-none" />
          <input type="number" ref={discountRef} onChange={priceCalculator} placeholder="Discount (%)"
            className="border border-gray-300 rounded-lg p-2 outline-none" />
          <input type="number" ref={finalPriceRef} placeholder="Final Price" readOnly
            className="border border-gray-300 rounded-lg p-2 outline-none cursor-not-allowed" />
        </div>

        {/* Category / Brand / Color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select placeholder="Category" onChange={setSelCategory}
            options={categoryList.map(c => ({ value: c._id, label: c.name }))} />
          <Select placeholder="Brand" onChange={setSelBrand}
            options={brandList.map(b => ({ value: b._id, label: b.name }))} />
          <Select placeholder="Color" isMulti closeMenuOnSelect={false}
            onChange={d => setSelColors(d?.map(i => i.value) || [])}
            options={colorList.map(col => ({ value: col._id, label: col.name }))} />
        </div>

        {/* Thumbnail */}
        <div className="border border-gray-300 rounded-lg p-4">
          <FaImage className="inline text-xl text-gray-600 mr-3" />
          <span className="font-medium text-gray-700">Thumbnail</span>
          <input name="thumbnail" type="file" accept="image/*" className="mt-3" />
        </div>

        {/* Submit */}
        <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
          Submit Product
        </button>
      </form>

      {msg && <p className="text-red-500 mt-3 text-center">{msg}</p>}
    </div>
  );
}
