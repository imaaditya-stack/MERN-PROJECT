import { SET_USER } from "../actions/types";

const INIT_STATE = null;

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.paylaod;
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
