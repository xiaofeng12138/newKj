<template>
    <div class="jy">
        <div class="jy_header">
            <div class="jy_header_left">
                <div class="dzw_left">
                    <p class="p1">一般进境动植物审批</p>
                    <p class="p2">{{GENERALANIMAL}}</p>
                </div>
                <div class="dzw_right">
                    <p class="p1">特许进境动植物审批</p>
                    <p class="p2">{{CONCESSIONENTRY}}</p>
                </div>
            </div>
            <div class="jy_header_mid">
                 <div class="aq_left">
                    <p class="p1">入境检疫人员数</p>
                    <p class="p2">{{PRECISIONQUARANTINE}}</p>
                </div>
                <div class="aq_right">
                    <p class="p1">检疫发现有症状人员数</p>
                    <p class="p2">{{PORTENTRYEXIT}}</p>
                </div>
            </div>
            <!-- <div class="jy_header_right">
                <div class="aq_left">
                    <p class="p1">入境验证批次</p>
                    <p class="p2">{{entryCount}}</p>
                </div>
            </div> -->
        </div>

        <div class="jy_nav">
          <div class="jy_nav_box">
              <ul>
                  <span class="p1">风险检测送样（批）</span>
                  <span class="p2">{{SAMPLEDELIVERED}}</span>
              </ul>
          </div>
          <div class="jy_nav_box cursor" @click="showFood">
              <span class="p1">食品检疫审批（批）</span>
              <span class="p2">{{foodModalTotal}}</span>
          </div>
          <div class="jy_nav_box">
              <span class="p1">退运（件）</span>
              <span class="p2 f_right">{{WITHDRAWAL}}</span>
          </div>
          <!-- <div class="jy_nav_box">
               <span class="p1">除害（件）</span>
               <span class="p2 f_right">{{ELIMINATIONOFPESTS}}</span>
          </div> -->
          <div class="jy_nav_box">
              <span class="p1">销毁（件）</span>
              <span class="p2 f_right">{{WITHDRAWAL}}</span>
          </div>
          <div class="jy_nav_box cursor" @click="specialFood">
              <span class="p1 ">特许食品检疫审批</span>
              <span class="p2">{{specialFoodTotal}}</span>
          </div>
        </div>

        <div class="jy_mid">
          <div class="jy_mid_left">
             <ul>
                 <li style="border-left:none">
                     <p class="p1">展品入境查验数</p>
                     <p class="p2">{{EXHIBITSENTRYNUM}}</p>
                 </li>
                 <li>
                     <p class="p1">展品入境查获数</p>
                     <p class="p2">{{EXHIBITSGETNUM}}</p>
                 </li>
                 <li>
                     <p class="p1">巡展记录</p>
                     <Icon @click="showTable" type="ios-alert-outline" size="30" style="color:red;float:right;margin-top:-1rem;margin-right:1rem;cursor: pointer"/>
                     <p class="p2">{{tableCount}}</p>
                 </li>
                 <li>
                     <p class="p1">ATA批次/金额(万美元)</p>
                    <p class="p2">{{ATADELAY}}/{{ATAprice}}</p>
                 </li>
                 <!-- <li>
                     <p class="p1">禁止类变限制类</p>
                    <p class="p2">{{FORBIDENTOLIMIT}}</p>
                 </li> -->
             </ul>
          </div>
          <div class="jy_mid_right">
             <!-- 禁止限制类列表展示 -->
                <div class="h-center">
                <div class="forbid" @click="forbid" >
                    <div class="forbid_left" style="background-color:#391839">
                        <Icon type="ios-close-circle-outline" size="40"/>
                        <p>被禁止</p>
                    </div>
                    <div class="forbid_center"></div>
                    <div class="forbid_right"  style="background-color:#391839">
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

                  <div class="restrict" @click="restrict"  >
                    <div class="restrict_left" style="background-color:#185DF7">
                         <Icon type="ios-alert-outline" size="40"/>
                        <p>被限制</p>
                    </div>
                    <div class="restrict_center"></div>
                    <div class="restrict_right" style="background-color:#185DF7">
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
          </div>
        </div>
        <jyBottom />

    




    <!-- 一般食品检疫审批Modal -->
        <Modal
            v-model="foodModal"
                width = "1300px"
                :footer-hide = true
                :mask-closable = "false"
                class="forbidBody"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="foodModal=false" size='30' />
            </p>
               
                <h2 style="text-align:center;color:#fff">进境食品检疫明细</h2>
                 <Table   border :columns = 'columns1' :data='foodTable'   class="self" style="margin-top:20px">
                 </Table>
                <Page :total= foodModalTotal show-total :page-size=10 @on-change="changeFoodModal" style="text-align:center;margin-top:20px"/> 
              
        </Modal>
        <!-- 特许食品检疫审批Modal -->
        <Modal
            v-model="specialFoodModal"
                width = "1300px"
                :footer-hide = true
                :mask-closable = "false"
                class="forbidBody"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="specialFoodModal=false" size='30' />
            </p>
               
                <h2 style="text-align:center;color:#fff">特许进境食品检疫明细</h2>
                 <Table   border :columns = 'columns2' :data='specialFoodTable'   class="self" style="margin-top:20px">
                 </Table>
                <Page :total= specialFoodTotal show-total :page-size=10 @on-change="changeSpecialFoodModal" style="text-align:center;margin-top:20px"/> 
              
        </Modal>

        <!-- 巡展记录Modal -->
        <Modal
            v-model="showTableModal"
                width = "1330px"
                :footer-hide = true
                :mask-closable = "false"
                class="forbidBody"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="showTableModal=false" size='30' />
            </p>
              <h2 style="text-align:center;color:#fff">展位核查异常数量</h2>
              <showTableView /> 
        </Modal>

        <!-- 禁止类型的Modal -->
        <Modal
                v-model="forbidModal"
                     width = "1500px"
                    :footer-hide = true
                    :mask-closable = "false"
                    class="forbidBody"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="forbidModal=false" size='30' />
                </p>
                <h2 style="text-align:center;color:#fff">被禁止清单</h2>
                <Table   border :columns = 'columns3' :data='forbidTable'   style="margin-top:20px">
                 </Table>
                  <Page :total=forbidTotal show-total :page-size=10 @on-change="changePageforbid"/>
       </Modal>

        <!-- 限制类型的Modal --> 
        <Modal
                v-model="restrictModal"
                     width = "1500px"
                    :footer-hide = true
                    :mask-closable = "false"
                    class="forbidBody"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="restrictModal=false" size='30' />
                </p>
                <h2 style="text-align:center;color:#fff">被限制清单</h2>
                <Table   border :columns = 'columns4' :data='restricTable'   style="margin-top:20px">
                 </Table>
                  <Page :total=restrictTotal show-total :page-size=10 @on-change="changePagerestrict"/>
        </Modal>
        
    </div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from "@/api/http";
