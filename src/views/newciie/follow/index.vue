<template>
<div class="queryERPsupplyChainall">
     <Row style="border-bottom:2px solid #ccc">
             <Col span="12" ><h2>进博会展品展后处置查询</h2></Col>
             <Col span="12"><div  style="float:right;"><h2>当前年份:{{showNowYears}}年</h2></div> </Col>
            </Row>
    <Tabs  class="agentCencus">
       <TabPane label="报关单号查询">
         <entryId />
       </TabPane>

      <TabPane label="主场运输代理企业查询">
        <transport />
     </TabPane>

     <TabPane label="展品名称查询">
      <exhibitsname />
     </TabPane>
     <TabPane label="展品流向查询">
      <exhibitsfollow />
     </TabPane>

     </Tabs>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'

 import {getCookie,setCookie} from '@/until/getToken'
 import entryId from './components/enteryId'
 import exhibitsfollow from './components/exhibitsfollow'
 import exhibitsname from './components/exhibitsname'
 import transport from './components/transport'

export default {
  components:{entryId,exhibitsfollow,exhibitsname,transport},
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
