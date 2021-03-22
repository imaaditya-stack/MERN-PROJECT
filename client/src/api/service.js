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
} from "./config";
import { getAuthToken } from "../auth/auth.token";

axios.defaults.headers.common["x-auth-token"] = getAuthToken();

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        console.log(err);
        localStorage.clear();
        window.location.href = "login";
      }
      return Promise.reject(err);
    }
  }
);

export const AUTH_SERVICE = () =>
  axios({
    method: "GET",
    url: AUTH_API,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
  });

export const REGISTER_SERVICE = (data) =>
  axios({
    method: "POST",
    url: REGISTER_API,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });

export const LOGIN_SERVICE = (data) =>
  axios({
    method: "POST",
    url: LOGIN_API,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  });

export const PROFILE_SERVICE = (data) =>
  axios({
    method: "POST",
    url: PROFILE_API,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
    data: data,
  });

export const PROFILES_SERVICE = () =>
  axios({
    method: "GET",
    url: PROFILES_API,
    headers: {
      "content-type": "application/json",
    },
  });

export const GET_PROFILE_SERVICE = () =>
  axios({
    method: "GET",
    url: PROFILE_API,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
  });

export const EXP_SERVICE = (data) =>
  axios({
    method: "PUT",
    url: EXP_API,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
    data: data,
  });

export const DEL_EXP_SERVICE = (id) =>
  axios({
    method: "DELETE",
    url: `${EXP_API}/${id}`,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
  });

export const EDU_SERVICE = (data) =>
  axios({
    method: "PUT",
    url: EDU_API,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
    data: data,
  });

export const DEL_EDU_SERVICE = (id) =>
  axios({
    method: "DELETE",
    url: `${EDU_API}/${id}`,
    headers: {
      "content-type": "application/json",
      "x-auth-token": getAuthToken(),
    },
  });

export const GET_POSTS_SERVICE = () =>
  axios({
    method: "GET",
    url: POSTS_API,
    headers: {
      "content-type": "application/json",
    },
  });
