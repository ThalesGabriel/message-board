import { setCookie, removeCookie } from '../utils/cookie';
import Cookie from 'js-cookie';
import axios from 'axios';

async function getAppToken() {
  let token = Cookie.get('AUTHORIZATION_TOKEN')
  if(token) token = JSON.parse(token).access_token
  return token;
}

const api = axios.create({
  baseURL: `${process.env.URL}`,
});

api.updateToken = () => {
  removeCookie('AUTHORIZATION_TOKEN');
};

api.interceptors.request.use(
  async function (config) {
    const appToken = await getAppToken();
    if (appToken) {
      config.headers['Authorization'] = `Bearer ${appToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error)
      if (error.response.status === 401) {
        Cookie.remove('AUTHORIZATION_TOKEN');
        // getAppToken();
        window.location.href= "http://localhost:3000"
      }
      if (error.response.status === 406) {
        const authError = error.response;
        if (authError.config.url !== 'cliente') {
          auth.signOut();
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;