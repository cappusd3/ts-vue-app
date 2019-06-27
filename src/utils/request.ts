import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import store from '@/store';
import { notification } from 'ant-design-vue';
// import Vue from 'vue';
import {
  ACCESS_TOKEN
} from '@/store/mutation-types';
const baseURL = process.env.VUE_APP_URL_MOCK;

/**
 * 创建 axios 实例
 */
const service = axios.create({
  baseURL,
  timeout: 3000, // 请求超时时间
});

const err = (error: AxiosError) => {
  if (error.response) {
    const data = error.response.data
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Access_Token = token;
  }
  return config;
}, err);

service.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
}, err);

export default service;
