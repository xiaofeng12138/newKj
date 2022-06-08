import request from '../until/requset'
import {getUserRole, getCookie} from '../until/getToken'
/***
 @文件上传API@
 *****/

export function fileUp(url,params){
    return request({
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'expo') + url,
        method:'post',
        data:params,
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

/***
 @请求前缀是public@
 *****/
export function publicInter(url,params){
    return request({
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'expo') + url,
        method:'post',
        data:JSON.stringify(params),
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
      
    })
}
export function publicInterNoCus(url,params){
    return request({
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'cusBase') + url,
        method:'post',
        data:JSON.stringify(params),
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
      
    })
}

//GET方式请求数据
export function publicGetInter(url){
    return request({
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'expo') + url ,
        method:'GET',
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
      
    })
}

/*
@PDF查看@
*/
export function pdfLook(url,params){
    return request({
        responseType: 'arraybuffer',
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'expo') + url,
        method:'post',
        data:JSON.stringify(params),
    })
}
export function filedownload(url,params){
    return request({
        method: 'post',
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'expo') + url,
        data: JSON.stringify(params),
        responseType: 'blob',
        responseEncoding: 'IS08859-1'
      })
}
export function getEchart8(url,params){
    
    return request({
        method: 'post',
        url: (!sessionStorage.getItem("url") ? 'cusBase' : 'expo') + url,
      })
}

