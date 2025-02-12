// src/api/index.js
import axios from "axios";
import { logoutUser } from "@/store/auth-slice/user"; // Adjust the import path as needed

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000",
  withCredentials: true,
});

// Request interceptor: attach access token if available
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle token expiration and automatic logout
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response if it's successful
  async (error) => {
    const originalRequest = error.config;
    // If the error status is 401 and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Set a retry flag

      // Attempt to refresh the token using the refresh token from localStorage
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      }
      // If refresh fails or there's no refresh token, dispatch logout
      const { default: store } = await import("@/store/store");
      store.dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

// Function to refresh the access token using the refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";
    const response = await axios.post(
      `${backendUrl}/api/user/refresh-token`,
      { refreshToken }
    );
    if (!response.data.success) {
      throw new Error("Refresh token invalid");
    }
    const newAccessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return null;
  }
};

export default axiosInstance;
