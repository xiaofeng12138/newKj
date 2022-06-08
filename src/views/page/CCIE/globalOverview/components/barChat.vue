<template>
    <div class="barwrap">
        <div ref="barchat"></div>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
    props:{
        preValue:{
            type:Number,
            default:0
        },
        name:{
            type:String
        },
        curValue:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
           e:'',
           option:{
                title: {
                    text: '',
                    padding:[20,0,0,10],
                    textStyle:{
                        color:'#fff',
                        fontSize:'16',
                    }
                },
                grid: {
                     top: '85%',
                     left: '3%',
                },
                xAxis: [
                    {
                    show: false,
                    },
                ],
                yAxis: {
                    type: 'category',
                 
                },
                series: [
                    {
                        type: 'bar',
                        data: [],
                        barWidth:16,
                         itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#08206B" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "#103094" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#1859EF" // 100% 处的颜色
                                }], false)
                                
                            }
                        },
                        top:'10',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 14,
                                    color:'#fff',
                                    fontWeight:'bold'
                                }
                            }
                        },
                    },
                    {
                        type: 'bar',
                        data: [],
                        barWidth:16,itemStyle: {
                            normal: {
                               color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: "#4A4129" // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: "#B59621" // 60% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#FFEB18" // 100% 处的颜色
                                }], false)
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 14,
                                    color:'#fff',
                                    fontWeight:'bold'
                                }
                            }
                        },
                    }
                ]
            },

        }
    },
     mounted(){
        var echartsBox=this.$refs.barchat
        this.e=echarts.init(echartsBox);
        this.init()
        
      
    },
    methods:{
        init(){
            this.option.title.text = this.name
            this.option.series[0].data[0] = this.preValue
            this.option.series[1].data[0] = this.curValue
            this.e.setOption(this.option)
        }

    },
    watch: {
        preValue:'init',
        curValue:'init'
    },
}
</script>
<style lang="scss" scoped>
.barwrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    // justify-content: space-between;
    >div{
        margin-left: 85px;
        width: 70%;
        height: 100%;
    }
    
}
</style>
