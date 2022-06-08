<template>
    <div class="homePage">
        <div class="head">
            <div class="dropMenu" :class="{'show':visible}">
                <div class="nav-button" @click="visible=false"></div>
                <ul class="contanier" >
                  <li @click="routeJump($event,'0')">
                        <div class="dropItem-title">
                            总体情况
                        </div>
                        <ol class="subMenu">
                           
                            <li>
                                <router-link to='/exhibitionMapNew'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/zhgk.svg" alt="">展会概况
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/CCIE/exhibiQuery'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/zhgk.svg" alt="">展商展品查询
                                </router-link>
                            </li>
                            <li>
                                <div class="subTitle" ><img class="itemIcon" src="@/assets/qietu/dropMenu/zzxg.svg" alt="">往届对比</div>
                                <ol class="subMenuItem">
                                    <li>
                                        <router-link to='/CCIE/overview'>
                                           总体概况
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/CCIE/topWordList'>
                                           最字榜
                                        </router-link>
                                    </li>
                                     <li>
                                        <router-link to='/CCIE/globalOverview'>
                                           参展概况
                                        </router-link>
                                    </li>
                                </ol>
                            </li>
                             <li>
                                <router-link to='/CCIE/specialExhibits'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/zhgk.svg" alt="">  特色展品
                                </router-link>
                            </li>
                            
                            
                        </ol>
                    </li>
                    <li @click="routeJump($event,'1')">
                        <div class="dropItem-title">暂进情况</div>
                        <ol class="subMenu">
                            <li>
                                <router-link to='/CCIE/exhibitionPictrue'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/zggk.svg" alt="">展馆概况
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/zjindex'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/tszp.svg" alt="">展品概况
                                </router-link>
                            </li>
                             <li>
                                <router-link to='/CCIE/exhibitOverview'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/zpgk.svg" alt="">展品分类
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/CCIE/materialLift'>
                                    <img class="itemIcon" src="@/assets/qietu/dropMenu/kstl.svg" alt="">快速提离
                                </router-link>
                            </li>
                        </ol>
                    </li>
                    <li @click="routeJump($event,'2')">
                        <div class="dropItem-title">海关监管与服务</div>
                        <ol class="subMenu">
                          <li>
                                <div class="subTitle" ><img class="itemIcon" src="@/assets/qietu/dropMenu/zzxg.svg" alt="">展前通关</div>
                                <ol class="subMenuItem">
                                    <li>
                                        <router-link to='/CCIE/proofApprove'>
                                            <img class="itemIcon" src="@/assets/qietu/dropMenu/zmh.svg" alt="">进境物资证明函
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/CCIE/jy'>
                                           <img class="itemIcon" src="@/assets/qietu/dropMenu/qhjg.svg" alt="">海关监管数据
                                        </router-link>
                                    </li>
                                     <li>
                                         <router-link to='/CCIE/ciieQueryStatistics'>
                                             <img class="itemIcon" src="@/assets/qietu/dropMenu/kstl.svg" alt="">进博会数据统计
                                         </router-link>
                                    </li>
                                     <li>
                                         <router-link to='/CCIE/dzbd'>
                                             <img class="itemIcon" src="@/assets/qietu/dropMenu/kstl.svg" alt="">保单担保
                                         </router-link>
                                    </li>
                                     <li>
                                         <router-link to='/CCIE/dzbh'>
                                             <img class="itemIcon" src="@/assets/qietu/dropMenu/kstl.svg" alt="">保函担保
                                         </router-link>
                                    </li>
                                    <li>
                                         <router-link to='/CCIE/crossbussiness'>
                                             <img class="itemIcon" src="@/assets/qietu/dropMenu/kstl.svg" alt="">转跨境电商
                                         </router-link>
                                    </li>
                                 </ol>
                          </li>
                            <li>
                                <div class="subTitle"><img class="itemIcon" src="@/assets/qietu/dropMenu/zzxg.svg" alt="">展中监管</div>
                                <ol class="subMenuItem">
                                   <div class="subTitle"><img class="itemIcon" src="@/assets/qietu/dropMenu/zzxg.svg" alt="">展中巡馆</div>
                                    <li>
                                        <router-link to='/CCIE/rangerRecord' style="margin-left:50px">
                                           巡馆记录
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/CCIE/xgTotal' style="margin-left:50px">
                                          巡馆统计
                                         </router-link>
                                    </li>
                                    
                                </ol>
                                <ol class="subMenuItem">
                                   <div class="subTitle"><img class="itemIcon" src="@/assets/qietu/dropMenu/zzxg.svg" alt="">呼叫响应</div>
                                  <li>
                                        <router-link to='/CCIE/callRecord' style="margin-left:50px">
                                           一键呼叫受理
                                        </router-link>
                                    </li>
                                      <li>
                                        <router-link to='/CCIE/consultRecord' style="margin-left:50px">
                                           展商咨询
                                        </router-link>
                                    </li>
                                </ol>
                            </li>
                            
                        </ol>
                    </li>
                    <li @click="routeJump($event,'3')">
                        <ol class="subMenu" style="margin-top:70px">
                            <li>
                                <div class="subTitle" ><img class="itemIcon" src="@/assets/qietu/dropMenu/zzxg.svg" alt="">展后处置</div>
                                <ol class="subMenuItem">
                                    <li>
                                        <router-link to='/CCIE/agentCensus'>
                                          各主场承运商汇总统计数据
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/CCIE/flowOfCommod'>
                                         展后商品流向分析
                                        </router-link>
                                    </li>
                                 </ol>
                          </li>
                          
                        </ol>
                    </li>
                </ul>
            </div> 
            <div class="top">
                <a style="width: 10%">
                  <img src="@/assets/logo2.png" @click="toCCIE" alt="" style="cursor: pointer">
                </a>
                <h1>中国国际进口博览会通关监控大数据平台</h1>
                <div class="user" >
                  <span class="headerYear">
                     {{nowYear}}
                 </span>
                    <Dropdown >
                        <a href="javascript:void(0)" class="userName" >
                            <img src="@/assets/ccie-log-in.png" alt="">{{userName}}
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem >
                                <span @click="loginOut">退出账户</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>  
                    <div class="nav" @click="visible=!visible">
                      <img src="@/assets/ccie-button-nav-default.png" v-if="!visible" alt="">
                      <img src="@/assets/ccie-button-nav-close.png" v-else alt="">
                    </div>
                </div>
            </div>       
        </div>
    </div>
