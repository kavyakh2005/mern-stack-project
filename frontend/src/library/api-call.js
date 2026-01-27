// import axios from "axios";
import { axiosInstance } from "./helper";
import categoryEdit from "@/app/(admin-group)/admin/category/edit/[category_id]/page";

async function getCategories(id = null) {
  try {
    let API = "category";
    if (id != null) API += `/${id}`;
    // http://localhost:5000/category/
    // http://localhost:5000/category/68e28613cd62bbda4b9d3dc4
    const response = await axiosInstance.get(`${API}/`);
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
    console.log(error);
  }
}

async function getColor(id = null) {
  try {
    let API = "color";
    if (id != null) API += `/${id}`;
    // console.log(API , "API")
    // http://localhost:5000/category/
    // http://localhost:5000/category/68e28613cd62bbda4b9d3dc4
    const response = await axiosInstance.get(`${API}/`);
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
    console.log(error);
  }
}

async function getBrand(id = null) {
  try {
    let API = "brand";
    if (id != null) API += `/${id}`;
    // http://localhost:5000/category/
    // http://localhost:5000/category/68e28613cd62bbda4b9d3dc4
    const response = await axiosInstance.get(`${API}/`);
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
    console.log(error);
  }
}

async function getProducts(
  id = null,
  categorySlug = null,
  colorSlug = null,
  brandSlug = null,
  min = null,
  max = null
) {
  try {
    let API = "product";

    if (id != null) API += `/${id}`;

    const query = new URLSearchParams();

    if (categorySlug) query.append("categorySlug", categorySlug);
    if (colorSlug) query.append("colorSlug", colorSlug);
    if (brandSlug) query.append("brandSlug", brandSlug);
    if (min) query.append("min", min);
    if (max) query.append("max", max);

    // http://localhost:5000/product/
    // http://localhost:5000/product/68e28613cd62bbda4b9d3dc4

    const response = await axiosInstance.get(API + `?${query.toString()}`);

    if (response.data.success === true) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// async function getProducts(id = null) {
//   try {
//     let API = "product";
//     if (id) API += `/${id}`;

//     const response = await axiosInstance.get(API);
//     if (response.data.success) return response.data;
//     return null;

//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export { getCategories, getColor, getBrand, getProducts };
