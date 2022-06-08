<template lang="html">
  <div class="block-1"  v-bind:class="widthcls">
    <svg-line v-if="line"></svg-line>
    <Poptip :placement="this.position" trigger="hover">
      <block class="block"
        :blocktext="this.text"
        :timestr="this.computeddata.timestr"
        :status="this.computeddata.status"
        :supply="this.computeddata.supplyStr"
        :icon="icon"
        @click.native="blockClick">
      </block>
      <div slot="content" v-if="this.datakey==='transportPath'">
        <transport-path />
      </div>
      <div slot="content" v-if="this.datakey==='deliveryPlace'">
        <delivery-place />
      </div>
      <div slot="content" v-if="this.datakey==='firstPOL'">
        <first-pol />
      </div>
      <div slot="content" v-if="this.datakey==='planShoreUp'">
        <plan-shoreup />
      </div>
      <div slot="content" v-if="this.datakey==='contractInfo'">
        <contract-info />
      </div>
      <div slot="content" v-if="this.datakey==='bookingInfo'">
        <booking-info />
      </div>
      <div class="" slot="content" v-if="this.datakey==='actualShore'">
        <actual-shore />
      </div>
      <div class="" slot="content" v-if="this.datakey==='yard'">
        <yard />
      </div>
      <div class="" slot="content" v-if="this.datakey==='importManifest'">
        <import-manifest />
      </div>
      <div class="" slot="content" v-if="this.datakey==='declare'">
        <declare />
      </div>
      <div class="" slot="content" v-if="this.datakey==='release'">
        <release />
      </div>
      <div class="" slot="content" v-if="this.datakey==='handoverEquipment'">
        <handover-equipment />
      </div>
      <div class="" slot="content" v-if="this.datakey==='billInfo'">
        <bill-info />
      </div>
      <div class="" slot="content" v-if="this.datakey==='billLadingInfo'">
        <billlading-info />
      </div>
      <div class="" slot="content" v-if="this.datakey==='liftOff'">
        <lift-off />
      </div>
    </Poptip>
  </div>
</template>

<script>
import Block from './block.vue'
import LineSVG from './line.vue'
import { mapState } from 'vuex'
import SLOT_transportPath from './slots/transportPath.vue'
import SLOT_deliveryPlace from './slots/deliveryPlace.vue'
import SLOT_firstPOL from './slots/firstPOL.vue'
import SLOT_planShoreUp from './slots/planShoreUp.vue'
import SLOT_contractInfo from './slots/contractInfo.vue'
import SLOT_bookingInfo from './slots/bookingInfo.vue'
import SLOT_actualShore from './slots/actualShore'
import SLOT_yard from './slots/yard'
import SLOT_importManifest from './slots/importManifest'
import SLOT_declare from './slots/declare'
import SLOT_release from './slots/release'
import SLOT_handoverEquipment from './slots/handoverEquipment'
import SLOT_billInfo from './slots/billInfo'
import SLOT_billLadingInfo from './slots/billLadingInfo'
import SLOT_liftOff from './slots/liftOff'

