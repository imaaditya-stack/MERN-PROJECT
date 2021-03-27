import {
  LOAD_POSTS,
  POSTS_ERROR,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  DELETE_POST_ERROR,
  ADD_POST,
} from "../actions/types";

const INIT_STATE = { posts: [], loading: true };

const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_POSTS: {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    }
    case POSTS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    }
    case UNLIKE_POST:
    case LIKE_POST: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.data }
            : post
        ),
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    }
    case DELETE_POST_ERROR: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
