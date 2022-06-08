<template lang="html">
  <div class="">
    <div class="">提单号：{{resdata.billInfo.billInfo.BL_REF_CDE}}</div>
    <div class="">提单就绪时间：{{resdata.billInfo.billInfo.BILLDATE}}</div>
    <div class="">接货地：{{resdata.billInfo.billInfo.POR}}</div>
    <div class="">交货地：{{resdata.billInfo.billInfo.FND}}</div>
    <div class="">收货人：{{resdata.billInfo.billInfo.CONSIGNEE_NAME}}</div>
    <div class="">发货人：{{resdata.billInfo.billInfo.SHIPPER_NAME}}</div>
    <div class="">通知人：{{resdata.billInfo.billInfo.NOTIFYPARTY_NAME}}</div>
    <!-- <div class="" v-if="resdata.billInfo.billGood">
        <Table :columns="columns3" :data="resdata.billInfo.billGood"></Table>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      columns3: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '货描',
              key: 'FULL_DESC'
          },
          {
              title: '件数',
              key: 'GOODSNUM'
          },
          {
              title: '重量',
              key: 'GOODSWEIGHT'
          }
      ]
    }
  },
  computed: {
    ...mapState('quanjing', {
      resdata: state => state.resdata
    })
  }
}
</script>

<style lang="scss" scoped="">
</style>
