// lib/axios.ts
import { getSession } from "@/lib/auth/get-session";
import axios from "axios";

const middlewareAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_ENDPOINT, // Set your base URL in .env
});

// Request interceptor to attach token
middlewareAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    config.headers["Content-Type"] = "application/json";
    if (session) {
      config.headers.Authorization = `Bearer ${session?.token!}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default middlewareAxios;
