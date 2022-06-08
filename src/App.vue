<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
// import permission from '@/routes/permission'
import { getCookie } from "./until/getToken";
export default {
  name: "app",
  data() {
    return {
      msg: "",
      isDefend: false
    };
  },
  created() {
    this.defend();
    // this.reloadRouter();
  },
  methods: {
    defend() {
      const date = new Date();
      if (
        date < new Date(2019, 5, 20, 18, 30)
      ) {
        this.$Modal.info({
          title:'通知！',
          content:'<h3>通知！今天6月20日周四下午17:30至18:30，跨进平台系统维护，届时将影响企业在平台上的操作。请各位周知！并相互转告！</h3>'
        })
      }
    },

    reloadRouter() {
      let role = getCookie("roler");
      console.log(role)
      // if (!role) {
      //   this.$router.push({ path: "/login" });
      // } else {
      //   // role=role[0].split('_')[1]
      //   // this.$router.addRoutes(permission[role])
      // }
    },
    isChrome() {
      var u = navigator.userAgent;
      var isTrue = u.indexOf("AppleWebkit") > -1;
      if (!isTrue) {
        this.$Message.infor("建议使用谷歌浏览器！");
      }
    },
    
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
