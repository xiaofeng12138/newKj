<template>
    <div class="tagsWrap">
        <Button type='primary'  @click="goback" style="margin-right:30px;width:100px">返 回</Button>
        <div class="noTags" v-if="queryTagsArr.length == 0">暂无标签信息</div>
        <Tabs class="tabsWrap"  @on-click='clickTab' >
             <TabPane v-for="(item,index) in queryTagsArr" :key = index :label='item.lablename'>
                <div class="query" >
            
            <div class="copName">授权企业名称：<Input size="large" placeholder="请输入授权企业名称" style="width:70%" v-model="queryInfo.companyname"/></div>
            <div class="copName"> 品牌名称：<Input size="large" placeholder="请输入品牌名称" style="width:70%" v-model="queryInfo.brandname"/></div>
            <div class="copName"> 商品名称：<Input size="large" placeholder="请输入商品名称" style="width:70%" v-model="queryInfo.goodsname"/></div>
             <div class="copName"> HSCODE：<Input size="large" placeholder="请输入HSCODE" style="width:70%" v-model="queryInfo.hscode"/></div>
           </div>
           <div class="query">
                <div class="copName"> 企业信用代码：<Input size="large" placeholder="请输入企业信用代码" style="width:70%" v-model="queryInfo.cncompanycode"/></div>
               
                <div class="copName"> 处理状态：<Select style="width:50%" v-model="queryInfo.readstatus"><Option value="">全部状态</Option><Option value="1">已处理</Option> <Option value="0"> 未处理</Option></Select></div>
                <Button type='primary'  @click="queryInfoList(1)" style="margin-right:30px;width:100px">查  询</Button>
                <!-- <Button type='primary'   style="margin-right:30px;width:100px" @click="exportExcel">导  出</Button> -->
           </div>
                <div style='margin-top:20px'>
                    <Table border :columns = 'columns' :data='tagsList' class="self" max-height='580'>
                  
                </Table>
                <div  class ='bottombtn'>
                  <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
                </div>
                </div>
             </TabPane>
        </Tabs>

      
    </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {setCookie,getCookie,} from "@/until/getToken";

