<template>
    <div ref="bar"></div>
    
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
    props:{
        data:{
            type:Array
        }

    },
    data(){
        return{
            charts:null,
            options:{
                grid:{
                    left:0,
                    containLabel:true
                },
                yAxis:{
                    data:[''],
                    inverse:true,
                    axisLine:{show:false},
                    axisTick:{show:false}
                },
                xAxis:{
                    max: 700,
                    splitLine:{show:false},
                    axisLabel:{show:false},
                    axisTick:{show:false},
                    axisLine:{show:false}
                },
                series:[
                    {
                        type:'pictorialBar',
                        label:{
                            normal:{
                                show:true,
                                position:'right',
                                offset:[3,0],
                                textStyle:{
                                    fontSize:18
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                color: '#95EF17'
                            }
                        },
                        symbolRepeat:true,
                        symbolSize:['4','18'],
                        barCategoryGap:'15%',
                        data:[
                            {
                                value:128,
                                symbol:'roundRect'
                            }
                        ],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1;
                        }
                        
                    },
                    {
                        type:'pictorialBar',
                        barGap:'0%',
                        label:{
                            normal:{
                                show:true,
                                position:'right',
                                offset:[5,0],
                                textStyle:{
                                    fontSize:18
                                }
                            }
                        },
                        itemStyle:{
                            normal:{
                                color: '#18F8EA'
                            }
                        },
                        symbolRepeat:true,
                        symbolSize:['4','18'],
                        data:[
                            {
                                value:58,
                                symbol:'roundRect'
                            }
                        ],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1;
                        }
                        
                    },
                ],
                animation: true
            }
        }
    },
    mounted(){
        var echartsBox=this.$refs.bar
        this.charts=echarts.init(echartsBox)
        this.options.series.forEach((element,index) => {
            element.data=[
                {
                    value:this.data[index],
                    symbol:'roundRect'
                }
            ]
        });
        this.charts.setOption(this.options,true)
    }
    
}
</script>
<style lang="scss" scoped>
div{
    width: 100%;
    height: 100%;
    cursor: pointer;
}

</style>

