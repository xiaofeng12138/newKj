<template>
    <div class="customs">
       <Table stripe border class="self"  :columns="organization==1?columnsTidan1:columnsTidan2" :data="Vdata"></Table>
       <p>
           <b>免税销售总额（美金）：{{$parent.quota}}</b>
           <b :class="{red:sum>$parent.quota}">货值总额（美金）：{{typeof(sum)=='number'?parseFloat(sum).toLocaleString():sum}}</b>
           <input  @click="submitData" :disabled="sum>$parent.quota" type="button" value="提交"/>
       </p>
    </div>
</template>
<script>
 import {publicInter} from '@/api/http'
 import {getCookie} from '@/until/getToken'
   export default{
       name:"Customs",
       props:['paramId'],
       data(){
           return {
                     newArr:[],
                      ajaxHistoryData:[],
                      organization:'',
                      Vdata:[],
                      columnsTidan1: [
                    {
                         title: '序号',
                         key: 'NUM',
                       //  width:120,
                         align:"center"
                       // type:'index'
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
                        title: '展中销售数量',
                        key: 'sum',
                         align:"center",
                         render:(h,param)=>{
                             this.Vdata[param.index].sum=param.row.G_QTY;
                             return h('Input',{
                                  props:{
                                      value:this.Vdata[param.index].SALES_VOLUME,
                                      size:'small'
                                  },
                                 on:{
                                      'on-keyup':(event)=>{
                                         param.row.sum=event.target.value;
                                          this.Vdata[param.index]=param.row;
                                          this.newArr=Object.assign([],this.Vdata);
                                          this.newArr[param.index].SALES_VOLUME=event.target.value;
                                      }
                                 }  
                             })
                         }
                    },
                     {
                        title: '修改原因',
                        key: 'sum',
                         align:"center",
                         render:(h,param)=>{
                             this.Vdata[param.index].sum=param.row.G_QTY;
                             return h('Input',{
                                 props:{
                                     value:this.Vdata[param.index].EDIT_REASON,
                                     size:'small'
                                 },
                                 on:{
                                      'on-keyup':(event)=>{
                                         this.newArr[param.index].EDIT_REASON=event.target.value;
                                      }
                                 }  
                             })
                         }
                    }
          ],
                      columnsTidan2: [
                    {
                         title: '序号',
                         key: 'NUM',
                       //  width:120,
                         align:"center"
                       // type:'index'
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
                        title: '展中销售数量',
                        key: 'sum',
                         align:"center",
                         render:(h,param)=>{
                             this.Vdata[param.index].sum=param.row.G_QTY;
                             return h('Input',{
                                  props:{
                                      value:this.Vdata[param.index].SALES_VOLUME,
                                      size:'small'
                                  },
                                 on:{
                                      'on-keyup':(event)=>{
                                         param.row.sum=event.target.value;
                                          this.Vdata[param.index]=param.row;
                                          this.newArr=Object.assign([],this.Vdata);
                                          this.newArr[param.index].SALES_VOLUME=event.target.value;
                                      }
                                 }  
                             })
                         }
                    }
          ]
          
           }
       },
       computed:{
           sum(){
               console.log(this.newArr.length)
               if(this.newArr.length){
                   var sum=0;
                   for(var i=0;i<this.newArr.length;i++){
                        this.newArr[i].SALES_VOLUME=this.newArr[i].SALES_VOLUME?this.newArr[i].SALES_VOLUME:0;
                       sum+=this.newArr[i].DECL_PRICE*this.newArr[i].SALES_VOLUME
                   };
                   return sum
               }else{
                   return '无数据'
               }
           }
       },
       methods:{
           submitData(){
              console.log()
               if(getCookie('roler').split(',')[0]=='TU'){
                    var url="/tu/importExpoQuota/editExhibitorSaleVolume";
               }else{
                    var  url="/tc/importExpoQuota/editExhibitorSaleVolume";
               }
               
               let data={list:this.Vdata,EXHIBITOR_TOTAL_QUOTA:this.$parent.quota,
                       EXHIBITOR_TOTAL_SALES:this.sum,
                       EXHIBITORID:this.$parent.EXHIBITORID
               }
               publicInter(url,data).then(res=>{
                   if(res.code==200){
                      this.$Modal.success({
                            // title: 'title',
                            content: '提交成功'
                         });// this.$Modal.error({content:r.error})
                          this.$emit('parentMethod',"111")
                   }else if(res.code==500){
                       this.$Modal.warning({
                            // title: 'title',
                            content: res.msg.message
                         });
                   }
                  
               })
           },
           propsData(){
               console.log(1)
                if(getCookie('roler').split(',')[0]=='TU'){
                    var url="/tu/importExpoQuota/qryExpoExhibitorSaleList";
               }else{
                    var  url="/tc/importExpoQuota/qryExpoExhibitorSaleList";
               }
                publicInter(url,{EXHIBITORID:this.paramId}).then(res=>{
                          for(var i=0;i<res.list.length;i++){
                              res.list[i].sum=res.list[i].G_QTY
                          }
                        this.ajaxHistoryData=res.list;
                        this.newArr=Object.assign([],res.list);
                        console.log(this.newArr)
                    this.dataCount=res.list.length;
                    if(this.ajaxHistoryData.length<this.pageSize){
                        this.Vdata=this.ajaxHistoryData
                    }else{
                        this.Vdata=this.ajaxHistoryData.slice(0,this.pageSize)
                    }
           })
           }
       },
       created(){
            this.organization=getCookie('roler').split(",")[0]=="TU"?1:0;
           this.propsData();
       },
        watch:{
            '$route':function(to,from){
               this.propsData()
            }
        }
   } 
</script>
<style scoped>
    .customs{
        margin-top: 70px
    }
    .customs p{
        text-align: center;
        margin-top: 20px;
        
    }
     .customs p b{
         margin-right: 30px
     }
      .customs p input{
         float: right;
         width: 100px;
         height: 30px;
     }
      .red{
        color: red;
    }
</style>
