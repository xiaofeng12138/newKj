<template>
    <div class="taglist">
          <div class="query" >
            <div class="copName">代理企业名称：<Input size="large" placeholder="请输入代理企业名称" style="width:60%" v-model="queryInfo.agentname"/></div>
            <div class="copName"> 代理企业代码：<Input size="large" placeholder="请输入代理企业代码" style="width:60%" v-model="queryInfo.agentcode"/></div>
            <div class="copName"> 提运单号：<Input size="large" placeholder="请输入提运单号" style="width:60%" v-model="queryInfo.billno"/></div>
            <div class="copName"> 合同号：<Input size="large" placeholder="请输入合同号" style="width:60%" v-model="queryInfo.contr_no"/></div>
             <div class="copName"> HS编码：<Input size="large" placeholder="请输入HS编码" style="width:60%" v-model="queryInfo.hscode"/></div>
           </div>
           <div class="query">
                <div class="copName"> 原产国：<Input size="large" placeholder="请输入原产国" style="width:60%" v-model="queryInfo.countryoforigin"/></div>
                <div class="copName"> 报关单号：<Input size="large" placeholder="请输入报关单号" style="width:60%" v-model="queryInfo.entry_id"/></div>
                <div class="copName"> 商品种类：<Select style="width:60%" v-model="queryInfo.exhtype"><Option value="">全部状态</Option><Option value="1">服务贸易</Option> <Option value="2"> 汽车</Option><Option value="3">智能高端装备</Option> <Option value="4"> 消费电子及家电</Option><Option value="5">服装及日用品</Option> <Option value="6"> 医疗器械</Option><Option value="7">食品</Option> </Select></div>
                <div class="copName"> 展馆号：
                    <Select v-model="queryInfo.hallno" style="width:180px" >
                          <Option v-for="(item,index) in zgList" :value="item.NAME" :key="index">{{ item.NAME }}</Option>
                  </Select>
                    <!-- <Select v-model="queryInfo.hallno"  placeholder="请选择展馆号"  size='large'  style="width:180px;">
                                <Option v-for="item in zgList" :key="item" :value="item">{{item}}</Option>
                     </Select> -->
                </div>
                <div class="copName"> 备注：<Input size="large" placeholder="请输入备注" style="width:60%" v-model="queryInfo.remark"/></div>
                <!-- <Button type='primary'  @click="queryTagList(1)" style="margin-right:30px;width:100px">查  询</Button>
                <Button type='primary'   style="margin-right:30px;width:100px" @click="exportExcel">导  出</Button> -->
           </div>
           <div class="query">
                <div class="copName">申报开始日期：
                  <DatePicker format='yyyy-MM-dd' @on-change='startTimeFn' type='date'  placeholder="请选择开始日期" style="width:60%"></DatePicker>
                </div>
               <div class="copName">申报结束日期：
                  <DatePicker format='yyyy-MM-dd' @on-change='endTimeFn' type='date'  placeholder="请选择结束日期" style="width:60%"></DatePicker>
                </div>
                 <div class="copName"> 贸易方式：<Select style="width:60%" v-model="queryInfo.monitormethod"><Option value="">全部</Option><Option value="0">非ATA暂进</Option> <Option value="1"> ATA单证</Option></Select></div>
                <div class="copName"> 商品名称：<Input size="large" placeholder="请输入商品名称" style="width:60%" v-model="queryInfo.goodsname"/></div>
                <Button type='primary'  @click="queryInfoList(1)" style="margin-right:30px;width:100px">查  询</Button>
                <Button type='primary'   style="margin-right:30px;width:100px" @click="exportExcel" :disabled="isdisabled1">导  出</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tableData' class="self"></Table>
          <div  class ='bottombtn'>
            <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
          </div>
        </div>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {getCookie,setCookie} from '@/until/getToken'

