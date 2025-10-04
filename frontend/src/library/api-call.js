import axios from "axios";
import { axiosInstance } from "./helper";

async function getCategories() {
  try {
    const response = await axiosInstance.get("category/");
    if (response.data) {
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
