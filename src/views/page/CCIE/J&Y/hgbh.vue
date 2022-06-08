<template>
  <div>
    <Row style="border-bottom:2px solid #ccc">
      <Col span="12">
        <h2>中国银行担保</h2>
      </Col>
    </Row>
    <div class="title" v-if="showPage">
      <span>中国银行担保总额度/已用额度/货值：1(亿元)/{{(this.BOC.USEDAMOUNT / 10000).toFixed(0)}}万元/{{this.BOC.USDTOTAL}}美元</span>
    </div>
    <Table border :columns="columns" :data="showdbTable" class="self" style="margin-top:20px"></Table>
    <div class="bottombtn">
      <Page :total="total" v-show="total" show-total @on-change="changePage"></Page>
    </div>
    <customs-unit ref="abc" :modelFlag="flag" @myCloseWin="closeWin"></customs-unit>
  </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter, filedownload, publicGetInter } from "@/api/http";
import customsUnit from "./customsUnit";
export default {
  components: {
    customsUnit
  },
  data() {
    return {
      showPage: false,
      showdbTable: [],
      flag: false,
      total: 0,
      detailData: {},
      numPage: 1,
      columns: [
        {
          title: "序号",
          key: "ROW_ID",
          align: "center",
          width: 80
        },
        {
          title: "报关单号",
          key: "ENTRY_ID",
          align: "center",
          width: 240
        },
        {
          title: "经营单位名称",
          key: "TRADE_NAME",
          align: "center",
          width: 250
        },
        {
          title: "申报单位名称",
          key: "AGENT_NAME",
          align: "center"
        },
        {
          title: "实扣总担保额度",
          key: "RSV1_CUT",
          align: "center"
        },
        {
          title: "申报日期",
          key: "D_DATE",
          align: "center"
        },

        {
          title: "担保期限剩余天数",
          key: "SURPLUSDAY",
          align: "center"
        },
        {
          title: "报关单备注栏信息",
          key: "NOTE_S",
          align: "center",
          width: 400
        }
      ],
      startDate: "",
      endDate: "",
      gId: "",
      BOC: ""
    };
  },
  methods: {
    startTimne(e) {
      this.startDate = e[0];
      this.endDate = e[1];
    },

    queryUsedInfo() {
      publicGetInter(interfaceUrl.queryGuranteeList).then(r => {
        if (r.code == 200) {
          this.BOC = r.list[0];
          this.showPage = true;
        }
      });
    },
    queryData(page) {
      //保函
      let requsetData = {
        pageSize: 10,
        pageNo: page,
        gid: "GC0603220000355"
      };
      publicInter(interfaceUrl.queryGuranteeEntryList, requsetData).then(
        res => {
          if (res.total > 0) {
            this.showdbTable = res.list;
            this.total = res.total;
          }
        }
      );
    },
    rowClick(e) {
      this.$refs.abc.query(e.ENTRY_ID);
      this.flag = true;
      this.showdbModal = false;
    },
    closeWin() {
      this.flag = false;
    },

    changePage(page) {
      this.numPage = page;
      this.queryData(page);
    }
  },
  mounted() {
    this.queryData(1);
    this.queryUsedInfo();
  }
};
</script>

<style lang="scss" scoped>
.title {
  height: 2rem;
  position: relative;
  .switch {
    position: absolute;
    top: 50%;
    left: 70%;
    font-size: 1rem;
    transform: translate(-70% -50%);
  }
  span {
    height: 2rem;
    width: auto;
    text-align: center;
    position: relative;
    font-size: 1.5rem;
  }
}
.bottombtn {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  .ivu-page {
    margin: 10px 20px 0 0;
  }
}
</style>
