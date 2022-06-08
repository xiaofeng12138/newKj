<template>
  <div class="layout">
    <Layout>
      <Header>
        <router-link to="/" style="font-size: 26px;">
          <!--常用图片 <img src="../../assets/logo.png" width="30px" height="30px" alt=""> -->
          跨境贸易智慧通<span v-if="role.includes('EB')||role.includes('EC')||role.includes('ESHA')">——进博会专窗</span>
        </router-link>
        <span class="headerYear" v-if="role.includes('EB')||role.includes('EC')||role.includes('ESHA')">
          {{nowYear}}
        </span>
        <Dropdown>
          <a href="javascript:void(0)">
            <Icon type="person"></Icon>{{userName}}
          </a>
          <DropdownMenu slot="list">
            <DropdownItem >
              <span @click="loginOut">退出账户</span>
            </DropdownItem>
            <DropdownItem >
              <span @click="()=>this.modal=true">修改密码</span>
            </DropdownItem>
            <DropdownItem >
              <span @click="()=>this.phoneModal=true">绑定手机号</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Header>
      <Layout :style="{height:height}">
        <Sider hide-trigger :style="{background: 'rgb(0,104,190)',height:'100%',width:'250px',flex:' 0 0 250px'}">
            <Menu theme="light" width='auto' mode="vertical" accordion >
                <menu-list :menuList='menuConfig'></menu-list>
            </Menu>
        </Sider>
        <Layout>
          <Content :style="{padding: '24px 24px 0 24px',margin:'24px', background: '#fff'}">
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </Content>
        </Layout>
      </Layout>
    </Layout>
     <Modal
        v-model="modal"
        :mask-closable='false'
        width='500px'
        >
        <p slot='header'>
            应海关总署要求，密码需使用强口令
        </p>
        <p slot="close"></p>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="旧密码" prop="oldPassword" style="margin-bottom:30px">
            <Input type="password" v-model="formCustom.oldPassword" :disabled='hasPassword=="1"'></Input>
        </FormItem>
        <FormItem label="新密码" prop="password" style="margin-bottom:30px">
            <Input type="password" v-model="formCustom.password"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPassword">
            <Input type="password" v-model="formCustom.confirmPassword"></Input>
        </FormItem>
        </Form>
        <p slot='footer'>
            <Button v-if='hasPassword!="1"' @click="()=>this.modal=false">取消</Button>
             <Button type="primary" @click="ok">确定</Button>
        </p>
    </Modal>

     <Modal
        v-model="phoneModal"
        :mask-closable='false'
        width='450px'
        >
        <p slot='header'>
            绑定手机号
        </p>
        <p slot="close"></p>
          <Form  :model="phoneNum"  :label-width="100">
            <FormItem label="请输入手机号" >
                  <Input type="text" v-model="phoneNum.number"></Input>
            </FormItem>
          </Form>
        <p slot='footer'>
             <Button  @click="()=>this.phoneModal=false">取消</Button>
             <Button type="primary" @click="okNumber">确定</Button>
        </p>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import config from "@/until/config";
