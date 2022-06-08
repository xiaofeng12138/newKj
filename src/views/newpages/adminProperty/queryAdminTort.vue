<template>
    <div class="taglist">
         <div class="header" ref='header' v-if=" unReadNum > 0">
            <img src="./img/qy_common_common_icon_msg.png" alt="" class="msgimg">
            <span style="display:flex">您有<h2 style="margin:0 10px">{{unReadNum}}</h2>条未处理的侵权信息，请尽快处理。
                 <!-- <Button type="primary" size ='default' style="margin-right:5px" @click="lookOver">立即查看</Button> -->
            </span>
            <img src="./img/hg_common_common_btn_close.png" alt="" class="closeimg" @click="close">
        </div>
         <h2>侵权风险信息查询</h2>
          <div class="query" >
            <div class="copName"> 企业名称：<Input size="large" placeholder="请输入企业名称" style="width:80%" v-model="companyname"/></div>
            <div class="copName" style="margin-left:20px"> 标题：<Input size="large" placeholder="请输入标题" style="width:80%;" v-model="title"/></div>
            <div class="uscCode"> 处理状态：<Select style="width:40%" v-model="readstatus"><Option value="">全部状态</Option><Option value="1">已处理</Option> <Option value="0"> 未处理</Option></Select></div>
            <Button type='primary'  @click="queryInfo(1)" style="margin-left:30px;width:100px">查  询</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tortList' class="self" @on-selection-change= 'selectAll'>
                <template  slot-scope ="{row,index}" slot="action"> 
                    <!-- <Button type="primary" size ='large' style="margin-right:10px" @click="downloadFile(row)">下 载</Button> -->
                    <Button type="primary" size ='large' @click = "changeReadStatus(row)" v-if="row.readstatus != 1">处 理</Button>
                    <Button type="primary" size ='large'  v-else disabled>处 理</Button>
                </template>
            </Table>
             <div  class ='bottombtn'>
                <Button type='primary'   style="margin-top:10px;width:100px" @click="changeStatusAll" v-if='changDataArr.length > 0'>批量处理</Button>
                <Button type='primary'   style="margin-top:10px;width:100px"  disabled v-else>批量处理</Button>
                <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
            </div>
        </div>

    </div>
</template>

<script>
import {fileUp} from '@/api/http'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import cfg from '@/until/config'

export default {
    data() {
        return {
            tortList:[],
            changDataArr:[],
            columns:[
               {
                    type:'selection',
                    width:50,
                    align:'center'
               },
              {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
                {
                title:'标题',
                key:'title',
                align:'center'
                },
                {
                title:'企业名称',
                key:'companyname',
                align:'center'
                },
                {
                title:'内容',
                key:'content',
                align:'center',
                },
                {
                title:'文件名称',
                key:'filename',
                align:'center',
                },
                {
                title:'上传日期',
                key:'recUpdDt',
                align:'center',
                },
                {
                title:'操作',
                slot:'action',
                align:'center',
                   
                }
            ],
            title:'',
            companyname:'',
            total1:0,
            numPage:1,
            readstatus:'',
            unReadNum:0,
        }
    },
    methods:{
        //侵权数量查询
        queryTortNum(){
            let data ={
                readstatus:'0'
            }
            publicInter(interfaceUrl.queryTortReadStatusNum,data).then(res=>{
                this.unReadNum = res.num
            })
        },
        //批量选中标签
         selectAll(selection){
             let newArr = []
            if(selection.length > 0){
                selection.forEach((item)=>{
                   newArr.push(item.uuid)
                }) 
            }
            this.changDataArr = newArr
        },
        //批量修改状态
        changeStatusAll(){
            let data = {
                list:this.changDataArr
            }
             publicInter(interfaceUrl.updateReadStatus,data).then(res=>{
                if(res.code == 200){
                    this.$Message.success('状态更新成功')
                    this.queryTortNum()
                    this.queryInfo(1)
                    this.changDataArr = []
                }else{
                     this.$Message.error('状态更新失败')
                }
            })
        },
         close(){
            this.$refs.header.style.display = 'none';
         },
         //文件下载
         downloadFile(row){
            let a = document.createElement('a')
            a.href = row.filepath.replace('/data/file/','').trim()
            a.click()
         },
         //修改阅读状态
         changeReadStatus(row){
              let arr = []
              arr.push(row.uuid)
              let data = {
                 list:arr
             }
              publicInter(interfaceUrl.updateReadStatus,data).then(res=>{
                if(res.code == 200){
                    this.$Message.success('状态更新成功')
                    this.queryTortNum()
                    this.queryInfo(1)
                }else{
                     this.$Message.error('状态更新失败')
                }
            })
         },
        //默认加载信息查询
        queryInfo(page){
            let data ={
                companyname:this.companyname,
                readstatus:this.readstatus,
                title:this.title,
                pageNum:page,
                pageSize:20
            }
            publicInter(interfaceUrl.queryTortListForCus,data).then(res=>{
                console.log(res)
                this.tortList = res.list
                this.total1 = (res.total)*1
            })
        },
        //分页函数
        changePage1(page){
            this.numPage = page
            this.queryInfo(page)
        },
    },
    mounted(){
        this.queryInfo(1)
        this.queryTortNum()
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    .header{
        display: flex;
        height: 35px;
        width: 100%;
        margin-bottom: 10px;
        background-color: #FFFBEF;
        img{
            display: block;
            width: 35px;
            height: 35px;
        }
        .msgimg{
            margin-left: 20px;
        }
        .closeimg{
            float: right;
            display: block;
            width: 25px;
            height: 25px;
            margin-top: 5px;
            cursor: pointer;
        }
        span{
            margin-left: 20px;
            width: 93%;
            display: inline-block;
            line-height: 35px;
            button{
                margin-left: 40px;
            }
        }
    }
    
    h2{
        padding-bottom: 20px;
        border-bottom: 2px solid #dddee1;
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
    .bottombtn{
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .ivu-page{
               margin: 10px 20px 0 0;
            }
        }
    
} 
</style>