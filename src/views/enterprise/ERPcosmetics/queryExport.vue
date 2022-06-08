<template>
<div class="queryExport">
    <div class="query" >
            <div class="copName"> 任务编号：<Input size="large" placeholder="请输入任务编号" style="width:60%" v-model="taskNo"/></div>
            <div class="uscCode"> 合同编号：<Input size="large" placeholder="请输入合同编号：" style="width:60%" v-model="contracrNo"/></div>
            <Button type='primary' size='large' @click="queryExport(1)">查询</Button>
           </div>
     <Table border :columns = 'columns1' :data='data1' class="self">
        <template  slot-scope="{row,index}" slot="action"> 
            <Button type="primary" size ='large'  @click="showDel(index)">查看</Button>
            <Button type="error" size ='large'  @click="delone(index)">删除</Button>
        </template>
     </Table>
        <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        <!-- <div style="text-align:center;margin-top:16px">
            <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button>
        </div>  -->


        <!-- 表体Modal -->
         <Modal
                v-model="quertExpoBody"
                width = "1300px"
                :footer-hide = true
                :mask-closable = "false"
                
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="quertExpoBody=false" size='30' />
            </p>
                <Table   border :columns = 'columns2' :data='exportData' class="self" style="margin-top:40px">
                </Table>
                <!-- <Page :total=restrictTotal show-total :page-size=10 @on-change="changePagerestrict"/> -->
        </Modal>
   </div>
 </template>  
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
export default {
  data(){
      return{
          quertExpoBody:false,
          exportData:[],
           columns2:[
              {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'任务编号',
              key:'TASKNO',
              width:'200',
              align:'center'
             },
              {
              title:'货号',
              key:'PRODUCTNO',
              width:200,
              align:'center'
             },
              {
              title:'商品属性',
              key:'ATTRIBUTES',
              width:200,
              align:'center',
             },
             {
              title:'商品名称（中文）',
              key:'ATTRIBUTESNAMEZH',
              width:200,
              align:'center',
             },
              {
              title:'商品名称（英文）',
              key:'ATTRIBUTESNAMEEN',
              width:200,
              align:'center',
             },
             {
              title:'发票号',
              key:'INVOICENO',
              width:200,
              align:'center',
             },
             {
              title:'散装数量',
              key:'QUANITY',
              width:200,
              align:'center',
             },
              {
              title:'散装单位',
              key:'UNIT',
              width:200,
              align:'center',
             },
              {
              title:'批次号',
              key:'BATCHNO',
              width:200,
              align:'center',
             },
          ],



          columns1:[
              {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'任务编号',
              key:'TASKNO',
              width:'200',
              align:'center'
             },
              {
              title:'合同编号',
              key:'CONTRACRNO',
              width:200,
              align:'center'
             },
              {
              title:'业务类型',
              key:'BUSINESSTYPE',
              width:200,
              align:'center',
             },
             {
              title:'国内发货人',
              key:'COMPANYNAME',
              width:200,
              align:'center',
             },
              {
              title:'企业社会信用代码',
              key:'CNCOMPANYCODE',
              width:200,
              align:'center',
             },
             {
              title:'发货地址',
              key:'SENDADDRESS',
              width:200,
              align:'center',
             },
             {
              title:'国外收货人',
              key:'FOREIGNCONSIGNEE',
              width:200,
              align:'center',
             },
              {
              title:'收货地址',
              key:'GETADDRESS',
              width:200,
              align:'center',
             },
              {
              title:'离境口岸',
              key:'DEPARTUREPORT',
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


      //查看表体内容
      showDel(index){
        this.quertExpoBody = true

       
          let data = {
              pageSize:100,
              pageNum:1,
              taskNo:this.data1[index].TASKNO
              };
         publicInter(interfaceUrl.queryExportMaquillageList,data).then(r=>{
              //console.log(r)
              this.exportData = r.list
            //   this.total1 = r.totalRow
           })
        
       },
   
       
          
     

      delone(index){
       this.$Modal.confirm({
         title:"提示",
         content:'您确认删除这条内容吗？',
        onOk:()=>{
        let data = {
            taskNo:this.data1[index].TASKNO
        };
        publicInter(interfaceUrl.delExportMaquillage,data).then(r=>{
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
         publicInter(interfaceUrl.queryExportMaquillageHead,data).then(r=>{
            //   console.log(r)
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
