<template>
    <div class="zjScreen">
      <!-- <Spin size='large' fix v-if="requsetState" />  -->
      <div class="content-box">
            <div class="global">
                <div class="navigation" style="width: 27rem">
                  <!-- <span>展品概况</span>
                  <Divider type="vertical" />
                  <span @click="goRoute('exhibitionPictrue', 2, 0, '展馆概况')">展馆概况</span>
                  <Divider type="vertical" />
                  <span @click="goRoute('exhibitOverview',2, 1, '展品分类')">展品分类</span>
                  <Divider type="vertical" />
                  <span @click="goRoute('materialLift', 2, 2, '快速提离')">快速提离</span>
                  <Divider type="vertical" /> -->
                </div>
                
                <h1>暂时进境展览品概况</h1>
                <router-link to='/CCIE' style="width: 27rem; text-align: right">
                  <img src="@/assets/logo2.png" alt="">
                </router-link>
                <!-- <span>
                    跨境贸易智慧通
                </span> -->
            </div>
            <div class="num-scroll">
                <ul>
                    <li >
                        <span class="rect left top"></span>
                        <span class="rect right top"></span>
                        <span class="rect left bottom"></span>
                        <span class="rect right bottom"></span>
                        <div  :class="{'long':getDataS$G.name.length>4}" >{{getDataS$G.name}}</div>
                    </li>
                    <li class="scroll-data">
                        <span class="rect left top"></span>
                        <span class="rect right top"></span>
                        <span class="rect left bottom"></span>
                        <span class="rect right bottom"></span>
                        <div class="icon percent">
                            <img src="@/assets/showCountry.png"   style="cursor:pointer"  alt="">
                            <span v-if="getDataS$G['scrollData']['aPercent']!==100">{{getDataS$G['scrollData']['aPercent']}}%</span>
                        </div>
                        <div class="data">
                            <h4>参展国家/地区(个)</h4>
                            <div>
                                <countNum :endValue="getDataS$G['scrollData']['regionNum']" />  
                            </div>
                        </div>
                    </li>
                    <li class="scroll-data">
                        <span class="rect left top"></span>
                        <span class="rect right top"></span>
                        <span class="rect left bottom"></span>
                        <span class="rect right bottom"></span>
                        <div class="icon percent">
                            <img src="@/assets/exhibitor.png"   style="cursor:pointer"  alt="">
                            <span v-if="getDataS$G['scrollData'].bPercent!==100">{{getDataS$G['scrollData'].bPercent}}%</span>
                        </div>
                        <div class="data">
                            <h4>参展商(家)</h4>
                            <div>
                                <countNum :endValue="getDataS$G['scrollData'].exhibitor" />  
                            </div>
                        </div>
                    </li>
                    <li class="scroll-data">
                        <span class="rect left top"></span>
                        <span class="rect right top"></span>
                        <span class="rect left bottom"></span>
                        <span class="rect right bottom"></span>
                        <div class="icon percent">
                            <img src="@/assets/zhanwei.png"  style="cursor:pointer"  alt="">
                            <span v-if="getDataS$G['scrollData'].cPercent!==100">{{getDataS$G['scrollData'].cPercent}}%</span>
                        </div>
                        <div class="data">
                            <h4>展位数(个)</h4>
                            <div>
                                <countNum :endValue="getDataS$G['scrollData'].exPlatform" />  
                            </div>
                        </div>
                    </li>
                    
                    <li class="scroll-data">
                        <span class="rect left top"></span>
                        <span class="rect right top"></span>
                        <span class="rect left bottom"></span>
                        <span class="rect right bottom"></span>
                        <div class="icon percent">
                            <img src="@/assets/import.png"   style="cursor:pointer"  alt="">
                            <span v-if="getDataS$G['scrollData'].dPercent!==100">{{getDataS$G['scrollData'].dPercent}}%</span>
                        </div>
                        <div class="data">
                            <h4>展品数量(件)</h4>
                            <div>
                                <countNum :endValue="getDataS$G['scrollData'].exhibits" /> 
                            </div>
                        </div>
                    </li>
                    <li class="scroll-data">
                        <span class="rect left top"></span>
                        <span class="rect right top"></span>
                        <span class="rect left bottom"></span>
                        <span class="rect right bottom"></span>
                        <div class="icon percent">
                            <img src="@/assets/priceTotal.png" style="cursor:pointer"  alt="">
                            <span v-if="getDataS$G['scrollData'].ePercent!==100">{{getDataS$G['scrollData'].ePercent}}%</span>
                        </div>
                        <div class="data">
                            <h4>展品价值总额(万美元)</h4>
                            <div>
                                <countNum :endValue="getDataS$G['scrollData'].worth" />  
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="content">
              <span class="rect left bottom"></span>
              <span class="rect right bottom"></span>
        <div class="figure-container">
        <div class="map-container">
            <span class="rect left top"></span>
            <!-- <span class="rect right top"></span> -->
            <!-- <span class="rect left bottom"></span>
            <span class="rect right bottom"></span> -->
            <world ref='MAP'/> 
            <div class="ranger" v-if="rangerShow">
                <span @click="rangerShow=false">关闭</span>
                <ul>
                    <li>
                        <span>进博会巡馆记录</span>
                        <ol>
                            <li>
                                <span>擅自移除</span>
                                <span>{{questionRecord[0]}}</span>
                            </li>
                            <li>
                                <span>违规销售</span>
                                <span>{{questionRecord[1]}}</span>
                            </li>
                            <li>
                                <span>未经批准的试用</span>
                                <span>{{questionRecord[2]}}</span>
                            </li>
                            <li>
                                <span>未经批准的品尝</span>
                                <span>{{questionRecord[3]}}</span>
                            </li>
                            <li>
                                <span>统一标识</span>
                                <span>{{questionRecord[4]}}</span>
                            </li>
                            <li>
                                <span>废弃物收集箱</span>
                                <span>{{questionRecord[5]}}</span>
                            </li>
                            <li>
                                <span>废弃物收集记录</span>
                                <span>{{questionRecord[6]}}</span>
                            </li>
                            <li>
                                <span>危险化学品风险</span>
                                <span>{{questionRecord[7]}}</span>
                            </li>       
                        </ol>
                    </li>
                    <li>
                        <span>进博会重点展位核查记录</span>
                        <ol>
                            <li>
                                <span>禁止/限制清单</span>
                                <span>{{questionRecord[8]}}</span>
                            </li>
                            <li>
                                <span>未经批准的馈赠</span>
                                <span>{{questionRecord[9]}}</span>
                            </li>
                            <li>
                                <span>中文注明事项</span>
                                <span>{{questionRecord[10]}}</span>
                            </li>
                            <li>
                                <span>日核销</span>
                                <span>{{questionRecord[11]}}</span>
                            </li>                                    
                            <li>
                                <span>消毒防疫</span>
                                <span>{{questionRecord[12]}}</span>
                            </li>
                            <li>
                                <span>特殊物品包装渗漏</span>
                                <span>{{questionRecord[13]}}</span>
                            </li>
                            <li>
                                <span>特殊物品生物危险标识</span>
                                <span>{{questionRecord[14]}}</span>
                            </li>
                            <li>
                                <span>生物安全控制条件</span>
                                <span>{{questionRecord[15]}}</span>
                            </li>   
                        </ol>
                    </li>                                
                    <li>
                        <span></span>
                        <ol>
                            <li>
                                <span>符合动植物监管方案</span>
                                <span>{{questionRecord[16]}}</span>
                            </li>
                            <li>
                                <span>未获检疫准入的食品隔离</span>
                                <span>{{questionRecord[17]}}</span>
                            </li> 
                            <li>
                                <span>未预见特殊情况</span>
                                <span>{{questionRecord[18]}}</span>
                            </li>
                        </ol>
                    </li>                      
                </ul>
            </div>       
        </div>
        <div class="figure">
            <span class="rect right top"></span>
            <div class="scatter">
                <div class="title">
                    展品大类分布
                </div>
                <ul>
                    <li style="height:30%">
                        <gauge name='服饰服装及日用消费品' @lightMap="lightMap" :value="getDataS$G['gaugeData']['costumeValue']" :price="getDataS$G['gaugeData']['costumePrice']" />
                    </li>
                    <li style="height:30%"> 
                        <gauge name='智能及高端装备' @lightMap="lightMap" :value="getDataS$G['gaugeData']['equipValue']" :price="getDataS$G['gaugeData']['equipPrice']" />
                    </li>
                    <li style="height:30%">
                        <gauge name='医疗器械及医药保健' @lightMap="lightMap" :value="getDataS$G['gaugeData']['medicalValue']" :price="getDataS$G['gaugeData']['medicalPrice']" />
                    </li>
                    <li style="height:30%">
                        <gauge name='消费电子及家电' @lightMap="lightMap" :value="getDataS$G['gaugeData']['homeAppliancesValue']" :price="getDataS$G['gaugeData']['homeAppliancesPrice']"  />
                    </li>
                    <li style="height:30%">
                        <gauge name='食品及农产品' @lightMap="lightMap" :value="getDataS$G['gaugeData']['foodValue']" :price="getDataS$G['gaugeData']['foodPrice']" />
                    </li>
                    <li style="height:30%">
                        <gauge name='服务贸易' @lightMap="lightMap" :value="getDataS$G['gaugeData']['serviceValue']" :price="getDataS$G['gaugeData']['servicePrice']" />
                    </li>
                    <li style="height:30%">
                        <gauge name='汽车' @lightMap="lightMap" :value="getDataS$G['gaugeData']['carValue']" :price="getDataS$G['gaugeData']['carPrice']" />
                    </li>
                </ul>

            </div>
        </div>
    </div>
