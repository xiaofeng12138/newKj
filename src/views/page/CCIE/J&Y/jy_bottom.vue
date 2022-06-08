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
              <p class="p1">申报数：</p>
              <p class="p2">{{tiqian}}</p>
          </li>
          <!-- <li>
              <p class="p1">快速提离数：</p>
              <p class="p2">{{tili}}</p>
          </li> -->
          <li style="width:32%;cursor: pointer;" >
              <p class="p1">担保额度监控：</p>
              <p class="p2" style="color:red" @click="showdb(1)" v-if="dataA >18000">2(亿元)/{{dataA}}(万元)  额度已低于2000万</p>
              <p class="p2" @click="showdb(1)" v-else>2(亿元)/{{dataA}}(万元)</p>
          </li>
      </div>
      <div class="jy_bot">
           <li style="border-left:none">
              <p class="p1">特殊区域保税展示：</p>
              <p class="p2">0(万美元) / 0(批次)</p>
          </li>
          <li>
              <p class="p1">保税物流中心(B型)：</p>
              <p class="p2">0(万美元) / 0(批次)</p>
          </li>
      </div>

        <Modal
            v-model="showdbModal"
                width = "1300px"
                :footer-hide = true
                :mask-closable = "false"
                class="forbidBody"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="showdbModal=false" size='30' />
            </p>
               
                <h2 style="text-align:center;color:#fff">报关单列表</h2>
                 <Table   border :columns = 'columns1' :data='showdbTable'  style="margin-top:20px" @on-row-click='rowClick'>
                 </Table>
                
        </Modal>
         <!-- 第二个modal -->
         
      <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit> 
         
    </div>
</template>
   

<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from "@/api/http";
import customsUnit from "./customsUnit";
export default {
    components:{
        customsUnit
    },
    data(){
        return{
            total:0,
            flag: false,
            dataA:0,
            showdbModal:false,
            showdbTable:[{}],
            dbmodalTotal:0,
             columns1: [
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
                title: "报关单备注栏信息",
                key: "NOTE_S",
                 align:'center'
                },
                 {
                title: "实扣税额",
                key: "RSV1_CUT",
                 align:'center'
                },
                {
                title: "申报日期",
                key: "D_DATE",
                 align:'center'
                },
                
                {
                title: "担保期限剩余天数",
                key: "SURPLUSDAY",
                 align:'center'
                }
            ],
            tili:0,//快速提离数
            tiqian:0,//提前申报数
            proof:0, //涉及证明函
            sheji:0, // 涉及展商
           
        }
    },
    mounted(){
        this.queryPatrolRecord()
        this.initDate()
    },
    methods:{

       initDate(){
            publicInter(interfaceUrl.queryExpoToPort,{}).then(r=>{
                if(r.isOk){
                    this.tili=r.totalRow
                }
            });

             publicInter(interfaceUrl.queryStatisticDeclare,{}).then(r=>{
                if(r.code===200){
                    this.tiqian=r.NUM;
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




        //担保额度监控数据查询
         queryPatrolRecord(){
                    publicInter(interfaceUrl.queryStatisticUsedQuota,{}).then(r=>{
                      //  console.log(r)
                    if(r.code===200){
                        this.dataA = (r.USED_QUOTA/10000).toFixed(0)
                    }
                 })
                },

                showdb(page){
                    this.showdbModal = true
                    let pageNum = page
                    let date ={
                        pageNum,
                        pageSize:10
                    }
                     publicInter(interfaceUrl.queryUsedQuotaList, date).then(r => {
                         console.log(r.data.list)
                            if (r.code === 200) {
                            //this.showdbTable = r.data.list;
                            this.total = r.totalRow
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
            width: 17%;
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
            }
        }
    }
    .jy_bot{
        display: flex;
        width: 100%;
        height: 50%;
        li{
            list-style: none;
            display: flex;
            width: 50%;
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
            }
        }
    }
}
</style>

