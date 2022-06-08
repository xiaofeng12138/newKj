<template lang="html">
  <Table width="" border :columns="this.columns" :data="computedPathData"></Table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      columns: [
        {
          title: '装船地',
          key: 'upLocation'
        },
        {
          title: '装船时间',
          key: 'upTime'
        },
        {
          title: '卸船地',
          key: 'downLocation'
        },
        {
          title: '卸船时间',
          key: 'downTime'
        },
        {
          title: '船名',
          key: 'shipName'
        },
        {
          title: '航次',
          key: 'voyNumber'
        }
      ]
    }
  },
  computed: {
    ...mapState('search', {
      computedPathData: state => {
        return state.pathData.map(item => {
          return {
            downTime: item['pod']['BERTH_ARR_DT_GMT'],
            downLocation: item['pod']['GSP_PORT_NME'],
            upTime: item['pol']['BERTH_DEP_DT_GMT'],
            upLocation: item['pol']['GSP_PORT_NME'],
            shipName: item['pol']['VSL_NME'],
            voyNumber: item['pol']['DEP_EXT_VOY_REF']
          }
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
