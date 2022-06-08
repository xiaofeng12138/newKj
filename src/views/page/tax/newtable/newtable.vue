<template>
     <div class="sumData">
          <div class="quata">
              <div class="quataChild quataChild1">
                  <span>总额度</span>
                  <p>{{parseFloat(sumData.sumQuota).toLocaleString()}}</p>
              </div>
              <div class="quataChild quataChild2">
                   <span>已用额度</span>
                  <p @click="QuataDetail(sumData.remainQuota)">{{parseFloat(sumData.usedQuota).toLocaleString()}}</p>
              </div>
              <div class="quataChild quataChild3">
                  <span>剩余额度</span>
                  <p  :class="{red:sumData.remainQuota<20000000}">{{parseFloat(sumData.remainQuota).toLocaleString()}}</p>
              </div>
             
          </div>
           <div>
                  <router-view></router-view>
              </div>
     </div>
</template>
<script>
import {publicInter} from '@/api/http'
    export default{
        name:'newtable',
        data(){
            return {
                sumData:{}
            }
        },
        created(){
            let url='/tu/importExpoQuota/qryTotalCount'
            publicInter(url,{a:2}).then(res=>{
                this.sumData=res;
            })
        },
        methods:{
            QuataDetail(res){
               this.$router.push({name:'RemainQuota'})

            }
               
        }
    }
</script>
<style scoped>
    .quata{
        width: 90%;
        border: 1px solid black;
        height: 150px;
        margin: 0 auto;
        display: flex;
    }
    .quataChild{
        /* flex: 1; */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 16px
    }
    .quataChild p{
        font-weight: bold;
        font-size: 22px;
        margin-top: 10px
     }
     .quataChild span{
         font-size: 20px;
          font-weight: bold;
     }
    .quataChild1{
        flex: 1;
    }
     .quataChild2{
        flex: 2;
    }
    .quataChild2 p{
        cursor: pointer;
    }
     .quataChild3{
        flex: 1;
    }
    .red{
        cursor: pointer;
        color: red;
    }
</style>
