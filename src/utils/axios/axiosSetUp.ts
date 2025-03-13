import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL for API
const API_BASE_URL =
  "https://2851-2001-44c8-4627-9dba-22d7-5abe-6e95-d3cc.ngrok-free.app";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("jwt_token"); // Logout user on 401
    }
    return Promise.reject(error);
  }
);

export default api;
