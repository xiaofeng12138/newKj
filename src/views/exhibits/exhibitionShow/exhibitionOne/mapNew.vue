<template>
    <div class="map-contanier">
        <div class="quarantine">
            <!-- <span @click="quarantine([true,false])">[ 卫生检疫 ]</span> -->
            <span @click="health">[ 全球传染病疫情]</span>
            <span @click="animalQuaren([true,true])">[ 动物疫情禁令 ]</span>
            <!-- <span v-show='flag' @click='specialEx()'>[ 进出口展示 ]</span> -->
        </div>
        <div class="map-footer">
            <div v-show="getViewState[0]">
                <ul class="area">
                    <li v-for="ele in area" :key='ele.id' :class="{'active':ele.isActive}" @click="clickArea(ele.key)">{{ele.name}}</li>
                </ul>
            </div>
           
            <div v-show="showType" class="type">
                <span v-for="(item,index) in goodsType" :class="{active:item.isActive}" :key="item.id" @click="goodsTypeF(item.name,index)">{{item.name}}</span>
               
                <a href="javascript:void(0)" @click="clickShowType">关闭</a>
            </div>
            
        </div>
         <div id='chart' style="width:100%;height:90%" ></div>
         <div v-if='specialList.length>0' id='specialList'>
             <h3>特色展品</h3>
             <h4></h4>
             <ul>
                 <li v-for="(item,index) in specialList" :key="index">{{item.GOODSDESCRIPTIONCN}}</li>
             </ul>
         </div>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts');
import axios from "axios";
import Slider from './self_slider.js'
import regionTable from '@/until/corresponding'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'

import {mapGetters,mapActions,mapMutations} from 'vuex'
import { getCookie } from '../../../../until/getToken';

