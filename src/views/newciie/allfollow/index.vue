<template>
<div class="queryERPsupplyChainall">
     <Row style="border-bottom:2px solid #ccc">
             <Col span="12" ><h2>进博会展品展后处置统计</h2></Col>
             <Col span="12"><div  style="float:right;"><h2>当前年份:{{showNowYears}}年</h2></div> </Col>
            </Row>
    <Tabs  class="agentCencus">
       <TabPane label="完成处置报关单">
        <finishEntry/>
       </TabPane>

      <TabPane label="已处置报关单清单">
        <overCompany/>
     </TabPane>
      <TabPane label="代理企业未处置清单">
      <unCompany/>
     </TabPane>

     <TabPane label="代理企业处置进度统计">
      <progressCompany/>
     </TabPane>
     <TabPane label="后续流向关键字统计">
      <keyWord/>
     </TabPane>
      

     </Tabs>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'

 import {getCookie,setCookie} from '@/until/getToken'
 import finishEntry from './components/fininshEntry'
 import overCompany from './components/overCompany'
 import unCompany from './components/unCompany'
 import progressCompany from './components/progressCompany'
 import keyWord from './components/keyWord'

export default {
  components:{finishEntry,overCompany,unCompany,progressCompany,keyWord},
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
