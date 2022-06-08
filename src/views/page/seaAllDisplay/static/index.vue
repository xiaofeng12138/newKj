<template lang="html">
  <div class="quanjing">
    <h3>全景展示</h3>
    <div class="header">
        <AutoComplete class="qj-auto"
            v-model="inputedValue"
            placeholder="请输入...."
            style="width:200px;margin-right:10px;"
            :data="inputedMatchList"
            @on-search="inputChange">
        </AutoComplete>

      <Select v-model="selectedValue" slot="append" style="width: 120px">
          <Option value="0">订单号</Option>
          <Option value="1">提单号</Option>
          <Option value="2">报关单号</Option>
      </Select>
      <div class="button">
        <Button type="primary" class="" @click="query">查询</Button>
      </div>
    </div>
    <div class="content">
      <div class="flowWrapper" v-if="this.showFlow && this.datakeys > 0">
        <!-- row 1 -->
        <line2-length length="220" class="row-1 col-1x"></line2-length>
        <block-1
          class="row-1 col-1x"
          text="接货地"
          datakey="deliveryPlace"
          position="bottom-start">
        </block-1>
        <block-1
          line="true"
          class="row-1 col-2"
          text="始发港装船"
          datakey="firstPOL"
          position="bottom">
        </block-1>
        <block-1
          line="true"
          class="row-1 col-3"
          text="运输路径"
          datakey="transportPath"
          position="bottom">
        </block-1>
        <line-length length="300" class="row-1 col-4"></line-length>
        
        <!-- <block-1
          line="true"
          class="row-1 col-6"
          text="计划靠泊"
          datakey="planShoreUp"
          position="left-start">
        </block-1> -->
        <block-1
          line="true"
          class="row-1 col-6"
          text="实际靠泊"
          datakey="actualShore"
          position="left-start">
        </block-1>
        <line-length length="138" class="row-1 col-7"></line-length>
        <block-1
          line="true"
          class="row-1 col-8"
          text="卸箱"
          datakey="yard"
          position="left-start">
        </block-1>
        <line-length length="138" class="row-1 col-9"></line-length>
        <!-- <block-1 line="true" class="row-1 col-9" text="转栈堆场"></block-1> -->
        <curve-1 width="40" height="132" class="col-10"></curve-1>


        <!-- row 1.5 -->
        <curve-2 width="20" height="20" class="row-2 col-3"></curve-2>
        <block-1
          line="true"
          class="row-1d5 col-4"
          text="海关接收舱单"
          datakey="importManifest"
          position="left">
        </block-1>
        <block-1
          line="true"
          class="row-1d5 col-5"
          text="海关接收申报"
          datakey="declare"
          position="left">
        </block-1>
        <block-1
          line="true"
          class="row-1d5 col-6"
          text="海关放行"
          datakey="release"
          position="left">
        </block-1>
        <curve-1 width="34" height="20" class="row-1d5 col-7"></curve-1>


        <!-- row 2 -->
        <block-1
          class="row-2 col-0"
          text="合同签订"
          datakey="contractInfo"
          position="right">
        </block-1>
        <block-1
          line="true"
          class="row-2 col-1"
          text="订舱"
          datakey="bookingInfo"
          position="right">
        </block-1>
        <line-length length="138" class="row-2 col-2"></line-length>
        <block-1
          line="true"
          class="row-2 col-3"
          text="提单就绪"
          datakey="billInfo">
        </block-1>
        <line-length length="138" class="row-2 col-4"></line-length>
        <block-1
          line="true"
          class="row-2 col-5"
          text="换提货单"
          datakey="billLadingInfo">
        </block-1>
        <line-length length="138" class="row-2 col-6"></line-length>
        <block-1 line="true" class="row-2 col-7" text="提货计划受理" datakey="deliveryPlan"></block-1>
        <line-length length="138" class="row-2 col-8"></line-length>
        <line-length length="138" class="row-2 col-9"></line-length>
        <block-1
          line="true"
          class="row-2 col-10"
          text="提离"
          datakey="liftOff"
          position="left">
        </block-1>


        <!-- row 3 -->
        <curve-3 width="10" height="22" class="row-3 col-3"></curve-3>
        <line-length length="138" class="row-3 col-4"></line-length>
        <block-1
          line="true"
          class="row-3 col-5"
          text="设备交接单"
          datakey="handoverEquipment"
          position="top">
        </block-1>
        <line-length length="138" class="row-3 col-6"></line-length>
        <line-length length="138" class="row-3 col-7"></line-length>
        <line-length length="138" class="row-3 col-8"></line-length>
        <line-length length="138" class="row-3 col-9"></line-length>
        <curve-4 width="40" height="22" class="row-3 col-10"></curve-4>
      </div>

    </div>
  </div>
