<template lang="html">
  <div class="">
    <div class="">靠泊时间：{{resdata.actualShore.ACTUAL_BERTH_TIME}}</div>
    <!-- <div class="">卸货港：</div> -->
    <div class="">靠港码头：{{resdata.actualShore.TERMINAL}}</div>
    <div class="">船名：{{resdata.actualShore.VSL_VOY}}</div>
    <div class="">航次：{{resdata.actualShore.SEAL_NUM}}</div>
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
