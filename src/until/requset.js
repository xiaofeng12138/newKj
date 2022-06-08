import axios from 'axios'
// import Vue from 'vue'
import {getCookie,removeCookie} from './getToken'
import VueRouter from 'vue-router'
import config from './config'
import iView from 'iview'
import { Message ,Spin } from 'iview'
const service = axios.create({
  baseURL: config.base, // api的base_url
  timeout: 120000 // 请求超时时间
  //timeout: 100 // 请求超时时间
})  
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
service.interceptors.request.use(function (config) {
  const cookie=getCookie('ACCESS_TOKEN')
   if(cookie){
     config.headers['Authorization'] = cookie
   }
   return config;
    // 在发送请求之前做些什么
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code=='700'){
      /*
      判断 911 的 token type（token 失效）
      来自单一窗口，则跳转到单一窗口登录，否则跳转 login
      */
      removeCookie('ACCESS_TOKEN')
      var url=window.location.href
      window.location.href=url.split('/#/')[0]+'/#/login'
    }else{
      Spin.hide();
      return response.data
    }
  }, function (error) {
    // 对响应错误做点什么
     //请求超时处理函数
     var originalRequest = error.config; 
     if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
        originalRequest._retry = true
       // alert("请求超时，请重新请求")
        Message.error({
          content:'请求超时，请重新请求',
          duration: 3
        })
        return axios.request(originalRequest);
     }
     return Promise.reject(error);
     
  });
export default service
