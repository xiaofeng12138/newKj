<template lang="html">
<div class="slot_transportPath">
  <div class="title">订舱号：{{resdata.transportPath ? resdata.transportPath[0]['bookingNum'] : ''}}</div>
  <div class="content">
    <Table width="" border :columns="this.columns" :data="computedPathData"></Table>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('quanjing', {
      resdata: state => state.resdata
    }),
    computedPathData () {
      if (this.resdata) {
        return this.resdata.transportPath.map((item) => {
          return {
            downTime: item['pod']['BERTH_ARR_DT_GMT'],
            downLocation: item['pod']['GSP_PORT_NME'],
            upTime: item['pol']['BERTH_DEP_DT_GMT'],
            upLocation: item['pol']['GSP_PORT_NME'],
            shipName: item['pol']['VSL_NME'],
            voyNumber: item['pol']['DEP_EXT_VOY_REF']
          }
        })
      } else {
        return []
      }
    }
  },
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
  }
}
</script>

<style lang="scss" scoped="">
.slot_transportPath {
  width: 600px;
  border-radius: 4px;
  border: 1px solid black;

  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    border-bottom: 1px solid black;
    background-color: #00508d;
    color: white;
  }

  .content {

  }
}
</style>
