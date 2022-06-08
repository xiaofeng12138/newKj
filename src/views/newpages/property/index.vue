<template>
    <div class="property">
        <h2>企业信息管理</h2>

        <div style='margin-top:10px'>
            <Table border :columns = 'columns' :data='data1' class="self">
            <template  slot-scope="{row,index}" slot="action"> 
                <Button type="primary" size ='large'  @click="change(index)">修改</Button>
            </template>
        </Table>
        </div>
    </div>
</template>
<script>

import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

export default {
    data() {
        return {
            columns:[
              {
              title:'公司名称',
              key:'companyname',
              width:'200',
              align:'center'
             },
              {
              title:'公司地址',
              key:'contactAddr',
              width:200,
              align:'center'
             },
              {
              title:'联系人',
              key:'contacts',
              width:200,
              align:'center'
             },
              {
              title:'联系人电话',
              key:'contactPhone',
              width:200,
              align:'center',
             },
             {
              title:'联系人邮箱',
              key:'contactEmail',
              width:200,
              align:'center',
             },
              {
              title:'备用联系人',
              key:'spareContacts',
              width:200,
              align:'center',
             },
             {
              title:'备用联系人电话',
              key:'spareContactPhone',
              width:200,
              align:'center',
             },
             {
              title:'备用联系人邮箱',
              key:'spareContactEmail',
              width:200,
              align:'center',
             },
             {
              title:'备用联系人地址',
              key:'spareContactAddr',
              width:210,
              align:'center',
             },
             {
              title:'备注',
              key:'remarks',
              width:200,
              align:'center',
             },
              
              {
              title:'操作',
              slot:'action',
              width:200,
              align:'center',
              fixed:'right'
            }
          ],
          data1:[],
        }
    },
    methods:{
        change(){

        },
        queryUserInfo(){
            publicInter(interfaceUrl.queryEnterUser,{}).then(res=>{
                this.data1 =  new Array(res.data)
            })
        }
    },

    mounted(){
        this.queryUserInfo()
    }
}
</script>

<style lang="scss" scoped>
.property{
   h2{
    padding-bottom: 20px;
    border-bottom: 2px solid #dddee1;
 }
}

    
</style>