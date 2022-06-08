<template>
<div class="queryERPsupplyChainall">
         <h1>企业供应链查询</h1>
    <Tabs class="agentCencus">
         <TabPane label="普通贸易进口" >
           <div class="query" >
            <div class="supplyName"> 申请企业：<Input size="large" placeholder="请输入申请企业名称" style="width:80%" v-model="name1"/></div>
            <div class="startTime">  开始时间：<DatePicker size="large"  type="date" transfer  @on-change="startTime1 = $event"  placeholder="请选择开始日期" v-model="startTime1" ></DatePicker></div>
            <div class="endTime">结束时间：<DatePicker size="large"  transfer type="date" @on-change="endTime1 = $event" v-model='endTime1' placeholder="请选择结束日期" ></DatePicker></div>
             <Button type='primary' size='large' @click="queryInfoFirst">查询</Button>
           </div>
         <Table border :columns = 'columns1' :data='data1' class="self">
            <!-- <template  slot-scope="{row,index}" slot="action"> 
              <Button type="primary" size ='large' style="margin-right:5px" @click="showone(index)">查看</Button>
            </template> -->
         </Table>
         <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
          <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button> -->
         </div>
      </TabPane>
      
         <TabPane label="一线进口" >
           <adminFirstEnterance />
        </TabPane>
       <TabPane label="二线进口" >
          <div class="query" >
            <div class="supplyName"> 申请企业：<Input size="large" placeholder="请输入申请企业名称" style="width:80%" v-model="name2"/></div>
            <div class="startTime">  开始时间：<DatePicker size="large"  type="date" transfer  @on-change="startTime2 = $event"  placeholder="请选择开始日期" v-model="startTime2" ></DatePicker></div>
            <div class="endTime">结束时间：<DatePicker size="large"  transfer type="date" @on-change="endTime2= $event" v-model='endTime2' placeholder="请选择结束日期" ></DatePicker></div>
            <div class="supplyName"> 保税仓储企业：<Input size="large" placeholder="请输入保税仓储企业名称" style="width:60%" v-model="storange"/></div>
             <Button type='primary' size='large' @click="queryInfoSecond">查询</Button>
           </div>
         <Table border :columns = 'columns2' :data='data2' class="self">
            <!-- <template  slot-scope="{row,index}" slot="action"> 
              <Button type="primary" size ='large' style="margin-right:5px" @click="showtwo(index)">查看</Button>
            </template> -->
         </Table>
          <Page :total="total2" :page-size=20  @on-change="changePage2" show-total />
          <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeSecond" :disabled="isdisabled2">导出Excel</Button> -->
         </div>
      </TabPane>
       <!-- </div> -->
     </Tabs>
      </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import adminFirstEnterance from './adminfirstEnterance'
