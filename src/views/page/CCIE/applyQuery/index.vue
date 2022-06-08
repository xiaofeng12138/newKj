<template>
<div class="myRisk">
    
    <!-- <h2 style="font-family:SimSun;margin-bottom:10px;" >品尝试用散发申请打印</h2> -->
    <p class="desicription">未做正式申请的证明函可在此功能补做申请，并打印作业单交给海关作业窗口审批。</p>
    
    <Row class="myRiskRow" >
        <Col span=7 class="item">
            <Col span=8 class="itemLabel">
                <span>展商名称:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入展商名称" class="customInput" v-model="params2.exhibitor" size="large"></Input>
            </Col>
        </Col>
        <Col span=7 class="item">
            <Col span=8 class="itemLabel">
                <span>展台号:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入展台号" class="customInput" v-model="params2.boothno" size="large"></Input>
            </Col>
        </Col>       
        <Col span=7 class="item" >
            <Col span=8 class="itemLabel">
                <span>物资证明函编号:</span> 
            </Col>
            <Col span=16>
                <Input placeholder="请输入物资证明函编号" class="customInput" v-model="params2.certificateno" size="large"></Input>
            </Col>
        </Col>
    </Row>
    <Row class="myRiskRow">
        <Col span=7 class="item">
            <Col span=8 class="itemLabel">
                <span>申请状态:</span> 
            </Col>
            <Col span=16>
                <Select v-model="params2.isApplied" class="customSelect">
                    <Option v-for="item in stateList" :key="item.value" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Col>
        <Col span=7 class="item">
            <Col span=8 class="itemLabel">
                <span>合格证明类型:</span> 
            </Col>
            <Col span=16>
                <Select v-model="params2.proveType" class="customSelect">
                    <Option v-for="item in proveTypeList" :key="item.value" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Col>     
        <Col span=7 class="item">
            <Col span=8 class="itemLabel">
                <span>是否试吃试用:</span> 
            </Col>
            <Col span=16>
                <Select v-model="params2.isExamined" class="customSelect">
                    <Option v-for="item in examinedList" :key="item.value" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
        </Col>  
        <Col span=2 class="item" push=1>
            <Button size='large' type='primary' @click="query('')" long>查询</Button>
        </Col>
    </Row>
    
    <Table border :columns='columns' ref="selection" :data='tableLits'  class="customTable small"  style='margin:20px 0' ></Table>
    <Row>
        <Col span=2>
            <Button size='large' type='primary' @click="edit" >批量修改</Button>
        </Col>
        <Col span=3 push=1>
            <Button size='large'  type='primary' @click="print('all')" >一键打印</Button>
        </Col>
        <Col span=2 push=1>
            <Button size='large' type='primary' @click="print" >打印</Button>
        </Col>
        <Col span=16 push=1 class="customPage noMargin" >
            <Page style="float:right" show-total :total="totalNumber" v-if="totalNumber>0" :page-size='pageSize' show-sizer
            @on-change="changePage" @on-page-size-change='changeSize' ></Page> 
        </Col>
    </Row>
    <!--详情-->
    <Modal v-model="detailDataModel" width="1200" class="customModal" :mask-closable="false" footer-hide>
        <p slot="header" style="text-align:center;color:#fff">
            <span>List of Overseas Exhibits 2018年首届中国国际进口博览会进境物资清单</span>
        </p>
        <div style="text-align:center">
            <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody'
            :disableStatus="disableStatus"></detail-table>
        </div>
    </Modal>
    <div id="myRiskPrint" v-show="false">
        <print-risk v-if="item.body.length>0" v-for="item in printList" :key="item.ITEMUUID" :head='item.head' :tableLits='item.body'/>
    </div>
