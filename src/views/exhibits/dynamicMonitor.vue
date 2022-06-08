<template>
    <div :class="{'frame':true,'map-warrap':true,'bigScreen':isBigScreen}">
        <div class="warrap-header">
            <h3 class="center">
                <b>中国国际进口博览会通关监控大数据管理</b>
            </h3>
            <span @click="jumpRoute">
                <img src="@/assets/logo2.png" alt="">
            </span>
           
            <h3 class="right">
                <img src="@/assets/text.png" alt="">
            </h3>
        </div>
        <div class="warrap-body">
            <div class="layoutDiv layoutDivFirst">
                <div class="borderLayout borderLayout1">
                    <transport style="width:100%;height:100%;" @showSipg = 'sipgshow = true'></transport>
                </div>
                <div class="borderLayout borderLayout2">
                    <div class="screen">
                        <div class="flowSlider" :class="{realFlow:realFlow}">
                            <div>
                                <span class="littleTitle">展品流向预测<span @click="realFlow=true">实际流向</span></span>
                                <bar-chart  id="barCharts" :height='barHeight' :width='barWidth'></bar-chart>
                            </div> 
                            <div>
                                <span class="littleTitle"><span @click="realFlow=false">流向预测111</span>展品实际流向</span>
                                <footer-chart  id="barCharts" :deathData='true' :height='barHeight' :width='barWidth'></footer-chart>
                            </div>
                        </div>
                    </div> 
                    
                </div>
                <div class="borderLayout borderLayout3">
                    <div class="tab">
                    <span v-for="(item,index) in intellTab" :key="index" :class="{active: index == intellNum}" @click="tabIntell(item.key,index)">
                        {{ item.name }}
                    </span>
                    </div>
                    <div style="padding-left: 6px;">
                        <rotate ref="rotateChild" @showEdit='showEdit'></rotate>
                    </div>
                </div>
            </div>
            <div class="layoutDiv layoutDivSecond">
                <div class="exhitionMapF borderLayout4">
                    <exhibit-map :exhitionWidth='exhitionWidth' :exhitionHeight='exhitionHeight' :floor='floor' 
                        :positionIndex='positionIndex' :positionShow='positionShow' :show98='show98'
                        @positionEx='positionEx' :linkerImgs='linkerImgs' :currentPosition='currentPosition' :positionTop='positionTop' 
                        :positionLeft='positionLeft'></exhibit-map>
                    <!-- && positionIndex<exdata.length -->
                    <div v-if="positionShow && exdata.length!==0" class="positionUnitDivF" :style="{top:postionTop,'z-index':66}">
                        <span @click="clearSelect()" style="display: inline-block;position: absolute;top: 0; right: 10px;font-size: 10px;color: #DCDCDC;font-size: 20px;cursor: pointer;z-index:67;">×</span>
                        <div class="positionUnitDiv positionUnitDivF1">
                            <div>
                                <span class="positionUnitTitle">展商名称：</span>
                                <span class="positionUnitContent" :title="positionIndexShowEdit.EXHIBITOR">{{ positionIndexShowEdit.EXHIBITOR || "" }}</span>
                            </div>
                            <div>
                                <span class="positionUnitTitle">国家/地区：</span>
                                <span class="positionUnitContent" :title="positionIndexShowEdit.COUNTRYENNAME">{{ positionIndexShowEdit.COUNTRYENNAME }}</span>
                            </div>
                            <div>
                                <span class="positionUnitTitle">展位编号：</span>
                                <span class="positionUnitContent" :title="positionIndexShowEdit.BOOTHN">{{ positionIndexShowEdit.BOOTHN }}</span>
                            </div>
                            <div>
                                <span class="positionUnitTitle">展区类型：</span>
                                <span class="positionUnitContent" :title="extypeFun(positionIndexShowEdit.HALLNO)">{{ extypeFun(positionIndexShowEdit.HALLNO) }}</span>
                            </div>
                            <div v-if="positionIndexShowEdit.NUMOFBILLS !== 0">
                                <span class="positionUnitTitle">提单数：</span>
                                <span class="positionUnitContent"><a @click="getNumo">{{ positionIndexShowEdit.NUMOFBILLS }}</a></span>
                            </div>
                            <div>
                                <span class="positionUnitTitle">总金额：</span>
                                <span class="positionUnitContent">{{ positionIndexShowEdit.TOTALPRICE +'美元' }}</span>
                            </div>
                            <div>
                                <span class="positionUnitTitle">展品数：</span>
                                <span class="positionUnitContent">{{ positionIndexShowEdit.QUANTITY +'件' }}</span>
                            </div>                       
                            <div v-if="positionIndexShowEdit && positionIndexShowEdit.WEBSITE">
                                <span class="positionUnitTitle">展商网址：</span>
                                <span class="positionUnitContent" :title="positionIndexShowEdit.WEBSITE">
                                    <span style="cursor:pointer;color:#FFDE1D;" @click="routerA(positionIndexShowEdit.WEBSITE)">{{ positionIndexShowEdit.WEBSITE }}</span>
                                </span>
                            </div>
                            <a @click = 'qryExhibitorFlow(positionIndexShowEdit.EXHIBITORID)'>展品明细及流向监控</a>
                        </div>
                        <div class="positionUnitDiv positionUnitDivF2" v-show="positionShow2 && billNos.length > 0">
                            <div class="positionUnitDiv2">
                                <Tooltip content="中远海运集运为此次博览会唯一推荐国际段运输服务商" max-width="200" v-show="cosco" style="height: 30px;vertical-align: middle;line-height: 30px">
                                    <img src="../../assets/cosco.png" title="" style="height: 20px;vertical-align: middle"/>                                  
                                </Tooltip>
                                <span style="display: inline-block;height: 30px;line-height: 30px;vertical-align:middle;background:transparent;width:54px;">提运单号</span>
                                <div>
                                    <li v-for="(unit,index) in billNos" :class="{selectBillNo: selectBillNo == index}"
                                        @click="changeSelectBillNo(index)" :key="index" :title="unit.BILLNO">{{ unit.BILLNO }}</li>
                                </div>
                            </div>
                            <div class="positionUnitDiv3" v-if="billNos[selectBillNo] && billNos[selectBillNo].STARTTIME">
                                <li>
                                    <p>装货</p>
                                    <p>{{ billNos[selectBillNo].LOADTIME }}<a @click="routerToView(billNos[selectBillNo].BILLNO)">物流链全景</a></p>
                                    <p>{{ billNos[selectBillNo].LOADPORT }}</p>
                                </li>
                                <li>
                                    <p>启运</p>
                                    <p>{{ billNos[selectBillNo].STARTTIME }}</p>
                                    <p>{{ billNos[selectBillNo].STARTPORT }}</p>
                                </li>
                                <li>
                                    <p>到港</p>
                                    <p>{{ billNos[selectBillNo].ENDTIME }}</p>
                                    <p>{{ billNos[selectBillNo].ENDPORT }}</p>
                                </li>
                            </div>
                        </div>
                    </div>
                    <num-over ref="overChild" v-show="numOverShow"  @myCloseWin="closewin"
                        :style="{position:'absolute',top:'calc(50% - 8rem)',left:overPositionLeft}"></num-over>
                    <div style="position: absolute;right: 14px;top: 10px;">
                        <RadioGroup v-model="floor" @on-change="changeFloor">
                            <Radio label="1">一层</Radio>
                            <Radio label="2">二层</Radio>
                        </RadioGroup>
                    </div>
                    <div class="currentSelectPosition">
                        <img style="width: 1rem;height: 1.1rem" src="../../assets/position.png"/>
                        <span>当前选中展位</span>
                    </div>
                    <img src="@/assets/camera.jpg" class="cameraJpg" style="left:0px;" @click="showVideo('1')" />
                    <img src="@/assets/camera.jpg" class="cameraJpg" style="left:34px;" @click="showVideo('2')" />
                    <img src="@/assets/camera.jpg" class="cameraJpg" style="left:68px;" @click="showVideo('3')" />
                </div>
                <div class="borderLayout borderLayout5">
                    <div v-show="!flowShow">
                        <span class="littleTitle">每日进口动态</span>
                        <import-dynamic :width='mixWidth' :height='mixHeight'></import-dynamic>
                    </div>
                    <div v-show="flowShow" style="padding: 0 20px;width: 100%;height: 100%;">
                        <list-and-flow ref="flowChild" @rowClick='rowClick'></list-and-flow>
                    </div>
                </div>
                <div class="sipgshow" v-show="sipgshow">
                    <span @click="sipgshow=false">×</span>
                    <sipg-unit></sipg-unit>
                </div>
            </div>
            <div class="layoutDiv layoutDivThird">
                <div  class="borderLayout borderLayout6">
                    <div v-show='!searchShow && !qryExhibitorForExpo && !ExhibitorCountShow'>
                        <span class="littleTitle" style="border-bottom: 0">{{ "主要参展商("+currentPosition+"号馆)" }}
                            <span style="width: 100px;font-size: 20px;color: #1DEAFF;text-align:right;display: inline-block;cursor: pointer;position: absolute;right: 0;">
                                <Icon type="ios-search" @click="positionSearchShow" style="vertical-align:middle;" />
                                <img src="@/assets/panda.jpg" style="width:36px;vertical-align:middle;margin-left:10px;" @click="qryExpo" />
                                <Icon type="ios-search" style="vertical-align:middle;"  class="myHideIcon"
                                    @click="qryExhibitorCountForHallno" />
                            </span>
                        </span>
                    </div>
                    <div v-show="qryExhibitorForExpo">
                        <span class="littleTitle" style="border-bottom: 0">{{ "重点展位" }}
                            <span style="font-size:0.8rem;color:#fff;padding-right: 10px;text-align:right;display: inline-block;cursor: pointer;float:right;" @click="qryExhibitorForExpo=false">取消</span> 
                        </span>
                    </div>
                    <div v-show="ExhibitorCountShow">
                        <span class="littleTitle" style="border-bottom: 0">{{ "展馆重点展位数分布情况" }}
                            <span style="font-size:0.8rem;color:#fff;padding-right: 10px;text-align:right;display: inline-block;cursor: pointer;float:right;" @click="ExhibitorCountShow=false">取消</span> 
                        </span> 
                    </div>
                    <div v-show='searchShow && !qryExhibitorForExpo && !ExhibitorCountShow' style="height: 42px;line-height: 42px">
                        <span style="width: 30px;font-size: 20px;color: #1DEAFF;padding-left: 10px;display: inline-block;vertical-align: top;"><Icon type="ios-search" /></span>
                        <div class="searchCondition">
                            <span @click="showSearch2">
                                {{ searchModel.value }}
                                <Icon type='ios-arrow-down'></Icon>
                            </span>
                            <ul v-if="searchCondition2">
                                <li v-for="item in searchList" :key="item.key" :value="item.value" 
                                @click="selectSearchCondition(item)" :class="{selectSearch:searchModel.key === item.key}">
                                    {{ item.value }}
                                </li>
                            </ul>
                        </div>
                        <vague v-if="searchModel.key === 'country'" style="width: calc(100% - 220px);display: inline-block;vertical-align:middle" 
                            :firstVal="selectResult" @regionVal = 'regionVal'></vague>
                        <Input v-else style="width: calc(100% - 220px);display: inline-block;" placeholder="请输入您想要搜索的关键字"
                        v-model="itemTypeCondition.itemtype" @on-enter='qryExhibitorByItemType'/>
                        <span style="width: 64px;text-align: right;display: inline-block;cursor: pointer" @click="searchHide">取消</span>
                    </div>
                    <div class="frameTable">
                        <import-exhibition ref="qryChild" v-show="qryExhibitorForExpo" @clickToPosition='clickToPosition'></import-exhibition>
                        <Table  v-if="ExhibitorCountShow" :columns="exhibitorCountcolumns" :data="exhibitorCountdata"></Table>
                        <Table :columns="excolumns" :data="exdata" v-if='!qryExhibitorForExpo && !ExhibitorCountShow'></Table>
                        <span class="breakPage" v-if="exdataNum > 10 && searchShow" style="position:relative;float:right;right:10px;top:8px;">
                            <Icon type='ios-arrow-back' @click="webpage(-1)"></Icon>
                            <Icon type='ios-arrow-forward' @click="webpage(1)"></Icon>
                        </span>
                    </div>
                </div>
                <div  class="borderLayout borderLayout7">
                    <div class="tab tab1">
                        <span v-for="(item,index) in newTechTab " :key="index" :class="{active: index == num}" @click="tabnew(item.key,index)">
                            {{ item.name }}
                        </span>
                    </div>
                    <les-chart :width='lesWidth' :height='lesHeight' :num='num' ref='lesChild' @showEdit='showEdit'></les-chart>
                </div>
            </div>
            <div class="backToTheFirstPage">
                <Icon type='ios-arrow-back'  @click='backToping1'></Icon>
            </div>      
        </div>
        <div class="warrp-footer">{{"开发单位：全国海关大数据云平台（上海）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全国海关大数据应用中心"}}</div>
        <div v-if="myModal || customModel || ataModel || goodsDetailShow" style="position:fixed;width:100%;height:100%;left:0;top:0;z-index:100;background:#000;opacity:0.7;">   
        </div>
        <div v-show='myModal'
        style="z-index:101;width:51vh;height:calc(68vh + 20px);border-radius:4px;overflow:hidden;position:absolute;top:calc(50% - 34vh - 10px);background:#fff;left:calc(50% - 25.5vh)">
            <view-index :wrapModal = "myModal" v-on:editWin = 'openMyModal' :videoUrl = "pVideoUrl" ref="child"></view-index>
        </div> 
        <!-- 展品流向及预测报关单查询 -->
        <customs-unit :modelFlag="customModel" :customID="customId"  @myCloseWin="closewin" ref = 'customChild' @myOpenWin='openWin'></customs-unit> 
        <!-- 展品流向及预测ATA查询 -->
        <ata-unit style="width:1200px;height:600px;top:calc(50% - 300px);left:calc(50% - 600px)" :modelFlag='ataModel' :dataATA="dataATA" :ATAHead='ATAHead' @myCloseWin="closewin"></ata-unit>
        <bond-unit @myCloseWin="closewin" @myOpenWin='openWin' :modelFlag="bondModel" ref="bondChild"></bond-unit>  
        <goods-detail v-show="goodsDetailShow" @myCloseWin="closewin" ref="goodsChild" @showBooth='qryExhibitorByBoothNo'></goods-detail>
    </div>
