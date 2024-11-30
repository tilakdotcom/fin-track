"use client"
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BACKEND_URI,
  withCredentials: true,
})

export default api