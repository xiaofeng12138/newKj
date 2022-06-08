<template>
  <div class="CCIE">
    <div class="CCIE-head">
      <div>
        <div class="logo">
          <img src="@/assets/ccie-logo.png" alt="">
        </div>
        <div class="indexLogo">
               <img src="@/assets/index/logo1.png" alt="">
        </div>
        <div class="user">
          <img src="@/assets/qietu/dropMenu/touxiang.svg" alt="">
          <span  class="login-btn" @click="modal=true">登录</span>
        </div>
      </div>
    </div>
    <div class="CCIE-body">
      <countTime />
        <div class="bgcimg">
          <div class="bgc"></div>
          <div class="jt"></div>
          <div class="ciie" @click="modal=true"></div>
        </div>
      <!-- <div class="contanier">
        <div class="left top item" @click="modal=true" style="cursor: pointer">
          <div>
            <img src="@/assets/ccie-enter-border.png" alt="">
            <span class="hover_phone"><img src="@/assets/index/ztqk.png" alt="" style="margin-top:20px"></span>
          </div>
          <img src="@/assets/ccie-enter-bottom.png" alt="">
        </div>
        <div class="left bottom item" @click="modal=true" style="cursor: pointer">
          <div>
            <img src="@/assets/ccie-enter-border.png" alt="">
            <span class="hover_phone"><img src="@/assets/index/zqtg.png" alt="" style="margin-top:20px"></span>
          </div>
          <img src="@/assets/ccie-enter-bottom.png" alt="">
        </div>
        <div class="right top item" @click="modal=true" style="cursor: pointer">
          <div>
            <img src="@/assets/ccie-enter-border.png" alt="">
            <span class="hover_phone"><img src="@/assets/index/zzjg.png" alt="" style="margin-top:20px"></span>
          </div>
          <img src="@/assets/ccie-enter-bottom.png" alt="">
        </div>
        <div class="right bottom item" @click="modal=true" style="cursor: pointer">
          <div>
            <img src="@/assets/ccie-enter-border.png" alt="">
            <span class="hover_phone"><img src="@/assets/index/zhcz.png" alt="" style="margin-top:20px"></span>
          </div>
          <img src="@/assets/ccie-enter-bottom.png" alt="">
        </div>
      </div> -->
      <p>开发单位：全国海关大数据云平台（上海） 全国海关大数据应用中心</p>
    </div>
    <Modal v-model="modal" width="484px" class="customModal loginmodal" :mask-closable="false">
      <p slot="close"></p>
      <p slot="footer"></p>
      <div class="modalBody">
        <p>
          <Icon type="md-close" @click="modal=false"/>
        </p>
        <h1>进博会专窗</h1>
        <input id="mac" type="text" ref="macValue"  v-show="false" />
        <Form ref="formInline" autocomplete="off" :model="formCustom" :rules="ruleCustom" >
          <FormItem prop="user">
            <Input
              autocomplete="new-password"
              type="text"
              class="customInput noBorder"
              v-model="formCustom.user"
              size="large"
              placeholder="请输入用户名"
            >
              <img src="@/assets/qietu/dlzt/user.svg" alt="" slot="prepend">
              <!-- <Icon type="md-contact" slot="prepend"/> -->
            </Input>
          </FormItem>
         
          <FormItem prop="password">
            <Input
              autocomplete="new-password"
              type="password"
              class="customInput noBorder"
              v-model="formCustom.password"
              size="large"
              placeholder="请输入密码"
            >
              <img src="@/assets/qietu/dlzt/password.svg" alt="" slot="prepend">
              <!-- <Icon type="md-lock" slot="prepend"/> -->
            </Input>
          </FormItem>
          <FormItem prop="code" class="customFormItem">
            <div class="validateCode">
              <Input
                type="text"
                class="customInput noBorder"
                v-model="formCustom.code"
                size="large"
                placeholder="请输入验证码"
              >
                <img src="@/assets/qietu/dlzt/code.svg" alt="" slot="prepend">
                <!-- <Icon type="md-image" slot="prepend"/> -->
              </Input>
            </div>
            <img width="40%" @click="getCode" :src="imgCode" alt="" class="right-img">
          </FormItem>
          <FormItem style="margin-top:20px" >
            <Select v-model="formCustom.date">
              <Option  value="2018">2018</Option>
              <Option  value="2019">2019</Option>
              <Option  value="2020">2020</Option>
            </Select>
          </FormItem>
          <!-- <FormItem prop="user" label='周围是否有摄像头'>
            <RadioGroup v-model="formCustom.hasCamera">
              <Radio label = 1>有</Radio>
              <Radio label= 0 >无</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="(formCustom.hasCamera)*1">
              <Select v-model="formCustom.CameraNum" placeholder="请选择摄像头编号">
                <Option  value="2018">2018</Option>
                <Option  value="2019">2019</Option>
                <Option  value="2020">2020</Option>
              </Select>
          </FormItem> -->
          <!-- <span style="float: right">忘记密码？</span> -->
          <p style="padding-top:30px">
            <Button type="primary" long size="large" @click="login">登 录</Button>
          </p>
        </Form>
        <psd  ref="psd" />
      </div>
    </Modal>
       <!-- 确认取消弹窗 -->
        <Modal
               v-model="confirmModal"
                width="800"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="header" style="text-align:center;font-size:15px">
                    <span>提  示</span>
                </p>
                <div style="text-align:center;height:160px;font-size:16px;font-weight:bold">
                    <p>当前登录用户姓名为：{{loginInfo.loginName}},<br />
                      工号为：{{loginInfo.loginUserid}},<br />
                      网络IP为：{{loginInfo.loginIp}},<br />
                      当前设备Mac地址为:{{loginInfo.loginMac}},<br />
                      办公点名称为:{{loginInfo.loginAddr}},<br />
                      办公点地址为:{{loginInfo.loginofficeName}},<br />
                      </p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' style='margin-top:10px' @click="closeConfirmModal">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
        </Modal>
         <!-- 插件提醒弹出框 -->
        <Modal
            v-model="pluginModal"
                     width = "400px"
                    :footer-hide = true
                    :mask-closable = "false"
                    class="forbidBody"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="pluginModal=false" size='30' />
                </p>
                <h2 style="text-align:center;color:#fff">提  示</h2>
               <div class="modalWrap">
                   <p>请下载数据安全防控插件，并按安装说明进行操作</p>
                   <a style="border: none; color: #FFF" href="/excel/crt_for_mac.rar" >
                    <Button type='primary' size='large'  style="margin-top:50px;margin-right:20px;margin-left:90px">插件下载</Button> 
                   </a>
                   <Button type='primary' size='large' style='margin-top:50px' @click="pluginModal = false">取 消</Button>
               </div>
        </Modal>
        <!-- 备案信息不存在提示框 -->
        <Modal
            v-model="cautionModal"
                    width = "400px"
                    :footer-hide = true
                    :mask-closable = "false"
                    class="forbidBody"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="cautionModal=false" size='30' />
                </p>
                <h2 style="text-align:center;color:#fff">提  示</h2>
               <div class="modalWrap">
                   <p>{{showMessage}}</p>
                   <Button type='primary' size='large' style='margin-top:50px;margin-left:140px' @click="cautionModal = false">确  定</Button>
               </div>
        </Modal>
         <!-- 选择摄像头 -->
        <Modal
            v-model="carameModal"
                    width = "400px"
                    :footer-hide = true
                    :mask-closable = "false"
                    class="forbidBody"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                </p>
                <h2 style="text-align:center;color:#fff">请选择摄像头编号</h2>
                 <div class="modalWrap" style="margin-top:20px;font-size:20px;color:#fff">
                         周围是否有摄像头： <RadioGroup v-model="hasCamera"> 
                                <Radio label='1' style="font-size:16px">有 </Radio>
                                <Radio label='0' style="font-size:16px">无 </Radio>
                          </RadioGroup> 
                              <Select v-model="carameId"  placeholder="请选择摄像头编号" v-if="(hasCamera)*1" style="margin-top:20px">
                                <Option v-for="(item,index) in carameArr" :value="item.cameraNum" :key="index">{{ item.cameraNum }}</Option>
                              </Select>
                       
                   <Button type='primary' size='large' style='margin-top:20px;margin-left:150px' @click="closeCarameModal">提  交</Button>
               </div>
        </Modal>
  </div>
