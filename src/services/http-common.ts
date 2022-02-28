import axios, { AxiosRequestConfig } from 'axios';
import { envVariable } from './envVariable';

axios.defaults.baseURL = envVariable.API_ROOT;
axios.defaults.timeout = envVariable.REQUEST_TIMEOUT;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.interceptors.request.use(
  (config) => {
    const dataPersist = JSON.parse(localStorage.getItem('persist:auth') as string);
    const auth = JSON.parse(dataPersist.data).jwtAccessToken.replaceAll('"', '');

    if (auth && config.headers && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${auth}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error.request || error.message || error.data),
);

const http = {
  setAuthorizationHeader(jwtAccessToken: string) {
    const headers = axios?.defaults?.headers as any;
    if (headers) {
      headers.Authorization = `Bearer ${jwtAccessToken}`;
    }
  },
  request(config: AxiosRequestConfig<any>) {
    return axios.request(config);
  },
  get(url: string, data?: any) {
    return axios.get(url, { params: data });
  },
  post(url: string, data?: any) {
    return axios.post(url, data);
  },
  put(url: string, data?: any) {
    return axios.put(url, data);
  },
  patch(url: string, data?: any) {
    return axios.patch(url, data);
  },
  delete(url: string) {
    return axios.delete(url);
  },
};

export default http;
