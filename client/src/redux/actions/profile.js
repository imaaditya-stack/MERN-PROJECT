import {
  PROFILES_SERVICE,
  GET_PROFILE_SERVICE,
  EDU_SERVICE,
  EXP_SERVICE,
  DEL_EXP_SERVICE,
  DEL_EDU_SERVICE,
  PROFILE_SERVICE,
  GITHUB_SERVICE,
} from "../../api/service";
import {
  PROFILES,
  PROFILES_ERROR,
  GET_PROFILE,
  PROFILE_ERROR,
  DELETE_EXP,
  DELETE_EXP_ERROR,
  DELETE_EDU,
  DELETE_EDU_ERROR,
  GET_REPOS,
  REPOS_ERROR,
} from "./types";
import history from "../../utils/history";

const createProfile = (data, flag) => async (dispatch) => {
  try {
    const res = await PROFILE_SERVICE(data);
    if (res.status === 200) {
      flag
        ? alert("Profile Updated Successfully")
        : alert("Profile Created Successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

const loadCurrentProfile = () => async (dispatch) => {
  try {
    const res = await GET_PROFILE_SERVICE();
    if (res.status === 200) {
      dispatch({ type: GET_PROFILE, payload: res.data });
    }
  } catch (error) {
    if (error.response?.status === 400) {
      dispatch({ type: PROFILE_ERROR });
    }
  }
};

const loadProfiles = () => async (dispatch) => {
  try {
    const res = await PROFILES_SERVICE();
    if (res.status === 200) {
      dispatch({ type: PROFILES, payload: res.data });
    }
  } catch (error) {
    if (error) {
      dispatch({ type: PROFILES_ERROR });
    }
    console.log(error);
  }
};

const addEducation = (data) => async (dispatch) => {
  try {
    await EDU_SERVICE(data);
    history.push("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

const addExperience = (formData) => async (dispatch) => {
  try {
    await EXP_SERVICE(formData);
    history.push("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

const deleteExperience = (id, currentExp) => async (dispatch) => {
  dispatch({ type: DELETE_EXP, payload: id });

  try {
    const res = await DEL_EXP_SERVICE(id);
    if (res.status === 200) {
      alert("Experience Deleted Successfully");
    }
  } catch (error) {
    if (error) {
      dispatch({ type: DELETE_EXP_ERROR, payload: currentExp });
      alert("Experience Deletion Failed");
    }
  }
};

const deleteEducation = (id, currentEdu) => async (dispatch) => {
  dispatch({ type: DELETE_EDU, payload: id });

  try {
    const res = await DEL_EDU_SERVICE(id);
    if (res.status === 200) {
      alert("Education Deleted Successfully");
    }
  } catch (error) {
    if (error) {
      dispatch({ type: DELETE_EDU_ERROR, payload: currentEdu });
      alert("Education Deletion Failed");
    }
  }
};

const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await GITHUB_SERVICE(username);
    if (res.status === 200) {
      dispatch({ type: GET_REPOS, payload: res.data });
    }
  } catch (error) {
    if (error) {
      dispatch({ type: REPOS_ERROR });
    }
    console.log(error);
  }
};

export {
  createProfile,
  loadProfiles,
  loadCurrentProfile,
  addEducation,
  deleteExperience,
  deleteEducation,
  addExperience,
  getGithubRepos,
};
