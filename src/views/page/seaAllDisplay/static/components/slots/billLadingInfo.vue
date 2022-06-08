<template lang="html">
  <div class="">
    <div class="">提单号：{{resdata.billLadingInfo.data.BOOKING_NUM}}</div>
    <div class="">打印时间：{{resdata.billLadingInfo.data.EVENT_TIME}}</div>
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

<style lang="scss" scoped="">
</style>
