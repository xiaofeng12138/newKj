<template>
    <div class="taglist">
         <h2>知识产权企业注册查询</h2>
          <div class="query" >
            <div class="copName"> 公司名称：<Input size="large" placeholder="请输入公司名称" style="width:70%" v-model="companyname"/></div>
            <div class="copName"> 联系人：<Input size="large" placeholder="请输入联系人" style="width:70%" v-model="contacts"/></div>
           
            <Button type='primary'  @click="queryTagList(1)" style="margin-right:30px;width:100px">查  询</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='mandatelist' class="self">
        </Table>
          <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        </div>
        
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

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
              title:'公司名称',
              key:'companyname',
              align:'center'
             },
              {
              title:'公司地址',
              key:'contactAddr',
              align:'center'
             },
              {
              title:'联系人',
              key:'contacts',
              align:'center'
             },
             {
              title:'联系人电话',
              key:'contactPhone',
              align:'center'
             },
             {
              title:'联系人邮箱',
              key:'contactEmail',
              align:'center'
             },
             {
              title:'备用联系人',
              key:'spareContacts',
              align:'center'
             },
             {
              title:'备用联系人地址',
              key:'spareContactAddr',
              align:'center'
             },
             {
              title:'备用联系人电话',
              key:'spareContactPhone',
              align:'center'
             },
             {
              title:'备用联系人邮箱',
              key:'spareContactEmail',
              align:'center'
             },
             {
              title:'备注',
              key:'remarks',
              align:'center'
             },
             {
              title:'注册时间',
              key:'recUpdDt',
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