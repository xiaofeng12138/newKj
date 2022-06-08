<template>
<div class="chain">
    <div class="box">
        <div class="exhibition">
            <svgModal @venusChange='venusChange' ref="svgModal"></svgModal>

        </div>
        <div class="panel">
            <div class="title">
                <p>
                    <span >主要参展商(<b>{{venus}}</b>号馆)</span>
                    <!-- <span :class="{active: isActive == 1}" @click="spanOnClick(1)">重点展位</span> -->
                </p>
                <div class="sreach">
                     <Input v-model="searchValue"  class="customInput" size="large" :disabled="inputDisabled" @on-search='query'  @on-change='valueChange' search enter-button>
                        <Select v-model="select" slot="prepend" size="large"  style="width:100px" class="customSelect">
                            <Option value="1">国家/地区</Option>
                            <Option value="2">展品大类</Option>
                            <Option value="3">展品名称</Option>
                            <Option value="4">展位号</Option>
                        </Select>
                     </Input>
                     <ul class="dropList" v-if="dropList.length>0">
                         <li :class="{selected:item.select}" v-for="(item ,i) in dropList" :key="i" @click="clickHandle(item.code)">{{item.text}}</li>
                     </ul>
            

                </div>
                
            </div>
            <Table :columns="columns"  :data="data" class="customTable" style="margin-top:10px;" size='large'></Table>  
            <Page class="customPage" :total="total" v-if="total>0" 
                :page-size=10
                @on-change='pageChange'
                show-total></Page>   
        </div>
    </div>

    <p class="mark"><img src="@/assets/position.png" alt="">当前选中展位</p>
    <Modal class="list-flow" style="z-index: 2" v-model="flowShow" width='1600' :footer-hide="hideFooter">
      <div  style="padding: 0 20px;width: 100%;height: 100%;">
        <list-and-flow v-show="flowShow" ref="flowChild" @rowClick='rowClick'></list-and-flow>
      </div>
    </Modal>
    <customs-unit style="z-index: 999" :modelFlag="customModel" :customID="customId"  @myCloseWin="closewin" ref = 'customChild' @myOpenWin='openWin'></customs-unit> 
</div>
    
