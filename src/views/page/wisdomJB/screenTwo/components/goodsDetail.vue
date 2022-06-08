<template>
    <!-- 商品详情展示 -->
    <div class="goodsDetail">
        <span @click="closewin()" class="closewin">×</span>
        <h3 class="title">{{ showArr.length>1?showArr[1].title:"" }}</h3>
        <div v-for="(item,index) in showArr" :key="item.uuid" 
            :class="{'main-img':index==1,'my-show-img':true}" 
            :style="{backgroundImage:'url('+require('@/assets/'+item.url)+')'}"> 
        </div>
        <span class="desc" v-if="showArr.length > 1">{{ showArr[1].desc }}<a @click="showBooth(showArr[1].billno)">{{showArr[1].billno?("("+showArr[1].billno+")"):""}}</a></span>
        <div class="switch to-left" @click="turn(-1)"></div>
        <div class="switch to-right" @click="turn(1)"></div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            arr:[],
            showArr:[],
        }
    },
    created(){
        this.getDetailArr();
    },
    methods:{
        closewin(){
            this.$emit('myCloseWin','goodsDetailShow');
        },
        showDetail(uuid,extype){
            this.getDetailArr();

            this.showArr = this.arr.filter(function(x,index){
                return x.extype === extype;
            });

            for(let index in this.showArr){
                if(this.showArr[index].uuid == uuid){
                    let del = this.showArr.splice(index,1);
                    this.showArr.splice(1,0,del[0]);
                }
            }
            // this.showArr = this.showArr.filter(function(x,index){
            //     if(x.uuid == uuid){
            //         this.mainIndex = index;
                    
            //     }
            //     return x.url;
            // });
            this.turn();    
        },
        getDetailArr(){
            axios.get('./dynamic.json').then(r=>{
                this.arr = r.data.goodsDetail;         
            });
        },
        turn(trunIndex){
            switch(trunIndex){
                case -1:
                    let del = this.showArr.splice(0,1);
                    this.showArr.splice(this.showArr.length,0,del[0]);
                    break;
                case 1:
                    let add = this.showArr.splice(this.showArr.length-1,1);
                    this.showArr.splice(0,0,add[0]);
                    break;
            }
        },
        showBooth(booth){
            this.$emit('showBooth',booth);
        },
        
    }
}
</script>
<style lang="scss" scoped>
.goodsDetail{
    position: absolute;
    top: calc(50% - 20rem);
    left: calc(50% - 37rem);
    width: 74rem;
    height: 42rem;
    background: url('../../../../../assets/bg.png') no-repeat;
    background-size: 100% 100%;
    z-index: 110;
    .switch{
        width: 34px;
        height: 84px;
        top: calc(50% - 42px);
        background-repeat: no-repeat;
        cursor: pointer;
    }
    .to-left{
        position:absolute;
        background: url('../../../../../assets/toLeft.png'); 
        left: 3rem;
    }
    .to-left:hover{
        background: url('../../../../../assets/toRight.png'); 
        transform: rotateY(180deg)
    }
    .to-right{
        position:absolute;
        background: url('../../../../../assets/toLeft.png');
        transform: rotateY(180deg);
        right: 3rem;
    }
    .to-right:hover{  
        background: url('../../../../../assets/toRight.png');
        transform: rotateY(0deg)
    }
    .closewin{
        position: absolute;
        top: 0.9rem;
        right: 1.5rem;
        font-size: 1.7rem;
        display: inline-block;
        cursor: pointer;
    }
    .title{
        font-family: Mic;
        font-size: 1.6rem;
        color: #FFDE1D;
        display: inline-block;
        width: 80%;
        position: absolute;
        text-align: center;
        margin: 3.5rem 10% 0;
    }
    .desc{
        font-family: SourceHanSansCN-Medium;
        font-size: 1.2rem;
        display: inline-block;
        word-break: break-all;
        white-space: normal;
        overflow: hidden;
        width: 46rem;
        position: absolute;
        margin: 0 13rem;
        bottom: 2.5rem;
        height: 90px;
    }
    .my-show-img{
        // transition: all 0.5s ease-in-out;
        background-repeat:no-repeat;
        background-size: 100% 100%;   
        position: absolute;
        border:4px solid #135DA8;
    }
    .main-img{
        width: 45rem;
        height: 26rem;    
        background-size: cover;   
        top: 7rem;
        left: 14rem;
        z-index: 2;
    }
    .secondary-img{
        width: 31rem;
        height: 18rem;
        opacity: 0;
        z-index: 1;
        top: 11rem;
    }
    .left-img{ 
        left: 12rem;
    }
    .right-img{
        left: 31rem;
    }
}
</style>
