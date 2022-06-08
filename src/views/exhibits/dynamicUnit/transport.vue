<template>
    <div class="myunit">
        <div :class="{newTransportClassF:true}" v-on:mouseover="hoverRight=true" v-on:mouseout="hoverRight=false">
            <div :class="{transportClass:true,transportRight:hoverRight}">
                <div>
                    <img src="../../../assets/waterTrans.png"/>
                    <span>海运</span>
                </div>
                <div class="transportClass2">
                    <p>进口总额：<span style="color: #1DEAFF;">{{waterTrans.IMPORTPRICE + '万美元' }}</span></p>
                    <p>进口批次：<span style="color: #1DEAFF;">{{waterTrans.IMPORTBATCH + '批次' }}</span></p>
                </div>
                <div class="sipgBackground" @click='sipgShow'></div>
            </div> 
        </div>
        <div class="transportClass">
            <div>
                <img src="../../../assets/airTrans.png"/>
                <span style="border-color: rgba(255,222,29,0.6);">空运</span>
            </div>
            <div class="transportClass2">
                <p>进口总额：<span style="color: #FFE91A;">{{airTrans.IMPORTPRICE + '万美元' }}</span></p>
                <p>进口批次：<span style="color: #FFE91A;">{{airTrans.IMPORTBATCH + '批次' }}</span></p>
            </div>
        </div>
        <div class="transportClass" style="border-bottom: none">
            <div>
                <img src="../../../assets/otherTran.png"/>
                <span style="border-color: rgba(255,118,118,0.6);">其他</span>
            </div>

            <div class="transportClass2">
                <p>进口总额：<span style="color: #FF7676;">{{otherTrans.IMPORTPRICE + '万美元' }}</span></p>
                <p>进口批次：<span style="color: #FF7676;">{{otherTrans.IMPORTBATCH+ '批次' }}</span></p>
            </div>
        </div>  
    </div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    data(){
        return {
            //海运空运其他的数据
            waterTrans:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            otherTrans:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            airTrans:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            hoverRight:false,
        }
    },
    mounted(){
        this.initQueryTypeOfTransportation();
    },
    methods:{
        //初始化左1第一个
        initQueryTypeOfTransportation(){
            publicInter(interfaceUrl.queryTypeOfTransportation,{}).then(r=>{
                if(r){
                    if(r.isOk){
                        console.log(r.msg);
                        this.waterTrans = {
                            IMPORTPRICE:r.msg.waterTransport?this.formateTransport(r.msg.waterTransport.IMPORTPRICE):"0",
                            IMPORTBATCH:(r.msg.waterTransport?parseInt(r.msg.waterTransport.IMPORTBATCH)+"":"0").replace(this.reg,","),
                        };
                        this.airTrans = {
                            IMPORTPRICE:r.msg.airTransport?this.formateTransport(r.msg.airTransport.IMPORTPRICE):"0",
                            IMPORTBATCH:(r.msg.airTransport?parseInt(r.msg.airTransport.IMPORTBATCH)+"":"0").replace(this.reg,","),
                        };
                        this.otherTrans = {
                            IMPORTPRICE:r.msg.otherTransport?this.formateTransport(r.msg.otherTransport.IMPORTPRICE):"0",
                            IMPORTBATCH:(r.msg.otherTransport?parseInt(r.msg.otherTransport.IMPORTBATCH)+"":"0").replace(this.reg,","),
                        }
                    }

                }
            })
        },
        formateTransport(value){
            if(value){
                if(value > 10000){
                    return (parseInt(value/10000)+"").replace(this.reg,",");
                }
                else{
                    return parseFloat(value/10000).toFixed(2)
                }
            }
            else{
                return "0"
            }
        },
        sipgShow(){
            this.$emit('showSipg');
        }
    },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.newTransportClassF{
    height: 33%;
    min-height: 54px;
    padding: 5px 0;
    margin:0 20px;
    position: relative;
    border-bottom: 0.5px solid #182766;
    overflow: hidden;
    cursor: pointer;  
    overflow: hidden;
    .transportClass{
        overflow: visible;
        margin: 0;
        padding: 0;
    }
}
.transportRight{
    left: -70px;
    animation: mymove 1s;
}
.transportClass{
    height: 33%;
    min-height: 54px;
    padding: 5px 0;
    margin:0 20px;
    position: relative;
    border-bottom: 0.5px solid #182766;
    overflow: hidden;
    white-space: nowrap;
    img{
        width: 42px;
        height: 42px;
    }

    >div{
        display: inline-block;
        vertical-align: middle;
        width: calc(50% - 30px);
        position: relative;
        text-align: left;
        >span{
            position: absolute;
            left: 36px;
            top: 6px;
            display: inline-block;
            width: 70px;
            height: 30px;
            border: 1px solid #1DEAEF;
            border-left: none;
            border-radius: 0 15px 15px 0;
            line-height: 30px;
            text-align: center;
            padding-right: 6px;
            border-color: rgba(29,234,239,0.6);
        }
    }
    .sipgBackground{
        background: url('../../../assets/sipg.png');
        width:66px;
        height: 48px;
    }
    .transportClass2{
        width: calc(50% + 25px);
        text-align: left;
        padding-left: 10px;
    }
}

@keyframes mymove {
    from{left: 0}
    to{
        left: -70px
    }
}
</style>
<style scoped rel="stylesheet/css">
    @media screen and (min-width: 1800px) {
        .myunit .transportClass img{
            width: 44px;
            height: 44px;
        }
        .myunit .transportClass > div > span{
            width: 128px;
            height: 38px;
            top: 4px;
            left: 32px;
            border-radius:0 19px 19px 0;
            line-height: 38px;
        }
    }
</style>