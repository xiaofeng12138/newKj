<template>
  <div class="layout">
    <Layout>
      <Header>
        <router-link to="/" style="font-size: 26px;">
          <img src="../../../assets/logo.png" width="30px" height="30px" alt="">跨境贸易智慧通<span v-if="role.includes('EB')||role.includes('EC')">——进博会专窗</span>
        </router-link>

        <!-- <span class="headerYear">
          {{nowYear}}111111
        </span> -->
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
        width='450px'
        >
        <p slot='header'>
            修改密码
        </p>
        <p slot="close"></p>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="旧密码" prop="oldpasswd">
            <Input type="password" v-model="formCustom.oldPassword" :disabled='hasPassword=="1"'></Input>
        </FormItem>
        <FormItem label="新密码" prop="password">
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
  </div>
</template>
<script>
import axios from "axios";
import config from "@/until/config";
import { removeCookie, getCookie, getUserRole } from "@/until/getToken";
import { publicInter } from "@/api/http";
import menuList from "./components/menuList.vue";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  name: "index",
  components: { menuList },
  data() {
    //修改密码验证
    const validatePass = (rule, value, callback) => {
      if (this.hasPassword && value === "") {
        callback(new Error("请输入密码！"));
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
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
        callback(new Error("密码必须包含数字、字母和符号，并且长度大于8！"));
      } else {
        callback();
      }
    };

    return {
       nowYear:getCookie('date'),
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
      //验证规则
      ruleCustom: {
        oldPassword: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validateNewPw, trigger: "blur" }],
        confirmPassword: [{ validator: validatePassCheck, trigger: "blur" }]
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
      this.formCustom.oldPassword = "111111";
    }
  },
  methods: {
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
          if (data.code == "200") {
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
        confirmPassword: "",
        userId: ""
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
          publicInter(config.sso + interfaceUrl.changePW, parma)
            .then(r => {
              this.modal = false;
              if (r.code == "200") {
                this.$Message.success("密码修改成功!");
                this.formClear();
                this.$router.push({ path: "/" });
              } else {
                this.$Message.error(r.message);
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
</style>
