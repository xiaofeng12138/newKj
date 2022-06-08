<template>
    <div class="myunit">
        <div class="newTransportClassF" >
            <div class="transportClass">
                <div>
                    <img src="@/assets/ATA.png"/>
                    <span>ATA</span>
                </div>
                <div class="ATA">
                    <div class="ATA-slider">
                        <div class="transportClass2" >
                            <p>进口总额：<span style="color: #1DEAFF;">{{A.IMPORTPRICE + '万美元' }}</span></p>
                            <p>进口批次：<span style="color: #1DEAFF;">{{A.IMPORTBATCH + '批次' }}</span></p>
                        </div>
                        <div class="transportClass2" >
                            <p>核销总额：<span style="color: #1DEAFF;">325万美元</span></p>
                            <p>核销批次：<span style="color: #1DEAFF;">46批次</span></p>
                        </div>
                    </div>
                    
                </div>
                
                <!-- <div class="sipgBackground" @click='sipgShow'></div> -->
            </div> 
        </div>
        <div class="transportClass">
            <div>
                <img src="@/assets/zlp.png"/>
                <span style="border-color: rgba(255,222,29,0.6);">展览品</span>
            </div>
            <div class="ATA">
                <div class="ATA-slider">
                    <div class="transportClass2">
                        <p>进口总额：<span style="color: #FFE91A;">{{B.IMPORTPRICE + '万美元' }}</span></p>
                        <p>进口批次：<span style="color: #FFE91A;">{{B.IMPORTBATCH + '批次' }}</span></p>
                    </div>
                    <div class="transportClass2">
                        <p>核销总额：<span style="color: #FFE91A;">325万美元</span></p>
                        <p>核销批次：<span style="color: #FFE91A;">205批次</span></p>
                    </div>
                </div>
            </div>

        </div>
        <div class="transportClass">
            <div>
                <img src="@/assets/bszs.png"/>
                <span style="border-color: #95EF65;">保税展示</span>
            </div>
            <div class="ATA">
                <div class="ATA-slider">
                    <div class="transportClass2">
                        <p>进口总额：<span style="color: #95EF65;">{{C.IMPORTPRICE + '万美元' }}</span></p>
                        <p>进口批次：<span style="color: #95EF65;">{{C.IMPORTBATCH+ '批次' }}</span></p>
                    </div>
                    <div class="transportClass2">
                        <p>核销总额：<span style="color: #95EF65;">10783万美元</span></p>
                        <p>核销批次：<span style="color: #95EF65;">113批次</span></p>
                    </div>
                </div>
            </div>

            
        </div> 
        <div class="transportClass"  style="border-bottom: none">
            <div>
                <img src="@/assets/ybmy.png"/>
                <span style="border-color: rgba(255,118,118,0.6);">一般贸易等</span>
            </div>
            <div class='ATA'>
                <div class="ATA-slider imgSlider">
                    <div class="transportClass2">
                        <p>进口总额：<span style="color: #FF7676;">{{D.IMPORTPRICE + '万美元' }}</span></p>
                        
                    </div>
                    <div class="transportClass2">
                        <img src="@/assets/sipg.png" style="height:100%" alt="">

                    </div>
                </div>
              
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
            A:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            B:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            C:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            D:{
                IMPORTPRICE:0,
                IMPORTBATCH:0
            },
            hoverRight:false,
            reg:/(?=(?!\b)(\d{3})+$)/g,
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
                        this.A = {
                            IMPORTPRICE:this.formateTransport(r.msg[0].IMPORTPRICE) || "0",
                            IMPORTBATCH:(r.msg[0].IMPORTBATCH)?(parseInt(r.msg[0].IMPORTBATCH)+"").replace(this.reg,","):"0",
                        };
                        this.B = {
                            IMPORTPRICE:this.formateTransport(r.msg[1].IMPORTPRICE) || "0",
                            IMPORTBATCH:(r.msg[1].IMPORTBATCH)?(parseInt(r.msg[1].IMPORTBATCH)+"").replace(this.reg,","):"0",
                        };
                        this.C = {
                            IMPORTPRICE:this.formateTransport(r.msg[2].IMPORTPRICE) || "0",
                            IMPORTBATCH:(r.msg[2].IMPORTBATCH)?(parseInt(r.msg[2].IMPORTBATCH)+"").replace(this.reg,","):"0",
                        };
                        this.D = {
                            IMPORTPRICE:this.formateTransport(r.msg[3].IMPORTPRICE) || "0",
                            IMPORTBATCH:(r.msg[3].IMPORTBATCH)?(parseInt(r.msg[3].IMPORTBATCH)+"").replace(this.reg,","):"0",
                        };
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
@import '../../../styles/mixin.scss';
.newTransportClassF{
    min-height: 3.5rem;
    margin:0 20px;
    height: 25%;
    position: relative;
    border-bottom: 0.5px solid #182766;
    overflow: hidden;
    cursor: pointer;  
    // padding-top:10px;    
    .transportClass{
        overflow: visible;
        position: relative;
        white-space: nowrap;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
// .transportRight{
//     left: -70px;
//     animation: mymove 1s;
// }
.myunit{
    @include thumb;
    overflow-y: auto;
    padding-top:10px; 
    >.transportClass{
        display: flex;
        align-items: center;
        height: 25%;
        min-height: 3rem;
        margin:0 20px;
        justify-content: space-between;
        position: relative;
        border-bottom: 0.5px solid #182766;
        overflow: hidden;
        white-space: nowrap;
    }
}
.transportClass{
    &.sipg{
        
        background: url("../../../../../assets/sipg.png") no-repeat 100% 50%;
         background-size:10% 70%; 
    }
    
    img{
        width: 42px;
        height: 42px;
    }

    >div{
        display: inline-block;
        vertical-align: middle;
        width: 40%;
        position: relative;
        margin-right: -3px;
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
        background: url('../../../../../assets/sipg.png');
        width:66px;
        height: 48px;
        vertical-align:top
    }
    .ATA{
        width:55%;
        text-align: left;
        overflow: hidden;
        margin-left: -3px;
        
        &:hover{
            >div.ATA-slider{
                transform: translate(-50%,0);
                &.imgSlider{
                    transform: translate(-10%,0);
                }

            }
            
        }
        >div.ATA-slider{
            display: flex;
            transition: all 1s ease-in-out;
            justify-content: flex-start;
            flex-wrap: nowrap;
            width: 200%;
            >div{
                width: 50%;
            }
        }
        // padding-left: 10px;
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
            font-size: 1.1rem;
        }
        .transportClass2{
            font-size: 1.1rem;
        }
    }
</style>