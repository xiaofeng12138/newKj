<template>
<div>
     <div class="query">
           
             <div class="endTime">进博会年份：
                <Select v-model="queryparams.expoYearStatistics" style="width:180px" >
                        <Option v-for="(item,index) in yearList" :value="item" :key="index">{{ item }}</Option>
                </Select>
            </div>
               <Button type='primary' style="width:100px;margin-right:20px" size='large' @click="queryInfoList(1)">查 询</Button>
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
              title:'后续处置方式',
              key:'MODE1',
              align:'center',
             },
              {
              title:'批次',
              key:'CHUZHICOUNT',
              align:'center',
             },
             {
              title:'金额',
              key:'PRICE',
              align:'center',
             },
          ],
          data1:[],
          total1:0,
          yearList:['2018','2019','2020'],
          queryparams:{
              pageNum:1,
              pageSize:20,
              expoYearStatistics:'2019'
          },
         
      }
  },
  mounted(){
      this.queryInfoList(1)
  },
  methods:{
    queryInfoList(page){
        let requsetData ={}
        for(let key in this.queryparams){
            if(this.queryparams[key]){
              requsetData[key] = this.queryparams[key]
            }
          }
          if( !requsetData['expoYearStatistics']){
              this.$Message.error('搜索条件不能为空')
              return false
          }
        requsetData.pageNum = page
        requsetData.condition = '3'
        publicInter(interfaceUrl.qryAfterExhibitsStatistics,requsetData).then(res=>{
           
               this.data1 = res.rows
               this.total1 = res.total
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
