<template>
    <div class="root" style="width:100%;height:100%">
        <div id='chart' style="width:100%;height:90%" ></div>
        <ul v-if='isShow'>
            <li class="prevent" @click="preventA()" v-if="step">防疫措施</li>
            <li v-for="(item,index) in region" :key="item.id" :class="{active:item.isActive}" @click="mapClick(item.key,index)">
                <!-- <img src="@/assets/sandbarD.png" alt=""> -->
                <!-- <img src="@/assets/sandbarH.png" alt=""> -->
                <span>{{item.name}}</span>    
            </li>
        </ul>
        <div v-if='isShow' class="top">
            <span >参展商最多: <span @click="lightArea('Japan',95)">日本</span>  </span>
            <span style="margin-left:1rem">价值总额最大: <span @click="lightArea('Thailand',62)">泰国</span> </span>
            <div class="slider">
                <ul class="slider_target">
                    <li>最贵的展品——莱奥纳多直升机AW189</li>
                    <li>最大的展品——金牛座龙门铣</li>
                    <li>最有科幻色彩——"会飞的汽车"</li>
                    <li>最有互动性——FORPHEUS乒乓球机器人</li>
                    <li>服务最小消费者——NEONA婴儿核磁共振仪</li>
                    <li>最奢华——粉钻高跟鞋</li>
                    <li>最萌——乐高版"进宝"</li>
                    <li>最大展位——台湾友嘉"2500"平米</li>
                </ul>
            </div>
        </div>
        <div v-if='!isShow' class="type">
            <span v-for="(item,index) in goodsType" :class="{active:item.isActive}" :key="item.id" @click="goodsTypeF(item.key,index)">{{item.name}}</span>
            <span class="goodsType">商品种类</span>
            <a href="javascript:void(0)" @click="close()">关闭</a>
        </div>
        <div v-if="stepInfor" class="stepInfo">
            <p>
                {{infor}}
            </p>
            <a href="javascript:void(0)" @click="stepClose">关闭</a>    
        </div>
    </div>
    
