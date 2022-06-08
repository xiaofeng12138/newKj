<template>
  <div class="layout">
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
                <Input type="password" v-model="formCustom.oldPassword"></Input>
            </FormItem>
            <FormItem label="新密码" prop="password" style="margin-bottom:30px">
                <Input type="password" v-model="formCustom.password"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="confirmPassword">
                <Input type="password" v-model="formCustom.confirmPassword"></Input>
            </FormItem>
        </Form>
        <p slot='footer'>
            <Button  @click="()=>this.modal=false">取消</Button>
            <Button type="primary" @click="ok">确定</Button>
        </p>
    </Modal>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/until/config";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import {getCookie,getRouterName} from "@/until/getToken";
export default {
  data() {
    //修改密码验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
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

    return {
      modal: false,
      //表单key-vlaue
      formCustom: {
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      //验证规则
      ruleCustom: {
        oldPassword: [{required:true, validator: validatePass, trigger: "blur" }],
        password: [{required:true, validator: validateNewPw, trigger: "blur" }],
        confirmPassword: [{required:true, validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    //修改密码
    openModal(){
      this.modal = true
    },
    ok() {
      var parma = {};
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          var OldPW = this.formCustom.oldPassword;
          var NewPW = this.formCustom.password;
          var ConfirmPW = this.formCustom.confirmPassword;
          parma = {
            oldPassword: OldPW,
            password: NewPW,
            confirmPassword: ConfirmPW
          };
          axios({
            method: "post",
            url: config.sso + interfaceUrl.changePW,
            header: { Authorization: getCookie("ACCESS_TOKEN") },
            data: JSON.stringify(parma)
          }).then(r => {
              this.modal = false;
              if (r.data.code == "200") {
                this.$Message.success("密码修改成功!");
                this.$router.push({ name: getRouterName()[0] });
              } else {
                this.$Message.error(r.data.message);
              }
            })
            .catch(e => {
              this.modal = false;
              this.$Message.error("密码修改失败！");
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