</template>
<script>

import JSEncrypt from '../../../../until/jsencrypt.min.js'
import axios from "axios";
import rolerForUrl from '@/api/rolerForUrl'
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
import countTime from '@/components/countdown/countdown.vue'
export default {
  //进博会常用登陆  
  components:{psd,countTime},
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空！"));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空！"));
      } else {
        callback();
      }
    };
    const validateNewPw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空！"));
      } else {
        callback();
      }
    };
    return {
      hasCamera:'',
      carameId:'',
      carameArr:[],
      carameFormModal:{
        hasCamera:'',
        carameId:''
      },
      carameModal:false,
      showMessage:'',
      cautionModal:false,
      pluginModal:false,
      confirmModal:false,
      loginInfo:{
        loginUserid:'',
        loginName:'',
        loginMac:'',
        loginIp:'',
        loginofficeName:'',
        loginAddr:''
      },
      countDay:0,
      retail:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh/PSTjHMsAhzbUMDGl1f0BugdXtOJneQi02ecca4qxsv5qZPIdO/MWM01S1XZ0o/4BF6hlxp8b7opmILkGroJ2lguMr5CiY6cRE6gsCD+Aw3EpLFDtvwEuvLG4ZJcuuvN5GVd4efc9sYJGS1gUWKsJWCnUf/a3c6f1wTR2APB+5kr9rIfRjPbrwf6DQGjiRQZ4gB+gj0uiUWy3XnDKhIqVe0tFUaOtzYgStMm2ItV2Mqh3JdFrVg0Fd6hirHaGv/q8BIOo1NDVSWHkHAZk6/YFU3ASU+CXglOjTUmFFw+ALklzuaM4C5hXH3qmBzUlmdI5RIYxuyBacxI4F9DbegSQIDAQAB', //秘钥
      userName: "expoadmin",
      imgCode: "",
      sign: "",
      modal: false,
      macValue:'',
      formCustom: {
        user: "",
        password: "",
        code: "",
        date: "2020",
        hasCamera:"",
        CameraNum:""
      },
      //验证规则
      ruleCustom: {
        user: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validateNewPw, trigger: "blur" }],
        code: [{ validator: validatePassCheck, trigger: "blur" }]
      },
     
    };
  },
  beforeMount() {
    this.getCode();
  },
  mounted() {
    let _this = this;
    this.adjustFontSize();
    window.onresize = function() {
      _this.adjustFontSize();
    };
    this.hasPlugin();
  },
  methods: {
    //插件下载函数
    openNew(){
      this.pluginModal = true
    },
     getmac(){
      const event = new CustomEvent('getMacEvent', {
          detail: {
              message: 'connect',
          },
          bubbles: true,  //是否冒泡
          cancelable: false, //是否取消默认事件
      });
      document.dispatchEvent(event);
},

    hasPlugin(){
      let _this=this;
      var extensionId="mlpgcnjnalkbjlipepcppkepkchajmcn";
      chrome.runtime.sendMessage(
          extensionId, 
          { message: "version" },
            function (reply) {
                if (reply && reply.version){
                      _this.getmac();
                }else{
                  _this.openNew()
                    //  alert("请先下载插件并按说明文件进行安装");
                }
            }
        );
      
    },
    adjustFontSize() {
      let screenWidth = window.innerWidth;
      let html = document.getElementsByTagName("html")[0];
      if (screenWidth >= 1601) {
        html.className = "xxl";
      } else if (screenWidth >= 1441 && screenWidth <= 1600) {
        html.className = "xl";
      } else if (screenWidth >= 1081 && screenWidth <= 1440) {
        html.className = "l";
      } else if (screenWidth >= 768 && screenWidth <= 1080) {
        html.className = "m";
      } else {
        html.className = "x";
      }
    },
    /**
     * 获取图形验证码
     */
    getCode() {
      axios({
        type: "get",
        url: `${config.sso}${interfaceUrl.imageCode}=${new Date()}`
      }).then(r => {
        var data = r.data;
        this.imgCode = data.imageCode;
        this.sign = data.sign;
      });
    },
    closeConfirmModal(){
      this.confirmModal = false
      this.$router.push({ name: getRouterName()[0] });
    },
    /**
     * 登录
     */
    login() {
      //  console.log(this.$refs.macValue.value)
   
      
      if(this.formCustom.date == '2018') {
        this.$Message.warning({content:'2018年版本只提供数据查看功能', duration: 3})
      }
      this.$refs["formInline"].validate(valid => {
        if (valid) {
           //秘钥加密部分
           var encrypt = new JSEncrypt();
           encrypt.setPublicKey(this.retail)
           var p = encrypt.encrypt(this.formCustom.password)
           var ps= encodeURI(p).replace(/\+/g, '%2B');
           
           var paramsData = {
              username: this.formCustom.user,
              password: ps,
              client_id: "m1",
              client_secret: "s1",
              grant_type: "password",
              scope: "read",
              f1: true, //  标记本次请求是否对密码进行MD5加密
              sign: this.sign, // 验证码生成唯一标识
              kaptcha: this.formCustom.code, // 验证码
              expoStartTime: this.formCustom.date + '-01-01',
              expoEndTime: this.formCustom.date + '-12-31'
            }
            var obj1 ={checkType:'authorize',mac:this.$refs.macValue.value}
            var obj2 = {}
            let userListArr = ['2217160','2226090','2217150','2210570']
            if(userListArr.indexOf( this.formCustom.user) >=0 ){
             obj2= Object.assign(paramsData,obj1)
            } else{
              obj2 = paramsData
            }
          var data = this.urlSearchParams(obj2);
              
          axios({
            method: "post",
            url: config.sso + interfaceUrl.login,
            data: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "*/*"
            }
          }).then(r => {
            if(r.data.code == '409'){
              this.cautionModal = true
              this.showMessage = r.data.msg
              return false
            }
            if (r["data"]["token"]) {
              //设置token、用户名、角色、这个账户是否有密码(单一窗口初次跳转没有密码)、菜单
              setCookie("ACCESS_TOKEN", "bearer " + r["data"]["token"], 0);
              setCookie("user", this.formCustom.user, 0);
              sessionStorage.setItem("menus", JSON.stringify(r.data.menus));
              setCookie("roler", r.data.role);
              setCookie("hasPassword", r["data"]["pwdIsNull"], 0);
              setCookie('date', this.formCustom.date)
              this.modal = false;
              this.user = this.formCustom.user;
              for(let i = 0; i < r.data.role.split(',').length; i++) {
                if(rolerForUrl.includes(r.data.role.split(',')[i])) {
                  sessionStorage.setItem("url", 'expo');
                  break;
                }
              }
              if(userListArr.indexOf( this.formCustom.user) >=0 ){
                  console.log(r.data)
                  this.loginInfo.loginUserid = r.data.userid
                  this.loginInfo.loginName = r.data.userName
                  this.loginInfo.loginMac = r.data.deviceMac
                  this.loginInfo.loginIp = r.data.deviceIp 
                  this.loginInfo.loginAddr = r.data.officeAddr 
                  this.loginInfo.loginofficeName = r.data.officeName 
                  this.carameArr = r.data.cameraList
                  this.carameModal = true
                  setCookie('newUserName',r.data.userName) //存储用户名
                  setCookie('newdeviceMac',r.data.deviceMac) //存储用户 Mac地址
                  setCookie('newdeviceIp',r.data.deviceIp) //存储用户设备ip
                  setCookie('newofficeAddr',r.data.officeAddr) //存储用户办公室地址
                  setCookie('newofficeName',r.data.officeName) //存储用户办公室名称
                } else{
                    //判断是否修改过密码
                  if(r.data.pwdStatus == '0'){
                      this.$refs.psd.openModal()
                  }else{
                      this.$router.push({ name: getRouterName()[0] });
                  }
                }
            } else {
              this.getCode();
              this.$Message.error(r["data"]["msg"]);
            }
          });
        }
      });
    },
    loginOut() {
      axios({
        method: "post",
        url: config.sso + interfaceUrl.loginOut,
        header: { Authorization: getCookie("ACCESS_TOKEN") },
        data: {}
      })
        .then(r => {
          let data = r.data;
          if (data.code == "700" || data.code == "200") {
            removeCookie("ACCESS_TOKEN");
            removeCookie("user");
            removeCookie("roler");
            removeCookie("hasPassword");
            removeCookie("date");
            sessionStorage.clear();
            this.$router.push({ name: "login" });
            this.user = "";
          } else {
            this.$Message.error("退出失败！");
          }
        })
        .catch(e => {
          //登录超时，接口会报错(不知道后台咋想的)
          removeCookie("ACCESS_TOKEN");
          removeCookie("user");
          removeCookie("roler");
          removeCookie("hasPassword");
          sessionStorage.clear();
          this.$router.push({ path: "/login" });
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
    },
    closeCarameModal(){
       if(this.hasCamera == ''){
         this.$Message.error('请勾选周围是否有摄像头')
         return false
       }
       if(this.hasCamera == 1 && this.carameId == ''){
         this.$Message.error('摄像头编号不能为空')
         return false
       }
       if(this.hasCamera == 1 && this.carameId != ''){
          setCookie('carameId',this.carameId) //存储摄像头ID
       }else{
          setCookie('carameId','') //存储摄像头ID
       }
      this.carameFormModal = false
      this.confirmModal = true
       
    }
  }
};
</script>
<style lang="scss" scoped>
.hover_phone:hover{
  img{
   transform: scale(1.2);
   transition:0.8s ;
  }
}
.CCIE {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  background: url("../../../../assets/qietu/dlzt/diwen.svg") #121e4f;

  .CCIE-head {
    height: 9.2vh;
    // min-height: 40px;
    background: rgba(31, 95, 242, 0.2);
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      position: relative;
      padding: 0 1.5rem;
      justify-content: space-between;
      align-items: center;
      background: url("../../../../assets/ccie-header-bg.png") 50% 0 no-repeat;
      .logo {
        width: 12.5rem;
        height: 4rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .indexLogo{
        position: absolute;
        left:29.5rem;
        top: 0.2rem;
        img{
          width:87%;
          
        }
      }
      .user {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .ivu-icon {
          font-size: 1.8rem;
          color: #fff;
        }
        .login-btn {
          font-size: 1.4rem;
          color: #fff;
          cursor: pointer;
          margin-left: 0.5rem;
        }
        .userName {
          font-size: 1.4rem;
          margin: 0 0.2rem;
          color: #fff;
        }
        img {
          height: 1.8rem;
          width: 1.8rem;
        }
      }
    }
  }
  .CCIE-body {
    height: calc(100% - 9.2vh);
    width: 100%;
    position: relative;
    .bgcimg{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 20rem;
      height: 20rem;
      margin-left: -10rem;
      margin-top: -12rem;
      // background-color: pink;
      .bgc{
        width: 100%;
        height: 100%;
        background-image:url('~@/assets/bgc/lbx.png');
        background-size: 100%,100%;
        background-repeat: no-repeat;
        animation: rotate1 15s linear infinite;
      }
      .jt{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -10rem;
        margin-top: -10rem;
        width: 100%;
        height: 100%;
        z-index: 3;
        background-image:url('~@/assets/bgc/jt.png');
        background-size: 100%,100%;
        background-repeat: no-repeat;
        animation: rotate2 10s linear infinite;
      }
      .ciie{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -17rem;
        margin-top: -10rem;
        width:34rem;
        height: 34rem;
        z-index: 5;
        cursor: pointer;
        background-image:url('~@/assets/ccie-build.png');
        background-size: 100%,100%;
        background-repeat: no-repeat;
      }
    }
    .contanier {
      position: absolute;
      width: 70%;
      height: 60%;
      left: 15%;
      top: 20%;
      text-align: center;
      .item {
        position: absolute;
        width: 310px;
        height: 8rem;
        > div {
          width: 100%;
          height: 127px;
          position: relative;
          > span {
            font-size: 2rem;
            position: absolute;
            left: 50%;
            top: 50%;

            width: 100%;
            text-align: center;
            transform: translate(-50%, -50%);
            color: #fff;
            position: absolute;
          }
        }

        &.top {
          top: -10%;
        }
        &.bottom {
          bottom: 10%;
        }
        &.left {
          left: 0;
        }
        &.right {
          right: 0;
        }
      }
    }
    > p {
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      color: #ccc;
      font-size: 0.6rem;
      bottom: 5%;
    }
    // background: url('../../../../assets/ccie-header-bg.png') 50% 0 no-repeat;
  }
}
.customModal {
  .modalBody {
    padding: 0px 20px 30px 20px;
    height: 434px;
     //background: rgb(12, 20, 53);
    border-radius: 6px;
    background: url('../../../../assets/qietu/dlzt/zbh-login-back.svg');
    background-size: cover;
    background-position:top;
    > p {
      padding-top:14px;
      display: flex;
      justify-content: flex-end;
      .ivu-icon {
        font-size: 1.8rem;
        color: #fff;
        cursor: pointer;
        font-weight: 400;
      }
    }
    > h1 {
      color: #fff;
      font-size: 1.5rem;
      text-align: center;
    }
    form {
      padding: 0 20px;
      .ivu-form-item {
        border-bottom: 1px solid #ececec;
      }
      
    }
  }
}
.modalWrap{
  height: 150px;
  margin:auto;
  p{
    font-size: 18px;
    text-align: center;
    color: #fff;
    margin-top: 20px;
  }
}
@keyframes rotate1 {
  form {
    transform: translate(0%,0%) rotate(0);
  }
  to{
    transform: translate(0%,0%) rotate(360deg);
  }
}
@keyframes rotate2 {
  form {
    transform: translate(0%,0%) rotate(0);
  }
  to{
    transform: translate(0%,0%) rotate(-360deg);
  }
}
</style>
