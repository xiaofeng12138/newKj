<template>
    <!-- 每日进口动态 -->
    <div id="mixCharts" :style="{width:width,height:height}">
    </div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    props:['width','height'],
    data(){
        return{
            mixChart:null,
            color:['#8FA1FF'],
        }
    },
    mounted(){
        this.initMixRequest();
    },
    updated(){
        this.resize();
    },
    methods:{
        resize(){
            this.mixChart.resize();
        },
        initMixRequest(){
            this.mixChart = this.$echarts.init(document.getElementById('mixCharts'));
            publicInter(interfaceUrl.getDayBlNosAndTotalPrice,{}).then(r=>{
                if(r && r.code == '200'){
                    let dateData = r.result.expoList2;
                    //进口批次
                    let lineData = r.result.expoList1;
                    //进口金额
                    let barData = [];
                    let priceUnit = "";
                    if(Math.max.apply(null,r.result.expoList3) > 10000){
                        barData = this.dimi(r.result.expoList3);
                        priceUnit = "万美元";
                    }
                    else{
                        barData = r.result.expoList3;
                        priceUnit = "美元";
                    }
                    this.initMix(dateData, barData, lineData,priceUnit);
                }
            })
        },
        initMix(dateData, barData, lineData,priceUnit){
            let start = dateData.length >= 15?parseInt((barData.length - 15)/barData.length*100):0;
            let options = {
                color: ['#174CFF', '#FFE91A'],
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'cross'
                    },
                    textStyle:{
                        fontSize:22
                    }
                },
                legend:{
                    data:['进口额','进口批次'],
                    textStyle:{//图例文字的样式
                        color:this.color[0],
                        fontSize:16
                    },
                    padding:[15,0,1,0]
                },
                //滚动条
                dataZoom:[{
                    // show:true,
                    // start:30,
                    // end:100,
                    // height:10
                        // 这个dataZoom组件，也控制x轴。
                    type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                    start: start,      // 左边在 10% 的位置。
                    end: 100,         // 右边在 60% 的位置。
                    //按住alt可以进行放大缩小
                    zoomOnMouseWheel:'alt'
                }],
                xAxis:[{
                    type: 'category',
                    data:dateData,
                    axisLine: {
                        lineStyle: {
                            color: this.color[0]
                        }
                    },
                    axisLabel:{
                        fontSize:16
                    }
                }],
                yAxis:[
                    {
                        type: 'value',
                        name:priceUnit,
                        position:'left',
                        axisLabel:{
                            formatter:'{value}',
                            fontSize:16
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.color[0],
                                fontSize:16
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                color:'#182766'
                            }
                        }
                    },
                    {
                        type:'value',
                        name:'批次',
                        position:'right',
                        axisLabel:{
                            formatter:'{value}',
                            fontSize:16
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.color[0]
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                color:'#182766'
                            }
                        }
                    }
                ],
                series:[
                    {
                        name:'进口额',
                        type:'bar',
                        yAxisIndex:0,
                        barWidth:'9',
                        // tooltip:{formatter:'{a}<br />{b}:{c}'+priceUnit},
                        itemStyle:{
                            emphasis:{
                                barBorderRadius:5
                            },
                            normal:{
                                barBorderRadius:5,
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#178FFF'},
                                        {offset: 1, color: '#174CFF'}

                                    ]
                                )
                            }
                        },
                        data:barData
                    },
                    {
                        name:'进口批次',
                        type:'line',
                        yAxisIndex:1,
                        // tooltip:{formatter:'{a}<br />{b}:{c}批次'},
                        lineStyle:{
                            color:'#FFDE1D'
                        },
                        itemStyle:{
                            color:'#FFDE1D'
                        },
                        data:lineData
                    },
                    {
                        name: 'line',
                        type: 'bar',
                        yAxisIndex:1,
                        barGap: '-100%',
                        barWidth:'9',
                        tooltip:{show:false},
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(23,76,255,0.5)'},
                                        {offset: 0.2, color: 'rgba(23,76,255,0.2)'},
                                        {offset: 1, color: 'rgba(17,107,137,0)'}
                                    ]
                                )
                            }
                        },
                        z: -12,
                        data: lineData
                    },
                    {
                        name: 'dotted',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        tooltip:{show:false},
                        yAxisIndex:1,
                        itemStyle: {
                            normal: {
                                color: '#116B89'
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: [9, 1],
                        symbolMargin: 1,
                        z: -10,
                        data: lineData
                    }
                ]
            }
            this.mixChart.setOption(options);
        },
        //除以10000
        dimi(value){
            for(let i = 0; i < value.length;i++){
                value[i] = parseFloat(value[i]/10000).toFixed(2);
            }
            return value;
        },
    }
}
</script>
