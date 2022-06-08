<template lang="html">
  <div class="quanjing">
    <h2>空运全景展示</h2>
    <div class="header">
        <AutoComplete class="qj-auto"
            v-model="inputedValue"
            placeholder="请输入...."
            style="width:200px;margin-right:10px;">
            <!-- :data="inputedMatchList"> -->
            <!-- @on-search=""> -->
        </AutoComplete>

      <Select v-model="selectedValue" slot="append" style="width: 120px">
          <Option value="0">总单号</Option>
          <!-- <Option value="0">订单号</Option>
          <Option value="1">提单号</Option>
          <Option value="2">报关单号</Option> -->
      </Select>
      <div class="button">
        <Button type="primary" class="" @click="query">查询</Button>
      </div>
    </div>
    <div class="content" style='padding-left:20px;' v-if='showFlow'>
      <div>
        <block-1 blockStr='合同签订' :timestr='erpTime' status='false' myType='ERP' :myData='erpData' position='bottom'></block-1>
        <arrow width='200' height='120' orient='right' ></arrow>
        <block-1 blockStr='预报起运' :timestr='ffmTime' status='true' myType='FFM' :myData='ffmData' position='bottom'></block-1>
        <arrow width='200' height='120' orient='right' ></arrow>
        <block-1 blockStr='抵达收货' :timestr='rcfTime' status='false' myType='RCF' :myData='rcfArr' position='bottom'></block-1>      
      </div>
      <div>
        <arrow width='120' height='200' orient='down' style='margin-left:840px' ></arrow>
      </div>
      <div>
         <block-1 blockStr='货物提离' :timestr='dlvTime' status='false' myType='DLV' :myData='dlvArr' position='top'></block-1>
         <arrow width='200' height='120' orient='left' ></arrow>
         <block-1 blockStr='运单交付' :timestr='awdTime' status='false' myType='AWD' :myData='awdArr' position='top'></block-1>
         <arrow width='200' height='120' orient='left' ></arrow>
         <block-1 blockStr='通知提货' :timestr='nfdTime' status='false' myType='NFD' :myData='nfdArr' position='top'></block-1>
      </div>

      
    </div>
  </div>
</template>

<script>
import Block1 from './mySlots/block-1.vue'
import Block from './mySlots/block.vue'
import arrow from './mySlots/arrow.vue'

import interfaceUrl from '@/api/interfaceUrl'
import {publicInter} from '@/api/http'

export default {
  data () {
    return {
      selectedValue: '0',
      inputedValue: '',
      block1data: '',
      showFlow: false,
      temp: '1',
      showyunshuDetail: false,
      erpData:[],
      ffmData:[],
      rcfArr:[],
      nfdArr:[],
      awdArr:[],
      dlvArr:[],
      erpTime:"",
      ffmTime:"",
      rcfTime:'',
      dlvTime:"",
      awdTime:"",
      nfdTime:'',
      showFlow:false
    }
  },
  components: {
    'block-1': Block1,
    'block': Block,
    arrow
  },
  methods: {
    query(){
      publicInter(interfaceUrl.PanoramicDisplay,{"number":this.inputedValue,"type":"0"}).then(r=>{
        if(r){
          if(r.code === 200){
            let data = r.data;
            this.erpData = [];
            if(!(JSON.stringify(data.order) == '{}')){
              this.erpData.push(data.order);
            }
            
            this.ffmData = [];
            if(data.FFM && !(JSON.stringify(data.FFM.header) == '{}')){
              this.ffmData.push(data.FFM.header);
            }
            console.log(this.ffmData);
            if(data.FSU.body){
              this.rcfArr = data.FSU.body.RCF;
              this.nfdArr = data.FSU.body.NFD;
              this.awdArr = data.FSU.body.AWD;
              this.dlvArr = data.FSU.body.DLV;
              // this.dlvArr = this.dlvArr[0];
            }
            this.erpTime = this.erpData.length > 0 ? this.erpData[0].orderdate:"";
            this.ffmTime = this.ffmData.length > 0? this.ffmData[0].preTransitDate : "";
            this.rcfTime = this.rcfArr.length > 0? this.rcfArr[0].rcfDateTime : "";
            this.dlvTime = this.dlvArr.length > 0? this.dlvArr[0].dlvDateTime :"";
            this.awdTime = this.awdArr.length > 0 ? this.awdArr[0].awdDateTime :"";
            this.nfdTime = this.nfdArr.length >0?this.nfdArr[0].nfdDateTime : "";
            this.showFlow = true;
          }
          else{
            this.$Modal.error({ content:r.msg || r.message});
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped="">
$lineWidth: 40px;
$line1top: 40px;
$row2height: 220px;
$blockWidth: 98px;
$blockWidthAddLine: $blockWidth + $lineWidth;

.quanjing {

  .header {
    display: flex;
    flex-direction: row;
    margin-top: 24px;
    border-bottom: 1px solid #dddee1;
    padding-bottom: 24px;

    .button {
      margin-left: 20px;
    }

    .ivu-select-dropdown {
      max-height: 350px;
    }
  }


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
  }

  .content {
    position: relative;
    overflow-x:auto;
    overflow-y: hidden;

    .flowWrapper {
      position: relative;
      margin-top: 20px;
      width: 1480px;
      height: 420px;
    }
  }


  .row-1 {
    // top: $line1top;
  }

  .row-1d2 {
    top: 88px;
  }

  .row-1d5 {
    top: 112px;
  }

  .row-2 {
    top: $row2height;
  }

  .row-3 {
    top: $row2height + 110;
  }

  .col-0 {
    left: 0px;
  }

  .col-1 {
    left: $blockWidth;
  }
  .col-1x {
    left: $blockWidth + $lineWidth;
  }

  .col-2 {
    left: $blockWidthAddLine + $blockWidth;
  }

  .col-3 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine;
  }

  .col-4 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*2;
  }

  .col-5 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*3;
  }

  .col-6 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*4;
  }

  .col-7 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*5;
  }

  .col-8 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*6;
  }
  .col-9 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*7;
  }
  .col-10 {
    left: $blockWidthAddLine + $blockWidth + $blockWidthAddLine*8;
  }

}
</style>
