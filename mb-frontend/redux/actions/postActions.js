import {
  POST_SUCCESS,
  POST_FAIL,
  POST_REQUESTED,
  POSTS_SUCCESS,
  POSTS_FAIL,
  POSTS_REQUESTED,
} from "../types";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const createPost = values => {
	return dispatch => {
		console.log('create post', values)
    dispatch({ type: POST_REQUESTED });
    console.log('POST_REQUESTED', values)

		let post = {
      title: values.title || uuidv4(),
      content: values.post,
      authorEmail: "thalesg88@gmail.com",
			draft: values.published
    };

		axios
      .post('http://localhost:3001/create-post', post)
      .then(response => {
				dispatch({ 
					type: POST_SUCCESS,
					post: response.data 
				});
      })
      .catch(error => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: POST_FAIL,
          error: {
            message: error.response
          }
        });
      });
	};
};

const getPublishedPosts = values => {
	return dispatch => {
    dispatch({ type: POSTS_REQUESTED });
    console.log('POSTS_REQUESTED', values)

		axios
      .get(`http://localhost:3001/find-all-published-posts?skip=1&take=10`)
      .then(response => {
        console.log(response)
				dispatch({ 
					type: POSTS_SUCCESS,
					posts: response.data 
				});
      })
      .catch(error => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: POSTS_FAIL,
          error: {
            message: error.response
          }
        });
      });
	};
};

export default {
  createPost,
  getPublishedPosts
};