</template>

<script>
import rotate from './unit/rotate'
import exhibitiontable from "@/views/exhibits/unit/exhibitiontable";
import interfaceUrl from '@/api/interfaceUrl'
import exhititionList from '@/views/exhibits/unit/exhitionList'
import { publicInter } from '@/api/http'
import {
  getRouterName
} from "@/until/getToken";
import vague from './unit/vague2'
import country from './exhibitionShow/exhibitionMap/corresponding';
import customsUnit from '@/views/exhibits/unit/customsUnit'
import ataUnit from '@/views/exhibits/unit/ATAUnit'
import bondUnit from '@/views/exhibits/dynamicUnit/bondUnit'
import viewIndex from '@/views/exhibits/unit/viewIndex'
import axios from 'axios';
import transport from '@/views/exhibits/dynamicUnit/leftFirst'
import sipgUnit from '@/views/exhibits/dynamicUnit/sipgUnit'
import barChart from '@/views/exhibits/dynamicUnit/leftSecond'
import footerChart from '@/views/exhibits/dynamicUnit/leftThree'
import importDynamic from '@/views/exhibits/dynamicUnit/importDynamic' //每日进口动态
import lesChart from '@/views/exhibits/dynamicUnit/rightSecond'
import listAndFlow from '@/views/exhibits/dynamicUnit/listAndFlow' //展品明细及流向监控
import importExhibition from '@/views/exhibits/dynamicUnit/exhibitorTable/importExhibition'
import exhibitMap from '@/views/exhibits/dynamicUnit/centerFirst'
import numOver from '@/views/exhibits/dynamicUnit/numOver'
import goodsDetail from '@/views/exhibits/dynamicUnit/goodsDetail'
export default {
    name: "dynamic",
    components: {exhibitiontable, rotate,vague,customsUnit,ataUnit,viewIndex,transport,sipgUnit,
        bondUnit,barChart,importDynamic,lesChart,listAndFlow,importExhibition,exhibitMap,numOver,footerChart,
        goodsDetail},
    data(){
        return{    
            realFlow:false,        
            colors:["#43C5FF","#8FA1FF","#FFFFFF","#FF9A55","#FFE91A","#FF7676","#FF9A55","#FFFFFF","#5FB3FF","#8493EC"],
            //表格columns
            excolumns: [
                {
                    title: '排名',
                    key: 'ROWNUMBER',
                    width:40,
                    align:'center'
                },
                {
                    title: '展商名字',
                    key: 'EXHIBITOR',
                    align:'center',
                    render:(h,params)=> {
                        try {
                            let val = params.row.EXHIBITOR
                            return h('Tooltip', {
                                attrs: {
                                    content: val,
                                    transfer:true
                                },
                            }, val)
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }
                },
                {
                    title: '数量(件)',
                    key: 'QUANTITY',
                    align:'center',
                    render:(h, params)=>{
                        let val = params.row.QUANTITY;
                        return h('span',val)
                    }
                },
                {
                    title: '金额(美元)',
                    key: 'TOTALPRICE',
                    align:'center',
                    width:90,
                    render:(h, params)=>{
                        let val = params.row.TOTALPRICE;
                        return h('span',val)
                    }
                },
                {
                    title: '国家/地区',
                    key: 'COUNTRYENNAME',
                    align:'center',
                    width:90,
                    render:(h, params)=>{
                        let val = params.row.COUNTRYCNNAME;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    }
                },
                {
                    title: '展位',
                    key: 'BOOTHN',
                    click:'true',
                    align:'center',
                    render:(h,params) =>{
                        let divs;
                        switch(params.row.FORMTYPE){
                            case "1":
                                divs = [
                                    h('img',{
                                        attrs:{
                                            src:this.redpanda
                                        },
                                        style:{
                                            width:'16px',
                                            'vertical-align':'middle'
                                        }
                                    }),
                                ]
                                break;
                            case "2":
                                divs = [
                                    h('img',{
                                        attrs:{
                                            src:this.greenpanda
                                        },
                                        style:{
                                            width:'16px',
                                            'vertical-align':'middle'
                                        }
                                    }),
                                ]
                                break;
                            case '3':
                                divs = h('div',{
                                    style:{
                                        display:'inline-block',
                                        'vertical-align':'middle'
                                    }
                                },[
                                    h('img',{
                                        attrs:{
                                            src:this.redpanda
                                        },
                                        style:{
                                            width:'16px',
                                            display:'block'
                                        }
                                    }),
                                    h('img',{
                                        attrs:{
                                            src:this.greenpanda
                                        },
                                        style:{
                                            width:'16px',
                                        }
                                    }),
                                ])
                                break;
                        }
                        return h('div',{
                            style:{
                                width:'100%',
                                'text-align':'left'
                            }
                        },[
                            divs,
                            h('span',{
                                props:{

                                },
                                attrs:{
                                    title:params.row.BOOTHN
                                },
                                style:{
                                    color: '#FFE91A',
                                    cursor:'pointer'
                                },
                                on:{
                                    click:() =>{
                                        let index = this.searchShow?(params.row.TOPNUMBER):(params.row.ROWNUMBER - 1);
                                        let current = this.searchShow?"TOPNUMBER":"ROWNUMBER";
                                        // let current = params.row.TOPNUMBER?"TOPNUMBER":"ROWNUMBER";
                                        // let index = current === "TOPNUMBER"?(params.row.TOPNUMBER - 1):(params.row.ROWNUMBER - 1);
                                        this.positionIndexShowEdit = params.row;
                                        this.clickToPosition({index,hallno:params.row.HALLNO,current,paramsIndex:params.index});
                                    }
                                }
                            },params.row.BOOTHN)
                        ])
                    }
                }
            ],
            qryExhibitorForExpo:false,
            exdata:[],           
            exhibitorCountcolumns:[
                {
                    title: '展位号',
                    key: 'HALLNO',
                    align:'center'
                },
                {
                    title: '总展位数',
                    key: 'EXHINUM',
                    align:'center'
                },
                {
                    title: '重点展位数',
                    key: 'IMPORTEXHINUM',
                    align:'center',
                    render:(h,params)=>{
                        return h('span',{
                            style:{
                                color: '#FFE91A'
                            },
                        },params.row['IMPORTEXHINUM'])
                    }
                },
            ],
            exhibitorCountdata:[],
            exhibitordata:[],
            exdataPage:1,
            exdataNum:1,
            exdataAll:[],
            newTechArr:{},
            newTechTab:[{name:'汽车',key:'2'},{name:'日用品',key:'5'},{name:'医疗',key:'6'},{name:'食品',key:'7'}],
            intellTab:[{name:'智能装备',key:'3'},{name:'电子家电',key:'4'},{name:'一带一路展品',key:'0'}],
            intellNum:0,
            positionIndex:999,
            positionShow:false,
            positionShow2:false,
            flowShow:false,
            searchShow:false,
            positionLeft:0,
            positionTop:0,
            postionTop:0,
            exhitionWidth:'',
            exhitionHeight:'',
            //当前层数
            floor:'1',
            selectResult:"",
            billNos:[],
            selectBillNo:0,
            //当前展馆号
            currentPosition:'1',
            isBigScreen:false,
            fontSize:[12,14],
            num:1,
            searchModel:{key:'country',value:'国家/地区'},
            searchList:[{key:'country',value:'国家/地区'},{key:'itemType',value:'展品大类'},{key:'name',value:'展商名称'},{key:'boothno',value:'展位号'},],
            searchCondition2:false,
            itemTypeCondition:{
                itemtype:"",
                pageNum:1,
                pageSize:10
            },
            //上港集团'中博会绿色通道'集装箱在港情况汇总表
            sipgshow:false,
            show98:false,
            myModal:false,
            //点击展位后弹框的详情显示
            positionIndexShowEdit:{},
            videoSrc:"",           
            customId:"",
            ATAHead:{},
            dataATA:[],
            customModel:false,
            ataModel:false,
            bondModel:false,
            pVideoUrl:'http://180.167.173.154/msj/token/181007001',
            cosco:false,
            redpanda:'',
            greenpanda:'',
            ExhibitorCountShow:false,
            barHeight:0,
            barWidth:0,
            mixWidth:0,
            mixHeight:0,
            lesWidth:0,
            lesHeight:0,
            linkerImgs:[],
            numOverShow:false,
            overPositionLeft:0,
            goodsDetailShow:false
        }
    },
    created(){
        this.linkerImgs = exhititionList;
        this.redpanda = require('@/assets/redpanda.png')
        this.greenpanda = require('@/assets/greenpanda.png')
        window.onresize= ()=> {
            this.resizeWindow();
        }
        var body=document.getElementsByTagName('body')[0],
            that = this;
        body.addEventListener('click',function(e){
            if(e.target.nodeName!='SPAN' && e.target.nodeName != 'UL' && e.target.nodeName != 'I'){              
                that.searchCondition2 = false;
            }
        })
    },
    mounted(){
        this.tabIntell("3",0);
        // this.resizeCharts();
        this.resizeWindow();
        this.initQueryTopExhibitor('1'); 
    },
    methods:{
        resizeWindow(){
            try{
                let oWidth = (document.getElementsByClassName('exhitionMapF')[0].clientWidth);
                let oHeight = document.getElementsByClassName('exhitionMapF')[0].clientHeight;
                if(oWidth/oHeight >= 317/207){
                    this.exhitionWidth= oHeight*(317/207)+'px';
                    this.exhitionHeight=oHeight +'px';
                }
                else{
                    this.exhitionWidth= oWidth+'px';
                    this.exhitionHeight=oWidth/(317/207) +'px';
                }
                console.log(this.exhitionWidth,this.exhitionHeight);
                this.resizeCharts();
            }catch(e){
                console.log('大屏2的window.onresize报错，随便catch一下')
                console.log(e);
            }
        },
        resizeCharts(){
            this.barHeight = document.getElementsByClassName('borderLayout2')[0].offsetHeight-12 + 'px';
            this.barWidth = document.getElementsByClassName('borderLayout2')[0].offsetWidth-30 + 'px';
            this.mixWidth = document.getElementsByClassName('borderLayout5')[0].offsetWidth + 'px';
            this.mixHeight = document.getElementsByClassName('borderLayout5')[0].offsetHeight - 20 + 'px';
            this.lesHeight = document.getElementsByClassName('borderLayout7')[0].offsetHeight-36 + 'px';
            this.lesWidth = document.getElementsByClassName('borderLayout7')[0].offsetWidth-12 + 'px';
            let clientWidth = document.documentElement.clientWidth;
            console.log(this.barHeight,this.barWidth,this.mixWidth,this.mixHeight);
            this.isBigScreen = clientWidth > 1800?true:false
        },
        //初始化表格
        initQueryTopExhibitor(value,index){
            publicInter(interfaceUrl.qryTopExhibitor,{hallno:value}).then(r=>{
                if(r){
                    for (let i=0; i < r.list.length;i++){
                        r.list[i].BOOTHN2 = r.list[i].BOOTHN.split(",")[0];
                    }
                    this.exdata = r.list;
                    //判断是否有参数传入，有的话，就是index，不然为0
                    if(this.exdata.length === '0'){
                        this.positionIndexShowEdit = {};
                        return;
                    }
                    index = index?index:0;
                    this.positionIndexShowEdit = this.exdata[index];
                }
            })
        },
        tabIntell(value,index){
            this.intellNum = index;
            this.$refs.rotateChild.tabIntell(value,index);
        },
        //图片的点击事件
        positionEx(index){
            var reg = /^[0-9]+$/;
            if (!reg.test(this.linkerImgs['floor'+this.floor][index].index)){
                console.log(this.linkerImgs['floor'+this.floor][index].pavilion);
                this.$refs.overChild.getOver(this.linkerImgs['floor'+this.floor][index].pavilion);
                if(parseFloat(this.linkerImgs['floor'+this.floor][index].left) > 50){
                    this.overPositionLeft = '10px';
                }
                else{
                    this.overPositionLeft = "52%"
                        // this.postionTop = parseFloat(this.linkerImgs['floor'+this.floor][index].top)+'%';
                }
                this.positionShow = false;
                this.numOverShow = true;
                this.positionIndex = 999;
                return;
            }
            this.numOverShow = false;
            this.searchShow = false;
            this.qryExhibitorForExpo = false;
            this.show98 = false;
            this.positionShow = true;
            this.positionShow2 = false;
            //当前的在地图上该是第几个
            //postion的位置的定位
            this.positionLeft = parseFloat(this.linkerImgs['floor'+this.floor][index].left)+'%';
            this.positionTop = parseFloat(this.linkerImgs['floor'+this.floor][index].top)+'%';
            //提单号那个框的距离上面的高度
            if(parseFloat(this.linkerImgs['floor'+this.floor][index].top) > 50){
                 this.postionTop = '10px';
            }
            else{
                this.postionTop = "52%"
                // this.postionTop = parseFloat(this.linkerImgs['floor'+this.floor][index].top)+'%';
            }
            this.positionIndex = this.linkerImgs['floor'+this.floor][index].index;
            this.currentPosition = this.linkerImgs['floor'+this.floor][index].pavilion;
            this.initQueryTopExhibitor(this.linkerImgs['floor'+this.floor][index].pavilion,this.positionIndex);
            this.flowShow = false;
        },
        //表格展位的点击事件
        clickToPosition(obj){
            debugger
            let index = obj.index,
                exhibition = obj.hallno,
                current = obj.current,
                rowIndex = obj.paramsIndex;
            //根据国家或展品大类点击事件
            this.positionShow = true;
            this.numOverShow = false;
            this.positionShow2 = false;
            this.currentPosition = exhibition;
            if(parseInt(exhibition) >8){
                return;
            }
            if(exhibition.indexOf(".2") !== -1){
                this.floor = "2";
            }
            else{
                this.floor = "1";
            }
            if(current == "TOPNUMBER" && !index){
                //topnumber是null的时候，就是其他的按钮显示
                if(this.floor === '2'){
                    if(parseInt(this.currentPosition) >= 7){
                        index = (parseInt(this.currentPosition) - 6)*13+10+parseInt(Math.random()*3);
                    }
                    else{
                        index = (parseInt(this.currentPosition) - 5)*13+10+parseInt(Math.random()*3);
                    }
                    
                }
                else{
                    index = (parseInt(this.currentPosition) - 1)*13+10+parseInt(Math.random()*3);
                }
                
            }
            else{
                if(this.floor === '2'){
                    if(parseInt(this.currentPosition) >= 7){
                        index = (parseInt(this.currentPosition) - 6)*13+index;
                    }
                    else{
                        index = (parseInt(this.currentPosition) - 5)*13+index;
                    }
                    
                }
                else{
                    index = (parseInt(this.currentPosition) - 1)*13+index;
                }
                
            }
            //控制中间小正方形的显示隐藏
            this.positionIndex = this.linkerImgs['floor'+this.floor][index].index;
            // if(current == "TOPNUMBER"){
            //     // 10*(this.exdataPage-1)
            //     this.positionIndex = 10*(this.exdataPage-1)+rowIndex;
            // }
            // else{
                
            // }  
            // if(current === 'TOPNUMBER'){
            //     this.positionIndexShowEdit = this.exdataAll[10*(this.exdataPage-1)+rowIndex];
            // }
            // else{
            //     this.positionIndexShowEdit = this.exdata[this.positionIndex];
            // }
            this.positionLeft = parseFloat(this.linkerImgs['floor'+this.floor][index].left)+'%';
            this.positionTop = parseFloat(this.linkerImgs['floor'+this.floor][index].top)+'%';
            // this.postionTop = parseFloat(this.linkerImgs['floor'+this.floor][index].top)+'%';
            //提单号那个框的距离上面的高度
            if(parseFloat(this.linkerImgs['floor'+this.floor][index].top) > 50){
                 this.postionTop = '-10px';
            }
            else{
                this.postionTop = '52%';
            }
            this.flowShow = false;
        },
        //跳转到全景展示
        routerToView(value){
            value = value.split("*01")[0];
            this.$router.push({
                name:'PanoramicDisplay',
                params:{
                    from:'dynamic',
                    billNo:value
                }
            })
        },
        //去掉中间界面的定位
        clearSelect(){
            this.positionShow = false;
            this.flowShow = false;
            this.positionIndex = 999;
            this.positionShow2 = false;
        },
        changeFloor(){
            this.positionShow = false;
            this.numOverShow = false;
            this.flowShow = false;
            this.positionIndex = 999;
            this.positionShow2 = false;
        },
        //获取提单
        getNumo(){
            let params={
                exhibitorid:this.positionIndexShowEdit.EXHIBITORID
            }
            publicInter(interfaceUrl.qryShippingByBillno,params).then(r=>{
                if (r){
                    let flag = false;
                    this.billNos = r.list;
                    this.positionShow2 = true;
                    this.selectBillNo = 0;
                    for(let i = 0; i < this.billNos.length;i++){
                        let billno = this.billNos[i].BILLNO;
                        if(billno.indexOf('COSU') != -1 || billno.indexOf('COAU') != -1 || billno.indexOf('COLU') != -1 || billno.indexOf('PASU') != -1){
                            this.cosco = true;
                            flag = true;
                            break;
                        }
                    }
                    if(!flag){
                        this.cosco = false;
                    }
                }
            })
        },
        //修改选中的billno
        changeSelectBillNo(index){
            this.selectBillNo = index;
            // this.flowShow = false;
        },
        //选中国家查询
        regionVal(val,countryCode){
            this.selectResult = val;
            if(this.selectResult === ""){
                return;
            }
            let params = {
                exhibitorcountry:countryCode
            } 
            publicInter(interfaceUrl.qryExhibitorByCountry,params).then(r=>{
                if (r){
                    // this.exdata = r.list;
                    this.show98Fun(r);
                }
            })
        },
        show98Fun(r){
            this.exdataNum = r.list.length;
            this.exdataAll = r.list;
            this.exdataPage = 1;
            this.exdata = this.exdataAll.slice(0,10)
            var floorArr = this.linkerImgs['floor1'].concat(this.linkerImgs['floor2']);
            this.show98 = true;
            for(var j = 0; j < floorArr.length;j++){
                floorArr[j].opacity = '0';
            }
            for(var i = 0; i < r.list.length;i++){
                if(r.list[i].TOPNUMBER){
                    for(var j = 0; j < floorArr.length;j++){
                        if(parseInt(r.list[i].TOPNUMBER)== floorArr[j].index+1 && r.list[i].HALLNO+"" == floorArr[j].pavilion){
                            floorArr[j].opacity = '0.98';
                            continue
                        }
                    }
                }
            }
        },
        webpage(value){
            this.exdataPage += value;
            if(this.exdataPage <=0 || (this.exdataPage-1)*10 >= this.exdataNum){
                this.exdataPage -= value;
                return;
            }
            this.exdata = this.exdataAll.slice(10*(this.exdataPage-1),10*this.exdataPage);
        },
        //右上角，当中间显示为展位前十位的展位
        positionSearchShow(){
            this.searchShow = true;
        },
        searchHide(){
            this.searchShow = false;
            this.show98 = false;
            this.selectResult = "";
            this.flowShow = false;
            this.numOverShow = false;
        },
        //国家he商品大类选择哪个查询（2019年10月8日，增加根据展商名称和展位号查询）
        selectSearchCondition(item){
            this.searchModel = item;
            this.searchCondition2 = false;
            this.itemTypeCondition={
                itemtype:"",
                pageNum:1,
                pageSize:10
            };
        },
        //后续流向监管
        qryExhibitorFlow(exhibitor){
            this.flowShow = true;
            this.$refs.flowChild.qryExhibitorFlow(exhibitor);
        },
        qryExhibitorByItemType(){
            // 根据展品大类查询展商信息
            if(this.searchModel.key === "itemType"){
                publicInter(interfaceUrl.qryExhibitorByItemType,this.itemTypeCondition).then(r=>{
                    if(r){
                        this.exdata = r.list;
                        this.show98Fun(r)
                    }
                })
            }
            //根据展商名称查询展商信息
            else if(this.searchModel.key === "name"){
                publicInter(interfaceUrl.qryExhibitorByName,{exhibitor:this.itemTypeCondition.itemtype}).then(r=>{
                    if(r){
                        this.exdata = r.list;
                        this.show98Fun(r)
                    }
                })
            }
            else if(this.searchModel.key ==='boothno'){
                publicInter(interfaceUrl.qryExhibitorByBoothNo,{boothno:this.itemTypeCondition.itemtype}).then(r=>{
                    if(r){
                        this.exdata = r.list;
                        this.show98Fun(r)
                    }
                })
            }
        },
        extypeFun(value){
            let result = value;
            switch(value){
                case "1":
                    result = "服务贸易展区";
                    break;
                case "2":
                    result = "汽车展区";
                    break;
                case "3":
                case '4.1':
                    result = "智能及高端装备展区";
                    break;
                case "4.2":
                    result = "虹桥国际贸易论坛";
                    break;
                case "5.1":
                    result = "消费电子及家电展区、服装服饰及日用消费品展区";
                    break;
                case "5.2":
                    result = "国家贸易投资综合展区";
                    break;
                case "6.1":
                    result = "服装服饰及日用消费品展区";
                    break;
                case "7.1":
                    result = "医药机械及医药保健展区";
                    break;
                case "7.2":
                case "8.2":
                    result = "食品及农产品展区";
                    break;
            }
            return result;
        },
        backToping1(){
            this.$router.push({
                name:'exhibitionMap'
            })
        },
        //显示直播窗口
        showVideo(value){
            // this.modal = true;
            // this.videoSrc='https://video.shangboost.com:8888/video/view/18100700'+value;
            this.pVideoUrl = "http://180.167.173.154/msj/token/18100700"+value;
            axios({
                method: 'GET',
                url: this.pVideoUrl
                }).then(r=>{
                if(r){
                    let req = r.data;
                    let arg = {
                        "userId": req.userId,
                        "sdkappid":req.sdkappid,
                        "userSig": req.userSig,
                        "privateMapKey":req.privateMapKey,
                        "accountType": req.accountType,
                        "closeLocalMedia": true,
                        "roomid": req.roomid
                    }
                    this.$refs.child.initRTC(arg);
                    this.myModal = true;
                }
            })
        },
        //ata和报关行的点击
        rowClick(params){
            let type =  params.FORMTYPE;
            //报关行的点击
            switch(type){
                case "报关单":
                    this.$refs.customChild.query(params.FORMID);
                    break;
                case "ATA":
                    let request2={
                        carnetNo:params.FORMID
                    }
                    publicInter(interfaceUrl.queryMaterialsAta,request2).then(r=>{
                        if(r){
                            if(r.code === '200'){
                                this.ATAHead = r.head[0];
                                this.dataATA = r.list;
                                this.ataModel = true;
                            }
                            else{
                                this.$Modal.error({content:r.data});
                            }
                        }
                    });
                    break;
                case "保税展示":
                    this.$refs.bondChild.query(params.FORMID);
                    break;
            }
        },
        closewin(value){
            this[value] = false;
        },
        openWin(value){
            this[value] = true;
        },
        openMyModal(value){
            this.myModal = value;
        },
        tabnew(key,index){
            this.num = index;
            this.$refs.lesChild.tabnew(key,index);
        },
        qryExpo(){   
            this.qryExhibitorForExpo = true;   
            console.log(this.$refs);
            this.$refs.qryChild.qryExpo();
            
        },
        //外链跳转
        routerA(url){
            if(url.indexOf("http") == -1){
                url = "http://"+url;
            }
            window.open(url)
        },
        showSearch2(){
            this.searchCondition2 = !this.searchCondition2;
        },
        //查询展位上的重点展位
        qryExhibitorCountForHallno(){
            this.ExhibitorCountShow = true;
            publicInter(interfaceUrl.qryExhibitorCountForHallno,{}).then(r=>{
                if(r){
                    this.exhibitorCountdata = r.list;
                }
            })
        },
        showEdit(params){
            this.goodsDetailShow = true;
            this.$refs.goodsChild.showDetail(params.UUID,params.EXHTYPE);
        },
        jumpRoute(){
            this.$router.push({ name: getRouterName()[0] });
        },
        //根据展台号获取具体信息
        qryExhibitorByBoothNo(boothno){
            publicInter(interfaceUrl.qryExhibitorByBoothNo,{boothno:boothno}).then(r=>{
                console.log(r);
                this.goodsDetailShow = false;
                this.positionShow = true;
                this.positionIndexShowEdit = r.list[0];
                this.positionLeft = '50%';
                this.positionTop = '50%';
                this.positionIndex = 999;
                this.postionTop = '70px';
            });
        }
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import '../../styles/mixin.scss';
    .frame{
        width: 100%;
        padding-bottom: 10px;
        color: #ffffff;
        font-size: 12px;
        font-family: Microsoft YaHei;
        .layoutDiv{
            display: inline-block;
            vertical-align: top;
            height: 100%;
            /*小标题*/
            .littleTitle{
                @include littleTitle;
                display: flex;
                justify-content: space-between;
                align-items: center;
                >span{
                    cursor: pointer;
                    font-size: 0.8rem;
                    color: rgb(255, 233, 26);
                }
            }
            .borderLayout{
                border:1px solid #0037B2;
                margin-bottom: 10px;
                position: relative;
                .tab{
                    text-align: center;
                    margin-top: 8px;
                    position: relative;
                    >span{
                        display: inline-block;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                        border: 1px solid #174CFF;
                        margin-left: -1px;
                        cursor: pointer;
                        font-size: 1.2rem;
                        padding: 0 12px;
                    }
                    >span.active{
                        background: #174CFF;
                    }
                }
                .tab1{
                    >span{
                        width: 20%;
                    }
                }
                #rotate{
                    width:280px;
                    height:220px;
                    margin-top: -10px;
                }
            }
            .borderLayout:before{
                width: calc(100% + 4px);
                height: 10px;
                content: '';
                position: absolute;
                left: -2px;
                top: -2px;
                background: linear-gradient(to left, #2773FF, #2773FF) left top no-repeat,
                linear-gradient(to bottom, #2773FF, #2773FF) left top no-repeat,
                linear-gradient(to left, #2773FF, #2773FF) right top no-repeat,
                linear-gradient(to bottom, #2773FF, #2773FF) right top no-repeat;
                background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
            }
            .borderLayout:after{
                width: calc(100% + 4px);
                height: 10px;
                content: '';
                position: absolute;
                left: -2px;
                bottom: -2px;
                background:linear-gradient(to left, #2773FF, #2773FF) left bottom no-repeat,
                linear-gradient(to bottom, #2773FF, #2773FF) left bottom no-repeat,
                linear-gradient(to left, #2773FF, #2773FF) right bottom no-repeat,
                linear-gradient(to left, #2773FF, #2773FF) right bottom no-repeat;
                background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px;
            }
        }
        .layoutDiv:before{
            position: absolute;
        }
        .layoutDivFirst{
            width: 26.5rem;
            padding-left: 21px;
            >div{
                position: relative;
                //运输方式的图标
                
                
            }
        }
        .layoutDivSecond{
            width: calc(100% - 59rem);
            position: relative;
            
            .positionUnitDivF{
                position: absolute;
                left: 50%;
                top: 170px;
                /*<!--margin-left: -300px;-->*/
                transform: translate(-50%,0);
                font-size: 1.1rem;
                white-space: nowrap;
                z-index: 1;
                height:20rem;
                .positionUnitDiv{
                    display: inline-block;
                    background: #090D39;
                    border: 1px solid #002499;
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.86);
                    padding: 20px;
                    line-height: 1.8rem;
                    vertical-align: top;
                    a{
                        color: #FFDE1D;
                    }
                    .positionUnitTitle{
                        width: 6rem;
                        text-align: left;
                        color: #1DEAFF;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .positionUnitContent{
                        width: 10rem;
                        display: inline-block;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                        overflow: hidden;
                        a{
                            color: #FFE91A;
                            text-decoration: underline;
                        }
                    }
                    .positionUnitDiv2{
                        width: 12rem;
                        height: 100%;
                        text-align: center;
                        display: inline-block;
                        vertical-align: top;
                        background: #0C2A66;
                        >span{
                            display: inline-block;
                            width: 126px;
                            height: 30px;
                            background: #1D429E;
                            img{
                                cursor: pointer;
                                display: inline-block;
                                vertical-align: middle;
                                height: 30px;
                                margin-right: 10px;
                            }
                            >span{
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }

                        >div{
                            height: calc(100% - 40px);
                            overflow-y: auto;
                            overflow-x: hidden;
                            li{

                                list-style: none;
                                border-bottom: 1px solid #1A4282;
                                line-height: 2.5rem;
                                cursor: pointer;
                            }
                            li.selectBillNo{
                                color: #FFE91A ;
                            }
                        }
                    }
                    .positionUnitDiv3{
                        display: inline-flex;
                        position: relative;
                        padding-left: 20px;
                        flex-flow: column;
                        justify-content: space-between;
                        height: 100%;
                        li{
                            list-style: none;
                            border-left: 1px solid #ffffff;
                            position: relative;
                            padding-bottom: 10px;
                            display: inline-flex;
                            flex-flow: column;
                            justify-content: space-between;
                            height: 34%;
                            p{
                                padding-left: 1rem;;
                                a{
                                    color: #FFDE1D;
                                    padding-left: 4px;
                                }
                            }
                        }
                        li:after{
                            width: 0.6rem;
                            height: 0.6rem;
                            border-radius: 50%;
                            background: #fff;
                            border:3px solid #fff;
                            position: absolute;
                            transform: translateY(0.1rem);
                            left: -0.3rem;
                            content: '';
                        }
                        li:before{
                            width: 1.2rem;
                            height: 1.2rem;
                            border-radius: 50%;
                            background: #000;
                            border:1px solid #fff;
                            position: absolute;
                            left: -0.6rem;
                            content: '';
                        }

                    }
                }
                .positionUnitDivF1{
                    width: 18rem;
                    height: 100%;
                    display: inline-flex;
                    flex-flow: column;
                    justify-content: space-between;
                }
                .positionUnitDivF2{
                    width: 34rem;
                    height: 100%;
                }
            }
            .sipgshow{
                position: absolute;
                top: 0;
                left: 10px;
                border: 1px solid #0037B2;
                width: 380px;
                height: 200px;
                padding: 10px;
                font-size: 12px;
                background: rgba($color: #090D39, $alpha: 0.8);
                
                >span{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    cursor: pointer;
                }  
            }
        }
        .layoutDivThird{
            width: 30rem;
            margin-right: 21px;
        }
        .borderLayout1,.borderLayout2{
            width: 100%;
            height: calc(50% - 135px);
            .screen{
                width: 100%;
                height: 100%;
                overflow: hidden;
                .flowSlider{
                    width: 200%;
                    display: flex;
                    transition: all 1s ease-in-out;
                    &.realFlow{
                        transform: translate(-50%,0);
                    }
                    >div{
                        width: 50%;
                    }

                }


            }
        }
        .borderLayout3{
            height: 250px;
        }
        .borderLayout4{
            width: calc(100% - 40px);
            height: calc(100% - 270px);
            position: relative;
            margin-bottom: 20px;
            margin-left: 20px;
            margin-right: 20px;
            .currentSelectPosition{
                position: absolute;
                right: 0;
                bottom: -8px;
                >span{
                    font-size: 1rem;
                    color: #ffffff;
                }

            }
            .cameraJpg{
                font-size:1.5rem;
                cursor:pointer;
                position:absolute;
                bottom:-8px;
                width:20px;
            }
        }
        .borderLayout5{
            width: 100%;
            height: 250px;
         }
        .borderLayout6{
            width: 100%;
            height: calc(100% - 332px);
            padding: 0 10px;
            .myHideIcon{
                opacity: 0;
            }
            .myHideIcon:hover{
                opacity: 1;
            }
            
        }
        .borderLayout7{
            width: 100%;
            height: 322px;
        }
        //根据国家还是商品大类查询的样式
        .searchCondition{
            display: inline-block;
            >span{
                width: 90px;
                height: 26px;
                cursor: pointer;
                line-height: 26px;
                display: inline-block;
                position: relative;
                border-right: 1px #0037B2 solid;
                margin-top: 8px;
                .ivu-icon{
                    position: absolute;
                    right: 8px;
                    transform: translate(0,-6px);
                    top: 50%;
                }
            }
            ul{
                list-style: none;
                position: absolute;
                width: 124px;
                height: 156px;
                z-index: 20;
                padding: 10px 0;
                background: #2760C2;
                li{
                    cursor: pointer;
                    padding-left: 14px;
                    height: 36px;
                    line-height: 36px;
                }
                li.selectSearch{
                    background: #1C4691;
                }
            }
        }
        //分页的样式
        .breakPage{
           @include breakPage;
        }
        .littleTitle2{
            font-size: 16px;
        }
        .ulkuang{
            width: 140px;
            height: 150px;
            list-style: none;
            background: #2760C2;
            padding-top: 8px;
            color: #fff;
            .selectSearch{
                background: #1C4691;
            }
            li{
                height: 34px;
                text-align: left;
                padding-left: 12px;
                line-height: 34px;
                cursor: pointer;
            }
        }

        .frameTable{
            height: calc(100% - 48px);overflow-y: auto;width: 100%;position:relative;
        }
    }

    .map-warrap{
        width: 100%;
        background: #090D39;
        height: 100vh;
        .warrap-header{
            height: 10vh;
            line-height: 10vh;
            position: relative;
            text-align: center;
            background: url('../../assets/exhibitionHead.png') no-repeat 50% 0;
            background-size: 100%;
            >span{
                position: absolute;
                left: 30px;
                height: 10vh;
                line-height: 64px;
                cursor: pointer;
                top: 0;
                img{
                    width: 120px;
                    vertical-align: middle;
                    margin: -3px 5px 0 0;
                    height: 30px;
                }
            }
            h3.right{
                position: absolute;
                // height: 64px;
                // line-height: 64px;
                top: 0;
                right: 30px;
                img{
                    width: 180px;
                    height: 24px;
                    margin-top: 17px;
                    line-height: 64px;
                }

            }
            h3.center{
                font-size: 28px;
                padding-top: 10px;
                height: 11vh;
                // line-height: 20px;
                span{
                    display: block;
                    width: 300px;
                    margin: 0 auto;
                    text-align: center;
                    font-size: 18px;
                    color: #26CAEF;
                    line-height: 18px;
                }
            }

        }
        .warrap-body{
            background: #090D39;
            height: 85vh;
            position: relative;
            .backToTheFirstPage{
                width: 60px;
                height: 100px;
                position:absolute;
                left:20px;
                top:50%;
                transform: translateY(-50px);
                // border: 2px solid #2773FF;
                opacity: 0;
                text-align: center;
                
                border-radius: 50%;
                >.ivu-icon-ios-arrow-back{
                    font-size: 3rem;
                    cursor: pointer;              
                    color:#2773FF;
                    line-height: 60px;
                }
            }
            .backToTheFirstPage:hover{
                opacity: 1;
            }
            
        }
        .warrp-footer{
            background: #090D39;
            width: 100%;
            height: 5vh;
            line-height: 5vh;
            text-align: center;
            vertical-align: top;
            font-size: 16px;
        }

    }
</style>
<style scoped rel="stylesheet/css">
    @media screen and (min-width: 1800px) {
        html{
            font-size: 16px;
        }
        body{
            background: #fff;
        }
        .frame{
            font-size: 14px;
        }

        .frame .layoutDiv .borderLayout{
            font-size: 16px;
        }

        .map-warrap .warrap-header h3.center{
            padding-top: 20px;
        }

        .frame .borderLayout1{
            height: calc(50% - 178px)
        }
        .frame .borderLayout2{
            height: calc(50% - 178px)
        }
        .frame  .borderLayout3{
            height: 336px;
        }
        .frame  .borderLayout4{
            height: calc(100% - 376px);
            margin-bottom: 40px;
        }
        .frame  .borderLayout5{
            height: 336px;
        }

        .frame .borderLayout6{
            height: calc(100% - 418px);
        }
        .frame .borderLayout7{
            height: 408px
        }

        .frame .layoutDiv .borderLayout #rotate{
            width: 360px;
            height: 336px;
            margin-top: -20px;
        }
        .frame .layoutDivSecond .positionUnitDivF .positionUnitDiv .positionUnitDiv3 li[data-v-1f0615a6]:before{
            top: 9px;
        }
        .frame .layoutDivSecond .positionUnitDivF .positionUnitDiv .positionUnitDiv3 li[data-v-1f0615a6]:after{
            top: 12px;
        }

        .frame .littleTitle2{
            font-size: 20px;
        }

        .frame .layoutDivSecond .sipgshow{
            width: 560px;
            height: 272px;
            font-size: 14px;
            padding: 20px;
        }
    }
</style>