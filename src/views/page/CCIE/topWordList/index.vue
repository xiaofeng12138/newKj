<template>
    <div class="top-word">
        <div class="title">
            <span>{{titleList[index]}}</span>
            <a class="switch" @click="switchText">{{titleList[1 - index]}}</a>
        </div>
        <div class="top-word-list">
            <div class="most-exhibitor" style="position:relative">
            <span class="rect left top"></span>
            <span class="rect right top"></span>
            <span class="rect left bottom"></span>
            <span class="rect right bottom"></span>
            <header>{{detailList[index][0]}}</header>
            <div class="content"  v-if="showPage">
                <div class="exhibitor-content">
                    <div class="header" style="position: relative">
                         {{preYear}}
                        <span class="head left top"></span>
                        <span class="head right bottom"></span>
                    </div>
                    <div class="topThree">
                            <div class="topThree-detail" style="margin-left: 5%">
                                <img src="@/assets/topWordList/topWord-1.svg">
                                <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-if="index == 0">{{dataCZSArr.oldyear[0].NUM}}</span>
                                <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-else>{{dataCZSArr.oldyear[0].COMPANY}}</span>
                                <span class="country">{{dataCZSArr.oldyear[0].CNNAME}}</span>
                            </div>
                            <div class="topThree-detail">
                                <img src="@/assets/topWordList/topWord-2.svg">
                                <span class="quantity" style="color: rgba(208, 212, 217, 1)"  v-if="index == 0">{{dataCZSArr.oldyear[1].NUM}}</span>
                                 <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-else>{{dataCZSArr.oldyear[1].COMPANY}}</span>
                                <span class="country">{{dataCZSArr.oldyear[1].CNNAME}}</span>
                            </div>
                            <div class="topThree-detail" style="margin-right: 5%">
                                <img src="@/assets/topWordList/topWord-3.svg">
                                <span class="quantity" style="color: rgba(213, 156, 100, 1)"  v-if="index == 0">{{dataCZSArr.oldyear[2].NUM}}</span>
                                 <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-else>{{dataCZSArr.oldyear[2].COMPANY}}</span>
                                <span class="country">{{dataCZSArr.oldyear[2].CNNAME}}</span>
                            </div>
                        </div>
                </div>
                <div class="exhibitor-content">
                    <div class="header" style="position:relative">
                        {{nowYear}}
                        <span class="head left top"></span>
                        <span class="head right bottom"></span>
                    </div>
                    <div class="topThree">
                        <div class="topThree-detail" style="margin-left: 5%">
                            <img src="@/assets/topWordList/topWord-1.svg">
                            <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-if="index == 0">{{dataCZSArr.newyear[0].NUM}}</span>
                            <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-else>{{dataCZSArr.newyear[0].COMPANY}}</span>
                            <span class="country">{{dataCZSArr.newyear[0].CNNAME}}</span>
                        </div>
                         <div class="topThree-detail">
                            <img src="@/assets/topWordList/topWord-2.svg">
                            <span class="quantity" style="color: rgba(208, 212, 217, 1)" v-if="index == 0">{{dataCZSArr.newyear[1].NUM}}</span>
                             <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-else>{{dataCZSArr.newyear[1].COMPANY}}</span>
                             <span class="country">{{dataCZSArr.newyear[1].CNNAME}}</span>
                        </div>
                         <div class="topThree-detail" style="margin-right: 5%" v-if="dataCZSArr.newyear[2]">
                            <img src="@/assets/topWordList/topWord-3.svg">
                            <span class="quantity" style="color: rgba(213, 156, 100, 1)"  v-if="index == 0">{{dataCZSArr.newyear[2].NUM}}</span>
                            <span class="quantity" style="color: rgba(249, 208, 126, 1)" v-else>{{dataCZSArr.newyear[2].COMPANY}}</span>
                            <span class="country">{{dataCZSArr.newyear[2].CNNAME}}</span>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="most-right">
                <div class="most-money" style="position:relative"  v-if="showPage">
                    <span class="rect left top"></span>
                    <span class="rect right top"></span>
                    <span class="rect left bottom"></span>
                    <span class="rect right bottom"></span>
                    <header>{{detailList[index][1]}}</header>
                    <div class="content" >
                        <div class="row">
                            <div class="date">
                                {{preYear}}
                                <span class="head left top"></span>
                                <span class="head right bottom"></span>
                            </div>
                            <div class="country-value">
                                <div class="country-value-detail">
                                    <span class="value" style="color: rgba(249, 208, 126, 1)" v-if="index == 0">{{((this.dataJEArr.oldyear[0].NUM/10000).toFixed(0))}}</span> 
                                    <span class="value" style="color: rgba(249, 208, 126, 1)" v-else>{{((this.dataJEArr.oldyear[0].TOTALPRICE))}}</span> 
                                    <!-- <span class="country" style="width:100px">{{dataJEArr.oldyear[0].CNNAME}}</span> -->
                                     <span class="country" style="width:100px">中国香港</span>
                                    <img src="@/assets/topWordList/border1.svg">
                                </div>   
                            </div>
                            <div class="country-value">
                                <div class="country-value-detail">
                                    <span class="value" style="color: rgba(208, 212, 217, 1)" v-if="index == 0">{{((this.dataJEArr.oldyear[1].NUM/10000).toFixed(0))}}</span>  
                                     <span class="value" style="color: rgba(249, 208, 126, 1)" v-else>{{((this.dataJEArr.oldyear[1].TOTALPRICE))}}</span>   
                                    <span class="country">{{dataJEArr.oldyear[1].CNNAME}}</span>
                                    <img src="@/assets/topWordList/border2.svg">
                                </div>   
                            </div>
                            <div class="country-value">
                                <div class="country-value-detail">
                                    <span class="value" style="color: rgba(213, 156, 100, 1)" v-if="index == 0">{{((this.dataJEArr.oldyear[2].NUM/10000).toFixed(0))}}</span>  
                                    <span class="value" style="color: rgba(249, 208, 126, 1)" v-else>{{((this.dataJEArr.oldyear[2].TOTALPRICE))}}</span>  
                                    <span class="country">{{dataJEArr.oldyear[2].CNNAME}}</span>
                                    <img src="@/assets/topWordList/border3.svg">
                                </div>   
                            </div>
                        </div>
                        <div class="row">
                            <div class="date">
                               {{nowYear}}
                                <span class="head left top"></span>
                                <span class="head right bottom"></span>
                            </div>
                             <div class="country-value">
                                <div class="country-value-detail">
                                    <span class="value" style="color: rgba(249, 208, 126, 1)" v-if="index == 0">{{((this.dataJEArr.newyear[0].NUM/10000).toFixed(0))}}</span> 
                                     <span class="value" style="color: rgba(249, 208, 126, 1)" v-else>{{((this.dataJEArr.newyear[0].TOTALPRICE))}}</span>  
                                     <span class="country">{{dataJEArr.newyear[0].CNNAME}}</span>
                                  
                                    <img src="@/assets/topWordList/border1.svg">
                                </div>      
                            </div>
                            <div class="country-value">
                                <div class="country-value-detail">
                                    <span class="value" style="color: rgba(208, 212, 217, 1)" v-if="index == 0">{{((this.dataJEArr.newyear[1].NUM/10000).toFixed(0))}}</span> 
                                     <span class="value" style="color: rgba(249, 208, 126, 1)" v-else>{{((this.dataJEArr.newyear[1].TOTALPRICE))}}</span>     
                                    <span class="country">{{dataJEArr.newyear[1].CNNAME}}</span>
                                   
                                    <img src="@/assets/topWordList/border2.svg">
                                </div>   
                            </div>
                            <div class="country-value" v-if="this.dataJEArr.newyear[2]">
                                <div class="country-value-detail" >
                                    <span class="value" style="color: rgba(213, 156, 100, 1)" v-if="index == 0">{{((this.dataJEArr.newyear[2].NUM/10000).toFixed(0))}}</span>
                                     <span class="value" style="color: rgba(249, 208, 126, 1)" v-else>{{((this.dataJEArr.newyear[2].TOTALPRICE))}}</span>     
                                    <span class="country">{{dataJEArr.newyear[2].CNNAME}}</span>
                                    
                                    <img src="@/assets/topWordList/border3.svg">
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="most-quantity" style="position: relative">
                    <span class="rect left top"></span>
                    <span class="rect right top"></span>
                    <span class="rect left bottom"></span>
                    <span class="rect right bottom"></span>
                    <header>{{detailList[index][2]}}</header>
                    <div class="content">
                        <div class="content-detail-bar" id="content-detail-bar-left"></div>
                        <Divider style="height: 100%; background: #0037b2" type="vertical" />
                        <div class="content-detail-bar" id="content-detail-bar-right"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import { getCookie } from '@/until/getToken';
