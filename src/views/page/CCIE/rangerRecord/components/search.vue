<template>
    <div>
        <div class="searchBar">
            <div class="btn">
                <Button type="primary" size="large" class="customBtn" :class="{active:active[0]}" @click="query('exhibition',0)">展品清单</Button>
                <Button type="primary" size="large"  class="customBtn" :class="{active:active[1]}" @click="query('exhibtor',1)">展商清单</Button>
                <Button type="primary" size="large"  class="customBtn"  :class="{active:active[2]}" @click="query('forbidden',2)">禁限清单</Button>
            </div>
            <div class="search" >
                <Input  v-model="parmas.paramApp" type="text" @on-search='search' class="customInput" size="large"  placeholder="请输入品名、HS编码、展商名称、原产地" search enter-button></Input>
            </div>
        </div>
        <div v-if="searchType=='exhibition'">
            <Table :columns="columns"  :data="data" class="customTable" style="margin-top:20px;" ></Table>  
            <Page :total="total" v-show="total" class="customPage" :page-size=20 :current="parmas.currPage"  @on-change="changePage" show-total></Page>
        </div>
        <div v-if="searchType=='exhibtor'">
            <Table :columns="columns2"  :data="data" class="customTable" style="margin-top:20px;"></Table>  
            <Page :total="total" v-show="total" class="customPage" :page-size=20 :current="parmas.page"  @on-change="changePage" show-total></Page>
        </div>
        <div v-if="searchType=='forbidden'">
            <Table :columns="columns3"  :data="data" class="customTable" style="margin-top:20px;"></Table>  
            <Page :total="total" v-show="total" class="customPage" :page-size=20 :current="parmas.page"  @on-change="changePage" show-total></Page>
        </div>
    </div>
    
</template>
<script >
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
export default {
  data() {
    return {
      active: [false, false, false],
      columns: [
        {
          title: "展位号",
           align:'center',
          render: (h, parmas) => {
            return h(
              "span",
              {
                style: {
                  color: "#ffb73e",
                  fontSize: "14px",
                  cursor: "pointer"
                }
              },
              parmas.row.POSITION
            );
          }
        },
        // {
        //   title: "报关单号",
        //   key: "FORMID"
        // },
        {
          title: "品名",
          key: "ITEM",
           align:'center'
        },
        {
          title: "原产地",
          key: "ORIGINAL",
           align:'center'
        },
        {
          title: "数/重量",
          key: "ITEM_QTY",
           align:'center'
        },
        {
          title: "价格",
          key: "ITEM_VALUES",
           align:'center'
        },
        // {
        //   title: "监管方式",
        //   width: 350,
        //   render: (h, parmas) => {
        //     return h(
        //       "RadioGroup",
        //       {
        //         attrs: {
        //           custom: "customRadio"
        //         }
        //       },
        //       [
        //         h("Radio", {
        //           props: {
        //             label: "展览品"
        //           }
        //         }),
        //         h("Radio", {
        //           props: {
        //             label: "保税物品"
        //           }
        //         }),
        //         h("Radio", {
        //           props: {
        //             label: "转关"
        //           }
        //         }),
        //         h("Radio", {
        //           props: {
        //             label: "其他"
        //           }
        //         })
        //       ]
        //     );
        //   }
        // }
      ],
      columns2: [
        {
          title: "展位号",
          key: "PLACEPOSITION",
           align:'center'
        },
        {
          title: "展商名称",
          key: "EXPOCOMPANY",
           align:'center'
        },
        {
          title: "国家/地区",
          key: "HQCOUNTRY",
           align:'center'
        }
      ],
      columns3: [
        {
          title: "HSCODE",
          key: "HSCODE",
           align:'center'
        },
        {
          title: "品名",
          key: "NAME",
           align:'center'
        },
         {
          title: "原产国",
          key: "ORIGINCOUNTRY",
           align:'center'
        },
        {
          title: "是否限制清单",
          key: "ISLIMIT",
           align:'center'
        },
        {
          title: "是否禁止清单",
          key: "ISFORBID",
           align:'center'
        },
        {
                    title:'规则提示',
                    key:'CONTENT',
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
                                    title:params.row.CONTENT
                                }
                            },params.row.CONTENT)
                        ])
                    },
                }
      ],
      total: 0,
      searchType: "exhibition",
      parmas: {
        currPage: 1,
        page: 1,
        paramApp: "",
        pageSize: 20
      },
      data: [{}]
    };
  },
  methods: {
    query(type, activeNum) {
      console.log(this.active)
      this.active = [false, false, false];
      this.active[activeNum] = true;
      this.searchType = type;
      this.parmas.currPage = 1;
      this.parmas.page = 1;
      this.parmas.paramApp = "";
      this.requst(type);
    },
    requst(type,activeNum) {
      var url = "";
      if (type == "exhibition") {
        url = interfaceUrl.queryMaterialsComplex;
      } else if (type == "exhibtor") {
        url = interfaceUrl.allExhibitorsData;
      } else {
        url = interfaceUrl.qryLimitAndForbidList;
      }
      publicInter(url, this.parmas).then(r => {
        console.log(r)
        if (
          (r.isok && r.datas && r.datas.length > 0) ||
          (r.code == 200 && r.data && r.data.length > 0) ||
          (r.code == 200 && r.result.length > 0)
        ) {
          this.data = r.data || r.datas || r.result;
          this.total = r.total;
        } else {
          this.data = [];
          this.total = 0;
        }
      });
    },
    changePage(page) {
      this.parmas.currPage = page;
      this.parmas.page = page;
      this.requst(this.searchType);
    },
    search() {
      let type =  this.searchType
     //this.query(type, activeNum)
       this.active = [false, false, false];
      //  //this.active = [false, false, false];
       //this.active[activeNum] = true;
      // this.searchType = "exhibition";

       this.requst(type);
    }
  }
};
</script>
<style lang="scss" scoped>
.searchBar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    > button {
      margin-right: 20px;
    }
  }
  .search {
    width: 30%;
  }
}
</style>


