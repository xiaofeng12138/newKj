<template>
    <div  ref='barCharts' style="margin: 0 auto;" :style="{width:width, height:height}"></div>
    
</template>
  <script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    props:["width","height",'deathData'],
    data(){
        return{
            A:10,
            B:20,
            C:30,
            D:40,
            E:50,
            F:60,
            G:70,
            H:80,
            //展品流向预测的字体颜色
            color:['#8FA1FF'],
            barChart:null,
        }
    },
    mounted(){
        //初始化展品流向预测(柱状图)
        this.initBar();
    },
    updated(){
        this.resize();
    },
    methods:{
        //产品流向预测
        initBar(){
            let deathData1=[12060,0,985,1526],that=this;
            this.barChart = this.$echarts.init(this.$refs.barCharts);

            publicInter(interfaceUrl.qryTotalFlow,{}).then(r=> {
                console.log(r)
                if (r) {
                  //let data = r.data;
                    //金额
                   this.A = (r.ylist1[0].A / 10000).toFixed(2);
                   this.B = (r.ylist1[0].B / 10000).toFixed(2);
                   this.C = (r.ylist1[0].C / 10000).toFixed(2);
                   this.D = (r.ylist1[0].D / 10000).toFixed(2);

                   this.E = (r.ylist2[0].A / 10000).toFixed(2);
                   this.F = (r.ylist2[0].B / 10000).toFixed(2);
                   this.G = (r.ylist2[0].C / 10000).toFixed(2);
                   this.H = (r.ylist2[0].D / 10000).toFixed(2);



                    let priceUnit = "万美元";
                    // if(Math.max.apply(null,data1) > 10000){
                    //     data1 = this.dimi(data1);
                    //     priceUnit = "万美元"
                    // }
                    let options1 = {
                        color: ['#174CFF', '#FFE91A'],
                        tooltip: {
                            formatter:function(parma){
                            
                                if(!that.deathData){
                                    return parma[0]['seriesName']+':'+parma[0]['data']+'<br>'+parma[1]['seriesName']+':'+parma[1]['data']
                                }else{
                                    return parma[0]['seriesName']+':'+parma[0]['data']+'<br>单证数:'+parma[1]['data']
                                }

                            },
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            textStyle:{
                                fontSize:20
                            }
                        },
                        legend:{
                            data:['2018','2019'],
                            textStyle: {//图例文字的样式
                                color: this.color[0],
                                fontSize:16
                            },
                            padding:[15,0,1,0]
                        },
                        xAxis:[{
                            type: 'category',
                            data:['复运出境','放弃&消耗','留购','转特殊监管区域等'],
                            axisLabel: {
                                fontSize:16,
                                textStyle: {
                                    color: this.color[0],
                                },
                                interval:0,
                            },
                        }],
                        yAxis:[
                            {
                                type: 'value',
                                name:priceUnit,
                                position:'left',
                                axisLabel:{
                                    formatter:'{value}',
                                    margin:-2,
                                    fontSize:16
                                },
                                axisLine: {
                                    show:false,
                                    lineStyle: {
                                        color: this.color[0]
                                    }
                                },
                                splitLine: {
                                    lineStyle:{
                                        color:'#182766'
                                    }
                                },
                                axisTick:{
                                    show:false
                                }
                            },   
                        ],
                        series:[
                            {
                                name:'2018',
                                type:'bar',
                                barGap:0,
                                barWidth:30,
                                data: [this.A,this.B,this.C,this.D]
                            },
                            {
                                name:'2019',
                                type:'bar',
                                barWidth:30,
                                // data:this.deathData?deathData2:data2
                                 data: [this.E,this.F,this.G,this.H]
                            }
                        ]
                    }
                    this.barChart.setOption(options1);
                }
            });
        },
        //除以10000
        dimi(value){
            for(let i = 0; i < value.length;i++){
                value[i] = parseFloat(value[i]/10000).toFixed(2);
            }
            return value;
        },
        resize(){
            this.barChart.resize();
        }
    }
}
 </script>