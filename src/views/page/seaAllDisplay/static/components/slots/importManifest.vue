<template lang="html">
  <div class="">
    <div class="">提单号：{{resdata.importManifest.billno}}</div>
    <div class="">申报记录：{{resdata.importManifest.imo}}</div>
    <div class="table-scroll">
      <Table :columns="columns1" :data="data1"></Table>
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
    data1 () {
      return this.resdata.importManifest['importManifestList']
    }
  },
  data () {
    return {
      columns1: [
        {
          title: '申报时间',
          key: 'RECEIVE_TIME',
          width: 150
        },
        {
          title: 'Action',
          key: 'ACTION',
          width: 80
        },
        {
          title: '海关回执状态',
          key: 'RESPONSE_STATUS',
          width: 120
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped="">
.table-scroll {
  // width: 400px;
  height: 200px;
  overflow-y: scroll;
}
</style>
