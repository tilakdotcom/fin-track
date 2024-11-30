import axios, { AxiosInstance } from "axios";

const api : AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}`,
  withCredentials: true,
})

export default api