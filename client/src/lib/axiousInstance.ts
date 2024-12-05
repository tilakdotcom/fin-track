import axios, { AxiosInstance } from "axios";

if(!import.meta.env.VITE_BACKEND_URI){
  throw new Error("Missing VITE_BACKEND_URI environment variable")  // this will stop the build if VITE_BACKEND_URI is not provided in .env.local or .env file.  Note: .env.local is ignored by git.
 
}

const api : AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}`,
  withCredentials: true,
})

export default api