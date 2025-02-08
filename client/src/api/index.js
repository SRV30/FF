import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originRequest = error.config;

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

    const response = await axios.post(`${backendUrl}/api/user/refresh-token`, {
      refreshToken,
    });

    if (!response.data.success) {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshToken");
    }

    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accesstoken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

export default axiosInstance;
