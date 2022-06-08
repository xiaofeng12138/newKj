<template lang="html">
  <div class="">
    <Spin fix v-if="showLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
    <Row>
      <Col span="6">
        <RadioGroup v-model="vertical" vertical @on-change="radioChange">
            <!-- <Radio label="CA">
                <span>船公司（CA）</span>
            </Radio> -->
            <Radio label="EP">
                <span>进出口企业（EP）</span>
            </Radio>
            <Radio label="CB">
                <span>报关行（CB）</span>
            </Radio>
            <!-- <Radio label="EB">
                <span>证明函申报（EB）</span>
            </Radio>
            <Radio label="EC">
                <span>会展中心（EC）</span>
            </Radio>
            <Radio label="TR">
                <span>卡车公司（TR）</span>
            </Radio> -->
        </RadioGroup>
      </Col>
      <Col span="6">
        <RadioGroup v-model="vertical" vertical @on-change="radioChange">
          <!-- <Radio label="TA">
              <span>理货（TA）</span>
          </Radio>
          <Radio label="TX">
              <span>税务（TX）</span>
          </Radio>
          <Radio label="BK">
              <span>银行（BK）</span>
          </Radio>
          <Radio label="FI">
              <span>其他金融机构（FI）</span>
          </Radio>
          <Radio label="PT">
              <span>港口（PT）</span>
          </Radio> -->
          <Radio label="FF">
              <span>货代（FF）</span>
          </Radio>
        </RadioGroup>
      </Col>
    </Row>

    <Row style="margin-top:20px;">
      <Button type="success" :disabled="btnDisabled" @click="confirm">提交用户角色信息</Button>
    </Row>

      <!-- 确认取消弹窗 -->
        <Modal
               v-model="confirmModal"
                width="800"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="header" style="text-align:center;font-size:15px">
                    <span>提示</span>
                </p>
                <div style="text-align:center;height:50px;font-size:16px;font-weight:bold">
                    <p>您已在跨境贸易大数据平台注册成功，用户名为：{{username}},请记录，以便后期直接从跨境贸易大数据平台（www.tradeportal.sh.cn）登录使用，请去修改登录密码</p>
                </div>
                <div style="text-align:center">
                   <!-- <Button type='primary' size='large' @click="cancaleDlete" style="margin-right:20px">取消</Button>  -->
                   <Button type='primary' size='large' style='margin-top:10px' @click="changePassword">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
                <!-- <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="InfoModal=false" size='30'/>
                </p> -->
        </Modal>

         <!-- 绑定手机号码弹窗-->
        <Modal
               v-model="phoneModal"
                width="600"
                :footer-hide = true
                :mask-closable = "false"
                :style
                >
                <p slot="header" style="text-align:center;font-size:15px">
                    <span>绑定手机号码</span>
                </p>
                <div style="text-align:center;height:50px;font-size:16px;font-weight:bold">
                   <Form  :model="phoneNum"  :label-width="100" :rules="ruleCustom" ref='tttt'>
                    <FormItem label="请输入手机号" prop='number'>
                          <Input type="text" v-model="phoneNum.number"></Input>
                    </FormItem>
                    <FormItem label="请输入验证码" >
                          <Input type="text" v-model="phoneNum.captcha" style='width:300px;float:left'></Input>
                          <Button type="success" @click='getKpa("tttt")' :disabled = btnStatus >{{showMessage}}</Button>
                    </FormItem>
                  </Form>
                </div>
                <div style="text-align:center;margin-top:50px">
                   
                   <Button type='primary' size='large' style='margin-top:10px' @click="submitPhone">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
        </Modal>
        <psd  ref='psd' />
  </div>
</template>

<script>
import { setCookie, getRouterName } from "@/until/getToken";
import interfaceUrl from "@/api/interfaceUrl";
import config from "@/until/config";
import axios from "axios";
import {publicInter} from '@/api/http';
import psd from './psd.vue'

