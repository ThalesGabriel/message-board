import {
    UPLOAD_REQUESTED,
    UPLOAD_FAIL,
    UPLOAD_SUCCESS,
  } from "../types";
  
  const initialState = {
    loading: false,
    error: null,
    filename: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case UPLOAD_REQUESTED:
        return Object.assign({}, state, {
          loading: true,
          filename: null,
          error: null,
        });
      case UPLOAD_SUCCESS:
        return Object.assign({}, state, { loading: false, filename: action.filename });
      case UPLOAD_FAIL:
        return Object.assign({}, state, { loading: false, error: action.error });
      default:
        return state;
    }
  };
  