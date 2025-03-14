import axios from "axios";

const API_DOMAIN = "http://localhost:3333/api/auth/";

export const get = async (path: string) => {
  const response = await axios.get(API_DOMAIN + path);
  return response.data;
};

export const post = async (path: string, options: object) => {
  const response = await axios.post(API_DOMAIN + path, options, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const del = async (path: string) => {
  const response = await axios.delete(API_DOMAIN + path);
  return response.data;
};

export const patch = async (path: string, options: object) => {
  const response = await axios.patch(API_DOMAIN + path, options, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
