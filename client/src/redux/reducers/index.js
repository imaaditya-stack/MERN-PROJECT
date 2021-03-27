import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import { RESET_APP } from "../actions/types";

const appReducer = combineReducers({
  authReducer,
  profileReducer,
  postReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
