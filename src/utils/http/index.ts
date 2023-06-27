import axios, { AxiosError, AxiosResponse } from 'axios';
import Url from 'config/url';
import AuthUtil from 'utils/authUtil';

let getAxiosInstance = () => {
  let http = axios.create({
    baseURL: Url.baseUrl,
    timeout: 30000,
    headers: {
      Accept: 'application/json',
    },
    validateStatus: function (status: number) {
      return status >= 200 && status < 400;
    },
  });

  return http;
};

const HTTP = getAxiosInstance();
// All HTTP request/response interceptor
HTTP.interceptors.response.use(
  function (successRes: AxiosResponse) {
    return successRes;
  },

  // handle 401 response , redirect to login
  function (error: AxiosError) {
    if (error.response && error.response.status === 401) {
      AuthUtil.clear();
      // return (window.location.href = '/auth/initiate');
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

HTTP.interceptors.request.use((config) => {
  let sId = AuthUtil.getSessionId();
  config.headers['session_id'] = sId;
  return config;
});

export default HTTP;
