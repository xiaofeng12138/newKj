<template>
        <div class="hug-body">
            <div id="title">{{agentName}}</div>
            <div id="content">
                <div id="bgd_qg"></div>
                <div id="bgd_sh"></div>
                <div id="tgsx_qg"></div>
                <div id="tgsx_sh"></div>
            </div>
            <div class="hug-footer">沪ICP备 05012889 号  沪公网安备 31022102000177号</div>
        </div>
</template>
<script>
    import axios from 'axios'
    import cfg from '@/until/config' 
    export default{
        data(){
            return{
                ym:'',
                agentName:'',
                bgd_qg_echart:null,
                bgd_sh_echart:null,
                tgsx_qg_echart:null,
                tgsx_sh_echart:null,
                bgd_qg_data:[],
                bgd_sh_data:[],
                tgsx_qg_data:[],
                tgsx_sh_data:[],
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
            common_option(title,legend,data){
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
                    color:['blue'],
                    tooltip:{
                        trigger:'axis',
                        axisPointer:{
                            type:'shadow'
                        },
                    formatter:function(params){
                        if(legend=='报关单量(%)'){
                            return params[0].name+':'+params[0].value+'%';
                        }else{
                            return params[0].name+':'+params[0].value+'小时';
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
                            name: legend,
                            type: 'line',
                            barGap: 0,
                            label: '',
                            data: data
                        } 
                     ]
                }   
            } 
           //初始化全国报关单
           ,init_bgd_qg(){
               this.bgd_qg_echart=this.$echarts.init(document.getElementById('bgd_qg'));
               let bgd_qg_option=this.common_option('全国报关单量占比','报关单量(%)',this.bgd_qg_data);
               this.bgd_qg_echart.setOption(bgd_qg_option);
           }
           //初始化上海报关单
           ,init_bgd_sh(){
               this.bgd_sh_echart=this.$echarts.init(document.getElementById('bgd_sh'));
               let bgd_sh_option=this.common_option('上海报关单量占比','报关单量(%)',this.bgd_sh_data);
               this.bgd_sh_echart.setOption(bgd_sh_option);
           }
           //初始化全国通关时效
           ,init_tgsx_qg(){
               this.tgsx_qg_echart=this.$echarts.init(document.getElementById('tgsx_qg'));
               let tgsx_qg_option=this.common_option('全国通关时效','通关时效(小时)',this.tgsx_qg_data);
               this.tgsx_qg_echart.setOption(tgsx_qg_option);
           }
           //初始化上海通关时效
           ,init_tgsx_sh(){
               this.tgsx_sh_echart=this.$echarts.init(document.getElementById('tgsx_sh'));
               let tgsx_sh_option=this.common_option('上海通关时效','通关时效(小时)',this.tgsx_sh_data);
               this.tgsx_sh_echart.setOption(tgsx_sh_option);
           }
           //获取数据
           ,getEchartData(){
               const _this=this;
                axios({
                    method:'get',
                    url:cfg.base+'cusBase/api/company/entryNum/echart?ym='
                    +_this.ym
                    +'&agentName='
                    +_this.agentName           
                    ,headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' } 
                }).then(r=>{
                   if(r.data.code==200){
                       r.data.data.forEach(function(item){
                           if(item.key=='bgd_qg'){
                               _this.bgd_qg_data=item.value;
                               return;
                           }
                           if(item.key=='bgd_sh'){
                               _this.bgd_sh_data=item.value;
                               return;
                           }
                           if(item.key=='tgsx_qg'){
                               _this.tgsx_qg_data=item.value;
                               return;
                           }
                           if(item.key=='tgsx_sh'){
                               _this.tgsx_sh_data=item.value;
                               return;
                           }
                       })
                   }
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
            //  this.init_bgd_qg();
            //  this.init_bgd_sh();   
            //  this.init_tgsx_qg();   
            //  this.init_tgsx_sh();   
            //  this.initWindowListen();
            this.agentName=this.$route.query.agentName?this.$route.query.agentName:null;
            this.ym=this.$route.query.ym?this.$route.query.ym:null;   
            this.getEchartData();
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