<template>
    <div class="layoutBox">
        <div class="header clear">
            <div class="logo clear">
                <!-- <img src="../../assets/welLogo.png" alt=""> -->
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
                <!-- <li><a href="http://www.singlewindow.sh.cn/winxportal/static/news/list.html?cols=2">新闻</a></li> -->
                <li>
                    <Tooltip placement="top" max-width="600" style="width: 100%">
                      <a href="javascript:void(0)">新闻</a>
                      <div slot="content">
                        <a style="border: none; color: #FFF" href="https://mp.weixin.qq.com/s?__biz=MzA5ODQ4MDUzNA==&mid=2652292035&idx=1&sn=3347605d06fa2ef4f17c8cfcba4458e8&chksm=8b729b3abc05122c2b74238316fd952f056205b2382c0e6b3ae18b159fa8e4301df920976294&mpshare=1&scene=1&srcid=&key=a2ed73936a3136e4f8dfc86fb5f21ca62241ef14d13872cf14f013d476df2ad4ee27903468a817b78ad3f71df54ad7b1bb41e8ed1490e5195dc7b3641f8600980e7ab5e182fa5299856aced7939b9194&ascene=1&uin=NjkxMDg1MDY3&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=Jo5JUKaTRW9ggFJYM9JKrIIBfSGGztIxhpWAOwPFngg1PSYjVZgK%2F%2FJFHBB%2BSUFN">上海海关跨境贸易大数据平台【技术篇】</a>
                        <a style="border: none; color: #FFF" href="https://mp.weixin.qq.com/s?__biz=MzA5ODQ4MDUzNA==&mid=2652292013&idx=1&sn=2a5223c80df13a3103fd95c56d72e11b&chksm=8b729b54bc0512422d9ce87f6c1985d57183f103b442064a4329207c295e1fc15f29cc61a1cc&mpshare=1&scene=1&srcid=&key=6ff676ea8e4091fd685b0708bb1e5ce83011dc0892b44977e41e8732d4b85a4874b40ffb97a0596541ef003fc2551cfdb6607d41f4165f616a3a1461f3e75f0a3fd1250baa14e7f7fb64fa24f63ecee7&ascene=1&uin=NjkxMDg1MDY3&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=Jo5JUKaTRW9ggFJYM9JKrIIBfSGGztIxhpWAOwPFngg1PSYjVZgK%2F%2FJFHBB%2BSUFN">上海海关跨境贸易大数据平台【途径篇】</a>
                        <a style="border: none; color: #FFF" href="https://mp.weixin.qq.com/s?__biz=MzA5ODQ4MDUzNA==&mid=2652291995&idx=1&sn=183227e36f0736396241e219f410c523&chksm=8b729b62bc051274abec126e7b002a45c079854280a2c6404dc0d3ab13483349bd9ee698d997&mpshare=1&scene=1&srcid=&key=0d395d45dee340535cdc01eb0227a2c31d40c9777db560d70d705d1245355e229c364c295d50c4847941735457600257c50c1788e464c6abf391671b4c82dc9ba4b9b04230e0de8722a4bd2ff750e153&ascene=1&uin=NjkxMDg1MDY3&devicetype=Windows+10&version=62060833&lang=zh_CN&pass_ticket=Jo5JUKaTRW9ggFJYM9JKrIIBfSGGztIxhpWAOwPFngg1PSYjVZgK%2F%2FJFHBB%2BSUFN">上海海关跨境贸易大数据平台【入门篇】</a>
                      </div>
                    </Tooltip>
                </li>
                <!-- <li><a href="http://www.singlewindow.sh.cn/winxportal/static/news/list.html?cols=1">通知</a></li> -->
                <li>
                    <Tooltip placement="top" max-width="600" style="width: 100%">
                      <a >通知</a>
                      <div slot="content">
                        <!-- <a style="border: none; color: #FFF" href="/excel/跨境贸易智慧通移动端快速提离功能使用说明.docx" >跨境贸易智慧通移动端快速提离功能使用说明</a>
                        <a style="border: none; color: #FFF" href="/excel/customsEntryD.apk" >通关可视化测试环境apk下载</a>
                        <a style="border: none; color: #FFF" href="/excel/customsEntryP.apk" >通关可视化生产apk下载</a> -->
                        <!-- <a style="border: none; color: #FFF" href="javascript:void(0)">2</a> -->
                      </div>
                    </Tooltip>
                </li>
                <li><a href="javascript:void(0)">业务介绍</a></li>
            </ol> 
            <h1 v-if='toggle'>跨境贸易智慧通</h1>
            <div class="contanier" :class="{hideTab:toggle}" >
                <div class="welcome" v-if='!toggle'>
                    <h1>智慧通 带你走进新世界</h1>
                    <!-- 常用登陆首页-->
                    <p>
                      <span @click="swicth">跨境贸易智慧通</span>
                       <!-- 屏蔽进博会-->
                      <router-link to='/zbhLogin'>进博会专窗</router-link>
                      <!-- 此处链接海关要求先关闭-->
                      <!-- <router-link to='/companyRank' style="position: fixed; opacity:0;bottom: 320px;right: 220px;">通关企业排名</router-link> -->
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
    let params=str.split("=")
    // var token = params[1]&& params[1].replace('#/','');
    var token = params[1]&& params[1].split('#')[0]  //新的登录接口
    // console.log(token)
    next(vm => {
      if (token)
        vm.$router.push({ name: "roleSelect", params: { singleToken: token } });
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
  //  this.countTime()
   
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
    },

    // countTime(){
    //         let nowdate = new Date().getTime()
    //         let until = new Date('2020-8-06 14:00:00').getTime()
    //         let day =until-nowdate
    //         if(day>0){
    //           this.$Message.warning({
    //              content:'通知：计划于2020年8月6日上午10点到下午14点进行网络维护，届时跨境平台无法访问，请大家知晓并提前安排相关工作',
    //              duration:10,
    //           })
    //          }else{}
    //     },
  },

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
