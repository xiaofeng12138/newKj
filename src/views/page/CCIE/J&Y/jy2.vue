<template>
    <!-- 
        强监管与优化服务
     -->
     <div style="height: 100%">
         <div class="supervision">
             <!-- <div class="title">
                <span>强化监管</span>
            </div> -->
            <div class="top">
                <div class="top-left">
                    <div class="content" style="border-left: 4px solid #1f5ff2;">
                        <p class="p1" >展品入境查验数</p>
                        <p class="p2">0</p>

                    </div>
                    <div class="content" style="border-left: 4px solid #f5424f; margin-left: 3%">
                        <p class="p1">展品入境查获数</p>
                        <p class="p2">0</p>
                    </div>
                    <div class="content" style="border-left: 4px solid #ffc83e; margin-left: 3%">
                        <div style="width: 50%; float:left">
                            <p class="p1" >巡展记录</p>
                        <p class="p2" style="cursor: pointer" @click="recordHandle">{{xgNum}}</p>
                        </div>
                        <div style="width: 50%; float:left">
                            <p style="font-size: 0.75rem; margin-top: 18px; color: #f4a213; cursor: pointer"  @click="showUnusual">核查异常数量</p>
                        </div>
                        
                    </div>
                </div>
                <div class="top-right">
                    <div class="detail">
                        <div class="content">
                            <Tooltip style="width: 100%" placement="right-end">
                                <span class="name">监测送样(批)</span>
                                <span class="value">{{SAMPLEDELIVERED}}</span>
                                <div slot="content">
                                    <a >
                                        <b>{{SAMPLEDELIVEREDNOTE}}</b> 
                                    </a>
                                </div>
                            </Tooltip>
                        </div>
                        <div class="content" >
                            <span class="name" @click="showModal(2)" style="cursor: pointer">食品检疫审批(批)</span>
                            <span class="value">{{foodNormal}}</span>
                        </div>
                        <div class="content">
                            <span class="name">退运(件)</span>
                            <span class="value">{{WITHDRAWAL}}</span>
                        </div>
                    </div>
                    <div class="detail" style="margin-top: 8px">
                        <div class="content">
                            <Tooltip style="width: 100%" placement="right-end">
                                <span class="name">除害(件)</span>
                                <span class="value">{{ELIMINATIONOFPESTS}}</span>
                                <div slot="content">
                                    <a>
                                        <b>{{ELIMINATIONOFPESTSNOTE}}</b>
                                    </a>
                                    
                                </div>
                            </Tooltip>
                        </div>
                        <div class="content">
                            <span class="name">销毁</span>
                            <span class="value">{{DESTRUCTION}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal v-model="modalShow" width='950'>
                <div class="records" >
                        <!-- <Row class="records-title">
                            <Col>展位核查异常数量</Col>
                        </Row> -->
                        <h3 style='margin-bottom:16px;text-align:center;font-size:24px'>展位核查异常数量</h3>
                        <Row class="rows" style="background: rgba(255,255,255,0.05)">
                            <Col span="12" class="rows-content">
                                <span style="float: left">检出非法印刷品或出版物</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                            <Col span="12" class="rows-content">
                                <span style="float: left">检出禁止进境物</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                        </Row>
                        <Row class="rows">
                            <Col span="12" class="rows-content">
                                <span style="float: left">检出未获检疫准入或未办检疫审批的展品</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                            <Col span="12" class="rows-content">
                                <span style="float: left">检出动植物疫情</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                        </Row>
                        <Row class="rows">
                            <Col span="12" class="rows-content">
                                <span style="float: left">擅自销售或移出展馆</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                            <Col span="12" class="rows-content">
                                <span style="float: left">擅自试吃试用</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                        </Row>
                        <Row class="rows">
                            <Col span="12" class="rows-content">
                                <span style="float: left">检出其他异常</span>
                                <span  style="float: right" class="value">0</span>
                            </Col>
                        </Row>
                    </div>
            </Modal>
        </div>

         <!-- 禁止限制类列表展示 -->
         <div class="h-center">
               <div class="forbid" @click="forbid">
                    <div class="forbid_left">
                        <Icon type="ios-close-circle-outline" size="40"/>
                        <p>被禁止</p>
                    </div>
                    <div class="forbid_center"></div>
                    <div class="forbid_right">
                        <ul>
                            <li>
                                <span>{{forbidNum}}</span>件
                            </li>
                            <li>
                                <span>{{forbidPrice}}</span>万（美元）
                            </li>
                        </ul>
                    </div>
                </div>

                  <div class="restrict" @click="restrict">
                    <div class="restrict_left">
                         <Icon type="ios-alert-outline" size="40"/>
                        <p>被限制</p>
                    </div>
                    <div class="restrict_center"></div>
                    <div class="restrict_right">
                        <ul>
                            <li>
                                <span>{{restrictNum}}</span>件
                            </li>
                            <li>
                                <span>{{restrictPrice}}</span>万（美元）
                            </li>
                        </ul>
                    </div>
                </div>
         </div>
            <!-- 被禁止和限制的Model -->
            <Modal
                v-model="forbidModal"
                width = "1500px"
                class-name='vertical-center-modal forbidBody'
              
                
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="forbidModal=false" size='30' />
            </p>
            <div class="modalBody">
                <h1>被禁止清单</h1>
                <Table  :row-class-name = "rowClassName" border :columns = 'columns1' :data='forbidTable' class="tableBody" style="margin-top:20px">
                </Table>
                <Page :total=forbidTotal show-total :page-size=10 @on-change="changePageforbid"/>
            </div>
        </Modal>

        <!-- 限制类清单 -->
         <Modal
                v-model="restrictModal"
                width = "1500px"
                class-name='vertical-center-modal forbidBody'
                :footer-hide = true
                :mask-closable = "false"
                
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="restrictModal=false" size='30' />
            </p>
            <div class="modalBody">
                <h1>被限制清单</h1>
                <Table  :row-class-name = "rowClassName" border :columns = 'columns2' :data='restricTable' class="tableBody" style="margin-top:20px">
                </Table>
                <Page :total=restrictTotal show-total :page-size=10 @on-change="changePagerestrict"/>
            </div>
        </Modal>

        <div class="services">
            <!-- <div class="title">
                <span>优化服务</span>
            </div> -->
            <div class="services-content">
                <div class="content-head">
                    <Row justify="space-between" type="flex" style="height: 100%" >
                        <Col class="col" span="4">
                            <p  class="p1" style="cursor: pointer" @click="showModal(3)"><img src="@/assets/teshu.png" alt="">特许食品检疫审批</p>
                            <p class="p2">{{foodSpectial}}</p>
                        </Col>
                        <!-- <Col class="col" span="4">
                            <p  class="p1" ><img src="@/assets/teshu.png" alt="">免于入境验证批次</p>
                            <p class="p2">0</p>
                        </Col> -->
                        <Col class="col" span="4">
                            <p  class="p1" ><img src="@/assets/mape.png" alt="">特许进境动植物检疫审批</p>
                            <p class="p2">{{CONCESSIONENTRY}}</p>
                        </Col>
                        <!-- <Col class="col" span="4">
                            <p  class="p1" style="cursor: pointer" @click="showModal(1)"><img src="@/assets/mape.png" alt="">免于入境验证金额(美元)</p>
                            <p class="p2">0</p>
                        </Col> -->
                        <Col class="col" span="4">
                            <p  class="p1"><img src="@/assets/mape.png" alt="">入境验证批次</p>
                            <p class="p2">{{entryCount}}</p>
                            
                        </Col>
                    </Row>
                </div>
                <div class="content-detail">
                    <Row style="height: 50px">
                        <Col class="col" span="4"><span>开具证明函份数：{{proof}}</span></Col>
                        <Col class="col" span="5"><span>涉及展商数：{{sheji}}</span></Col>
                        <!-- <Col class="col" span="5"><span>提前申报数：{{tiqian}}</span></Col> -->
                        <Col class="col" span="5"><span>提前申报数：0</span></Col>
                        <Col class="col" span="5"><span>快速提离数：{{tili}}</span></Col>
                        <Col class="col" span="5">
                        <span style="cursor: pointer;color:red" @click="showModal(0)" v-if="dataA >18000">担保额度监控：2(亿元) / {{dataA}}(万元)  <p>额度已低于2000万元</p> </span>
                        <span style="cursor: pointer" @click="showModal(0)" v-else>担保额度监控：2(亿元) / {{dataA}}(万元)</span>
                        </Col>
                    </Row>
                    <Row  style="height: 50px">
                        <!-- <Col class="col" span="12"><span>特殊区域保税展示：{{money[1]['a']}}(万美元) / {{money[1]['b']}}(批次)</span></Col>
                        <Col class="col" span="12"><span>保税仓库保税展示：{{money[2]['a']}}(万美元) / {{money[2]['b']}}(批次)</span></Col> -->
                        <Col class="col" span="12"><span>特殊区域保税展示：0</span></Col>
                        <Col class="col" span="12"><span>保税仓库保税展示：0</span></Col>
                    </Row>
                </div>
            </div>
        </div>
     </div>
</template>
<script>
// import Scroll from './scroll.js'
import {mapMutations} from 'vuex'
import {publicInter} from '@/api/http'
import Scroll from '@/views/exhibits/exhibitionShow/exhibitionOne/scroll.js'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            
            WITHDRAWAL:0, //退运
            DESTRUCTION:0,//销毁
            ELIMINATIONOFPESTS:0, //除害多少件
            ELIMINATIONOFPESTSNOTE:'', //除害备注
            CONCESSIONENTRY:0, // 特许进境动植物检疫审批
            SAMPLEDELIVERED:0, //监测送样(批)
            SAMPLEDELIVEREDNOTE:'', // 检测备注

            //入境验证批次
            entryCount:0,
            //训馆记录
            xgNum:0,

             foodNormal:'0',
             foodSpectial:'0',

            //禁止类的model
            forbidModal:false,
            forbidNum:0,
            forbidPrice:0,
            forbidTable:[],
            columns1:[
                {
                    title:'序号',
                    key:'RN',
                    align:'center',
                    width:'80'
                },
                {
                    title:'展商中文名称',
                    key:'EXHIBITORCOMPANYNAME',
                    align:'center',
                },
                {
                    title:'原产地',
                    key:'ORIGINCOUNTRY',
                    align:'center',
                    width:'120'
                },
                
                {
                    title:'展品名称',
                    key:'EXHIBITORNAME',
                    align:'center',
                },
                {
                    title:'数量（件）',
                    key:'QUANTITY',
                    align:'center',
                    width:'120'
                },
                {
                    title:'金额（美元）',
                    key:'TOTALPRICE',
                    align:'center',
                },
                {
                    title:'申报单位',
                    key:'DECLAREAGENTNAME',
                    align:'center',
                    width:'200'
                },
                {
                    title:'规则提示',
                    key:'REMINDERCODE',
                    align:'center',
                    render:(h,params)=>{
                        return h('div',[
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    width:'100%',
                                    overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    whiteSpace:'nowrap'
                                },
                                domProps:{
                                    title:params.row.REMINDERCODE
                                }
                            },params.row.REMINDERCODE)
                        ])
                    },
                }
            ],
            forbidTotal:0,


            //限制类 清单数据
            restrictModal:false,
            restrictNum:0,
            restrictPrice:0,
            restricTable:[],
            columns2:[
                {
                    title:'序号',
                    key:'RN',
                    align:'center',
                    width:'80'
                },
                {
                    title:'展商中文名称',
                    key:'EXHIBITORCOMPANYNAME',
                    align:'center',
                },
                {
                    title:'原产地',
                    key:'ORIGINCOUNTRY',
                    align:'center',
                    width:'120'
                },
                
                {
                    title:'展品名称',
                    key:'EXHIBITORNAME',
                    align:'center',
                },
                {
                    title:'数量（件）',
                    key:'QUANTITY',
                    align:'center',
                    width:'120'
                },
                {
                    title:'金额（美元）',
                    key:'TOTALPRICE',
                    align:'center',
                },
                {
                    title:'申报单位',
                    key:'DECLAREAGENTNAME',
                    align:'center',
                    width:'200'
                },
               {
                    title:'规则提示',
                    key:'REMINDERCODE',
                    align:'center',
                    render:(h,params)=>{
                        return h('div',[
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    width:'100%',
                                    overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    whiteSpace:'nowrap'
                                },
                                domProps:{
                                    title:params.row.REMINDERCODE
                                }
                            },params.row.REMINDERCODE)
                        ])
                    },
                }
            ],
             restrictTotal:0,
            onOff:false,
            CHKNUM:0,
            record:0,
            proof:0,
            sheji:0,
            tiqian:0,
            tili:0,
            dataA:0,
            dataTable:[],
            mianyu:{ZJE:0,ZJS:0,ZPC:0},
            questionRecord:[],
            money:[
                {a:0,b:0},
                {a:0,b:0},
                {a:0,b:0},
                {a:0,b:0}
            ],
            rangerList:[],
            modalShow:false
        }
    },
    created(){
        this.initData();
    },
    beforeMount(){
        
    },
    mounted(){
        this.queryforbidNum()
        this.queryrestrictNum()
        this.queryFoodNormal()
        this.queryFoodSpectial()
        this.queryStrengthen()
        this.queryEntryVeify()
    },
    methods:{
        //hscode 对比
     queryEntryVeify(){
      let data = {}
       publicInter(interfaceUrl.queryEntryVeify,data).then(r=>{
               // console.log(r)
                this.entryCount = r.count
         }) 
    },
     
      queryStrengthen(){
        let data = {}
       publicInter(interfaceUrl.queryStrengthen,data).then(r=>{
          // console.log(r)
                this.WITHDRAWAL = r.list[0].WITHDRAWAL ? r.list[0].WITHDRAWAL: 0 //退运
                this.DESTRUCTION = r.list[0].DESTRUCTION ? r.list[0].DESTRUCTION: 0  //销毁
                this.ELIMINATIONOFPESTS = r.list[0].ELIMINATIONOFPESTS ? r.list[0].ELIMINATIONOFPESTS: 0  //除害多少件
                this.ELIMINATIONOFPESTSNOTE = r.list[0].ELIMINATIONOFPESTSNOTE ? r.list[0].ELIMINATIONOFPESTSNOTE: ""  //除害多少件
                this.CONCESSIONENTRY = r.list[0].CONCESSIONENTRY ? r.list[0].CONCESSIONENTRY: 0 //特许进境动植物检疫审批
                this.SAMPLEDELIVERED = r.list[0].SAMPLEDELIVERED ? r.list[0].SAMPLEDELIVERED: 0 //退运
                this.SAMPLEDELIVEREDNOTE = r.list[0].SAMPLEDELIVEREDNOTE ? r.list[0].SAMPLEDELIVEREDNOTE: ""  //除害    
         }) 
      },

        //一般审批
      queryFoodNormal(){
          let data= {
              APPROVETYPE:"1"
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
                //console.log(r)
                this.foodNormal = r.totalRow;
         }) 
      },
      //特殊审批
      queryFoodSpectial(){
          let data= {
              APPROVETYPE:"2"
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
                //console.log(r)
                this.foodSpectial = r.totalRow;
         }) 
      },
       //显示担保额度的页面 方法
     showdbModal(){
         this.danbaoModal = true
     },


        // 表格行列奇数偶数判断
        rowClassName(row,index){
        if(index%2 ==0){
            return 'ivu-table-stripe-even'
        }
        else return 'ivu-table-stripe-odd'
        },

        //禁止类的请求
        forbid(){
           this.forbidModal = true
            let data = {
                limitOrForbid:1,
                pageNum:1,
                pageSize:10
            }
            publicInter(interfaceUrl.queryLimitMessage,data).then(r=>{
                this.forbidTable = r.data
                this.forbidTotal = r.total
         }) 
        },
        queryforbidNum(){
          let data = {
              limitOrForbid:"1"
          };
         publicInter(interfaceUrl.queryLimitOrForbiddenMessage,data).then(r=>{
             this.forbidNum = r.data[0].SUMUNIT
             this.forbidPrice = (r.data[0].SUMPRICE /10000) .toFixed(2)
         }) 
        },

        //禁止类分页
        changePageforbid(page){
         let pageNum = page;
          let data = {
               pageNum,
               pageSize:10,
               limitOrForbid:1,
            }
            publicInter(interfaceUrl.queryLimitMessage,data).then(r=>{
                this.forbidTable = r.data
                this.forbidTotal = r.total
         }) 
        },


        //限制类的请求、函数
       restrict(){
           this.restrictModal = true
            let data = {
                limitOrForbid:2,
                pageNum:1,
                pageSize:10
            }
            publicInter(interfaceUrl.queryLimitMessage,data).then(r=>{
               this.restricTable = r.data
               this.restrictTotal = r.total
         }) 
       },
       queryrestrictNum(){
              let data = {
              limitOrForbid:"2"
          };
         publicInter(interfaceUrl.queryLimitOrForbiddenMessage,data).then(r=>{
           
             this.restrictNum = r.data[0].SUMUNIT
             this.restrictPrice = (r.data[0].SUMPRICE/10000).toFixed(2)
         })
       },

       //限制类分页
       changePagerestrict(page){
           let pageNum = page;
            let data = {
               pageNum,
               pageSize:10,
               limitOrForbid:2,
            }
            publicInter(interfaceUrl.queryLimitMessage,data).then(r=>{
                this.restricTable = r.data
                this.restrictTotal = r.total
         }) 
       },




        ...mapMutations('exhibitionStore',[
            'viewChange'
        ]),
        showUnusual() {
            this.modalShow = true
        },
        approve(){
            this.viewChange([false,true])
            this.$emit('Tclick')
        },
        showModal(num){
            this.$emit('modalShow',num)
        },
        recordHandle(){
           //(this.rangerList)
            this.$emit('recordDetail',this.rangerList)

        },
        initData(){
            /**
            *展品入境查验数
            */
             publicInter(interfaceUrl.chkStatistics,{}).then(r=>{
                if(r.code===200){
                    this.CHKNUM=r.CHKNUM
                    // this.CHDNUM=r.CHDNUM
                }
            })
            /**
             *特殊区域保税展示、保税仓库保税展示、特殊区域转展览品、保税仓库转展览品   
             */
            publicInter(interfaceUrl.queryOptimalService,{}).then(r=>{
                if(r.isOk){
                    r.msg.forEach(element => {
                        this.money[element.SERVICE_TYPE]={a:element.SERVICE_TOTAL||0,b:element.SERVICE_BATCH||0}    
                    });

                }
            })
            /**
             *担保额度监控
             */
            publicInter(interfaceUrl.queryStatisticUsedQuota,{}).then(r=>{
                if(r.code===200){
                    this.dataA=(r.USED_QUOTA/10000).toFixed(0)
                   
                }
            })
            /**
             *快速提离数
             */
            publicInter(interfaceUrl.queryExpoToPort,{}).then(r=>{
                if(r.isOk){
                    this.tili=r.totalRow
                }
            })
            /**
             *提前申报数
            */
            publicInter(interfaceUrl.queryStatisticDeclare,{}).then(r=>{
                if(r.code===200){
                    this.tiqian=r.NUM;
                }

            }),
            /***
             *已开具证明函份数
             */
            publicInter(interfaceUrl.proof,{status:"7"}).then(r=>{
                if(r.code===200){
                    this.proof=r.NUM
                }
            })
            /**
             *涉及展商数
             */
            publicInter(interfaceUrl.national,{}).then(r=>{
                if(r.code===200){
                    this.sheji=r.COMPANYTOTAL
                }
            })
            /**
             *免于验证类
             */
            publicInter(interfaceUrl.LPreferential,{}).then(r=>{
                if(r.code===200){
                    this.mianyu.ZJE=r.ZJE
                    this.mianyu.ZJS=r.ZJS
                    this.mianyu.ZPC=r.ZPC
                    this.dataTable=r.body
                }
            })
            /**
             *巡展记录数
            */
             publicInter(interfaceUrl.queryPatrolRecord,{}).then(r=>{
                // if(r.PRCOUNT){
                //     this.record=r.PRCOUNT
                //     r.PRList.forEach(item=>{
                //         this.questionRecord.push(item.PMCOUNT)
                //     })
                    
                // }
                //console.log(r)
                this.xgNum = r.count

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.lineFun{
  &:before,&:after{
    content: '';
    width: 1px;
    height: 80%;
    position: absolute;
    background: rgba(29,234,255,.5);
    top: 10%;
  }
  &:before{
    left: -5%;
  }
  &:after{
    right: -5%;
  }
}
.JY{
    width: 100%;
    height: 100%;
    padding: 1rem;
     >ol{
        list-style: none;
        display: flex;
        width: 15rem;
        margin: 0 auto;
        padding: 0;
        border: 1px solid rgba(29,234,255,.5);
        position: relative;
        @extend .lineFun;
        li{
          width: 50%;
          text-align: center;
          color: #fff;
          padding: .3rem 0;
          cursor: pointer;
          font-size: 1rem;
          &.active{
            background:linear-gradient(170deg, #116B89 0%,rgba(17,107,137,.3) 70%);
          }
          &:first-child{
            border-right: 1px solid rgba(29,234,255,.5);
          }
        }
      }
      .swipper-view{
        height: calc(100% - 1.5rem);
        padding-top: .5rem;
        width: 100%;
        overflow: hidden;
        .swipper{
          width: 200%;
          height: 100%;
          display: flex;
          flex-wrap: nowrap;
          transition: all 1s ease-in;
          -moz-transition: all 1s ease-in;
          -webkit-transition: all 1s ease-in;
          -ms-transition:all 1s ease-in;
          -o-transition: all 1s ease-in;
          justify-content: flex-start;
          &.active{
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
              -o-transform: translateX(-50%);
          }
          .swipper-item{
            display:flex;
            
            justify-content: space-between;
            width: 50%;
            height: 100%;
            .item-left{
              width: 35%;
              min-width: 12rem;
              height: 100%;
              padding: 0.5rem;
              border: 1px solid #F4A213;
              background: rgba(244,162,19,0.10);
              &.blue{
                  border-color: #0037B2;
                  
              }
              >ol{
                margin: 0;
                padding: 0;
                height: 100%;
                list-style: none;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                li{
                  color: #FFA71A;
                  font-size: .9rem;
                  line-height: 1.15;
                  span{
                    color: #fff;
                    display: inline-block;
                    margin-top: .4rem;
                  }
                }
              }
            }
            .item-right{
              width: 55%;
              height: 100%;
              &.blue{
                  >ul{
                      >li{
                          >div{
                              border-color: #0037B2;
                              color: #1deaff;
                          }
                      }
                  }

              }
              >ul{
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                list-style: none;
                >li{
                  height: 30%;
                  transform-style: preserve-3d;
                  -webkit-transition:  transform 1s ease-in-out ;
                  -moz-transition:  transform 1s ease-in-out ;
                  -ms-transition:  transform 1s ease-in-out;
                  -o-transition:  transform 1s ease-in-out ;
                  transition:  transform 1s ease-in-out;
                  position: relative;
                  max-height: 3.5rem;
                  &:first-child{
                      z-index: 11;
                      >div{
                        cursor: pointer;
                        &:hover{
                            >a{
                                display: block;
                                opacity: 1;
                            }
                        } 
                    }
                  }
                  &.active{
                    -webkit-transform: rotateX(180deg);
                    -moz-transform: rotateX(180deg);
                    -ms-transform: rotateX(180deg);
                    -o-transform: rotateX(180deg);
                    transform: rotateX(180deg);
                  }
                  &:nth-child(2){
                      transition-delay: .5s;
                      -moz-transition-delay: .5s;
                      -o-transition-delay: .5s;
                      -webkit-transition-delay: .5s;
                      -ms-transition-delay:.5s;
                      cursor: pointer;
                  }
                  &:last-child{
                      transition-delay: 1s;
                      -moz-transition-delay: 1s;
                      -o-transition-delay: 1s;
                      -webkit-transition-delay: 1s;
                      -ms-transition-delay:1s;
                  }
                  >div{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #F4A213;
                    backface-visibility: hidden;
                    -moz-backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    -ms-backface-visibility: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: .5rem;
                    color: #F4A213;
                    font-size: .9rem;
                    >a{
                        &.aa{
                            width: 80%;
                        }
                        position: absolute;
                        left: 0;
                        top: 54px;
                        width: 50%;
                        display: none;
                        font-size: .9rem;
                        color:  #F48000;
                        background: #090D39;
                        border-radius: 4px;
                        padding: 10px;
                        opacity: 0;
                        border: 1px solid  #F4A213;
                        transition: all 0.3s ease-in;                               
                        box-shadow: 0 2px 4px 0 rgba(0,96,183,0.10);
                        b{
                            color: #f48000;
                        }
                    }
                    img{
                      width: 1rem;
                      height: 1rem;
                      margin-top: -3px;
                      vertical-align: middle;
                      margin-right: 5px;
                    }
                    b{
                      color: #fff;
                      font-size: .8rem;
                    }
                    &.last{
                      transform: rotateX(-180deg);
                    }
                  }
                }
              }
              
            }
          }
        }
        
      }
}
.itemOne{
    >li{
        height: 18%;
        &:last-child{
            height:24%;
            min-height: 2.5rem;
            &:hover{
                span{
                    cursor: pointer;
                    text-decoration: underline;

                }
                
            }

        }

    }

}

.itemOne,.itemTwo{
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0 0 0 .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    li{
        font-size: .78rem;
        color: #1deaff;
        span{
            color: #fff;
        }
    }
    
}

.supervision {
    width: 100%;
    height: 55%;
    .title {
        margin-bottom: 20px;
        span {
            
            height: 2rem;
            color: #fff;
            width: auto;
            left: -1.5rem;
            // margin: 0 auto;
            text-align: center;
            // display: block;
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
    .top {
        width: 100%;
        height: 102px;
        .top-left {
            width: 50%;
            height: 100%;
            float: left;
            .content{
                float: left;
                width: 30%;
                height: 100%;
                // margin-left: 3%;
                border: 1px solid;
                
                p {
                    color: #FFFFFF
                }
                .p1 {
                    font-size: 1rem;
                    margin-top: 15px
                }
                .p2 {
                    font-size: 1.125rem;
                    margin-top: 10px
                }
            }
        }
        .top-right {
            width: 50%;
            height: 100%;
            float: left;
            text-align: left;
            .detail {
                height: 45%;
                .content {
                    display: inline-block;
                    height: 48px;
                    width: 218px;
                    border: 1px solid #f4a213;
                    // margin-left: 3%;
                    width: 30%;
                    padding: 0 10px;
                    span {
                        line-height: 48px;
                        height: 48px;
                    }
                    .name {
                        color: #f4a213;
                        font-size: 0.875rem;
                        float: left;
                    }
                    .value {
                        color: #fff;
                        font-size: 1.125rem;
                        float: right;
                    }
                }
            }
        }
        .top-left::after {
            display: block;
            clear: both;
            content: '';
            height: 0;
        }
    }
    .record {
        margin-top: 20px;
        width: 100%;
        height: 300px;
        color: #FFF;
        font-size: 14px;
        .record-left {
            width: 50%;
            height: 100%;
            float: left;
            height: 100%;
            .records {
                // margin-left: 3%;
                border: 1px solid #1f5ff2;
                .records-title {
                    border-bottom: 1px solid #1f5ff2; 
                    background: #112a6d; 
                    height: 48px; 
                    line-height: 48px;
                    font-size: 18px
                }
                .rows {
                    font-size: 14px;
                    line-height: 40px;
                    height: 40px;
                   
                    .rows-content {
                        border-right: 1px solid rgba(255,255,255,0.05);
                        padding: 0 20px;
                        .value {
                            color: #ffc83e
                        }
                    }
                }
            }
        }
        .record-right {
            width: 50%;
            height: 100%;
            float: left;
        }
    }
}
.records {
                // margin-left: 3%;
                // border: 1px solid #1f5ff2;
                .records-title {
                    border-bottom: 1px solid #1f5ff2; 
                    background: #112a6d; 
                    height: 48px; 
                    line-height: 48px;
                    font-size: 18px
                }
                .rows {
                    font-size: 14px;
                    line-height: 40px;
                    height: 40px;
                   
                    .rows-content {
                        border-right: 1px solid rgba(255,255,255,0.05);
                        padding: 0 20px;
                        .value {
                            color: #ffc83e
                        }
                    }
                }
            }

.h-center{
    display: flex;
    .forbid{
        display: flex;
        width: 340px;
        height: 110px;
        background-color: #e52f5d;
        margin-top: 20px;
        border-radius: 5px;
        cursor: pointer;
        .forbid_left{
            height: 100%;
            width: 35%;
            margin-top: 10px;
            i{
                background-color: #bd274d;
                color: #e52f5d;
                border-radius: 18px;
            }
            p{
                margin-top: 10px;
                font-size: 18px;
                color: #fff;
                font-weight: bold;
            }
        }
        .forbid_center{
            margin-top: 10px;
            height: 90px;
            width: 1px;
            border: 1px solid #fff;
            opacity: 0.3;
        }
        .forbid_right{
            height: 100%;
            width: 65%;
            ul{
                li{
                    list-style: none;
                    width: 100%;
                    height: 55px;
                    font-size: 14px;
                    color: #fff;
                    line-height: 55px;
                    span{
                        font-size: 28px;
                        margin-right: 12px;
                    }
                }
            }
        }
    }
    .restrict{
        display: flex;
        width: 340px;
        height: 110px;
        background-color: #1f5ff2;
        margin-top: 20px;
        border-radius: 5px;
        margin-left: 20px;
        cursor: pointer;
        .restrict_left{
            height: 100%;
            width: 35%;
            margin-top: 10px;
            i{
                background-color: #063dbe;
                color: #1f5ff2;
                border-radius: 18px;
            }
            p{
                margin-top: 10px;
                font-size: 18px;
                color: #fff;
                font-weight: bold;
            }
        }
        .restrict_center{
            margin-top: 10px;
            height: 90px;
            width: 1px;
            border: 1px solid #fff;
            opacity: 0.3;
        }
        .restrict_right{
            height: 100%;
            width: 65%;
            ul{
                li{
                    list-style: none;
                    width: 100%;
                    height: 55px;
                    font-size: 14px;
                    color: #fff;
                    line-height: 55px;
                    span{
                        font-size: 28px;
                        margin-right: 12px;
                    }
                }
            }
        }
    }
}  
 //禁止限制自定义的弹框
 
    .modalBody{
        width: 1400px;
        height: 700px;
        margin: auto;
        h1{
            text-align: center;
            margin-top: 10px;
            font-size: 20px;
            color: #fff;
        }
     }
   
.services {
    
    width: 100%;
    height: 45%;
    margin-top: 5%;
    .title {
        span {
            
            height: 2rem;
            color: #fff;
            width: auto;
            left: -1.5rem;
            // margin: 0 auto;
            text-align: center;
            // display: block;
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
    .services-content {
        margin-top: 20px;
        .content-head {
            height: 90px;
            .col {
                border: 1px solid #1deaff;
                p{
                    line-height: 45px;
                    height: 45px;
                }
                .p1 {
                    font-size: 18px;
                    color: #fff;
                    img {
                        height: 26px;
                        width: 26px;
                        vertical-align: middle;
                        margin-right: 10px;
                    }
                }
                .p2 {
                    font-size: 24px;
                    color: #1deaff;
                    
                }
            }
        }
        .content-detail {
            background: #0c1435;
            margin-top: 20px;
            height: 100px;
            border: 1px solid rgba(31, 95, 242, 0.5);
            .col {
                color: #fff;
                border: 1px solid rgba(255,255,255,0.05);
            }
            span {
                vertical-align: middle;
                height: 50px;
                line-height: 50px;
                font-size: 18px;
                margin-left: 10px;
                float: left
            }
        }
    }
}
</style>



