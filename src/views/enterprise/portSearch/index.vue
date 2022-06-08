<template lang="html">
  <div class="">
        <h1 style="padding-bottom: 20px;">港口信息查询</h1>
    <Row type="flex" align="middle">
        <Col span="2">提单号：</Col>
        <Col span="6">
          <AutoComplete class="qj-auto"
              v-model="inputedValue"
              placeholder="请输入...."
              :data="billlist"
              @on-search="inputChange"
              style="width:100%;">
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
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      inputedValue: '',
      billlist: [],

      columns1: [
        {
          title: '箱号',
          key: 'CNTR_NUM'
        },
        {
          title: '英文船名',
          key: 'VSL_NME'
        },
        {
          title: '中文船名',
          key: 'VSL_NME_CN'
        },
        {
          title: '航次',
          key: 'VOY_REF'
        },
        {
          title: '靠泊时间',
          key: 'BTHDT'
        },
        {
          title: '计划受理时间',
          key: 'PLAN_TIME'
        },
        {
          title: '靠泊码头名称',
          key: 'TERMINAL'
        },
        {
          title: '泊位',
          key: 'BERTH'
        },
        {
          title: '卸船时间',
          key: 'DICHARGE_TIME'
        },
        {
          title: '提离港区时间',
          key: 'DELIVERY_TIME'
        },
        {
          title: '转栈时间',
          key: 'STACK_TIME'
        },
        {
          title: '车牌',
          key: 'TRUCK_NO'
        }
      ]
    }
  },

  methods: {
    ...mapActions('portSearch', [
      'portSearch'
    ]),
    ...mapActions('quanjing', [
      'getBillNoList'
    ]),
    search () {
      // console.log(this.inputedValue);
      this.portSearch({blnum: this.inputedValue})
    },
    async inputChange (val) {
      let list = await this.getBillNoList({ blnum: this.inputedValue })
      this.billlist = list
    }
  },

  computed: {
    ...mapState('portSearch', {
      list: state => state.list
    })
  }
}
</script>

<style lang="scss">
</style>
