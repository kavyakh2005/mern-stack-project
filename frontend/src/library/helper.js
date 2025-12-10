function createSlug(text) {
  return text
    .toString() // Ensure it's a string
    .trim() // Remove extra spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single
}

import { ToastContainer, toast } from "react-toastify";
const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

function getCookies(name){
  const match = document.cookie.match(new RegExp('(^|)' + name + '=([^;]+)'));
  if(match) return match[2];
  return null
}

export { createSlug , notify , axiosInstance , getCookies};