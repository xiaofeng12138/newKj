import Newbase64 from './base64'
import access from '../routes/accessControl'
export function setCookie (name, value, day) {
  if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = day * 24 * 60 * 60 * 1000;
    var date = new Date(+new Date()+expires);
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
 }else{
   document.cookie = name + "=" + escape(value);
 }
}
export function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2])
  }else{
    return null
  }

}
export function removeCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
export function getUserRole(){
  var token=getCookie('ACCESS_TOKEN')
  if(token){
    var roleStr =getCookie('ACCESS_TOKEN').split('.')[1],
      base64 = new Newbase64();
    var decode=base64.decode(roleStr)
    var roleObj=JSON.parse(decode);
    return roleObj.authorities
  }else{
    return false
  }

}

export function getRouterName(){
  const token = getCookie('roler')
  const p=[]

  if(token){
    var roler=token.split(',')
    roler.forEach(item=>{
      if(access[item]){
        p.push(...access[item])
      }
    })
    var q=Array.from(new Set(p)) 
    return q;
  }

  return [];
}
