<template lang="html">
  <div class="package">
    <Table width="" border :columns="columns2" :data="packageData"></Table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      columns2: [
        {
          title: '箱号',
          key: 'CNTR_NUM',
          // width: 100,
          // fixed: 'left'
        },
        {
          title: '箱型',
          key: 'CNTR_TYPE',
          // width: 100
        },
        {
          title: 'SOC标志',
          key: 'SOC',
          // width: 100
        },
        {
          title: '箱状态',
          key: 'FULLNESS_CDE'
          // width: 100
        },
        {
          title: 'VGM',
          key: 'VERIFIED_GROSS_WT',
          // width: 100
        },
        {
          title: 'VGM单位',
          key: 'VERIFIED_GROSS_WT_UNIT',
          // width: 100
        },
        {
          title: '船名',
          key: 'VSL_NME',
          // width: 100
        }
      ]
    }
  },

  computed: {
    ...mapState('search', {
      packageData: state => {
        return state.cntrData.map((item) => {
          // console.log(item);
          return item
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.package {
  .ivu-table th{
    color: #495060;
    font-size: 12px;
    background-color: #f8f8f9;
    border-left: none;
    &:first-child{
      border-left:none;
    }
  }
}
</style>