export default {
    data() {
        return {
            showPage:false,
            preCountry:[],
            preNumber:[],
            nowCountry:[],
            nowNumber:[],
            nowYear:getCookie('date')*1,
            preYear:getCookie('date')*1 - 1,
            charts: '',
            titleList: ['海关监管展品最字榜', '全局展品最字榜'],
            detailList: [
                ['参展商(家)最多国家/地区', '参展金额(万美元)最大国家/地区', '参展展品数量(件)最多国家/地区'],
                ['参展商(家)最多国家/地区', '参展展品种类最多国家/地区', '参展展位数量最多国家/地区'],
            ],
            index: 0,
            dataCZSArr:{},
            dataJEArr:{},
            //监管数据
             dataCZSArr1:{
                 newyear:[],
                 oldyear:[]
            },
            dataJEArr1:{
                 newyear:[],
                 oldyear:[]
            },
            preCountry1:[],
            preNumber1:[],
            nowCountry1:[],
            nowNumber1:[],

            //全局数据
             dataCZSArr2:{
                 newyear:[],
                 oldyear:[]
            },
            dataJEArr2:{
                 newyear:[],
                 oldyear:[]
            },
            preCountry2:[],
            preNumber2:[],
            nowCountry2:[],
            nowNumber2:[],
            
            option: {
                textStyle: {
                    color: '#fff',
                    fontSize: 18
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    }
                },
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        {offset: 0, color: 'rgba(57, 94, 239, 0.1)'},
                        {offset: 1, color: '#395eef'},
                    ]
                ),
                legend: {
                    data: ['2020'],
                    textStyle: {
                        color: '#fff'
                    },
                    top: '4%'
                },
                xAxis: [
                    {
                        type: 'value',
                        show: true,
                        axisLine: {
                            show: true
                        },
                    },
                ],
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 18
                    },
                    axisTick: {
                        show: false
                    },
                    data: [],
                },
                series: [
                    {
                        name:'2020',
                        type: 'bar',
                        data: [100,200,300]
                    }
                ]
            },
            option2: {
                textStyle: {
                    color: '#fff',
                    fontSize: 18
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    }
                },
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                        {offset: 0, color: 'rgba(255, 228, 69, 0)'},
                        {offset: 1, color: '#ffe33e'},
                    ]
                ),
                legend: {
                    data: ['2019'],
                    textStyle: {
                        color: '#fff'
                    },
                    top: '4%'
                },
                xAxis: [
                    {
                        type: 'value',
                        show: true,
                        axisLine: {
                            show: true
                        },
                    },
                ],
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 18
                    },
                    axisTick: {
                        show: false
                    },
                    data: [],
                },
                series: [
                    {
                        name: '2019',
                        type: 'bar',
                        data: []
                    }
                ]
            },
        } 
    },
    
    created() {
        this.query();
        this.queryAll()
    },
    mounted() {
      
    },
    methods: {
        switchText() {
            this.index = 1- this.index;
                this.preCountry = []
                this.preNumber =[]
                this.nowCountry =[]
                this.nowNumber =[]
            if(this.index == 0) {
                    this.dataCZSArr = this.dataCZSArr1
                    this.dataJEArr = this.dataJEArr1
                    this.preCountry = this.preCountry1
                    this.preNumber = this.preNumber1
                    this.nowCountry = this.nowCountry1
                    this.nowNumber = this.nowNumber1
                     this.init()
            } else {
                    this.dataCZSArr = this.dataCZSArr2
                    this.dataJEArr = this.dataJEArr2
                    this.preCountry = this.preCountry2
                    this.preNumber = this.preNumber2
                    this.nowCountry = this.nowCountry2
                    this.nowNumber = this.nowNumber2
                     this.init()
               
            }
        },
        init() {
            //2018
            let nowYear = getCookie('date')*1
            let preYear = getCookie('date')*1 - 1 
           
            this.charts = echarts.init(document.getElementById('content-detail-bar-left'));
            this.option.legend.data[0] = String(preYear);
            this.option.series[0].name = String(preYear);
            this.option.yAxis.data = this.preCountry;
            this.option.series[0].data = this.preNumber;
            this.charts.setOption(this.option)
            //2019
            this.charts = echarts.init(document.getElementById('content-detail-bar-right'));
            this.option2.legend.data[0] = String(nowYear);
            this.option2.series[0].name = String(nowYear);
            this.option2.yAxis.data = this.nowCountry;
            this.option2.series[0].data = this.nowNumber;
            this.charts.setOption(this.option2)
        },
        //海关监管数据查询
        query() {
            publicInter(interfaceUrl.qryZzbByCountry, {}).then(r => {
                if(r) {
                    let nowYear = getCookie('date')*1
                    let preYear = getCookie('date')*1 - 1 
                    // let preCountry=[]
                    // let preNumber=[]
                    this.dataCZSArr1 = {
                        newyear: r.exhibitorMap[nowYear], //当前年
                        oldyear: r.exhibitorMap[preYear]  //上一年
                    }
                    this.dataJEArr1 = {
                        newyear: r.totalpriceMap[nowYear], //当前年
                        oldyear: r.totalpriceMap[preYear]  //上一年
                    }
                    r.quantityMap[preYear].forEach((item=>{
                        this.preCountry1.push(item.CNNAME)
                        this.preNumber1.push(item.NUM)
                    }))
                    r.quantityMap[nowYear].forEach((item=>{
                        this.nowCountry1.push(item.CNNAME)
                        this.nowNumber1.push(item.NUM)
                    }))
                    this.dataCZSArr = this.dataCZSArr1
                    this.dataJEArr = this.dataJEArr1
                    this.preCountry = this.preCountry1
                    this.preNumber = this.preNumber1
                    this.nowCountry = this.nowCountry1
                    this.nowNumber = this.nowNumber1
                    
                    this.showPage = true
                    this.init()
                }
            });
        },

        queryAll() {
            publicInter(interfaceUrl.qryZzbAllByCountry, {}).then(r => {
                if(r.resultZuiZiBang) {
                    let nowYear = getCookie('date')*1
                    let preYear = getCookie('date')*1 - 1 
                    this.dataCZSArr2 = {
                        newyear:  r.resultZuiZiBang.companyTop3[nowYear], //当前年
                        oldyear:  r.resultZuiZiBang.companyTop3[preYear]  //上一年
                    }
                    this.dataJEArr2 = {
                        newyear:  r.resultZuiZiBang.totalpriceTop3[nowYear], //当前年
                        oldyear:  r.resultZuiZiBang.totalpriceTop3[preYear]  //上一年
                    }
                    r.resultZuiZiBang.batchnumTop3[preYear].forEach((item=>{
                        this.preCountry2.push(item.CNNAME)
                        this.preNumber2.push(item.BATCHNUM)
                    }))
                    r.resultZuiZiBang.batchnumTop3[nowYear].forEach((item=>{
                        this.nowCountry2.push(item.CNNAME)
                        this.nowNumber2.push(item.BATCHNUM)
                    }))
                }
            });
        }
    },
    
}
</script>