export default {
    data() {
        return {
            isdisabled1:true,
            showNowYears:getCookie('date'),
            tableData:[],
            columns:[
                {
                title:'序号',
                width:80,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
               {
                  title:'展商名称', 
                  key:'EXHIBITOR',
                  width:'200',
                  align:'center'
               },
               {
                title:'代理企业名称', 
                key:'AGENTNAME',
                width:'200',
                align:'center'
              },
               {
                title:'代理企业代码',
                key:'AGENTCODE',
                align:'center',
                width:'200',
              },
              {
                title:'证明函编号', 
                key:'CERTIFICATENO',
                width:'200',
                align:'center'
              },
              {
                title:'报关单号', 
                key:'ENTRY_ID',
                width:'220',
                align:'center'
              },
               {
              title:'贸易方式',
              key:'MONITORMETHOD',
              width:'220',
              align:'center'
             },
             {
                title:'货物名称',
                key:'GOODSDESCRIPTIONCN',
                align:'center',
                width:'250',
              },
              {
                title:'规格型号',
                key:'G_MODEL',
                align:'center',
                width:'200',
              },
              {
                title:'HS编码',
                key:'HSCODE',
                align:'center',
                width:'200',
              },
              {
                title:'商品种类',
                align:'center',
                width:'200',
                render:(h,params)=>{
                 let arr =['','服务贸易','汽车','智能及高端装备','消费电子及家电','服装及日用品','医疗器械','食品'];
                  return h('span',arr[(params.row.EXHTYPE)*1])
                }
              },
              {
                title:'货物金额',
                key:'TOTALPRICE',
                align:'center',
                width:'200',
              },
               {
                title:'提运单号', 
                key:'BILLNO',
                width:'200',
                align:'center'
              },
              {
                title:'合同号',
                key:'CONTR_NO',
                align:'center',
                width:'250',
              },
              {
                title:'原产国/地区',
                key:'COUNTRYOFORIGIN',
                align:'center',
                width:'200',
              },
              {
                title:'展馆号',
                key:'HALLNO',
                align:'center',
                width:'200',
              },
              {
                title:'申报日期',
                key:'D_DATE',
                align:'center',
                width:'200',
              },
               {
                title:'备注',
                key:'REMARK',
                align:'center',
                width:'200',
              },
            ],
           queryInfo:{
               agentname:'',//代理企业名称
               agentcode:'',//代理企业代码
               billno:'', //提运单号
               contr_no:'', //合同号
               hscode:'',
               countryoforigin:'',
               entry_id:'',
               exhtype:'',// 商品种类
               hallno:'',
               remark:'',
               pageNum:1,
               pageSize:20,
               startTime:'',
               endTime:'',
               monitormethod:'',
               goodsname:''
           },
            total1:0,
            zgList: [], 
            numPage:1,
        }
    },
    methods:{
      //查询展位列表
      queryZglist(){
           publicInter(interfaceUrl.queryPositionTransport,{}).then(res=>{
               this.zgList = res.position
            })
      },
      //选择开始时间
      startTimeFn(value){
        this.queryInfo.startTime = value
      },
      endTimeFn(value){
        this.queryInfo.endTime = value
      },
      exportExcel(){
            let requsetData =this.queryInfo
            let url = interfaceUrl.exportBasicInfoExcel
            let queryUrl = encodeURI(url)
            let newName = (new Date()).getTime()
            let excelName1 = newName +'.xls'
            filedownload(queryUrl,requsetData).then(r=>{
                        let url = window.URL.createObjectURL(new Blob([r]))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download',excelName1 )
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    })
        },
        changePage1(page){
           this.numPage = page
           this.queryInfoList(page)
        },
        queryInfoList(page){
          let requsetData ={}
          for(let key in this.queryInfo){
            if(this.queryInfo[key]){
              requsetData[key] = this.queryInfo[key]
            }
          }
          if(requsetData.startTime && !requsetData.endTime){
             this.$Message.error('结束日期不能为空！！')
             return false
          }
           if(!requsetData.startTime && requsetData.endTime){
             this.$Message.error('开始日期不能为空！！')
             return false
          }
          requsetData.pageNum = page
            publicInter(interfaceUrl.queryBasicInfoList,requsetData).then(res=>{
                this.tableData = res.list
                this.total1 = res.totalRow
                if(res.totalRow > 0){
                     this.isdisabled1 = false
                }else{
                   this.isdisabled1 = true
                }
            })
        },
    },
    mounted(){
      this.queryInfoList(1)
      this.queryZglist()
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
        // border-bottom: 2px solid #dddee1;
    }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 18%;
         }
        }
        .bottombtn{
            .ivu-page{
               text-align: center;
               margin: 20px 0;
            }
        }
    
}
    
</style>