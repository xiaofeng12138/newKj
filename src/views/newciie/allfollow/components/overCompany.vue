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
              title:'报关单号',
              key:'ENTRY_ID',
               width:200,
              align:'center'
             },
              {
              title:'商品项号',
              key:'G_NO',
              width:100,
              align:'center',
             },
             {
              title:'品名',
              key:'G_NAME',
              align:'center',
               width:200,
             },
             {
              title:'规格',
              key:'G_MODEL',
              align:'center',
               width:200,
             },
             {
              title:'数量',
              key:'DECL_QTY',
              align:'center',
               width:100,
             },
             {
              title:'单价',
              key:'DECL_PRICE',
              align:'center',
               width:100,
             },
              {
              title:'总价',
              key:'DECL_TOTAL',
              width:100,
              align:'center',
             },
             {
              title:'申报日期',
              key:'D_DATE_FORMAT',
              align:'center',
               width:100,
             },
             {
              title:'代理企业名称',
              key:'AGENT_NAME',
              align:'center',
               width:200,
             },
             {
              title:'复运出境数量',
              key:'PBQINGKUANG',
              align:'center',
               width:200,
             },
             {
              title:'留购数量',
              key:'PAQINGKUANG',
              align:'center',
               width:100,
             },
             {
              title:'消耗数量',
              key:'PCQINGKUANG',
              align:'center',
               width:100,
             },
              {
              title:'放弃/销毁数量',
              key:'PHQINGKUANG',
              width:200,
              align:'center',
             },
             {
              title:'转账监管区或保税场所',
              key:'PFQINGKUANG',
              align:'center',
               width:200,
             },
             {
              title:'灭失',
              key:'PIQINGKUANG',
              align:'center',
               width:100,
             },
             {
              title:'外借',
              key:'PKQINGKUANG',
              align:'center',
               width:100,
             },
             {
              title:'其他',
              key:'PJQINGKUANG',
              align:'center', 
              width:100,
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
        requsetData.condition = '5'
        console.log('requsetData',requsetData)
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
