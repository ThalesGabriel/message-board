import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PROFILE_REQUESTED,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "../types";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUESTED:
      return Object.assign({}, state, {
        loading: true,
        user: null,
        error: null,
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, { loading: false, user: action.user });
    case SIGNUP_FAIL:
      return Object.assign({}, state, { loading: false, error: action.error });
    case LOGIN_REQUESTED:
      return Object.assign({}, state, { 
        loading: true, 
        token: null, 
        error: null 
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loading: false, token: action.token });
    case LOGIN_FAIL:
      return Object.assign({}, state, { loading: false, error: action.error });
    case PROFILE_REQUESTED:
      return Object.assign({}, state, { 
        loading: true, 
        token: null, 
        error: null 
      });
    case PROFILE_SUCCESS:
      return Object.assign({}, state, { loading: false, user: action.user });
    case PROFILE_FAIL:
      return Object.assign({}, state, { loading: false, error: action.error });
    default:
      return state;
  }
};
