// import axios from "axios";
import { axiosInstance } from "./helper";
import categoryEdit from "@/app/(admin-group)/admin/category/edit/[category_id]/page";

async function getCategories(id = null) {
  try {
    let API = "category"
       if (id != null) API += `/${id}`
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

export { getCategories };
