import axios from 'axios'
import config from '@/until/config'
import interfaceUrl from './interfaceUrl'

function urlSearchParams (dataObj) {
    let qs = '',  
        split = '&',
        keys = Object.keys(dataObj);
    for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
            split = '';
    }
    qs += keys[i] + '=' + dataObj[keys[i]] + split;
    }
    return qs;
}

  // 单一窗口用户登录
export function singlewindowLogin (param) {
  let data = {
    client_id: 'm1',
    client_secret: 's1',
    grant_type: 'password',
    app_type: 'singlewindow',
    scope: 'read',
    f1:false, //  标记本次请求是否对密码进行MD5加密
    username: '',
    password: ''
  }
  console.log(123)
    // console.log(param);
    return axios({
        method: 'post',
        url: config.sso + interfaceUrl.login,
        data: urlSearchParams(Object.assign(data, param)),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' }
    })
}

  // 单一窗口角色选择
  export function singlewindowRoleSelect (param) {
      // console.log(param);
      return axios({
          method: 'post',
          url: config.sso + 'seaadmin/roleOfChoice',
          data: JSON.stringify(param)
      })
  }
