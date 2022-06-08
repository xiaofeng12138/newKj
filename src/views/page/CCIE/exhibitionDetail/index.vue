<template>
    <div>
        <Row :getter=16 type='flex' align='middle' >
            <Col span=6>
                <Col span=12>
                    <span class="labelText">主场运输企业代理名称</span>
                </Col>
                <Col span=12>
                    <Input type="text" v-model="params.agentname" class="customInput" size='large'></Input>
                </Col>
                
                
            </Col>
            <Col span=6>
                <Col span=12>
                    <span class="labelText">展品名称</span>
                </Col>
                <Col span=12>
                    <Input type="text" v-model="params.goodsdescription" class="customInput" size='large'></Input>
                </Col>
               
            </Col>
            <Col span=6>
                <Col span=12>
                    <span class="labelText">展品流向</span>
                </Col>
                <Col span=12>
                    <Input type="text" v-model="params.flow" class="customInput" size='large'></Input>
                </Col>
                
            </Col>
            <Col span=2 push=1>
                <Button type="primary" size='large' @click="query" long>查询</Button>
            </Col>
        </Row>
        <Table class="customTable " :data='list' style="margin-top:1rem;" :columns="keyList"></Table>
        
        <Page class="customPage" :total="total" v-if="total>0" 
                :page-size=20
                @on-change='pageChange'
                show-total></Page>   
        
        
        
        
    </div>
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";

export default {
  data() {
    return {
      keyList: [
        {
          title: "序号",
          key: "NUM",
          align: "center",
          width: 80
        },
        {
          title: "主场运输企业代理名称",
          key: "AGENTNAME",
          align: "center",
          width: 180
        },
        {
          title: "商品名称",
          key: "GOODSDESCRIPTION",
          align: "center",

          render: (h, params) => {
            let val = "*" + params.row.GOODSDESCRIPTION;
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
          },
          width: 90
        },
        {
          title: "数量",
          key: "QUANTITY",
          align: "center",
          width: 70
        },
        {
          title: "单位",
          key: "QUANTITYUNIT",
          align: "center",
          render: (h, params) => {
            return h("span", "件");
          },
          width: 70
        },
        {
          title: "总价",
          key: "TOTALPRICE",
          align: "center",
          width: 70,
          render: (h, params) => {
            let val = params.row.TOTALPRICE;
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
          title: "币制",
          align: "center",
          render: (h, params) => {
            return h("span", "美元");
          },
          width: 70
        },
        // {
        //   title: "处理状态",
        //   align: "center",
        //   width: 110,
        //   render: (h, params) => {
        //     var result1 = "";
        //     switch (params.row.DEALSTATUS1) {
        //       case "0":
        //         result1 = "到港";
        //         break;
        //       case "1":
        //         result1 = "进馆";
        //         break;
        //       default:
        //         result1 = "";
        //     }
        //     var result2 = "";
        //     switch (params.row.DEALSTATUS2) {
        //       case "0":
        //         result2 = "申报";
        //         break;
        //       case "1":
        //         result2 = "放行";
        //         break;
        //       default:
        //         result2 = "";
        //     }
        //     return h("div", [
        //       h(
        //         "span",
        //         {
        //           style: {
        //             display: "inline-block",
        //             width: "50%",
        //             "vertical-align": "middle"
        //           }
        //         },
        //         result1
        //       ),
        //       h(
        //         "span",
        //         {
        //           style: {
        //             display: "inline-block",
        //             width: "50%",
        //             "vertical-align": "middle"
        //           }
        //         },
        //         result2
        //       )
        //     ]);
        //   }
        // },
        // {
        //   title: "试用",
        //   key: "TRYOUT",
        //   align: "center",
        //   width: 70
        // },
        // {
        //   title: "品尝",
        //   key: "TASTE",
        //   align: "center",
        //   width: 70
        // },
        // {
        //   title: "散发",
        //   key: "DISTRIBUTE",
        //   align: "center",
        //   width: 70
        // },
        // {
        //   title: "预计后续流向",
        //   align: "center",
        //   children: [
        //     {
        //       title: "复运出境",
        //       key: "B",
        //       align: "center",
        //       width: 80
        //     },
        //     {
        //       title: "留购",
        //       key: "A",
        //       align: "center",
        //       width: 70
        //     },
        //     {
        //       title: "消耗",
        //       key: "C",
        //       align: "center",
        //       width: 70
        //     },
        //     {
        //       title: "转特殊监管区域",
        //       key: "D",
        //       align: "center",
        //       width: 130
        //     }
        //   ]
        // },
        {
          title: "实际后续流向",
          align: "center",
          children: [
            {
              title: "外借",
              key: "PE",
              align: "center",
              width: 70
            },
            {
              title: "转保税区域",
              key: "PF",
              align: "center",
              width: 100
            },
            {
              title: "消耗",
              key: "PC",
              align: "center",
              width: 70
            },
            {
              title: "放弃",
              key: "PG",
              align: "center",
              width: 70
            },
            {
              title: "灭失",
              key: "PH",
              align: "center",
              width: 70
            },
            {
              title: "其他",
              key: "PI",
              align: "center",
              width: 70
            },
            {
              title: "巡展",
              key: "PJ",
              align: "center",
              width: 70
            },
            {
              title: "留购",
              key: "PA",
              align: "center",
              width: 70
            },  
            {
              title: "复运出境",
              key: "PB",
              align: "center",
              width: 80
            },
            {
              title: "核销",
              key: "PD",
              align: "center",
              width: 70
            },
            {
              title: "未核销",
              key: "PK",
              align: "center",
              width: 90
            },
          ]
        },
        {
          title: "单证号",
          key: "FORMID",
          align: "center",
          width: 210,
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.FORMID
                },
                style: {
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$emit("rowClick", params.row);
                    // this.rowClick(params.row,params.row.FORMTYPE);
                  }
                }
              },
              params.row.FORMID
            );
          }
        },
        {
          title: "种类",
          key: "FORMTYPE",
          align: "center",
          width: 60,
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.FORMTYPE
                }
              },
              params.row.FORMTYPE
            );
          }
        },
        // {
        //   title: "物资证明函",
        //   key: "CERTNO",
        //   align: "center",
        //   width: 210,
        //   render: (h, params) => {
        //     return h(
        //       "span",
        //       {
        //         attrs: {
        //           title: params.row.CERTNO
        //         }
        //       },
        //       params.row.CERTNO
        //     );
        //   }
        // }
      ],
      

      params: {
        pageNum: 1,
        pageSize: 20,
        agentname: "",
        goodsdescription: "",
        flow: ""
      },
      list: [],
      total: 0,
      
    };
  },
 
  methods: {
    pageChange(num) {
      this.params.pageNum = num;
      this.query();
    },
    query() {
      publicInter(interfaceUrl.qryExhibitorFlow, this.params).then(r => {
        if (r && r.totalRow > 0) {
          this.total = r.totalRow;
          this.list = r.list;
        } else {
          this.total = 0;
          this.list = [];
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.labelText {
  color: #fff;
  font-size: 14px;
  display: block;
  width: 100%;
  text-align: right;
  padding-right: 0.5rem;
  line-height: 36px;
}

</style>
