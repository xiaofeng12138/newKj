<template lang="html">
  <div class="">
    <div class="">计划靠泊时间：{{resdata.planShoreUp.PLAN_TIME}}</div>
    <div class="">卸货港：</div>
    <div class="">码头：</div>
    <div class="">船名：{{resdata.planShoreUp.VSL_VOY}}</div>
    <div class="">航次：{{resdata.planShoreUp.SEAL_NUM}}</div>
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