</template>
<script>
 //进博会首页已登录
import navTab from "./components/navTab";
import { getCookie, removeCookie } from "@/until/getToken";
import interfaceUrl from "@/api/interfaceUrl";
import axios from "axios";
import config from "@/until/config";
import countTime from '@/components/countdown/countdown.vue'
import waterMark from '@/until/watermark.js'
const navObj = [
  {
    text: "总体情况",
    child: [
      {
        text: "展会概况",
        isA: false,
        src: "/exhibitionMapNew"
      },
      {
        text: "展商展品查询",
        isA: false,
        src: "/CCIE/exhibiQuery"
      },
      {
        text: "往届对比",
        child: [
          { text: "总体概况", isA: false, src: "/CCIE/overview" },
          { text: "最字榜", isA: false, src: "/CCIE/topWordList" },
          { text: "参展概况", isA: false, src: "/CCIE/globalOverview"},
        ]
      },
      { text: "特色展品", isA: false, src: "/CCIE/specialExhibits" },
    ]
  },
  {
    text: "暂进情况",
    child: [
      {
        text: "展馆概况",
        isA: false,
        src: "/CCIE/exhibitionPictrue"
      },
       { text: "展品概况", 
        isA: false,
        src: "/zjindex"
      },
      {
        text: "展品分类",
        isA: false,
        src: "/CCIE/exhibitOverview"
      },
      {
        text: "快速提离",
        isA: false,
        src: "/CCIE/materialLift"
      },
    ]
  },
  {
    text: "海关监管与服务",
    child: [
      {
        text: "展前通关",
        child: [
          { text: "进境物资证明函", isA: false, src: "/CCIE/proofApprove" },
          { text: "海关监管数据", isA: false, src: "/CCIE/jy" },
          { text: "进博会数据统计", isA: false, src: "/CCIE/ciieQueryStatistics" },
          { text: "保单担保", isA: false, src: "/CCIE/dzbd" },
          { text: "保函担保", isA: false, src: "/CCIE/dzbh" },
          { text: "转跨境电商", isA: false, src: "/CCIE/crossbussiness" }
        ]
      },
      {
        text: "展中监管",
        child: [
          { text: "巡馆记录", isA: false, src: "/CCIE/rangerRecord" },
          { text: "巡馆统计", isA: false, src: "/CCIE/xgTotal" },
          { text: "一键呼叫受理", isA: false, src: "/CCIE/callRecord" },
          { text: "展商咨询", isA: false, src: "/CCIE/consultRecord" },
        ]
      },
    ]
  },
  {
    text: "展后处置123",
     child: [
          { text: "各主场承运商汇总统计数据", isA: false,  src: "/CCIE/agentCensus" },
          {  text: "展后商品流向分析",isA: false, src: "/CCIE/flowOfCommod"},
          

        ]
  }
];
export default {
  components: { "nav-tab": navTab ,countTime},
  data() {
    return {
      nowYear:getCookie('date'),
      userName: "expoadmin",
      visible: false,
      menuShow: false,
      viewTitle: "",
      menuList: [],
      path: '',
      indexActive: 0,
      childIndexActive: -1,
      countDay:0,
      showFlag:false
    };
  },
  watch: {
    $route(to, from) {
      this.viewTitle = to.meta.descriptionTitle;
    }
  },
  mounted() {
    this.adjustFontSize();
    let _this = this;
    this.countTime()
    this.userName = getCookie("user");
    let index = this.$route.params.indexActive;
    let childIndex = this.$route.params.childIndexActive;
    let title = this.$route.params.title;
    if(index != undefined) {
      this.goRoute(0, this.$route.name);
      this.viewTitle = title;
      this.indexActive = index;
      this.childIndexActive = childIndex;
    }
    window.onresize = function() {
      _this.adjustFontSize();
    };
  },
  methods: {
     //切换隐藏
    taggleShow(){
      let navObjAll = navObj[0].child               
      this.showFlag = !this.showFlag
      let obj =   { text: "文件", isA: false,src: "/CCIE/readFile"}
      if(this.showFlag && navObj[0].child.length < 5 ){
         navObj[0].child.push(obj)
      }else if(navObj[0].child.length == 5){
         navObj[0].child.pop()
      }
    },
    toCCIE() {
      this.menuShow = false;
      waterMark.set('')
    },
    routeJump(e, type) {
      if (e.target.nodeName == "A") {
        this.visible = false;
        this.menuShow = true;
        this.menuList = navObj[type];
      
        for(let i = 0; i < this.menuList.child.length; i++) {
          if(this.menuList.child[i].child != undefined) {
            for(let j = 0; j < this.menuList.child[i].child.length; j++) {
              if(this.menuList.child[i].child[j].text.match(e.target.innerText)) {
                this.indexActive = i;
                this.childIndexActive = j;
                return;
              }
            }
          } else {
            if(this.menuList.child[i].text.match(e.target.innerText)) {
              this.indexActive = i;
              this.childIndexActive = -1;
              return;
            }
          }
        }
      }
    },
    goRoute(type, path) {
      this.visible = false;
      this.menuShow = true;
      this.menuList = navObj[type];
      this.$router.push({ name: path });
    },
    loginOut() {
      waterMark.set('')
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
    //倒计时函数
    countTime(){
      let nowdate = new Date()
      let until = new Date('2020-11-05 00:00:00')
      let day = Math.floor((until-nowdate)/1000/3600/24)
      this.countDay = day
    }
  },
  destroyed() {
    let html = document.getElementsByTagName("html")[0];
    html.className = "";
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
.homePage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  overflow: hidden;
  left: 0;
  z-index: 100;
  .head {
    height: 5.5vh;
    position: relative;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.8);
    .top {
      background: url("../../../assets/exhibitionHead.png") no-repeat 50% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      width: 100%;
      top: 0;
      height: 100%;
      background: rgb(20, 43, 113);
      z-index: 100;
       h1 {
        font-size: 1.6rem;
        color: #fff;
        padding: 0;
        // align-self: flex-end;
      }
      .header-logo {
        width: 78%;
        height: 100%;
        background: url("../../../assets/ccie-header-bg-1.png") 50% 0 no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        padding-left: 30px;
      }
      .user {
        .headerYear{
          font-size: 20px;
          margin-right: 20px;
          color: #fff;
        }
        display: flex;
        align-items: center;
        .userName {
          font-size: 1rem;
          margin-right: 1rem;
          color: #fff;
          display: flex;
          align-items: center;
          img {
            width: 1.4rem;
            height: 1.4rem;
            margin-right: 0.5rem;
          }
          .ivu-icon {
            font-size: 1.2rem;
          }
        }
        .nav {
          width: 3rem;
          height: 5.5vh;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-align: center;
          z-index:120;
          &:hover {
            background: #155ff2;
            // img:first-child{
            //   display: none
            // }
            // img:last-child{
            //   display: block;
            // }
          }
          img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            // &:last-child{
            //   display: none
            // }
          }
        }
        .ivu-icon {
          font-size: 1.8rem;
          color: #fff;
          cursor: pointer;
          font-weight: 400;
        }
      }
    }

    .dropMenu {
      position: absolute;
      width: 100vw;
      left: 0;
      top: 100%;
      opacity: 0;
      z-index: 100;
      background: rgba(18, 30, 79, 0.95);
      transition: all 0.7s ease-in-out;
      border: 1px solid #155ff2;
      border-top: 0;
      color: #fff;
      transform: translate(0, -100%);
      .nav-button {
        cursor: pointer;
        position: absolute;
        width: 5rem;
        height: 0.5rem;
        background: url("../../../assets/ccie-button-close.png") 50% 50%
          no-repeat;
        background-size: cover;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        z-index: 999;
        
      }
       .after::before{
          position:absolute;
          top:10px;
          right:10px;
          width:10px;
          height:10px;
          border-bottom:2px solid #02a6d5;
          border-right:2px solid #02a6d5;
          transform:rotate(-45deg);
          content:'';
          cursor:pointer;
        }
      &.show {
        transform: translate(0, 0);
        opacity: 1;
      }
      ul,
      ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .contanier {
        width: 75%;
        margin: 2rem auto;
        display: flex;
        justify-content: space-around;
        > li {
          width: 25%;
          padding-left: 2.5rem;

          border-right: 2px solid rgba(255, 255, 255, 0.2);
          &:last-child {
            border-right: 0;
          }
        }
        .dropItem-title {
          font-size: 1.4rem;
          position: relative;
          font-weight: 700;
          &::before {
            content: "";
            position: absolute;
            width: 15px;
            height: 18px;
            left: -25px;
            top: 50%;
            margin-top: -9px;
            background-image: url("../../../assets/qietu/dropMenu/cube.svg");
          }
          // padding: .4rem 0;
        }
        .itemIcon {
          vertical-align: middle;
          margin-top: -3px;
          margin-right: 5px;
        }
        .subMenu {
          padding-left: 1.5rem;
          > li {
            margin-top: 0.8rem;
          }
          a:hover {
            color: #ffc83e
          }
          a,
          .subTitle {
            color: #fff;
            font-size: 1.4rem;
            // padding: .4rem 0;
          }
          .subMenuItem {
            padding-left: 2rem;
            li {
              margin-top: 0.6rem;
            }
            a {
              font-size: 1.25rem;
            }
          }
        }
      }
    }
  }
  .body {
    height: 94.5vh;
    overflow: auto;
    background: rgb(1, 13, 60);
    min-width: 1200px;

    .container {
      height: 100%;
      .navTab {
        position: relative;
        height: 8%;
        width: 90%;
        margin: 0 auto;
        padding-left: 30px;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 15px;
          height: 18px;
          left: 0;
          top: 50%;
          margin-top: -9px;

          background-image: url("../../../assets/ccie-cube.png");
        }
        .after::before{
          position:absolute;
          top:30px;
          right:40px;
          width:10px;
          height:10px;
          border-bottom:2px solid #02a6d5;
          border-right:2px solid #02a6d5;
          transform:rotate(-45deg);
          content:'';
          cursor:pointer;
        }
      }
      .outlet {
        height: 90%;
        width: 100%;
        position: relative;
        .bgImg {
          width: 90%;
          height: 100%;
          position: absolute;
          z-index: 0;
          left: 5%;
          top: 0;
        }
        .view {
          position: absolute;
          width: 90%;
          height: 100%;
          z-index: 1;
          left: 5%;
          top: 0;
          // background: #fff;
          text-align: center;
          padding: 1.5rem;
          padding-right: 0;
          overflow: hidden;
          > div {
            margin-top: 1.5rem;
            height: calc(100% - 3.5rem);
            padding-right: 1.5rem;
            overflow-y: auto;
            &::-webkit-scrollbar {
              height: 8px;
              width: 8px;
            }
            &::-webkit-scrollbar-thumb {
              background-color: #6e6e6e;
              outline: #333 solid 1px;
              border-radius: 20px;
            }
            &::-webkit-scrollbar-track {
              box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            }
          }

          > span {
            height: 2rem;
            color: #fff;
            width: auto;
            left: -1.5rem;
            // margin: 0 auto;
            text-align: center;
            // display: block;
            position: relative;
            font-size: 1.2rem;

            &::before,
            &::after {
              content: "";
              position: absolute;
              width: 4rem;
              height: 100%;
              top: 0;
              background-size: contain;
            }
            &:after {
              right: -5rem;
              background: url("../../../assets/ccie-title-right.png") 50% 50%
                no-repeat;
            }
            &:before {
              left: -5rem;
              background: url("../../../assets/ccie-title-right.png") 50% 50%
                no-repeat;
              transform: rotate(180deg);
            }
          }
        }
        // >div{
        //   width: 82%;
        //   height: 100%;
        //   margin: 0 auto;
        //   background: #fff;
        // }
      }
    }
  }
}
.CCIE-body {
  height: calc(100% - 5.5vh);
  width: 100%;
  background: #121e4f;
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
        background-image:url('~@/assets/ccie-build.png');
        background-size: 100%,100%;
        background-repeat: no-repeat;
      }
    }
  .countdown{
    position: absolute;
    top: 100px;
    width: 100%;
    text-align: center;
    height: 50px;
    // background-color: pink;
    font-size: 1.6rem;
    line-height: 50px;
    color: #fff;
    .fontStyle{
         margin: 0 10px;
         display: inline-block;
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
        cursor: pointer;
        > span {
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
