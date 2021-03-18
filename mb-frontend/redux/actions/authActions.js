import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../types';
import axios from 'axios'

const registerUser = values => {
  return dispatch => {
    console.log('register', values)
    dispatch({ type: SIGNUP_REQUESTED });
    console.log('SIGNUP_REQUESTED', values)

    let user = {
      name: `${values.first_name} ${values.last_name}`,
      password: values.password,
      email: values.email
    };

    axios
      .post('http://localhost:3001/create-user', user)
      .then(response => {
        console.log(response)
        dispatch({
          type: SIGNUP_SUCCESS,
          user: response.data
        });
      })
      .catch(error => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: SIGNUP_FAIL,
          error: {
            message: error.response.data.message
          }
        });
      });
  };
};

const login = values => {
  return dispatch => {
    console.log('login', values)
    dispatch({ type: LOGIN_REQUESTED });
    console.log('LOGIN_REQUESTED', values)

    let user = {
      password: values.password,
      username: values.username
    };

    axios
      .post('http://localhost:3001/login/auth', user)
      .then(response => {
        console.log(response)
        dispatch({
          type: LOGIN_SUCCESS,
          token: response.data
        });
      })
      .catch(error => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: LOGIN_FAIL,
          error: {
            message: error.response.data.message
          }
        });
      });
  };
};

export default {
  registerUser,
  login
};
