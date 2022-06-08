<template>
    <div class="map-contanier">
        <div class="header">
          <div class="years">
              <ul>
                  <li style="margin-top:5px;">
                      <span class="sp1"></span>
                      <p v-if="!previousYear">基期年份</p>
                      <p v-else>{{previousYear}}</p>
                  </li>
                   <li>
                      <span class="sp2"></span>
                      <p>{{currentYear}}</p>
                  </li>
              </ul>
          </div>
          <div class="contrast"> 
              <div class="contrastLeft">
                   <Select class="customSelectt"
                    v-model="previousYear"
                    placeholder='请选择年份' style="width:120px;margin-top:-5px;" >
                     <Option v-for="(item,index) in YearList" :value="item.YEAR" :key="index">{{ item.YEAR }}</Option>
                 </Select>
              </div>
              VS
              <div class="contrastMid">
                   <Select class="customSelectt" v-model="currentYear" placeholder='请选择年份' style="width:120px;margin-top:-5px;" >
                    <Option v-for="(item,index) in YearList" :value="item.YEAR" :key="index">{{ item.YEAR }}</Option>
                 </Select>
              </div>
              <div class="contrastRight" @click="compare">
                  比  对
              </div>
          </div>
          <div class="lenged">
              <ul>
                <li >
                  <span class="sp1"></span>
                  <p>前届未参展本届参展国家/地区</p>
                </li>
                <li>
                     <span class="sp2"></span>
                     <p style="font-size:10px;">前届参展本届未参展国家/地区</p>
                </li>
                <li>
                     <span class="sp3"></span>
                     <p>两届均参展国家/地区</p>
                </li>
              </ul>
          </div>
        </div>
        <div class="threeLenged">
              <span @click="allclicKThree">{{showBtnAllTitle}}</span>
              <span @click="notThree">{{showBtnNotTitle}}</span>
          </div>
        <div class="map-footer">
            <div class="f_left">
               <ul>
                   <li @click="showNewContry">
                       <img src="../img/legend-icon-add.png" alt="">
                       <p>{{newCountry.length}}</p>
                   </li>
                   <li @click="showNotCountry">
                        <img src="../img/legend-icon-decrease.png" alt="">
                        <p>{{NotCountry.length}}</p>
                   </li>
                   <li @click="showAllCountery">
                       <img src="../img/legend-icon-nation.png" alt="">
                       <p>{{AllCountry.length}}</p>
                   </li>
               </ul>
            </div>
            <div v-show="getViewState[0]" class="f_right">
                <ul class="area">
                    <li v-for="ele in area" :key='ele.id' :class="{'active':ele.isActive}" @click="clickArea(ele.key)">{{ele.name}}</li>
                </ul>
            </div>
        </div>
         <div id='chart' style="width:100%;height:90%;margin-top:-20px" ></div>     <!--地图显示容器-->
       <!--国家弹出框-->
      <Modal v-model="showNewlist"
           width="220"
          :footer-hide = true
           class="forbidBodyNormal"
          :styles="{top:'500px',left:'-350px'}"
        >
        <p slot="header" style="color:#fff;font-size:10px">
            <span>前届未参展本届参展国家/地区</span>
        </p>
        <div style="text-align:center" class="modalwrap">
                <li v-if="newCountry.length == 0">暂无数据</li>
                <li v-else v-for="(item,index) in newCountry" :key="index">{{item.CNNAME}}</li>
        </div>
      </Modal>

     <Modal v-model="showNotlist"
           width="230"
          :footer-hide = true
           class="NotCountry"
          :styles="{top:'500px',left:'-250px'}"
        >
        <p slot="header" style="color:#fff;font-size:10px">
            <span>前届参展本届未参展国家/地区</span>
        </p>
        <div style="text-align:center" class="modalwrap">
                <li v-if="NotCountry.length == 0">暂无数据</li>
                <li v-else v-for="(item,index) in NotCountry" :key="index">{{item.CNNAME}}</li>
        </div>
     </Modal>

     <Modal v-model="showAlllist"
           width="220"
          :footer-hide = true
           class="AllCountry"
          :styles="{top:'500px',left:'-150px'}"
       >
        <p slot="header" style="color:#fff;font-size:10px">
            <span>两届均参展国家/地区</span>
        </p>
        <div style="text-align:center" class="modalwrap">
                <li v-if="AllCountry.length == 0">暂无数据</li>
                <li v-else v-for="(item,index) in AllCountry" :key="index">{{item.CNNAME}}</li>
        </div>
    </Modal>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts');
