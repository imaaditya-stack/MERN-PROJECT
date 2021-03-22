import { SET_USER } from "./types";

const setUser = (user) => ({
  type: SET_USER,
  paylaod: {
    user,
  },
});

export { setUser };
