import axios from "axios";

// Create axios instance with fixed base api

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

export default axiosInstance;
