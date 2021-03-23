import { LOAD_USER, AUTH_ERROR, LOGOUT } from "./types";

const loadUser = (user) => ({
  type: LOAD_USER,
  paylaod: {
    user,
  },
});

const authError = () => ({
  type: AUTH_ERROR,
});

const logout = () => ({
  type: LOGOUT,
});

export { loadUser, authError, logout };