export default {
  components:{psd},
  data() {
    //手机号码校验正则
     const validatePhone = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('手机号不能为空'));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
          callback('手机号格式不正确');
      } else {
          callback();
      }   
    };
    const validateKpa = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('验证码不能为空'));
      } else {
          callback();
      }   
    };
    return {
      //手机号码弹出框
      phoneModal:false,
      phoneNum:{
        number:'',
        captcha:''
      },
      showMessage:'获取验证码',
      btnStatus:false,
      msgId:'',
      confirmModal:false,
      vertical: "",
      showLoading: true,
      username: "",
      code: "",
      ruleCustom:{
        number: [{ validator: validatePhone, trigger: "blur" }],
        captcha:[{ validator: validateKpa, trigger: "blur" }],
      }
    };
  },

  computed: {
    btnDisabled() {
      if (this.vertical) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    //获取验证码函数
    getKpa(name){
       this.$refs[name].validate((valid) => {
              if (valid) {
                let data = {
                    phoneNum:this.phoneNum.number
                }
               axios({
                    method: "post",
                    url: config.sso + interfaceUrl.sendCaptcha,
                    data: JSON.stringify(data)
                  }).then(r=>{
                    console.log(r.data.result)
                    if(r.data.result == '0'){
                      this.msgId = r.data.id
                      this.$Message.success({
                        content:r.data.description +'验证码为：'+ r.data.captcha,
                        duration:4
                      });
                        let time = 60
                        let timer = setInterval(()=>{
                          time --;
                          if(time === 0){
                            clearInterval(timer);
                            this.showMessage = '重新获取'
                            this.btnStatus = false
                          }else{
                            this.showMessage = `倒计时${time}秒`
                            this.btnStatus = true
                          } 
                        },1000)
                    }else{
                      this.$Message.error({
                        content:r.data.message,
                        duration:3
                      });
                    }
                  });
                } else {
                    this.$Message.error('请输入正确的手机号码');
                  }
              })
    },
    changePassword(){
      this.confirmModal = false
      // this.phoneModal = true
      this.$router.push({ name: getRouterName()[0]});
    },
    //短信提交函数
    submitPhone(){
      let data= {
        phoneNum:this.phoneNum.number,
        captcha:this.phoneNum.captcha,
        id:this.msgId
      }
      if(this.phoneNum.captcha){
          axios({
            method: "post",
            url: config.sso + interfaceUrl.validate,
            data: JSON.stringify(data)
        }).then(r=>{
          if(r.data.result == '200'){
            this.$Message.success(r.data.message)
           setTimeout(() => {
              this.$router.push({ name: getRouterName()[0] })
           }, 2000);
          }else{
             this.$Message.error(r.data.message)
          }  
        })
      }else{
        this.$Message.error('验证码不能为空')
        return false
      }
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
    /**
     * 拿单一窗口的refresh_token获取新的token
     */
    singlewindowLogin(param) {
      let data = {
        client_id: "m1",
        client_secret: "s1",
        grant_type: "password",
        app_type: "singlewindow",
        scope: "read",
        f1: false, //  标记本次请求是否对密码进行MD5加密
        username: "",
        password: ""
      };
      return axios({
        method: "post",
        url: config.sso + interfaceUrl.login,
        data: this.urlSearchParams(Object.assign(data, param)),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*"
        }
      });
    },
    /**
     *提交角色
     */
    singlewindowRoleSelect(param) {
      return axios({
        method: "post",
        url: config.sso + interfaceUrl.roleOfChoice,
        data: JSON.stringify(param)
      });
    },
    confirm() {
      let _this = this;
      this.$Modal.confirm({
        title: "提交用户角色信息",
        content: "确认提交",
        onOk: () => {
          _this.singlewindowRoleSelect({
              role: this.vertical,
              userId: this.username,
              code: _this.code
            })
            .then(r => {
              // console.log(r);
              if (r["data"]["code"] == 200) {
                // console.log({ refresh_token: _this.refresh_token });
                _this
                  .singlewindowLogin({ refresh_token: _this.refresh_token })
                  .then(r => {
                    _this.singlewindow(r);
                  });
              } else {
                this.$Message.error(r["data"]["msg"]);
              }
            });
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },

    radioChange(val) {
      // console.log(val);
    },

    singlewindow(r) {
      let _this = this;
      if (r["data"]["token"]) {
        // 登录成功 解析 ROLE
        let roleStr = "bearer " + r["data"]["token"],
          role = r["data"]["role"];
        //  console.log(roleStr)
        //  console.log(role)
        if (!role) {
          // 没有ROLE 提交角色信息后，登录首页
          _this.username = r["data"]["userId"];
          _this.showLoading = false;
          //  _this.code=''
        } else {
          // 有 ROLE 写token 登录首页
          setCookie("roler", role, 0);
          setCookie("ACCESS_TOKEN", "bearer " + r["data"]["token"], 0);
          setCookie("user", r["data"]["userId"], 0);
          setCookie("hasPassword", r["data"]["pwdIsNull"], 0);
          // this.confirmModal = true
         // console.log(r["data"]["pwdIsNull"])
          // console.log(r["data"]["token"])
          sessionStorage.setItem("menus", JSON.stringify(r.data.menus));
           if(r["data"]["pwdIsNull"] == 1){
              this.username = r["data"]["userId"]
              this.showLoading =false
              this.confirmModal = true
           }else if(r.data.pwdStatus == '0'){
              this.$refs.psd.openModal()
              this.showLoading = false
           }else{
             this.$router.push({ name: getRouterName()[0] });
           }
        }
      } else {
        // 登录失败，回到登录页
        this.$Modal.error({
          title: "登录失败",
          content: r["data"]["msg"],
          onOk() {
            _this.$router.push({ name: "login", query: {} });
          }
        });
      }
    },

    openShowLoading(){
      this.showLoading = true
    }
  },

  mounted() {
    // console.log('mounted....');
    // http://tradeportal.lines.coscoshipping.com/#/redirect?refresh_token=
    // let reftk = this.$route.query
    // console.log(reftk)
    this.refresh_token = this.$route.params.singleToken;
    let _this = this;
    this.singlewindowLogin({ refresh_token: this.refresh_token }).then(r => {
      if (r.status == 200) {
        _this.singlewindow(r);
      } else {
        this.$Message.error("登录出错！请重新登录");
        _this.$router.push("/login");
      }
    });
  }
};
</script>

<style lang="scss" scoped="">
</style>
