<template>
    <div class="showTable">
                  <div class="showTable_left">
                      <li>
                          <p class="p1">展览品是否符合禁止清单、限制清单的要求</p>
                          <p class="p2">{{p1}}</p>
                      </li>
                      <li>
                           <p class="p1">展览品是否有擅自移出展馆、违规销售等情况</p>
                          <p class="p2">{{p2}}</p>
                      </li>
                      <li>
                           <p class="p1">展览品是否有未经批准的试用、品尝、馈赠等情况</p>
                          <p class="p2">{{p3}}</p>
                      </li>
                      <li>
                           <p class="p1">展览品中是否存在非法出版物、印刷品、音像制品等违禁品</p>
                          <p class="p2">{{p4}}</p>
                      </li>
                      <li>
                           <p class="p1">展览品中是否存在未经海关审批入境的动植物及其产品、动植物源性食品、特殊物品</p>
                          <p class="p2">{{p5}}</p>
                      </li>
                  </div>
                   <div class="showTable_right">
                      <li>
                          <p class="p1">未获检疫准入的动植物产品是否与其它参展动植物产品相对隔离，是否做好每日消耗核销记录</p>
                          <p class="p2">{{p6}}</p>
                      </li>
                      <li>
                           <p class="p1">特殊物品包装是否安全无破损，存在生物安全风险的特殊物品是否具有生物危害标识并具备相关生物安全控制条件</p>
                          <p class="p2">{{p7}}</p>
                      </li>
                      <li>
                           <p class="p1">动植物及其产品、动植物源性食品废弃物是否按海关要求进行收集和处理</p>
                          <p class="p2">{{p8}}</p>
                      </li>
                      <li>
                           <p class="p1">是否发现动植物疫情疫病</p>
                          <p class="p2">{{p9}}</p>
                      </li>
                      <li>
                           <p class="p1">是否存在其他不符合海关规定的情况</p>
                          <p class="p2">{{p10}}</p>
                      </li>
                  </div>
              </div>
</template>

<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from "@/api/http";
export default {
    data(){
        return{
            p1:0,
            p2:0,
            p3:0,
            p4:0,
            p5:0,
            p6:0,
            p7:0,
            p8:0,
            p9:0,
            p10:0
           
        }
    },
    mounted(){
        this.queryPatrolRecord()
    },
    methods:{
         queryPatrolRecord(){
                let data = {}
                publicInter(interfaceUrl.queryPatrolRecordAmount,data).then(r=>{
                   console.log(r.list)
                //    this.p1 = r.list[9].N?r.list[9].N :'0'
                //    this.p2 = r.list[0].N?r.list[0].N :'0'
                //    this.p3 = r.list[2].N?r.list[2].N :'0'
                //    this.p4 = r.list[6].N?r.list[6].N :'0'
                //    this.p5 = r.list[3].N?r.list[3].N :'0'
                //    this.p6 = r.list[4].N?r.list[4].N :'0'
                //    this.p7 = r.list[1].N?r.list[1].N :'0'
                //    this.p8 = r.list[7].N?r.list[7].N :'0'
                //    this.p9 = r.list[5].N?r.list[5].N :'0'
                //    this.p10 = r.list[8].N?r.list[8].N :'0'
                   let obj = {};
                   for(let i = 0;i<r.list.length;i++){
                       switch(r.list[i].RECODE_NO){
                          case 0 :
                              this.p1 = r.list[i].N;
                              break;
                          case  1:
                              this.p2 = r.list[i].N;
                              break;
                          case 2 :
                              this.p3 = r.list[i].N;
                              break;
                          case  3:
                              this.p4 = r.list[i].N;
                              break;
                          case 4 :
                              this.p5 = r.list[i].N;
                              break;
                          case  5:
                              this.p6 = r.list[i].N;
                              break;
                          case 6 :
                              this.p7 = r.list[i].N;
                              break;
                          case  7:
                              this.p8 = r.list[i].N;
                              break;
                          case 8 :
                              this.p9 = r.list[i].N;
                              break;
                          case  9:
                              this.p10 = r.list[i].N;
                              break;
                       }

                   }
                      
                  }) 
                },

    }
    
}
</script>
<style lang="scss">
.showTable{
    display: flex;
    width: 1300px;
    height: 400px;
    margin-top: 20px;
    background-color: #0c1345;
    .showTable_left{
        width: 50%;
        height: 100%;
        li{
            display: flex;
            list-style: none;
            height: 18%;
            margin-top: 5px;
            justify-content: space-between;
            color: #fff;
            .p1{
                font-size: 16px;
                margin-top: 25px;
            }
            .p2{
                float: right;
                font-size: 25px;
                margin-top: 18px;
                margin-right: 30px;
                color: #FFCB39;
            }
        }
    }
     .showTable_right{
        width: 50%;
        height: 100%;
        li{
            display: flex;
            list-style: none;
            height: 18%;
            margin-top: 5px;
            justify-content: space-between;
            color: #fff;
            .p1{
                font-size: 16px;
                margin-top: 25px;
            }
            .p2{
                float: right;
                font-size: 25px;
                margin-top: 18px;
                margin-right: 20px;
                color: #FFCB39;
            }
        }
    }
}
</style>
