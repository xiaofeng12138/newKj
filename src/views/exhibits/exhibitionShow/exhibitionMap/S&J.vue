<template>
    <div class="box">
        <div class="slefTabs">
            <span :class="{active:isActive}" @click="swichTabs()">强化监管</span>
            <span :class="{active:!isActive}" @click="swichTabs()">优化服务</span>
        </div>
        <div class="swpper-box" >
            <div class="swpper" :style="{transform:'translateX(-'+!isActive*50+'%)'}">
                 <div class="server jianguan">
                    <div class="Jleft" ref='Jleft'>
                        <p>
                            <span>展品入境查验数1：</span> <br>
                            <span>{{CHKNUM}}</span>
                        </p>
                        <p>
                            <span>展品入境查获数：</span> <br>
                            <span>{{CHDNUM}}</span>
                        </p>
                        <p>
                            <span>巡展记录：</span> <br>
                            <span @click="ranger" style="cursor:pointer">{{record}}</span>
                        </p>
                    </div>
                    <ul>
                        <li>
                           
                            <p class="bb">
                                <span>
                                    <img src="../../../../assets/shajiashu.png" alt="" >
                                    监测送样 
                                </span>
                                <a class="aa">
                                    <b>已出结果30批</b> <br>
                                    <b>合格29批，不合格1批</b>
                                </a>
                                <span>30(批)</span>
                            </p>
                            <p>
                                <span>
                                    <img src="../../../../assets/mapd.png" alt="">销毁(件)
                                </span>
                                <span>0</span>
                            </p>
                            
                        </li>
                        <li>
                             <p @click="foodHandle" style="cursor: pointer">
                                 
                                <span>
                                    <img src="../../../../assets/jianyipici.png" alt="">食品检疫审批
                                </span>
                               
                                <span>{{dataTable3.length}}(批)</span>
                                
                            </p>
                            
                           
                            
                        </li>  
                        <li>
                             <!-- <p>
                                <span>
                                    <img src="../../../../assets/mapa.png" alt="">食品检疫审批
                                </span>
                                <span>7(批)</span>
                            </p> -->
                             <p>
                                <span>
                                    <img src="../../../../assets/mapf.png" alt="">退运(件)
                                </span>
                                <span>0</span>
                            </p>
                        
                            
                            
                        </li> 
                        <li>
                             <!-- <p>
                                <span>
                                    <img src="../../../../assets/mapa.png" alt="">食品检疫审批
                                </span>
                                <span>7(批)</span>
                            </p> -->
                            <p class="bb">
                                <span>
                                    <img src="../../../../assets/mapc.png" alt="">除害(件)
                                </span>
                                <a class="aa">
                                    <b>检疫性有害生物咖啡果小蠹 1批</b>
                                </a>
                                <span>1</span>
                            </p> 
                        
                            
                            
                        </li>  
                              
                    </ul>            
                </div>
                <div class="jianguan">
                    <div class="Jleft long"> 
                       
                            <div class="card" >
                                <p style="line-height:45px;">
                                    <span>已开具证明函份数：</span>
                                    <span>{{proof}}</span>
                                </p>
                                <p  style="line-height:45px;">
                                    <span>涉及展商数：</span>
                                    <span>{{sheji}}</span>
                                </p>
                                <p style="line-height:45px;">
                                    <span>提前申报数：</span>
                                    <span>{{tiqian}}</span>
                                </p>
                                <p style="line-height:45px;">
                                    <span>快速提离数：</span>
                                    <span>{{tili}}</span>
                                </p>
                                <p style="line-height:45px;">
                                    <span>担保额度监控:</span>
                                    1
                                    <span class="danbao" @click="detailLink">5(亿元) / {{(dataA/10000).toFixed(0)}}(万元)</span>
                                </p>
                            </div>
                            <div class="card">
                                 <p>
                                    <span>特殊区域保税展示：</span><br>
                                    <span>{{money[1]['a']}}(万美元) / {{money[1]['b']}}(批次)</span>
                                </p>
                                <p>
                                    <span>保税仓库保税展示：</span><br>
                                    <span>{{money[2]['a']}}(万美元) / {{money[2]['b']}}(批次)</span>
                                </p>
                                <p v-if="money[0]['a']!=0">
                                    <span>特殊区域转展览品：</span><br>
                                    <span>{{money[0]['a']}}(万美元) / {{money[0]['b']}}(批次)</span>
                                </p>
                                <p v-if="money[3]['a']!=0">
                                    <span>保税仓库转展览品:</span><br>
                                    <span >{{money[3]['a']}}(万美元) / {{money[3]['b']}}(批次)</span>
                                </p>
                            
                        </div>
                        
                               
                    </div>
                    <ul >
                        <li>
                            <p @click="saaa" style="cursor: pointer">
                                <span>
                                    <img src="../../../../assets/teshu.png" alt="">特许食品检疫审批
                                </span>
                                <span>{{dataTable4.length}}(批)</span>
                            </p> 
                            <p>
                                <span>
                                    <img src="../../../../assets/mape.png" alt="">免于入境验证批次
                                </span>
                                <span>{{mianyu.ZPC}}</span>
                            </p>
                        </li>
                        <li >
                             <!-- <p>
                                <span>
                                    <img src="../../../../assets/eNum.png" alt="">口岸快速放行数
                                </span>
                                <span>3124</span>
                            </p>  -->
                             <p @click="teshu" style="cursor: pointer">
                                <span>
                                    <!-- 特殊审批展品数 -->
                                    <img src="../../../../assets/teshu.png" alt="" >特许进境动植物检疫审批
                                </span>
                                <span>{{Num22}}</span>
                            </p>
                             <!-- <p>
                                <span>
                                    <img src="../../../../assets/mape.png" alt="">免于强制验证件数
                                </span>
                                <span>0</span>
                            </p>  -->
                           
                        </li> 
                        <li>
                            <!-- <p @click="teshu" style="cursor: pointer">
                                <span>
                                    <img src="../../../../assets/teshu.png" alt="" >特殊审批展品数
                                </span>
                                <span>{{Num||0}}</span>
                            </p> -->
                            <!-- <p>
                                <span>
                                    <img src="../../../../assets/mapb.png" alt="">常规审批数
                                </span>
                                <span>27451</span>
                            </p> -->
                            <p @click="mianyuDetail" style="cursor:pointer">
                                <span>
                                    <img src="../../../../assets/mape.png" alt="">免于入境验证金额(美元)
                                </span>
                                <span>{{mianyu.ZJE}}</span>
                            </p>
                           
                            
                        </li> 
                        <li>
                            <!-- <p>
                                <span>
                                    <img src="../../../../assets/mapb.png" alt="">常规审批数
                                </span>
                                <span>27451</span>
                            </p> -->
                             <p>
                                <span>
                                    <img src="../../../../assets/mape.png" alt="">免于强制验证件数
                                </span>
                                <span>{{mianyu.ZJS}}</span>
                            </p> 
                            
                        </li>       
                    </ul>            
                </div>
            </div>
        </div>
        <Modal v-model="modelSwith2" width='950' >
            <div v-if='baoguanList' >
                <h3 style='margin-bottom:16px;text-align:center;font-size:24px'>报关单列表</h3>
                <div class="modelAAA">
                    <Table :columns="Columns" :data="dataTable" border class="self"  @on-row-click='rowClick'></Table>
                </div>
            </div>
            <div v-if='jianyanList'>
                <h2 style='text-align:center;padding:20px 0'>免于检验明细</h2>
                <div class="modelAAA">
                    <Table :columns="Columns2" :data="dataTable2" border class="self"></Table>  

                </div>
                
            </div>
            <div v-if='foodValitor'>
                <h2 style='text-align:center;padding:20px 0'>食品检疫明细</h2>
                <div class="modelAAA">
                    <Table :columns="Columns3" :data="dataTable3" border class="self"></Table>  
                </div>
            </div>
            <div v-if='foodValitor2'>
                <h2 style='text-align:center;padding:20px 0'>进境食品检疫明细</h2>
                <div class="modelAAA">
                    <Table :columns="Columns3" :data="dataTable4" border class="self"></Table>  
                </div>
            </div>
        </Modal>
        <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit> 
       
    </div>    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import customsUnit from '../../unit/customsUnit'