<style lang="scss" scoped>
.top-word {
    width: 100%;
    height: 100%;
    .title {
        height: 2rem;
        position: relative;
        .switch {
            position: absolute;
            top: 50%;
            left: 70%;
            font-size: 1rem;
            transform: translate(-70% -50%)
        }
        span {
            height: 2rem;
            color: #fff;
            width: auto;
            left: -1.5rem;
            text-align: center;
            position: relative;
            font-size: 1.5rem;
            
            &::before,&::after{
              content: '';
              position: absolute;
              width: 4rem;
              height: 100%;
              top: 0;
              background-size: contain;

            }
            &:after{
              right:-5rem ;
              background: url('../../../../assets/ccie-title-right.png') 50% 50% no-repeat;
            }
            &:before{
              left: -5rem;
              background: url('../../../../assets/ccie-title-right.png') 50% 50% no-repeat;
              transform: rotate(180deg)
            }
        }
    }
}
.top-word-list {
    width: 100%;
    height: calc(100% - 3rem);
    display: flex;
    margin-top: 1rem;
    header {
        height: 3.5rem;
        color: #fff;
        font-size: 1.25rem;
        border-bottom: 1px solid #0037b2;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, #1f5ff2 0%, rgba(31, 95, 242, 0.1) 100%)
    }
    .most-exhibitor {
        margin-left: 1%;
        width: 33%;
        height: 100%;
        border: 1px solid #0037b2;
        .content {
            height: calc(100% - 3.5rem);
            .exhibitor-content {
                height: 50%;
                padding: 5%;
                .header {
                    height: 3rem;
                    border: 1px solid #0037b2;
                    vertical-align: middle;
                    padding: 0.4rem 0.3rem;
                    color: #fff;
                    line-height: 2.2rem;
                    font-size: 1.13rem;
                    background: rgba(31, 95, 242, 0.2);
                    background-clip: content-box
                }
                .topThree {
                    width: 90%;
                    height: calc(90% - 3rem);
                    display: flex;
                    margin: 0 5%;
                    margin-top: 1rem;
                    .topThree-detail {
                        width: 30%;
                        // text-align: center;
                        position: relative;
                        img {
                            position: absolute;
                            top: 0;
                            left: 50%;
                            width: 4rem;
                            height: 4rem;
                            transform: translate(-50%, 0);
                        }
                        .quantity {
                            position: absolute;
                            top: 2rem;
                            font-size: 1rem;
                            transform: translate(-50%, -50%)
                        }
                        .country {
                            position: absolute;
                            top: 5.5rem;
                            width: 120px;
                            font-size: 1.2rem;
                            font-weight: bold;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: #fff
                        }   
                    }
                }
            }
        }
        
    }
    .most-right {
        margin-left: 2%;
        margin-right: 1%;
        width: 63%;
        height: 100%;
        .most-money {
            width: 100%;
            height: 45%;
            border: 1px solid #0037b2;
            .content {
                width: 100%;
                height: calc(100% - 3.5rem);
                .row {
                    width: 100%;
                    height: 50%;
                    padding: 2% 5%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .date {
                        position:relative;
                        width: 25%;
                        height: 3rem;
                        border: 1px solid #0037b2;
                        vertical-align: middle;
                        padding: 0.4rem 0.3rem;
                        color: #fff;
                        line-height: 2.2rem;
                        font-size: 1.13rem;
                        background: rgba(31, 95, 242, 0.2);
                        background-clip: content-box
                    }
                    .country-value {
                        width: 20%;
                        margin-left: 5%;
                        height: 3rem;
                        .country-value-detail {
                            height: 3rem;
                            width: 200px;
                            text-align: left;
                            display: flex;
                            align-items: center;
                            position: relative;
                            img {
                                width: 100%;
                                position: absolute;
                                bottom: 0%;
                            }
                            .country {
                                font-size: 1rem;
                                width:50px;
                                color: #fff;
                                margin-left: 0.5rem;
                                font-size: 1rem;
                            }
                            .value {
                                font-size: 1.5rem;
                            }
                        }
                    }
                }
            }
        }
        .most-quantity {
            margin-top: 20px;
            width: 100%;
            height: calc(55% - 20px);
            border: 1px solid #0037b2;
            .content {
                width: 100%;
                height: calc(100% - 3.5rem);
                display: flex;
                padding: 2% 5%;
               .content-detail-bar {
                    width: 49%;
                    height: 100%;
                }
            }
        }
    }
}
.rect {
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: transparent;
  z-index: 999;
  &.left {
    left: -1px;
    border-left: 2px solid rgba(31, 95, 242, 1);
  }
  &.top {
    top: -1px;
    border-top: 2px solid rgba(31, 95, 242, 1);
  }
  &.right {
    right: -1px;
    border-right: 2px solid rgba(31, 95, 242, 1);
  }
  &.bottom {
    bottom: -1px;
    border-bottom: 2px solid rgba(31, 95, 242, 1);
  }
}
.head {
  position: absolute;
  width: 2rem;
  height: 1rem;
  background: transparent;
  z-index: 999;
  &.left {
    left: -1px;
    border-left: 2px solid rgba(31, 95, 242, 1);
  }
  &.top {
    top: -1px;
    border-top: 2px solid rgba(31, 95, 242, 1);
  }
  &.right {
    right: -1px;
    border-right: 2px solid rgba(31, 95, 242, 1);
  }
  &.bottom {
    bottom: -1px;
    border-bottom: 2px solid rgba(31, 95, 242, 1);
  }
}
</style>