const processLng=lng=>{
    return lng>-30?lng-180:lng+180;
}
const processLngGe=lng=>{
    return lng+180;
}
export default {
    computed:{
        ...mapGetters('exhibitionStore', [
            'getViewState',
            'getFranchiseGoods',
            'getFranchiseGoodsRegion'
        ])
    },
    data(){
        return{
            specialList:[],
            spacialZPArr:[],
            flag:0,
            special:{},
            regionCountry:{
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
            options1:{},
            options0:{ 
                tooltip : {
                    trigger: 'item',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: false,
                    show:false,
                    padding:16,
                    // showContent:true,
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
                            backgroundColor:'rgba(14,23,84,0.80)',
                            borderColor:'#0989EB',
                            borderWidth:'1',
                            extraCssText:'box-shadow: 0 3px 5px 0 rgba(0,0,0,0.75), inset 0 0 8px 0 rgba(6,185,255,0.90),font-size:12px,color:white',
                            show:true,
                            formatter:function(params){
                                // console.log('params',params)
                                // console.log('params',params.data)
                                var str='国家/地区：'
                                var list=[]
                                if(params.data){
                                    str+= params.data.nameCh
                                    str+='<br/>'
                                    if(params.data.special && params.data.special.length>0){
                                        str+='特色展品：<br/>'
                                        if(params.data.special.length<=5){
                                            for(let item of params.data.special){
                                            list.push(
                                                '<span style=display:inline-block;height:10px;text-indent:2em>'+item.GOODSDESCRIPTIONCN+'</span>'
                                            )
                                        } 
                                        }else{
                                            for(let item=0;item<5;item++){
                                                list.push(
                                                '<span style=display:inline-block;height:10px;text-indent:2em>'+params.data.special[item].GOODSDESCRIPTIONCN+'</span>'
                                                )
                                            }
                                        }
                                       
                                        str+=list.join('<br/>')
                                    }
                                        
                                  return str
                                }
                            }
                        }
                    },
                ],
                
            },
            options:{ 
                tooltip : {
                    trigger: 'item',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    show:false,
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
                            areaColor:'#FFDE1D',
                            color:'#fff',
                        }
                    },
                    tooltip:{
                        backgroundColor:'rgba(14,23,84,0.80)',
                        borderColor:'#0989EB',
                        borderWidth:'1',
                        extraCssText:'box-shadow: 0 3px 5px 0 rgba(0,0,0,0.75), inset 0 0 8px 0 rgba(6,185,255,0.90)',
                        showContent:true,
                        formatter:function(params){
                            if(params.data&&params.data['nameCH']){
                                var str=''
                                if(params.data.sickNum){
                                     str='<div style="text-align:center">'+params.data['nameCH']+'<br>'+params.data.sickNum+'</div>' 
                                }else if(params.data.mouthSick){
                                    var thead='<table style="width:100%;text-align:center"><thead><tr><td style="text-align:left">疫名</td><td>确诊人数</td></tr></thead><tbody>'
                                    var tr=''
                                    params.data.data.forEach(item=>{
                                        tr+='<tr><td style="text-align:left">'+item.EPDIMIC_NAME+'</td><td>'+item.COMFIRMED+'</td></tr>'
                                    })
                                    tr+='</tbody></table>'
                                    str='<div>国家名：'+params.data['nameCH']+'</div>'+thead+tr
                                }else{
                                    var s=''
                                    if(params.data.VIRUS)
                                    params.data.VIRUS.forEach(item=>{
                                        s+='<br>疫名：'+item 
                                    })
                                     str='<div>国家名：'+params.data['nameCH']+s+'</div>' 
                                }
                                return str
                                
                            }
                             if(params.data && params.data.spacArr){
                              return '444444'
                            }
                             
                        }
                    },
                    data:[]
                  }
                ]
            },
            goodsType:[],
            charts:'',
            area:[],
            timer:null,
            counter:0,
            
        }
    },
    created(){
       
    },
    mounted(){
        var echartsBox=document.getElementById('chart');
        this.charts=echarts.init(echartsBox);
        // this.sliderInit();
        //屏蔽各个州国家
        this.getcountry();
        this.getSelfMap();
        this.initHealth();
        this.mapEvent();
        this.initArea()
         this.specialEx();
        // this.initGoodsType();
        
    },
    methods:{
        initArea(){
            let nowYear = getCookie('date');
            if(nowYear == '2020'){
                this.area = [
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
                        name:'一带一路国家/地区',
                        key:'B$R'
                    },
                ]
            }else{
                this.area = [
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
                ]
            }
        },
         ...mapMutations('exhibitionStore',[
            'viewChange',
            'changeSelected'
        ]),
        clickShowType() {
            this.clearMap()
            this.showType = false;
        },
        initHealth() {
            publicInter(interfaceUrl.queryEpidemicType, {}).then(r => {
                if(r.code == '200') {
                    this.goodsType = []
                    for(let i = 0; i < r.listType.length; i++) {
                        this.goodsType.push({
                            isActive: false,
                            name: r.listType[i].ILLNESSTYPE
                        })
                    }

                }
            })
        },
        health() {
            this.showType = true;
        },
        /**
         * 最字榜滚动初始化
         */
        sliderInit(){
            var target=document.getElementsByClassName('slider_target')[0];
            var slider=new Slider({target:target});
        },
        /**
         *切换视图 
         */
        switchView (state,reset) {
            this.viewChange(state)
            if(reset){
                let code=this.$store.state.exhibitionStore.selectedRegion
                // this.changeSelected(code)
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
        switchHover(){
        },
        /**
         * 设置地图option.data
         */
        setMapOptionData(data){
            this.options.series[0]['data']=data;
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
                {key:'listGuoJiaGuan',value:'C$E'}
                ]
            publicInter(interfaceUrl.getCounInfoByParam,{}).then(r=>{
                let special=[]
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
            var data=[];
            regionTable.forEach((item,i)=>{
                data.push({
                    name:item.name,
                    value:item.value,
                    selected:false,
                    nameCh:item.nameCH,
                })
            })
            // this.flag=0
            // this.options=this.options0;
            // publicInter(interfaceUrl.getCounInfoByParam,{}).then(r=>{
            //     if(r.code==='200'){
            //         // console.log(r)
            //         // console.log('r',r.listQuanQiu)
            //         if(r.listQuanQiu){
            //             r.listQuanQiu.forEach(i=>{
            //                data.forEach(val=>{
            //                     if(i.CODE==val.value){
            //                         let _code=val.value
            //                         if(data[_code])
            //                         data[_code].special=i.specialExhibits
            //                     }
            //                 })
            //             })
            //         }
            //     }
            // })


            this.setMapOptionData(data)
            // console.log('data',data)
            
        },
        /**
         * 给地图添加事件绑定
        */
        mapEvent(){
            const _this=this;
            this.charts.on('click',function(params){
                if(params.value)
                _this.testSpecial(params.value)
                _this.clearMap();
                let data=_this.getMapOptionData();
                data.forEach(item=>{
                    if(item.value===params.value){
                        item['selected']=true
                    }else{
                        item['selected']=false
                    }
                })
                _this.area.forEach(item=>{
                    item.isActive=false
                })
                let values = 0
                if(params.value || params.value  !== NaN){
                    values = params.value
                }else{
                    values = (params.dataIndex)+1
                }
                _this.changeSelected(values);

                _this.setMapOptionData(data)
            })
            this.charts.on('mouseover',function(params){
                // console.log
                clearInterval(_this.timer)
                _this.timer=null;
            })
            this.charts.on('globalout',function(params){
                _this.ligthRegionFun([],true)
            })
        },
        // 特色展品
        specialEx(){
            publicInter(interfaceUrl.getCounInfoByParam,{}).then(r=>{
                let spacialZPArr = r.listQuanQiu
                var arr=[]
                r.listQuanQiu.forEach((item)=>{
                   regionTable.forEach(val=>{
                            if(val.value == item.CODE){
                                arr.push({
                                    name:val.name,
                                    nameCH:val.nameCH,
                                    value:val.value,
                                    selected:false,
                                    spacArr:item.specialExhibits
                                })
                            }
                        })
               })
           this.ligthRegionFun(arr)
        })
           
            
        },
        testSpecial(value){
            publicInter(interfaceUrl.getCounInfoByParam,{}).then(r=>{
                this.specialList=r.listQuanQiu;
                r.listQuanQiu.forEach((item,index)=>{
                    if(item.CODE==value){
                        this.specialList=item.specialExhibits
                        // for(let i=0;i<5;i++){
                        //     this.specialList.push(item.specialExhibits[i])
                        // }
                        // // this.specialList=item.specialExhibits
                        // console.log('specialList',this.specialList)
                    }
                })
            })
        },
        /**
         * 点击检疫视图切换
        */
        quarantine(state){
            this.viewChange(state)
            this.clearMap()
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
        /**
         * 动物疫情
        */
        animalQuaren(state){
            this.clearMap();
            publicInter(interfaceUrl.queryAnimalEpidemic,{countryCode:""}).then(r=>{
                if(r.code==='200'){
                    // console.log('r',r.data)
                    var animalVirus=[];
                    r.data.forEach(item=>{
                        var virus=item.epidemic
                        // console.log('virus',virus)
                        regionTable.forEach(val=>{
                            if(val.value==item.CODE){
                                var arr=[]
                                virus.forEach(val2=>{
                                    arr.push(val2.VIRUS)
                                })
                                animalVirus.push({
                                    VIRUS:arr,
                                    name:val.name,
                                    nameCH:val.nameCH,
                                    selected:true
                                })
                            }
                        })
                    })
                    this.ligthRegionFun(animalVirus)
                }
            })

        },
        clickArea(key){
            this.changeSelected(key);
            clearInterval(this.timer)
            this.timer=null;
            this.initMap();
            var data=this.getMapOptionData()
            data.forEach(item=>{
                this.regionCountry[key].forEach(ele=>{
                    if(ele==item.value){
                        item.selected=true
                    }
                })
            })
            // console.log(data)
            this.setMapOptionData(data)
            this.area.forEach(item=>{
                if(item.key===key){
                    item.isActive=true
                }else{
                    item.isActive=false
                }
            })
        },
        initGoodsType(){
            var data=this.$store.state.exhibitionStore.franchiseGoods;
            this.goodsType=[];
            data.forEach(item=>{
                this.goodsType.push(
                    {isActive:false,name:item.name,key:item.key}
                )
            })
        },
        goodsTypeF(name,index){
            // let ligthRegionData=this.getFranchiseGoodsRegion
            let d = [];

            publicInter(interfaceUrl.queryEpidemic, {ILLNESSTYPE: name}).then( r => {
                if(r.code == '200') {
                    let d = [];
                    r.list.forEach(item=>{
                        regionTable.forEach(val=>{
                            if(val.value==item.CODE){
                                d.push({
                                    sickNum: item.QUANTITY,
                                    name:val.name,
                                    nameCH:val.nameCH,
                                    selected:true
                                })
                            }
                        })
                        
                    })
                    this.ligthRegionFun(d)
                    this.goodsType.forEach((item,i)=>{
                        if(i==index){
                            item.isActive=true
                        }else{
                            item.isActive=false
                        }
                    })
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
            var len=showData.length
            // this.timer=setInterval(()=>{
            //     if(that.counter<3*len-1){
            //          that.charts.dispatchAction({
            //             type: 'showTip',
            //             seriesIndex:0,//第几条series
            //             dataIndex:that.counter%len,//第几个tooltip
            //         });
            //         that.counter++   
            //     }else{
            //         that.counter=0
            //         that.timer=null
            //         clearInterval(that.timer)
                    
            //     }
            // },3000)

        }
    }
    
}
</script>
<style lang="scss" scoped>
.map-contanier{
    width: 100%;
    height: 100%;
    position: relative;
    background: url('../../../../assets/mapbg.png') 50% 50% no-repeat;
    background-size: 100%;
    .quarantine{
        position: absolute;
        left: 5%;
        top: 3%;
        z-index: 10;
        span{
            font-size: .9rem;
            cursor: pointer;
            color: #0070F7;
            font-weight: 600;
            &:last-child{
                margin-left: 1.5rem;
            }
            
        }
    }
    .map-footer{
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1% 1%;
        width: 100%;
        z-index: 10;
        ul.area{
            position: 0;
            margin: 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            li{
                cursor: pointer;
                font-size: 1rem;
                color: #fff;
                padding: .3rem .8rem;
                background: url('../../../../assets/sandbarD.png') 100% 100% no-repeat;
                background-size: cover;
                 &.active,&:hover{
                    color: #000;
                    background: url('../../../../assets/sandbarH.png') 100% 100% no-repeat;  
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
    #specialList{
        position: absolute;
        right: -245px;
        bottom: 32px;
        width: 180px;
        height: 150px;
        overflow: hidden;
        font-size: 16px;
        text-align: center;
        h3{
            text-align: center;
        }
        ul{
            list-style: none;
        }
    }
}

</style>