import axios from 'axios'
export default {
    components:{customsUnit},

    data(){
        return{
            isActive:true,
            baoguanList:false,
            jianyanList:false,
            foodValitor:false,
            foodValitor2:false,
            timer:'',
            tili:0,
            counter:0,
            flag:false,
            Num22:0,
            CHKNUM: 0,
            CHDNUM:0,

            sheji:0,
            dataTable4:[],
            money:[
                {a:0,b:0},
                {a:0,b:0},
                {a:0,b:0},
                {a:0,b:0}],

            dataA:0,
            mianyu:{ZJE:0,ZJS:0,ZPC:0},
            DomHeight:0,
            tiqian:0,
            proof:0,
            record:0,
            dataTable:[],
            dataTable3:[],
            Columns3:[
                {
                    title:'国家/地区',
                    key:'country'
                },
                {
                    title:'展品名称',
                    key:'name'
                },
                {
                    title:'重量',
                    key:'weight'
                },
                {
                    title:'单位',
                    key:'unity'
                },
                {
                    title:'审批方式',
                    key:'fun'
                },
            ],
            Columns2:[
                {
                    title:'证明函编号',
                    key:'CERTIFICATENO',
                    align:'center',
                    width:180
                },
                {
                    title:'品名',
                    key:'GOODSDESCRIPTIONCN',
                    align:'center',
                    width:180
                },
                {
                    title:'原产地',
                    align:'center',
                    key:'COUNTRYOFORIGIN'

                },
                {
                    title:'数量',
                    align:'center',
                    key:'QUANTITY'
                },
                {
                    title:'总价',
                    align:'center',
                    key:'TOTALPRICE'
                },
                {
                    title:'展位',
                    align:'center',
                    key:'BOOTHNO'
                },
                {
                    title:'展商',
                    align:'center',
                    key:'EXHIBITOR',
                    width:180
                },
            ],
            dataTable2:[],
            modelSwith2:false,
            Columns:[
                {
                    title:'报关单号',
                    key:'ENTRY_ID'
                },
                {
                    title:'实征税款',
                    key:'TAX_TOTAL'
                },
                {
                    title:'减免税款',
                    key:'RSV1_CUT'
                }
            ]
        }
    },
    mounted(){
        this.goodsCount()
        this.initData()
    },
    methods:{
        saaa(){
            this.modelSwith2=true
            this.baoguanList=false
            this.jianyanList=false
            this.foodValitor=false
            this.foodValitor2=true

        },
        swichTabs(){
            this.isActive=!this.isActive
        },
        ranger(){
            this.$emit('ranger')
        },
        foodHandle(){
            this.modelSwith2=true
            this.baoguanList=false
            this.jianyanList=false
            this.foodValitor=true
            this.foodValitor2=false
        },
        mianyuDetail(){
            this.modelSwith2=true
            this.baoguanList=false
            this.jianyanList=true
            this.foodValitor=false
             this.foodValitor2=false

        },
        teshu(){
            this.$emit('teshu')
        },
        goodsCount(){
            publicInter(interfaceUrl.queryGoodsCount,{}).then(r=>{
                if(r.code==='200'){
                    this.Num=r.data.count
                }else{
                    this.$Message.error('查询出错')
                }
            })
        },
        initData(){
            publicInter(interfaceUrl.queryExpoToPort,{}).then(r=>{
                if(r.isOk){
                    this.tili=r.totalRow
                }
            })
            publicInter(interfaceUrl.queryStatisticDeclare,{}).then(r=>{
                if(r.code===200){
                    this.tiqian=r.NUM;
                }

            }),
            publicInter(interfaceUrl.queryStatisticUsedQuota,{}).then(r=>{
                if(r.code===200){
                    this.dataA=r.USED_QUOTA
                }
            })
            publicInter(interfaceUrl.proof,{status:"7"}).then(r=>{
                if(r.code===200){
                    this.proof=r.NUM
                }
            })
            publicInter(interfaceUrl.queryOptimalService,{}).then(r=>{
                if(r.isOk){
                    r.msg.forEach(element => {
                        this.money[element.SERVICE_TYPE]={a:element.SERVICE_TOTAL||0,b:element.SERVICE_BATCH||0}    
                    });

                }
            })
            publicInter(interfaceUrl.LPreferential,{}).then(r=>{
                if(r.code===200){
                    this.mianyu.ZJE=r.ZJE
                    this.mianyu.ZJS=r.ZJS
                    this.mianyu.ZPC=r.ZPC
                    this.dataTable2=r.body


                }
            })
             publicInter(interfaceUrl.national,{}).then(r=>{
                if(r.code===200){
                    this.sheji=r.COMPANYTOTAL

                }
            })
            publicInter(interfaceUrl.queryPatrolRecordStatic,{}).then(r=>{
                if(r.PRCOUNT){
                    var data=[]
                    this.record=r.PRCOUNT
                    r.PRList.forEach(item=>{
                        data.push(item.PMCOUNT)
                    })
                    this.$emit('rangeraaa',data)
                }

            })
            publicInter(interfaceUrl.chkStatistics,{}).then(r=>{
                if(r.code===200){
                    this.CHKNUM=r.CHKNUM
                    // this.CHDNUM=r.CHDNUM
                }
            })
            axios.get('/dater.json').then(r=>{
                console.log(r.data)
                this.dataTable3=r.data.foodComm
                this.dataTable4=r.data.foodSpec
                this.Num22=r.data.count||0
            })

        },
        detailLink(){
            publicInter(interfaceUrl.queryUsedQuotaList,{}).then(r=>{
                if(r.code===200){
                    this.modelSwith2=true;
                    this.baoguanList=true,
                    this.jianyanList=false,
                    this.foodValitor=false,
                    this.foodValitor2=false,
                    this.dataTable=r.data;
                    
                }

            })
        },
        rowClick(e){
            this.$refs.abc.query(e.ENTRY_ID)
            this.flag=true
        },
        closeWin(){
            this.flag=false

        }
        
        


    }
    
}
</script>
<style lang="scss" scoped>
.danbao{
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
}
.modelAAA{
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
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
}
.box{
    width: 100%;
    height: 100%;
    .slefTabs{
        width: 40%;
        margin: 1.2rem auto;
        position: relative;
        color: #fff;
        font-size: 1rem;
        // margin: 1rem 0;
        // border: 1px solid 
        >span{
            display: inline-block;
            width: 50%;
            margin: 0 -3px;
            text-align: center;
            cursor: pointer;
            padding: 8px 0;
            border: 1px solid #0037B2; 
            &.active{
                background-image: linear-gradient(-178deg, #116B89 0%, rgba(17,107,137,0.00) 89%);
            }
        }
        &::after,&::before{
            content: '';
            position: absolute;
            width: 1px;
            height: 80%;
            background: #0037B2 ;
            top: 50%;
            transform: translateY(-50%);
        }
        &:after{
            right: -2.5%;
        }
        &:before{
            left: -5%;
        }
    }
    .swpper-box{
            width: 100%;
            height: 272px;
            padding-top: 10px;
            overflow: hidden;
            .swpper{
                display: flex;
                width: 202%;
                justify-content: flex-start;
                transition: all 0.7s ease-in-out;
                .jianguan{
                    display: flex;
                    width: 49.5%;
                    margin-right: .5%;
                    justify-content: space-between;
                    align-items: flex-start;
                   
                  
                    &:last-child{
                        margin-right: 0;
                    }
                    &.server{
                        .Jleft{
                            border: 1px solid #F4A213;                  
                            >p{
                                >span:first-child{
                                    color: #F4A213;
                                }
                            }
                        } 
                        >ul{
                            padding-top: 1px;
                            li{               
                             >p{
                                border: 1px solid #F4A213 ;
                                >span:first-child{
                                    color: #F4A213 ;
                                }
                            }
                            }
                        }
                        
                    }
                   
                    .Jleft{
                        width: 48%;
                        padding: 10px;
                        border: 1px solid #0060B7; 
                         perspective: 1200px; 
                         overflow: hidden;
                         
                         &.long{
                                height: 250px;
                                position: relative;
                                .card{
                                    position: absolute;
                                    left: 0;             
                                    width: 100%;
                                    height: 260px;
                                    padding: 12px 10px 10px 10px;
                                    background: #090D39;
                                    // display: none;
                                    overflow: hidden;
                                    transform-style: preserve-3d;
                                    top:0px;
                                    p{
                                        line-height: 28px;
                                    }
                                }
                                >div:last-child{
                                    left: 100%;
                                    animation: cardTOP 20s ease-in-out 4s infinite ;
                                }
                            }
                        p{
                            font-size: 1rem;
                            line-height: 38px;
                            >span:first-child{
                                color: #1DEAFF;
                            }
                            >span:last-child{
                                color: #fff
                            }
                        }
                        
                    }
                    >ul{
                    width: 50%;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    perspective: 1200px;
                    &:hover{
                        >li{
                            animation: none;
                        }
                    }
                    li{
                        width: 100%;
                        position: relative;
                        height: 47px;     
                        margin-top:1.1rem;
                        transform-style: preserve-3d;
                        animation: cardScorll 20s ease-in-out   infinite ;
                        &:first-child{
                            animation-delay: 4s;
                            z-index: 12;
                            &:hover{
                                p{
                                    a{
                                        opacity: 1;
                                        display: block;
                                    }
                                }  

                            }
                        }
                        &:nth-child(2){
                            animation-delay: 4.5s;
                            z-index: 11;
                            &:hover{
                                p{
                                    a{
                                        opacity: 1;
                                        display: block;

                                    }
                                }  

                            }
                        }
                        &:nth-child(3){
                            animation-delay: 5s;
                        }
                        &:nth-child(4){
                            animation-delay: 5.5s;
                            z-index: 11;
                            p{
                                cursor: pointer;
                                a.aa{
                                    width: 70%;
                                    top: -54px;

                                }
                                
                            }
                             &:hover{
                                p{
                                    a{
                                        opacity: 1;
                                        display: block;

                                    }
                                }  

                            }
                        }
                        &:nth-child(5){
                            animation-delay: 6s;
                        }
                        &:nth-child(6){
                            
                            animation-delay: 6.5s;
                            
                        }
                        p.bb{
                            position: relative;
                            >a{
                                position: absolute;
                                left: 0;
                                top: 54px;
                                width: 50%;
                                font-size: .9rem;
                                color:  #F48000;
                                background: #090D39;
                                display:none;
                                border-radius: 4px;
                                padding: 10px;
                                border: 1px solid  #F4A213;
                                opacity: 0;
                                transition: all 0.3s ease-in;                               
                                box-shadow: 0 2px 4px 0 rgba(0,96,183,0.10);
                            }
                        }
                        >p{
                            justify-content: space-between;
                            position: absolute;
                            display: flex;
                            align-items: center;
                            padding: 8px;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            // line-height: 52px;
                            // background: rgba(0,96,183,0.10);
                            border: 1px solid #0060B7;
                            backface-visibility: hidden;
                            -moz-backface-visibility: hidden;
                            -webkit-backface-visibility: hidden;
                            -ms-backface-visibility:hidden;
                            &:nth-child(2){
                                transform: rotateX(-180deg)
                            }
                             >span:first-child{
                                color: #1DEAFF;
                                font-size: 1rem;
                                img{
                                    width: 1.3rem;
                                    height: 1.2rem;
                                    margin-right: 10px;
                                    margin-top: -2.5px;
                                    vertical-align: middle;
                                }
                            }
                            >span:last-child{
                                color: #fff;
                                font-size: .8rem;
                            }
                        }
                        &:first-child{
                            margin-top: 0;
                        }
                       
                    }
                }
    }
               
            }
        }
}
@-moz-keyframes cardScorll{
    form{
        transform: rotateX(-0deg);
    }
    5%{
         transform: rotateX(-180deg);
    }
    50%{
        transform: rotateX(-180deg);

    }
    55%{
        transform: rotateX(-360deg);
    }
    to{
        transform: rotateX(-360deg);
    }
}
@keyframes cardScorll {
    form{
        transform: rotateX(-0deg);
    }
    5%{
         transform: rotateX(-180deg);
    }
    50%{
        transform: rotateX(-180deg);

    }
    55%{
        transform: rotateX(-360deg);
    }
    to{
        transform: rotateX(-360deg);
    }
}
@keyframes cardTOP {
    form{
        left: 0 ;
    }
    2%{
        left: 100%;
    }
    50%{
        left: 100%;
    }
    52%{
        left: 0; 

    }
    98%{
        left:0; 
    }
    to{
        bottom: 100%;
    }
    
}
@-moz-keyframes cardTOP {
    form{
        bottom: 2px;
    }
    2%{
        bottom: -262px;
    }
    50%{
        bottom: -262px;
    }
    52%{
        bottom:2px; 

    }
    98%{
        bottom:2px; 
    }
    to{
        bottom: 2px;
    }
    
}
</style>
