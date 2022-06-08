<template>
<div class="queryERPsupplyChainall">
     <Row style="border-bottom:2px solid #ccc">
             <Col span="12" ><h2>进博会展品信息查询功能</h2></Col>
              <Col span="12"><div  style="float:right;"><h2>当前年份:{{showNowYears}}年</h2></div> </Col>
            </Row>
    <Tabs  class="agentCencus">
      <TabPane label="展品信息全量查询">
          <allindex />
      </TabPane>
      <TabPane label="展品信息统计">
        <alltotal />
      </TabPane>
      <TabPane label="暂进展品信息查询">
        <ZjStatistics />
      </TabPane>
    
     </Tabs>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import allindex from './components/allindex'
 import alltotal from './components/alltotal'
 import ZjStatistics from './components/zjStatistics'
 import {getCookie,setCookie} from '@/until/getToken'
export default {
  components:{ allindex ,alltotal,ZjStatistics},
  data(){
    return {
          showNowYears:getCookie('date'),
    }
  },
  methods:{
     
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryERPsupplyChainall{
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    #loading{
       position: fixed;
       width: 100%;
       height:800px;
       margin: auto;
       background-color: #ccc;
       opacity: 0.8;
       text-align: center;
       z-index: 1002;
       i{
          line-height: 150px;
       }
       p{
           font-size: 18px;
       }
   }
    .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
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
 .agentCencus{
    //  margin-top: 10px;
 }
</style>
