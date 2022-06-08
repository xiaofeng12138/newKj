<template>
    <div class="login">
        <Form  autocomplete="off" :model="formInline" :rules="ruleInline" ref="formInline" v-if="role.roleName === '进口预约换单' || role.roleName === '电子提箱'">
            <h3>{{role.roleName}}</h3>
            <FormItem class="formItem"></FormItem>
            <FormItem class="formItem">
                <Select v-model="truck" style="width:240px" placeholder="选择承运公司">
                    <Option v-for="item in truckList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem class="formItem"></FormItem>
            <FormItem class="formItem"></FormItem>
            <p class="clear" style="text-align: center">
                <Button @click="login2(role.roleName)" type="primary" shape="circle"  style="width: 120px;margin-left: 60px">进入</Button>
            </p>
        </Form>
        <Form autocomplete="off" :model="formInline" :rules="ruleInline" ref="formInline" v-else>
            <h3>{{role.roleName}}</h3>
            <FormItem class="formItem" prop="user">
                <Input  autocomplete="new-password" placeholder="用户名" v-model="formInline.user"  @on-keydown='enter' size="large" class="my"></Input>
            </FormItem>
            <FormItem class="formItem"  prop="password">
                <Input  autocomplete="new-password" placeholder="登录密码" size="large" type="password" @on-keydown='enter' v-model="formInline.password" class="my"></Input>
            </FormItem>
            <FormItem class="formItem code" prop="code">
                <Input   placeholder="验证码" size="large" class="my" @on-keydown='enter' v-model="formInline.code"></Input>
                <img :src="codeImg" alt="" @click="getCode">
            </FormItem>
            <p class="clear">
                <Button @click="login" type="primary" shape="circle" size='large'>登录</Button>
                <a href="javascript:void(0)">忘记密码?</a>
            </p>
        </Form>
         <ul class="role clear" v-if="isExhibtion">
            <li class="right" style="">
                <a href="javascript:void(0)" @click="chioceRole($event,'outCom')" >
                    进出口贸易企业<img src="../../../assets/outCom.png" alt="">
                </a>
            </li>
            <li class="right" style="">
                <a href="javascript:void(0)" @click="chioceRole($event,'shipCom')" >
                    航运企业<img src="../../../assets/ship.png" alt="">
                </a>
            </li>
            <li class="right" style=""><a href="javascript:void(0)" @click="chioceRole($event,'baoguan')" >报关行<img src="../../../assets/baoguan.png" alt=""></a></li>
            <li class="right" style=""><a href="javascript:void(0)" @click="chioceRole($event,'lihuo')"  >港口 | 理货<img src="../../../assets/port.png" alt=""></a></li>
            <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'daili')"  >货代<img src="../../../assets/daili.png" alt=""></a></li>
            <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'jinrong')"  >金融支付机构<img src="../../../assets/jinrong.png" alt=""></a></li>
            <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'huandan')"  >进口预约换单<img src="../../../assets/baoguan.png" alt=""></a></li>
            <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'car')"  >电子提箱<img src="../../../assets/car.png" alt=""></a></li>
        </ul>
        <psd  ref="psd" />
    </div>
</template>
<script>
import JSEncrypt from '../../../until/jsencrypt.min.js'
import axios from "axios";
import psd from '@/components/psd/psd.vue'
import {
  setCookie,
  getUserRole,
  removeCookie,
  getCookie,
  getRouterName
} from "@/until/getToken";
import interfaceUrl from "@/api/interfaceUrl";
import config from "@/until/config";
import rolerForUrl from '@/api/rolerForUrl'

