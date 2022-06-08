<template>
    <div class="gloablOverview">
        <div class="g_left" v-if="showLeft">
            <div class="l_top">
                <p>
                    <!-- {{title}} -->
                 {{getDataS$G.name}}
                </p>
            </div>
            <div class="l_content">
                <ul>
                    <li>
                        <div class="logoo">
                            <img src="./img/country.png" alt="">
                             <div class="lo_data" v-if="(getDataS$G['countryData'].regionNum > getPreData['oldCountryData'].regionNum) && getPreData['oldCountryData'].regionNum == 0" >
                                  <img src="./img/sjt.png" alt="">
                                <p class="sjt"> 100% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].regionNum > getPreData['oldCountryData'].regionNum">
                                <img src="./img/sjt.png" alt="">
                                <p class="sjt"> {{((getDataS$G['countryData'].regionNum - getPreData['oldCountryData'].regionNum)*100/getPreData['oldCountryData'].regionNum).toFixed(2)}}% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].regionNum === getPreData['oldCountryData'].regionNum">
                                </div>
                             <div class="lo_data" v-else>
                                <img src="./img/xjt.png" alt="">
                                <p class="xjt">{{((getPreData['oldCountryData'].regionNum - getDataS$G['countryData'].regionNum)*100/getPreData['oldCountryData'].regionNum).toFixed(2)}}%</p>
                            </div>
                        </div>
                         <BarChat  name="参展国家/地区（个）"  :curValue ="getDataS$G['countryData'].regionNum"  :preValue ="getPreData['oldCountryData'].regionNum"/>
                    </li>
                    <li>
                         <div class="logoo">
                            <img src="./img/zs.png" alt="">
                            <div class="lo_data" v-if="(getDataS$G['countryData'].exhibitor > getPreData['oldCountryData'].exhibitor) && getPreData['oldCountryData'].exhibitor == 0" >
                                  <img src="./img/sjt.png" alt="">
                                <p class="sjt"> 100% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].exhibitor > getPreData['oldCountryData'].exhibitor">
                                <img src="./img/sjt.png" alt="">
                                <p class="sjt"> {{((getDataS$G['countryData'].exhibitor - getPreData['oldCountryData'].exhibitor)*100/getPreData['oldCountryData'].exhibitor).toFixed(2)}}% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].exhibitor === getPreData['oldCountryData'].exhibitor">
                                </div>
                            
                             <div class="lo_data" v-else>
                                <img src="./img/xjt.png" alt="">
                                <p class="xjt">{{((getPreData['oldCountryData'].exhibitor - getDataS$G['countryData'].exhibitor)*100/getPreData['oldCountryData'].exhibitor).toFixed(2)}}%</p>
                            </div>
                        </div>
                         <BarChat  name="参展商（家）" :preValue ="getPreData['oldCountryData'].exhibitor" :curValue ="getDataS$G['countryData'].exhibitor"/>
                    </li>
                    <li>
                          <div class="logoo">
                            <img src="./img/zw.png" alt="">

                            <div class="lo_data" v-if="(getDataS$G['countryData'].exPlatform > getPreData['oldCountryData'].exPlatform) && getPreData['oldCountryData'].exPlatform == 0" >
                                  <img src="./img/sjt.png" alt="">
                                <p class="sjt"> 100% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].exPlatform > getPreData['oldCountryData'].exPlatform">
                                <img src="./img/sjt.png" alt="">
                                <p class="sjt"> {{((getDataS$G['countryData'].exPlatform - getPreData['oldCountryData'].exPlatform)*100/getPreData['oldCountryData'].exPlatform).toFixed(2)}}% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].exPlatform === getPreData['oldCountryData'].exPlatform">
                                </div>
                            
                             <div class="lo_data" v-else>
                                <img src="./img/xjt.png" alt="">
                                <p class="xjt">{{((getPreData['oldCountryData'].exPlatform - getDataS$G['countryData'].exPlatform)*100/getPreData['oldCountryData'].exPlatform).toFixed(2)}}%</p>
                            </div>
                        </div>
                         <BarChat  name="展位数（个）" :preValue ="getPreData['oldCountryData'].exPlatform" :curValue ="getDataS$G['countryData'].exPlatform"/>
                    </li>
                    <li>
                        <div class="logoo">
                            <img src="./img/zp.png" alt="">
                            <div class="lo_data" v-if="(getDataS$G['countryData'].exhibits > getPreData['oldCountryData'].exhibits) && getPreData['oldCountryData'].exhibits == 0" >
                                  <img src="./img/sjt.png" alt="">
                                <p class="sjt"> 100% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].exhibits > getPreData['oldCountryData'].exhibits">
                                <img src="./img/sjt.png" alt="">
                                <p class="sjt"> {{((getDataS$G['countryData'].exhibits - getPreData['oldCountryData'].exhibits)*100/getPreData['oldCountryData'].exhibits).toFixed(2)}}% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].exhibits === getPreData['oldCountryData'].exhibits">
                                </div>
                            
                             <div class="lo_data" v-else>
                                <img src="./img/xjt.png" alt="">
                                <p class="xjt">{{((getPreData['oldCountryData'].exhibits - getDataS$G['countryData'].exhibits)*100/getPreData['oldCountryData'].exhibits).toFixed(2)}}%</p>
                            </div>
                        </div>
                         <BarChat  name="展品件数（件）" :preValue ="getPreData['oldCountryData'].exhibits" :curValue ="getDataS$G['countryData'].exhibits"/>
                    </li>
                    <li>
                         <div class="logoo">
                            <img src="./img/jz.png" alt="">
                            <div class="lo_data" v-if="(getDataS$G['countryData'].worth > getPreData['oldCountryData'].worth) && getPreData['oldCountryData'].worth == 0" >
                                  <img src="./img/sjt.png" alt="">
                                <p class="sjt"> 100% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].worth > getPreData['oldCountryData'].worth">
                                <img src="./img/sjt.png" alt="">
                                <p class="sjt"> {{((getDataS$G['countryData'].worth - getPreData['oldCountryData'].worth)*100/getPreData['oldCountryData'].worth).toFixed(2)}}% </p>
                            </div>
                            <div class="lo_data" v-else-if="getDataS$G['countryData'].worth === getPreData['oldCountryData'].worth">
                                </div>
                            
                             <div class="lo_data" v-else>
                                <img src="./img/xjt.png" alt="">
                                <p class="xjt">{{((getPreData['oldCountryData'].worth - getDataS$G['countryData'].worth)*100/getPreData['oldCountryData'].worth).toFixed(2)}}%</p>
                            </div>
                        </div>
                       <BarChat  name="展品价值总额（万美元）" :preValue ="getPreData['oldCountryData'].worth" :curValue ="getDataS$G['countryData'].worth"/>
                      
                    </li>
                </ul>
            </div>
        </div>
        <div class="g_left" v-else>
            <div class="l_top">
                <p>
                 {{showTitle}}
                </p>
            </div>
            <div class="threeCountry" :class="{showScroll}">
                <div v-for="(item,index) in threeArrayData" :key="index">
                    <p> {{index | cnName}}</p>
                    <ul>
                        <li v-for="(i,j) in item" :key="j">{{i.CNNAME}}</li>
                    </ul>
                </div>
                <!-- <ul>
                    <li v-for="(item,index) in showThreeArray" :key="index"> {{item.CNNAME}}</li>
                </ul> -->
            </div>
        </div>
        <div class="g_mid">
            <Map @allthree='GetThree' @toggleLeft='changeLeft' />
        </div>
        <div class="g_right">
            <div class="title">
                <p>全球展品大类分布 (万美元)</p>
            </div>
            <div id="wrap">
                <li>
                     <div class="box1">
                          <Polpar :preValue="(((getPreData['oldPriceData'].costumePrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].costumePrice)/10000).toFixed(2))*1"/>
                     </div>
                    <div class="box2">
                       <p>服饰服装及日用消费品</p>
                    </div>
                </li>
                
                <li>
                     <div class="box1">
                          <Polpar :preValue="(((getPreData['oldPriceData'].equipPrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].equipPrice)/10000).toFixed(2))*1"/>
                     </div>
                    <div class="box2">
                       <p>智能及高端装备</p>
                    </div>
                </li>
                 <li>
                    <div class="box1">
                         <Polpar :preValue="(((getPreData['oldPriceData'].medicalPrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].medicalPrice)/10000).toFixed(2))*1"/>
                         
                    </div>
                    <div class="box2">
                       <p>医疗器械及医药保健</p>
                    </div>
                </li>
                 <li>
                     <div class="box1">
                          <Polpar :preValue="(((getPreData['oldPriceData'].homeAppliancesPrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].homeAppliancesPrice)/10000).toFixed(2))*1"/>
                        
                    </div>
                    <div class="box2">
                       <p>消费电子及家电</p>
                    </div>
                </li>
                 <li>
                    <div class="box1">
                         <Polpar :preValue="(((getPreData['oldPriceData'].foodPrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].foodPrice)/10000).toFixed(2))*1"/>
                    </div>
                    <div class="box2">
                       <p>食品及农产品</p>
                    </div>
                </li>
                 <li>
                    <div class="box1">
                         <Polpar :preValue="(((getPreData['oldPriceData'].servicePrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].servicePrice)/10000).toFixed(2))*1"/>
                    </div>
                    <div class="box2">
                       <p>服务贸易</p>
                    </div>
                </li>
                  
                  <li class="footLi">
                    <div class="box1">
                          <Polpar :preValue="(((getPreData['oldPriceData'].carPrice)/10000).toFixed(2))*1"  :curValue="(((getDataS$G['priceData'].carPrice)/10000).toFixed(2))*1"/>
                    </div>
                    <div class="box2">
                       <p>汽车</p>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
