<template lang="html">
  <div class="slot_firstPOL">
    <div class="">开船时间：<span>{{resdata.firstPOL.EVENT_TIME}}</span></div>
    <div class="">始发港：<span>{{resdata.firstPOL.LOC}}</span></div>
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
