<template>
    <div class="map-warrap" >
        <div class="warrap-header">
            <h3 class="center">
                <b>首届中国国际进口博览会通关监控大数据管理</b>
                <!-- <span>全国海关大数据云平台(上海)</span> -->

            </h3>
            <router-link to='/dashboard'>
                <img src="@/assets/logo2.png" alt="">
            </router-link>
            <h3 class="right">
                <img src="@/assets/text.png" alt="">
            </h3>

        </div>
        <ul class="globalData">
            <li>
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                <div style="display:inline-flex;align-items:center;justify-content:center" v-if="regionName.length!=3">
                    <span style="display:block;font-size:1.3rem;color:#1DEAFF;font-weight:700;text">{{regionName}}概况</span>
                </div> 
                <div style="display:inline-flex;align-items:center;justify-content:center" v-else>
                    <span style="display:block;font-size:1.3rem;color:#1DEAFF;font-weight:700;text">{{regionName}}<br>概况</span>
                </div>            
            </li>
             <li>
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                <div class="showdata">
                    <div class="icon">
                        <img src="@/assets/showCountry.png" alt="">
                        <span>{{totalCount.aPercent}}%</span>
                    </div>
                    <div class="data">
                        <h2>参展国家/地区(个)</h2>
                        <!-- <div class="templateOl">
                            <ol>
                                <li>1</li>
                                <li>3</li>
                                <li>0</li>
                                <li>+</li>
                            </ol>
                        </div> -->
                        <countNum :endValue='totalCount.all' />    
                    </div>
                </div>
            </li>
            
            <li>
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                 <div class="showdata">
                    <div class="icon">
                         <img src="@/assets/exhibitor.png" alt="">
                        <span>{{totalCount.ePercent}}%</span>
                    </div>
                    <div class="data">
                        <h2>参展商(家)</h2>
                        <!-- <div class="templateOl">
                            <ol>
                                <li>2</li>
                                <li>8</li>
                                <li>0</li>
                                <li>0</li>
                                <li>+</li>
                            </ol>
                        </div> -->
                        <countNum :endValue='totalCount.numofexhbtitor' />    
                    </div>
                </div>
            </li>
             <li>
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                 <div class="showdata">
                    <div class="icon">
                        <img src="@/assets/zhanwei.png" alt="">
                        <span>{{totalCount.pPercent}}%</span>
                    </div>
                    <div class="data">
                        <h2>展位数</h2>
                        <div class=""></div>
                        <!-- <div class="templateOl">
                            <ol class="xin">
                                <li>*</li>
                                <li>*</li>
                                <li>*</li>
                                <li>*</li>
                            </ol>
                        </div> -->
                        <countNum :endValue='totalCount.numofposition' />    
                    </div>
                </div>
            </li>
             <li>
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                <div class="showdata">
                    <div class="icon">
                        <img src="@/assets/import.png" alt="">
                        <span>{{totalCount.bPercent}}%</span>
                    </div>
                    <div class="data">
                        <h2>展品数量(件)</h2>
                        <!-- <div class="templateOl">
                            <ol class="xin">
                                <li>*</li>
                                <li>*</li>
                                <li>*</li>
                                <li>*</li>
                            </ol>
                        </div> -->

                        <countNum :endValue='totalCount.numofbills' />    
                    </div>
                </div>
            </li>
             <li>
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                <div class="showdata">
                    <div class="icon">
                        <img src="@/assets/priceTotal.png" alt="">
                        <span>{{totalCount.tPercent}}%</span>
                    </div>
                    <div class="data">
                        <h2>展品价值总额(万美元)</h2>
                        <!-- <div class="templateOl">
                            <ol class="xin">
                                <li>*</li>
                                <li>*</li>
                                <li>*</li>
                                <li>*</li>
                            </ol>
                        </div> -->
                        <countNum :endValue='totalCount.totalprice' />    
                    </div>
                </div>
            </li>
        </ul>
        <div class="globalIntro">
            <div class="mapBox" style="height:100%">
                <span class="rect left top"></span>
                <span class="rect right top"></span>
                <span class="rect left bottom"></span>
                <span class="rect right bottom"></span>
                <div class="worldMap">
                    <span class="rect right top"></span>
                     <span class="rect right bottom"></span>
                     <span class="fangyi" @click="health()">[ 卫生检疫 ]</span>
                     <span class="animal" @click="animalSick">[ 会期动物疫情 ]</span>
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
                     <!-- <span class="illness" v-if='sickName'>{{sickName}}疫情来源国</span> -->
                    <world @nameYuan='aaaa' @clickCountry='mapClick' ref='map' />
                </div> 
            </div>
            <div class="figure" style="height:100%">
                <span class="rect left top"></span>
                <span class="rect left bottom"></span>
                <div class="bearing">
                    <router-link to='/dynamicMonitor2' class="arrow">
                        <Icon type='ios-arrow-forward' />
                    </router-link> 
                    <h4>
                        展品大类分布
                    </h4>
                    <ol>
                        <li v-for="(item,i) in pieData" :key="item.id">
                            <gauge :value='item.value' :index='i' :explain='item.explain' :price='item.price' />
                        </li>    
                    </ol>  
                </div>
                <div style="height:50%">
                    <diagnosis v-if='components[2]' @nameMei='switchB' @illnessName='illName' />
                    <bar v-if="components[1]" @nameJin='switchC' @mouthDetail='detail' />
                    <SJ v-if='components[0]' @teshu='goodsTypes' @ranger='rangerDetail' @rangeraaa='asda'/>
                </div>
            </div>
        </div>
        
        <p class="copyright">全国海关大数据云平台（上海）</p>  
         
    </div> 