import Map from './components/map'
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'

import {getCookie} from "@/until/getToken";
import BarChat from './components/barChat'
import Polpar from './components/polpar'
import regionTable from '@/until/corresponding'
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    components:{Map,BarChat,Polpar},
    data(){
        return{
            showLeft:true,
            showTitle:'',
            showScroll:false,
            title:'',
            preArr:[],
            curArr:[],
            preTypeArr:[],
            curTypeArr:[],
            allValue:[],
            showPreArr:[],
            showCurArr:[],
            showThreeArray:{},
            threeArrayData:{},
            previousYear:getCookie("date") == '2018'?'':JSON.stringify(JSON.parse(getCookie("date")) - 1),  //上一年
            currentYear:getCookie("date"),  //当前年
         } 
    },
    mounted(){
         this.getNewGaugeData(this.currentYear);
         this.SET_NEW_TITLE('全球概况')
         console.log(this.getPreData['oldCountryData'])
    },
     computed: {
    ...mapGetters("newComputed", [
      "getViewState",
      "getRegionCode",
      "getDataS$G",
    ]),
   

    ...mapGetters("oldComputed", [
     "getPreData",
    ])
  },

    methods:{
        
        ...mapActions("newComputed", [
            "getNewRegionData",
            "getNewGaugeData",
        ]),
        ...mapMutations('newComputed',[
            'SET_NEW_TITLE',
        ]),
        receveZhou(data){
            switch (data) {
                case 'AS':
                    this.title = '亚洲'
                    this.preArr = this.allValue.AS.foreYear
                    this.curArr = this.allValue.AS.hindYear
                    break;
                case 'AF':
                    this.title = '非洲'
                    this.preArr = this.allValue.AF.foreYear
                    this.curArr = this.allValue.AF.hindYear
                    break;
                case 'SA':
                    this.title = '南美洲'
                    this.preArr = this.allValue.SA.foreYear
                    this.curArr = this.allValue.SA.hindYear
                    break;
                case 'NA':
                    this.title = '北美洲'
                    this.preArr = this.allValue.NA.foreYear
                    this.curArr = this.allValue.NA.hindYear
                    break;
                 case 'EU':
                    this.title = '欧洲'
                    this.preArr = this.allValue.EU.foreYear
                    this.curArr = this.allValue.EU.hindYear
                    break;
                case 'OC':
                    this.title = '大洋洲'
                    this.preArr = this.allValue.OC.foreYear
                    this.curArr = this.allValue.OC.hindYear
                    break;
                case 'B$R': 
                    this.title = '一带一路国家/地区'
                    this.preArr = this.allValue.YDYL.foreYear
                    this.curArr = this.allValue.YDYL.hindYear
                    break;
                case 'C$E':  
                    this.title = '国家馆'
                    this.preArr = this.allValue.GJG.foreYear
                    this.curArr = this.allValue.GJG.hindYear
                    break;
                case 'GLB': 
                    this.title = '全球概况'
                    this.preArr = this.allValue.ZJ.foreYear
                    this.curArr = this.allValue.ZJ.hindYear
                    break;
                default:
                    break;
            }
        },
        //获取三年都来数据
        GetThree(params){
            console.log('params',params)
             var obj={
                AF:[],
                AS:[],
                EU:[],
                NA:[],
                SA:[],
                OC:[],
                YDYL:[]
            }
            this.showLeft = false
            if(params.newArr.length >34){
                if(params.date =='2019'){
                   this.showTitle ='两年都来国家/地区（'+ params.newArr.length +'）'
                }else{
                   this.showTitle ='三年都来国家/地区（'+ params.newArr.length +'）'
                }
                this.showScroll = true
            }else{
                 if(params.date =='2019'){
                   this.showTitle ='两年都未来国家/地区（'+ params.newArr.length +'）'
                }else{
                   this.showTitle ='三年都未来国家/地区（'+ params.newArr.length +'）'
                }
              this.showScroll = false
            }
           this.showThreeArray = params.newArr
          
              params.newArr.forEach((item,i)=>{
                //   console.log(item)
                  if(item.BR=='Y'){
                      obj.YDYL.push(item)
                  }
                  if(item.CONTINENT)
                  obj[item.CONTINENT].push(item)
              })
              this.threeArrayData=obj
              obj={
                AF:[],
                AS:[],
                EU:[],
                NA:[],
                SA:[],
                OC:[],
                YDYL:[]
            }
            //   console.log(this.threeArrayData)
        },
        //切换视图
        changeLeft(params){
            this.showLeft = params
        }
    },

    filters:{
        cnName:function(name){
            switch(name){
                case 'AF':
                    return '非洲';
                case 'AS':
                    return '亚洲';
                case 'EU':
                    return '欧洲';
                case 'NA':
                    return '北美洲';
                case 'SA':
                    return '南美洲';
                case 'OC':
                    return '大洋洲';
                case 'YDYL':
                    return '一带一路';
                default:
                    return '';
            }
        }
    },
    watch:{
    }
}
</script>

