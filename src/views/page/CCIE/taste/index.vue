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

           <div class="expendWay">
               <p>消耗方式:</p>
               <CheckboxGroup @on-change = 'isTastee' v-model="checkGroup">
                  <Checkbox label='品尝'>
                  </Checkbox>
                    <Checkbox label='试用'>
                  </Checkbox>
                    <Checkbox label='散发'>
                  </Checkbox>
                </CheckboxGroup>
           </div>
           <div class="btn">
               <Button type="primary" size='large' @click="queryInfo">查  询</Button>
           </div>
       </div>

       <div class="tasteTable">
           <Table  border :columns ='columns1' :data='tasteDate' class="customTable" style="margin-top:10px">
                <template slot-scope = "{row,index}" slot="action">
                <CheckboxGroup v-model ='row.checkList'>
                  <Checkbox label='品尝'>
                  </Checkbox>
                    <Checkbox label='试用' >
                  </Checkbox>
                    <Checkbox label='散发' >
                  </Checkbox>
                </CheckboxGroup>
                </template>
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
        return{
             sendFlag:[],
             zgList:[],
             checkGroup:[],
             zwList:[],
             checkList:['试用'],
             hallno:'',
             position:'',
             tryout:'', //试用
             degustation:'', //pinchang
             distribution:'', // 散发
             tasteTotal:0,
             columns1:[
                {
                    title: "序号",
                    key:'NUM',
                    align:'center',
                    width:'100'
                },
                {
                    title: "展位号",
                     key:'POSITION',
                    align:'center'
                },
                {
                    title: "展商名称",
                    key:'EXHIBITORNAME',
                    align:'center'
                },
                {
                    title: "展品名称",
                     key:'EXHIBITSNAME',
                    align:'center'
                },
                {
                    title: "原产国",
                    key:'ORIGIN',
                    align:'center',
                     width:150
                },
                {
                    title: "消耗类型",
                    align:'center',
                    slot:"action"
                     
                },{
                    title: "消耗数量",
                    key:'AMOUNT',
                    align:'center',
                    width:150
                },{
                    title: "申请时间",
                    key:'REC_UPD_DT',
                    align:'center'
                }
            ],
            
             tasteDate:[],

        }
    },
    mounted(){
        this.queryInfo();
        this.queryZglist()
    },
    methods:{
        //查询展位
        queryZglist(){
            publicInter(interfaceUrl.queryPositionTransport,{}).then(res=>{
                this.zgList = res.position
            })
        },
        zgChange(value) {
            publicInter(interfaceUrl.qryBoothnoByHall, {hallno: value}).then( r => {
                this.zwList = r.list
            })
        },

        queryZwh(value){
            let data ={
                hallno:this.pavilion,
                boothno: value
            }
            publicInter(interfaceUrl.qryAllBoothno,data).then(res=>{
                       this.zwList = res.list
            })
        },
        changePage(page){
            let pg =page
            let data ={
             hallno:this.hallno,
             position:this.position,
             tryout:this.tryout, //试用
             degustation:this.degustation, //pinchang
             distribution:this.distribution, // 散发
             pageNum:pg,
             pageSize:10
            }
             publicInter(interfaceUrl.queryTryOutRecord,data).then(r=>{
                this.tasteDate = r.list
                this.tasteTotal = r.totalRow
                for(let i = 0;i<this.tasteDate.length;i++){
                    let checked = []
                    checked.push(this.tasteDate[i].ISTYROUT == '1'? '试用':'')
                    checked.push(this.tasteDate[i].ISDEGUSTATION == '1'? '品尝':'')
                    checked.push(this.tasteDate[i].ISDISTRIBUTION == '1'? '散发':'')
                    this.tasteDate[i].checkList = checked
                }
            });

        },
         isTastee(e){
            this.degustation = this.checkGroup[0] ?'1' :''
            this.tryout = this.checkGroup[1] ?'1' :''
            this.distribution = this.checkGroup[2] ?'1' :''
           
        },
        //获取具体展位
        queryPosition(e){
           this.position = e
        },
        //查询试吃试用记录
        queryInfo(){
            let data ={
             hallno:this.hallno,
             position:this.position,
             tryout:this.tryout, //试用
             degustation:this.degustation, //pinchang
             distribution:this.distribution, // 散发
             pageNum:1,
             pageSize:10
            }
             publicInter(interfaceUrl.queryTryOutRecord,data).then(r=>{
                this.tasteDate = r.list
                this.tasteTotal = r.totalRow
                 for(let i = 0;i<this.tasteDate.length;i++){
                    let checked = []
                    // console.log(this.tasteDate[i].ISTYROUT)
                    // console.log(this.tasteDate[i].ISDEGUSTATION)
                    // console.log(this.tasteDate[i].ISDISTRIBUTION)
                    checked.push(this.tasteDate[i].ISTYROUT == '1'? '试用':'')
                    checked.push(this.tasteDate[i].ISDEGUSTATION == '1'? '品尝':'')
                    checked.push(this.tasteDate[i].ISDISTRIBUTION == '1'? '散发':'')
                    this.tasteDate[i].checkList = checked
                    //  console.log(this.checkList)
                    console.log(checked.push(this.tasteDate[i].ISTYROUT == '1'? '试用':''))
                }
                //console.log(this.checkList)
                
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
    .tasteTable{

    }
}
</style>

