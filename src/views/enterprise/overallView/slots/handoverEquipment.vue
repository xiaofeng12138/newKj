<template lang="html">
  <div class="">
    <div class="">提单号：<span>{{resdata.handoverEquipment.data.BOOKING_NUM}}</span></div>
    <div class="">打印时间：<span>{{resdata.handoverEquipment.data.EVENT_TIME}}</span></div>
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

<style lang="css">
</style>