<style lang="scss" scoped>
.gloablOverview{
    height: 70vh;
    display: flex;
    margin-top: 0 !important;
 .g_left{
     height:100%;
     width: 400px;
     .l_top{
         width: 95%;
         height: 60px;
         margin: auto;
         background: url('./img/bg-title-qqgk.png') no-repeat 60% 100%;
         p{
             text-align: center;
             font-size: 22px;
             color: #fff;
             line-height: 50px;
         }
     }
     .l_content{
         width: 95%;
         height: 89%;
         margin:15px auto;
         ul{
             width: 100%;
             height: 100%;
             li{
                position: relative;
                 width: 100%;
                 height: 18.7%;
                 margin-bottom: 10px;
                 background: url('./img/bg-list.png') no-repeat;
                 background-size: 100% 100%;
                 .logoo{
                   position: absolute;
                   left:5px;
                   top:8px;
                   width: 20%;
                   height: 90%;
                   background: linear-gradient(#1845AD,#08185A,#08104A);
                   img{
                       width: 45px;
                       height: 45px;
                       margin-left: -5px;
                       margin-top: 5px;
                       margin: auto;
                   }
                   .lo_data{
                       width: 100%;
                       img{
                           width: 15px;
                           height: 15px;
                           margin-top: 5px;
                       }
                       .xjt{
                           color: #21B673;
                           font-size: 14px;
                           text-align: center;
                       }
                       .sjt{
                           color: #f00;
                           font-size: 14px;
                           text-align: center;
                       }
                   }
                 }
                 .data{
                     z-index: 999;
                     position: absolute;
                     left: 85px;
                     top:0;
                     width: 80%;
                     height: 100%;
                 }
             }
         }
     }
     .threeCountry{
         width: 95%;
         height: 89%;
         margin:15px auto;
         border: 2px solid #10389C;
         div:nth-of-type(7){
             li{
                 background-color: #FF3063
             }
         }
         p{
             text-align: left;
             font-size: 16px;
             color:white;
             float: left;
             width:100%;
             text-indent: 6px

         }
         ul{
             width: 100%;
             height: 100%;
             li{
                 list-style: none;
                 height: 30px;
                 width: 75px;
                 border: 1px solid #10389C;
                 line-height: 30px;
                 font-size: 12px;
                 color: #fff;
                 float: left;
                 text-align: center;
                 margin: 5px 5px;
                 overflow: hidden;
                 text-overflow: ellipsis;
                 white-space: nowrap;
             }
             li:hover{
                 background-color: #18EBFF;
             }
         }
     }
     .showScroll{
         overflow-y: scroll;
     }
 }
 .g_mid{
     height:100% ;
     width: 52%;
     border:1.5px solid #1041A5;
 }
 .g_right{
     height:100% ;
     width: 25%;
     border:1.5px solid #1041A5;
     border-left: none;
     .title{
         width: 100%;
         height: 60px;
         margin: auto;
         background: url('./img/bg-title-zpdlfb.png') no-repeat 45% 100%;
         p{
             text-align: center;
             font-size: 22px;
             color: #fff;
             line-height: 50px;
         }
      }
      #wrap{
          width: 100%;
          height: 100%;
          li{
              float: left;
              width: 48%;
              height: 23%;
              margin-left: 5px;
              list-style: none;
              margin-top: 3px;
              .box1{
                  height: 75%;
                  width: 100%;
              }
              .box2{
                  height: 12%;
                  width: 100%;
                  line-height: 10px;
                  background: url('./img/bg-list-zpdlfb.png') no-repeat;
                  background-size: 100% 100%;
                  margin-top: 3%;
                  p{
                      font-size: 15px;
                      text-align: center;
                      color: #fff;
                  }
              }
          }
          .footLi{
             margin-left: 25%;
             margin-top: -5px;
             
              
          }
      }
     }
 
}
</style>