</template>
<script>
import bar from './bar'
import world from './worldMap'
import countNum from './countNum'
import gauge from './gauge'
import diagnosis from './diagnosis'
import SJ from './S&J'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import country from './corresponding'
export default {
    components:{
        bar,world,countNum,gauge,diagnosis,SJ
    },
    data(){      
        return{
            browserH:'',
            

            components:[true,false,false],
            sickName:'',
            regionName:'全球',
            rangerShow:false,
            totalCount:{
                numofposition:0,
                numofbills:0,
                numofexhbtitor:0,
                totalprice:0,
                all:0
            },
            barSurvey:{
                country:[],
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
                Global:{
                    BATCHNUM:0,
                    COMPANY:0,
                    POSITION:0,
                    TOTALPRIZE:0,
                    COUNTRY_NUM:0
                }
            },
            barList:[
                {
                    title:'展位数',
                    percent:100,
                    text:'10000个'
                },
                {
                    title:'展商数',
                    percent:100,
                    text:'3460家'
                },
                {
                    title:'进口批次',
                    percent:100,
                    text:'2200批次'
                },
                {
                    title:'展品价值总额',
                    percent:100,
                    text:'11892万美元'
                },
            ],
            pieDataGuage:{
                country:[],
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
                //全球
                GLOBAL:''

            },
            questionRecord:[],
            pieData:[
                {
                    value:0,
                    explain:'服饰服装及日用消费品',
                    price:0
                },
                {
                    value:0,
                    explain:'智能及高端装备',
                    price:0
                },
                {
                    value:0,
                    explain:'医疗器械及医药保健',
                    price:0
                },
                {
                    value:0,
                    explain:'消费电子及家电',
                    price:0
                },
                {
                    value:0,
                    explain:'食品及农产品',
                    price:0
                },
                {
                    value:0,
                    explain:'服务贸易',
                    price:0
                },
                {
                    value:0,
                    explain:'汽车',
                    price:0
                },
            ]
        }
    },
    mounted(){
        for(var i=0;i<19;i++){
            this.questionRecord.push(0)
        }
        
        this.WorH()
        // this.getTotal()
        this.getGauge()
        this.getRigon()

        
    },
    methods:{
        detail(e){
            this.rangerShow=false
            var date=new Date()
            var year=2018;
            var month=e>9?e:'0'+e
            var arr=[]  
            publicInter(interfaceUrl.queryEpidemicDetails,{month:''+year+month,countryCode:''}).then(r=>{
                if(r.code==='200'){

                    r.data.forEach(item=>{
                        country.forEach(val=>{
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
                    this.$refs.map.showMouthSick(arr)
                }

            })

        },
        aaaa(e){
            this.sickName=null
        },
        WorH(){
            this.browserH=window.innerHeight;
        },
        health(){
            this.rangerShow=false
            this.components=[false,true,false]
            this.$refs.map.isShow=true
            this.$refs.map.clearMapSick()
        },
        animalSick(){
            this.rangerShow=false
            this.$refs.map.animalSick()
            this.$refs.map.isShow=true
            this.$refs.map.clearMapSick()
        },
        switchC(e){
            this.$refs.map.clearMapSick()
            if(e){
                 this.components=[false,false,true]
            }else{
                this.components=[true,false,false]

            }
        },
        rangerDetail(){
            this.rangerShow=true

        },
        asda(e){
            this.questionRecord=e

        },
        switchB(e){
             this.sickName=''
             this.$refs.map.clearMapSick()
             this.$refs.map.step=false
             this.$refs.map.stepInfor=false
            if(e){
                this.components=[true,false,false]
               
            }else{
                this.components=[false,true,false]
            }
        },
        illName(e){
            this.sickName=e
            publicInter(interfaceUrl.queryEpidemicCountry,{EpidemicName:e}).then(r=>{
                if(r.code==='200'){
                    var data=r.data.EpidemicCountry
                    var arr=[]
                    data.forEach(item=>{
                        arr.push({
                            code:item.CODE,
                            sickNum:item.COMFIRMED,
                            countryName:item.ORIGINAL_COUNTRY_NAME,
                            infor:item.QUANRANTINE_MODE
                        })
                    })
                    this.$refs.map.showSickArea(arr)
                    this.$refs.map.step=true
                     this.$refs.map.isShow=true
                }
            })
        },
        async getRigon(){
            var res=await publicInter(interfaceUrl.queryRegionalGrouping)
            var type=['AF','EU','AS','NA','SA','OC','B$R','C$E']
            if(res.isOk){
                this.barSurvey.country=res.msg.filter((val)=>{
                    return val.STATISTIC_TYPE==1
                })
                type.forEach(val=>{
                    this.barSurvey[val]=res.msg.filter((item)=>{
                        return item.CONTINENT==val&&item.STATISTIC_TYPE==2
                    })
                    if(val==='B$R'){
                        this.barSurvey[val]=res.msg.filter((item)=>{
                            return item.STATISTIC_TYPE==3
                        })
                    } 
                    if(val==='C$E'){
                        this.barSurvey[val]=res.msg.filter((item)=>{
                            return item.STATISTIC_TYPE==4
                        })
                    } 
                })
                type.forEach((val,i)=>{
                    if(val==='B$R'||val==='C$E'){
                        return false
                    }
                    var item=this.barSurvey[val][0]?this.barSurvey[val][0]:{}
                    this.barSurvey.Global.COMPANY+=parseInt(item['COMPANY']||0)
                    this.barSurvey.Global.TOTALPRIZE+=parseInt(item['TOTALPRIZE']/10000||0)
                    this.barSurvey.Global.POSITION+=parseInt(item['POSITION']||0) 
                    this.barSurvey.Global.BATCHNUM+=parseInt(item['BATCHNUM']||0)
                    
                })
                console.log(this.barSurvey)
                
                this.barSurvey.Global.all=this.barSurvey.country.length
                this.totalCount={
                    numofposition:this.barSurvey.Global.POSITION,
                    pPercent:100,
                    numofbills:this.barSurvey.Global.BATCHNUM,
                    bPercent:100,
                    numofexhbtitor:this.barSurvey.Global.COMPANY,
                    ePercent:100,
                    totalprice:this.barSurvey.Global.TOTALPRIZE,
                    tPercent:100,
                    aPercent:100,
                    all:this.barSurvey.country.length
                }
            }  
        },
        async getTotal(){
           var res=await publicInter(interfaceUrl.qryTotalCount,{})
            if(res.code==='200'){
                this.totalCount={
                        numofcountry:res.NUMOFCOUNTRY,
                        numofbills:res.NUMOFBILLS,
                        numofexhbtitor:res.NUMOFEXHBITOR,
                        totalprice:res.TOTALPRICE
                    }
            }else{
                this.$Message.error('查询统计数据出错！')
            }
        },
        getGauge(){
            var zhou=['AF','EU','AS','NA','SA','OC','B$R','C$E']
            publicInter(interfaceUrl.queryExhPrice,{}).then(r=>{
                if(r.code===200){
                   this.pieDataGuage.country=r.data.filter(val=>{
                       return val.REGIONTYPE==='1'
                   })
                   this.pieDataGuage.GLOBAL=r.data.filter(val=>{
                       return val.REGIONTYPE==='4'
                   })
                   zhou.forEach(val=>{
                       if(val==='B$R'){
                           this.pieDataGuage[val]=r.data.filter(item=>{
                                return item.REGIONTYPE==='3'
                            })
                       }else if(val==='C$E'){
                           this.pieDataGuage[val]=r.data.filter(item=>{
                                return item.REGIONTYPE==='5'
                            })
                           
                       }else{
                           this.pieDataGuage[val]=r.data.filter(item=>{
                                return item.COUNTRYCODE===val&&item.REGIONTYPE==='2'
                            })
                       }
                   })
                    var data=this.pieDataGuage.GLOBAL[0]
                    this.pieData.forEach((item,i)=>{
                    switch(i){
                        case 0:
                            item.value=data.COMMODITY*80
                            item.price=data.COMMODITYPRICE
                            break;
                        case 1:
                            item.value=data.INTELLIGENCE*80
                            item.price=data.INTELLIGENCEPRICE
                            break;
                        case 2:
                            item.value=data.MEDICALDEVICES*80
                            item.price=data.MEDICALDEVICESPRICE
                            break;
                        case 3:
                            item.value=data.CONSUMERELECTRONICS*80
                            item.price=data.CONSUMERELECTRONICSPRICE
                            break;
                        case 4:
                            item.value=data.FOOD*80
                            item.price=data.FOODPRICE
                            break;
                        case 5:
                            item.value=data.TRADESERVICES*80
                            item.price=data.TRADESERVICESPRICE
                            break;
                        case 6:
                            item.value=data.CAR*80
                            item.price=data.CARPRICE
                            break;
                        default:break;    
                    }
                })
                }
            })

            // var data=this.pieDataGuage['GLOBAL'][0]
            

           
        },
        goodsTypes(){
            this.rangerShow=false
            this.$refs.map.clearMapSick()
            publicInter(interfaceUrl.queryGoodsType,{}).then(r=>{
                if(r.code==='200'){
                    var arr=[],data=r.data.type
                    data.forEach(item=>{
                        item=item?item:item={G_TYPE:''}
                        arr.push({
                            name:item.G_TYPE,
                            isActive:false
                        })
                    })
                    // this.$refs.map.goodsType=arr
                    this.$refs.map.isShow=false
                }
            })
        },


        
        mapClick(val){
            var obj,total
            this.sickName=false
            this.rangerShow=false
            if(isNaN(val)){
                switch(val){
                    case 'AF':this.regionName='非洲';break;
                    case 'AS':this.regionName='亚洲';break;
                    case 'NA':this.regionName='北美洲';break;
                    case 'SA':this.regionName='南美洲';break;
                    case 'OC':this.regionName='大洋洲';break;
                    case 'EU':this.regionName='欧洲';break;
                    case 'B$R':this.regionName='一带一路';break;
                     case 'C$E':this.regionName='国家馆';break;
                    default:break;
                }
                obj=this.pieDataGuage[val]
                total=this.barSurvey[val]
            }else{
                country.forEach(item=>{
                    if(item.value===val){
                        this.regionName=item.nameCH
                    }
                })
               obj=this.pieDataGuage.country.filter(item=>{
                    return item.COUNTRYNUMBER==val
                })
                total=this.barSurvey.country.filter(item=>{
                    return item.COUNTRY==val
                })                
            }
            total=total.length>0?total:[{}]
            
            this.totalCount={
                numofposition:total[0]['POSITION']||0,
                pPercent:((total[0]['POSITION']||0)*100/this.barSurvey.Global.POSITION).toFixed(2),
                numofbills:total[0]['BATCHNUM']||0,
                bPercent:((total[0]['BATCHNUM']||0)*100/this.barSurvey.Global.BATCHNUM).toFixed(2),
                numofexhbtitor:total[0]['COMPANY']||0,
                ePercent:((total[0]['COMPANY']||0)*100/this.barSurvey.Global.COMPANY).toFixed(2),
                totalprice:parseInt(total[0]['TOTALPRIZE']/10000||0),
                tPercent:((total[0]['TOTALPRIZE']||0)/(100*this.barSurvey.Global.TOTALPRIZE)).toFixed(2),
                all:total[0]['COUNTRY_NUM']||0,
                aPercent:((total[0]['COUNTRY_NUM']||0)*100/this.barSurvey.Global.all).toFixed(2),
            }
            this.pieData.forEach((item,i)=>{
                    var data=obj[0]
                    switch(i){
                        case 0:
                            item.value=data.COMMODITY*80
                            item.price=data.COMMODITYPRICE
                            break;
                        case 1:
                            item.value=data.INTELLIGENCE*80
                            item.price=data.INTELLIGENCEPRICE
                            break;
                        case 2:
                            item.value=data.MEDICALDEVICES*80
                            item.price=data.MEDICALDEVICESPRICE
                            break;
                        case 3:
                            item.value=data.CONSUMERELECTRONICS*80
                            item.price=data.CONSUMERELECTRONICSPRICE
                            break;
                        case 4:
                            item.value=data.FOOD*80
                            item.price=data.FOODPRICE
                            break;
                        case 5:
                            item.value=data.TRADESERVICES*80
                            item.price=data.TRADESERVICESPRICE
                            break;
                        case 6:
                            item.value=data.CAR*80
                            item.price=data.CARPRICE
                            break;
                        default:break;    
                    }
                })
                console.log(this.pieData)
        }
    },
    beforeDestroy(){
         this.totalCount={
                numofcountry:0,
                numofbills:0,
                numofexhbtitor:0,
                totalprice:0
            }
    },
    beforeRouteLeave(to,from){
        console.log(to,from)

    }
    
}
</script>


<style lang="scss" scoped>

    .map-warrap{
        overflow: hidden;
        width: 100%;
        height: 100vh;
        position: relative;
        min-height: 1000px;
        background: #090D39;
        .copyright{
            font-size: 1rem;
            text-align: center;
            color: #fff;
            padding-bottom: .38rem;
        }
        .warrap-header{
            height: 4rem;
            line-height: 4rem;
            position: relative;
            text-align: center;
            // margin-bottom: 30px;
            background: url('../../../../assets/exhibitionHead.png') no-repeat 50% 50%;
            background-size: 100%;

            >a{
                position: absolute;
                left: 1.8rem;
                height: 2rem;
                line-height: 4rem;
                top: 0;
                img{
                    width: 7.5rem;
                    vertical-align: middle;
                    margin: -3px 5px 0 0;
                    height: 1.8rem;
                }
            }
            h3.right{
                position: absolute;
                // height: 64px;
                // line-height: 64px;
                top: 0;
                right: 1.8rem;
                img{
                    width: 11.2rem;
                    height: 1.5rem;
                    margin-top: 1rem;
                }
  
            }
            h3.center{
                color: #fff;
                font-size: 1.75rem;
                padding-top: .7rem;
                height: 4rem;
                // line-height: 20px;
                span{
                    display: block;
                    width: 19remx;
                    margin: 0 auto;
                    text-align: center;
                    font-size: 1.2rem;
                    color: #26CAEF;
                    line-height: 1.2rem;

                }
            }

        }
        .rect{
                    position: absolute;
                    width: .65rem;
                    height: .65rem;
                    background: transparent;
                    z-index: 10;
                    &.left{
                        left: -1px;
                        border-left:2px solid #2773FF; 
                    } 
                    &.top{
                        top:-1px;
                        border-top:2px solid #2773FF; 
                    }
                    &.right{
                        right: -1px;
                        border-right:2px solid #2773FF; 
                    }
                    &.bottom{
                        bottom: -1px;
                        border-bottom:2px solid #2773FF; 
                    }

                }
        ul.globalData{
            list-style: none;
            margin: 0;
            padding: 1.9rem 1.4rem 0 1.4rem;
            display: flex;
            justify-content: space-between;
           >li{
                position: relative;
                height: 6.5rem;
                padding: .62rem;
                width: 15%;
                border: 1px solid #0037B2;
                &:nth-child(4){
                    width: 18%
                }
                &:nth-child(5){
                    width: 21%;
                }
                .showdata{
                    display: flex;
                    .icon{
                        width: 4.2rem;
                        height: 5rem;
                        background: #041E72;
                        text-align: center;
                        >span{
                            font-size: 1.2rem;
                            color: #FFE91A;
                        }
                        img{
                            width: 2.25rem;
                            height: 2.25rem;
                            margin: 5px 0;
                        }
                    }
                    .data{
                        width: calc(100% - 2.25rem);
                        text-align: center;
                         h2{
                            font-size: 1rem;
                            padding: 3.5% 0;
                            color: #fff;
                        }
                    }
                }
               

                &:first-child{
                    width: 6.1%;
                    >div{
                        width:100%;
                        text-align: center;
                        height: 100%;
                        background: #041E72;
                        >img{
                            width: 3rem;
                            height: 3rem;
                            margin-top: 0.9rem;
                        }
                    }
                }
                &:last-child{
                    width: 19%;
                }
            }
        }
        .globalIntro{
            position: relative;
            margin: 1.25rem 1.25rem .62rem 1.25rem;
            height: calc(100% - 262px) ;
            display: flex;
            overflow: hidden;
            .mapBox{
                width: 62%;
                height: 100%;
                border: 1px solid #0037B2;
                border-right:none;
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

                .worldMap{
                    height: 100%;
                    position: relative;
                    .fangyi,.animal{
                        position: absolute;
                        top:1rem;
                        font-size: 1rem;
                        padding: .5rem;
                        font-weight: 600;

                    }
                    .animal{
                        left: 13rem;
                        cursor: pointer;
                        color: #0070F7;
                        z-index: 1000;
                    }
                    .fangyi{
                        left: 3rem;
                        cursor: pointer;
                        color: #0070F7;
                        z-index: 1000;
                    }
                    .illness{
                        right: 3rem;
                        color: #FFA71A;
                        width: 19rem;
                        height: 3.8rem;
                        padding-right: 2.5rem;
                        text-align: center;
                        line-height: 1.8rem;
                        z-index: 1000;
                        background: url(../../../../assets/bingdu.png) 50% 50% no-repeat;
                        background-size: cover;
                    }
                } 
            }
            .figure{
                width: 38%;
                border: 1px solid #0037B2;
                position: relative;
                padding: 15px;
                &:hover{
                    .arrow{
                        opacity: 1;
                    }
                }
                h3{
                    font-size: 1.2rem;
                    color: #fff;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid  #0037B2;
                    img{
                        width:1.25rem;
                        height: 1.25rem;
                        vertical-align: middle;
                        margin-top: -2px;
                    }
                }
                ol.barGroup{
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    height: calc((100%)/4);    
                    display: flex;
                    flex-wrap:wrap;
                    justify-content: space-between;
                    li{
                        width: 45%;
                        margin-top: 3%;
                    }
                }
                .bearing{
                    height: 50%;    
                    border-bottom: 1px solid #0037B2;
                    margin: 0 -1.25rem;
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
                    >h4{
                        width: 12.5rem;
                        margin: 0 auto;
                        height: 2rem;
                        line-height: 2rem;
                        text-align: center;
                        color: #fff;
                        font-size: 1rem;
                        margin-top: .62rem;
                        margin-bottom: 5px;
                        // border: 1px solid #1DEAFF;
                        background: url('../../../../assets/classfiy.png') no-repeat ;
                        background-size: 100%;
                    }
                    >ol{
                        list-style: none;
                        display: flex;
                        justify-content:center;
                        flex-wrap: wrap;
                        height:calc(100% - 40px);
                        li{
                            width: 20%;
                            height: 40%;
                            margin: 0% 2.5%;
                            text-align: center;
                            margin-top: 0%;
                        }
                    }
                }
            }

        }
    }
    .templateOl{
        >ol{
            // display: ;
            list-style: none;
            margin: 0;
            padding: 0;
            margin-top: 5px;
            justify-content: space-around;
            &.xin{
                >li{
                    line-height: 2.8rem;
                }
            }
            li{
                font-size: 1.5rem;
                width: 1.5rem;
                display:inline-block;
                height: 2rem;
                line-height: 2rem;
                color: #fff;
                font-family: DIN-Medium;
                background: #174CFF;
                 text-align: center;
            }

        }
        
    }
</style>