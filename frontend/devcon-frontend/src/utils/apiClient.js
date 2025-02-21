import axios from "axios";
import store from "../app/store";
import { loginAsync, logoutAsync, refreshTokenAsync } from "../features/auth/authSlice";

const apiClient = axios.create({
  baseURL: "https://devcon-swart.vercel.app",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "TokenExpiredError" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { payload } = await store.dispatch(refreshTokenAsync()).unwrap();
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.token}`;
        originalRequest.headers["Authorization"] = `Bearer ${payload.token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutAsync());
        return Promise.reject(refreshError);
      }
    }

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiClient;
