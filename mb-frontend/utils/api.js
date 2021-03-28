import { setCookie, removeCookie } from '../utils/cookie';
import Cookie from 'js-cookie';
import axios from 'axios';

async function getAppToken() {
  let token = Cookie.get('AUTHORIZATION_TOKEN')
  return token;
}

async function refreshToken() {
  let token = Cookie.get('REFRESH_TOKEN')
  console.log('refresh', token)
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
    console.log('appToken', error)
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('expirou')
        const res = await api.post('profile/auth', {
          refresh_token: await refreshToken()
        })
        const { data: { data } } = res
        console.log(data)
        const originalRequest = error.config;
        setCookie('AUTHORIZATION_TOKEN', data.payload.token)
        return axiosApiInstance(originalRequest);
      }
      if (error.response.status === 422) {
        removeCookie('AUTHORIZATION_TOKEN')
        removeCookie('REFRESH_TOKEN')
        window.location.href= "http://localhost:3000"
      }
    }
    return Promise.reject(error);
  }
);

export default api;