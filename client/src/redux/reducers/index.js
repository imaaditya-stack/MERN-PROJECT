import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import { RESET_APP } from "../actions/types";

const appReducer = combineReducers({
  authReducer,
  profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
