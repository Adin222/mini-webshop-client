import axios from "axios";
import { refreshPath } from "../paths/paths";
import { getToken } from "../utils/utils";

const apiBase = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        await API.post(`${refreshPath}`, null, { withCredentials: true });
        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const Post = async (path, data) => {
  try {
    const response = await API.post(path, data, {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": getToken("csrftoken"),
        "x-session-id": getToken("session_id"),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const Patch = async (path, data, id) => {
  try {
    const response = await API.patch(`${path}${id}`, data, {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": getToken("csrftoken"),
        "x-session-id": getToken("session_id"),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const Delete = async (path, id) => {
  try {
    const response = await API.delete(`${path}${id}`, {
      withCredentials: true,
      headers: {
        "X-CSRF-Token": getToken("csrftoken"),
        "x-session-id": getToken("session_id"),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const Get = async (path) => {
  try {
    const response = await API.get(path, { withCredentials: true });
    return response;
  } catch (error) {
    return error.response;
  }
};
