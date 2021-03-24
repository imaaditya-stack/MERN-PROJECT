import {
  GET_PROFILE,
  DELETE_EDU,
  DELETE_EXP,
  DELETE_EXP_ERROR,
  DELETE_EDU_ERROR,
  PROFILE_ERROR,
  PROFILES,
  PROFILES_ERROR,
  GET_REPOS,
  REPOS_ERROR,
  CLEAR_REPOS,
} from "../actions/types";

const INIT_STATE = {
  profile: null,
  profiles: [],
  loadingProfile: true,
  loadingProfiles: true,
  loadingRepos: true,
  repos: [],
};

const profileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE: {
      return { ...state, profile: action.payload, loadingProfile: false };
    }
    case PROFILES: {
      return { ...state, profiles: action.payload, loadingProfiles: false };
    }
    case PROFILE_ERROR: {
      return { ...state, loadingProfile: false };
    }
    case PROFILES_ERROR: {
      return { ...state, loadingProfiles: false };
    }
    case DELETE_EXP: {
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: state.profile.experience.filter(
            (exp) => exp._id !== action.payload
          ),
        },
      };
    }
    case DELETE_EDU: {
      return {
        ...state,
        profile: {
          ...state.profile,
          education: state.profile.education.filter(
            (edu) => edu._id !== action.payload
          ),
        },
      };
    }
    case DELETE_EXP_ERROR: {
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: action.payload,
        },
      };
    }
    case DELETE_EDU_ERROR: {
      return {
        ...state,
        profile: {
          ...state.profile,
          education: action.payload,
        },
      };
    }
    case GET_REPOS: {
      return { ...state, repos: action.payload, loadingRepos: false };
    }
    case REPOS_ERROR: {
      return { ...state, loadingRepos: false };
    }
    case CLEAR_REPOS: {
      return { ...state, repos: null, loadingRepos: true };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
