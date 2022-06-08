<template lang="html">
  <div class="slot_deliveryPlace">
    <div class="">接货时间：<span>{{resdata.deliveryPlace.EVENT_TIME}}</span></div>
    <div class="">接货地：<span>{{resdata.deliveryPlace.LOC}}</span></div>
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
.slot_deliveryPlace {

}
</style>
