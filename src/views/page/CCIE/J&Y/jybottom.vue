<template>
    <div class="jy_bottom">
      <div class="jy_top">
          <li style="border-left:none">
              <p class="p1">开具证明函份数：</p>
              <p class="p2">{{proof}}</p>
          </li>
          <li>
              <p class="p1">涉及展商数：</p>
              <p class="p2">{{sheji}}</p>
          </li>
          <li>
              <p class="p1">申报批次/金额(万美元)：</p>
              <p class="p2">{{tiqian}}/{{sbPrice}}</p>
          </li>
          <!-- <li>
              <p class="p1">快速提离数：</p>
              <p class="p2">{{tili}}</p>
          </li> -->
          <li v-if="nowYear==2019" style="width:32%;cursor: pointer;" class="cursor" >
              <p class="p1">担保额度监控：</p>
              <p class="p2" style="color:red" @click="showdb(1)" v-if="dataA >18000">2(亿元)/{{dataA}}(万元)  额度已低于2000万</p>
              <p class="p2" @click="showdb(1)" v-else>2(亿元)/{{dataA}}(万元)</p>
          </li>
          <li style="width:38%" v-if='nowYear==2020'>
              <div>
                <li  style="cursor: pointer; width:100%" class="cursor" >
                    <p class="p1">中国银行担保总额度/已用额度/货值：</p>
                    <div v-if='BOC.USEDAMOUNT'>
                        <p class="p2" style="color:red;font-size:18px"  @click="showdb1(1,1)" v-if="BOC.USEDAMOUNT/10000 >8000">1(亿元)/{{parseInt(BOC.USEDAMOUNT/10000)}}(万元)/{{BOC.USDTOTAL}}(美元)  额度已低于2000万</p>
                        <p class="p2" style="font-size:18px" @click="showdb1(1,1)" v-else>1(亿元)/{{parseInt(BOC.USEDAMOUNT/10000)}}(万元)/{{BOC.USDTOTAL}}(美元)</p>
                    </div>
                    <div v-else>
                        <p class="p2" style="font-size:18px">加载中</p>
                    </div>
                    
                </li>
                <li  style="cursor: pointer;width:100%" class="cursor" >
                    <p class="p1">太平洋保险担保总额度/已用额度/货值：</p>
                    <div v-if='CPIC.USEDAMOUNT'>
                        <p class="p2" style="color:red;font-size:18px" @click="showdb1(1,2)" v-if="CPIC.USEDAMOUNT/10000 >8000">1(亿元)/{{CPIC.USEDAMOUNT}}(万元)/{{CPIC.USDTOTAL}}(美元)  额度已低于2000万</p>
                        <p class="p2" style="font-size:18px" @click="showdb1(1,2)" v-else>1(亿元)/{{parseInt(CPIC.USEDAMOUNT/10000)}}(万元)/{{CPIC.USDTOTAL}}(美元)</p>
                    </div>
                    <div v-else>
                        <p class="p2" style="font-size:18px">加载中</p>
                    </div>
                </li>
              </div>
          </li>
      </div>
      <div class="jy_bot">
           <li style="border-left:none;width:26%" class="cursor" v-if="currentYear == '2019'">
              <p class="p1">保税展示：</p>
              <p class="p2" @click="showJB">5474.69 (万美元) / 167 (批次)</p>
          </li>
          <li style="border-left:none;width:26%" class="cursor" v-else>
              <p class="p1">保税展示：</p>
              <p class="p2" @click="showJB">1873 (万美元) / 45 (批次)</p>
          </li>
          <li style="width:33%">
              <p class="p1">意向转为跨境电商商品的展览品：</p>
              <p class="p2" style=" cursor: auto;">{{KJprice}} (美元) / {{KJtotal}} (批次)</p>
               <!-- <p class="p2">10000 (万美元) /5000 (批次)</p> -->
          </li>
      </div>

        <Modal
            v-model="showdbModal"
                width = "1500px"
                :footer-hide = true
                :mask-closable = "false"
                class="forbidBody"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="closeshowdbModal" size='30' />
            </p>
               
                <h2 style="text-align:center;color:#fff">报关单列表</h2>
                <Table   border :columns = 'columns1' :data='showdbTable'  style="margin-top:20px" @on-row-click='rowClick'></Table>

                <Page
                    v-if="nowYear==2019"
                    :total="total"
                    v-show="total"
                    show-total
                    class="customPage"
                    @on-change="changePage"
                  >
                </Page>
                <Page
                    v-if="nowYear==2020"
                    :total="total"
                    v-show="total"
                    show-total
                    class="customPage"
                    @on-change="changePage20"
                  >
                </Page>
        </Modal>
         <!-- 第二个modal -->
         
      <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit> 

       <Modal
            v-model="showJBZS"
                width = "550px"
                :footer-hide = true
                :mask-closable = "false"
                :styles="{top:'700px'}"
                class="forbidBody"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="showJBZS=false" size='30' />
            </p>
                <div v-if="currentYear == '2019'">
                    <p style="font-size:20px;color:#18EBFF;margin-top:20px;margin-bottom:20px">海关特殊区域： 96.8 (万美元) / 6 (批次) </p>
                    <p style="font-size:20px;color:#18EBFF;margin-bottom:20px">保税物流中心(B型)： 4421.96 (万美元) / 155 (批次) </p>
                    <p style="font-size:20px;color:#18EBFF;margin-bottom:20px">钻石交易所： 955.93 (万美元) / 6 (批次) </p>
                </div>
                 <div v-else>
                    <p style="font-size:20px;color:#18EBFF;margin-top:20px;margin-bottom:20px">海关特殊区域： 204(万美元) / 4 (批次) </p>
                    <p style="font-size:20px;color:#18EBFF;margin-bottom:20px">保税物流中心(B型)： 825 (万美元) / 35 (批次) </p>
                    <p style="font-size:20px;color:#18EBFF;margin-bottom:20px">钻石交易所： 844 (万美元) / 6 (批次) </p>
                </div>
        </Modal>
         
    </div>
