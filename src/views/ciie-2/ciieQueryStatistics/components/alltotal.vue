<template>
    <div class="taglist">
           <div class="query">
                <div class="copName">
                  <DatePicker class="customDatePicker" format='yyyy-MM-dd' @on-change='startTimeFn' type='date' style="width:80%"  placeholder="请选择开始日期" ></DatePicker>
                </div>
               <div class="copName">
                  <DatePicker class="customDatePicker" style="background:transparent;width:80%" format='yyyy-MM-dd' @on-change='endTimeFn' type='date'  placeholder="请选择结束日期" ></DatePicker>
                </div>
                 <div class="copName"><Select class="customSelect" placeholder="请选择贸易方式" v-model="queryInfo.monitormethod"><Option value="">全部</Option><Option value="0">非ATA暂进</Option> <Option value="1"> ATA单证</Option></Select></div>
               
                <Button type='primary'  @click="queryInfoList(1)" style="margin-right:30px;width:100px">查  询</Button>
                <!-- <Button type='primary'   style="margin-right:30px;width:100px" @click="exportExcel" :disabled="isdisabled1">导  出</Button> -->
           </div>
          <div class="queryContent">
             <Row>
                <Col span="3">总批次</Col>
                <Col span="9"  style="overflow: visible">
                    <div ><strong>{{this.queryContent.TOTALBATCH}}</strong></div>
                </Col>
                 <Col span="3">总金额</Col>
                <Col span="9"  style="overflow: visible">
                    <div  ><strong>{{this.queryContent.TOTALPRICE}}</strong></div>
                </Col>
            </Row>
          </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tableData' class="customTable"></Table></div>
          <div  class ='bottombtn'>
            <Page :total="total1" :page-size=10  @on-change="changePage1" show-total />
          </div>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

export default {
    data() {
        return {
            isdisabled1:true,
            queryContent:{},
            tableData:[],
            queryInfo:{
            //    agentname:'',//代理企业名称
            //    agentcode:'',//代理企业代码
            //    billno:'', //提运单号
            //    contr_no:'', //合同号
            //    hscode:'',
            //    countryoforigin:'',
            //    entry_id:'',
            //    exhtype:'',// 商品种类
            //    hallno:'',
            //    remark:'',
               pageNum:1,
               pageSize:10,
               startTime:'',
               endTime:'',
               monitormethod:''
            },
            total1:0,
            // zgList: [], 
            numPage:1,
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
                align:'center'
              },
               {
                title:'代理企业代码',
                key:'AGENTCODE',
                align:'center',
              },
              {
                title:'证明函编号', 
                key:'CERTIFICATENO',
                align:'center'
              },
              {
                title:'报关单号', 
                key:'ENTRY_ID',
                align:'center'
              },
               {
              title:'贸易方式',
              key:'MONITORMETHOD',
              align:'center'
             },
              {
                title:'海关接单/签注日期',
                key:'D_DATE',
                align:'center',
                width:250
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
            ],
        }
    },
    methods:{
        changePage1(page){
           this.numPage = page
           this.queryList(page)
        },
      //列表信息查询
      queryList(page){
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
            publicInter(interfaceUrl.queryBasicInfo,requsetData).then(res=>{
              this.tableData = res.list
              this.total1 = res.totalRow
            })
      },
      //查询展位列表
    //   queryZglist(){
    //        publicInter(interfaceUrl.queryPositionTransport,{}).then(res=>{
    //            this.zgList = res.position
    //         })
    //   },
      //选择开始时间
      startTimeFn(value){
        this.queryInfo.startTime = value
      },
      endTimeFn(value){
        this.queryInfo.endTime = value
      },
     
        queryInfoList(){
          this.queryList(1)
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
            publicInter(interfaceUrl.queryBasicInfoCount,requsetData).then(res=>{
              this.queryContent = res
            })
        },
    },
    mounted(){
      this.queryInfoList()
    //   this.queryZglist()
      this.queryList(1)
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
        width: 80%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 18%;
            /deep/ .ivu-input {
              background: transparent
            }
            .customSelect{
                width: 70%;
            }
         }
        
        }
        .bottombtn{
            .ivu-page{
               text-align: center;
               margin: 20px 0;
            }
        }
    
}
.queryContent{
            width: 100%;
            height: 60px;
            margin-top: 20px;
            font-size: 20px;
            color: #fff;
                .ivu-row{
                    border-top: 1px solid #fff;
                    border-right: 1px solid #fff;
                    .ivu-col {
                        border-left: 1px solid #fff;
                        border-bottom: 1px solid #fff;
                        padding: 2px 4px;
                        height: 40px;
                        overflow: hidden;
                        line-height: 2;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        text-align: center;
                        > span {
                            display: inline-block;
                            width: auto;
                            text-align: left;
                            vertical-align: middle;
                        }
                    }
                    .text-col{
                        height: 180px;
                    }
                    .pBreak{
                        text-indent:2em;
                        width: 100%;
                        height: auto;
                        word-wrap: break-word;
                        word-break: break-all;
                        overflow: hidden;
                    }
                }
              
            } 
    
</style>