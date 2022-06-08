<template>
    <div class="AmericaAfrica">
                <div class="form01">
                  <label v-if="organization==1"  class="label">经销商名称：</label> <Input v-if="organization==1"  v-model="agency_name" class="input" type="text" />
                  <label class="label">参展商名称：</label> <Input v-model="exhibitor"  class="input" type="text" />
                 
                  <Button @click="export1" class="sumbit"  type="primary">导出</Button>
                     <Button @click="postdata" class="sumbit" type="primary">查询</Button>
                 
               </div>
               <Table stripe border class="self" :columns="organization==1?columnsTidan0:columnsTidan1" :data="Vdata"></Table>
               <Page style="float:right" :pageSize="pageSize" :total="dataCount" prev-text="上一dsds页" next-text="下一页" @on-change="onChange"   show-total />
    </div>
</template>
<script>
///tu/importExpoQuota/exportExhibitorSaleExcel 导出接口
 import {publicInter,filedownload} from '@/api/http'
  import {getUserRole} from '@/until/getToken'
    export default{
        mounted(){
            this.postdata();
        },
        created(){
            console.log(getUserRole()[0])
            this.organization=getUserRole()[0].split("_")[1]=="TU"?1:0;
        },
        data(){
              return {
                        Vdata:[],
                         organization:'',
                         IS_COUNTRY_USA:1,
                         agency_name:'',
                         exhibitor:'',
                        pageSize:10,
                        dataCount:0,
                        columnsTidan0: [
                            {
                                title: '序号',
                                key: 'NUM',
                            //  width:120,
                                align:"center"
                            // type:'index'
                            },
                            {
                                title: '经销商名称',
                                key: 'AGENCY_NAME',
                                align:"center"
                            },
                            {
                                title: '参展商名称',
                                key: 'EXHIBITOR',
                                align:"center"
                            },
                             {
                                title: 'HsCode',
                                key: 'CODE_TS',
                                align:"center"
                            },
                             {
                                title: '品名',
                                key: 'G_NAME',
                                align:"center"
                            },
                             {
                                title: '规格',
                                key: 'G_MODEL',
                                align:"center"
                            },
                             {
                                title: '申报数量',
                                key: 'G_QTY',
                                align:"center"
                            },
                             {
                                title: '单位',
                                key: 'G_UNIT_CNAME',
                                align:"center"
                            },
                             {
                                title: '单价',
                                key: 'DECL_PRICE',
                                align:"center"
                            },
                             {
                                title: '总价',
                                key: 'DECL_TOTAL',
                                align:"center"
                            },
                             {
                                title: '原产地',
                                key: 'ORIGIN_COUNTRY_CNAME',
                                align:"center"
                            },
                             {
                                title: '展中销售数量',
                                key: 'SALES_VOLUME',
                                align:"center"
                            },
                             {
                                title: '实证税款',
                                key: 'REAL_RSV1',
                                align:"center"
                            },
                             {
                                title: '减免税款',
                                key: 'RSV1_CUT',
                                align:"center"
                            },
                          
                ],
                       columnsTidan1: [
                            {
                                title: '序号',
                                key: 'NUM',
                             width:80,
                                align:"center"
                            // type:'index'
                            },
                            {
                                title: '经销商名称',
                                key: 'AGENCY_NAME',
                                align:"center"
                            },
                            {
                                title: '参展商名称',
                                key: 'EXHIBITOR',
                                align:"center"
                            },
                             {
                                title: 'HsCode',
                                key: 'CODE_TS',
                                align:"center"
                            },
                             {
                                title: '品名',
                                key: 'G_NAME',
                                align:"center"
                            },
                             {
                                title: '规格',
                                key: 'G_MODEL',
                                align:"center"
                            },
                             {
                                title: '申报数量',
                                key: 'G_QTY',
                                align:"center"
                            },
                             {
                                title: '单位',
                                key: 'G_UNIT_CNAME',
                                align:"center"
                            },
                             {
                                title: '单价',
                                key: 'DECL_PRICE',
                                align:"center"
                            },
                             {
                                title: '总价',
                                key: 'DECL_TOTAL',
                                align:"center"
                            },
                             {
                                title: '原产地',
                                key: 'ORIGIN_COUNTRY_CNAME',
                                align:"center"
                            },
                             {
                                title: '展中销售数量',
                                key: 'SALES_VOLUME',
                                width:110,
                                align:"center"
                            }
                          
                ]
            }
        },
        methods:{
               postdata(){
                   if(this.organization==1){
                         var  url="/tu/importExpoQuota/qryExpoExhibitorSaleList";
                   }else{
                       var url="/tc/importExpoQuota/qryExpoExhibitorSaleList"
                   }
                
                  publicInter(url,{AGENCY_NAME:this.agency_name, EXHIBITOR:this.exhibitor,IS_COUNTRY_USA:this.IS_COUNTRY_USA}).then(res=>{
                   //this.Vdata=res.list;
                     
                        this.ajaxHistoryData=res.list;
                     this.dataCount=res.list.length;
                     if(this.ajaxHistoryData.length<this.pageSize){
                         this.Vdata=this.ajaxHistoryData
                     }else{
                         this.Vdata=this.ajaxHistoryData.slice(0,this.pageSize)
                     }
           })
            },
            onChange(current){
                console.log(current);
                let start=(current-1)*this.pageSize;
                let end=current*this.pageSize;
                this.Vdata=this.ajaxHistoryData.slice(start,end)
            },
           export1(){
                 if(this.organization==1){
                         var  url="/tu/importExpoQuota/exportExhibitorSaleExcel";
                   }else{
                         var url="/tc/importExpoQuota/exportExhibitorSaleExcel"
                   }
              filedownload(url,{responseType:'blob', AGENCY_NAME:this.agency_name, EXHIBITOR:this.exhibitor,IS_COUNTRY_USA:this.IS_COUNTRY_USA}).then(res=>{
                  // const elink=document.createElement('a');
                   const content=res;
                   const blob=new Blob([content],{type:'application/ms-excel'});
                   const filename="下载.xls"
                   if('download' in document.createElement('a')){
                       const elink=document.createElement('a');
                       elink.download=filename;
                       elink.style.display='none',
                       elink.href=URL.createObjectURL(blob);
                       document.body.appendChild(elink);
                       elink.click();
                       URL.revokeObjectURL(elink.href);
                       document.body.removeChild(elink);
                   }
           })
           }
        },
         watch:{
            '$route':function(to,from){
              if(this.$route.name=="Americas"){
                 
                 this.IS_COUNTRY_USA=1
              }else{
                 this.IS_COUNTRY_USA=0
             };
              this.postdata()
            }
        }
    }
</script>
<style scoped>
   .AmericaAfrica{
        margin: 0 auto;
        margin-top: 20px
   }
   .AmericaAfrica .form01{
    margin-bottom: 20px;
}
     .sumbit{
       float: right;
        margin-right: 20px;
       width:100px;
       height: 30px */
   }
   .input{
       height: 30px;
           width: 160px;
   }
   .label{
       margin-left: 50px
   }
</style>
