<template>
<div>
     <div class="query">
            <div class="endTime">申报日期：<DatePicker size="large"  transfer type="date" @on-change="queryparams.startTime = $event"  placeholder="请选择申报日期" ></DatePicker></div>
            <div class="endTime">报关单号：<Input size="large" placeholder="请输入报关单号" style="width:60%" v-model="queryparams.entry_id"/></div>
            <div class="endTime"> 贸易方式：<Select style="width:60%" v-model="queryparams.monitormethod"><Option value="">全部</Option><Option value="0">非ATA暂进</Option> <Option value="1"> ATA单证</Option></Select></div>
            <Button type='primary' style="width:100px;margin-right:20px" size='large' @click="queryInfoList(1)">查 询</Button>
               <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button>
           </div>
         <Table border :columns = 'columns1' :data='data1' class="self">
         </Table>
          <Page :total="total1" :page-size=20  @on-change="changePage1" show-total/>

        
      </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
export default {
  data(){
      return{
          isdisabled1:true,
          numPage:1,
          columns1:[
             {
                title:'序号',
                width:80,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
              {
              title:'馆号',
              key:'HALLNO',
              align:'center'
             },
             {
              title:'贸易方式',
              key:'MONITORMETHOD',
              align:'center'
             },
              {
              title:'报关单号',
              key:'ENTRY_ID',
              align:'center'
             },
              {
              title:'货物中文名称',
              key:'GOODSDESCRIPTIONCN',
             
              align:'center',
             },
             {
              title:'货物英文名称',
              key:'GOODSDESCRIPTION',
              align:'center',
             },
             {
              title:'货物数量',
              key:'CON',
              align:'center',
             },
             {
              title:'申报批次',
              key:'TOTALBATCH',
              align:'center',
             },
             {
              title:'申报金额',
              key:'TOTALPRICE',
              align:'center',
             },
          ],
          data1:[],
          total1:0,
          queryparams:{
              startTime:"",
              entry_id:"",
              monitormethod:'',
              pageNum:1,
              pageSize:20,
          },
         
      }
  },
  mounted(){
      this.queryInfoList(1);
  },
  methods:{
    
    queryInfoList(page){
        let requsetData ={}
        for(let key in this.queryparams){
            if(this.queryparams[key]){
              requsetData[key] = this.queryparams[key]
            }
          }
        requsetData.pageNum = page
        publicInter(interfaceUrl.groupBasicInfo,requsetData).then(res=>{
               this.data1 = res.list
               this.total1 = res.totalRow
               if(res.totalRow == 0){
                 this.isdisabled1 = true
               }else{
                 this.isdisabled1 = false  
               }
            })
    },
    exporeTrade(){

            let requsetData = this.queryparams
            let url = interfaceUrl.exportGroupBasicInfoExcel

            let queryUrl = encodeURI(url)
            let newName = (new Date()).getTime()
            let excelName1 = newName +'.xls'
            filedownload(queryUrl,requsetData).then(r=>{
                        let url = window.URL.createObjectURL(new Blob([r]))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download',excelName1)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    })
    },
    changePage1(page){
        this.numPage = page
        this.queryInfoList(page)
    },
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>

     .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .endTime{
        width: 20%
      }
    }
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
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
    
    .ivu-page{
      margin-top: 10px;
      text-align: center;
      margin-bottom: 20px;
    }
 
</style>
