<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>用户操作日志</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 用户工号:<Input size="large" placeholder="请输入用户工号" style="width:60%" v-model="queryData.userid"/></div>
            <div class="copName"> 用户名称：<Input size="large" placeholder="请输入用户名称" style="width:60%" v-model="queryData.userName"/></div>
            <div class="copName"> MAC地址<Input size="large" placeholder="请输入MAC地址" style="width:60%" v-model="queryData.userMac"/></div>
            <div class="copName"> 办公点名称：<Input size="large" placeholder="请输入办公点名称" style="width:60%" v-model="queryData.officeName"/></div>
            <div class="copName"> 办公点地址<Input size="large" placeholder="请输入办公点地址" style="width:60%" v-model="queryData.officeAddr"/></div>
            <div class="copName"> 功能名称<Input size="large" placeholder="请输入操作名称" style="width:60%" v-model="queryData.functionName"/></div>
            <Button type='primary'  @click="querydatalist(1)" style="margin-right:30px;width:100px">查  询</Button>
            
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='dataList' class="self"> </Table>
         <Page :total="total"  :page-size='10' @on-change='pageChange' show-total />
        </div>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import Tablepdf from './components/filelist'



export default {
    data() {
        return {
            //分页数据
            total:0,
            numPage:1,
            queryData:{
                userid:'', 
                userName:'', 
                userMac:'',
                officeName:'',
                officeAddr:'',
                functionName:'',
                pageNum:1,
                pageSize:10
            },
            dataList:[],
            columns:[
              {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 10 )+1)
                    }
               },
              {
                title:'用户工号',
                key:'userid',
                align:'center'
              },
              {
                title:'用户名称',
                key:'userName',
                align:'center'
              },
               {
                title:'MAC地址',
                key:'userMac',
                align:'center'
              },
               {
                title:'网络IP',
                key:'userIp',
                align:'center',
               
              },
               {
                title:'办公点名称',
                key:'officeName',
                align:'center'
              },
              {
                title:'办公点地址',
                key:'officeAddr',
                align:'center'
              },
              {
                title:'摄像头编号',
                key:'cameraid',
                align:'center'
              },
              {
                title:'操作时间',
                key:'recUpdDt',
                align:'center',
                width:250
              },
               {
                title:'功能名称',
                key:'functionName',
                align:'center'
              },
              //  {
              //   title:'录屏文件',
              //   key:'fileid',
              //   align:'center',
              //   align:'center',
              //   render: (h, params) => {
              //           const that = this
              //           return h('div', [
              //                    h(Tablepdf,{
              //                       props:{
              //                           type:'primary',
              //                           size:'large',
              //                           paramsInfo:params.row
              //                           },
              //                           on:{
              //                               click(){
              //                                   console.log(333)
              //                               },
                                           

              //                           }
              //                       }),
              //                   ])
              //               }
               
              // },
            ],
            
            
        }
    },
    methods:{
        //分页函数
        pageChange(page){
            this.numPage = page
            this.querydatalist(page)
        },
       
        querydatalist(page){
            this.queryData.pageNum = page
            let requestData = this.queryData
          publicInter(interfaceUrl.queryAllOperationFunction,requestData).then(res=>{
              this.dataList = res.list
              this.total = (res.total)*1
          })
        },
    },
    mounted(){
       this.querydatalist(1)
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    h2{
        padding-bottom: 20px;
    }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 20%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
    }
    
}  
.ivu-page{
    text-align: center;
    margin-top: 20px;
}
.addModal{
      width: 90%;
      height: 300px;
      margin: auto;
      h3{
          text-align: center;
          margin-bottom: 10px;
      }
    }

</style>