</template>

<script>
import Block1 from "./components/block-1.vue";
import Block from "./components/block.vue";
import LineLength from "./components/lineLength.vue";
import Curve1 from "./components/curve-1.vue";
import Curve4 from "./components/curve-4.vue";
import Curve3 from "./components/curve-3.vue";
import Curve2 from "./components/curve-2.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Line2Length from "./components/line2Length.vue";

export default {
  data() {
    return {
      selectedValue: "",
      inputedValue: "",

      block1data: "",
      showFlow: false,
      temp: "1",
      showyunshuDetail: false
    };
  },
  computed: {
    ...mapGetters("quanjing", ["datakeys"]),
    ...mapState("quanjing", {
      resdata: state => state.resdata,
      blnumList: state => state.blnumList
    }),

    inputedMatchList() {
      if (this.selectedValue === "1") {
        return this.blnumList;
      } else {
        return [];
      }
    }
  },
  components: {
    "block-1": Block1,
    block: Block,
    "line-length": LineLength,
    "curve-1": Curve1,
    "curve-4": Curve4,
    "curve-3": Curve3,
    "curve-2": Curve2,
    "line2-length": Line2Length
  },
  mounted() {
    //从中博会动态监测2里面跳转过来的
    if (this.$route.params.from === "dynamic") {
      this.inputedValue = this.$route.params.billNo;
      this.selectedValue = "1";
      this.query();
    }
  },
  methods: {
    ...mapActions("quanjing", ["getQuanJingData", "getBillNoList"]),
    async query() {
      if (!this.selectedValue) {
        this.$Modal.warning({
          // title: 'title',
          content: "请选择单号类型"
        });
      } else {
        // console.log(this.inputedValue, this.selectedValue);
        // return;
        let res = await this.getQuanJingData({
          number: this.inputedValue, // this.inputedValue, // COSU4512710100
          type: this.selectedValue
        });
        this.showFlow = true;
        // console.log(res);

        if (Object.keys(res).length < 1) {
          this.$Modal.warning({ content: "未查询到数据" });
        }
      }
    },
    getBlockClickEvent() {
      this.showyunshuDetail = !this.showyunshuDetail;
    },
    inputChange(val) {
      if (this.selectedValue === "1") {
        this.getBillNoList({ blnum: this.inputedValue });
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="scss">
$lineWidth: 40px;
$line1top: 40px;
$row2height: 220px;
$blockWidth: 98px;
$blockWidthAddLine: $blockWidth + $lineWidth;

.quanjing {
  .header {
    display: flex;
    flex-direction: row;
    margin-top: 24px;
    border-bottom: 1px solid #dddee1;
    padding-bottom: 24px;

    .button {
      margin-left: 20px;
    }

    .ivu-select-dropdown {
      max-height: 350px;
    }
  }

  h3 {
    font-size: 20px;
    color: #1c2438;
    &:before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 20px;
      margin-top: -3px;
      vertical-align: middle;
      margin-right: 10px;
      background: rgb(0, 80, 141);
    }
  }

  .content {
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;

    .flowWrapper {
      position: relative;
      margin-top: 20px;
      width: 1480px;
      height: 420px;
    }
  }

  .row-1 {
    // top: $line1top;
  }

  .row-1d2 {
    top: 88px;
  }

  .row-1d5 {
    top: 112px;
  }

  .row-2 {
    top: $row2height;
  }

  .row-3 {
    top: $row2height + 110;
  }

  .col-0 {
    left: 0px;
  }

  .col-1 {
    left: $blockWidth;
  }
  .col-1x {
    left: $blockWidth + $lineWidth;
  }

  .col-2 {
    left: $blockWidthAddLine + $blockWidth;
  }

  .col-3 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine;
  }

  .col-4 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 2;
  }

  .col-5 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 3;
  }

  .col-6 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 4;
  }

  .col-7 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 5;
  }

  .col-8 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 6;
  }
  .col-9 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 7;
  }
  .col-10 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine * 8;
  }
}
</style>