</template>
<script>
let echarts = require('echarts/lib/echarts')
import country from './corresponding'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import diagnosisVue from './diagnosis.vue';
import Slider from './self_slider.js'
import axios from 'axios'
export default {
    props:{
        height:{
            type:Number
        }
    },
    data(){
        return{
            isShow:true,
            step:false,
            stepInfor:false,
            infor:'',
            goodsType:[],
            region:[
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
                series: [{
                    type: 'map',
                    map: 'world',
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
                                    params.data.VIRUS.forEach(item=>{
                                        s+='<br>疫名：'+item 
                                    })
                                     str='<div>国家名：'+params.data['nameCH']+s+'</div>' 
                                }
                                return str
                                
                            }
                             
                        }
                    },
                    data:[]

                }]
            },
            charts:'',
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
            timer:null,
            timer2:null,
            timer3:null,
            timer4:null,
            counter:0,
            keyValue:{},
            tempData:null
        }
    },
    mounted(){
        var target=document.getElementsByClassName('slider_target')[0];
        var slider=new Slider({target:target});
        var echartsBox=document.getElementById('chart')
        this.charts=echarts.init(echartsBox)
        this.analyze(false)
        this.initOther()
        this.charts.setOption(this.options)
        this.mapEvent()
        this.getcountry()

    },
    methods:{
        initOther(){
            axios.get('/dater.json').then(r=>{
                var data=r.data.simpleValiter
                data.classify.forEach(item=>{
                    this.goodsType.push(
                        {isActive:false,name:item.name,key:item.value}
                    )
                })
                this.keyValue=data.keyValue

            })

        },
        animalSick(){
            var animalVirus=[]
            var that=this
            publicInter(interfaceUrl.queryAnimalEpidemic,{countryCode:""}).then(r=>{
                if(r.code==='200'){
                    r.data.forEach(item=>{
                        var virus=item.epidemic
                        country.forEach(val=>{
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
                    this.carousel(animalVirus)  
                }
            })
        },
        preventA(){
            this.stepInfor=true
        },
        mapClick(key,index){
            this.clearMapSick()
            this.analyze(false)
            this.regionCountry[key].forEach(item=>{
                this.options.series[0]['data'].forEach((value,i)=>{
                    if(parseInt(item)===value.value){
                        value['selected']=true
                    }
                })
            })
            this.reSetOption()
            this.region.forEach((val,i)=>{
                if(i===index){
                    val.isActive=true
                }else{
                    val.isActive=false
                }
            })
            this.$emit('clickCountry',key)
        },
        goodsTypeF(key,i){
            const that=this
            this.goodsType.forEach((item,index)=>{
                if(i===index){
                    item.isActive=true
                }else{
                    item.isActive=false
                }
            })
            this.$emit('nameYuan')
            var Brr=this.keyValue[key]
            if(Brr){
                this.carousel(Brr)
            }
             else{
                this.analyze(false)
                this.clearTimer()
                this.charts.setOption(this.options)
                return false
                publicInter(interfaceUrl.queryGoodsCountryCount,{type:name}).then(r=>{
                if(r.code==='200'&&r.data.goodsCountry.length>0){
                    var arr=r.data.goodsCountry,Arr=[],Brr=[]
                    arr.forEach(item=>{
                        Arr.push({
                            code:item.CODE,
                            sickNum:item.QTY
                        })
                    })
                    
                    Arr.forEach(item=>{
                        country.forEach(element=>{
                            if(item.code==element.value){
                                Brr.push({
                                name:element.name,
                                nameCH:element.nameCH,
                                selected:true,
                                sickNum:item.sickNum
                            })
                        }
                    })
                })
                this.carousel(Brr)
                
                }else{
                    this.$Message.error('查询出错')
                    
                }

            })

            }
            

        },
        showMouthSick(data){
            this.carousel(data)
        },
        stepClose(){
            this.stepInfor=false
        },
        carousel(data){
            if(!data||data.length<=0){return false}
            const that = this
            this.tempData=data
            this.clearTimer()
            this.options.tooltip.show=true
            this.options.series[0]['data']=data
            this.charts.setOption(this.options,true)
            var len=data.length
            this.timer=setInterval(()=>{
                if(that.counter<3*len-1){
                     that.charts.dispatchAction({
                        type: 'showTip',
                        seriesIndex:0,//第几条series
                        dataIndex:that.counter%len,//第几个tooltip
                    });
                    that.counter++
                }else{
                    that.counter=0
                    that.clearTimer()
                }
            },3000)

        },
        continueCarousel(){


        },
        showSickArea(arr){
            var countryList=[]
            const that = this
            this.clearTimer()
            that.counter=0
            this.infor=arr[0]['infor']
            this.stepClose()
            arr.forEach(item=>{
                country.forEach(element=>{
                    if(item.code==element.value){
                        countryList.push({
                            name:element.name,
                            nameCH:element.nameCH,
                            selected:true,
                            sickNum:item.sickNum
                        })
                    }
                })
            })
            this.options.tooltip.show=true
            this.options.series[0]['data']=countryList
            this.charts.setOption(this.options,true)
            var len=countryList.length
            this.carousel(countryList)
            // console.log(countryList)


        },  
        close(){
            this.isShow=true
            this.clearMapSick()
        },
        clearTimer(){
            clearInterval(this.timer)
            this.timer=null
            this.timer2=null
            this.timer3=null
            this.timer4=null
            this.counter=0

        },
        clearMapSick(){
            this.tempData=[]
             this.clearTimer()
            this.options.tooltip.show=false
            this.options.series[0]['data']=[]
            this.charts.setOption(this.options,true)
        },
        
        mapEvent(){
            const that =this
            this.charts.on('click',function(params){
                that.step=false
                that.isShow=true
                that.stepClose()
                that.clearMapSick()
                that.analyze(false)
                that.charts.setOption(that.options,true)
                if(params.value!==32){
                    that.options.series[0]['data'].forEach((item,i)=>{
                        if(item.value===params.value){
                            item['selected']=true
                        }else{
                            item['selected']=false
                        }
                    })
                     that.reSetOption()
                     that.region.forEach(item=>{
                        item.isActive=false
                     })
                    that.$emit('clickCountry',params.value)
                }   
            })
            this.charts.on('mouseover',function(params){
                that.clearTimer()
            })
            this.charts.on('mouseout',function(params){
                that.carousel(that.tempData)
            })
        },
        selectCountry(arr){
            var nameArr=[]
            arr.forEach(item=>{
                country.forEach(val=>{
                    if(parseInt(item)===val.value){
                        nameArr.push(val)
                    }
                })
            })
            return nameArr
        },
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
        analyze(flag){
            var data=[]
            country.forEach((item,i)=>{
                data.push({
                    name:item.name,
                    value:item.value,
                    selected:flag,
                    nameCh:item.nameCH
                })
            })
            this.options.series[0]['data']=data
        },
        lightArea(name,value){
            this.options.series[0]['data']=[{name:name,value:value,selected:true}]
            this.reSetOption()
            this.$emit('clickCountry',value);

        },
        reSetOption(){
            this.charts.setOption(this.options,false)
        },

    },
    beforeDestroy(){
        this.clearTimer()
    },
    destroyed(){
        this.charts.clear()
        this.timer=null
    }
    
}
</script>
<style lang="scss" scoped>
    div.root{
        position: relative;
        background: url(../../../../assets/mapbg.png) 50% 50% no-repeat;
        background-size: 100%;
        #chart{
            width: 100%;
            height: 100%;
        }
        .stepInfo{
            position: absolute;
            width: 95%;
            left: 2.5%;
            bottom: 6%;
            padding: .8rem;
            background: rgba(14,23,84,0.90);
            border: 1px solid #1DA9FF;
            z-index: 100000;
            box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.80);
            p{
                color:#fff;
                font-size: 1rem;
                line-height: 32px;
            }
            >a{
                position: absolute;
                width: 120px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                right: -1px;
                top: -40px;
                background: #0E1754;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border: 1px solid #1DA9FF;
                box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.80);
            }
        }
        >div.top{
            position: absolute;
            width: 95%;
            left: 50%;
            height: 3rem;
            margin-left: -47.5%;
            bottom: 2%;
            border-top: 1px solid #0037B2;
            display: flex;
            align-items: center;
            padding: .8rem 0;
            >span{
                font-size: 1rem;
                color: #fff;
                display: inline-block;
                width: 10rem;
                border-right: 1px solid #0037B2;
                // margin-right: 1rem;
                span{
                    color: #FFDE1D;
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
                        font-size: 1rem;
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
        >ul{
            position: absolute;
            width: 95%;
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            left: 50%;
            margin-left: -47.5%;
            bottom: 12%;
            justify-content: space-between;
            li{
                &.prevent{
                    position: absolute;
                    right: 0;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    top:-50px;
                    cursor: pointer;
                    border-radius: 6px;
                    background: #0E1754;
                    border: 1px solid #1DA9FF;
                    box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.80);
                }
                color: #fff;
                font-size: 16px;
                position: relative;
                width:86px;
                height: 38px;
                cursor: pointer;
                background: url('../../../../assets/sandbarD.png') 100% 100% no-repeat;
                background-size: cover;
                &.active,&:hover{
                    background: url('../../../../assets/sandbarH.png') 100% 100% no-repeat;
                    >span{
                        color: #000;
                    }
                  
                }
                >span{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width:100%;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    margin-left: -43px;
                    margin-top: -19px;
                }
                &:last-child{
                    width: 176px;
                    >span{
                        margin-left: -88px;
                    }
                    img{
                        width: 176px;
                    }
                }
                img{
                    position: absolute;
                    width:86px;
                    height: 38px;
                    line-height: 38px;  
                    display: block;
                    &:nth-child(2){
                        display: none
                    }

                }
                


            }
        }
        .type{
            position: absolute;
            width: 96%;
            left: 2%;
            bottom: 6%;
            background: rgba(14,23,84,0.90);
            border: 1px solid #1DA9FF;
            padding: 1rem 1.2rem;
            border-radius: 6px;
            box-shadow: inset 0 0 8px 0 rgba(41,112,255,0.80); 
            >span{
                font-size:1.1rem;
                color: #fff;
                cursor: pointer;
                margin-right: 1.4rem;
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
    
</style>
