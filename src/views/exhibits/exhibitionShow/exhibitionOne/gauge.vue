<template>
    <div class="gagueCom">
        <div ref="gauge">
        </div>
        <p style="cursor: pointer" :class="{'short':name.length<=6}" @click="lightMap(name)">{{name}}</p>
        <!-- <span style="color: #1deaff">{{(price/10000).toFixed(2)}}万美元</span> -->
         <span style="color: #1deaff">{{price}}种</span>
    </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
    props:{
        value:{
            type:Number,
            default:0
        },
        name:{
            type:String
        },
        price:{
            // type:any,
            default:0
        }
    },
    data(){
        return{
             charts:'',
             options:{
                 
                series:[
                    {
                        type: 'pie',
                        hoverAnimation: false, //鼠标经过的特效
                        radius: ['65%', '85%'],
                        center: ['50%', '50%'],
                        startAngle: 235,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        label: {
                            normal: {
                                position: 'center'
                            }
                        },
                        data: [
                            {
                                value: 80,
                                itemStyle: {
                                    normal: {
                                        color: '#0F2E7C'
                                    }
                                },
                            }, 
                            {
                                value: 20,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        color: "rgba(0,0,0,0)",
                                        borderWidth: 0
                                    },
                                    emphasis: {
                                        color: "rgba(0,0,0,0)",
                                        borderWidth: 0
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'pie',
                        hoverAnimation: false, //鼠标经过的特效
                        radius: ['65%', '85%'],
                        center: ['50%', '50%'],
                        startAngle: 235,
                        animationDuration:3500,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        label: {
                            normal: {
                                position: 'center'
                            }
                        },
                        data: [
                                {
                                    value: 2,
                                    itemStyle: {
                                        normal: {
                                            color: '#FFE91A',
                                        }
                                    },
                                    label: {
                                        normal: {
                                            formatter: function(parmas) {
                                                return (parmas.value*1.25).toFixed(2) + '%'
                                            },
                                            position: 'center',
                                            padding:[15,0,0,0],
                                            show: true,
                                            textStyle: {
                                                fontSize: '16',
                                                fontWeight: 'normal',
                                                color: '#fff',
                                            }
                                        }
                                    },
                                },
                                {
                                    value: 20,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            },
                                            color: "rgba(0,0,0,0)",
                                            borderWidth: 0
                                        },
                                        emphasis: {
                                            color: "rgba(0,0,0,0)",
                                            borderWidth: 0
                                        }
                                    },
                                },

                            ]
                        },

                    ]
                }
            }
    },
    watch:{
        value:'init'
    },
    mounted(){
        var echartsBox=this.$refs.gauge
        this.charts=echarts.init(echartsBox);
        this.init()
        
    },
    methods:{
        lightMap(name) {
            this.$emit('lightMap',name)
        },
        init(){
            this.options.series[1]['data'][0]['value']=this.value;
            this.charts.setOption(this.options)  
        }
    }
}
</script>
<style lang="scss" scoped>
.gagueCom{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    // justify-content: space-between;
    >div{
        width: 100%;
        
        // min-width: 6rem;
        height: 70%;
        // background: url('../../../../assets/circle.png') no-repeat 50% 50%;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    p,span{
        
        text-align: center;
    }
    p{
        &.short{
            width: 70%;
        }
        font-size: 0.625rem;
        width: 60%;
        margin: 0 auto;
    }
    span{
        font-size: 0.625rem;

    }
}
</style>


