<template>
  <div>
    <h1>企业ERP食品化妆品信息上传</h1>
    <Tabs v-model='selectName'  class="agentCencus">
        <TabPane label="食品化妆品进口上传" name='name1'>
             <upload-template :title='templateParams.agreements.title' 
             :loadUrl='templateParams.agreements.loadUrl'
             :downxlsx='templateParams.agreements.downxlsx'
             :desc='templateParams.agreements.desc'
             :type='templateParams.agreements.type'></upload-template>
        </TabPane>
         <TabPane label="食品化妆品出口上传" name='name2'>
             <upload-template :title='templateParams.contract1.title' 
             :loadUrl='templateParams.contract1.loadUrl'
             :downxlsx='templateParams.contract1.downxlsx'
             :desc='templateParams.contract1.desc'
             :type='templateParams.contract1.type'></upload-template>
        </TabPane>
        <TabPane label="食品化妆品出口报关后上传" name = "name3">
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
                 selectName:'name1',
                  templateParams:{
                       agreements:{
                        title:'食品化妆品进口信息',
                        loadUrl:interfaceUrl.uploadIEcargodeclar,
                        downxlsx:'/excel/Maquillage.xlsx',
                        desc:' 企业ERP食品化妆品进口信息上传',
                    },
                     contract1:{
                        title:'食品化妆品出口信息',
                        loadUrl:interfaceUrl.uploadExportIEcargodeclar,
                        downxlsx:'/excel/ExportMaquillage.xlsx',
                        desc:` 企业ERP食品化妆品出口信息上传`,
                    },
                     contract:{
                        title:'食品化妆品出口报关后信息',
                        loadUrl:interfaceUrl.uploadIEcargodeclarDeclared,
                        downxlsx:'/excel/MaquillageDeclared.xlsx',
                        desc:` 企业ERP食品化妆品出口报关后信息上传`,
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
