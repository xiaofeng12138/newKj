<template lang="html">
  <div class="costomStatus">
      <h1 style="padding-bottom: 20px;">通关状态</h1>
    <Row type="flex" align="middle">
        <Col span="6">

          <Input v-model="inputedValue" style="width:100%;">
              <span slot="prepend">报关单号</span>
          </Input>
        </Col>

        <Col span="2" style="text-align:right;">
          提单号：
        </Col>

        <Col span="5">
          <AutoComplete class="qj-auto"
              v-model="billVale"
              placeholder="请输入...."
              :data="billlist"
              @on-search="inputChange">
          </AutoComplete>
        </Col>
        <Col span="4" style="margin-left:20px;">

          <Button type="primary" @click="search">搜索</Button>
        </Col>
    </Row>

    <Row style="margin-top:20px;">
      <Table :columns="columns1" :data="list"></Table>
    </Row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      inputedValue: "",
      billVale: "",
      billlist: [],

      columns1: [
        {
          title: "报关单号",
          key: "CUSTOMS_DECLARE_NUM"
        },
        {
          title: "提单号",
          key: "BL_NUM"
        },
        {
          title: "状态",
          key: "STATUS_TYPE"
        },
        {
          title: "状态时间",
          key: "STATUS_TIME"
        }
      ]
    };
  },
  methods: {
    ...mapActions("portSearch", ["costomSearch", "resetState"]),
    ...mapActions("quanjing", ["getBillNoList"]),

    async search() {
      // console.log(this.inputedValue, this.billVale);
      let res = this.costomSearch({
        declareNum: this.inputedValue,
        blnum: this.billVale
      }); //221020181000007008
      res.then(r => {
        if (r.code == "400") {
          this.$Message.error(r.error);
        }
      });
    },
    async inputChange(val) {
      let list = await this.getBillNoList({ blnum: this.billVale });
      this.billlist = list;
    }
  },

  computed: {
    ...mapState("portSearch", {
      list: state => state.costomList
    }),
    ...mapState("quanjing", {
      blnumList: state => state.blnumList
    })
  },
  mounted() {
    this.resetState();
  }

  // }
};
</script>

<style lang="scss">
.costomStatus {
  .ivu-select-dropdown {
    max-height: 350px;
  }
}
</style>
