<template>
    <!-- 号馆概览 -->
    <div class="overView">
        <h3>{{hallno+"号馆概况"}}</h3>
        <span @click="closewin()" class="closewin">×</span>
        <div>
            <span class="title">参展国家/地区:</span>
            <span class="content">{{ country +"个"}}</span>
        </div>
        <div>
            <span class="title">参展商数：</span>
            <span class="content">{{ exhibitor + "家"}}</span>
        </div>
        <div>
            <span class="title">展位数:</span>
            <span class="content">{{ position + "个"}}</span>
        </div>
        <div>
            <span class="title">展品价值总额：</span>
            <span class="content">{{price+"美元"}}</span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            "country":"",
            "exhibitor":"",
            "position":"",
            "price":"",
            "hallno":"",
            reg:/(?=(?!\b)(\d{3})+$)/g,
        }
    },
    methods:{
        getOver(position){
            axios.get('/dynamic.json').then(r=>{
                let data = r.data.numover[position];
                if(data){
                    this.hallno = position;
                    this.country = data.country;
                    this.exhibitor = data.exhibitor;
                    this.position = data.position;
                    this.price = data.price.replace(this.reg,",");
                }             
            });
        },
        closewin(){
            this.$emit('myCloseWin','numOverShow');
        }
    }
}
</script>
<style lang="scss" scoped>
.overView{
    position: absolute;
    width: 25rem;
    height: 17rem;
    background: #090D39;
    border: 1px solid #002068;
    border-radius: 9px;
    color: #fff;
    z-index: 20;
    h3{
        width: 23rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin: 1rem 1rem 0.5rem 1rem;
        background: #0F2E7C;
        font-size: 1.2rem;
        text-align: center;
    }
    .closewin{
        position: absolute;
        top: 0.9rem;
        right: 1.5rem;
        font-size: 1.7rem;
        display: inline-block;
        cursor: pointer;
    }
    >div{
        margin-top: 1.4rem;
    }
    span.title{
        font-size: 1.1rem;
        color: #FFDE1D;
        display: inline-block;
        width: 10rem;
        margin-left: 1.5rem;
        vertical-align: middle;
    }
    span.content{
        font-size: 1.1rem;
        width: 12rem;
        display: inline-block;
        vertical-align: middle;
    }
    
}
</style>

