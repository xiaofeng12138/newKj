<template>
    <div  ref='barCharts' style="margin: 0 auto;" :style="{width:600, height:height}"></div>
    
</template>
  <script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    props:["width","height",'deathData'],
    data(){
        return{
            A:100,
            B:200,
            C:300,
            D:400,
            E:500,
            F:600,
            G:700,
            H:800,

            I:0,
            J:0,
            K:0,
            L:0,
            M:0,
            N:0,
            O:0,
            P:0,
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
                //console.log(r)
                if (r) {
                   this.A = (r.slist1[0].FYCJ / 10000).toFixed(2);
                   this.B = (r.slist1[0].LG / 10000).toFixed(2);
                   this.C = (r.slist1[0].ZBSQ / 10000).toFixed(2);
                   this.D = (r.slist1[0].XH / 10000).toFixed(2);
                   this.E = (r.slist1[0].FQ / 10000).toFixed(2);
                   this.F = (r.slist1[0].MS / 10000).toFixed(2);
                   this.G = (r.slist1[0].QT / 10000).toFixed(2);
                   this.H = (r.slist1[0].WJ / 10000).toFixed(2);

                   this.I = (r.slist2[0].FYCJ / 10000).toFixed(2);
                   this.J = (r.slist2[0].LG / 10000).toFixed(2);
                   this.K = (r.slist2[0].ZBSQ / 10000).toFixed(2);
                   this.L = (r.slist2[0].XH / 10000).toFixed(2);
                   this.M = (r.slist2[0].FQ / 10000).toFixed(2);
                   this.N = (r.slist2[0].MS / 10000).toFixed(2);
                   this.O = (r.slist2[0].QT / 10000).toFixed(2);
                   this.P = (r.slist2[0].WJ / 10000).toFixed(2);

                    let data = r.data;
                    //金额
                   

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
                                    return parma[0]['seriesName']+':'+parma[0]['data']+'<br>2019:'+parma[1]['data']
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
                            data:['复运出境','留购','转保税区','消耗','放弃','灭失','其他','外借'],
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
                                data: [this.A,this.B,this.C,this.D,this.E,this.F,this.G,this.H]
                            },
                            {
                                name:'2019',
                                type:'bar',
                                barWidth:30,
                                // data:this.deathData?deathData2:data2
                                 data:[this.I,this.J,this.K,this.L,this.M,this.N,this.O,this.P]
                            },
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