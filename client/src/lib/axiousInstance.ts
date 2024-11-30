import axios, { AxiosInstance } from "axios";

const api : AxiosInstance = axios.create({
  baseURL: 'api/v1',
  withCredentials: true,
})

export default api