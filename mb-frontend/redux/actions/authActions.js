import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_REQUESTED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL
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
        });
      })
      .catch(error => {
        console.log('error');
        console.log(error);
        dispatch({
          type: SIGNUP_FAIL,
          error: {
            message: 'Aconteceu um erro interno! Tente novamente mais tarde!'
          }
        });
      });
  };
};

export default {
  registerUser,
};
