import { LOAD_USER, AUTH_ERROR, LOGOUT } from "../actions/types";

const INIT_STATE = { user: null, isAuthenticated: false, loading: true };

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_USER: {
      return { ...action.paylaod, isAuthenticated: true, loading: false };
    }
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
