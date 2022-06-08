<template lang="html">
  <div class="">
    <Table width="400" height="200" :columns="columns1" :data="resdata.liftOff.data"></Table>
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
          title: '提离时间',
          key: 'OPPC_TIME',

          // width: 150
        },
        {
          title: '箱号',
          key: 'CNTR_NUM',
          // width: 150
        },
        {
          title: '车辆号',
          key: 'TRUCKNO'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped="">
</style>