export default {
    data() {
        return {
            tagsList:[],
            columns:[
                {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
               {
                title:'权利人名称', 
                key:'lablename',
                width:'150',
                align:'center'
              },
               {
                title:'授权企业名称',
                key:'companyname',
                align:'center',
                width:'200',
              },
              {
                title:'企业统一社会信用代码',
                key:'cncompanycode',
                align:'center',
                width:'250',
              },
              {
                title:'商品HS编码',
                key:'hscode',
                align:'center',
                width:'200',
              },
              {
                title:'商品名',
                key:'goodsname',
                align:'center',
                width:'200',
              },
              {
                title:'品牌名称',
                key:'brandname',
                align:'center',
                width:'200',
              },
              {
                title:'许可起始日',
                key:'permitstartdate',
                align:'center',
                width:'200',
                render:(h,params)=>{
                 let tmpStr ="";
                 if(params.row.permitstartdate){
                    tmpStr = params.row.permitstartdate.replace(new RegExp(/-/g),'/')
                    return h('span',tmpStr)
                 }else{
                   return h('span',tmpStr)
                 }
                }
              },
              {
                title:'许可截止日',
                key:'permitenddate',
                align:'center',
                width:'200',
                render:(h,params)=>{
                 let tmpStr ="";
                 if(params.row.permitenddate){
                    tmpStr = params.row.permitenddate.replace(new RegExp(/-/g),'/')
                    return h('span',tmpStr)
                 }else{
                   return h('span',tmpStr)
                 }
                }
              },
              {
                title:'目的国名称',
                key:'descountry',
                align:'center',
                width:'200',
              },
              {
                title:'处理状态',
                key:'readStatus',
                align:'center',
                width:'200',
              },
               {
                title:'许可状态',
                key:'permitStat',
                align:'center',
                width:'200',
              },
              {
                title:'应用情况',
                key:'cusNote',
                align:'center',
                width:'200',
                
              },
              
            ],
           queryInfo:{
               goodsname:'',
               brandname:'',
               companyname:'',
               hscode:'',
               readstatus:'',
               cncompanycode:''
           },
            
            total1:0,
            delCompanyArray:[],
            showdisabled:true,
            numPage:1,
            nowChooseTags:'',
            queryTagsArr:[]
        }
    },
    methods:{
        exportExcel(){
            let lablename = this.nowChooseTags
            let goodsname = this.queryInfo.goodsname.length > 0 ? this.queryInfo.goodsname :''
            let brandname = this.queryInfo.brandname.length > 0  ? this.queryInfo.brandname :''
            let agentCompanenyName =''

            let url = interfaceUrl.excelExport+'?lablename='+ lablename +'&goodsname='+ goodsname +'&brandname='+brandname+'&agentCompanenyName='+agentCompanenyName
            let queryUrl = encodeURI(url)
            console.log(queryUrl)
            let newName = (new Date()).getTime()
            this.excelName1 = newName +'.xls'
            filedownload(queryUrl,{}).then(r=>{
                        let url = window.URL.createObjectURL(new Blob([r]))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', this.excelName1)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    })
        },
        goback(){
            this.$router.go(-1)
        },
        changePage1(page){
           this.numPage = page
           this.queryInfoList(page)
        },
        queryInfoList(page){
            let data ={
                pageNum:page,
                pageSize:20,
                lablename:this.nowChooseTags,
                goodsname:this.queryInfo.goodsname,
                brandname:this.queryInfo.brandname,
                hscode:this.queryInfo.hscode,
                companyname:this.queryInfo.companyname,
                readStatus:this.queryInfo.readstatus,
                cncompanycode:this.queryInfo.cncompanycode,
            }
            publicInter(interfaceUrl.querypageQuery,data).then(res=>{
                this.tagsList = res.list
                this.total1 = (res.total)*1
            })
        },

        queryAllInfo(page,params){
            let data={
                pageNum:1,
                pageSize:500,
                lablename:'',
                status:'',
                companyname:params
            }
             publicInter(interfaceUrl.queryListForCus,data).then(res=>{
                let arr = []
                if(res.list.length > 0){
                  arr = res.list.filter((item)=>{ return item.status != '2'})
                  this.queryTagsArr = arr
                  this.nowChooseTags = arr[0].lablename
                   let data ={
                        pageNum:page,
                        pageSize:20,
                        lablename:arr[0].lablename,
                        goodsname:'',
                        brandname:'',
                        hscode:''
                }
                publicInter(interfaceUrl.querypageQuery,data).then(res=>{
                    this.tagsList = res.list
                    this.total1 = (res.total)*1
                })
                }else{this.queryTagsArr = []}
            })
        },
         //点击Tab
        clickTab(params){
            let value = this.queryTagsArr[params].lablename
            this.nowChooseTags = value
            this.queryInfo.goodsname = ''
            this.queryInfo.brandname = ''
            this.queryInfo.hscode = ''
            this.queryInfo.companyname = ''
            this.queryInfo.readstatus =''
            this.queryInfo.cncompanycode = ''
            this.delCompanyArray = []
            this.queryInfoList(1)
        },
    },
    mounted(){
        let id = this.$route.params.id ? this.$route.params.id:getCookie('queryComName')
        this.queryAllInfo(1,id)
    }
}
</script>

<style lang="scss" scoped>
.tagsWrap{
    .noTags{
        font-size: 20px;
        text-align: center;
        line-height: 100px;
        font-weight: 500;
    }
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
            width: 25%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
        }
        .bottombtn{
            .ivu-page{
               margin: 10px 20px 0 0;
               text-align: center;
               margin-bottom:20px;
            }
        }
    
}
    
</style>