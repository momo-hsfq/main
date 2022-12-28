import axios from 'axios';
import { Loading, Message } from 'element-ui';

let urlData = { basicUrl: "http://localhost:8080" }

let loading;

const instance = axios.create({
  baseURL: urlData.basicUrl,
  timeout: 1000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  withCredentials: false,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  loading = Loading.service({
    lock: true, // 是否锁屏
    text: '正在加载...', // 加载动画的文字
    spinner: 'el-icon-loading', // 引入的loading图标
    background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
  })
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  loading.close();
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const getEmailCode = async () => {
  return instance.get('/getEmailCode');
}

export default instance;
