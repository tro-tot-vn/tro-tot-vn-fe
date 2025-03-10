import axios from "axios";

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
});
axios_auth.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// axios_auth.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config; // get the original request
//     if (
//       error.response.status === 401 && // if the error is 401 Unauthorized
//       !originalRequest._retry // and the original request has not been retried yet
//     ) {
//       originalRequest._retry = true; // mark the original request as retried
//       try {
//         const res = await axios_auth.post<ResponseData<AccessToken>>(
//           "/refresh-token",
//           {
//             refreshToken: localStorage.getItem("refreshToken"),
//           }
//         );
//         if (res.data.success) {
//           // if the refresh token is valid
//           axios_auth.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${res.data.data.accessToken}`;
//           return axios_auth(originalRequest); // retry the original request
//         }
//       } catch (error) {
//         console.log("Intercepter Axios", error);
//         // if the refresh token is invalid
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");
//         window.location.href = "/";
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export { axios_auth, axios_base };
