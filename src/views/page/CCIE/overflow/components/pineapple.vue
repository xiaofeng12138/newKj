<template>
    <div class="pineapple">
         <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit> 
         <div class="left">
            <img src="../img/1.jpeg" alt="">
         </div>
         <div class="right">
             <div class="rightContent">
                 <div class="r_left">
                     <div class="bjh">
                         <p class="p1">报检号:</p>
                         <p class="p2">119000004823143</p>
                     </div>
                     <div class="bgdh">
                         <p class="p1">报关单号:</p>
                         <p class="p2" @click="fn($event)" >223320191000815269</p>
                     </div>
                     <div class="bjrq">
                         <p class="p1">报检日期:</p>
                         <p class="p2" style="color:#fff">2019年7月8日</p>
                     </div>
                 </div>
                 <div class="r_mid">
                     <div class="zl">
                        <img src="../img/zl.png" alt="">
                     </div>
                 </div>
                 <div class="r_right">
                     <div class="ky">
                         <img src="../img/ysfs.png" alt="">
                         <p>空运</p>
                     </div>
                     <div class="ybmy">
                         <img src="../img/ybmy.png" alt="">
                         <p>一般贸易</p>
                     </div>
                 </div>
             </div>
             <div class="rightContent">
                 <div class="r_left">
                     <div class="bjh">
                         <p class="p1">报检号:</p>
                         <p class="p2">119000006316480</p>
                     </div>
                     <div class="bgdh">
                         <p class="p1">报关单号:</p>
                         <p class="p2" @click="fn($event)" >223320191001057168</p>
                     </div>
                     <div class="bjrq">
                         <p class="p1">报检日期:</p>
                         <p class="p2" style="color:#fff">2019年8月31日</p>
                     </div>
                 </div>
                 <div class="r_mid">
                     <div class="zl">
                        <img src="../img/zl2.png" alt="">
                     </div>
                 </div>
                 <div class="r_right">
                     <div class="ky">
                         <img src="../img/ysfs.png" alt="">
                         <p>空运</p>
                     </div>
                     <div class="ybmy">
                         <img src="../img/ybmy.png" alt="">
                         <p>一般贸易</p>
                     </div>
                 </div>
             </div>

             <div class="rightContent">
                 <div class="r_left">
                     <div class="bjh">
                         <p class="p1">报检号:</p>
                         <p class="p2" >119000007622753</p>
                     </div>
                     <div class="bgdh">
                         <p class="p1">报关单号:</p>
                         <p class="p2" @click="fn($event)" >222820191000009629</p>
                     </div>
                     <div class="bjrq">
                         <p class="p1">报检日期:</p>
                         <p class="p2" style="color:#fff">2019年10月22日</p>
                     </div>
                 </div>
                 <div class="r_mid">
                     <div class="zl">
                        <img src="../img/zl3.png" alt="">
                     </div>
                 </div>
                 <div class="r_right">
                     <div class="ky">
                         <img src="../img/ysfs.png" alt="">
                         <p>空运</p>
                     </div>
                     <div class="ybmy">
                         <img src="../img/jbhcz.png" alt="">
                         <p>进博会参展</p>
                     </div>
                 </div>
             </div>

             <div class="rightContent">
                 <div class="r_left">
                     <div class="bjh">
                         <p class="p1">报检号:</p>
                         <p class="p2">119000007634328</p>
                     </div>
                     <div class="bgdh">
                         <p class="p1">报关单号:</p>
                         <p class="p2" @click="fn($event)">222820191000008978</p>
                     </div>
                     <div class="bjrq">
                         <p class="p1">报检日期:</p>
                         <p class="p2" style="color:#fff">2019年10月22日</p>
                     </div>
                 </div>
                 <div class="r_mid">
                     <div class="zl">
                        <img src="../img/zl4.png" alt="">
                     </div>
                 </div>
                 <div class="r_right">
                     <div class="ky">
                         <img src="../img/ysfs.png" alt="">
                         <p>空运</p>
                     </div>
                     <div class="ybmy">
                         <img src="../img/jbhcz.png" alt="">
                         <p>进博会参展</p>
                     </div>
                 </div>
             </div>
        </div>
        
    </div>
    

</template>
<script>
import customsUnit from "./customsUnit";
export default {
    components:{
        customsUnit
    },
    data(){
        return{
             flag: false,
             ENTRY_ID:''

        }
    },
    methods:{
        fn($event){
            this.ENTRY_ID = $event.target.innerHTML
            //console.log(this.$refs.abc.query(this.ENTRY_ID))
            this.$refs.abc.query(this.ENTRY_ID)
           // console.log(ENTRY_ID)
            this.flag = true
        },
         closeWin() {
                this.flag = false;
            },
    }
}
</script>
<style lang="scss">
.pineapple{
    display: flex;
    width:100%;
    .left{
        width: 25%;
        height: 100%;
        img{
            width: 100%;
            height: 12rem;
            
        }
    }
    .right{
        width: 74%;
        margin-left: 20px;
        .rightContent{
            width: 100%;
            height: 140PX;
            background-color: #181C39;
            margin-bottom: 10px;
            display: flex;
            .r_left{
                width: 24%;
                height: 100%;
                div {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    margin-top: 8px;
                    line-height: 40px;
                    text-align: center;
                    font-weight: bold;
                    .p1{
                       font-size: 14px;
                       margin-left: 20px;
                       color: #fff;
                    }
                    .p2{
                        font-size: 14px;
                        margin-left: 10px;
                        color: #9C7D18;
                    }
                }
                .bgdh{
                    .p2{
                        cursor: pointer;
                    }
                }
            }
            .r_mid{
                display: flex;
                width: 50%;
                height: 100%;
                div{
                    width: 30%;
                    height: 140px;
                    margin-left: 20px;
                    padding-top: 20px;
                }
            }
            .r_right{
                width: 26%;
                display: flex;
                padding-top: 20px;
                div{
                    p{
                        color: #fff;
                    }
                }
                .ky{

                }
                .ybmy{
                     margin-left: 70px;
                }
            }

        }
    }

}
</style>