export default {
   components:{
      adminFirstEnterance
    },
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
          columns2:[
             {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'发货企业名称',
              key:'SHIPPERNAME',
              width:200,
              align:'center'
             },
              {
              title:'发货企业统一信用代码',
              key:'SHIPPERCODE',
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
              title:'境内运输公司名称',
              key:'DOMESTICTRANSPORT',
              width:200,
              align:'center',
             },
             {
              title:'境内运输公司统一信用代码',
              key:'DOMESTICTRANSOCIALCREDIT',
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
          data2:[],
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

          name2:'',
          startTime2:"",
          endTime2:"",
          total2:0,
          storange:'', //仓储名称
           params2:{
             page:1,
             pageSize:20,
          },
          isdisabled2:true,
          excelName2:''
      }
  },
  methods:{

      //一线企业导出
      exporeTrade(){
        // console.log(this.startTime1,this.endTime1)
         let nameChinese = this.name1.length >'0'? this.name1 :''
         let startDate = this.startTime1.length > 0 ? this.startTime1.replace(/-/g,"") :''
         let endDate = this.endTime1.length > 0  ? this.endTime1.replace(/-/g,"") :''

         let url = interfaceUrl.exporeCommonForMgmt+'?petitionerName='+ nameChinese +'&startDate='+ startDate +'&endDate='+endDate
         let queryUrl = encodeURI(url)
          if((startDate & endDate)){
            this.excelName1 = startDate +'--'+ endDate +'普通贸易进口.xlsx'
          }else{
            this.excelName1 = '普通贸易进口.xlsx'
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

         //二线企业导出
         exporeSecond(){
            let nameChinese = this.name2.length > 0 ? this.name2 :'' //公司名称
            let startDate = this.startTime2.length > 0 ? this.startTime2.replace(/-/g,"") :'' //开始时间
            let endDate = this.endTime2.length > 0  ? this.endTime2.replace(/-/g,"") :'' //结束时间
            let bondedWareHouse = this.storange.length >0 ? this.storange :'' //仓储名称
            let url = interfaceUrl.exporeFinalSecondForMgmt +'?petitionerName='+ nameChinese +'&startDate='+ startDate +'&endDate='+endDate +'&bondedWareHouse='+ bondedWareHouse 
            let queryUrl = encodeURI(url)
          if((startDate & endDate)){
            this.excelName2 = startDate +'--'+ endDate +'二线进口.xlsx'
          }else{
            this.excelName2 = '二线进口.xlsx'
          }

          filedownload(queryUrl,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', this.excelName2)
                    document.body.appendChild(link)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
         },
   
      // showone(index){
      //  this.$Modal.success({
      //      title:'一级供应链查询',
      //      content:`申请企业名称：${this.data1[index].PETITIONERNAME} 
      //       <br> 申请企业统一信用代码：${this.data1[index].PETSOCIALCREDITCODE}
      //       <br><br> 境外发货企业名称：${this.data1[index].OVERSEASSHIPPERNAME}
      //       <br> 境外发货企业VAT号：${this.data1[index].OVERSEASSHIPPERVAT}
      //       <br><br>跨境物流承运企业：${this.data1[index].CBLOGISTICSPER}
      //       <br>跨境物流承运企业社会统一信用代码：${this.data1[index].CBLOGISTICSPERSOCIALCREDIT}
      //       <br><br> 报关单位名称：${this.data1[index].CUSTOMSDECNAME}
      //       <br> 报关单位统一信用代码：${this.data1[index].CUSTOMSDECSOCIALCREDIT}
      //       <br><br> 经营单位名称：${this.data1[index].ENTRYBUSINESSNAME}
      //       <br> 经营单位统一信用代码：${this.data1[index].ENTRYBUSINESSSOCIALCREDIT}
      //       <br><br> 收货单位名称：${this.data1[index].PURCHASERNAME}
      //       <br> 收货单位统一信用代码：${this.data1[index].PURCHASERSOCIALCREDIT}
      //       `
      //  })
      // },

      //  showtwo(index){
      //  this.$Modal.success({
      //       title:'二级供应链查询',
      //       content:`申请企业：${this.data2[index].PETITIONERNAME} 
      //       <br>申请企业统一信用代码：${this.data2[index].PETSOCIALCREDITCODE}
      //       <br><br>发货人名称：${this.data2[index].SHIPPERNAME}
      //       <br>发货企业信用代码：${this.data2[index].SHIPPERCODE}
      //       <br><br>报关单位名称：${this.data2[index].CUSTOMSDECNAME}
      //       <br>报关单位统一信用代码：${this.data2[index].CUSTOMSDECSOCIALCREDIT}
      //       <br><br>经营单位名称：${this.data2[index].ENTRYBUSINESSNAME}
      //       <br>经营单位统一信用代码：${this.data2[index].ENTRYBUSINESSSOCIALCREDIT}
      //       <br><br>保税仓储企业名称：${this.data2[index].BONDEDWAREHOUSE}
      //       <br>保税仓储企业统一信用代码：${this.data2[index].BWAREHOUSESOCIALCREDITCODE}
      //       <br><br>收货单位名称：${this.data2[index].PURCHASERNAME}
      //       <br>收货单位统一信用代码：${this.data2[index].PURCHASERSOCIALCREDIT}
      //       <br><br>货运代理公司名称：${this.data2[index].FREFORWARDERNAME}
      //       <br>货运代理公司统一信用代码：${this.data2[index].FREFORWARDERSOCIALCREDIT}
      //       <br><br>境内运输公司：${this.data2[index].DOMESTICTRANSPORT}
      //       <br>境内运输公司社会统一信用代码：${this.data2[index].DOMESTICTRANSOCIALCREDIT}
      //       `
      //  })
      // },
      //一级查询结果
      queryInfoFirst(){
          let data = {
              pageSize:20,
              pageNum:1,
              startDate:this.startTime1.replace(/-/g,""),
              endDate:this.endTime1.replace(/-/g,""),
              petitionerName:this.name1
              };
            
         publicInter(interfaceUrl.queryCommonForMgmt,data).then(r=>{
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

      //二级查询结果
       queryInfoSecond(){
         let data = {
              pageSize:20,
              pageNum:1,
              startDate:this.startTime2.replace(/-/g,""),
              endDate:this.endTime2.replace(/-/g,""),
              petitionerName:this.name2,
              bondedWareHouse:this.storange
            };
            console.log(data.pageNum)
         publicInter(interfaceUrl.queryFinalSecondForMgmt,data).then(r=>{
            if(r.totalRow > 0 ){
              this.data2 = r.list
              this.total2 = r.totalRow
              this.isdisabled2 = false
              //this.storange = ''
           }else{
            this.$Message.error('未查询到数据')
            this.data2 = r.list
            this.total2 = r.totalRow
            this.isdisabled2 = true
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
            
         publicInter(interfaceUrl.queryCommonForMgmt,data).then(r=>{
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

      changePage2(page){
        let data = {
              pageSize:20,
              pageNum:page,
              startDate:this.startTime2.replace(/-/g,""),
              endDate:this.endTime2.replace(/-/g,""),
              petitionerName:this.name2,
              bondedWareHouse:this.storange
            };
            console.log(data.pageNum)
         publicInter(interfaceUrl.queryFinalSecondForMgmt,data).then(r=>{
            if(r.totalRow > 0 ){
              this.data2 = r.list
              this.total2 = r.totalRow
              this.isdisabled2 = false
              //this.storange = ''
           }else{
            this.$Message.error('未查询到数据')
            this.data2 = r.list
            this.total2 = r.totalRow
            this.isdisabled2 = true
           }
         })
      }
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
