<template>
<div class="queryERPsupplyChainall">
  <!-- <alltotal /> -->

    <Tabs  class="customTabs center agentCencus">
       <TabPane label="展品信息查询列表">
          <allindex />
       </TabPane>
      <TabPane label="展品信息统计列表">
        <alltotal />
     </TabPane>
    
     </Tabs>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import allindex from './components/allindex'
 import alltotal from './components/alltotal'
 import {getCookie,setCookie} from '@/until/getToken'
export default {
  components:{ allindex ,alltotal},
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
