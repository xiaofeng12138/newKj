<template lang="html">
  <div class="">
    <div class="">订舱号：<span>{{resdata.bookingInfo.booking.BOOKING_NUM}}</span></div>
    <div class="">订舱时间：<span>{{resdata.bookingInfo.booking.BOOKINGDATE}}</span></div>
    <!-- <div class="">接货地：<span>{{resdata.bookingInfo.booking.BOOKINGDATE}}</span></div> -->
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