import axios from "axios";
import regionTable from '@/until/corresponding'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import {getCookie} from "@/until/getToken";

import {mapGetters,mapActions,mapMutations} from 'vuex'

const processLng=lng=>{
    return lng>-30?lng-180:lng+180;
}
const processLngGe=lng=>{
    return lng+180;
}
export default {
    computed:{
        ...mapGetters('newComputed', [
            'getViewState',
        ])
    },
    data(){
        return{
            //三年都来国家
            allThreeYear:[],
            notThreeYear:[],
            //新参展国家
            showNewlist:false,
            newCountry:[],
            
            newDataCountry:[],

            //未参展国家
            showNotlist:false,
            NotCountry:[],
            notDataCountry:[],

            //全部国家
            showAlllist:false,
            AllCountry:[],
            allDataCountry:[],

            //国家馆信息
            allGJG:[],
            notGJG:[],
            newGJG:[],

            
           

            //年份选择框部分
            YearList: [],
            previousYear:getCookie("date") == '2018'?'':JSON.stringify(JSON.parse(getCookie("date")) - 1),
            currentYear:getCookie("date"),
            regionCountry:{
                //全球
                GLB:[],
                //亚洲
                AS:[],
                //非洲
                AF:[],
                //南美
                SA:[],
                // 北美
                NA:[],
                //欧洲
                EU:[],
                //大洋洲
                OC:[],
                //一带一路,
                B$R:[],
                C$E:[],
            },
            showType: false,
            options:{ 
                tooltip : {
                    trigger: 'item',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    show:true,
                    padding:16,
                    showContent:true,
                    transitionDuration: 0,
                    extraCssText: 'z-index:100',
                },
                series: [
                    {
                        type: 'map',
                        map: 'worldMap',
                        zoom:'1.2',
                        roam:true,
                        label:{
                            emphasis:{
                                show:true,
                                color:'rgba(0,0,0,0)',
                            }
                        },
                        itemStyle:{
                            normal:{
                                borderColor: '#0078AD',
                                color:'#fff',
                                borderWidth:1.1,
                                areaColor: '#002F99',
                            },
                            emphasis:{
                                // areaColor:'#FFDE1D',
                                areaColor:'#FFDE1D',
                                color:'#fff',
                            }
                        },
                        data:[],
                        tooltip:{
                            show:true,
                            formatter:function(params){
                                if(params.data){
                                  return params.data.nameCh
                                }
                            }
                        }
                    },
                ],
                
            },
            goodsType:[],
            charts:'',
            area:[
                {
                    isActive:false,
                    name:'全球',
                    key:'GLB'
                },
                {
                    isActive:false,
                    name:'亚洲',
                    key:'AS'
                },
                {
                    isActive:false,
                    name:'欧洲',
                    key:'EU'
                },
                {
                    isActive:false,
                    name:'南美洲',
                    key:'SA'
                },
                {
                    isActive:false,
                    name:'北美洲',
                    key:'NA'
                },
                {
                    isActive:false,
                    name:'大洋洲',
                    key:'OC'
                },
                {
                    isActive:false,
                    name:'非洲',
                    key:'AF'
                },
                {
                    isActive:false,
                    name:'国家馆',
                    key:'C$E'
                },
                {
                    isActive:false,
                    name:'一带一路国家/地区',
                    key:'B$R'
                },
                

            ],
            timer:null,
            counter:0,
            showBtnAllTitle:'',
            showBtnNotTitle:''
        }
    },
    mounted(){
        //对比两年的初始化页面
        // this.getNewRegionData(this.currentYear);
        // this.getNewGaugeData(this.currentYear);
        // this.getOldRegionData(this.previousYear);
        // this.getOldGaugeData(this.previousYear);

        var echartsBox=document.getElementById('chart');
        this.charts=echarts.init(echartsBox);
        this.getcountry();
        this.getSelfMap();
        this.mapEvent();
        this.queryYear();
        // this.initMap();
        this.initData()
        this.showBtnAllTitle = getCookie('date') =='2019'? '两年都来':'三年都来'
        this.showBtnNotTitle = getCookie('date') =='2019'? '两年都未来':'三年都未来'
    },
    methods:{
        //三年都来国家
        allclicKThree(){
            let _this = this
            let newArr = []
            let nowYear = getCookie('date')
            let requsetData ={}
            if(nowYear == '2019'){
                requsetData ={
                    years:'2018,2019'
               }
            }else{
                  requsetData ={
                   years:'2018,2019,2020'
               }
            }

            _this.clearMap()
             publicInter(interfaceUrl.qryPartakeCountryByYear,requsetData).then(r=>{
                 var data=[];
                if(nowYear == '2019'){
                    newArr =  r.list.filter((item)=> item.NUM == 2)
                }else{
                    newArr =  r.list.filter((item)=> item.NUM == 3)
                }
                let objParams = {
                    newArr,
                    date:nowYear
                }
                 _this.$emit('allthree',objParams)
                  regionTable.forEach((item,i)=>{
                    newArr.forEach((ele)=>{
                        if(item.value == ele.CODE){
                            data.push({
                                name:item.name,
                                value:item.value,
                                selected:true,
                                nameCh:item.nameCH,
                                emphasis:{
                                    itemStyle:{
                                        areaColor:'#9CC3FF'
                                    }
                                }
                            })
                        }
                    })
                })

               _this.setMapOptionData(data)
               
             })
        },
        //三年都未来
        notThree(){
            let _this = this
            let newArr = []
            let nowYear = getCookie('date')
            let requsetData ={}
            if(nowYear == '2019'){
                requsetData ={
                    years:'2018,2019'
               }
            }else{
                  requsetData ={
                   years:'2018,2019,2020'
               }
            }

             _this.clearMap()
             publicInter(interfaceUrl.qryPartakeCountryByYear,requsetData).then(r=>{
                 var data=[];
                    newArr =  r.list.filter((item)=> item.NUM == 0)
                let objParams = {
                    newArr,
                    date:nowYear
                }
                _this.$emit('allthree',objParams)
                  regionTable.forEach((item,i)=>{
                    newArr.forEach((ele)=>{
                        if(item.value == ele.CODE){
                            data.push({
                                name:item.name,
                                value:item.value,
                                selected:true,
                                nameCh:item.nameCH,
                                emphasis:{
                                    itemStyle:{
                                        areaColor:'#FF3063'
                                    }
                                }
                            })
                        }
                    })
                })

               _this.setMapOptionData(data)
             })
              
        },
        initData(){
            this.getNewRegionData(this.currentYear);
            this.getNewGaugeData(this.currentYear);
            this.getOldRegionData(this.previousYear);
            this.getOldGaugeData(this.previousYear);
            this.area.forEach(item=>{
                    item.isActive=false
                })
                let data={
                    foreYear:this.previousYear,
                    hindYear:this.currentYear
                }
                publicInter(interfaceUrl.queryRegionalGroupingBy2CheckedYears,data).then(r=>{
                    this.AllCountry = r.bothExistList //全部参加
                    this.allDataCountry = r.bothExistList
                    this.NotCountry = r.decreaseList  //未参加
                    this.notDataCountry = r.decreaseList
                    this.newCountry = r.increaseList  //新增
                    this.newDataCountry = r.increaseList
                    this.allGJG = r.bothExistListGJG
                    this.notGJG = r.decreaseListGJG
                    this.newGJG = r.increaseListGJG

                    setTimeout(() => {
                        this.clickArea('GLB');
                        }, 500);
                });
                
                
        },
        //年份对比
        compare(){
            this.$emit('toggleLeft',true)
            if(this.previousYear === this.currentYear){
             this.$Message.error({
                content:"无法对比相同年份！！",
                duration: 3
            })
             return false
            }else{
                //初始化数据
                this.clickArea('GLB')
                this.initData()
           }
            
                
        },
       
        //查询当前年
         queryYear(){
            publicInter(interfaceUrl.queryExpoYears,{}).then(r=>{
                 this.YearList = r.msg
            });
        },
         
        //显示新参展国家列表
        showNewContry(){
            this.showNewlist = true
        },
        showNotCountry(){
            this.showNotlist = true
        },
        showAllCountery(){
            this.showAlllist = true
        },
         ...mapMutations('newComputed',[
            'viewChange',
            'changeSelected',
        ]),
        ...mapActions("newComputed", [
            "getNewRegionData",
            "getNewGaugeData",
        ]),

        ...mapMutations('oldComputed',[
            'oldChangeSelected',
        ]),
        ...mapActions("oldComputed", [
            "getOldRegionData",
            "getOldGaugeData",
        ]),
        
        clickShowType() {
            this.clearMap()
            this.showType = false;
        },
        /**
         *切换视图 
         */
        switchView (state,reset) {
            this.viewChange(state)
            if(reset){
                let code=this.$store.state.exhibitionStore.selectedRegion
                this.clearMap();
            }
        },
        /**
         *获得地图option.data
         */
        getMapOptionData(){
            return this.options.series[0]['data'];
        },
        getSelfMap(){
            let that=this;
            axios.get('/world.json').then(res=>{
                let worldMap=res.data;
                worldMap.features.map(district => {
                    if (district.properties.name == 'Greenland') {
                        if (district.geometry.type == 'Polygon') {
                                district.geometry.coordinates.map(border => {
                                    border.map(coord => {
                                        coord[0] = processLngGe(coord[0])
                                    })
                        })
                        } else {
                            district.geometry.coordinates.map(border => {
                                border.map(coordinates => {
                                    coordinates.map(coord => {
                                        coord[0] = processLngGe(coord[0])
                                    })
                                })
                            })
                        }
                    } else {
                        if (district.geometry.type == 'Polygon') {
                            district.geometry.coordinates.map(border => {
                                border.map(coord => {
                                    coord[0] = processLng(coord[0])

                                })
                            })
                        } else {
                            district.geometry.coordinates.map(border => {
                                border.map(coordinates => {
                                    coordinates.map(coord => {
                                        coord[0] = processLng(coord[0])
                                    })
                                })
                            })
                        }
                    }
                })
                echarts.registerMap('worldMap',worldMap);
                that.initMap();
            })

        },
        /**
         * 设置地图option.data
         */
        setMapOptionData(data){
            this.options.series[0]['data']=data;
            this.charts.setOption(this.options,true);
        },

         setMapOptionData2(data){
            this.options.series[1]['data']=data;
            this.charts.setOption(this.options,true);
        },
        /**
         * 获取各个区域有哪些国家
        */
        getcountry(){
            var dataKey=[
                {key:'listFeiZhou',value:'AF'},
                {key:'listBeiMei',value:'NA'},
                {key:'listDaYangZhou',value:'OC'},
                {key:'listNanMei',value:'SA'},
                {key:'listOuZhou',value:'EU'},
                {key:'listYaZhou',value:'AS'},
                {key:'listYiDaiYiLu',value:'B$R'},
                {key:'listGuoJiaGuan',value:'C$E'},
                {key:'listQuanQiu',value:'GLB'},
                ]
            publicInter(interfaceUrl.getCounInfoByParam,{}).then(r=>{
                // console.log(r)
                if(r.code==='200'){
                    dataKey.forEach(item=>{
                        r[item.key].forEach(val=>{
                            var arr=this.regionCountry[item.value]
                            arr.push(val.CODE)
                        })
                    }) 
                }
            })
        },
        /**
         * 初始化地图
        */
        initMap(){
            var data=[],color=['#9CC3FF','#FF3063','#FFDE1D']
            regionTable.forEach((item,i)=>{
                //0全部国家，1减少国家，2新增国家
                var areaColorFlag=this.allDataCountry.some(ele=>ele.COUNTRY==item.value)?0:this.notDataCountry.some(ele=>ele.COUNTRY==item.value)?1:2;
                data.push({
                    name:item.name,
                    value:item.value,
                    selected:false,
                    nameCh:item.nameCH,
                    emphasis:{
                        itemStyle:{
                            areaColor:color[areaColorFlag]
                        }
                    }
                })
            })
            console.log(data)
            this.setMapOptionData(data)
        },

        initGJG(){
            var data=[],color=['#9CC3FF','#FF3063','#FFDE1D']
            regionTable.forEach((item,i)=>{
                //0全部国家，1减少国家，2新增国家
                var areaColorFlag=this.allGJG.some(ele=>ele.COUNTRY==item.value)?0:this.notGJG.some(ele=>ele.COUNTRY==item.value)?1:2;
                data.push({
                    name:item.name,
                    value:item.value,
                    selected:false,
                    nameCh:item.nameCH,
                    emphasis:{
                        itemStyle:{
                            areaColor:color[areaColorFlag]
                        }
                    }
                })
            })
            this.setMapOptionData(data)
        },
        /**
         * 给地图添加事件绑定
        */
        mapEvent(){
            const _this=this;
            
            this.charts.on('click',function(params){
                 _this.clearMap();
                let data=_this.getMapOptionData();
                let newvalue = params.value 
                data.forEach(item=>{
                    if(item.value === newvalue){
                        item['selected']=true
                    }else{
                        item['selected']=false
                    }
                })
              
                _this.area.forEach(item=>{
                    item.isActive=false
                })
                 _this.$emit('toggleLeft',true)
                _this.changeSelected(newvalue);
                _this.oldChangeSelected(newvalue)
                _this.setMapOptionData(data)
            })
            this.charts.on('mouseover',function(params){
                clearInterval(_this.timer)
                _this.timer=null;
            })
            this.charts.on('globalout',function(params){
                _this.ligthRegionFun([],true)
            })

        },
        /**
         * 清楚地图上的高亮区域，清除定时器，tooltip变成不显示
        */
        clearMap(){
            clearInterval(this.timer)
            this.timer=null;
            this.counter=0
            this.options.tooltip.show=false
            this.initMap();

        },

        getArrayProps(array, key) {
                var key = key || "value";
                var res = [];
                if (array) {
                    array.forEach(function(t) {
                        res.push(t[key]);
                    });
                }
                return res;
            },
         // CONTINENT
        clickArea(key){    //点击每一个大洲的函数
            this.$emit('toggleLeft',true)
            if(key =='GLB'){
                this.newCountry = this.newDataCountry
                this.NotCountry = this.notDataCountry
                this.AllCountry = this.allDataCountry
                // this.getNewRegionData(this.currentYear);
                // this.getOldRegionData(this.previousYear);
                // this.getNewGaugeData(this.currentYear);
                // this.getOldGaugeData(this.previousYear);
                // this.initData()

            }else if(key =='C$E'){
                this.newCountry = this.newGJG
                this.NotCountry = this.notGJG
                this.AllCountry = this.allGJG

                this.changeSelected(key); //当前年
                this.oldChangeSelected(key) //前一年
                clearInterval(this.timer)
                this.timer=null;
                this.initGJG();
                var data=this.getMapOptionData()
                data.forEach(item=>{
                    [...this.AllCountry,...this.NotCountry,...this.newCountry].forEach(ele=>{
                        if(ele.COUNTRY == item.value){
                            item.selected = true
                        }
                    })
                })
            this.setMapOptionData(data)

            this.area.forEach(item=>{
                if(item.key===key){
                    item.isActive=true
                }else{
                    item.isActive=false
                }
            })
            return false

            }else if(key =='B$R'){
                this.newCountry = this.newDataCountry.filter(item => item.BR =='Y')
                this.NotCountry = this.notDataCountry.filter(item => item.BR =='Y')
                this.AllCountry = this.allDataCountry.filter(item => item.BR =='Y')
            }
            else{
                this.newCountry = this.newDataCountry.filter(item => item.CONTINENT == key)
                this.NotCountry = this.notDataCountry.filter(item => item.CONTINENT == key)
                this.AllCountry = this.allDataCountry.filter(item => item.CONTINENT == key)
            }

            this.changeSelected(key); //当前年
            this.oldChangeSelected(key) //前一年
            clearInterval(this.timer)
            this.timer=null;
            this.initMap();
            var data=this.getMapOptionData()
            //循环
            data.forEach(item=>{
                [...this.AllCountry,...this.NotCountry,...this.newCountry].forEach(ele=>{
                    if(ele.COUNTRY == item.value){
                        item.selected = true
                    }
                })
            })
            this.setMapOptionData(data)

            this.area.forEach(item=>{
                if(item.key===key){
                    item.isActive=true
                }else{
                    item.isActive=false
                }
            })
        },
        
        ligthRegionFun(arr,isLast){
            var showData=[];
            if(!isLast){
                showData=arr
            }else{
                showData=this.getMapOptionData();
            }
            if(showData.length<=0){return false}
            const that = this
            this.initMap();
            this.options.tooltip.show=true
            this.setMapOptionData(showData)
        },

    },
}
</script>
<style lang="scss" scoped>
.map-contanier{
    width: 100%;
    height: 100%;
    position: relative;
    background: url('../../../../../assets/mapbg.png')  no-repeat;
    background-size: 100% 100%;
    .header{
        display: flex;
        z-index: 10;
        .years{
         width: 174px;
         height: 80px;
         border-right: 1.5px solid #1041A5;
         border-bottom: 1.5px solid #1041A5;
         li{
             height: 30px;
             width: 100%;
             display: flex;
             line-height: 30px;
             margin-bottom: 5px;
             span{
                 display: inline-block;
                 width: 40px;
                 height: 20px;
                 margin-left: 25px;
                 margin-top: 5px;
             }
             .sp1{
               background: linear-gradient(to right, #08206B 0%,#103094 60%,#1859EF 100%)
             }
             .sp2{
               background: linear-gradient(to right, #4A4129 0%,#B59621 60%,#FFEB18 100%)
             }
             p{
                 font-size: 15px;
                 color: #fff;
                 margin-left: 15px;
             }
         }
        }
        .contrast{
            z-index: 999;
            display: flex;
            width: 500px;
            height: 45px;
            font-size: 24px;
            line-height: 45px;
            color: #fff;
            margin-top: 18px;
            margin-left: 40px;
            .contrastLeft{
                width: 140px;
                margin-right: 20px;
                background: url('../img/btn-selectyear-base.png') no-repeat;
                background-size: 100%;
            }
            .contrastMid{
                width: 140px;
                margin-left: 20px;
                background: url('../img/btn-selectyear-current.png') no-repeat;
                background-size: 100%;
            }
            .contrastRight{
                cursor: pointer;
                font-size: 18px;
                width: 100px;
                font-weight: bold;
                margin-left: 20px;
                background: url('../img/btn-comparison.png') no-repeat;
                background-size: 100%;
            }
        }
        .lenged{
            height: 81px;
            width: 160px;
            margin-left: -15px;
            ul{
                li{
                    display: flex;
                    // justify-content: space-around;
                    width: 140px;
                    width: 100%;
                    line-height: 24px;
                    p{
                        font-size: 10px;
                        color: #fff;
                        text-align: left;
                    }
                    span{
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        // line-height: 27px;
                        margin-top: 5px;
                        margin-right: 10px;
                    }
                    .sp1{
                        background-color: #FFD318;
                    }
                    .sp2{
                        background-color: #FF3063;
                    }
                    .sp3{
                        background-color: #9CC3FF;
                        // margin-left: -5px;
                    }
                }
            }
        }
    }
    .threeLenged{
       position: absolute;
       top: 230px;
       right: 10px;
       width: 100px;
       height: 100px;
       z-index: 999;
       span{
           display: block;
           height: 30px;
           width: 100%;
           background-color: rgba(24, 101, 247, .4);
           line-height: 30px;;
           margin-bottom: 10px;
           color: #fff;
       }
       span:hover{
           background-color: #18EBFF;
           cursor: pointer;
       }
    }
    .map-footer{
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1% 1%;
        width: 100%;
        height: 110px;
        z-index: 10;
        .f_left{
            width: 40%;
            height: 100%;
            background: url('../img/legend-bg.png')  no-repeat;
            background-size: 100% 100%;
            margin-right: 20px;
            ul{
             display: flex;
                li{
                    position: relative;
                    display: flex;
                    width: 50px;
                    margin: auto;
                    cursor: pointer;
                    img{
                        position:absolute;
                        top: 0;
                        left:15px;
                        width: 30px;
                        height: 30px;
                    }
                    p{
                        position: absolute;
                        top: -2px;
                        left: 40px;
                        color:#fff;
                        font-size: 24px;
                        margin-left: 10px;
                    }
               }
            }
        }
        .f_right{
            width: 60%;
            height: 100%;
            ul{
                li{ 
                list-style: none;
                cursor: pointer;
                float: left;
                font-size: 18px;
                color: #fff;
                padding: .3rem .8rem;
                margin-left: 10px;
                margin-bottom: 10px;
                background: url('../../../../../assets/sandbarD.png') 100% 100% no-repeat;
                background-size: cover;
                 &.active,&:hover{
                    color: #000;
                    background: url('../../../../../assets/sandbarH.png') 100% 100% no-repeat;  
                }
            }
            }
        }
        .top{
            display: flex;
            width: 100%;
            margin-top: 1rem;
            justify-content: flex-start;
            align-items: center;
            padding: .5rem 0;
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
             >div.slider{
                width: calc(100% - 21rem);
                overflow: hidden;
                ul{
                    display: flex;
                    flex-wrap: nowrap;
                    // width: 176rem;
                    list-style: none;
                    align-items: center;
                    margin: 0;
                    padding: 0;
                    transition: all 0.1s ease-out;
                    li{
                        font-size: .9rem;
                        color: #fff;
                        padding:0 1rem;
                        white-space: nowrap;
                        // width: 22rem;
                        border-right: 1px solid #0037B2;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;

                    }
                }

            }
        }
         .type{
            margin-bottom:2%; 
            background: rgba(14,23,84,0.90);
            border: 1px solid #1DA9FF;
            padding: .8rem;
            position: relative;
            border-radius: 6px;
            box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.80); 
            >span{
                font-size:1rem;
                color: #fff;
                cursor: pointer;
                margin-right: 1rem;
                &.active{
                    color: #FFDE1D;
                }
                &.goodsType{
                    position: absolute;
                    right: -1px;
                    width: 113px;
                    height: 43px;
                    margin-right: 0;
                    background: #0E1754;
                    border: 1px solid #1DA9FF;
                    border-top-left-radius: 6px;
                    border-top-right-radius: 6px;
                    border-bottom: 0;
                    top: -45px;
                    line-height: 43px;
                    text-align: center;
                    box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.80);
                }
            }
            >a{
                position: absolute;
                height: 100%;
                right: 0;
                padding: 0 1rem;
                font-size: .9rem;
                display: flex;
                align-items: center;
                border-left: 1px solid #2970FF;
                top: 0;
            }
        }
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
        font-size: 28px !important ;
        border:none ;
    }
    
   
}

</style>
