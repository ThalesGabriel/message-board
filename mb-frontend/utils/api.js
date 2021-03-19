import { setCookie, removeCookie } from '../utils/cookie';
import Cookie from 'js-cookie';
import axios from 'axios';

async function getAppToken() {
  const currentToken = Cookie.get('APP_TOKEN');
  if (!currentToken) {
    const getToken = await axios.post(
      `${process.env.BASE_URL}/oauth/token`,
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: process.env.GRANT_TYPE,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const { access_token } = await getToken.data;
    if (access_token) {
      setCookie('APP_TOKEN', access_token, 364);
      return access_token;
    }
  } else {
    return currentToken;
  }
}

const api = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.updateToken = () => {
  removeCookie('APP_TOKEN');
};

api.interceptors.request.use(
  async function (config) {
    const appToken = await getAppToken();
    if (config.clientToken) {
      config.headers['X-Client-Token'] = config.clientToken;
    }
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
      if (error.response.status === 401) {
        Cookie.remove('APP_TOKEN');
        getAppToken();
        window.location.reload();
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