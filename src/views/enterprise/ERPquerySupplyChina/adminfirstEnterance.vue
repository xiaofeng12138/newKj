<template>
<div class="queryERPsupplyChainall">
           <div class="query" >
            <div class="supplyName"> 申请企业：<Input size="large" placeholder="请输入申请企业名称" style="width:80%" v-model="name1"/></div>
            <div class="startTime">  开始时间：<DatePicker size="large"  type="date" transfer  @on-change="startTime1 = $event"  placeholder="请选择开始日期" v-model="startTime1" ></DatePicker></div>
            <div class="endTime">结束时间：<DatePicker size="large"  transfer type="date" @on-change="endTime1 = $event" v-model='endTime1' placeholder="请选择结束日期" ></DatePicker></div>
             <Button type='primary' size='large' @click="queryInfoFirst">查询</Button>
           </div>
         <Table border :columns = 'columns1' :data='data1' class="self">
         </Table>
         <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
         <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button> -->
         </div>
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
              title:'境外发货企业名称',
              key:'OVERSEASSHIPPERNAME',
              width:200,
              align:'center'
             },
              {
              title:'境外发货企业VAT号',
              key:'OVERSEASSHIPPERVAT',
              width:200,
              align:'center',
             },
             {
              title:'境外发货人国别',
              key:'OVERSEACOUNTRYNAME',
              width:200,
              align:'center',
             },
             {
              title:'境外发货人国别海关代码',
              key:'OVERSEACOUNTRYCODE',
              width:200,
              align:'center',
             },
             {
              title:'跨境物流承运企业名称',
              key:'CBLOGISTICSPER',
              width:200,
              align:'center',
             },
             {
              title:'跨境物流承运企业统一信用代码',
              key:'CBLOGISTICSPERSOCIALCREDIT',
              width:210,
              align:'center',
             },
             {
              title:'报关单位名称',
              key:'CUSTOMSDECNAME',
              width:200,
              align:'center',
             },
             {
              title:'报关单位统一信用代码',
              key:'CUSTOMSDECSOCIALCREDIT',
              width:200,
              align:'center',
             },
             {
              title:'经营单位名称',
              key:'ENTRYBUSINESSNAME',
              width:200,
              align:'center',
             },
             {
              title:'经营单位统一信用代码',
              key:'ENTRYBUSINESSSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'收货单位名称',
              key:'PURCHASERNAME',
              width:200,
              align:'center',
             },
             {
              title:'收货单位统一信用代码',
              key:'PURCHASERSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'货运代理公司名称',
              key:'FREFORWARDERNAME',
              width:200,
              align:'center',
             },
             {
              title:'货运代理公司统一信用代码',
              key:'FREFORWARDERSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'保税仓储企业名称',
              key:'BONDEDWAREHOUSE',
              width:200,
              align:'center',
             },
             {
              title:'保税仓储企业统一信用代码',
              key:'BWAREHOUSESOCIALCREDITCODE',
              width:200,
              align:'center',
             },
              {
              title:'申请企业名称',
              key:'PETITIONERNAME',
              width:200,
              align:'center'
             },
              {
              title:'申请企业统一信用代码',
              key:'PETSOCIALCREDITCODE',
              width:200,
              align:'center',
             },
              {
              title:'上传时间',
              key:'CREATEDATE',
              width:200,
              align:'center',
             },
             {
              title:'最后修改时间',
              key:'UPDATEDATE',
              width:200,
              align:'center',
             },
          ],
          
          data1:[],
          name1:'',
          startTime1:"",
          endTime1:"",
            total1:0,
          params1:{
             page:1,
             pageSize:20,
          },
          isdisabled1:true,
          excelName1:'',
      }
  },
  methods:{

      //一线企业导出
      exporeTrade(){
        // console.log(this.startTime1,this.endTime1)
         let nameChinese = this.name1.length >'0'? this.name1 :''
         let startDate = this.startTime1.length > 0 ? this.startTime1.replace(/-/g,"") :''
         let endDate = this.endTime1.length > 0  ? this.endTime1.replace(/-/g,"") :''

        let url = interfaceUrl.exporeGeneralForMgmt+'?petitionerName='+ nameChinese +'&startDate='+ startDate +'&endDate='+endDate
        let queryUrl = encodeURI(url)
          if((startDate & endDate)){
            this.excelName1 = startDate +'--'+ endDate +'一线进口.xlsx'
          }else{
            this.excelName1 = '一线进口.xlsx'
          }
           filedownload(queryUrl,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', this.excelName1)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
      },
  

          queryInfoFirst(){
          let data = {
              pageSize:20,
              pageNum:1,
              startDate:this.startTime1.replace(/-/g,""),
              endDate:this.endTime1.replace(/-/g,""),
              petitionerName:this.name1
              };
            
         publicInter(interfaceUrl.queryGeneralForMgmt,data).then(r=>{
           if(r.list.length > 0){
              this.data1 = r.list
              this.total1 = r.totalRow
              this.isdisabled1 = false
           }else{
            this.$Message.error('未查询到数据')
            this.data1 = r.list
            this.total1 = r.totalRow
            this.isdisabled1 = true
           }
          })
      },

       changePage1(page){
             let data = {
              pageSize:20,
              pageNum:page,
              startDate:this.startTime1.replace(/-/g,""),
              endDate:this.endTime1.replace(/-/g,""),
              petitionerName:this.name1
              };
            
         publicInter(interfaceUrl.queryGeneralForMgmt,data).then(r=>{
           if(r.list.length > 0){
              this.data1 = r.list
              this.total1 = r.totalRow
              this.isdisabled1 = false
           }else{
            this.$Message.error('未查询到数据')
            this.data1 = r.list
            this.total1 = r.totalRow
            this.isdisabled1 = true
           }
          })
        },
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryERPsupplyChainall{
   min-height: 500px;
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .supplyName{
        width: 25%
      }
      .startTime{
        width: 20%
      }
      .endTime{
        width: 20%
      }
    }
     .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
  
 }
</style>
