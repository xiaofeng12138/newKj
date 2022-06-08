<template lang="html">
  <div class="zhibiao">
    <h3>指标评估</h3>
    <div style="font-size:28px;margin-bottom:20px;">
      通关时效分析（未参与流程改造）
    </div>
    <div class="chartuiWrapper">
      <chart-ui type="mapNoJoin" title=""></chart-ui>
    </div>
    <div style="font-size:28px;margin-bottom:20px;">
      通关时效分析（参与流程改造）
    </div>
    <div class="chartuiWrapper">
      <chart-ui type="mapJoin" title=""></chart-ui>
    </div>

    <div class="zongjie">
      贵企业于2018年3月20日至今，在未参与流程改造的情况下，口岸通关总时间为<span style="color:red;">{{ totalBefore }}</span>小时，在参与流程改造的情况下，口岸通关总时间为<span style="color:blue;">{{ totalAfter }}</span>小时。
    </div>
  </div>
</template>

<script>
import ChartUI from './chart-ui.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    'chart-ui': ChartUI
  },
  methods: {
    ...mapActions('chartui', [
      'getChartuiData'
    ])
  },
  mounted () {
    this.getChartuiData({})
  },
  computed: {
    ...mapState('chartui', {
      chartuiData: state => state.chartuiData,
      totalBefore: state => state.totalBefore,
      totalAfter: state => state.totalAfter
    })
  }
}
</script>

<style lang="scss" scoped>

h3{
  font-size: 20px;
  color: #1c2438;
  &:before{
    content: '';
    display: inline-block;
    width: 4px;
    height: 20px;
    margin-top: -3px;
    vertical-align: middle;
    margin-right: 10px;
    background: rgb(0,80,141);
  }
  margin-bottom: 30px;
}

.chartuiWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
