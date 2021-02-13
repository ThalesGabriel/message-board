import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_REQUESTED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
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
    case SIGNIN_REQUESTED:
      return Object.assign({}, state, { loading: true });
    case SIGNIN_SUCCESS:
      return Object.assign({}, state, { loading: false });
    case SIGNIN_FAIL:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
};