</template>
<script>
import customsUnit from '@/views/exhibits/unit/customsUnit'
import listAndFlow from './components/listAndFlow'
import svgModal from "./components/svgModal";
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
export default {
  components: { svgModal, listAndFlow, customsUnit },
  created() {
    this.redpanda = require("@/assets/redpanda.png");
    this.greenpanda = require("@/assets/greenpanda.png");
  },
  data() {
    return {
      isActive: 0,
      hideFooter: true,
      flowShow: false,
      select: "1",
      total:0,
      data: [],
      venus: "1",
      redpanda: "",
      greenpanda: "",
      tempData:[],
      searchValue: "",
      customId:"",
      customModel:false,
      dropList: [],
      inputDisabled: false,
      columns: [
        {
          title: "排名",
          key: "ROWNUMBER",
          width: 80,
          align: "center"
        },
        {
          title: "展商名字",
          key: "EXHIBITOR",
          align: "center",
          render: (h, params) => {
            try {
              let val = params.row.EXHIBITOR;
              return h(
                "Tooltip",
                {
                  attrs: {
                    content: val,
                    transfer: true
                  },
                  style: {
                    overflow: "hidden",
                    width: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }
                },
                val
              );
            } catch (e) {
              console.log(e);
            }
          }
        },
        {
          title: "数量(件)",
          key: "QUANTITY",
          align: "center",
          width: 100,
          render: (h, params) => {
            let val = params.row.QUANTITY;
            return h("span", val);
          }
        },
        {
          title: "金额(美元)",
          key: "TOTALPRICE",
          align: "center",
          width: 90,
          render: (h, params) => {
            let val = params.row.TOTALPRICE;
            return h("span", val);
          }
        },
        {
          title: "国家与地区",
          key: "COUNTRYENNAME",
          align: "center",
          width: 80,
          render: (h, params) => {
            let val = params.row.COUNTRYCNNAME;
            return h(
              "Tooltip",
              {
                attrs: {
                  content: val,
                  transfer: true
                }
              },
              val
            );
          }
        },
        {
          title: "展位",
          key: "BOOTHN",
          click: "true",
          align: "center",
          render: (h, params) => {
            let divs;
            switch (params.row.FORMTYPE) {
              case "1":
                divs = [
                  h("img", {
                    attrs: {
                      src: this.redpanda
                    },
                    style: {
                      width: "16px",
                      "vertical-align": "middle"
                    }
                  })
                ];
                break;
              case "2":
                divs = [
                  h("img", {
                    attrs: {
                      src: this.greenpanda
                    },
                    style: {
                      width: "16px",
                      "vertical-align": "middle"
                    }
                  })
                ];
                break;
              case "3":
                divs = h(
                  "div",
                  {
                    style: {
                      display: "inline-block",
                      "vertical-align": "middle"
                    }
                  },
                  [
                    h("img", {
                      attrs: {
                        src: this.redpanda
                      },
                      style: {
                        width: "16px",
                        display: "block"
                      }
                    }),
                    h("img", {
                      attrs: {
                        src: this.greenpanda
                      },
                      style: {
                        width: "16px"
                      }
                    })
                  ]
                );
                break;
            }
            return h(
              "div",
              {
                style: {
                  width: "100%",
                  "text-align": "left"
                }
              },
              [
                divs,
                h(
                  "span",
                  {
                    props: {},
                    attrs: {
                      title: params.row.BOOTHN
                    },
                    style: {
                      color: "#FFE91A",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        let index = params.row.TOPNUMBER;
                        let current = "TOPNUMBER";
                        this.positionIndexShowEdit = params.row;
                        // this.$emit("clickToPosition", {
                        //   index,
                        //   hallno: params.row.HALLNO,
                        //   current,
                        //   paramsIndex: params.index
                        // });
                        this.$refs.svgModal.clickToPosition(params.row)
                        // this.clickToPosition(index,params.row.HALLNO,current,params.index);
                      }
                    }
                  },
                  params.row.BOOTHN
                )
              ]
            );
          }
        }
      ]
    };
  },
  mounted() {
    
  },
  methods: {
    closewin(value){
        this[value] = false;
        this.flowShow = true;
    },
    openWin(value){
        this[value] = true;
        this.flowShow = false;
    },
    // spanOnClick(params) {
    //   if(this.isActive == params) 
    //     return;
    //   if(params == 0) {
    //     this.isActive = 0;
    //     this.inputDisabled = false;
    //     this.select = '1'
    //   }else if(params == 1){
    //     this.isActive = 1;
    //     this.inputDisabled = true;
    //     this.select = '5'
    //   }
    //   this.query()
    // },
    venusChange(e) {
      this.data = e.tableData;
      this.venus = e.venus;
      this.total = 0;
      this.searchValue = ''
    },
    pageChange(num){
        if(this.tempData.length>0){
            this.data=this.tempData.slice((num-1)*10,(num)*10)
        }

    },
    rowClick(params){
      console.log(params)
      let type =  params.FORMTYPE;
      console.log(type)
      //报关行的点击
      switch(type){
          case "报关单":
              this.$refs.customChild.query(params.FORMID);
              break;
          case "ATA":
              let request2={
                  carnetNo:params.FORMID
              }
              publicInter(interfaceUrl.queryMaterialsAta,request2).then(r=>{
                console.log(r)
                  if(r){
                      if(r.code === '200'){
                          this.ATAHead = r.head[0];
                          this.dataATA = r.list;
                          this.ataModel = true;
                      }
                      else{
                          this.$Modal.error({content:r.data});
                      }
                  }
              });
              break;
          case "保税展示":
              this.$refs.bondChild.query(params.FORMID);
              break;
      }
  },
  qryExhibitorFlow(exhibitor){
      this.flowShow = true;
      this.$refs.flowChild.qryExhibitorFlow(exhibitor);
  },
    query() {
      var url = "",
        params = {
          pageNum: 1,
          pageSize: 10
        };
      switch (this.select) {
        case "1":
        url = interfaceUrl.qryExhibitorByCountry;
          // params = {
          //   exhibitorcountry: this.searchValue
          // };
          params.exhibitorcountry = this.searchValue;
          break;
        case '2':
          url = interfaceUrl.qryExhibitorByItemType;
          // params = {
          //   itemtype: this.searchValue,
          //   pageNum: 1,
          //   pageSize: 10
          // };
          params.itemtype = this.searchValue;
          break;
        case '3':
          url = interfaceUrl.qryExhibitorByName;
          // params = {
          //   exhibitor: this.searchValue
          // };
          params.exhibitor = this.searchValue;
          break;
        case '4':
          url = interfaceUrl.qryExhibitorByBoothNo;
          // params = {
          //   boothno: this.searchValue
          // };
          params.boothno = this.searchValue;
          break;
        default:
          break;
      }
      publicInter(url,params).then(r=>{
          if(r&&r.list){
              this.data=r.list
              // if(this.select==2){
                  this.tempData=r.list
                  this.data=this.tempData.slice(0,10)
                  this.total=this.tempData.length;
              // }else{
              //     this.total=0
              // }

          }else{
              this.data=[]
          }

      })
    },
    clickHandle(val) {
      this.dropList.forEach(item => {
        if (item.COUNTRYCODE == val) {
          item.select = true;
        } else {
          item.select = false;
        }
      });
      this.dropList = [];
      this.searchValue = val;
      this.query()
    },
    valueChange() {
      if (this.select != 1) {
        return false;
      }
      var params = {
        cnname: "",
        enname: ""
      };
      if (escape(this.searchValue).indexOf("%u") < 0) {
        params.enname = this.searchValue;
      } else {
        params.cnname = this.searchValue;
      }

      publicInter(interfaceUrl.queryCountryCode, params).then(r => {
        if (r && r.list.length && r.list.length > 0) {
          this.dropList = r.list.map(item => {
            return {
              select: false,
              text: item.CNNAME,
              code: item.COUNTRYCODE
            };
          });
        } else {
          this.dropList = [];
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.chain {
  width: 100%;
  height: 100%;
  position: relative;
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .exhibition {
      width: 60%;
    }
    .panel {
      width: 38%;
    }
  }
  .mark{
      position: absolute;
      left: 50%;
      bottom: 10px;
      color: #fff;
      font-size: 1rem;
      img{
          width: 20px;
          height: 20px;
      }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    font-size: 16px;
    span {
      color: #aaa;
      cursor: pointer;
      &.active { 
        color: #fff;
        cursor: default;
      }
      // &:last-child {
      //   left: 14px;
      //   position: relative;
      //   &::before {
      //     content: "";
      //     width: 1px;
      //     position: absolute;
      //     height: 90%;
      //     top: 10%;
      //     left: -8px;
      //     background: #aaa;
      //   }
      // }
    }
  }
  .sreach {
    width: 60%;
    position: relative;
    .dropList {
      position: absolute;
      margin: 0;
      padding: 0;
      list-style: none;
      left: 105px;
      min-width: 100px;
      max-width: 300px;
      overflow: auto;
      padding: 4px 0;
      top: 102%;
      z-index: 1000;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      background: #0c1435;
      border: 1px solid #155ff2;
      will-change: top, left;
      transform-origin: center top 0px;
      max-height: 300px;
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
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      li {
        padding: 7px 16px 8px;
        cursor: pointer;
        &.selected {
          background: #155ff2;
        }
        &:hover {
          background: #155ff2;
        }
      }
    }
  }
}
table {
  .ivu-table-cell {
    width: 100%;
  }
}
</style>


