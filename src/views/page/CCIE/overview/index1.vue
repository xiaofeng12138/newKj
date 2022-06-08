<template>
  <div class="overview" >
    <div class="first-row">
      <div style="width: 29%; height: 100%; float: left; position:relative">
        <span class="rect left top"></span>
        <span class="rect right top"></span>
        <span class="rect left bottom"></span>
        <span class="rect right bottom"></span>
        <bar-chart :barData="as" :title="title['AS']" :barType="1" :barId="'bar1'"></bar-chart>
      </div>
      <div style="width: 40%; height: 100%; float: left; margin-left:1%; position:relative">
        <span class="rect left top"></span>
        <span class="rect right top"></span>
        <span class="rect left bottom"></span>
        <span class="rect right bottom"></span>
        <bar-chart :barData="zj" :title="title['ZJ']" :barType="2" :barId="'bar2'"></bar-chart>
      </div>
      <div style="width: 29%; height: 100%; float: left; margin-left:1%; position:relative">
        <span class="rect left top"></span>
        <span class="rect right top"></span>
        <span class="rect left bottom"></span>
        <span class="rect right bottom"></span>
        <bar-chart :barData="ydyl" :title="title['YDYL']"  :barType="1" :barId="'bar3'" ></bar-chart>
      </div>
    </div>
    <div class="second-row">
      <span class="rect left top"></span>
      <span class="rect right top"></span>
      <span class="rect left bottom"></span>
      <span class="rect right bottom"></span>
      <div id="silder-row">
        <bar-chart v-for="(val, key, index) in this.others" :barData="val" :title="title[key]" :key="index" :barType="1" :barId="key" style="height: 100%"></bar-chart>
        <!-- <bar-chart :barData="testData1" :barType="1" :barId="'bar5'" style="width: 30%; height: 100%"></bar-chart>
        <bar-chart :barData="testData1" :barType="1" :barId="'bar6'" style="width: 30%; height: 100%"></bar-chart>
        <bar-chart :barData="testData1" :barType="1" :barId="'bar7'" style="width: 30%; height: 100%"></bar-chart> -->
      </div>
      
    </div>
  </div>
</template>

<script>
import barChart from './barChart'
import Slider from '@/views/exhibits/exhibitionShow/exhibitionOne/self_slider.js'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
export default {
  components: {barChart},
  data() {
    return {
      title: {
        AS: '亚洲',
        ZJ: '全球概况',
        YDYL: '一带一路国家/地区',
        AF: '非洲',
        EU: '欧洲',
        NA: '南美洲',
        SA: '北美洲',
        OC: '大洋洲',
        GJG: '国家馆',
      },
      as: {},
      zj: {},
      ydyl: {},
      others: {
        AF: {},
        EU: {},
        GJG: {},
        NA: {},
        OC: {},
        SA: {}
      }
    }
  },
  mounted() {
    publicInter(interfaceUrl.queryRegionalGrouping, {}).then(r => {
        if( r.isOk ) {
          let datas = r.result;
          this.as = datas.AS;
          this.zj = datas.ZJ;
          this.ydyl = datas.YDYL;
          delete datas.AS;
          delete datas.ZJ;
          delete datas.YDYL;
          this.others = datas;
        }
    });
    this.sliderInit()
  },
  methods: {
    sliderInit(){
            var target=document.getElementById('silder-row');
            var slider=new Slider({target:target});
        },
  }
}
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .first-row {
    width: 100%;
    height: 45%;
    ::after {
      display: block;
      content: '';
      visibility: hidden;
      height: 0;
      clear: both;
    }
  }
  .second-row {
    position:relative;
    border: 1px solid #0037b2;
    width: 100%;
    height: 45%;
    margin-top: 1%;
    #silder-row {
      display: flex;
      width: 180%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.rect {
  position: absolute;
  width: 0.65rem;
  height: 0.65rem;
  background: transparent;
  z-index: 999;
  &.left {
    left: -1px;
    border-left: 2px solid rgba(31, 95, 242, 1);
  }
  &.top {
    top: -1px;
    border-top: 2px solid rgba(31, 95, 242, 1);
  }
  &.right {
    right: -1px;
    border-right: 2px solid rgba(31, 95, 242, 1);
  }
  &.bottom {
    bottom: -1px;
    border-bottom: 2px solid rgba(31, 95, 242, 1);
  }
}
</style>
