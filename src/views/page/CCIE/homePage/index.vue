<template>
    <div class="homePage">
        <div class="head">
            <div class="dropMenu" :class="{'show':visible}">
                <ul class="contanier">
                    <li>
                        <div class="dropItem-title">展前通关</div>
                        <ol class="subMenu">
                            <li>
                                <router-link to='/'>
                                    进境物资证明函
                                </router-link> 
                            </li>
                            <li>
                                <router-link to='/'>
                                    海运进博物资快速提离
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/'>
                                    展商管理
                                </router-link>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <div class="dropItem-title">展中监管</div>
                        <ol class="subMenu">
                            <li>
                                <div class="subTitle">监控管理</div>
                                <ol class="subMenuItem">
                                    <li>
                                        <router-link to='/'>
                                           食品农产品核辐射监控
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/'>
                                           危险化学品风险监控
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/'>
                                           试用品尝散发风险监控
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/'>
                                           肉类展品监控
                                        </router-link>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <router-link to='/'>
                                    品尝试用散发申请查询
                                </router-link>
                            </li>
                            <li>
                                <div class="subTitle">巡馆记录</div>
                                <ol class="subMenuItem">
                                    <li>
                                        <router-link to='/'>
                                           展位信息
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/'>
                                           巡馆记录
                                        </router-link>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <div class="dropItem-title">
                            展后处置
                        </div>
                        <ol class="subMenu">
                           
                            <li>
                                <router-link to='/'>
                                    展品明细及流向监控
                                </router-link>
                            </li>
                            
                        </ol>
                    </li>
                    <li>
                        <div class="dropItem-title">
                            大数据展示
                        </div>
                        <ol class="subMenu">
                           
                            <li>
                                <router-link to='/'>
                                    进博会动态监测分析1
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/'>
                                    进博会动态监测分析2
                                </router-link>
                            </li>
                            <li>
                                <router-link to='/'>
                                    展商分析统计
                                </router-link>
                            </li>
                             <li>
                                <div class="subTitle">展品查询分析</div>
                                <ol class="subMenuItem">
                                    <li>
                                        <router-link to='/'>
                                           进博物资分析建议
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to='/'>
                                           展品分析查询
                                        </router-link>
                                    </li>
                                </ol>
                            </li>
                            
                        </ol>
                    </li>
                </ul>
            </div> 
            <div class="top">
                <img src="" alt="">
                <div class="user">
                 
                    <Dropdown >
                        <a href="javascript:void(0)" class="userName" >
                            <Icon type="md-person"></Icon>{{userName}}
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem >
                                <span >退出账户</span>
                            </DropdownItem>
                            <DropdownItem >
                                <span >修改密码</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>  
                    <Icon type="md-close" @click="visible=!visible" />

                </div>
            </div>
              
               
        </div>
        <div class="body" @click="visible=false">
            <transition name="fade">
              <router-view></router-view>
            </transition>
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "expoadmin",
      visible: false
    };
  },
  mounted() {
    let _this = this;
    this.adjustFontSize();
    window.onresize = function() {
      _this.adjustFontSize();
    };
  },
  methods: {
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
    }
  },
  destroyed() {
    let html = document.getElementsByTagName("html")[0];
    html.className = "";
  }
};
</script>
<style lang="scss" scoped>
.homePage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  overflow: hidden;
  left: 0;
  .head {
    height: 5.5vh;
    position: relative;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      width: 100%;
      top: 0;
      height: 100%;
      background: rgba(31,95,242,.8);
      z-index: 100;

      img {
        width: 75%;
      }
      .user {
        .userName {
          font-size: 1rem;
          margin: 0 0.2rem;
          color: #fff;
          .ivu-icon {
            font-size: 1.2rem;
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
      top: -100%;
      opacity: 0;
      z-index: 10;
      background: rgba(18,30,79,0.75);
      transition: all 0.7s ease-in-out;
      border:1px solid #155ff2;
      border-top:0; 
      color: #fff;
      &.show {
        top: 100%;
        opacity: 1;
      }
      ul,
      ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .contanier {
        width: 70%;
        margin: 2rem auto;
        display: flex;
        justify-content: space-around;
        > li {
          width: 25%;
          padding: 0 2rem;

          border-right: 2px solid rgba(255, 255, 255, 0.2);
          &:last-child {
            border-right: 0;
          }
        }
        .dropItem-title {
          font-size: 1.4rem;
          // padding: .4rem 0;
        }
        .subMenu {
          padding-left: 1.5rem;
          > li {
            margin-top: 0.8rem;
          }
          a,
          .subTitle {
            color: #fff;
            font-size: 1rem;
            // padding: .4rem 0;
          }
          .subMenuItem {
            padding-left: 1.5rem;
            li {
              margin-top: 0.6rem;
            }
            a {
              font-size: .8rem;
            }
          }
        }
      }
    }
  }
  .body {
    height: 94.5vh;
    overflow: hidden;
  }
}
</style>
