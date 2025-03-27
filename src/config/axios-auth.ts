import { RefreshTokenResponse } from "@/services/types/refresh-token.response";
import ResponseData from "@/types/response.type";
import axios, { InternalAxiosRequestConfig } from "axios";

// Extend the InternalAxiosRequestConfig interface to include _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axios_auth = axios.create({
  baseURL: "http://localhost:3333",
  transformResponse: [
    (data) => {
      // First, parse the JSON string into an object
      const parsedData = JSON.parse(data);

      // Recursively traverse the object and convert ISO date strings to Date objects
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const convertDates = (obj: any): any => {
        if (obj === null || obj === undefined) return obj;

        if (typeof obj === "string") {
          // A simple regex to identify ISO date strings, adjust if needed
          const isoDateRegex =
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
          if (isoDateRegex.test(obj)) {
            return new Date(obj);
          }
          return obj;
        }
        if (typeof obj === "object") {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              obj[key] = convertDates(obj[key]);
            }
          }
        }
        return obj;
      };

      return convertDates(parsedData);
    },
  ],
  validateStatus: function () {
    return true;
  },
});

const axios_base = axios.create({
  baseURL: "http://localhost:3333",
  transformResponse: [
    (data) => {
      // First, parse the JSON string into an object
      const parsedData = JSON.parse(data);

      // Recursively traverse the object and convert ISO date strings to Date objects
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const convertDates = (obj: any): any => {
        if (obj === null || obj === undefined) return obj;

        if (typeof obj === "string") {
          // A simple regex to identify ISO date strings, adjust if needed
          const isoDateRegex =
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
          if (isoDateRegex.test(obj)) {
            return new Date(obj);
          }
          return obj;
        }
        if (typeof obj === "object") {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              obj[key] = convertDates(obj[key]);
            }
          }
        }
        return obj;
      };

      return convertDates(parsedData);
    },
  ],
  validateStatus: function () {
    return true;
  },
});

axios_auth.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axios_auth.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      // Get the original request config
      const originalConfig = response.config as CustomAxiosRequestConfig;

      // If this request has already been retried or no refresh token, don't retry
      if (originalConfig._retry || !localStorage.getItem("refreshToken")) {
        // Clear auth data and redirect to login
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("account");
        window.location.replace("/login");
        return response;
      }

      // Mark as retried
      originalConfig._retry = true;

      try {
        // Use axios_base to avoid sending the expired token
        const res = await axios_base.post<ResponseData<RefreshTokenResponse>>(
          "api/auth/refresh-token",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          }
        );

        if (res.data.status === 200) {
          // If the refresh token is valid
          const newToken = res.data.data?.accessToken;
          if (newToken) {
            localStorage.setItem("accessToken", newToken);

            // Update the auth header for future requests
            axios_auth.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;

            // Update the auth header for this specific request
            originalConfig.headers.Authorization = `Bearer ${newToken}`;

            // Retry the original request with the new token
            return axios_auth(originalConfig);
          }
        }

        // If refresh token failed or newToken is undefined
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("account");
        window.location.replace("/login");
        return response;
      } catch (error) {
        console.log("Interceptor Axios", error);
        // If the refresh token is invalid
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("account");
        window.location.replace("/login");
        return response;
      }
    }
    return response;
  },
  async (error) => {
    console.log("Interceptor Axios", error);
    return Promise.reject(error);
  }
);

export { axios_auth, axios_base };
