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
              <!-- <Icon type="social-windows"></Icon> -->
              <span>货代（FF）</span>
          </Radio>
        </RadioGroup>
      </Col>
    </Row>

    <Row style="margin-top:20px;">
      <Button type="success" :disabled="btnDisabled" @click="confirm">提交用户角色信息</Button>
    </Row>
  </div>
</template>

<script>
import { setCookie, getRouterName } from "@/until/getToken";
import interfaceUrl from "@/api/interfaceUrl";
import config from "@/until/config";
import axios from "axios";

export default {
  data() {
    return {
      vertical: "",
      showLoading: true,
      username: "",
      code: ""
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
      // console.log(param);
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
      // console.log(param);
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
          sessionStorage.setItem("menus", JSON.stringify(r.data.menus));
          this.$router.push({ name: getRouterName()[0] });
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
    }
  },

  mounted() {
    // console.log('mounted....');
    // http://tradeportal.lines.coscoshipping.com/#/redirect?refresh_token=
    // let reftk = this.$route.query
    // console.log(reftk)
    this.refresh_token = this.$route.params.singleToken;
    console.log(this.refresh_token)
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
