<template>
    <div>
        <JY v-if="getViewState[1]" ref='JY'  @Tclick='TXclick' @modalShow='showList' @recordDetail='recordEvent'/>
        <div></div>

        <Modal v-model="modelSwith" width='1200' >
            <div v-if='tableShow[0]' >
                <h3 style='margin-bottom:16px;text-align:center;font-size:24px'>报关单列表</h3>
                <div class="modelAAA">
                    <Table :columns="Columns" :data="dataTable" border class="self"  @on-row-click='rowClick'></Table>
                </div>
            </div>
            <div v-if='tableShow[1]'>
                <h2 style='text-align:center;padding:20px 0'>免于检验明细</h2>
                <div class="modelAAA">
                    <Table :columns="Columns2" :data="dataTable2" border class="self"></Table>  
                </div>
            </div>
            <div v-if='tableShow[2]'>
                <h2 style='text-align:center;padding:20px 0'>进境食品检疫明细</h2>
                <div class="modelAAA">
                    <Table :columns="Columns3" :data="dataTable3" border class="self"></Table>  
                </div>
            </div>
            <div v-if='tableShow[3]'>
                <h2 style='text-align:center;padding:20px 0'>特许进境食品检疫明细</h2>
                <div class="modelAAA">
                    <Table :columns="Columns3" :data="dataTable4" border class="self"></Table>  
                </div>
            </div>
        </Modal>

       

         <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit> 
        
    </div>
</template>

<script>
import JY from './jy'
import world from "@/views/exhibits/exhibitionShow/exhibitionOne/map";
import customsUnit from "./customsUnit";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
    data() {
        return {

             //一般审批数据
            foodNormal2:[],

            //特殊审批数据
            foodSpecital2:[],
            modelSwith: false,
            tableShow: [false, false, false, false],
            flag: false,
            Columns: [
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
            dataTable: [{}],
            dataTable2: [{}],
            dataTable3: [{}],
            dataTable4: [{}],
            Columns3: [
                {
                title: "国家/地区",
                key: "COUNTRY"
                },
                {
                title: "展品名称",
                key: "EXHIBITSNAME"
                },
                {
                title: "重量",
                key: "WEIGHT"
                },
                {
                title: "单位",
                key: "UNITNAME"
                },
                {
                title: "审批方式",
                key: "APPROVETYPE"
                }
            ],
            Columns2: [
                {
                title: "证明函编号",
                key: "CERTIFICATENO",
                align: "center",
                width: 180
                },
                {
                title: "品名",
                key: "GOODSDESCRIPTIONCN",
                align: "center",
                width: 180
                },
                {
                title: "原产地",
                align: "center",
                key: "COUNTRYOFORIGIN"
                },
                {
                title: "数量",
                align: "center",
                key: "QUANTITY"
                },
                {
                title: "总价",
                align: "center",
                key: "TOTALPRICE"
                },
                {
                title: "展位",
                align: "center",
                key: "BOOTHNO"
                },
                {
                title: "展商",
                align: "center",
                key: "EXHIBITOR",
                width: 180
                }
            ],
        }
    },
    components: {
        JY,
        world,
        customsUnit
    },
    mounted() {
        let _this = this;
        this.getRegionData();
        this.getGaugeData();
        this.getJsonData();
        this.queryFoodNormal();
        this.queryFoodSpectial()
        // window.onresize = function() {
        // _this.adjustFontSize();
        // };
    },
    methods: {
         //一般审批
      queryFoodNormal(){
          let data= {
              APPROVETYPE:"1"
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
                this.foodNormal2 = r.list;
         }) 
      },
      //特殊审批
      queryFoodSpectial(){
          let data= {
              APPROVETYPE:"2"
          }
        publicInter(interfaceUrl.queryFoodQuaran,data).then(r=>{
               this.foodSpecital2 = r.list;
         }) 
      },



        ...mapMutations("exhibitionStore", ["changeSelected"]),
        ...mapActions("exhibitionStore", [
        "getRegionData",
        "getGaugeData",
        "getJsonData"
        ]),
         closeWin() {
            this.flag = false;
            },

        TXclick() {
            this.$refs.MAP.initGoodsType();
        },
        showList(e) {
            this.modalTableState(e);
            switch (e) {
                case 0:
                this.getDataTable();
                break;
                case 1:
                this.dataTable2 = this.$refs.JY.dataTable;
                break;
                case 2:
                this.dataTable3 = this.foodNormal2;
                break;
                case 3:
                this.dataTable4 = this.foodSpecital2;
                break;
                default:
                break;
            }
        },
        getDataTable() {
            publicInter(interfaceUrl.queryUsedQuotaList, {}).then(r => {
                console.log(r)
                if (r.code === 200) {
                this.dataTable = r.data;
                }
            });
        },
        rowClick(e) {
            //console.log(e.ENTRY_ID)
            //console.log(this.$refs.abc.query)
            this.$refs.abc.query(e.ENTRY_ID)
            this.flag = true
            this.modelSwith = false
        },
        recordEvent(e){
            // this.rangerShow=true;
            // this.$refs.MAP.clearMap();
            this.questionRecord=e
        },
        modalTableState(index) {
            this.modelSwith = true;
            this.tableShow.forEach((item, i) => {
                if (i == index) {
                this.tableShow[i] = true;
                } else {
                this.tableShow[i] = false;
                }
            });
            // console.log(this.tableShow,index)
        },
    },
    computed: {
    ...mapGetters("exhibitionStore", [
      "getViewState",
      "getRegionCode",
      "getDataS$G"
    ])
  },
}
</script>

<style lang="scss" scoped>

</style>
