<template>
       <div class="newtable">
               <div class="form01">
                  <label v-if="organization==1"  class="label">经销商名称：</label> <Input v-if="organization==1" v-model="agency_name" class="input" type="text" />
                  <label class="label">参展商名称：</label> <Input v-model="exhibitor" class="input" type="text" />
                  <Button @click="postdata" class="sumbit"  type="primary">查询</Button>
               </div>
                <Table stripe border class="self" :columns="columnsTidan" :data="Vdata"></Table>
                <Page style="float:right" :pageSize="10" :total="dataCount" prev-text="上一页" next-text="下一页" @on-change="onChange"   show-total />
                 <div>
                     <router-view  @parentMethod="parentMethod" :paramId="paramId"></router-view>
                 </div>
       </div>    
</template>
<script> 
     import {publicInter} from '@/api/http'
      import {getUserRole} from '@/until/getToken'
    export default{
        name:'newtable01',
            
        data(){
            return {
                organization:'',
                paramId:'22222',
                test:{},
                quota:'',
                EXHIBITORID:'',
                ajaxHistoryData:[],
                pageSize:10,
                dataCount:0,
                Vdata:[],
                agency_name:'',
                exhibitor:'',
                  columnsTidan: [
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
                         align:"center",
                       
                    },
                    {
                        title: '参展商名称',
                        key: 'EXHIBITOR',
                         align:"center",
                           render:(h,param)=>{
                           return  h('a',{
                               on:{
                                   click:()=>{
                                       this.quota=param.row.EXHIBITOR_TOTAL_QUOTA;
                                       this.EXHIBITORID=param.row.EXHIBITORID;
                                       this.paramId=param.row.EXHIBITORID;
                                      this.$router.push({name:'Customs',path:'/dashboard/newtable01/customs/:id',params:{
                                             id:param.row.EXHIBITORID
                                      }})
                                   }
                               }
                             },param.row.EXHIBITOR)
                         }
                    },
                    {
                        title: '提交状态',
                        key: 'COMMIT_STATUS',
                         align:"center",
                          render:(h,param)=>{
                             console.log(param.row.REST_DATE,111)
                             if(param.row.COMMIT_STATUS==1){
                                return h('div',{},'已提交')
                             }else{
                                  return h('div',{},'未提交')
                             }
                             
                         }
                    }
          ],
            }
        },
        
        created(){
            this.organization=getUserRole()[0].split("_")[1]=="TU"?1:0;
           this.postdata();
        },
        methods:{
            parentMethod(a){
                 this.postdata()
            },
             onChange(current){
                    let start=(current-1)*this.pageSize;
                    let end=current*this.pageSize;
                    this.Vdata=this.ajaxHistoryData.slice(start,end)
            },
            postdata(){
                 // this.organization=getUserRole()[0].split("_")[1]=="TU"?1:0;
                 if(this.organization==1){
                         var  url="/tu/importExpoQuota/qryExhibitorQuotaList";
                   }else{
                         var url="/tc/importExpoQuota/qryExhibitorQuotaList"
                   }
                publicInter(url,{ AGENCY_NAME:this.agency_name, EXHIBITOR:this.exhibitor}).then(res=>{
                        this.ajaxHistoryData=res.list;
                    this.dataCount=res.list.length;
                    if(this.ajaxHistoryData.length<this.pageSize){
                        this.Vdata=this.ajaxHistoryData
                    }else{
                        this.Vdata=this.ajaxHistoryData.slice(0,this.pageSize)
                    }
           })
            }
        }
    
       
    }
</script>
<style scoped>
.newtable .form01{
    margin-bottom: 20px;
}
   .newtable{
        width: 90%;
    margin: 0 auto;
   margin-top: 20px
   }
   .sumbit{
       float: right;
       margin-right: 20px;
       width:100px;
       height: 30px
   }
   .input{
       height: 30px;
           width: 160px;
   }
   .label{
       margin-left: 50px
   }
</style>
