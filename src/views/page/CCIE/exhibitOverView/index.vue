<template>
    <div>
        <transport style="width:100%;height:100%;" @showSipg = 'sipgshow = true'></transport>
        <Divider style="color: #fff; opacity:0.2"/>
        <div class="barcharts">
                        <!-- <div> -->
                            <div class="barcharts-left">
                                <span class="littleTitle">展品预测流向</span>
                                <bar-chart  :height='barHeight' :width='barWidth'></bar-chart>
                            </div> 
                            <Divider type="vertical" style="color: #fff; opacity:0.2; float: left; height: 500px" />
                            <div class="barcharts-right">
                                <span class="littleTitle">展品实际流向</span>
                                <foot-bar  :deathData='true' :height='barHeight' :width='barWidth'></foot-bar >
                            </div>
                        <!-- </div> -->
                </div>
    </div>
</template>

<script>
import transport from './components/transport'
import { publicInter } from '@/api/http'
import { getRouterName } from "@/until/getToken";
import barChart from '@/views/exhibits/dynamicUnit/leftSecond'
import footBar from '@/views/exhibits/dynamicUnit/leftThree'

export default {
    components: {
        transport,
        barChart,
        footBar
    },
    data() {
        return {
            barHeight: '400px',
            barWidth:'500px',
            realFlow: false
        }
    },
    mounted() {
        
    },
    methods: {
       
    }
}
</script>

<style lang="scss" scoped>
.barcharts {
    .barcharts-left {
        width: 48%;
        float: left;
    }
    .barcharts-right {
        width: 50%;
        float: left;
    }
}
.barcharts::after {
    clear: both;
    height: 0;
    content: '';
    display: block;
    visibility: hidden;
}
.littleTitle {
    font-size: 18px;
    color: #FFF;
}
</style>
