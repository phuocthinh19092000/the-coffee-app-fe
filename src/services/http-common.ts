import axios, { AxiosRequestConfig } from 'axios';
import { envVariable } from './envVariable';

axios.defaults.baseURL = envVariable.API_ROOT;
axios.defaults.timeout = envVariable.REQUEST_TIMEOUT;
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    const dataPersist = JSON.parse(localStorage.getItem('persist:root') as string);
    const auth = JSON.parse(dataPersist.auth);
    if (auth.accessToken && config?.headers) {
      config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error.request || error.message)
);

const http = {
  setAuthorizationHeader(accessToken: string) {
    const headers = axios?.defaults?.headers as any;
    if (headers) {
      headers.Authorization = `Bearer ${accessToken}`;
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
  }
}

export default http;