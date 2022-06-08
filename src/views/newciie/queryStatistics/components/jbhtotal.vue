<template>
<div>
     <div class="query">
            <div class="endTime">报关单号：<Input size="large" placeholder="请输入报关单号" style="width:60%" v-model="queryparams.entry_id"/></div>
            <div class="endTime"> 贸易方式：<Select style="width:60%" v-model="queryparams.monitormethod"><Option value="">全部</Option><Option value="0">非ATA暂进</Option> <Option value="1">ATA单证</Option></Select></div>
               <Button type='primary' style="width:100px;margin-right:20px" size='large' @click="queryInfo">查 询</Button>
           </div>

      <div class="queryContent">
           <Row>
                <Col span="2">货物数量</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{this.queryContent.CON}}</div>
                </Col>
                 <Col span="2">申报总批次</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{this.queryContent.TOTALBATCH}}</div>
                </Col>
                <Col span="2">申报总金额</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{this.queryContent.TOTALPRICE}}</div>
                </Col>
            </Row>
      </div>
      </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
export default {
  data(){
      return{
          queryparams:{
              entry_id:"",
              monitormethod:''
          },
          queryContent:{}
         
      }
  },
  mounted(){
      this.queryInfo();
  },
  methods:{
    
    queryInfo(){
        let requsetData ={}
        for(let key in this.queryparams){
            if(this.queryparams[key]){
              requsetData[key] = this.queryparams[key]
            }
          }
        publicInter(interfaceUrl.queryBasicInfoCount,requsetData).then(res=>{
             this.queryContent = res
            })
    },
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
     .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .endTime{
        width: 20%
      }
    }
    .queryContent{
            width: 100%;
            height: 400px;
            margin-top: 20px;
            font-size: 14px;
            color: #000;
                .ivu-row{
                    border-top: 1px solid #000;
                    border-right: 1px solid #000;
                    .ivu-col {
                        border-left: 1px solid #000;
                        border-bottom: 1px solid #000;
                        padding: 2px 4px;
                        height: 40px;
                        overflow: hidden;
                        line-height: 30px;
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