</template>
   

<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter,publicGetInter } from "@/api/http";
import customsUnit from "./customsUnit";
import {getCookie} from '@/until/getToken'
export default {
    components:{
        customsUnit
    },
    data(){
        return{
            currentYear:getCookie('date'),
            KJtotal:0,
            KJprice:0,
            showJBZS:false,
            total:0,
            flag: false,
            dataA:0,
            showdbModal:false,
            showdbTable:[],
            dbmodalTotal:0,
            nowYear:0,
            bankId:'GC0603220000355',
            bxId:"ASHH050ZV820Q000186L",
            type:'',
            columns1: [
                {
                title: "序号",
                key: "ROW_ID",
                align:'center',
                width:80
                },
                {
                title: "报关单编号",
                key: "ENTRY_ID",
                align:'center'
                },
                {
                title: "经营单位名称",
                key: "TRADE_NAME",
                 align:'center'
                },
                 {
                title: "申报单位名称",
                key: "AGENT_NAME",
                 align:'center'
                },
                 {
                 title: "担保期限剩余天数",
                key: "SURPLUSDAY",
                 align:'center',
                 width:'100px'
                },
                 {
                title: "实扣总担保额度",
                key: "RSV1_CUT",
                 align:'center'
                },
                {
                title: "申报日期",
                key: "D_DATE",
                 align:'center'
                },
                
                {
                title: "报关单备注栏信息",
                key: "NOTE_S",
                 align:'center',
                 width:'300px'
                }
            ],
            tili:0,//快速提离数
            tiqian:0,//提前申报数
            sbPrice:0,
            proof:0, //涉及证明函
            sheji:0, // 涉及展商
            totalprice:0,
            batch:0,
            Btotalprice:0,
            Bbatch:0,
            BOC:{},
            CPIC:{},
            showFlag:0,
           
        }
    },
    created(){
        this.nowYear=getCookie('date');
    },
    mounted(){
        this.queryPatrolRecord()
        this.initDate()
        this.qryBatchAndAmount()
        this.BusinessStatistic()
    },
    methods:{
        closeshowdbModal(){
            this.showdbModal = false
            this.total  = 0
        },
        //跨境电商统计
        
        BusinessStatistic(){
            let requsetData ={
                    pageSize:10,
                    page:1,
                }
            publicInter(interfaceUrl.qryEBusinessStatistic,requsetData).then(r=>{
                if(r.TOTALPRICE){
                    this.KJprice = (r.TOTALPRICE)*1
                    this.KJtotal = r.BATCH
                }else{
                    this.KJprice = 0
                    this.KJtotal = r.BATCH
                }
            });
        },
        //监管弹出函数
        showJB(){
            this.showJBZS = true;
        },

       initDate(){
            publicInter(interfaceUrl.queryExpoToPort,{}).then(r=>{
                if(r.isOk){
                    this.tili=r.totalRow
                }
            });

             publicInter(interfaceUrl.queryStatisticDeclare,{}).then(r=>{
                if(r.code===200){
                    this.tiqian= r.NUM;
                    this.sbPrice =  (r.PRICE/10000).toFixed(0)
                }
            })

             publicInter(interfaceUrl.proof,{status:"7"}).then(r=>{
                if(r.code===200){
                    this.proof=r.NUM
                }
            })

             publicInter(interfaceUrl.national,{}).then(r=>{
                if(r.code===200){
                    this.sheji=r.COMPANYTOTAL
                }
            })
       },

       //特殊区域保税展示
         qryBatchAndAmount(){
                    publicInter(interfaceUrl.qryBatchAndAmount,{}).then(r=>{
                        // console.log(r)
                        this.totalprice = (r.totalprice/10000).toFixed(2)
                        this.batch = r.batch
                  })
                },
        




        //担保额度监控数据查询
         queryPatrolRecord(){
                    publicInter(interfaceUrl.queryStatisticUsedQuota,{}).then(r=>{
                    if(r.code===200){
                        this.dataA = (r.USED_QUOTA/10000).toFixed(0)
                    }
                 })
                    publicGetInter(interfaceUrl.queryGuranteeList).then(r=>{
                        if(r.code==200){
                            this.BOC=r.list[0]
                            this.CPIC=r.list[1]
                        }
                    })
                },

                showdb(page){
                    this.showdbModal = true
                    let date ={
                        pageNum:page,
                        pageSize:10
                    }
                     publicInter(interfaceUrl.queryUsedQuotaList, date).then(r => {
                            if (r.code === 200) {
                                this.showdbTable = r.data.list;
                                this.total = r.data.totalRow
                            }
                        });
                },
                showdb1(page,flag){
                    let requsetData = {}
                    this.showdbModal = true
                    this.showFlag = flag
                    if(flag == 1){
                       requsetData ={
                            pageNo:page,
                            pageSize:10,
                            gid:'GC0603220000355'
                        }
                    }else {
                        requsetData ={
                            pageNo:page,
                            pageSize:10,
                            gid:'ASHH050ZV820Q000186L'
                        }
                    }
                     publicInter(interfaceUrl.queryGuranteeEntryList, requsetData).then(r => {
                            if (r.list.length>0) {
                                this.showdbTable = r.list;
                                this.total = r.total
                            }
                        });
                },

                rowClick(e){
                        this.$refs.abc.query(e.ENTRY_ID)
                        this.flag = true
                        this.showdbModal = false
                    
                },
                closeWin() {
                    this.flag = false;
                 },
               changePage(page){
                this.showdb(page)
              },
              changePage20(page){
                 this.showdb1(page,this.showFlag)
              }

       }
    
}
</script>
<style lang="scss">
.jy_bottom{
    width: 100%;
    height: 5rem;
    margin-top: 1.5rem;
    border: 1px solid #185DF7;
    .jy_top{
        width: 100%;
        height: 50%;
        display: flex;
         border-bottom: 1px solid #21284A; 
        li{
            list-style: none;
            display: flex;
            width: 21%;
            height: 100%;
            border-left: 1px solid #21284A;
            .p1{
                font-size: 16px;
                color: #fff;
                margin-top: 0.5rem;
                margin-left: 0.6rem
            }
            .p2{
                font-size: 20px;
                color: #fff;
                margin-top: 0.5rem;
                margin-left: 1rem;
            }
        }
    }
    .jy_bot{
        display: flex;
        width: 100%;
        height: 50%;
        li:nth-child(2){
            width:40%;
        }
        li{
            list-style: none;
            display: flex;
            width: 30%;
            height: 100%;
            border-left: 1px solid #21284A;
            .p1{
                font-size: 18px;
                color: #fff;
                margin-top: 0.5rem;
                margin-left: 0.6rem
            }
            .p2{
                font-size: 20px;
                color: #fff;
                margin-top: 0.5rem;
                margin-left: 1rem;
                cursor: pointer;
            }
        }
       
    }
     .cursor{
         p{
             color: #E7BE00 !important;
         }  
        }
}
</style>

