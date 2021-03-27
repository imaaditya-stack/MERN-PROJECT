import {
  GET_POSTS_SERVICE,
  POST_LIKE_SERVICE,
  POST_UNLIKE_SERVICE,
  POST_DELETE_SERVICE,
  ADD_POST_SERVICE,
} from "../../api/service";
import {
  LOAD_POSTS,
  POSTS_ERROR,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  DELETE_POST_ERROR,
  ADD_POST,
} from "./types";

const loadPosts = () => async (dispatch) => {
  try {
    const res = await GET_POSTS_SERVICE();
    dispatch({ type: LOAD_POSTS, payload: res.data });
  } catch (error) {
    dispatch({ type: POSTS_ERROR });
  }
};

const addPost = (content, history) => async (dispatch) => {
  try {
    const res = await ADD_POST_SERVICE({ content });
    dispatch({ type: ADD_POST, payload: res.data });
    history.push("/posts");
  } catch (error) {
    console.error(error);
    alert("Something went wrong !");
    history.push("/posts");
  }
};

const likePost = (id) => async (dispatch) => {
  try {
    const res = await POST_LIKE_SERVICE(id);
    dispatch({ type: LIKE_POST, payload: { id, data: res.data } });
  } catch (error) {
    console.log(error);
  }
};

const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await POST_UNLIKE_SERVICE(id);
    dispatch({ type: UNLIKE_POST, payload: { id, data: res.data } });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = (id, currentPosts) => async (dispatch) => {
  dispatch({ type: DELETE_POST, payload: id });

  try {
    await POST_DELETE_SERVICE(id);
    alert("Post Deleted Successfully");
  } catch (error) {
    if (error) {
      dispatch({ type: DELETE_POST_ERROR, payload: currentPosts });
      alert("Post Deletion Failed");
    }
  }
};

export { loadPosts, likePost, unlikePost, deletePost, addPost };
