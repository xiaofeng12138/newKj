<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>税款担保</h2></Col>
        </Row>

          <!-- <div class="query" >
            <div class="copName"> 标题：<Input size="large" placeholder="请输入标题" style="width:80%" v-model="title"/></div>
            
            <Button type='primary'  @click="queryInfo(1)" style="margin-right:30px;width:100px">查  询</Button>
           </div> -->
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tortList' class="self">
             
            </Table>
            
        </div>
        
    </div>
</template>

<script>
import {fileUp} from '@/api/http'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

export default {
    data() {
        return {
            tortList:[],
            columns:[
              {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + 1))
                    }
               },
              {
              title:'担保号',
              key:'guaranteeId',
              align:'center'
             },
              {
              title:'担保企业',
              key:'guaranteeEpName',
              align:'center',
              },
              {
              title:'担保总额度',
              key:'guaranteeAmount',
              align:'center',
              },
            //   {
            //   title:'担保企业海关注册代码',
            //   key:'guaranteeEpCustomsId',
            //   width:200,
            //   align:'center',
            //   },
              {
              title:'担保时间始',
              key:'guaranteeStartDate',
              align:'center',
              },
              {
              title:'担保时间止',
              key:'guaranteeEndDate',
              align:'center',
              },
              
              {
              title:'已用额度',
              key:'usedTotal',
              align:'center',
              },
              {
              title:'剩余额度',
              key:'currentTotal',
              align:'center',
              },
            //   {
            //   title:'剩余百分比',
            //   slot:'action',
            //   align:'center',
            //   },
            
            ],
            numPage:1
        }
    },
    methods:{
        //默认加载信息查询
        queryInfo(){
            publicInter(interfaceUrl.queryDccDetail,{}).then(res=>{
                console.log(res)
                let arr = []
                arr.push(res)
                this.tortList = arr
            })
        },
    },
    mounted(){
        this.queryInfo()
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    
    h2{
        padding-bottom: 20px;
    }
    .ivu-page{
               text-align: center;
               margin-top: 10px;
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
.upload{
         >h3{
            padding: 10px 0;
            .ivu-upload,button{
                float: right;
                margin-left: 32px;
                
            }
        }
        &:last-child{
            margin-bottom: 10px;
        }
        h3{
          margin:0;
          font-size: 18px;
        }
        .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
    }
    
</style>