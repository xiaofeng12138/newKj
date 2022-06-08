<template>
    <div id="mixCharts2">
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            mixChart:{},
            color:['#8FA1FF','#95EF17','#182766','#FFDE1D'],
        }
    },
    mounted(){
        this.initMixRequest();
    },
    methods:{
        initMixRequest(){
            this.mixChart = this.$echarts.init(document.getElementById('mixCharts2'));
            axios.get('/dater.json').then(r=>{
                if(r){
                    let reqData = r.data.disCount;
                    let dateData = reqData.dateData,
                        barData = reqData.barData,
                        lineData = reqData.lineData;
                    this.initMix(dateData, barData, lineData);
                }
            });
        },
        initMix(dateData, barData, lineData){
            let start = dateData.length >= 3?Math.ceil((barData.length - 3)/barData.length*100):0;
            let options = {
                color: ['#174CFF', '#FFE91A'],
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'cross'
                    }
                },
                //滚动条
                dataZoom:[{
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
                }],
                yAxis:[
                    {
                        type: 'value',
                        name:'发现病症人数',
                        position:'left',
                        axisLabel:{
                            formatter:'{value}'
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
                    },
                    {
                        type:'value',
                        name:'确诊病例数',
                        position:'right',
                        axisLabel:{
                            formatter:'{value}'
                        },
                        axisLine: {
                            lineStyle: {
                                color: this.color[0]
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                color:this.color[2]
                            }
                        }
                    }
                ],
                series:[
                    {
                        name:'发现病症人员数',
                        type:'bar',
                        yAxisIndex:0,
                        barWidth:'9',
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
                        name:'确诊病例数',
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
    }
}
</script>
