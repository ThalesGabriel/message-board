import authActions from './authActions';
import userActions from './userActions';
import postActions from './postActions';

export default {
  ...authActions,
  ...postActions,
  ...userActions,
}