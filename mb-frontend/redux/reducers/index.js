import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  post_methods: postReducer,
  user_methods: userReducer,
});

export default rootReducer;