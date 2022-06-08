<template>
  <div class="overview" >
    <div class="first-row">
      <div style="width: 49%; height: 100%; float: left; position:relative">
        <span class="rect left top"></span>
        <span class="rect right top"></span>
        <span class="rect left bottom"></span>
        <span class="rect right bottom"></span>
        <bar-chart :barData="zj" :title="title['ZJ']" @hideTip="hideTip" @showTip="showTip"  :barType="2" :barId="'bar2'"></bar-chart>
      </div>
      <div style="width: 49%; height: 100%; float: right;  position:relative;">
        <span class="rect left top"></span>
        <span class="rect right top"></span>
        <span class="rect left bottom"></span>
        <span class="rect right bottom"></span>
        <polar :title="title['YDYL']" :barData="ydyl" id="ydyl"></polar>
      </div>
    </div>
    <div class="second-row">
      <span class="rect left top"></span>
      <span class="rect right top"></span>
      <span class="rect left bottom"></span>
      <span class="rect right bottom"></span>
      <div id="silder-row">
        <!-- <bar-chart v-for="(val, key, index) in this.others" :barData="val" :title="title[key]" :key="index" :barType="1" :barId="key" style="height: 100%"></bar-chart> -->
        <radar v-for="(val, key, index) in this.others" @hideTip="hideTip" @showTip="showTip" :radarData="val" :key="index" :title="title[key]" :radarId="key" style="height: 100%"></radar>
      </div>
      
    </div>
    <div class="tooltip" ref="tooltip" v-show="tooltipShow">
        <span class="title">{{tooltipTitle}}</span>
        <div class="row">
            <div class="marker" style="background: #ffe445"></div>
            <span>{{nowYear}}:</span>
            <span class="value">{{tooltip.value2019}}</span>
            <span class="unit">{{tooltip.unit}}</span>
            <img :src="tooltip.imgSrc" />
            <span class="result" ref="result">{{tooltip.result}}</span>
        </div>
        <div class="row">
            <div class="marker" style="background: #1f5ff2"></div>
            <span>{{nowYear-1}}:</span>
            <span class="value">{{tooltip.value2018}}</span>
            <span class="unit">{{tooltip.unit}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import barChart from './barChart'
import polar from './polar'
import radar from './radar'
import Slider from '@/views/exhibits/exhibitionShow/exhibitionOne/self_slider.js'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import { setCookie, getUserRole, removeCookie, getCookie, getRouterName} from "@/until/getToken";
export default {
  components: {barChart, radar, polar},
  data() {
    return {
      title: {
        AS: '亚洲',
        ZJ: '全球概况',
        YDYL: '一带一路国家/地区',
        AF: '非洲',
        EU: '欧洲',
        NA: '北美洲',
        SA: '南美洲',
        OC: '大洋洲',
        GJG: '国家馆',
      },
      tooltipTitle: '',
      tooltip: {
        value2019: '',
        value2018: '',
        unit: '',
        imgSrc: '',
        result: ''
      },
      tooltipShow: false,
      as: {},
      zj: {},
      ydyl: {},
      others: {
        EU: {},
        AS: {},
        NA: {},
        SA: {},
        OC: {},
        AF: {},
        GJG: {},
      },
      ydylOptions: {

      },
      nowYear:getCookie('date')*1
    }
  },
  mounted() {
    publicInter(interfaceUrl.queryRegionalGrouping, {}).then(r => {
      let nowYear = getCookie('date')*1
      let d =  r.allListMap[nowYear]
      let datas = r.continentMap
      this.zj = datas.ZJ
      this.ydyl = datas.YDYL;
      delete datas.ZJ;
      delete datas.YDYL;
      // this.others = datas;
      for(let item in datas){
        for(let i in this.others)
        if(item==i)
        this.others[i]=datas[item]
      }
      console.log(this.others)
    });
    this.sliderInit()
  },
  methods: {
    sliderInit(){
        var target=document.getElementById('silder-row');
        var slider=new Slider({target:target});
    },
    showTip(params) {
      this.tooltipShow = true;
      this.$refs.tooltip.style.left = params.event.event.x + 10 + "px";
      this.$refs.tooltip.style.top = params.event.event.y + 10 + "px";
      this.$refs.result.style.color = params.parentP.color;
      this.tooltipTitle = params.name;
      this.tooltip = params.parentP;
    },
    hideTip() {
      this.tooltipShow = false;
    }
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
    height: 48%;
    #ydyl {
      
    }
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
    height: 48%;
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
  z-index: 2;
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
.tooltip {
    position: fixed;
    left: 100px;
    top: 100px;
    background: #2f3775;
    color: #fff;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    z-index: 3;
    .header {

    }
    .row {
        display: flex;
        align-items: center;
        // justify-content: center;
        .marker {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
        }
        .value {
            color: #ffc83e
        }
        .unit {
            margin-left: 0.1rem
        }
        span {
            margin-left: 0.5rem;
            vertical-align: middle
        }
        img {
            margin-left: 0.5rem;
        }
    }
}
</style>