</div>
    
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import detailTable from "../components/detail/detailTable";
import { getUserRole } from "@/until/getToken";
import printRisk from "../components/print/printRisk";
export default {
  name: "manage",
  components: { detailTable, printRisk },
  props: {
    tempRole: {
      type: String
    }
  },
  data() {
    return {
      tempLists: {},
      totalNumber: 0,
      pageSize: 10,
      role: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "试用",
          key: "TRYOUT",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.TRYOUT || "",
                className:'customInput'
              },
              on: {
                "on-blur": event => {
                  this.tableLits[params.index].TRYOUT = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "品尝",
          key: "TASTE",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.TASTE || ""
              },
              on: {
                "on-blur": event => {
                  this.tableLits[params.index].TASTE = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "散发",
          key: "DISTRIBUTE",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("Input", {
              props: {
                value: params.row.DISTRIBUTE || ""
              },
              on: {
                "on-blur": event => {
                  this.tableLits[params.index].DISTRIBUTE = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "合格证明类型",
          key: "PROVE_TYPE",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h(
              "Select",
              {
                attrs: {
                  value: params.row.PROVE_TYPE || ""
                },
                on: {
                  "on-change": value => {
                    this.tableLits[params.index].PROVE_TYPE = value;
                  }
                }
              },
              [
                h(
                  "Option",
                  {
                    attrs: {
                      value: "1"
                    }
                  },
                  "参展国家方证书"
                ),
                h(
                  "Option",
                  {
                    attrs: {
                      value: "2"
                    }
                  },
                  "第三方检测报告"
                ),
                h(
                  "Option",
                  {
                    attrs: {
                      value: "3"
                    }
                  },
                  "参展方自验合格报告"
                ),
                h(
                  "Option",
                  {
                    attrs: {
                      value: "4"
                    }
                  },
                  "自我承诺"
                )
              ]
            );
          }
        },
        {
          title: "物资清单号",
          key: "LISTHEADNO",
          align: "center",
          width: 220,
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
          align: "center",
          width: 180
        },
        {
          title: "参展商",
          key: "EXHIBITOR",
          align: "center",
          width: 120
        },
        {
          title: "数量",
          key: "QUANTITY",
          align: "center",
          width: 90
        },
        {
          title: "总价",
          key: "TOTALPRICE",
          align: "center",
          width: 90
        },
        {
          title: "馆号",
          key: "HALLNO",
          align: "center",
          width: 90
        },
        {
          title: "报关单号",
          key: "ENTRY_ID",
          width: 150,
          align: "center"
        },
        {
          title: "展品名称规格中文",
          key: "GOODSDESCRIPTIONCN",
          align: "center",
          width: 200
        },

        {
          title: "原产地",
          key: "COUNTRYOFORIGIN",
          align: "center",
          width: 80
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
          width: 160
        },

        {
          title: "国别/地区",
          key: "EXHIBITORCOUNTRY",
          align: "center",
          width: 120
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
        },
        {
          title: "打印人",
          key: "PRINT_USER",
          align: "center",
          width: 120
        },
        {
          title: "打印时间",
          key: "PRINT_TIME",
          align: "center",
          width: 140
        }
      ],
      printList: [],
      isAll: "",
      tableLits: [],
      params: {
        exhibitor: "",
        boothno: "",
        certificateno: "",

        currPage: 1,
        pageSize: 10
      },
      params2: {
        exhibitor: "",
        boothno: "",
        certificateno: "",
        isApplied: 2,
        proveType: "0",
        currPage: 1,
        pageSize: 10,
        isExamined: 1
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
      printLits: [],
      stateList: [
        {
          value: 2,
          label: "全部状态"
        },
        {
          value: 1,
          label: "已申请"
        },
        {
          value: 0,
          label: "未申请"
        }
      ],
      proveTypeList: [
        {
          value: "0",
          label: "全部合格证明类型"
        },
        {
          value: "1",
          label: "参展国家方证书"
        },
        {
          value: "2",
          label: "第三方检测报告"
        },
        {
          value: "3",
          label: "参展方自验合格报告"
        },
        {
          value: "4",
          label: "自我承诺"
        }
      ],
      examinedList: [
        {
          value: 2,
          label: "全部状态"
        },
        {
          value: 1,
          label: "试吃试用"
        },
        {
          value: 0,
          label: "非试吃试用"
        }
      ]
    };
  },
  mounted() {
    // this.role = this.tempRole || getUserRole()[0];
  },
  methods: {
    changePage(pageNum) {
      this.query(pageNum);
    },
    changeSize(value) {
      this.params.pageSize = this.params2.pageSize = value;
      this.query("");
    },
    query(pageNum) {
      this.params.currPage = pageNum || 1;
      this.params2.currPage = pageNum || 1;
      var url = "";
      let req = Object.create(null);

      req = Object.assign({}, this.params2);
      if (req.isApplied == 2) {
        delete req.isApplied;
      }
      if (req.isExamined === 2) {
        delete req.isExamined;
      }
      req.proveType = req.proveType == "0" ? "" : req.proveType;
      url = interfaceUrl.queryAllExaminesForEdit;

      publicInter(url, req).then(r => {
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
    print(value) {
      let url = "";
      let param = Object.create(null);
      if (value === "all") {
        param = {};
        url = interfaceUrl.queryMaterialsExaminePrintByCertificateno;
      } else {
        url = interfaceUrl.queryMaterialsExaminePrint;
        var selection = this.$refs.selection.getSelection();
        if (selection.length == 0) {
          this.$Message.info({
            content: "请先勾选需要打印的数据",
            duration: 3,
            closable: true
          });
          return;
        }
        param = [];
        for (let i = 0, len = selection.length; i < len; i++) {
          param.push(selection[i].LISTHEADNO);
        }
      }

      publicInter(url, param).then(r => {
        if (r) {
          if (r.code === "200") {
            this.printList = r.data;
            let that = this;
            setTimeout(function() {
              let newHtml = document.getElementById("myRiskPrint").innerHTML,
                oldHtml = document.body.innerHTML;
              document.body.innerHTML = newHtml;
              window.print();
              window.location.reload();
              document.body.innerHTML = oldHtml;
            }, 50);
          } else {
            this.$Modal.error({ content: r.data });
          }
        }
      });
    },
    edit() {
      var selection = this.$refs.selection.getSelection();
      if (selection.length == 0) {
        this.$Message.info({
          content: "请先勾选需要修改的数据",
          duration: 3,
          closable: true
        });
        return;
      }
      let param = [];
      for (let i = 0, len = selection.length; i < len; i++) {
        let paramUnit = {
          itemuuid: selection[i].ITEMUUID,
          tryout: selection[i].TRYOUT,
          taste: selection[i].TASTE,
          distribute: selection[i].DISTRIBUTE,
          proveType: selection[i].PROVE_TYPE
        };
        param.push(paramUnit);
      }
      publicInter(interfaceUrl.editExpoList, param).then(r => {
        if (r) {
          if (r.code === "200") {
            this.$Message.success(r.data);
          } else {
            this.$Modal.error({ content: r.message });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  margin-top: 20px;
}
.desicription{
    text-align: left;
    color: #fff;
    font-size: 14px;
}
.myRiskRow {
  .ivu-col {
    display: flex;
    align-items: center;
  }
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
