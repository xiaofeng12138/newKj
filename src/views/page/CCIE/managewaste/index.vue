<template>
    <div class="taste">
       <div class="tasteHeader">
           <div class="taskeZgh">
               <p style="font-size:1rem">展馆号:</p>
               <Select v-model="hallno" @on-change="zgChange" placeholder="请选择展馆号"  class="customSelect" size='large'  style="width:150px;margin-right:20px;">
                 <Option v-for="(item,index) in zgList" :value="item.ID" :key="index">{{ item.NAME }}</Option>
               </Select>
           </div>
            <div class="taskeZwh">
                <p style="font-size:1rem">展位号:</p>
                <Select v-model="position" filterable class="customSelect" size='large'  style="width:150px;margin-right:20px;" @on-query-change='queryZwh'>
                    <Option v-for="item in zwList" :key="item.POSITION" :value="item.POSITION">{{item.POSITION}}</Option>
                </Select>
           </div>
           <div class="btn">
               <Button type="primary" size='large' @click="queryInfo">查  询</Button>
           </div>
       </div>

       <div class="tasteTable">
           <Table  border :columns ='columns1' :data='tasteDate' class="customTable" style="margin-top:10px">
               
           </Table>
           <Page :total= tasteTotal show-total :page-size=10 @on-change="changePage" style="margin-top:20px"/>
       </div>
    </div>
</template>

<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'

export default {
    data(){
        //Api/exhiboyor/qryBoothnoByHall   hallno
        return{
             zwhList:[],
             zgList:[],
             hallno:'',
             position:'',
             boothno:'',
             tryout:'', //试用
             degustation:'', //pinchang
             distribution:'', // 散发
             tasteTotal:0,
             columns1:[
                {
                    title: "序号",
                    key:'NUM',
                    align:'center',
                    width:'130'
                },
                {
                    title: "展位号",
                     key:'BOOTHNO',
                    align:'center'
                },
                {
                    title: "展商名称",
                    key:'COMPANYNAME',
                    align:'center'
                },
                {
                    title: "登记时间",
                     key:'APPLYTIME',
                    align:'center'
                }
            ],
            
             tasteDate:[],
             zwList:[],

        }
    },
    mounted(){
        this.queryInfo();
        this.queryZglist();
    },
    methods:{
        //查询展位
        queryZglist(){
            publicInter(interfaceUrl.queryPositionTransport,{}).then(res=>{
                this.zgList = res.position
            })
        },
         

        changePage(page){
            let pg = page
            let data ={
             PAVILION:this.hallno,
             BOOTHNO:this.position,
             pageNum:pg,
             pageSize:10
            }
             publicInter(interfaceUrl.queryScreenWasteApplication,data).then(r=>{
                this.tasteDate = r.list
                this.tasteTotal = r.totalRow
            });
        },
        //根据展馆查询展位
         queryZwh(value){
            let data ={
                hallno:this.pavilion,
                boothno: value
            }
            publicInter(interfaceUrl.qryAllBoothno,data).then(res=>{
                       this.zwList = res.list
            })
        },
        zgChange(value) {
            publicInter(interfaceUrl.qryBoothnoByHall, {hallno: value}).then( r => {
                this.zwList = r.list
            })
        },

        //查询试吃试用记录
        queryInfo(){
            let data ={
             PAVILION:this.hallno,
             BOOTHNO:this.position,
             pageNum:1,
             pageSize:10
            }
             publicInter(interfaceUrl.queryScreenWasteApplication,data).then(r=>{
                this.tasteDate = r.list
                this.tasteTotal = r.totalRow
            });

        }
    }
}
</script>
<style lang="scss">
.taste{
    width: 96%;
    margin: auto;
    height: 600px;
    .tasteHeader{
        display: flex;
        height: 50px;
       .taskeZgh {
           display: flex;
           p{
               line-height: 30px;
               margin-right: 20px;
               margin-left: 20px;
               color: #fff;
               font-size: 1.25rem;
           }
       }
       .taskeZwh {
           display: flex;
           p{
               line-height: 30px;
               margin-right: 20px;
               margin-left: 20px;
               color: #fff;
               font-size: 1.25rem;
           }
       }
       .expendWay{
           display: flex;
           margin-left: 20px;
           color: #fff;
           p{
                line-height: 40px;
               margin-right: 20px;
               margin-left: 20px;
               color: #fff;
               font-size: 14px;
           }
           .ivu-checkbox-group {
               line-height: 36px;
               font-size: 16px;
           }
       }
       .btn{
           width: 140px;
           margin-left: 40px;
           button{
               width: 140px;
               font-size: 16px;
           }
       }
    }
}
</style>

