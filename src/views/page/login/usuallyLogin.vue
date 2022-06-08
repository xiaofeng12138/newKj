<template>
    <div class="layoutBox">
        <div class="header clear">
            <div class="logo clear">
                <img src="../../assets/welLogo.png" alt="">
            </div>

        </div>
        <div class="content" :style="{height:height}" >
            <div class="bg1" :class="{change:toggle}"></div>
            <div class="bg2"></div>
            <img src="../../assets/bj_ship.png" alt="" v-if='!toggle' />
            <h1 class="text" v-if='!toggle'>
                THE <br> 
                CROSS-BORDER <br>
                TRADING <br>
            </h1>
            <ol class="newsTab clear" :class="{closeTab:toggle}">
                <li><a href="http://www.singlewindow.sh.cn/winxportal/static/news/list.html?cols=2">新闻</a></li>
                <li><a href="http://www.singlewindow.sh.cn/winxportal/static/news/list.html?cols=1">通知</a></li>
                <li><a href="javascript:void(0)">业务介绍</a></li>
            </ol> 
            <h1 v-if='toggle'>跨境贸易智慧通</h1>
            <div class="contanier" :class="{hideTab:toggle}" >
                <div class="welcome" v-if='!toggle'>
                    <h1>智慧通 带你走进新世界</h1>
                    <p>
                        <span @click="swicth">跨境贸易智慧通</span>
                        <router-link to='/zbhLogin'>进博会专窗</router-link>
                    </p>
                </div>
                
                <loginModule ></loginModule>
            </div>

        </div>
        <div class="footer">
            <div class="box clear">
                <span>沪ICP备 05012889 号</span>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31022102000177" style="color:#fff;margin-left:10px;">
                <img src="../../assets/icp.png" alt="" style="vertical-align:middle;margin-top:-3px;">
                沪公网安备 31022102000177号</a>
                <p class="code">
                    <span>关注我们的微信公众号</span>
                </p>
            </div>
        </div>
        <!-- <iframe id="showIframe" style="display:none"  frameborder=0 name="showHere" scrolling=auto
                src="http://www.singlewindow.sh.cn/winxportal/">

        </iframe> -->
    </div>
</template>
<script>

import loginModule from "../module/login/loginModule";

export default {
  components: { loginModule },
  beforeRouteEnter(to, from, next) {
    var str = window.location.href;
    console.log(str)
    var token = str.split("=")[1].replace('#/','');
   
    console.log(token)
    next(vm => {
      if (token)
        vm.$router.push({ name: "singleWindow", params: { singleToken: token } });
    });
  },
  mounted() {
    
    this.height =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      112 +
      "px";
    window.onresize = () => {
      this.height =
        (document.documentElement.clientHeight || document.body.clientHeight) -
        112 +
        "px";
    };
  },
  data() {
    return {
      
      height: 0,
      
      toggle: false,
    };
  },
  methods: {
    swicth() {
      this.toggle = !this.toggle;
    }
  }
};
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
$color: #1b3787;
$redColor: #b71414;
* {
  box-sizing: border-box;
}

.layoutBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .header {
    padding: 10px 40px;
    background: $color;
    height: 60px;
    .logo {
      float: right;
      img {
        width: 250px;
        height: 40px;
      }
    }
  }
  .footer {
    width: 100%;
    background: $color;
    height: 50px;
    color: #fff;
    font-size: 14px;
    line-height: 50px;
    .box {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .code {
        float: right;
        &:hover {
          img {
            opacity: 1;
            z-index: 10;
          }
        }
        img {
          vertical-align: middle;
          margin-left: 8px;
          position: absolute;
          opacity: 0;
          right: 0;
          top: -70px;
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }
  .content {
    position: relative;
    overflow: hidden;
    > h1.text {
      font-weight: 500;
      position: absolute;
      right: 4.6%;
      top: 20px;
      width: 20%;
      line-height: 40px;
      padding: 0 1em !important;
      font-size: 2em !important;
      // border: 1px solid #000;
      text-align: left !important;
      > hr {
        width: 50%;
        margin-top: 20px;
        background: #ffffff;
        border-color: #fff;
        height: 3px;
      }
    }
    > img {
      position: absolute;
      width: 100%;
      // height: calc(100% + 110px) ;
      right: 0;
      // bottom: 0;
      bottom: 0;
    }
    .newsTab {
      &.closeTab {
        transform: translate(0, 120%);
      }
      position: absolute;
      width: 100%;
      list-style: none;
      padding: 18px 0;
      margin: 0;
      left: 0;
      bottom: 0px;
      border-bottom: 6px solid $redColor;
      transition: all 0.7s cubic-bezier(0.6, -0.3, 0.74, 0.05);
      > li {
        float: left;
        width: 33.33333%;
        text-align: center;
        &:last-child {
          a {
            border-right: 0;
          }
        }

        a {
          color: $color;
          display: block;
          width: 100%;
          height: 30px;
          font-weight: 600;
          line-height: 30px;
          font-size: 16px;
          border-right: 1.5px solid $color;
        }
      }
    }
    .bg1,
    .bg2 {
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .bg1 {
      &.change {
        animation: fade 1s ease-in-out;
      }
      z-index: -1;
      background-image: url("../../assets/newBg.png");
    }
    .bg2 {
      z-index: -2;
      background-image: url("../../assets/company.jpg");
    }
    h1 {
      color: #fff;
      text-align: center;
      font-size: 36px;
      padding: 30px 0 0 0;
    }
    .contanier {
      width: 90%;
      margin: 0 auto;
      background: transparent;
      &.hideTab {
        .login {
          display: block;
        }
        
      }
      .welcome {
        width: 70%;
        margin-left: 10%;
        padding-top: 30px;
        h1 {
          text-align: left;
          font-size: 48px;
          font-weight: 500;
          margin-bottom: 100px;
        }
        > p {
          span {
            margin-right: 80px;
            cursor: pointer;
          }
          span,
          a {
            font-size: 24px;
            position: relative;
            color: #fff;
            display: inline-block;
            width: 230px;
            line-height: 60px;
            height: 60px;
            border-bottom-left-radius: 30px;
            border-top-right-radius: 30px;
            text-align: center;
            background-image: linear-gradient(-179deg, #105ffe 2%, #1346ec 98%);
          }
        }
      }
    }
  }
}
@keyframes jump {
  from {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 30px);
  }
  to {
    transform: translate(0, 0);
  }
}
@keyframes Gotop {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(150%, 0);
  }
}
@keyframes Gobottom {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-150%, 0);
  }
}
@keyframes change {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
@keyframes change2 {
  from {
    opacity: 1;
    transform: rotateZ(0) scale(1);
  }
  to {
    opacity: 0;
    transform: rotateZ(360deg) scale(0);
  }
}
@keyframes fade {
  from {
    opacity: 1;
    filter: blur(0px);
  }
  50% {
    opacity: 0.7;
    filter: blur(15px);
  }
  to {
    filter: blur(30px);
    opacity: 0;
  }
}
</style>
