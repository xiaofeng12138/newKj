<template>
    <div class="borderLayout">
        <div class="borderLayout3">
            <div class="tab">
                <span v-for="(item,index) in intellTab" :key="index" :class="{active: index == intellNum}" @click="tabIntell(item.key,index)">
                    {{ item.name }}
                </span>
            </div>
            <div class="content" >
                <rotate class="rotate" ref="rotateChild" @showEdit='showEdit'></rotate>
            </div>
        </div>
        <div  class=" borderLayout7">
            <div class="tab" v-for="(item,index) in newTechTab " :key="index">
                <span >
                    {{ item.name }}
                </span>
                <les-chart class="les-chart" :paramKey='item.key' :id="'lescharts' + index" :width='lesWidth' :height='lesHeight' :num='num' ref='lesChild' @showEdit='showEdit'></les-chart>
            </div>
            
        </div>
        <goods-detail v-show="goodsDetailShow" @myCloseWin="closewin" ref="goodsChild" @showBooth='qryExhibitorByBoothNo'></goods-detail>

    </div>
</template>

<script>
import rotate from './rotate'
// import exhibitiontable from "@/views/exhibits/unit/exhibitiontable";
import interfaceUrl from '@/api/interfaceUrl'
// import exhititionList from '@/views/exhibits/unit/exhitionList'
import { publicInter } from '@/api/http'
import {
  getRouterName
} from "@/until/getToken";
// import vague from './unit/vague2'
// import country from './exhibitionShow/exhibitionMap/corresponding';
// import customsUnit from '@/views/exhibits/unit/customsUnit'
// import ataUnit from '@/views/exhibits/unit/ATAUnit'
// import bondUnit from '@/views/exhibits/dynamicUnit/bondUnit'
// import viewIndex from '@/views/exhibits/unit/viewIndex'
import axios from 'axios';
// import transport from '@/views/exhibits/dynamicUnit/leftFirst'
// import sipgUnit from '@/views/exhibits/dynamicUnit/sipgUnit'
// import barChart from '@/views/exhibits/dynamicUnit/leftSecond'
// import importDynamic from '@/views/exhibits/dynamicUnit/importDynamic' //每日进口动态
import lesChart from './leschart'
// import listAndFlow from '@/views/exhibits/dynamicUnit/listAndFlow' //展品明细及流向监控
// import importExhibition from '@/views/exhibits/dynamicUnit/exhibitorTable/importExhibition'
// import exhibitMap from '@/views/exhibits/dynamicUnit/centerFirst'
// import numOver from '@/views/exhibits/dynamicUnit/numOver'
import goodsDetail from './goodsDetail'

export default {
    data() {
        return {
            newTechTab:[{name:'汽车',key:'2'},{name:'日用品',key:'5'},{name:'医疗',key:'6'},{name:'食品',key:'7'}],
            intellTab:[{name:'智能装备',key:'3'},{name:'电子家电',key:'4'},{name:'一带一路展品',key:'0'}],
            intellNum:0,
            lesWidth:0,
            lesHeight:0,
            num:1,
            goodsDetailShow:false
        }
    },
    components: {
        rotate,
        lesChart,
        goodsDetail
    },
    mounted() {
        this.tabIntell("3",0);
        this.lesHeight = document.getElementsByClassName('borderLayout7')[0].offsetHeight - 86 + 'px';
        this.lesWidth = document.getElementsByClassName('borderLayout7')[0].offsetWidth/4 - 12 + 'px';
    },
    methods: {
        
        tabIntell(value,index){
            this.intellNum = index;
            this.$refs.rotateChild.tabIntell(value,index);
        },
        showEdit(params, goodsList){
            this.goodsDetailShow = true;
            this.$refs.goodsChild.showDetail(params.UUID, goodsList);
        },
        tabnew(key,index){
            this.num = index;
            this.$refs.lesChild.tabnew(key,index);
        },
        closewin(value){
            this[value] = false;
        },
        qryExhibitorByBoothNo(boothno){
            // publicInter(interfaceUrl.qryExhibitorByBoothNo,{boothno:boothno}).then(r=>{
            //     this.goodsDetailShow = false;
            //     this.positionShow = true;
            //     this.positionIndexShowEdit = r.list[0];
            //     this.positionLeft = '50%';
            //     this.positionTop = '50%';
            //     this.positionIndex = 999;
            //     this.postionTop = '70px';
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
.borderLayout{
    
    height: 100%;
    .borderLayout3 {
        border:1px solid #1f5ff2;
        width: 100%;
        height: 240px;
        .tab {
            float: left;
            width: 20%;
            height: 100%;
            border-right: 1px solid #1f5ff2;
            span {
                display: inline-block;
                width: 100%;
                height: 80px;
                border-bottom: 1px solid #1f5ff2;
                font-size: 18px;
                cursor: pointer;
                line-height: 80px
            }
            >span.active{
                background: #1f5ff2;
                color: #FFFFFF
            }
        }
        .content {
            float: left;
            height: 100%;
            width: 80%;
            .rotate {
                width: 100%;
                height: 100%
            }
        }
    }
    .borderLayout3::after, .borderLayout3::after {
        display: block;
        clear: both;
        content: '';
        height: 0
    }
    .borderLayout7 {
        border:1px solid #1f5ff2;
        width: 100%;
        height: 400px;
        margin-top: 30px;
        .tab {
            height: 100%;
             width: 25%;
            border-bottom: 1px solid #1f5ff2;
            border-right: 1px solid #1f5ff2;
            
            float: left;
            span {
                display: inline-block;
                height: 50px;
                width: 100%;
                border-bottom: 1px solid #1f5ff2;
                font-size: 18px;
                // cursor: pointer;
                line-height: 50px;
                color: #FFFFFF;
                background: #112a6d;
            }

        }
        .les-chart {}
    }
    
}
</style>
