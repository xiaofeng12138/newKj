<template>
  <div>
      <h1>企业供应链备案</h1>
      <Tabs v-model='selectName'  class="agentCencus">
          <TabPane label="普通贸易进口" name='name1'>
             <upload-template :title='templateParams.agreements.title' 
             :loadUrl='templateParams.agreements.loadUrl'
             :downxlsx='templateParams.agreements.downxlsx'
             :desc='templateParams.agreements.desc'
             :type='templateParams.agreements.type'></upload-template>
        </TabPane>
         <TabPane label="一线进口" name='name2'>
             <upload-template :title='templateParams.contract1.title' 
             :loadUrl='templateParams.contract1.loadUrl'
             :downxlsx='templateParams.contract1.downxlsx'
             :desc='templateParams.contract1.desc'
             :type='templateParams.contract1.type'></upload-template>
        </TabPane>
        <TabPane label="二线进口" name = "name3">
             <upload-template :title='templateParams.contract.title' 
             :loadUrl='templateParams.contract.loadUrl'
             :downxlsx='templateParams.contract.downxlsx'
             :desc='templateParams.contract.desc'
             :type='templateParams.contract.type'></upload-template>
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
    import uploadTemplate from '@/components/uploadFile/index'
    // import url from '../../../api/urlConfig'
    import interfaceUrl from '@/api/interfaceUrl'
    import { mapMutations } from 'vuex'
    import Finance from "@/components/ERP/finance";
    export default {
        name:'ERPInformationUpload',
        data(){
            return{
                selectName:"name1",
                  templateParams:{
                       agreements:{
                        title:'普通贸易进口',
                        loadUrl:interfaceUrl.uploadCommonGoods,
                        downxlsx:'/excel/commonGoods.xlsx',
                        desc:' 为进一步扩大跨境贸易大数据平台企业参与度，加快合作进度，请有意愿和海关开展大数据合作的企业，先行传输供应链企业（贸易及物流各环节所涉及的企业）信息。上海海关将根据供应链企业信用风险评估结果及数据开放程度，给予相应的通关便利',
                    },
                    contract1:{
                        title:'一线进口',
                        loadUrl:interfaceUrl.uploadGenneralTrade,
                        downxlsx:'/excel/generalTrade.xlsx',
                        desc:` 为进一步扩大跨境贸易大数据平台企业参与度，加快合作进度，请有意愿和海关开展大数据合作的企业，先行传输供应链企业（贸易及物流各环节所涉及的企业）信息。上海海关将根据供应链企业信用风险评估结果及数据开放程度，给予相应的通关便利`,
                    },
                     contract:{
                        title:'二线进口',
                        loadUrl:interfaceUrl.uploadSecondLineExcel,
                        downxlsx:'/excel/secondLine.xlsx',
                        desc:` 为进一步扩大跨境贸易大数据平台企业参与度，加快合作进度，请有意愿和海关开展大数据合作的企业，先行传输供应链企业（贸易及物流各环节所涉及的企业）信息。上海海关将根据供应链企业信用风险评估结果及数据开放程度，给予相应的通关便利`,
                    }
                }
            }
        },
        components:{
            Finance,
            uploadTemplate
        },
        created(){
            if(this.$route.params && this.$route.params.name){
                this.selectName = this.$route.params.name;
            }
            this.setMenu('3-2')
        },
        methods:{
            ...mapMutations(['setMenu']),
        },
       
    }
</script>
<style  lang="scss" scoped>
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    h3{
        span{
            color:rgba(45, 140, 240, 1)  
        }
    }
  .ivu-tabs-nav .ivu-tabs-nav .ivu-tabs-tab {
    padding: 16px 0;
    width: 180px;
    text-align: center;
    }
</style>
