<template>
    <div class="tradeway"> 
        <div class="ATA">
           <div class="wrap">
               <div>
                    <img src="@/assets/qietu/zpgk/ATA.svg" alt="" style="width:45%;height:45%">
                    <p>ATA</p>
               </div>
            </div>
            <div class="showATA">
            </div>
        </div>
        <div class="exhibition">
            <div class="wrap">
                <div>
                <img src="@/assets/qietu/zpgk/zlp.svg" alt="" style="width:35%;height:35%">
                <p>展览品</p>
                </div>
            </div>
            <div class="showExhibition">

            </div>
        </div>
        <div class="baoshui">
            <div class="wrap">
                <div>
                    <img src="../../../../assets/qietu/zpgk/bszs.svg" alt="">
                <p>保税展示</p>
                </div>
            </div>
            <div class="showBaoshui">

            </div>
        </div>
        <div class="ybmy">
            <div class="wrap">
                <div>
                    <img src="@/assets/qietu/zpgk/ybmy.svg" alt="" style="width:25%;height:25%;margin-top:3%">
                <p>一般贸易等</p>
                </div>
            </div>
            <div class="showYbmy">

            </div>
        </div>           
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";

//queryTypeOfTransportation
export default {
    data(){
        return{
         AJK18:0,
         AJK19:0,
         APC18:0,
         APC19:0,

         ZJK18:0,
         ZJK19:0,
         ZPC18:0,
         ZPC19:0,

         BJK18:0,
         BJK19:0,
         BPC18:0,
         BPC19:0,

         YJK18:0,
         YJK19:0,
         YPC18:0,
         YPC19:0,

         charts1:'',
         charts2:'',
         charts3:'',
         charts4:'',
         option:{
                     legend: {  
                        data: ['2018届', '2019届'],
                        textStyle: {
                            color: '#fff'
                            },
                        top: '4%'
                    },
                      tooltip: {
                        trigger: 'axis',
                         axisPointer: {
                                type: 'none'
                            }
                        
                        },
                       color: ['#178fff', '#ffe445'],
                        xAxis:[
                            {
                                data: ["进口总额"],
                                axisLine: {
                                show: false
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                }
                            }, 
                            {
                                data: ["进口批次"],
                                gridIndex: 1,
                                axisLine: {
                                lineStyle: {
                                    color: "#fff"
                                }
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                },
                                axisLine: {
                                show: false
                                }
                            }
                        ],
                yAxis:[
                {
                    name: "(万美元)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                    {
                    gridIndex: 1,
                    name: "(批次)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                ],
                 grid: [
                {
                    
                    left: "15%",
                    bottom: 40,
                    width: "30%",
                    top:70
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    left: "60%",
                    width: "30%",
                    bottom: 40,
                    top: 70
                }
                ],
                series:[
                   {
                        name: '2018届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                     {
                        name: '2018届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
             ]
          },
        option2:{
                     legend: {  
                        data: ['2018届', '2019届'],
                        textStyle: {
                            color: '#fff'
                            },
                        top: '4%'
                    },
                      tooltip: {
                        trigger: 'axis',
                         axisPointer: {
                                type: 'none'
                            }
                        
                        },
                       color: ['#178fff', '#ffe445'],
                        xAxis:[
                            {
                                data: ["进口总额"],
                                axisLine: {
                                show: false
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                }
                            }, 
                            {
                                data: ["进口批次"],
                                gridIndex: 1,
                                axisLine: {
                                lineStyle: {
                                    color: "#fff"
                                }
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                },
                                axisLine: {
                                show: false
                                }
                            }
                        ],
                yAxis:[
                {
                    name: "(万美元)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                    {
                    gridIndex: 1,
                    name: "(批次)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                ],
                 grid: [
                {
                    
                    left: "15%",
                    bottom: 40,
                    width: "30%",
                    top:70
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    left: "60%",
                    width: "30%",
                    bottom: 40,
                    top: 70
                }
                ],
                series:[
                   {
                        name: '2018届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                     {
                        name: '2018届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
             ]
          },
        option3:{
                     legend: {  
                        data: ['2018届', '2019届'],
                        textStyle: {
                            color: '#fff'
                            },
                        top: '4%'
                    },
                      tooltip: {
                        trigger: 'axis',
                         axisPointer: {
                                type: 'none'
                            }
                        
                        },
                       color: ['#178fff', '#ffe445'],
                        xAxis:[
                            {
                                data: ["进口总额"],
                                axisLine: {
                                show: false
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                }
                            }, 
                            {
                                data: ["进口批次"],
                                gridIndex: 1,
                                axisLine: {
                                lineStyle: {
                                    color: "#fff"
                                }
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                },
                                axisLine: {
                                show: false
                                }
                            }
                        ],
                yAxis:[
                {
                    name: "(万美元)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                    {
                    gridIndex: 1,
                    name: "(批次)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                ],
                 grid: [
                {
                    
                    left: "15%",
                    bottom: 40,
                    width: "30%",
                    top:70
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    left: "60%",
                    width: "30%",
                    bottom: 40,
                    top: 70
                }
                ],
                series:[
                   {
                        name: '2018届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                     {
                        name: '2018届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
             ]
          },
        option4:{
                     legend: {  
                        data: ['2018届', '2019届'],
                        textStyle: {
                            color: '#fff'
                            },
                        top: '4%'
                    },
                      tooltip: {
                        trigger: 'axis',
                         axisPointer: {
                                type: 'none'
                            }
                        
                        },
                       color: ['#178fff', '#ffe445'],
                        xAxis:[
                            {
                                data: ["进口总额"],
                                axisLine: {
                                show: false
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                }
                            }, 
                            {
                                data: ["进口批次"],
                                gridIndex: 1,
                                axisLine: {
                                lineStyle: {
                                    color: "#fff"
                                }
                                },
                                axisTick: {
                                show: false
                                },
                                axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: "#fff",
                                    fontWeight: "normal",
                                    fontSize: "14"
                                }
                                },
                                axisLine: {
                                show: false
                                }
                            }
                        ],
                yAxis:[
                {
                    name: "(万美元)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                    {
                    gridIndex: 1,
                    name: "(批次)",
                    nameTextStyle: {
                        color: "#5864a9"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)"
                        }},

                    type:'value',
                    axisLabel:{
                            show:true,
                            textStyle:{
                                color:'#5864a9'
                            }
                        }
                    },
                ],
                 grid: [
                {
                    
                    left: "15%",
                    bottom: 40,
                    width: "30%",
                    top:70
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    left: "60%",
                    width: "30%",
                    bottom: 40,
                    top: 70
                }
                ],
                series:[
                   {
                        name: '2018届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        barWidth: 30,
                        data: [0]
                    },
                     {
                        name: '2018届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
                    {
                        name: '2019届',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        barWidth: 30,
                        data: [0]
                    },
             ]
          },
        
        }

    },
    created(){
       
    },
    mounted(){
       this.queryInfo()
    },
    methods:{
        //数据查询
      queryInfo(){
          publicInter(interfaceUrl.queryTypeOfTransportation,{}).then(r=>{
           if(r.isOk){
               //console.log(this.option.series[0].data[0] )
               console.log(r)
              this.AJK18 = r.msg[0]? this.formateTransport(r.msg[0].IMPORTPRICE) : 0; //18年进口总额
              this.APC18 = r.msg[0]? this.formateTransport(r.msg[0].IMPORTPRICE) : 0; //18年进口批次  
              this.AJK19 = r.msg2[0] ? r.msg2[0].IMPORTPRICE : 0; //19年进口总额
              this.APC19 = r.msg2[0] ? r.msg2[0].IMPORTBATCH : 0; //19年进口批次  

              this.ZJK18 = r.msg[1]? this.formateTransport(r.msg[1].IMPORTPRICE): 0; //18年进口总额
              this.ZPC18 = r.msg[1]? this.formateTransport(r.msg[1].IMPORTPRICE) : 0; //18年进口批次 
              this.ZJK19 = r.msg2[1] ? r.msg2[1].IMPORTPRICE : 0; //19年进口总额
              this.ZPC19 = r.msg2[1] ? r.msg2[1].IMPORTBATCH : 0; //19年进口批次  

              this.BJK18 = r.msg[2]? this.formateTransport(r.msg[2].IMPORTPRICE) : 0; //18年进口总额
              this.BPC18 = r.msg[2]? this.formateTransport(r.msg[2].IMPORTPRICE) : 0; //18年进口批次  
              this.BJK19 = r.msg2[2] ? r.msg2[2].IMPORTPRICE : 0; //19年进口总额
              this.BPC19 = r.msg2[2] ? r.msg2[2].IMPORTBATCH : 0; //19年进口批次 

              this.YJK18 = r.msg[3] ? this.formateTransport(r.msg[3].IMPORTPRICE) : 0;; //18年进口总额
              this.YPC18 = r.msg[3] && r.msg[3].IMPORTBATCH != "" ? this.formateTransport(r.msg[3].IMPORTPRICE) : 0; //18年进口批次 
              this.YJK19 = r.msg2[3] ? r.msg2[3].IMPORTPRICE : 0; //19年进口总额
              this.YPC19 = r.msg2[3] ? r.msg2[3].IMPORTBATCH : 0; //19年进口批次 
          

              this.initATA() 
              this.initExh() 
              this.initBs() 
              this.initYbmy()  
              }
          })
      },

     initATA(){
        this.option.series[0].data[0] = this.AJK18
        this.option.series[2].data[0] = this.APC18
        this.option.series[1].data[0] = this.AJK19
        this.option.series[3].data[0] = this.APC19
        this.charts1 = echarts.init(document.getElementsByClassName('showATA')[0]);
        this.charts1.setOption(this.option)
      },
     initExh(){
        this.option2.series[0].data[0] = this.ZJK18
        this.option2.series[2].data[0] = this.ZPC18
        this.option2.series[1].data[0] = this.ZJK19
        this.option2.series[3].data[0] = this.ZPC19
        this.charts2 = echarts.init(document.getElementsByClassName('showExhibition')[0]);
        this.charts2.setOption(this.option2)
      },
      initBs(){
        this.option3.series[0].data[0] = this.BJK18
        this.option3.series[2].data[0] = this.BPC18
        this.option3.series[1].data[0] = this.BJK19
        this.option3.series[3].data[0] = this.BPC19
        this.charts3 = echarts.init(document.getElementsByClassName('showBaoshui')[0]);
        this.charts3.setOption(this.option3)
      },
       initYbmy(){
        this.option4.series[0].data[0] = this.YJK18
        this.option4.series[2].data[0] = this.YPC18
        this.option4.series[1].data[0] = this.YJK19
        this.option4.series[3].data[0] = this.YPC19
        this.charts4 = echarts.init(document.getElementsByClassName('showYbmy')[0]);
        this.charts4.setOption(this.option4)
      },

       formateTransport(value) {
      if (value) {
        if (value > 10000) {
          return (parseInt(value / 10000) + "").replace(this.reg, ",");
        } else {
          return parseFloat(value / 10000).toFixed(2);
        }
      } else {
        return "0";
      }
    },
    }
    
}
</script>
<style lang="scss">
.tradeway{
    height: 100%;
    width: 100%;
   .wrap{
         display: flex;
         height: 15%;
         widows: 45%;
         line-height: 50px;
         text-align: center;
         margin-bottom: 0;
         margin: 0 auto;
         border-bottom: 1px solid #0037b2;
         background-color: #102561;
         div{
             margin: auto;
             display: flex;
           p{
             font-size: 20px;
             margin-left: 10px;
             color: #fff;
         }
         img{
             height: 30%;
             width: 30%;
             margin-top: 3%
         }
      }
 }
        
  .ATA{
      border: 1px solid #0037b2;
      margin-bottom: 20px;
      width: 45%;
      height: 45%;
      float: left;
      margin-left: 3%;
      .showATA{
          width: 100%;
          height: 85%;
          background-color:#0c1435;
      }

    }
.exhibition{
      border: 1px solid #0037b2;
      margin-bottom: 20px;
      width: 45%;
      height: 45%;
      float: left;
      margin-left: 2%;
      .showExhibition{
          width: 100%;
          height: 85%;
          background-color:#0c1435;
      }
}
  .baoshui{
      border: 1px solid #0037b2;
      width: 45%;
      height: 45%;
      margin-left: 3%;
      
      float: left;
      .showBaoshui{
          width: 100%;
          height: 85%;
          background-color:#0c1435;
          
      }
}
 .ybmy{
      border: 1px solid #0037b2;
      width: 45%;
      float: left;
      margin-left: 2%;
      height: 45%;
      .showYbmy{
          width: 100%;
          height: 85%;
          background-color:#0c1435;
         
      }
  }
}
  

</style>
