<template>
<div class="queryERPsupplyChainall">
    <h1>企业食品化妆品ERP信息查询</h1>
           <div class="query" >
            <div class="copName"> 企业中文名称：<Input size="large" placeholder="请输入企业名称" style="width:60%" v-model="copName1"/></div>
            <div class="Time">  数据传输时间（区间）：<DatePicker size="large"  type="daterange" transfer  @on-change="Time1 = $event" format='yyyy/MM/dd' placeholder="请选择日期区间" v-model="Time1" style="width:60%"></DatePicker></div>
            <Button type='primary' size='large' @click="queryRegisterMessage(1)">查询</Button>
           </div>
         <Table border :columns = 'columns1' :data='data1' class="self">
         </Table>
         <Page :total="total1"  @on-change="changePage1" show-total />
           
          <div style="text-align:center;margin-top:16px">
                <Button type="primary" size='large' @click="exporeRegister" :disabled="isdisabled1">导出Excel</Button>
         </div>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 
export default {
  
  data(){
      return{
        isSpinShow:true,
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
              title:'企业地址',
              key:'ADDRESS',
              width:200,
              align:'center'
             },
              {
              title:'收货仓库地址',
              key:'REWADDRESS',
              width:200,
              align:'center',
             },
             {
              title:'报关单编号',
              key:'BILLNO',
              width:200,
              align:'center',
             },
              {
              title:'报关单项号',
              key:'CUSTOMSDECNO',
              width:200,
              align:'center',
             },
             {
              title:'报关状态',
              key:'STATUS',
              width:200,
              align:'center',
             },
             {
              title:'进口日期',
              key:'IMDATE',
              width:200,
              align:'center',
             },
             {
              title:'申报地海关',
              key:'DECLARECUSTOM',
              width:210,
              align:'center',
             },
             {
              title:'合同协议',
              key:'AGREEMENT',
              width:200,
              align:'center',
             },
             {
              title:'进境关别',
              key:'EMERGENCYSHUTOFF',
              width:200,
              align:'center',
             },
             {
              title:'境内收发货人社会信用代码',
              key:'CNCOMPANYCODE',
              width:200,
              align:'center',
             },
             {
              title:'境内收发货人',
              key:'TERRITORYNAME',
              width:200,
              align:'center',
             },
              {
              title:'境外收发货人',
              key:'ABROADNAME',
              width:200,
              align:'center',
             },
             {
              title:'申报单位名称',
              key:'NAMEOFAPPLICANT',
              width:200,
              align:'center',
             },
              {
              title:'启运港',
              key:'PORTOFDEPARTURE',
              width:200,
              align:'center',
             },
             {
              title:'入境口岸',
              key:'PORTOFENTRY',
              width:200,
              align:'center',
             },
              {
              title:'货物存放地点',
              key:'STORAGEOFGOODS',
              width:200,
              align:'center'
             },
              {
              title:'运输方式',
              key:'TRANSPORT',
              width:200,
              align:'center',
             },
             {
              title:'征免性质',
              key:'NATUREOFEXEMPTION',
              width:200,
              align:'center',
             },
              {
              title:'包装种类',
              key:'PACKAGETYPE',
              width:200,
              align:'center',
             },
             {
              title:'贸易国别',
              key:'TRADECOUNTRY',
              width:200,
              align:'center',
             },
             {
              title:'监管方式',
              key:'SUPERVISIONMODE',
              width:200,
              align:'center'
             },
              {
              title:'经停港',
              key:'STOPOVER',
              width:200,
              align:'center',
             },
             {
              title:'商品名称',
              key:'GOODSNAME',
              width:200,
              align:'center',
             },
             {
              title:'进口数量',
              key:'IMPORTNUM',
              width:200,
              align:'center',
             },
              {
              title:'单位',
              key:'UNIT',
              width:200,
              align:'center',
             },
          ],
          data1:[],
          data2:[],
          copName1:'',
          Time1:'',
          uscCode1:'',
          total1:0,
          name1:'',
          copName2:'',
          Time2:'',
          uscCode2:'',
          isdisabled1:true,
          isdisabled2:true,
          total2:0,
           name2:'',
      }
  },
  methods:{
    
      //企业情况查询
      queryRegisterMessage(page){
          let pageNum = page;
          let companyName = this.copName1;
          let startDate = this.Time1[0].replace(/\//g,"");
          let endDate = this.Time1[1].replace(/\//g,"");
          let data ={
              pageNum,
              companyName,
              startDate,
              endDate,
              pageSize:10
          }
           publicInter(interfaceUrl.queryMaquillageForMgmt,data).then(r=>{
              if(r.list.length > 0){
                this.data1 = r.list
                this.isdisabled1 = false
                this.total1 = r.totalRow
              }else{
               this.$Message.error('未查询到数据')
               this.data1 = r.list
               this.total1 = r.totalRow
               this.isdisabled1 = true
              }
            })
      },

     //分页功能
      changePage1(page){
          this.queryRegisterMessage(page)
      },

      //企业情况导出
      exporeRegister(){
          let companyName = this.copName1.length > 0 ? this.copName1 :'';
          let startDate = this.Time1[0].replace(/\//g,"").length > 0  ? this.Time1[0].replace(/\//g,"") :'';
          let endDate = this.Time1[1].replace(/\//g,"").length > 0 ? this.Time1[1].replace(/\//g,""):'';
          let cncompanycode = this.uscCode1.length > 0  ? this.uscCode1 :'';
         
          let url = interfaceUrl.exporeMaquillageForMgmt+'?companyName='+ companyName +'&startDate='+ startDate +'&endDate='+endDate +'&cncompanycode='+cncompanycode 
          if((startDate & endDate)){
            this.name1 = startDate +'--'+ endDate +'企业食品化妆品化妆品ERP查询.xlsx'
          }else{
            this.name1 = '企业食品化妆品ERP查询.xlsx'
          }
        filedownload(url,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', this.name1)
                    document.body.appendChild(link)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
      },
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryERPsupplyChainall{
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      margin-top: 20px;
      .copName{
        width: 25%
      }
      .Time{
        width: 30%
      }
      .uscCode{
          width:25%;
      }
    }
    .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
    
  
 }
</style>
