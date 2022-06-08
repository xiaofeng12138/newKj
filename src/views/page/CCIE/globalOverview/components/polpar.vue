<template>
    <div class="polpar">
        <div ref="polparChat"></div>
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
        curValue:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
           e:'',
           option: {},
        }
    },  
     mounted(){
            var echartsBox=this.$refs.polparChat
            this.e=echarts.init(echartsBox);
            this.init()
       
    },
    methods:{
        init(){
            this.setOption()
            this.e.setOption(this.option)
        },
        setOption(){
            let cur = this.curValue;
            let pre = this.preValue;
        //    for(let i = 0;i<7;i++){
        //        console.log(cur)
        //    }
            this.option={
                color: [   new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "#08206B" // 0% 处的颜色
                                    }, {
                                        offset: 0.6,
                                        color: "#103094" // 60% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#1859EF" // 100% 处的颜色
                                    }], false),
                                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "#4A4129" // 0% 处的颜色
                                    }, {
                                        offset: 0.6,
                                        color: "#B59621" // 60% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#FFEB18" // 100% 处的颜色
                                    }], false)],
                title:[
                            {
                            text: pre ,
                            left: "25%",
                            top: '0%',
                            textAlign: 'center',
                            textStyle: {
                                fontSize: 18,
                                color: '#fff'
                            }
                        },
                        {
                            text: cur,
                            left: "25%",
                            top: '15%',
                            textAlign: 'center',
                            textStyle: {
                                fontSize: 18,
                                color: '#fff'
                            }
                        },
                        ],
                    

                series : [
                        {
                            type:'pie',
                            clockWise:false,
                            radius : [40, 55],
                            center:('50%','50%'),
                            hoverAnimation: false,
                            itemStyle : {
                                    normal: {
                                        label: {show:false},
                                        labelLine: {show:false}
                                    }
                                },
                            data:[
                                {
                                    // value:1 - this.curValue/(this.preValue+this.curValue),
                                    value:1 - this.preValue / (this.curValue+this.preValue+0.001),
                                    label: {
                                            normal: {
                                                // fn :this.curValue > this.preValue ? ((this.curValue- this.preValue)*100/this.preValue).toFixed(2):((this.preValue - this.curValue)*100/this.preValue).toFixed(2),
                                                fn:function(){
                                                    if(cur > pre && pre === 0){
                                                        return 100
                                                    }else if(cur > pre && pre != 0){
                                                        return ((cur - pre)*100/pre).toFixed(2)
                                                    }else if(cur < pre && cur === 0){
                                                        return 100
                                                    }else if(cur < pre && cur != 0){
                                                        return ((pre - cur)*100/pre).toFixed(2)
                                                    }else if(cur == 0 && pre == 0 ){
                                                        return 0
                                                    }
                                                    else if(cur == pre){
                                                        return 0
                                                    }
                                                },
                                                formatter: function(params) {
                                                    return '{img|}\r\n' + params.data.label.fn()+'%'
                                                },
                                                rich: {
                                                    img: {
                                                        height: 15,
                                                        width: 15,
                                                        backgroundColor: {
                                                            image:this.curValue >= this.preValue ? "sjt.png":"xjt.png"
                                                        }
                                                    }
                                                },
                                                position: 'center',
                                                show: true,
                                                textStyle:{
                                                    color: this.curValue >= this.preValue ? '#f00':'#21DB7B',
                                                    fontSize: 16,
                                                }
                                            }
                                        },
                                    itemStyle : {
                                        color: 'transparent'
                                    }
                                },
                                {
                                    value:this.preValue/(this.preValue+this.curValue)
                                }
                            ]
                        },
                        {
                            type:'pie',
                            clockWise:false,
                            radius : [25, 40],
                            hoverAnimation: false,
                            itemStyle : {
                                normal: {
                                    label: {show:false},
                                    labelLine: {show:false}
                                }
                            },
                            data:[
                                {
                                    value:1 - this.curValue/(this.preValue+this.curValue), 
                                    itemStyle : {
                                        color: 'transparent'
                                    }
                                },
                                {
                                    value:this.curValue/(this.preValue+this.curValue),
                                    name:'invisible'
                                }
                            ]
                        },
                    
                    ]
            }
        
        }

    },
    watch: {
        preValue:'init',
        curValue:'init',
    },
}
</script>
<style lang="scss" scoped>
.polpar{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    // justify-content: space-between;
    >div{
        margin-left: 0px;
        width: 100%;
        height: 100%;
    }
    
}
</style>
