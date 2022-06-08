<template>
    <div ref='barChart' class="barChart" style="width:90%;height:70px;"></div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
    props:{
        dataNum:{
            require:true,
            type:Object
        }
    },
    // watch:{
    //     dataNum:'init'
    // },
    data(){
        return{
            options: {
                backgroundColor: 'transparent',
                xAxis: {
                    max: 700,
                    show: false
                },
                tooltip:{
                    show:false
                },
                yAxis: {
                    position:'right',
                    offset:-50,
                    data:[],
                    show: true,
                    axisLine:{
                        show:false,
                    },
                    axisTick:{
                        show:false
                    },
                    axisPointer:true,
                    axisLabel:{
                        show:false,
                        verticalAlign:'middle',
                        rich:{
                            a:{
                                color:'#18F8EA',
                                fontSize:16,
                                lineHeight:30,
                                cursor: 'pointer',
                                padding:[-10,0,0,0]
                            },
                            c:{
                                color:'#95EF17',
                                fontSize:16,
                                padding:[0,0,-10,0]
                            }
                        }


                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbol: 'roundRect',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: '#18F8EA'
                            }
                        },
                       

                        symbolRepeat: true,
                        symbolSize: [3,18],
                        symbolOffset:[-15, 5],
                        symbolMargin:1,
                        data: [200],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1;
                        }
                    },
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbol: 'roundRect',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: '#95EF17'
                            }
                        },
                        symbolRepeat: true,
                        symbolSize: [3,18],
                        symbolMargin:1,
                        symbolOffset:[-15, -30],
                        data: [200],
                        animationEasing: 'elasticOut',
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30 * 1.1;
                        }
                    }
                    ],
                    animation: true
                },
                charts:null,


        }
    },
    mounted(){
        this.init()
        
        

    },
    methods:{
        init(){
            var echartsBox=this.$refs.barChart
            this.charts=echarts.init(echartsBox)
            var data=[this.dataNum.doubt,this.dataNum.confirmed]
            this.options.yAxis.data=[data[0]+'人',data[1]+'人']
            this.options.series[0]['data']=[data[0]]
            this.options.series[1]['data']=[data[1]]
            this.charts.setOption(this.options,true)
        },
        
    },
    beforeDestroy(){
        this.options.yAxis.data=[]
        this.options.series[0]['data']=[]
        this.options.series[1]['data']=[]
        this.charts.clear()
    }

}
</script>
<style lang="scss" scoped>
.barChart{
    width: 100%;
    height: 100%;
}


</style>
