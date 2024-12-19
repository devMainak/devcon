import axios from "axios";
import { refreshTokenAsync, logoutAsync } from "../features/auth/authSlice";

const createApiClient = (token, dispatch) => {
  // Create an Axios instance
  const apiClient = axios.create({
    baseURL: "https://devcon-swart.vercel.app",
    withCredentials: true, // Include cookies in requests
  });

  // Request Interceptor to add Authorization header
  apiClient.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor to handle expired tokens
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is due to an expired token and retry hasn't been done
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "TokenExpiredError" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // Prevent infinite loops

        try {
          // Attempt to refresh the token
          const { payload } = await dispatch(refreshTokenAsync()).unwrap();

          // Update the authorization header with the new token
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${payload.token}`;
          originalRequest.headers["Authorization"] = `Bearer ${payload.token}`;

          // Retry the original request with the new token
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, logout user
          dispatch(logoutAsync());
          return Promise.reject(refreshError);
        }
      }

      // Handle other errors
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
