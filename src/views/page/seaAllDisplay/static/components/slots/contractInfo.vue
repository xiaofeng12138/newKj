<template lang="html">
  <div class="">
    <div class="">合同号：{{resdata.contractInfo.contractno}}</div>
    <div class="">创建时间：{{resdata.contractInfo.createdate}}</div>
    <div class="">货物描述：{{resdata.contractInfo.GoodsInfo.GOODSDESZH}}</div>
    <div class="">货物数量：{{resdata.contractInfo.GoodsInfo.GROUPQUANTITY}}</div>
    <!-- <div class="">收货人：{{resdata.contractInfo.GoodsInfo.COMPANYNAMEZH}}</div> -->
    <div class="">发货人：{{resdata.contractInfo.GoodsInfo.COMPANYNAMEZH}}</div>
    <!-- <div class="">贸易方：{{resdata.contractInfo.GoodsInfo.COMPANYNAMEZH}}</div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('quanjing', {
      resdata: state => state.resdata
    })
  }
}
</script>

<style lang="scss">
</style>
