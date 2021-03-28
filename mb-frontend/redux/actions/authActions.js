import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PROFILE_REQUESTED,
  PROFILE_SUCCESS,
  PROFILE_FAIL
} from '../types';
import axios from 'axios'
import api from '../../utils/api';
import { getCookieFromBrowser, setCookie } from '../../utils/cookie';

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

    api
      .post('login/auth', user)
      .then(response => {
        console.log(response)
        const { data: { data } } = response
        setCookie("AUTHORIZATION_TOKEN", data.payload.token)
        setCookie("REFRESH_TOKEN", data.payload.refresh_token)
        dispatch({
          type: LOGIN_SUCCESS,
          token: data.payload.token
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

const profile = () => {
  return dispatch => {
    dispatch({ type: PROFILE_REQUESTED });
    console.log('PROFILE_REQUESTED')

    api
      .post('profile/auth', {
        refresh_token: getCookieFromBrowser('REFRESH_TOKEN')
      })
      .then(response => {
        console.log(response)
        const { data: { data: { user, payload } } } = response
        setCookie('AUTHORIZATION_TOKEN', payload.token)
        dispatch({
          type: PROFILE_SUCCESS, 
          user
        })
      })
      .catch(error => {
        console.log('error');
        console.log(error.response);
        dispatch({
          type: PROFILE_FAIL,
          error: {
            message: error.response.data.message
          }
        });
      });
  };
};

export default {
  registerUser,
  login,
  profile
};
