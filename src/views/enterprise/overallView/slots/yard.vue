<template lang="html">
  <div class="">
    <Table width="400" height="200" :columns="columns1" :data="resdata.yard"></Table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('quanjing', {
      resdata: state => state.resdata
    })
  },
  data () {
    return {
      columns1: [
        {
          title: '卸箱时间',
          key: 'OPPC_TIME',
          // width: 150
        },
        {
          title: '箱号',
          key: 'CNTR_NUM',
          // width: 150
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
