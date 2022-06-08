<template>
<div>
    <!-- <h2 v-if="role==='ROLE_DC'">试用品尝散发风险监控</h2> -->
   
    <Row>
        <Col span=6 class="item">
            <Col span=8 class="itemLabel">
                <span>展商名称:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入展商名称" class="customInput" v-model="params.exhibitor" size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item">
            <Col span=8 class="itemLabel">
                <span>展台号:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入展台号" class="customInput" v-model="params.boothno" size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item">
            <Col span=8 class="itemLabel">
                <span>展品名称规格中文:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入展品名称规格中文" class="customInput" v-model="params.chname"  size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item">
            <Col span=8 class="itemLabel">
                <span> 展品名称规格英文:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入展品名称规格英文" class="customInput" v-model="params.enname" size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item">
            <Col span=8 class="itemLabel">
                <span>商品编码:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入商品编码" class="customInput" v-model="params.hscode" size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item">
            <Col span=8 class="itemLabel">
                <span>报关单号:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入报关单号" class="customInput" v-model="params.entryId" size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item" >
            <Col span=8 class="itemLabel">
                <span>物资证明函编号:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入物资证明函编号" class="customInput" v-model="params.certificateno" size="large"></Input>
            </Col>
        </Col>
        <Col span=6 class="item" style="height:36px">
            <Col span=8 class="itemLabel">
                <span>是否过滤已布控:</span> 
            </Col>
            <Col span=16>
                <Select v-model="isAll" class="customSelect" clearable>
                    <Option value="2">已确认</Option>
                    <Option value="3">已布控</Option>  
                </Select>
                <!-- <RadioGroup v-model="isAll">
                    <Radio label='是'></Radio>
                    <Radio label='否'></Radio>
                </RadioGroup>  -->
            </Col>
        </Col>
        <Col span=3 class="item" push=2>
            <Button size='large' type='primary' @click="query('')" long>查询</Button>
        </Col>
    </Row> 
    
    <Table border :columns='columns' :data='tableLits' class="customTable small"  style='margin:20px 0' ></Table>
    <Row>
        <!-- <Col span=2><Button size='large' type='primary' long>布控选中项</Button></Col>
        <Col span=2 push=1><Button size='large' type='primary' long>通过选中项</Button></Col> -->
        <!-- <Col span=2 push=18><Button size='large' type='primary' long>过滤已确认</Button></Col> -->
        <Col span=3 push=15></Col>
        <Col span=8 push=18>
             
        </Col>
    </Row>
    <div  class="option">
        
        <div>
            <Page show-total :total="totalNumber" class="customPage noMargin" v-if="totalNumber>0" :page-size='pageSize'
            @on-change="changePage" ></Page> 

        </div>
        <div style="width:120px" v-if="totalNumber>0"  >
            <Button size='large' type='primary' long @click="unConfirm">导出未确认</Button>

        </div>
        <div style="width:120px" v-if="totalNumber>0" >
            <Button size='large' type='primary' long @click="confirm">导出已确认</Button>
        </div>
        <div style="width:180px" v-if="totalNumber>0">
            <Button size='large' type='primary' long @click="exportExcel">提交并导出已布控商品</Button>
        </div>

    </div>
    <!--详情-->
        <Modal v-model="detailDataModel" width="1200" class="customModal" :mask-closable="false" footer-hide>
            <p slot="header" style="text-align:center:color:#fff">
                <span>List of Overseas Exhibits 2018年首届中国国际进口博览会进境物资清单</span>
            </p>
            <div style="text-align:center">
                <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody'
                :disableStatus="disableStatus"></detail-table>
            </div>
        </Modal>
