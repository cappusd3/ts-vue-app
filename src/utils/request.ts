import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Store from '@/store';

const baseURL = process.env.VUE_APP_URL_MOCK;

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL,
  timeout: 0, // 请求超时时间
  maxContentLength: 4000,
});

service.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {
  Promise.reject(error);
});

service.interceptors.response.use((response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    return Promise.reject('error');
  }
}, (error: any) => {
  return Promise.reject(error);
});

export default service;
