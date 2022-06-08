<template>
<div class="queryERPsupplyChainall">
     <Row style="border-bottom:2px solid #ccc">
             <Col span="12" ><h2>进博会展品信息统计功能</h2></Col>
              <Col span="12"><div  style="float:right;"><h2>当前年份:{{showNowYears}}年</h2></div> </Col>
            </Row>
    <Tabs  class="agentCencus">
       <TabPane label="进博会日申报详情">
          <jbhday />
       </TabPane>

      <TabPane label="进博会总申报统计">
        <jbhtotal />
     </TabPane>

     <TabPane label="各展馆日申报详情">
        <hallday />
     </TabPane>
     <TabPane label="各展馆总申报统计">
       <halltotal />
     </TabPane>

     </Tabs>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import jbhday from './components/jbhday'
 import jbhtotal from './components/jbhtotal'
 import hallday from './components/hallday'
 import halltotal from './components/halltotal'
 import {getCookie,setCookie} from '@/until/getToken'
export default {
  components:{jbhday,jbhtotal,hallday,halltotal },
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