export default {
  data () {
    return {
      status: '',
      // timestr: ''
    }
  },
  components: {
    Block,
    'svg-line': LineSVG,
    'transport-path': SLOT_transportPath,
    'delivery-place': SLOT_deliveryPlace,
    'first-pol': SLOT_firstPOL,
    'plan-shoreup': SLOT_planShoreUp,
    'contract-info': SLOT_contractInfo,
    'booking-info': SLOT_bookingInfo,
    'actual-shore': SLOT_actualShore,
    'yard': SLOT_yard,
    'import-manifest': SLOT_importManifest,
    'declare': SLOT_declare,
    'release': SLOT_release,
    'handover-equipment': SLOT_handoverEquipment,
    'bill-info': SLOT_billInfo,
    'billlading-info': SLOT_billLadingInfo,
    'lift-off': SLOT_liftOff
  },
  props: ['line', 'text', 'dataset', 'datakey', 'icon', 'position'],
  computed: {
    ...mapState('quanjing', {
      resdata: state => state.resdata
    }),
    widthcls () {
      if (this.line) {
        return {
          widthWithLine: true
        }
      } else {
        return {
          widthWithNoLine: true
        }
      }
    },
    computeddata () {
      if (this.resdata === '') return;

      let timestring, status, supplyStr, obj = this.resdata[this.datakey];
      switch (this.datakey) {

// ======================================
        case 'deliveryPlace':// 接货地
          if (Object.keys(obj).length !== 0) {
            timestring = obj['EVENT_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        case 'firstPOL':// 始发港装船
          if (Object.keys(obj).length !== 0) {
            timestring = obj['EVENT_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        case 'transportPath':// 运输路径
          if (obj.length > 0) {
            // timestring = obj[0]['EVENT_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        case 'planShoreUp':// 计划靠泊
          if (Object.keys(obj).length !== 0) {
            timestring = obj['PLAN_BERTH_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        case 'actualShore':// 实际靠泊
          if (Object.keys(obj).length !== 0) {
            timestring = obj['ACTUAL_BERTH_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        case 'yard':// 卸箱
          if (obj.length > 0) {
            timestring = obj[0]['OPPC_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        // case 'zhuanzhan':// 转栈堆场
        //   if (obj.length > 0) {
        //     timestring = obj[0][DISCHARGE_TIME]
        //     status = '2'
        //   } else {
        //     status = '0'
        //   }
        // break;

// ======================================
        case 'importManifest':// 接收舱单
          if (Object.keys(obj).length !== 0) {
            timestring = obj['importManifestList'][0]['RECEIVE_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

        case 'declare':// 海关接收通报
          status = obj.remind
          timestring = obj['data']['STATUS_TIME']
        break;

        case 'release':// 海关放行
          if (Object.keys(obj).length !== 0) {
            timestring = obj['STATUS_TIME']
            status = '2'
          } else {
            status = '0'
          }
        break;

// ======================================
        case 'contractInfo':// 合同签订
          if (Object.keys(obj).length !== 0) {
            timestring = obj.createdate
            status = '2'
          } else {
            status = '0'
          }
          break;

        case 'bookingInfo':// 订仓
          if (Object.keys(obj).length !== 0) {
            timestring = obj['booking']['BOOKINGDATE']
            status = '2'
          } else {
            status = '0'
          }
          break;

        case 'billInfo':// 提单就绪
          if (Object.keys(obj).length !== 0) {
            timestring = obj['billInfo']['BILLDATE']
            status = '2'
          } else {
            status = '0'
          }
          break;

        case 'billLadingInfo':// 换提货单
          status = obj.remind
          timestring = obj.data['EVENT_TIME']
          break;

        case 'deliveryPlan':// 提货计划受理
          status = obj.remind
          timestring = obj.data['PLAN_ACCEPTANCE_TIME']
          break;

        case 'liftOff':// 提离
          status = obj.remind
          if (obj.data[0]) {
            timestring = obj.data[0]['OPPC_TIME']
            supplyStr = obj.data[0]['TRUCKNO']
          }
          break;

// ======================================

        case 'handoverEquipment':// 设备交接单
          status = obj.remind
          timestring = obj.data['EVENT_TIME']
          break;

        default:
      }

      return {
        timestr: timestring,
        status: status,
        supplyStr: supplyStr
      }
    }
  },
  mounted () {
    //
  },
  methods: {
    blockClick () {
      this.$emit('block-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.block-1 {
  position: absolute;
  height: 88px;
  display: flex;
  flex-direction: row;
}

.widthWithLine {
  width: 138px;
}

.widthWithNoLine {
  width: 98px;
}

.uncompelteClass {
  background-color: white
}
.completeClass {
  background-color: rgb(0, 104, 190);
  color: white;
}
</style>
