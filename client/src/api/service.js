import axios from "axios";
import {
  AUTH_API,
  REGISTER_API,
  LOGIN_API,
  PROFILE_API,
  PROFILES_API,
  EXP_API,
  EDU_API,
  POSTS_API,
  POST_LIKE_API,
  POST_UNLIKE_API,
} from "./config";
import { getAuthToken } from "../auth/auth.token";

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  (config) => {
    config.headers["x-auth-token"] = getAuthToken();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        localStorage.clear();
      }
      return Promise.reject(err);
    }
  }
);

export const AUTH_SERVICE = () => apiClient.get(AUTH_API);

export const REGISTER_SERVICE = (data) => apiClient.post(REGISTER_API, data);

export const LOGIN_SERVICE = (data) => apiClient.post(LOGIN_API, data);

export const PROFILE_SERVICE = (data) => apiClient.post(PROFILE_API, data);

export const PROFILES_SERVICE = () => apiClient.get(PROFILES_API);

export const GET_PROFILE_SERVICE = () => apiClient.get(PROFILE_API);

export const EXP_SERVICE = (data) => apiClient.put(EXP_API, data);

export const DEL_EXP_SERVICE = (id) => apiClient.delete(`${EXP_API}/${id}`);

export const EDU_SERVICE = (data) => apiClient.put(EDU_API, data);

export const DEL_EDU_SERVICE = (id) => apiClient.delete(`${EDU_API}/${id}`);

export const GET_POSTS_SERVICE = () => apiClient.get(POSTS_API);

export const ADD_POST_SERVICE = (data) => apiClient.post(POSTS_API, data);

export const POST_LIKE_SERVICE = (id) =>
  apiClient.put(`${POST_LIKE_API}/${id}`);

export const POST_UNLIKE_SERVICE = (id) =>
  apiClient.put(`${POST_UNLIKE_API}/${id}`);

export const POST_DELETE_SERVICE = (id) =>
  apiClient.delete(`${POSTS_API}/${id}`);
