import {
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "./types";
import {
  AUTH_SERVICE,
  LOGIN_SERVICE,
  REGISTER_SERVICE,
} from "../../api/service";
import { handleAuthentication } from "../../auth/auth.service";
import history from "../../utils/history";

const loadUser = () => async (dispatch) => {
  try {
    const res = await AUTH_SERVICE();
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (error) {
    if (error) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

const login = (data) => async (dispatch) => {
  try {
    const res = await LOGIN_SERVICE(data);
    handleAuthentication(res.data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
    history.push("/dashboard");
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        alert("Invalid Credentials");
      }
    }
  }
};

const signup = (data) => async (dispatch) => {
  try {
    const res = await REGISTER_SERVICE(data);
    handleAuthentication(res.data);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.user });
    history.push("/dashboard");
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        alert("User Already Exists");
      }
    }
  }
};

const logout = () => ({
  type: LOGOUT,
});

export { loadUser, login, logout, signup };
