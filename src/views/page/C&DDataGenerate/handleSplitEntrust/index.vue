<template>
    <div>
        <h1 style="padding-bottom: 20px;">处理拆单提单委托</h1>
        <Row style="margin: 10px 0;">
            <Col span="1">
                <span class="centerSpan">提单号</span>
            </Col>
            <Col span="5">
                <Input v-model="input1" placeholder="提单号" style="width: 200px"></Input>
            </Col>
            <Col span="2">
                <span class="centerSpan">委托企业</span>
            </Col>
            <Col span="5">
                <Input v-model="input2" placeholder="委托企业" style="width: 200px"></Input>
            </Col>
            <Col span="2">
                <Button type="primary" long @click="needDealquery()">查询</Button>
            </Col>
        </Row>
        <Table border ref="selection" :columns="columns1" :data="data1" no-data-text="-"></Table>
        <Row style="margin-top: 10px;">
            <Button type="primary" style="margin-right: 20px" @click="batchSubmitFun('')">批量读取</Button>
        </Row>
    </div>
</template>

<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import myTooltip from "../commonComponents/myTooltip";
import myTooltip2 from "../commonComponents/myTooltip2";
import { getCookie } from "@/until/getToken";
export default {
  name: "needDeal",
  components: { myTooltip },
  data() {
    return {
      input1: "",
      entrustDate: "",
      input2: "",
      columns1: [
        {
          type: "selection",
          width: 58,
          align: "center"
        },
        {
          title: "提单号",
          key: "BILLNO"
        },
        {
          title: "拆单标识",
          key: "ERPTEMPNUM"
        },
        {
          title: "委托企业",
          key: "COMPANYNAME"
        },
        {
          title: "当前状态",
          render: (h, params) => {
            return h(myTooltip2, {
              props: {
                content: this.getStatus(params.row.STATUS),
                data1: params.row.listStatus,
                role: "cb"
              }
            });
          }
        },
        {
          title: "报关单号",
          key: "CUSNO"
        },
        {
          title: "回执状态",
          render: (h, params) => {
            return h(myTooltip, {
              props: {
                content: this.getCusStatus(params.row.STATUSRE),
                data1: params.row.list
              }
            });
          }
        },
        {
          title: "回执时间",
          key: "STATUSTIME"
        },
        {
          title: "操作",
          key: "",
          width: 250,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  attrs: {
                    disabled:
                      (parseInt(params.row.STATUS) ||
                        params.row.STATUS == "null") < 1
                        ? false
                        : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      var paramsArray = [];
                      paramsArray.push(params.row);
                      this.batchSubmitFun(paramsArray);
                    }
                  }
                },
                "读取"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  attrs: {
                    disabled:
                      params.row.STATUS == "null" ||
                      params.row.isDisabled == "true"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(getCookie("roler"), "cai");
                      this.$router.push({
                        name: "concat",
                        params: {
                          billNo: params["row"]["BILLNO"],
                          role: getCookie("roler"), //报关行,
                          CNCOMPANYCODE: params["row"]["CNCOMPANYCODE"],
                          erpTempnum: params["row"]["ERPTEMPNUM"]
                        }
                      });
                    }
                  }
                },
                "归并"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  attrs: {
                    disabled: parseInt(params.row.STATUS) >= "2" ? false : true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let shangchuanStatus = false;
                      if (params.row.STATUS === "3") {
                        shangchuanStatus = true;
                      }
                      this.$router.push({
                        name: "baoguanSearch",
                        params: {
                          billNo: params["row"]["BILLNO"],
                          role: "ROLE_CB", //报关行,
                          CNCOMPANYCODE: params["row"]["CNCOMPANYCODE"],
                          shangchuanStatus: shangchuanStatus,
                          erpTempnum: params["row"]["ERPTEMPNUM"]
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      data1: [],
      role: ""
    };
  },
  methods: {
    //查询未处理提单
    needDealquery() {
      var params = {
        billno: this.input1,
        entrustCompanyName: this.input2
      };
      publicInter(interfaceUrl.cusBroGetBLListAfChaiDan, params).then(r => {
        if (r && r.result) {
          this.data1 = r.result;
        }
      });
    },
    batchSubmitFun(paramsArray) {
      var selection = paramsArray || this.$refs.selection.getSelection();
      if (selection.length == 0) {
        this.$Message.info({
          content: "请先勾选需要操作的数据",
          duration: 3,
          closable: true
        });
        return;
      }
      var selectionRead = selection.filter(function(x) {
        return !!x.STATUS;
      });
      if (selectionRead.length > 0) {
        this.$Message.warning("您选择的状态中包含已读信息，请重新勾选");
        return;
      }
      var billNos = [];
      for (var i = 0; i < selection.length; i++) {
        billNos.push({
          billno: selection[i].BILLNO,
          CNCOMPANYCODE: selection[i].CNCOMPANYCODE,
          id: selection[i].ERPTEMPNUM
        });
      }
      var params = {
        billNos: billNos,
        status: 2,
        //后台判断是报关行需要的
        CNCOMPANYCODE: "1"
      };
      let url = interfaceUrl.changeBLToCustomsBrokerStatusAfChaiDan;
      publicInter(url, params).then(r => {
        if (r && r.result) {
          this.$Message.success(r.result);
          this.needDealquery();
        } else {
          this.$Message.error(r.error);
        }
      });
    },
    getCusStatus(value) {
      var info = "";
      if (value == "1") {
        info = "协同入库成功";
      } else if (value == "2") {
        info = "协同入库失败";
      } else if (value == "3") {
        info = "回填数据失败";
      } else if (value == "4") {
        info = "逻辑校验失败";
      } else if (value == "5") {
        info = "回写数据失败";
      } else if (value == "6") {
        info = "协同处理成功";
      } else if (value == "C") {
        info = "(C)已放行-无纸验放查验通知书（放行）";
      } else if (value == "F") {
        info = "(F)已放行-放行交单";
      } else if (value == "G") {
        info = "(G)已放行-接单交单";
      } else if (value == "I") {
        info = "(I)已放行-无纸放行通知（放行）";
      } else if (value == "R") {
        info = "(R)已放行-结关，可办理进口付汇、出口结汇、出口退税联的签发手续";
      } else if (value == "W") {
        info = "(W)已放行-无纸验放通知（审结）";
      } else if (value == "J") {
        info = "(J)已放行-通关无纸化审结";
      } else if (value == "P") {
        info = "(P)已放行-放行回执";
      } else if (value == "#") {
        info = "(#)已放行-通关无纸化准予进卡通知书";
      } else if (value == "A") {
        info = "(A)入库未审批-放行前删除";
      } else if (value == "B") {
        info = "(B)入库未审批-担保验放";
      } else if (value == "D") {
        info = "(D)入库未审批-放行后删除";
      } else if (value == "H") {
        info = "(H)入库未审批-挂起，与审单中心联系";
      } else if (value == "L") {
        info = "(L)入库未审批-入预录入库成功";
      } else if (value == "X") {
        info = "(X)入库未审批-准予进港";
      } else if (value == "T") {
        info = "(T)入库未审批-需交税费";
      } else if (value == "M") {
        info = "(M)入库未审批-报关单重审";
      } else if (value == "E") {
        info = "(E)不放行-入库失败或退单";
      } else if (value == "Z") {
        info = "(Z)不放行-退回修改";
      } else if (value == "S") {
        info = "(S)不放行-QP处理失败";
      } else if (value == "Y") {
        info = "(Y)不放行-申报失败";
      } else if (value == "U") {
        info = "(U)不放行-重新申报";
      } else if (value == "9") {
        info = "(9)不放行-上载申报失败（与数据中心联系）";
      }
      return info;
    },
    getStatus(value) {
      switch (value) {
        case "null":
          return "未读";
          break;
        case "1":
          return "已读处理中";
          break;
        case "2":
          return "已归并";
          break;
        case "3":
          return "已发送";
          break;
        case "4":
          return "已撤回";
          break;
        default:
          return "未读";
      }
    }
  },
  created() {
    this.needDealquery();
    this.role = getCookie("roler");
  }
};
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
.centerSpan {
  line-height: 32px;
}
</style>