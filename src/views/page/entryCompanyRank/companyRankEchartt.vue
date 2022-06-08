<template>
        <div class="hug-body">
            <div id="title">{{agentName}}</div>
            <div id="content">
                <div id="bgd_qg"></div>
                <div id="bgd_sh"></div>
                <div id="tgsx_qg"></div>
                <div id="tgsx_sh"></div>
            </div>
            
        </div>
</template>
<script>
    import { getEchart8 } from "@/api/http";
    import axios from 'axios'
    import cfg from '@/until/config' 
    import interfaceUrl from '@/api/interfaceUrl';
    export default{
        data(){
            return{
                ym:'',
                agentName:'',
                pageFrom:'',
                bgd_qg_echart:null,
                bgd_sh_echart:null,
                tgsx_qg_echart:null,
                tgsx_sh_echart:null,
                

                qg_zl_zb_data:[],
                qg_dl_zb_data:[],
                qg_zl_sx_data:[],
                qg_dl_sx_data:[],

                sh_zl_zb_data:[],
                sh_dl_zb_data:[],
                sh_zl_sx_data:[],
                sx_dl_sx_data:[],
                legendArr:['自理','代理'],
                axisLine: {
                    lineStyle: {
                        color: 'blue'
                     }
                },
                axisLabel: {                   
                        color: 'blue',
                        fontSize:16                   
                },
                axisTick: {
                    lineStyle: {
                        color: 'blue'
                    },
                    alignWithLabel:true
                },
                nameTextStyle:{
                    fontSize:16
                }
            }
        }
        ,methods:{
            //公共option
            common_option(title,legend,data,data2){
                return{
                    title:{
                        text:title,
                        left:'center',
                        textStyle:{
                            fontSize:20,
                            color:'blue'
                        },
                        top:20
                    },
                    grid:{
                        top:80,
                        bottom:40,
                        right:'10%'
                    },
                    legend:{
                        top:0,
                        right:20,
                        data:this.legendArr
                    },
                    color:['blue','#5e5e5e'],
                    tooltip:{
                        trigger:'axis',
                        axisPointer:{
                            type:'shadow'
                        },
                    formatter:function(params){
                       let str = params[0].name+"<br>";
                        if(legend=='报关单量(%)'){
                             str += params[0].marker+params[0].seriesName+':'+params[0].value+'%<br>'
                                        +params[1].marker+params[1].seriesName+':'+params[1].value+'%';
                                        return str;
                        }else{
                             str += params[0].marker+params[0].seriesName+':'+params[0].value+'小时<br>'
                                        +params[1].marker+params[1].seriesName+':'+params[1].value+'小时';
                                        return str;
                        }
                    }
                    },
                    xAxis: [
                        {
                            name:"月份",
                            type: 'category',
                            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                            axisLine:this.axisLine,
                            axisLabel:this.axisLabel,
                            axisTick:this.axisTick,
                            nameTextStyle:this.nameTextStyle
                        }
                    ],
                    yAxis: [
                        {
                            name:legend,
                            type: 'value',
                            axisLine:this.axisLine,
                            axisLabel:this.axisLabel,
                            axisTick:this.axisTick,
                            nameTextStyle:this.nameTextStyle
                        }
                    ],
                    series: [
                        {
                            name: '自理',
                            type: 'line',
                            barGap: 0,
                            label: '',
                            data: data
                        } ,
                        {
                            name: '代理',
                            type: 'line',
                            barGap: 0,
                            label: '',
                            data: data2
                        } 
                     ]
                }   
            } 
           //初始化全国报关单
           ,init_bgd_qg(){
               this.bgd_qg_echart=this.$echarts.init(document.getElementById('bgd_qg'));
               let bgd_qg_option=this.common_option('全国报关单量占比','报关单量(%)',this.qg_zl_zb_data,this.qg_dl_zb_data);
               this.bgd_qg_echart.setOption(bgd_qg_option);
           }
           //初始化上海报关单
           ,init_bgd_sh(){
               this.bgd_sh_echart=this.$echarts.init(document.getElementById('bgd_sh'));
               let bgd_sh_option=this.common_option('上海报关单量占比','报关单量(%)',this.sh_zl_zb_data,this.sh_dl_zb_data);
               this.bgd_sh_echart.setOption(bgd_sh_option);
           }
           //初始化全国通关时效
           ,init_tgsx_qg(){
               this.tgsx_qg_echart=this.$echarts.init(document.getElementById('tgsx_qg'));
               let tgsx_qg_option=this.common_option('全国通关时效','通关时效(小时)',this.qg_zl_sx_data,this.qg_dl_sx_data);
               this.tgsx_qg_echart.setOption(tgsx_qg_option);
           }
           //初始化上海通关时效
           ,init_tgsx_sh(){
               this.tgsx_sh_echart=this.$echarts.init(document.getElementById('tgsx_sh'));
               let tgsx_sh_option=this.common_option('上海通关时效','通关时效(小时)',this.sh_zl_sx_data,this.sh_dl_sx_data);
               this.tgsx_sh_echart.setOption(tgsx_sh_option);
           }
           //获取数据
           ,getEchartData(){
              
               const _this=this;
               
               getEchart8(interfaceUrl.tgDetail).then(r=>{
                  console.log(r)
                //    if(r.code==200){
                //         _this.agentName=r.data.companyName;

                //        r.data.forEach(function(item){
                //            if(item.key=='qgZlZb'){
                //                _this.qg_zl_zb_data=item.value;
                //                return;
                //            }
                //            if(item.key=='qgDlZb'){
                //                _this.qg_dl_zb_data=item.value;
                //                return;
                //            }
                //            if(item.key=='qgZlSx'){
                //                _this.qg_zl_sx_data=item.value;
                //                return;
                //            }
                //            if(item.key=='qgDlSx'){
                //                _this.qg_dl_sx_data=item.value;
                //                return;
                //            }
                //            if(item.key=='shZlZb'){
                //                _this.sh_zl_zb_data=item.value;
                //                return;
                //            }
                //            if(item.key=='shDlZb'){
                //                _this.sh_dl_zb_data=item.value;
                //                return;
                //            }
                //            if(item.key=='shZlSx'){
                //                _this.sh_zl_sx_data=item.value;
                //                return;
                //            }
                //            if(item.key=='shDlSx'){
                //                _this.sh_dl_sx_data=item.value;
                //                return;
                //            }
                //        })
                //    }
                }).then(()=>{
                
                    this.init_bgd_qg();
                    this.init_bgd_sh();   
                    this.init_tgsx_qg();   
                    this.init_tgsx_sh();   
                    this.initWindowListen(); 
                })
           }
           //缩放监听
           ,initWindowListen(){
                const _this = this
                window.addEventListener('resize',function() {
                    _this.echartDivChangeListen()
                });
            }
           ,echartDivChangeListen(){   
                if(this.bgd_qg_echart){            
                    this.bgd_qg_echart.resize();
                }
                if(this.bgd_sh_echart){
                    this.bgd_sh_echart.resize();
                }
                if(this.tgsx_qg_echart){
                    this.tgsx_qg_echart.resize();
                }
                if(this.tgsx_sh_echart){
                    this.tgsx_sh_echart.resize();
                }
            }
        }
        ,mounted(){
           
            this.getEchartData(); 
            console.log(this.qg_dl_sx_data+"-------------------");
         }
        
    }
</script>
<style lang="scss" scoped>
@import '../../../assets/entryCompanyRank/css/style.css';
/* rgba(26,26,53,1) */
@mixin chart_base_style{
    background-color:#fff;
    width:43%;
    height:40%;
    border-radius:3px;
    margin-bottom:35px;
 }
 .hug-body{
    width: 100%;
    height: 100%;
    position: relative;
}
#title{
    width: 100%;
    height: 150px;
    color: white;
    font-size: 30px;
    font-weight: bolder;
   
    margin: 0 auto;
    text-align: center;
    line-height: 150px;
}
#content{
    width: 100%;
    height: 80%;
    margin: 0px auto;
    padding: 0 100px;
}

#bgd_qg{
    @include chart_base_style;
    float: left;
}
#bgd_sh{
    @include chart_base_style;
    float: right;
}
#tgsx_qg{
    @include chart_base_style;
    float: left;
}
#tgsx_sh{
    @include chart_base_style;
    float: right;
}

</style>