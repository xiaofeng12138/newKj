<template lang="html">
  <div class="">
    <Row type="flex" justify="end">
      <router-link to='/dashboard/baoguanbill'>
        <Button type="primary" style="margin-right: 10px;">
          委托报关行
        </Button>
      </router-link>
      <Button type="info" @click="next" :disabled="preMergeListDisable">自行归并</Button>
      <!--@click="submit('1')"-->
      <Button type="success" style="margin-left:10px;" @click = "newSubmit" :disabled="preMergeListDisable"  title="不归并，直接生成报关单表体">直接生成</Button>
    </Row>
    <Row style="margin-top:10px;">
      <Table :columns="columns1" :data="preMergeList"></Table>
    </Row>

    <Modal
        width="980"
        v-model="mergeModal"
        title="归并结果："
        @on-ok="submit('2')"
        @on-cancel="">
        <Table :columns="columns10" :data="mergeResultList" size="small"></Table>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import expandRow from "./expand.vue";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  data() {
    return {
      columns1: [
        {
          title: "物料编号",
          key: "MATERIALNO"
        },
        {
          title: "项号",
          key: "ITEM"
        },
        {
          title: "名称",
          key: "GOODSDESZH"
        },
        {
          title: "数量",
          key: "ALNULNOTEMATERIALAMOUNT"
        },
        {
          title: "单位",
          key: "TOTALQUANTITYUNIT"
        },
        {
          title: "订单号",
          key: "PURCHASEORDERNO"
        },
        {
          title: "提单号",
          key: "BILLNO"
        }
      ],

      billNo: "",
      mergeModal: false,
      value1: "1",

      columns10: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "税则号",
          key: "shuiZeHao"
        },
        {
          title: "原产国",
          key: "yuanChanGuo"
        },
        {
          title: "申报中文品名",
          key: "shenBaoCNName"
        },
        {
          title: "总价",
          key: "totalSum"
        }
      ]
    };
  },
  computed: {
    ...mapState("bill", {
      preMergeList: state => state.preMergeList,
      mergeResultList: state => state.mergeResultList,
      preMergeListDisable: state =>
        state.preMergeListDisable == "false" ? true : false
    })
  },
  methods: {
    ...mapActions("bill", [
      "getPreMergeList",
      "sumbitMergeList",
      "getMergeResultList"
    ]),
    async submit(flag) {
      let res = await this.sumbitMergeList({ billNo: this.billNo, flag });
      if (res.code === "200") {
        this.instance("success", res.result);
      } else {
        this.instance("error", res.result);
      }
    },
    newSubmit() {
      let list = [];
      for (let i = 0; i < this.preMergeList.length; i++) {
        let kli = {};
        kli["CODETS"] = this.preMergeList[i].hscode;
        kli["ORIGINALCOUNTRY"] = this.preMergeList[i].origincountrycode;
        kli["GNAME"] = this.preMergeList[i].materialnamecn;
        kli["GMODEL"] = this.preMergeList[i].dmodel;
        kli["GQTY"] = this.preMergeList[i].ALNULNOTEMATERIALAMOUNT;
        kli["GUNIT"] = this.preMergeList[i].TOTALQUANTITYUNIT;
        kli["UNITPRICE"] = this.preMergeList[i].UNITPRICEBLLINKPO;
        kli["CURR"] = this.preMergeList[i].CURRENCY;
        kli["MATERIALNO"] = this.preMergeList[i].MATERIALNO;
        list.push(kli);
      }
      let params = {
        billNo: this.billNo,
        list: list
      };
      publicInter(interfaceUrl.addUnMergeredMaterialList, params).then(r => {
        if (r) {
          if (r["code"] == "200") {
            this.$router.push({
              name: "sort",
              params: {
                billNo: this.billNo
              }
            });
          } else if (r["code"] == "500") {
            this.$router.push({
              name: "sort",
              params: {
                billNo: this.billNo,
                disableStatus: true
              }
            });
            this.$Modal.confirm({
              title: "",
              content:
                "<p>" +
                r.errMsg +
                "</p><br/><br/><p>是否立即进行物料主数据上传？</p>",
              onOk: () => {
                this.$router.push({
                  name: "ERPInformationUpload",
                  params: {
                    name: "name6"
                  }
                });
              },
              onCancel: () => {}
            });
          }
        }
      });
    },
    async next() {
      let param =
        this.$route.params.air == "yes"
          ? { billNo: this.billNo, air: "yes" }
          : { billNo: this.billNo };
      console.log(param, "hhhhhhh");
      let res = await this.getMergeResultList(param);
      this.$router.push({ name: "concat", params: param });

      //   this.mergeModal = true
    },
    instance(type, msg) {
      const title = "提交结果";
      const content = msg;
      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: content
          });
          break;
        case "success":
          let _this = this;
          this.$Modal.success({
            title: title,
            content: content,
            onOk() {
              _this.$router.push({ name: "bill" });
            }
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: content
          });
          break;
      }
    }
  },
  mounted() {
    this.billNo = this.$route.params.billNo;
    let param =
      this.$route.params.air == "yes"
        ? { air: "yes", billNo: this.billNo }
        : { billNo: this.billNo };
    this.getPreMergeList(param);
  }
};
</script>

<style lang="scss">
.ivu-table-expanded-cell {
  padding: 0;
}
</style>
