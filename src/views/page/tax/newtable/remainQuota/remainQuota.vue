<template>
        <div class="remainQuota">
            <Table stripe border class="self"  :columns="columnsTidan" :data="dataTidan"></Table>
           <Page style="float:right" :pageSize="10" :total="dataCount" prev-text="上一页" next-text="下一页" @on-change="onChange"   show-total />
        </div>
</template>
<script>
     import {publicInter} from '@/api/http'
    export default{
        name:'RemainQuota',
        created(){
            let url="/tu/importExpoQuota/qryQuotaList";

           publicInter(url,{}).then(res=>{
               this.ajaxHistoryData=res.list;
               this.dataCount=res.list.length;
               if(this.ajaxHistoryData.length<this.pageSize){
                   this.dataTidan=this.ajaxHistoryData
               }else{
                   this.dataTidan=this.ajaxHistoryData.slice(0,this.pageSize)
               }
           })
        },
        methods:{
            onChange(current){
             console.log(current);
             let start=(current-1)*this.pageSize;
             let end=current*this.pageSize;
              this.dataTidan=this.ajaxHistoryData.slice(start,end)
            }
        },
        data(){
            return {
                test:{},
                ajaxHistoryData:[],
                pageSize:10,
                dataCount:0,
                columnsTidan: [
                    {
                         title: '序号',
                         key: 'NUM',
                         width:120,
                         align:"center"
                       // type:'index'
                    },
                    {
                        title: '报关单号',
                        key: 'ENTRY_ID',
                         align:"center"
                    },
                    {
                        title: '物资证明函号',
                        key: 'CERTIFICATENO',
                         align:"center"
                    },
                    {
                        title: '担保额度',
                        key: 'RSV1_CUT_SUM',
                         align:"center"
                    },
                    {
                        title: '保函期限（天）',
                        key: 'REST_DATE',
                         align:"center",
                         render:(h,param)=>{
                             console.log(param.row.REST_DATE,111)
                             if(param.row.REST_DATE>0){
                                return h('div',{},param.row.REST_DATE)
                             }else{
                                  return h('div',{style:{color:'red'}},'超期')
                             }
                             
                         }
                    }
          ],
          dataTidan:[
        //          BILL_NO:1,
        //          VSL_REF:387438743,
        //          DECLARED_VOY_REF:"dsdsds",
        //          BERTH_ARR_DT_GMT:'11-102',
        //          statusFront:'2222'
        //   },
        //        {
        //          BILL_NO:1,
        //          VSL_REF:3874380000743,
        //          DECLARED_VOY_REF:"dsdddsds",
        //          BERTH_ARR_DT_GMT:'11-1',
        //          statusFront:'11111'
        //   }
          ]
            }
        }
    }
</script>
<style scoped>
.remainQuota{
    width: 90%;
    margin: 0 auto;
   margin-top: 70px
}
</style>