export default {
  //跨境常用登陆
  components:{psd},
  props: {
    //是否展示角色選擇
    isExhibtion: {
      required: false,
      type: Boolean,
      default: true
    },
    //文字標題
    loginTitle: {
      required: false,
      type: String
    },
  },
  beforeMount(){
      if(this.loginTitle){
          this.role.roleName=this.loginTitle
      }

  },
  mounted() {
    //清除賬號信息
    removeCookie("ACCESS_TOKEN");
    removeCookie("user");
    removeCookie("roler");
    removeCookie("date");
    sessionStorage.clear();
    this.getCode();
  },
  data() {
    //正常登陆入口
    return {
      //图形验证码
      codeImg: "",
      retail:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh/PSTjHMsAhzbUMDGl1f0BugdXtOJneQi02ecca4qxsv5qZPIdO/MWM01S1XZ0o/4BF6hlxp8b7opmILkGroJ2lguMr5CiY6cRE6gsCD+Aw3EpLFDtvwEuvLG4ZJcuuvN5GVd4efc9sYJGS1gUWKsJWCnUf/a3c6f1wTR2APB+5kr9rIfRjPbrwf6DQGjiRQZ4gB+gj0uiUWy3XnDKhIqVe0tFUaOtzYgStMm2ItV2Mqh3JdFrVg0Fd6hirHaGv/q8BIOo1NDVSWHkHAZk6/YFU3ASU+CXglOjTUmFFw+ALklzuaM4C5hXH3qmBzUlmdI5RIYxuyBacxI4F9DbegSQIDAQAB', //秘钥
  
      //图形验证码标识
      sign: "",
      //选择角色进行登录（暂时没有意思）
      role: {
        roleName: "进出口贸易企业",
        //roleName: "",
        roleType: ""
      },
      // 表单key-value;
      formInline: {
        user: "", //账户名
        password: "", //密码
        code: "" //验证码
      },
      //表单验证规则
      ruleInline: {
        user: [{ required: true, message: "请输入账号!", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码!", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码!", trigger: "blur" }]
      },
      truckList: [
        {
          value: "COSCO",
          label: "中远海运集装箱运输有限公司"
        }
      ],
      truck: ""
    };
  },
  methods: {
    /**
     * 获取图形验证码
     */
    getCode() {
      console.log(2222222222)
      axios({
        type: "get",
        url: `${config.sso}${interfaceUrl.imageCode}=${new Date()}`
      }).then(r => {
        var data = r.data;
        this.codeImg = data.imageCode;
        this.sign = data.sign;
      });
    },
    /**
     * 按下回车登录
     */
    enter(e) {
      if (e.key === "Enter") {
        this.login();
      }
    },
    /**
     * 点击角色同步文字title
     */
    chioceRole(e, type) {
      this.role.roleName = e.target.innerText;
    },
    /**
     * 登录
     */
    login() {
      this.$refs["formInline"].validate(valid => {
        if (valid) {

          //秘钥加密部分
           var encrypt = new JSEncrypt();
           encrypt.setPublicKey(this.retail)
           var p = encrypt.encrypt(this.formInline.password)
           var ps= encodeURI(p).replace(/\+/g, '%2B');
           
          var data = this.urlSearchParams({
            username: this.formInline.user,
            // password: MD5(this.formInline.password),
            password: ps,
            client_id: "m1",
            client_secret: "s1",
            grant_type: "password",
            scope: "read",
            f1: true, //  标记本次请求是否对密码进行MD5加密
            sign: this.sign, // 验证码生成唯一标识
            kaptcha: this.formInline.code, // 验证码
            // expoStartTime: '2018-01-01',
            // expoEndTime: '2018-12-31'
          });
          axios({
            method: "post",
            url: config.sso +interfaceUrl.login,
            data: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "*/*"
            }
          }).then(r => {
            console.log(r)
            if (r["data"]["token"]) {
              //设置token、用户名、角色、这个账户是否有密码(单一窗口初次跳转没有密码)、菜单
              setCookie('date', '2018');
              setCookie("ACCESS_TOKEN", "bearer " + r["data"]["token"], 0);
              setCookie("user", this.formInline.user, 0);
              sessionStorage.setItem("menus", JSON.stringify(r.data.menus));
              setCookie("roler", r.data.role);
              setCookie("hasPassword", r["data"]["pwdIsNull"], 0);
              for(let i = 0; i < r.data.role.split(',').length; i++) {
                if(rolerForUrl.includes(r.data.role.split(',')[i])) {
                  sessionStorage.setItem("url", 'expo');
                  break;
                }
              }
              if(r.data.pwdStatus == '0'){
                  this.$refs.psd.openModal()
              }else{
                  this.$router.push({ name: getRouterName()[0] });
              }
            } else {
              this.getCode();
              this.$Message.error(r["data"]["msg"]);
            }
          });
        }
      });
    },
    /**
     * 工具方法
     */
    urlSearchParams(dataObj) {
      let qs = "",
        split = "&",
        keys = Object.keys(dataObj);
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          split = "";
        }
        qs += keys[i] + "=" + dataObj[keys[i]] + split;
      }
      return qs;
    }
  }
};
</script>
<style rel='stylesheet/scss' lang="scss"  scoped>
.hideTab{
    .login{
         animation: appear 1.5s ease-in-out;
    }
}
.login {
  width: 380px;
  height: 380px;
  position: relative;
  margin: 0 auto;
  display: none;
  margin-top: 40px;
 
  form {
    width: 380px;
    height: 380px;
    background: linear-gradient(-180deg, #4764b6 0%, #22347f 100%);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 50px 70px;
    border-radius: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    h3 {
      color: #fff;
      font-size: 24px;
      text-align: center;
      font-weight: normal;
      padding-bottom: 20px;
    }
    .formItem {
      margin-bottom: 24px;
      position: relative;
      &.code {
        img {
          position: absolute;
          right: 8px;
          top: 3px;
          cursor: pointer;
          width: 80px;
          height: 30px;
          border-radius: 20px;
        }
        .input {
          border-radius: 20px !important;
        }
      }
    }
    p {
      button {
        float: left;
        width: 120px;
        background: #3dbec9;
        cursor: pointer;
        border-color: #3dbec9;
      }
      a {
        float: right;
        margin-top: 10px;
        color: #ddd;
      }
    }
  }
  .role {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    transform: scale(1);

    animation: appear2 1.5s ease-in-out 1s;
    position: relative;
    > li {
      top: 0;
      &:first-child {
        transform: translate(-200px, 0);
      }
      &:nth-child(2) {
        transform: translate(-240px, 110px);
      }
      &:nth-child(3) {
        transform: translate(-260px, 220px);
      }
      &:nth-child(4) {
        transform: translate(-200px, 330px);
      }
      &:nth-child(5) {
        transform: translate(200px, 0);
      }
      &:nth-child(6) {
        transform: translate(240px, 110px);
      }
      &:nth-child(7) {
        transform: translate(260px, 220px);
      }
      &:nth-child(8) {
        transform: translate(200px, 330px);
      }

      &.right {
        left: 0;
        > a {
          text-align: right;
          background: url("../../../assets/leftdefault.png") no-repeat 50% 50%;
          background-size: cover;
          img {
            left: 15px;
          }
          &:hover {
            background: url("../../../assets/leftHover.png") no-repeat 50% 50%;
          }
        }
      }

      &.left {
        right: 0;
        > a {
          text-align: left;
          background: url("../../../assets/rightdefault.png") no-repeat 50% 50%;
          background-size: cover;
          img {
            right: 15px;
          }
          &:hover {
            background: url("../../../assets/rightHover.png") no-repeat 50% 50%;
          }
        }
      }

      position: absolute;
      > a {
        display: block;
        width: 220px;
        text-align: center;
        border-radius: 30px;
        height: 50px;
        line-height: 50px;
        position: relative;
        padding: 0 20px;
        font-size: 20px;
        background: #fff;
        color: #2b2e94;
        transition: transform 0.3s ease-in-out;
        > img {
          position: absolute;
          top: 12.5px;
          width: 28px;
          height: 25px;
        }
        &:hover {
          transform: scale(1.2);
          color: #fff;
        }
      }
    }
  }
}

@keyframes appear {
  from {
    display: block;
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}
@keyframes appear2 {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