</div>
    
  <p class="footExplain">开发单位:全国海关大数据云平台（上海）&nbsp;&nbsp;全国海关大数据应用中心</p>

    <!-- <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit>  -->
    <compare ref='compareModal' />
</div>
</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import {getCookie} from '@/until/getToken';
import regionTable from '@/until/corresponding'
import countNum from "./countNum";
import world from "./mapNew";

import gauge from "./gauge";
import compare from './compareData'
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import {getRouterName} from "@/until/getToken";

export default {
  components: {
    countNum,
    world,
    gauge,
    compare,
  },
  
  data() {
    return {
     imgShow: false,
     imgIndex: 0,
     //一般审批数据
     foodNormal2:[],

     //特殊审批数据
     foodSpecital2:[],

      requsetState:true,
      flag: false,
      rangerShow:false,
      questionRecord:[],
      // fromRoute:'',
      tableShow: [false, false, false, false],
      modelSwith: false,
      Columns3: [
        {
          title: "国家/地区",
          key: "COUNTRY"
        },
        {
          title: "展品名称",
          key: "EXHIBITSNAME"
        },
        {
          title: "重量",
          key: "WEIGHT"
        },
        {
          title: "单位",
          key: "UNITNAME"
        },
        {
          title: "审批方式",
          key: "APPROVETYPE"
        }
      ],
      Columns2: [
        {
          title: "证明函编号",
          key: "CERTIFICATENO",
          align: "center",
          width: 180
        },
        {
          title: "品名",
          key: "GOODSDESCRIPTIONCN",
          align: "center",
          width: 180
        },
        {
          title: "原产地",
          align: "center",
          key: "COUNTRYOFORIGIN"
        },
        {
          title: "数量",
          align: "center",
          key: "QUANTITY"
        },
        {
          title: "总价",
          align: "center",
          key: "TOTALPRICE"
        },
        {
          title: "展位",
          align: "center",
          key: "BOOTHNO"
        },
        {
          title: "展商",
          align: "center",
          key: "EXHIBITOR",
          width: 180
        }
      ],
      Columns: [
        {
          title: "报关单号",
          key: "ENTRY_ID"
        },
        {
          title: "实征税款",
          key: "TAX_TOTAL"
        },
        {
          title: "减免税款",
          key: "RSV1_CUT"
        }
      ],
      dataTable: [{}],
      dataTable2: [{}],
      dataTable3: [{}],
      dataTable4: [{}],
      cookieDate: '2018',
      gaugeData: undefined,
      gaugeType: ['服务贸易',  '汽车', '智能及高端装备', '消费电子及家电','服饰服装及日用消费品','医疗器械及医药保健',  '食品及农产品', ]
    };
  },
  computed: {
    ...mapGetters("zjStore", [
      "getViewState",
      // "getZjData",
      "getDataS$G"
    ])
  },
  created() {
    this.cookieDate = getCookie('date');
  },
  mounted() {
    let _this = this;
    this.adjustFontSize();
    this.getZjData();
    this.getGaugeData()
  },
  methods: {
    goRouter(){
     this.$router.push({name:'exhibitionMapNew'})
   },
      closewin() {
        this.imgShow = false;
      },
      showImg(num) {
        this.imgIndex = num;
        this.imgShow = true;
      },
      lightMap(name) {
        if(this.getDataS$G.name != '全球概况')return;
        let type = this.gaugeType.indexOf(name) + 1;
        publicInter(interfaceUrl.qryCountryCodeByType, {type: String(type)}).then(r => {
          console.log(r)
            let d = [];
            r.list.forEach(item=>{
                regionTable.forEach(val=>{
                    if(val.value==item){
                        d.push({
                            name:val.name,
                            nameCH:val.nameCH,
                            selected:true,
                            value:val.value,
                        })
                    }
                })
                
            })
            this.$refs.MAP.clearMap();
            this.$refs.MAP.setMapOptionData(d)
        })
      },
    ...mapMutations("zjStore", ["changeSelected"]),
    ...mapActions("zjStore", [
      "getZjData",
      "getGaugeData",
      "getJsonData"
    ]),
    goRoute(path,index, childIndex, title) {
      console.log(path)
      console.log(index)
      console.log(childIndex)
      console.log(title)
      this.$router.push({ name: path, params:{indexActive: index, childIndexActive: childIndex, title: title}});
    },
    closeWin() {
      this.flag = false;
    },
    modalTableState(index) {
      this.modelSwith = true;
      this.tableShow.forEach((item, i) => {
        if (i == index) {
          this.tableShow[i] = true;
        } else {
          this.tableShow[i] = false;
        }
      });
      // console.log(this.tableShow,index)
    },
    compareData(){
      this.$refs.compareModal.show=true;
      this.$refs.compareModal.initChart();

    },
    dropdownSwitch2(name){
      switch(name) {
        case '各国水果加快入境':
          this.goRoute('fruitEntry', 6, 0, '各国水果加快入境');
          break;
        default: break;
      }
    },
    dropdownSwitch(name) {
      switch(name) {
        case '总体概况':
          this.goRoute('overview', 5, 0, '总体概况');
          break;
        case '最字榜':
          this.goRoute('topWordList', 5, 1, '最字榜');
          break;
        case '参展概况':
          this.goRoute('globalOverview', 5, 2, '参展概况');
          break;
        default: break;
      }
    },
    getDataTable() {
      publicInter(interfaceUrl.queryUsedQuotaList, {}).then(r => {
        if (r.code === 200) {
          this.dataTable = r.data;
        }
      });
    },
    rowClick(e) {
      this.$refs.abc.query(e.ENTRY_ID);
      this.flag = true;
    },
    recordEvent(e){
        this.rangerShow=true;
        this.$refs.MAP.clearMap();
        this.questionRecord=e
    },
    TXclick() {
      this.$refs.MAP.initGoodsType();
    },
    clickHandle(e){
        this.rangerShow=false
        clearInterval(this.$refs.MAP.timer);
        // this.$refs.MAP.clickArea();
        var month=e>9?e:'0'+e
        var arr=[]  
        publicInter(interfaceUrl.queryEpidemicDetails,{month:'2018'+month,countryCode:''}).then(r=>{
                if(r.code==='200'){
                    r.data.forEach(item=>{
                        regionTable.forEach(val=>{
                            if(val.value==item.CODE){
                                arr.push({
                                    name:val.name,
                                    nameCH:val.nameCH,
                                    data:item.data,
                                    selected:true,
                                    mouthSick:true
                                })
                            }
                        })
                    })
                    this.$refs.MAP.ligthRegionFun(arr)
                }
            })

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
    jumpRoute(){
      this.$router.push({ name: getRouterName()[0] });
    }
  },
  destroyed() {
    let html = document.getElementsByTagName("html")[0];
    html.className = "";
  }
};
</script>
<style lang="scss" scoped>
$screenWidth: 1918;
$screenHeight: 1049;
@function widthCalc($width) {
  @return calc(#{$width/$screenWidth} * 100%);
}
@function heigthCalc($height) {
  @return calc(#{$height/$screenHeight} * 100%);
}
.modelAAA {
  max-height: 400px;
  overflow-y: scroll;
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
.lineFun {
  &:before,
  &:after {
    content: "";
    width: 1px;
    height: 80%;
    position: absolute;
    background: rgba(29, 234, 255, 0.5);
    top: 10%;
  }
  &:before {
    left: -5%;
  }
  &:after {
    right: -5%;
  }
}
.zjScreen {
  background: rgb(9, 13, 57);
  width: 100vw;
  height: 100vh;
  color: #fff;
  overflow: hidden;
  > .content-box {
    width: 97.92%;
    height: 100%;
    padding-bottom: calc(20 / #{$screenHeight} * 100%);
    margin: 0 auto;
  }
}
.global {
  height: heigthCalc(78);
  background: url("../../../assets/exhibitionHead.png") no-repeat 50% 100%;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .navigation {
    span {
      font-size: 0.625rem;
      cursor: pointer;
    }
  };
  .routerRight{
    position: absolute;
    right:26%;
    top: 25px;
    span {
      font-size: 0.625rem;
      cursor: pointer;
    }
  }
  >span{
    text-decoration: none;
    color: rgba(191, 193, 206, 1);
    font-size: 1.3rem;
    cursor: pointer;
    font-weight: 600;
    img {
      vertical-align: middle;
      margin-top: -3px;
      width: 1.9rem;
      height: 1.9rem;
    }
  }
  h1 {
    font-size: 1.6rem;
    color: #fff;
    padding: 0;
    align-self: flex-end;
  }
  > span {
    background-image: linear-gradient(-180deg, #52e6f2 3%, #5283f2 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 1.1rem;
    font-weight: 600;
  }
}
.rect {
  position: absolute;
  width: 0.65rem;
  height: 0.65rem;
  background: transparent;
  z-index: 10;
  &.left {
    left: -1px;
    border-left: 2px solid #2773ff;
  }
  &.top {
    top: -1px;
    border-top: 2px solid #2773ff;
  }
  &.right {
    right: -1px;
    border-right: 2px solid #2773ff;
  }
  &.bottom {
    bottom: -1px;
    border-bottom: 2px solid #2773ff;
  }
}
.num-scroll {
  height: heigthCalc(193);
  padding: calc(15 /#{$screenHeight}* 100%) 0 calc(10 /#{$screenHeight}* 100%) 0;
  > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    > li {
      height: 100%;
      border: 1px solid #0037b2;
      padding: 0.625rem;
      position: relative;
      &:first-child {
        width: widthCalc(120);
        > div {
          font-size: 1.5rem;
          width: 100%;
          display: flex;
          padding: 0.2rem;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
          color: #1deaff;
          background: #041e72;
          font-weight: 600;
          &.long {
            font-size: 1.3rem;
          }
        }
      }
      &:nth-child(2) {
        width: widthCalc(340);
      }
      &:nth-child(3),
      &:nth-child(4) {
        width: widthCalc(310);
      }
      &:nth-child(5) {
        width: widthCalc(425);
      }
      &:last-child {
        width: widthCalc(370);
      }
      &.scroll-data {
        display: flex;

        align-items: flex-start;
        > .icon {
          width: 4rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > img {
            width: 2.5rem;
            height: 2.5rem;
            margin-bottom: 0.2rem;
          }
          > span {
            color: #ffe91a;
            font-size: 1rem;
          }
          background: #041e72;
        }
        > .data {
          width: calc(100% - 4rem);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          > h4 {
            margin: 0;
            padding: 0;
            text-align: center;
            color: #fff;
            font-size: 1.05rem;
          }
          > div {
            height: calc(100% - 2.2rem);
          }
        }
      }
    }
  }
}
.figure-container {
  height: 100%;
  display: flex;
  > div {
    height: 100%;
  }
  > .map-container {
    width: 62.5%;
    border-right: 1px solid #0037b2;
    position: relative;
    .ranger{
        position: absolute;
        bottom: 20px;
        width: 96%;
        left: 2%;
        z-index: 100;
        background: rgba(14,23,84,.9);
        border: 1px solid #1da9ff;
        box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.8);
        
        >span{
            position: absolute;
            cursor: pointer;
            color: #fff;
            right: -1px;
            top: -2.5rem;
            font-size: 1rem;
            height: 2.5rem;
            padding: 0 2rem;
            border-radius: 8px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border: 1px solid #1da9ff;
            box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.8);
            border-bottom: none;
            line-height: 2.5rem;
        }
        ol,ul{
            list-style: none;
            padding: 0;
            margin: 0;
        }
        >ul{
            padding: 1rem 0;
            display: flex;
            >li{
                width: 33.33%;
                padding:0 2rem;
                &:first-child{
                    border-left: 0;
                }
                >span{
                    color: #1DEAFF;
                    font-size: 1.2rem;
                    display: inline-block;
                }
                border-left: 1px dashed #005CE5;
                li{
                    display: flex;
                    justify-content: space-between;
                    padding: .5rem 0;
                    span{
                        color: #fff;
                        font-size: 1rem;
                        &:last-child{
                            color: #ffde1d;
                        }
                    }
                }

            }
        }
                    
    }
  }
  > .figure {
    width: 37.5%;
    position: relative;
    // border: 1px solid #0037b2;
    border-bottom: none;
    &:hover{
      a{
        opacity: 1;
      }
    }
    >a{
      position: absolute;
      font-size: 3rem;
      color: #2773FF;
      right: 30px;
      top: 35%;
      opacity: 0;
    }
    // >div{
    //   padding: 1rem;
    // }
    > .scatter {
      width: 100%;
      height: 100%;
      padding: 1rem;
      // border-bottom: 1px solid #0037b2;
      .title {
        width: 12.5rem;
        margin: 0 auto;
        border: 1px solid rgba(29, 234, 255, 0.5);
        color: #fff;
        padding: 0.3rem 0;
        font-size: 1rem;
        text-align: center;
        position: relative;
        background: linear-gradient(
          170deg,
          #116b89 0%,
          rgba(17, 107, 137, 0.3) 70%
        );
        @extend .lineFun;
      }
      > ul {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0 0 0;
        display: flex;
        width: 100%;
        height: calc(100% - 1.5rem);
        justify-content: center;
        flex-wrap: wrap;
        > li {
          width: 30%;
          height: 50%;
        }
      }
    }
    > .other {
      height: 45%;
    }
  }
}
.footExplain {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 0.8rem;
  padding-top: 0.2rem;
}
.content {
  height: heigthCalc(778);
  border: 1px solid #0037B2;
  position: relative;
}
.top-copy{
    display: flex;
    width: 100%;
    // margin-top: 1rem;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0.5rem;
    border-top: 1px solid #0037B2;
    >p.top-country{
        &:first-child{
            margin-right: 1rem;
        }
        width: 10rem;
        font-size: .9rem;
        color: #fff;
        border-right: 1px solid #0037B2;
        span{
            color: #FFDE1D;
            cursor: pointer;
        }

    } 
}
.goodsDetail{
    position: absolute;
    top: calc(50% - 20rem);
    left: calc(50% - 37rem);
    width: 74rem;
    height: 42rem;
    background: url('../../../assets/bg.png') no-repeat;
    background-size: 100% 100%;
    z-index: 110;
    .switch{
        width: 34px;
        height: 84px;
        top: calc(50% - 42px);
        background-repeat: no-repeat;
        cursor: pointer;
    }
    .to-left{
        position:absolute;
        background: url('../../../assets/toLeft.png'); 
        left: 3rem;
    }
    .to-left:hover{
        background: url('../../../assets/toRight.png'); 
        transform: rotateY(180deg)
    }
    .to-right{
        position:absolute;
        background: url('../../../assets/toLeft.png');
        transform: rotateY(180deg);
        right: 3rem;
    }
    .to-right:hover{  
        background: url('../../../assets/toRight.png');
        transform: rotateY(0deg)
    }
    .closewin{
        position: absolute;
        top: 0.9rem;
        right: 3rem;
        font-size: 1.7rem;
        display: inline-block;
        cursor: pointer;
    }
    .title{
        font-family: Mic;
        font-size: 1.6rem;
        color: #FFDE1D;
        display: inline-block;
        width: 80%;
        // position: absolute;
        text-align: center;
        margin: 3.5rem 10% 0;
    }
    .desc{
        font-family: SourceHanSansCN-Medium;
        font-size: 1rem;
        display: inline-block;
        word-break: break-all;
        white-space: normal;
        overflow: hidden;
        width: 46rem;
        position: absolute;
        // margin: 0 14rem;
        left: 50%;
        transform: translateX(-50%);
        bottom: 3.5rem;
        // height: 90px;
    }
    .my-show-img{
        // transition: all 0.5s ease-in-out;
        background-repeat:no-repeat;
        background-size: 100% 100%;   
        position: absolute;
        border:4px solid #135DA8;
    }
    .main-img{
        width: 45rem;
        height: 26rem;    
        // background-size: cover;   
        top: 7rem;
        left: 14rem;
        z-index: 2;
    }
    .secondary-img{
        width: 31rem;
        height: 18rem;
        opacity: 0;
        z-index: 1;
        top: 11rem;
    }
    .left-img{ 
        left: 12rem;
    }
    .right-img{
        left: 31rem;
    }
}
</style>