import { removeCookie, getCookie, getUserRole } from "../../until/getToken";
import { mapGetters, mapMutations } from "vuex";
import { publicInter } from "@/api/http";
import menuList from "./menuList.vue";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  name: "index",
  components: { menuList },
  data() {
    //修改密码验证
    const validatePass = (rule, value, callback) => {
      if (this.hasPassword && value === "") {
        callback(new Error("请输入旧密码！"));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码！"));
      } else if (this.formCustom.password !== value) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    const validateNewPw = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码！"));
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{13,}$/gi.test(value)) {
        callback(new Error("密码必须大于等于13位，且必须包含大小写字母、数字、符号！"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
          return callback(new Error('手机号不能为空'));
      } else if (!/^1[345789]\d{9}$/.test(value)) {
          callback('手机号格式不正确');
      } else {
          callback();
      }   
    };

    return {
      nowYear:getCookie('date'),
      phoneModal:false, //修改密码弹框
      //菜单JSON
      menuConfig: [],
      //菜单高度
      height: null,
      //用户名
      userName: null,

      //是否有密码(单一窗口登录?)
      hasPassword: true,
      //角色
      role: "",
      //模态框状态
      modal: false,
      //表单key-vlaue
      formCustom: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
        userId: ""
      },
      //手机号表单
      phoneNum:{
          number:''
      },
      checkNumber:{
        addNumber:[{ validator: validatePhone, trigger: "blur" }],
      },
      //验证规则
      ruleCustom: {
        oldPassword: [{required:true, validator: validatePass, trigger: "blur" }],
        password: [{required:true, validator: validateNewPw, trigger: "blur" }],
        confirmPassword: [{required:true, validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  created() {
    this.role = getCookie("roler");
    this.menuConfig = JSON.parse(sessionStorage.getItem("menus"));
  },
  mounted() {
    this.userName = getCookie("user");
    this.contentHeight();
    this.hasPassword = getCookie("hasPassword");
    if (this.hasPassword == "1") {
      this.modal = true;
      //没有密码，设置默认旧密码
      this.formCustom.oldPassword = "AAAAaaaa1111!";
    }
  },
  methods: {
    //提交手机号码
    okNumber(){
      let phoneNumber = this.phoneNum.number;
      if((/^1[3456789]\d{9}$/).test(phoneNumber)){
        let data = {
          mobile:phoneNumber,
        }
      axios({
            method: "post",
            url: config.sso + interfaceUrl.changeUserMobile,
            header: { Authorization: getCookie("ACCESS_TOKEN") },
            data:data
          }).then(res=>{
            if(res.data.code == 200){
              this.$Message.success('绑定成功')
              this.phoneNum.number = ''
              this.phoneModal = false    
            }else{
              this.$Message.error('绑定失败') 
            }
          }).catch((error)=>{
              this.$Message.error('手机号码已存在！！！')
              this.phoneNum.number = ''
              this.phoneModal = false   
              Promise.reject(error)    
          })
      }else{
        this.$Message.error('您输入的手机号码不正确！！！')
      }
    },
    contentHeight() {
      this.height =
        (document.documentElement.clientHeight || document.body.clientHeight) -
        65 +
        "px";
      window.onresize = () => {
        this.height =
          (document.documentElement.clientHeight ||
            document.body.clientHeight) -
          65 +
          "px";
      };
    },
    /**
     * 退出登录
     */
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
            sessionStorage.clear();
            this.$router.push({ path: "/login" });
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
    //手动清空表单
    formClear() {
      this.formCustom = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      };
    },

    //修改密码
    ok() {
      var parma = {};
      this.$refs["formCustom"].validate(valid => {
        // console.log(valid)
        if (valid) {
          var OldPW = this.formCustom.oldPassword;
          var NewPW = this.formCustom.password;
          var ConfirmPW = this.formCustom.confirmPassword;
          parma = {
            // userId:this.userName,
            oldPassword: OldPW,
            password: NewPW,
            confirmPassword: ConfirmPW
          };
          // console.log(config.sso + interfaceUrl.changePW);
            console.log(getCookie("ACCESS_TOKEN"))
          axios({
            method: "post",
            url: config.sso + interfaceUrl.changePW,
            header: { Authorization: getCookie("ACCESS_TOKEN") },
          
            data: JSON.stringify(parma)
          })
            .then(r => {
              this.modal = false;
              
              if (r.data.code == "200") {
                this.$Message.success("密码修改成功!");
                this.formClear();
                this.$router.push({ path: "/login" });
              } else {
                this.$Message.error(r.data.message);
                this.formClear();
              }
            })
            .catch(e => {
              this.modal = false;
              this.$Message.error("密码修改失败！");
              this.formClear();
            });
        } else {
          this.$Message.error("请正确填写密码!");
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.iconIndex {
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top: -3px;
}
.ivu-layout-header {
  position: relative;
  line-height: 64px;
  > a {
    float: left;
    color: #fff;
    font-size: 16px;
    img {
      margin-right: 10px;
      vertical-align: middle;
    }
  }
}
.ivu-dropdown {
  float: right;
  font-size: 14px;
  a {
    color: #fff;
  }
  i {
    font-size: 16px;
    margin-right: 10px;
  }
}
.ivu-menu-light {
  background: transparent;
}
.headerYear{
  position: absolute;
  right: 60px;
  font-size: 20px;
  margin-right: 100px;
}
</style>
