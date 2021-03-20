import {
    POST_REQUESTED,
    POST_FAIL,
    POST_SUCCESS,
    POSTS_REQUESTED,
    POSTS_FAIL,
    POSTS_SUCCESS
  } from "../types";
  
  const initialState = {
    posts: [],
    loading: false,
    error: null,
    post: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case POST_REQUESTED:
        return Object.assign({}, state, {
          loading: true,
          post: null,
          error: null,
        });
      case POST_SUCCESS:
        return Object.assign({}, state, { loading: false, post: action.post });
      case POST_FAIL:
        return Object.assign({}, state, { loading: false, error: action.error });
      case POSTS_REQUESTED:
        return Object.assign({}, state, {
          loading: true,
          posts: [],
          error: null,
        });
      case POSTS_SUCCESS:
        return Object.assign({}, state, { loading: false, posts: action.posts });
      case POSTS_FAIL:
        return Object.assign({}, state, { loading: false, error: action.error });
      default:
        return state;
    }
  };
  