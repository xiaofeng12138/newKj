<template>
    <div style="display:inline-block;width:80%;height:100%;text-align:center">
        <div ref="gauge" style="width:75%;height:80%;display:inline-block;" class="gauge"></div>
        <p class="infor" :class="{br:index===0||index===2}">{{explain}}</p>
        <p class="price">{{(price/10000).toFixed(2)}}万美金</p>
    </div>
    
    
</template>
<script>
let echarts = require('echarts/lib/echarts')
export default {
    props:{
        value:{
            // type:Number,
            required:true
        },
        explain:{
            type:String,
            required:true
        },
        price:{
            // type:Number,
            required:true
        },
        index:{
            type:Number
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
                            },
                        },
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
    mounted(){
        var echartsBox=this.$refs.gauge
        this.charts=echarts.init(echartsBox)
        this.options.series[1]['data'][0]['value']=this.value
        this.charts.setOption(this.options,echartsBox)
    },
    watch:{
        value:'setData'


    },
    methods:{
        animate(){
            var timer=setInterval(()=>{
                if(this.time>=30){
                    this.time=0;
                    clearInterval(timer)
                }else{
                    this.time+=10

                }

            },100)

        },
        setData(val,oldVal){
            this.options.series[1]['data'][0]['value']=val
            this.charts.setOption(this.options,false)
        }

    }
    
}
</script>
<style lang="scss" scoped>
    .gauge{
        background: url('../../../../assets/circle.png') no-repeat 50% 50%;
        background-size: 100%;
    }
    
    p.infor{
        &.br{
            width: 70%;
        }
        font-size: .85rem;
        color: #FFFFFF;
        // text-align: justify;
        // line-height: 16px;
        width: 90%;

        // padding: 10px 0;
        margin: 0 auto;
        // margin-top: 0rem;
    }
    p.price{
        width: 100%;
        font-size: 0.85rem;
        color: #1DEAFF;
        text-align: center;
        margin: 0 auto;
        line-height: 22px;
    }

</style>
