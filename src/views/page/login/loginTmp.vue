<template>
<div>
    <Form :model="formInline" :rules="ruleInline" ref="formInline">
        <FormItem class="formItem" prop="user">
            <Input placeholder="用户名" type="text" v-model="formInline.user" name="account" size="large" class="my" />
        </FormItem>
        <FormItem class="formItem"  prop="password">
            <Input placeholder="登录密码" size="large" name="pd" type="password" v-model="formInline.password" class="my" />
        </FormItem>
        <FormItem class="formItem code" prop="code">
            <Input placeholder="验证码" type="text" size="large" name="code" class="my" v-model="formInline.code" />
            <img :src="codeImg" alt="" @click="getCode">
        </FormItem>
        <p class="clear" style="line-height: 32px">
            <Button @click="login" style="float: left;width: 100px;" type="primary" shape="circle" size='large'>登录</Button>
            <a href="javascript:void(0)" style="float: right">忘记密码?</a>
        </p>
    </Form>
</template>

<script>
//import  '../../../until/jsencrypt.min.js'
import MD5 from "js-md5";
import axios from "axios";
import {setCookie,getUserRole,removeCookie,getCookie,getRouterName} from '../../until/getToken';
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import interfaceUrl from "@/api/interfaceUrl";
import config from "@/until/config";
export default {
  name: "loginTmp",
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        code: "",
        sign: ""
      },
      ruleInline: {
        user: [{ required: true, message: "请输入账号!", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码!", trigger: "blur" }
          // { type: 'string', min: 6, message: '密码至少六位！', trigger: 'blur' }
        ],
        code: [{ required: true, message: "请输入验证码!", trigger: "blur" }]
      },
      codeImg: ""
    };
  },
 
  mounted() {
    
    removeCookie('ACCESS_TOKEN')
    removeCookie('user')
    removeCookie('roler')
    sessionStorage.clear();
    this.getCode();
  },
  methods: {
    fn(){
      console.log
    },
     getCode(){
              axios({
                    type:'get',
                    url:`${config.sso}${interfaceUrl.imageCode}=${new Date()}`
                }).then(r=>{
                    var data=r.data;
                    this.codeImg=data.imageCode
                    this.sign=data.sign
                    
        })
    },
   
    login() {
      console.log(1)
      this.$refs["formInline"].validate(valid => {
        if (valid) {
          var data = this.urlSearchParams({
            username: this.formInline.user,
            password: this.formInline.password,
            client_id: "m1",
            client_secret: "s1",
            grant_type: "password",
            scope: "read",
            f1: true, //  标记本次请求是否对密码进行MD5加密
            sign: this.sign, // 验证码生成唯一标识
            kaptcha: this.formInline.code // 验证码
          });
          axios({
            method: "post",
            url: config.sso + interfaceUrl.login,
            data: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "*/*"
            }
          }).then(r => {
            if (r["data"]["token"]) {
              setCookie("ACCESS_TOKEN", "bearer " + r["data"]["token"], 0);
              setCookie("user", this.formInline.user, 0);
              sessionStorage.setItem("menus", JSON.stringify(r.data.menus));
              setCookie("roler", r.data.role);
              setCookie("hasPassword", r["data"]["pwdIsNull"], 0);
              
              this.$router.push({ name: getRouterName()[0] });
            } else {
              this.getCode();
              this.$Message.error(r["data"]["msg"]);
            }
          });
        }
      });
    },
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

<style rel='stylesheet/scss' lang="scss" scoped>
form {
  width: 380px;
  height: 230px;
  padding: 20px 70px;
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
}
</style>