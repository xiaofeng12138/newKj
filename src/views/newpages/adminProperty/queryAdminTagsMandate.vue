<template>
    <div class="taglist">
         <h2>授权企业权利人名称查询</h2>
          <div class="query" >
            <div class="copName"> 企业名称：<Input size="large" placeholder="请输入企业名称" style="width:70%" v-model="companyname"/></div>
            <div class="copName"> 联系人：<Input size="large" placeholder="请输入联系人" style="width:70%" v-model="contacts"/></div>
           
            <Button type='primary'  @click="queryTagList(1)" style="margin-right:30px;width:100px">查  询</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='mandatelist' class="self">
                 <template  slot-scope="{row}" slot="action"> 
                    <Button type="primary" size ='large' @click="goTagsDetails(row)"  >查看授权详情</Button>
                </template>
           </Table>
          <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        </div>
        
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {setCookie,getCookie,} from "@/until/getToken";

export default {
    data() {
        return {
            companyname:'',//公司名称
            contacts:'', //联系人
            refuseModal:false,
            formRules:{
                tagsName:[{required:true, trigger:'blur' , message:'拒绝不能为空', }],
            },
            mandatelist:[],
            columns:[
             {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index)+1)
                    }
               },
            {
              title:'企业名称',
              key:'companyname',
              align:'center'
             },
              {
              title:'联系人',
              key:'contacts',
              align:'center'
             },
             {
              title:'注册时间',
              key:'recUpdDt',
              align:'center'
             },
             {
              title:'操作',
              key:'action',
              slot:'action',
              align:'center'
             },
              
            ],
            total1:0,
        }
    },
    methods:{
        changePage1(page){
           this.queryTagList(page)
        },
        queryTagList(page){
            let data ={
                pageNum:page,
                pageSize:20,
                companyname:this.companyname,
                contacts:this.contacts
            }
            publicInter(interfaceUrl.pageQuery,data).then(res=>{
                console.log(res)
                this.mandatelist = res.list
                this.total1 = (res.total)*1
            })
        },
        goTagsDetails(row){
            let id = row.companyname
            setCookie('queryComName',id)
            this.$router.push({
                name:'adminTagsDetails',
                params:{
                    id
                }
            })
        }
    },
    mounted(){
        this.queryTagList(1)
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    h2{
        padding-bottom: 20px;
        border-bottom: 2px solid #dddee1;
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
    .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
}
    
</style>