</div>
    
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import detailTable from "../components/detail/detailTable";
import { getUserRole } from "@/until/getToken";
import { getCookie } from "@/until/getToken";
export default {
  name: "manage",
  components: { detailTable },
  props: ["tempRole"],
  data() {
    return {
      tempLists: {},
      totalNumber: 0,
      pageSize: 10,
      role: "",
      columns: [
        {
          title: "物资清单号",
          key: "LISTHEADNO",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.queryExpoHeadDetail(params.row.LISTHEADUUID);
                  }
                }
              },
              params.row.LISTHEADNO
            );
          }
        },
        {
          title: "物资证明函编号",
          key: "CERTIFICATENO",
          width: 180
        },
        {
          title: "报关单号",
          key: "ENTRY_ID",
          width: 150
        },
        {
          title: "展品名称规格中文",
          key: "GOODSDESCRIPTIONCN",
          align: "center",
          width: 180
        },

        {
          title: "原产地",
          key: "COUNTRYOFORIGIN",
          align: "center",
          width: 90
        },

        {
          title: "数量",
          key: "QUANTITY",
          align: "center",
          width: 90
        },
        {
          title: "单位",
          key: "QUANTITYUNIT",
          align: "center",
          width: 90
        },
        {
          title: "单价",
          align: "center",
          render(h, params) {
            let number = (
              parseFloat(params.row.TOTALPRICE) /
              parseFloat(params.row.QUANTITY)
            ).toFixed(2);
            return h("span", number == "NaN" ? "" : number);
          },
          width: 90
        },
        {
          title: "总价",
          key: "TOTALPRICE",
          align: "center",
          width: 90
        },
        {
          title: "毛重",
          key: "GROWSSWEIGHT",
          align: "center",
          width: 90
        },
        {
          title: "净重",
          key: "NETWEIGHT",
          align: "center",
          width: 90
        },
        {
          title: "提单号",
          key: "BILLNO",
          align: "center",
          width: 150
        },
        {
          title: "参展商",
          key: "EXHIBITOR",
          align: "center",
          width: 120
        },
        {
          title: "国别/地区",
          key: "EXHIBITORCOUNTRY",
          align: "center",
          width: 120
        },
        {
          title: "馆号",
          key: "HALLNO",
          align: "center",
          width: 90
        },
        {
          title: "展台号",
          key: "BOOTHNO",
          align: "center",
          width: 90
        },
        {
          title: "总件数",
          key: "TOTALPACKAGES",
          align: "center",
          width: 90
        },

        {
          title: "展品名称规格英文",
          key: "GOODSDESCRIPTION",
          align: "center",
          width: 200
        },

        {
          title: "商品编码",
          key: "HSCODE",
          align: "center",
          width: 120
        },
        {
          title: "展品处理方式",
          key: "DISPOSALS",
          align: "center",
          render(h, params) {
            let result = "";
            switch (params.row.DISPOSALS) {
              case "a":
                result = "已售";
                break;
              case "b":
                result = "运回";
                break;
              case "c":
                result = "放弃和消耗";
                break;
              case "d":
                result = "其他";
                break;
            }
            return h("span", result);
          },
          width: 120
        }
      ],
      isAll: "",
      tableLits: [],
      params: {
        chname: "",
        enname: "",
        hscode: "",
        exhibitor: "",
        boothno: "",
        entryId: "",
        certificateno: "",
        currPage: 1,
        pageSize: 10
      },
      detailDataModel: false,
      basis2: {
        totalpackages: "",
        exhibitor: "",
        exhibitorcountry: "",
        hallno: "",
        hallnoArr: [],
        boothno: "",
        company: "",
        boothno2: "",
        contact: "",
        tel: "",
        fax: "",
        email: "",
        //复制参展商国别
        countrycode: "",
        exhtype: "",
        exhibitorid: ""
      },
      basisBody: [],
      disableStatus: true,
      basis: {
        exhibitionname:
          "CHINA INTERNATIONAL IMPORT EXPO 2018,5-10 November 2018",
        exhibitionnamecn: "「 CIIE 2018中国国际进口博览会 」2018年11月5日-10日",
        exhibitionvenue: "NECC(Shanghai)-hongqiao,Shanghai,PR China",
        exhibitionvenuecn: "中国 上海 虹桥 国家会展中心"
      },
      customParams: {
        entryId: "224220181000001016",
        currPage: "1",
        pageSize: "10"
      }
    };
  },
  mounted() {
    this.addKey();
  },
  methods: {
    query(pageNum) {
      this.params.currPage = pageNum || 1;
      var url;
      url = interfaceUrl.queryMaterialsExamineFood;
      this.params.foodHandle = this.isAll;

      delete this.params.isAll;
      publicInter(url, this.params).then(r => {
        if (r) {
          if (r.code === "200") {
            r.data.forEach(el => {
              el.isShow = true;
            });
            this.tableLits = r.data;
            this.totalNumber = r.total;
          } else {
            this.$Modal.error({ content: r.data });
          }
        }
      });
    },
    changePage(pageNum) {
      // this.params.currPage=pageNum
      this.query(pageNum);
    },
    queryExpoHeadDetail(listheaduuid) {
      let params = {
        listheaduuid: listheaduuid
      };
      let url = interfaceUrl.queryExpoHeadDetailEA;
      publicInter(url, params).then(r => {
        if (r) {
          if (r.head) {
            this.basis2 = this.lowerJSONKey(r.head);
            this.basisBody = this.lowerJSONKey(r.body);

            this.basis2.countrycode = this.basis2.exhibitorcountry;

            this.basis2.hallnoArr = this.basis2.hallno.split(",");

            this.detailDataModel = true;
          } else if (r.error) {
            // this.$Message.error(r.error);
            this.$Modal.error({ content: r.error });
          }
        }
      });
    },
    // 后台返回大写，将key值转成小写
    lowerJSONKey(jsonObj) {
      if (Object.prototype.toString.call(jsonObj) === "[object Array]") {
        for (let i = 0; i < jsonObj.length; i++) {
          this.lowerJSONKey(jsonObj[i]);
        }
        return jsonObj;
      } else if (
        Object.prototype.toString.call(jsonObj) === "[object Object]"
      ) {
        for (let key in jsonObj) {
          jsonObj[key.toLocaleLowerCase()] = jsonObj[key];
          if (key !== key.toLocaleLowerCase()) {
            delete jsonObj[key];
          }
        }
        return jsonObj;
      }
    },
    blurBoothno() {
      this.params.boothno = this.params.boothno.toLocaleUpperCase();
    },
    addKey() {
      var arr = [];
      var brr = [];
      brr = [
        {
          title: "试用",
          key: "TRYOUT",
          align: "center",
          width: 80
        },
        {
          title: "品尝",
          key: "TASTE",
          align: "center",
          width: 80
        },
        {
          title: "散发",
          key: "DISTRIBUTE",
          align: "center",
          width: 80
        },

        {
          title: "食品处理结果",
          align: "center",
          key: "FOOD_HANDLE",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "RadioGroup",
                {
                  props: {
                    value:
                      params.row.FOOD_HANDLE == "3"
                        ? "布控"
                        : params.row.FOOD_HANDLE == "0"
                          ? ""
                          : params.row.FOOD_HANDLE == "1" ? "布控" : "确认"
                  },
                  on: {
                    "on-change": e => {
                      // console.log(params.index)
                      params.row["FOOD_HANDLE"] = e == "布控" ? "1" : "2";
                      this.tempLists[params.index] = {
                        itemuuid: params.row.ITEMUUID,
                        foodHandle: params.row.FOOD_HANDLE == "1" ? "3" : "2",
                        foodResult: ""
                      };
                    }
                  }
                },
                [
                  h("Radio", {
                    props: {
                      label: "确认",
                      disabled: params.row.FOOD_HANDLE == "3"
                    }
                  }),
                  h("Radio", {
                    props: {
                      label: "布控",
                      disabled: params.row.FOOD_HANDLE == "3"
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          title: "食品后续处置",
          key: "FOOD_RESULT",
          align: "center",
          width: 250,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "10px",
                    display: !params.row.isShow ? "none" : "inline-block"
                  }
                },
                params.row.FOOD_RESULT == 0 ? "" : params.row.FOOD_RESULT
              ),
              h("Input", {
                props: {
                  value:
                    params.row.FOOD_RESULT == 0 ? "" : params.row.FOOD_RESULT
                },
                style: {
                  width: "150px",
                  display: params.row.isShow ? "none" : "inline-block"
                },
                on: {
                  "on-blur": e => {
                    params.row.isShow = true;
                    params.row.FOOD_RESULT = e.target.value;
                    this.tempLists[params.index]["foodResult"] = e.target.value;
                    publicInter(interfaceUrl.updateExpoList, {
                      data: [
                        {
                          itemuuid: params.row.ITEMUUID,
                          foodHandle: "3",
                          foodResult: e.target.value
                        }
                      ]
                    }).then(r => {
                      if (r.code === "200") {
                        this.query("");
                      }
                    });
                  }
                }
              }),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    disabled: params.row.FOOD_HANDLE != "3"
                  },
                  on: {
                    click: () => {
                      params.row.isShow = false;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        },
        {
          title: "食品确认人",
          key: "FOOD_CONFIRM",
          width: 100
        }
      ];
      this.columns = arr.concat(brr, this.columns);
    },
    updateResult() {
      var a;
      a = this.tableLits.filter(item => {
        return item.FOOD_HANDLE == "3";
      });

      if (a.length <= 0) {
        this.$Message.error("未有已布控项！");
        return false;
      }
      var b = this.handle(a);
    },
    exportExcel() {
      console.log("点击");
      var a = [];
      for (var key in this.tempLists) {
        if (this.tempLists[key]["itemuuid"]) {
          a.push(this.tempLists[key]);
        }
      }

      if (a.length <= 0) {
        this.$Message.error("未有选中项！");
        this.bukong();
      } else {
        publicInter(interfaceUrl.updateExpoList, { data: a }).then(r => {
          if (r.code === "200") {
            this.$Message.success("提交成功！");
            this.bukong();
            this.query("");
          }
        });
      }
    },
    bukong() {
      var url, temp;
      temp = {
        chname: "",
        enname: "",
        hscode: "",
        exhibitor: "",
        boothno: "",
        entryId: "",
        certificateno: ""
      };
      url = interfaceUrl.queryMaterialsExamineFoodNoPage;
      temp.foodHandle = "3";

      publicInter(url, temp).then(r => {
        if (r.code === "200") {
          this.excelExport(r.data);
        }
      });
    },
    unConfirm() {
      var paramTemp = JSON.parse(JSON.stringify(this.params));
      var url;
      delete paramTemp.pageSize;
      delete paramTemp.currPage;
      paramTemp.foodHandle = "0";
      url = interfaceUrl.queryMaterialsExamineFoodNoPage;

      publicInter(url, paramTemp).then(r => {
        if (r.code === "200") {
          this.excelExport(r.data);
        }
      });
    },
    confirm() {
      var paramTemp = JSON.parse(JSON.stringify(this.params));
      var url;
      delete paramTemp.pageSize;
      delete paramTemp.currPage;
      paramTemp.foodHandle = "2";
      url = interfaceUrl.queryMaterialsExamineFoodNoPage;

      publicInter(url, paramTemp).then(r => {
        if (r.code === "200") {
          this.excelExport(r.data);
        }
      });
    },
    excelExport(d) {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../../vendor/Export2Excel");
        const tHeader = this.cutValue(this.columns, "title");
        const filterVal = this.cutValue(this.columns, "key");
        const list = d;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "数据列表");
        this.query("");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    cutValue(target, name) {
      let arr = [];
      for (let i = 0; i < target.length; i++) {
        arr.push(target[i][name]);
      }
      return arr;
    },
    handle(arr) {
      var brr = [];
      arr.forEach(item => {
        brr.push({
          itemuuid: item.ITEMUUID,
          foodHandle: item.FOOD_HANDLE == "1" ? "3" : "2",
          foodResult: item.FOOD_RESULT
        });
      });

      return brr;
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  margin-top: 20px;
}
.ivu-col {
  display: flex;
  align-items: center;
}
.itemLabel {
  justify-content: center;
  color: #fff;
}
.option {
  overflow: hidden;
  > div {
    float: right;
    margin-left: 30px;
  }
}
</style>