import showTableView from './showTable';
import jyBottom from './jybottom'
export default {
    components:{
        showTableView,jyBottom
    },
    data(){
        return{
            //食品审批类型
            foodModal:false, //食品审批modal
            foodTable:[],
            foodModalTotal:0,
            columns1:[
                {
                    title: "国家/地区",
                    key: "COUNTRY",
                    align:'center'
                },
                {
                    title: "展品名称",
                    key: "EXHIBITSNAME",
                    align:'center'
                },
                {
                    title: "重量",
                    key: "WEIGHT",
                    align:'center'
                },
                {
                    title: "单位",
                    key: "UNITNAME",
                    align:'center'
                },
                {
                    title: "审批方式",
                    key: "APPROVETYPE",
                    align:'center'
                }
            ],

            //特许食品审批类型
            specialFoodModal:false,
            specialFoodTable:[],
            specialFoodTotal:0,
             columns2:[
                {
                    title: "国家/地区",
                    key: "COUNTRY",
                    align:'center'
                },
                {
                    title: "展品名称",
                    key: "EXHIBITSNAME",
                    align:'center'
                },
                {
                    title: "重量",
                    key: "WEIGHT",
                    align:'center'
                },
                {
                    title: "单位",
                    key: "UNITNAME",
                    align:'center'
                },
                {
                    title: "审批方式",
                    key: "APPROVETYPE",
                    align:'center'
                }
            ],

              
            WITHDRAWAL:0, //退运
            DESTRUCTION:0,//销毁
            ELIMINATIONOFPESTS:0, //除害多少件
            ELIMINATIONOFPESTSNOTE:'', //除害备注
            CONCESSIONENTRY:0, // 特许进境动植物检疫审批
            SAMPLEDELIVERED:0, //监测送样(批)
            SAMPLEDELIVEREDNOTE:'', // 检测备注
            PRECISIONQUARANTINE:0,//埃博拉
            PORTENTRYEXIT:0 ,//确诊的
            EXHIBITSENTRYNUM:0 ,//展品入境查验数
            EXHIBITSGETNUM:0, //查获数
            ATADELAY:0 , //ATA
            ATAprice:0,
            FORBIDENTOLIMIT:0, //禁止变限制
            GENERALANIMAL:0,

            entryCount:0, //入境验证批次

            //巡展记录Modal
            showTableModal:false,
            tableCount:0, //记录表数量

            //禁止限制类数据
            forbidNum:0,  //禁止数量
            forbidPrice:0, //禁止价格
            forbidModal:false,
            forbidTable:[],
            forbidTotal:0,
             columns3:[
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

            //限制类数据
            restrictNum:0,
            restrictPrice:0,
            restrictModal:false,
            restrictTotal:0,
            restricTable:[],
            columns4:[
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
        }
    },
    mounted(){
        //一般食品审批
        this.queryFoodNormal()
        //特许审批
        this.queryFoodSpectial()
        //除害那一行
        this.queryStrengthen()

        //验证批次
        this.queryEntryVeify()
        this.queryPatrolRecord() //记录表数量查询

        //禁止限制请求
        this.queryforbidNum()
        this.queryrestrictNum()
        //查询ata延期
        this.queryATA()
        this.queryFBX()

    },
    methods:{
        //一般食品审批modal
        showFood(){
            this.foodModal = true;
        },
       queryFoodNormal(){
          let data= {
              APPROVETYPE:"1",
              pageNum:1,
              pageSize:10
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
             
                this.foodTable = r.list;
                this.foodModalTotal = r.totalRow
         }) 
      },
       //分页
      changeFoodModal(page){
         let data= {
              APPROVETYPE:"1",
              pageNum:page,
              pageSize:10
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
                this.foodTable = r.list;
                this.foodModalTotal = r.totalRow
         }) 
      },

      //特许食品审批
      specialFood(){
          this.specialFoodModal = true
      },

      queryFoodSpectial(){
          let data= {
              APPROVETYPE:"2",
              pageNum:1,
              pageSize:10
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
               this.specialFoodTable = r.list;
               this.specialFoodTotal = r.totalRow;
         }) 
      },
      //特许食品分页
        changeSpecialFoodModal(page){
            let data= {
                APPROVETYPE:"2",
                pageNum:page,
                pageSize:10
            }
            publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
                    this.specialFoodTable = r.list;
                    this.specialFoodTotal = r.totalRow
            })
           },

           queryStrengthen(){
                let data = {}
                publicInter(interfaceUrl.queryStrengthen,data).then(r=>{
                    console.log('r',r)
                            if(r.list.length>0){
                                this.WITHDRAWAL = r.list[0].WITHDRAWAL ? r.list[0].WITHDRAWAL: 0 //退运
                                this.DESTRUCTION = r.list[0].DESTRUCTION ? r.list[0].DESTRUCTION: 0  //销毁
                                this.ELIMINATIONOFPESTS = r.list[0].ELIMINATIONOFPESTS ? r.list[0].ELIMINATIONOFPESTS: 0  //除害多少件
                                this.ELIMINATIONOFPESTSNOTE = r.list[0].ELIMINATIONOFPESTSNOTE ? r.list[0].ELIMINATIONOFPESTSNOTE: ""  //除害多少件
                                this.CONCESSIONENTRY = r.list[0].CONCESSIONENTRY ? r.list[0].CONCESSIONENTRY: 0 //特许进境动植物检疫审批
                                this.SAMPLEDELIVERED = r.list[0].SAMPLEDELIVERED ? r.list[0].SAMPLEDELIVERED: 0 //退运
                                this.SAMPLEDELIVEREDNOTE = r.list[0].SAMPLEDELIVEREDNOTE ? r.list[0].SAMPLEDELIVEREDNOTE: ""  //除害    
                                this.PRECISIONQUARANTINE = r.list[0].PRECISIONQUARANTINE ? r.list[0].PRECISIONQUARANTINE: 0 //埃博拉
                                this.PORTENTRYEXIT = r.list[0].PORTENTRYEXIT ? r.list[0].PORTENTRYEXIT: 0 //埃博拉
                                this.EXHIBITSENTRYNUM = r.list[0].EXHIBITSENTRYNUM ? r.list[0].EXHIBITSENTRYNUM: 0 
                                this.EXHIBITSGETNUM = r.list[0].EXHIBITSGETNUM ? r.list[0].EXHIBITSGETNUM: 0 
                                this.FORBIDENTOLIMIT = r.list[0].FORBIDENTOLIMIT ? r.list[0].FORBIDENTOLIMIT: 0 
                                this.GENERALANIMAL = r.list[0].GENERALANIMAL ? r.list[0].GENERALANIMAL: 0 
                            }
                            
                  
                  
                  }) 
                },

                //入境验证批次
            queryEntryVeify(){
                let data = {}
                publicInter(interfaceUrl.queryEntryVeify,data).then(r=>{
                    if(r.code =='200'){
                       this.entryCount = r.count;
                    }else{
                        this.entryCount = 0;
                    } 
                  }) 
                },

                queryATA(){
                     let data = {}
                    publicInter(interfaceUrl.queryATAPostpone,data).then(r=>{
                        console.log('rrr',r)
                        if(r.code =='200'){
                           this.ATADELAY = r.NUM;
                           this.ATAprice = (r.PRICE/10000).toFixed(0)
                        }else{
                            this.ATADELAY = 0;
                             this.ATAprice = 0
                        } 
                    }) 
                },
                //查询禁止变限制类
                  queryFBX(){
                     let data = {}
                    publicInter(interfaceUrl.queryForbidToLimit,data).then(r=>{
                        // console.log(r)
                        if(r.code =='200'){
                        this.FORBIDENTOLIMIT = r.count;
                        }else{
                            this.FORBIDENTOLIMIT = 0;
                        } 
                    }) 
                },

                //显示巡展记录
                showTable(){
                    this.showTableModal = true
                },

                //记录表数量查询
             queryPatrolRecord(){
                let data = {}
                publicInter(interfaceUrl.queryPatrolRecord,data).then(r=>{
                   r.count ? this.tableCount  = r.count :this.tableCount  = 0
                  }) 
                },

                //禁止限制类请求
                 queryforbidNum(){
                    let data = {
                        limitOrForbid:"1"
                    };
                    publicInter(interfaceUrl.queryLimitOrForbiddenMessage,data).then(r=>{
                        if(r.data[0]){
                           this.forbidNum =  r.data[0].SUMUNIT
                           this.forbidPrice = (r.data[0].SUMPRICE /10000) .toFixed(2)
                        }else{
                            this.forbidNum = 0 
                            this.forbidPrice = 0
                        }
                        
                     }) 
                    },

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


                //限制类请求
                 queryrestrictNum(){
                        let data = {
                        limitOrForbid:"2"
                    };
                    publicInter(interfaceUrl.queryLimitOrForbiddenMessage,data).then(r=>{
                        if(r.data[0]){
                            this.restrictNum = r.data[0].SUMUNIT
                            this.restrictPrice = (r.data[0].SUMPRICE/10000).toFixed(2)
                        }
                        
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

                    
         }

}
</script>
<style lang="scss">
.jy{
 .jy_header{
        display: flex;
        width: 100%;
        height: 10rem;
        margin-top: -1rem;
     
        .jy_header_left{
            display: flex;
            margin-top: 1rem;
            width: 50%;
            height: 8rem;
            border:2px solid #185DF7;
            .dzw_left{
                width: 45%;
                height: 5rem;
                background: linear-gradient(to right,#11296a,20%,#0f2156,60%,#0d183f);
                margin-top: 1.5rem;
                margin-left: 1rem;
                border-left: 3px solid #1f5ff2;
                .p1{
                    text-align: left;
                    margin-top: 1rem;
                    color: #A5A6B5;
                    font-size: 18px;
                    margin-left: 1rem;
                }
                .p2{
                text-align: left;
                margin-left: 1rem;
                font-size: 32px;
                color: #ffffff;
                margin-top: 0.5rem;
                
                }
            }
            .dzw_right{
                width: 45%;
                height: 5rem;
                background: linear-gradient(to right,#4A1C42,20%,#311839,60%,#181439);
                margin-top: 1.5rem;
                margin-left: 1rem;
                border-left: 3px solid #E72C5A;
                .p1{
                    text-align: left;
                    margin-top: 1rem;
                    color: #A5A6B5;
                    font-size: 18px;
                    margin-left: 1rem;
                }
                .p2{
                text-align: left;
                margin-left: 1rem;
                font-size: 32px;
                color: #ffffff;
                margin-top: 0.5rem;
                
                }
            }
        }
        .jy_header_mid{
            display: flex;
            margin-top: 1rem;
            margin-left: 1.5rem;
            width: 50%;
            height: 8rem;
            border:2px solid #185DF7;
            .aq_left{
                width: 45%;
                height: 5rem;
                background: linear-gradient(to right,#11296a,20%,#0f2156,60%,#0d183f);
                margin-top: 1.5rem;
                margin-left: 1rem;
                border-left: 3px solid #1f5ff2;
                .p1{
                    text-align: left;
                    margin-top: 1rem;
                    color: #A5A6B5;
                    font-size: 18px;
                    margin-left: 1rem;
                }
                .p2{
                text-align: left;
                margin-left: 1rem;
                font-size: 32px;
                color: #ffffff;
                margin-top: 0.5rem;
                
                }
            }
            .aq_right{
                width: 45%;
                height: 5rem;
                background: linear-gradient(to right,#4A1C42,20%,#311839,60%,#181439);
                margin-top: 1.5rem;
                margin-left: 1rem;
                border-left: 3px solid #E72C5A;
                .p1{
                    text-align: left;
                    margin-top: 1rem;
                    color: #A5A6B5;
                    font-size: 18px;
                    margin-left: 1rem;
                }
                .p2{
                text-align: left;
                margin-left: 1rem;
                font-size: 32px;
                color: #ffffff;
                margin-top: 0.5rem;
                
                }
            }
        }
        .jy_header_right{
            display: flex;
            margin-top: 1rem;
            margin-left: 1.5rem;
            width: 16.5rem;
            height: 8rem;
            border:2px solid #185DF7;
            .aq_left{
                width: 13rem;
                height: 5rem;
                background: linear-gradient(to right,#11296a,20%,#0f2156,60%,#0d183f);
                margin-top: 1.5rem;
                margin-left: 1rem;
                border-left: 3px solid #1f5ff2;
                .p1{
                    text-align: left;
                    margin-top: 1rem;
                    color: #A5A6B5;
                    font-size: 18px;
                    margin-left: 1rem;
                }
                .p2{
                text-align: left;
                margin-left: 1rem;
                font-size: 32px;
                color: #ffffff;
                margin-top: 0.5rem;
                
                }
            }
        }
    }

    //jy中间部分
    .jy_nav{
        display: flex;
        margin-top: 1rem;
        width: 100%;
        height: 6rem;
        border: 2px solid #185DF7;
        .jy_nav_box{
            border: 1px solid #E7BE00;
            width: 18%;
            height: 3rem;
            margin-left: 1.25rem;
            margin-top: 1.5rem;
            font-size: 18px;
            line-height: 3rem;
            color: #E7BE00;
            .p1{
                float: left;
                margin-left: 0.5rem;
            }
            .p2{
                color: #fff;
                float:right;
                margin-right: 1rem;
                font-size: 25px;
            }

        }
        .cursor{
            cursor: pointer;
            background-color: #CEA608;
            color: #fff;
        }
    }

    .jy_mid{
        display: flex;
        width: 100%;
        height: 6rem;
        margin-top: 2rem;
        .jy_mid_left{
            width: 60%;
            height: 100%;
            border: 2px solid #18CBE7;
            ul{
                display: flex;
                width: 100%;
                height: 100%;
                li{
                    list-style: none;
                    width: 25%;
                    height: 3rem;
                   // background: #000;
                    margin-top: 1.5rem;
                    border-left: 2px solid #18CBE7;
                    .p1{
                        text-align: left;
                        font-size: 18px;
                        color: #fff;
                        margin-left: 1.5rem;
                        i{
                            color: red;
                        }
                    }
                    .p2{
                        text-align: left;
                        margin-left: 1.5rem;
                        font-size: 32px;
                        color: #18CBE7;
                        margin-top: 0.5rem;
                    }
                }
            }
        }
        .jy_mid_right{
            width: 40%;
            height: 100%;
            margin-left: 2rem;
            .h-center{
                display: flex;
                .forbid{
                    display: flex;
                    width: 300px;
                    height: 6rem;
                    cursor: pointer;
                    border: 2px solid #EF6521;
                    .forbid_left{
                        height: 100%;
                        width: 35%;
                        padding-top: 20px;
                        background-color: #311839;
                        i{
                            background-color: #bd274d;
                            color: #84204A;
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
                        height: 5.8rem;
                        width: 1px;
                        border: 1px solid #EF6521;
                        opacity: 0.3;
                    }
                    .forbid_right{
                        height: 100%;
                        width: 65%;
                        background-color: #211439;
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
                    width: 300px;
                    height: 6rem;
                    margin-left: 2rem;
                    cursor: pointer;
                    border: 2px solid #185DF7;
                    .restrict_left{
                        height: 100%;
                        width: 35%;
                        padding-top: 20px;
                        background-color: #082052;
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
                        height: 5.9rem;
                        width: 1px;
                        border: 1px solid #185DF7;
                        opacity: 0.3;
                    }
                    .restrict_right{
                        height: 100%;
                        width: 65%;
                        background-color: #081842;
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
        }
    }

}
</style>
