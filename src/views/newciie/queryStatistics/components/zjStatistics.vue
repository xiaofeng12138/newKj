<template>
    <div class="taglist">
          <div class="query" >
            <div class="copName">代理企业名称：<Input size="large" placeholder="请输入代理企业名称" style="width:60%" v-model="queryInfo.agentname"/></div>
            <div class="copName"> 代理企业代码：<Input size="large" placeholder="请输入代理企业代码" style="width:60%" v-model="queryInfo.agentcode"/></div>
            <div class="copName"> HS编码：<Input size="large" placeholder="请输入HS编码" style="width:60%" v-model="queryInfo.hscode"/></div>
            <div class="copName"> 单证号：<Input size="large" placeholder="请输入单证号" style="width:60%" v-model="queryInfo.entry_id"/></div>
            <div class="copName"> 商品类型：<Select style="width:60%" v-model="queryInfo.exhtype"><Option value="">全部状态</Option><Option value="1">服务贸易</Option> <Option value="2"> 汽车</Option><Option value="3">智能高端装备</Option> <Option value="4"> 消费电子及家电</Option><Option value="5">服装及日用品</Option> <Option value="6"> 医疗器械</Option><Option value="7">食品</Option> </Select></div>
            <div class="copName"> 展品名称：<Input size="large" placeholder="请输入展品名称" style="width:60%" v-model="queryInfo.goodsname"/></div>
           </div>
           <div class="query">
                <div class="copName"> 展馆号：
                    <Select v-model="queryInfo.hallno" style="width:180px" placeholder="请选择展馆号" >
                          <Option v-for="(item,index) in zgList" :value="item.NAME" :key="index">{{ item.NAME }}</Option>
                  </Select>
                </div>
                <div class="copName"> 是否冷链：
                    <Select v-model="queryInfo.hscodes" style="width:180px"   placeholder="请选择是否为冷链">
                      <Option value="是">是</Option>
                      <Option value="否">否</Option>
                  </Select>
                </div>
                <div class="copName">申报开始日期：
                    <DatePicker format='yyyy-MM-dd' @on-change='startTimeFn' type='date'  placeholder="请选择开始日期" style="width:60%"></DatePicker>
                    </div>
                <div class="copName">申报结束日期：
                    <DatePicker format='yyyy-MM-dd' @on-change='endTimeFn' type='date'  placeholder="请选择结束日期" style="width:60%"></DatePicker>
                </div>
                <div class="copName"> 贸易方式：<Select style="width:60%" v-model="queryInfo.monitormethod"><Option value="">全部</Option><Option value="0">非ATA暂进</Option> <Option value="1"> ATA单证</Option></Select></div>
               <Button type='primary'  @click="queryInfoList(1)" style="margin-right:30px;width:100px">查  询</Button>
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
                          return h('span',(params.index + (this.numPage - 1) * 10 )+1)
                    }
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
                title:'单证号', 
                key:'ENTRY_ID',
                width:'220',
                align:'center'
              },
               {
              title:'贸易方式',
              key:'MONITORMETHODS',
              width:'220',
              align:'center'
             },
              {
                title:'货物名称',
                key:'GOODSDESCRIPTIONCN',
                align:'center',
                render:(h,params)=>{
                        return h('div',[
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    width:'100%',
                                    overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    whiteSpace:'nowrap'
                                },
                                domProps:{
                                    title:params.row.GOODSDESCRIPTIONCN
                                }
                            },params.row.GOODSDESCRIPTIONCN)
                        ])
                    },
                width:'250',
              },
              {
                title:'HS编码',
                key:'HSCODE',
                align:'center',
                render:(h,params)=>{
                        return h('div',[
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    width:'100%',
                                    overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    whiteSpace:'nowrap'
                                },
                                domProps:{
                                    title:params.row.HSCODE
                                }
                            },params.row.HSCODE)
                        ])
                    },
                width:'200',
              },
               {
                title:'展位号',
                key:'POSITION',
                align:'center',
                width:'200',
              },
              {
                title:'是否冷链',
                key:'HSCODES',
                align:'center',
                width:'200',
              },
              // {
              //   title:'商品种类',
              //   align:'center',
              //   width:'200',
              //   render:(h,params)=>{
              //    let arr =['','服务贸易','汽车','智能及高端装备','消费电子及家电','服装及日用品','医疗器械','食品'];
              //     return h('span',arr[(params.row.EXHTYPE)*1])
              //   }
              // },
              {
                title:'货物金额',
                key:'TOTALPRICE',
                align:'center',
                width:'200',
              },
              //  {
              //   title:'提运单号', 
              //   key:'BILLNO',
              //   width:'200',
              //   align:'center'
              // },
              // {
              //   title:'合同号',
              //   key:'CONTR_NO',
              //   align:'center',
              //   width:'250',
              // },
              // {
              //   title:'原产国/地区',
              //   key:'COUNTRYOFORIGIN',
              //   align:'center',
              //   width:'200',
              // },
              {
                title:'展馆号',
                key:'HALLNO',
                align:'center',
                width:'200',
              },
              {
                title:'海关接单/签注日期',
                key:'D_DATE',
                align:'center',
                width:'250',
              },
            ],
           queryInfo:{
               agentname:'',//代理企业名称
               agentcode:'',//代理企业代码
               entry_id:'',
               exhtype:'',// 商品种类
               hallno:'',
               remark:'',
               pageNum:1,
               pageSize:10,
               startTime:'',
               endTime:'',
               hscodes:'',
               monitormethod:'',//贸易方式
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
            publicInter(interfaceUrl.queryBasicInfoTotal,requsetData).then(res=>{
                this.tableData = res.list
                this.total1 = res.totalRow
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