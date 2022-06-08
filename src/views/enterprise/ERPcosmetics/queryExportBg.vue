<template>
<div class="queryExport">
   <div class="query" >
            <div class="copName"> 任务编号：<Input size="large" placeholder="请输入任务编号" style="width:60%" v-model="taskNo"/></div>
            <div class="uscCode"> 合同编号：<Input size="large" placeholder="请输入合同编号：" style="width:60%" v-model="contracrNo"/></div>
            <Button type='primary' size='large' @click="queryExport(1)">查询</Button>
           </div>
     <Table border :columns = 'columns1' :data='data1' class="self">
        <template  slot-scope="{row,index}" slot="action"> 
        <Button type="error" size ='large'  @click="delone(index)">删除</Button>
        </template>
     </Table>
        <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        <!-- <div style="text-align:center;margin-top:16px">
            <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button>
        </div>  -->
   </div>
 </template>  
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
export default {
  data(){
      return{
          columns1:[
              {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'企业名称',
              key:'COMPANYNAME',
              width:'200',
              align:'center'
             },
              {
              title:'企业社会信用代码',
              key:'CNCOMPANYCODE',
              width:200,
              align:'center'
             },
              {
              title:'任务编号',
              key:'TASKNO',
              width:200,
              align:'center',
             },
             {
              title:'合同号',
              key:'CONTRACRNO',
              width:200,
              align:'center',
             },
              {
              title:'开船日期',
              key:'STARTDATE',
              width:200,
              align:'center',
             },
             {
              title:'提运单号',
              key:'DELIVERYNO',
              width:200,
              align:'center',
             },
             {
              title:'船名/航班',
              key:'SHIPCREWORNAME',
              width:200,
              align:'center',
             },
             {
              title:'航次',
              key:'VOYAGENUMBER',
              width:210,
              align:'center',
             },
             {
              title:'集装箱号',
              key:'CONTAINERNUMBER',
              width:200,
              align:'center',
             },
             {
              title:'报关单号',
              key:'BILLNO',
              width:200,
              align:'center',
             },
              {
              title:'操作',
              slot:'action',
              width:200,
              align:'center',
              fixed:'right'
            }
          ],
          data1:[],
          total1:0,
          isdisabled1:true,
          taskNo:'',
          contracrNo:''
      }
  },
  mounted(){
      this.queryExport(1);
     
  },
  methods:{
      delone(index){
       this.$Modal.confirm({
         title:"提示",
         content:'您确认删除这条内容吗？',
        onOk:()=>{
        let data = {
            billNo:this.data1[index].BILLNO
        };
        publicInter(interfaceUrl.delMaquillageDeclared,data).then(r=>{
            // console.log(r)
               this.$Message.success('删除成功')
               this.data1.splice(index,1)
               this.queryExport()
            })
         }
       })
      },
      queryExport(page){
        let pageNum = page
          let data = {
              taskno:this.taskNo,
              contracrno:this.contracrNo,
              pageSize:20,
              pageNum
              };
         publicInter(interfaceUrl.queryExportMaquillageDeclared,data).then(r=>{
              // console.log(r)
              this.data1 = r.list
              this.total1 = r.totalRow
           })
      },
         changePage1(page){
            this.queryExport(page)
        },
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryExport{
   .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .copName{
        width: 20%
      }
      .uscCode{
          width:25%;
      }
    }
   
    .list{
        margin-top: 20px;
        height: 170px;
        width: 100%;
        box-shadow:  0 0 10px 0 rgba(45, 140, 240, 0.5);
        border:1px solid #ccc;
        h2{
            margin: 10px 0 10px 20px;
        }
        .ivu-table-wrapper{
            margin: 10px 20px;
        }
    }
    .ivu-modal-body{
      .alert{
        li{
          display: flex;
        }
      }
    }
    .ivu-modal-mask{
         background-color: rgba(0, 0, 0, 0.3)
    }
    
     .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
    .ivu-form-item {
    margin-bottom: 0;
    vertical-align: top;
    zoom: 1;
}
 }
</style>
