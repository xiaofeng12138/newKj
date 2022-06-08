<template>
  <div>
      <h1>信息上传</h1>
      <Tabs v-model='selectName' class="cargoupload">
          <TabPane label="动物源性食品" name='name1'>
             <upload-template :title='templateParams.AnimalCustomsEciqImportGoodsCosmeticsListExcel.title' 
             :loadUrl='templateParams.AnimalCustomsEciqImportGoodsCosmeticsListExcel.loadUrl'
             :downxlsx='templateParams.AnimalCustomsEciqImportGoodsCosmeticsListExcel.downxlsx'
             :desc='templateParams.AnimalCustomsEciqImportGoodsCosmeticsListExcel.desc'
             :type='templateParams.AnimalCustomsEciqImportGoodsCosmeticsListExcel.type'></upload-template>
        </TabPane>
        <TabPane label="植物源性食品、加工食品和食品添加剂" name = "name2">
             <upload-template :title='templateParams.PlantCustomsEciqImportGoodsCosmeticsListExcel.title' 
             :loadUrl='templateParams.PlantCustomsEciqImportGoodsCosmeticsListExcel.loadUrl'
             :downxlsx='templateParams.PlantCustomsEciqImportGoodsCosmeticsListExcel.downxlsx'
             :desc='templateParams.PlantCustomsEciqImportGoodsCosmeticsListExcel.desc'
             :type='templateParams.PlantCustomsEciqImportGoodsCosmeticsListExcel.type'></upload-template>
        </TabPane>
        <TabPane label="化妆品" name = "name3">
            <upload-template :title='templateParams.CosmeticsCustomsEciqImportGoodsCosmeticsListExcel.title' 
             :loadUrl='templateParams.CosmeticsCustomsEciqImportGoodsCosmeticsListExcel.loadUrl'
             :downxlsx='templateParams.CosmeticsCustomsEciqImportGoodsCosmeticsListExcel.downxlsx'
             :desc='templateParams.CosmeticsCustomsEciqImportGoodsCosmeticsListExcel.desc'
             :type='templateParams.CosmeticsCustomsEciqImportGoodsCosmeticsListExcel.type'></upload-template>
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
                    AnimalCustomsEciqImportGoodsCosmeticsListExcel:{
                        title:'动物源性食品',
                        loadUrl:interfaceUrl.AnimalCustomsEciqImportGoodsCosmeticsListExcel,
                        downxlsx:'/excel/Goods.xlsx',
                        desc:'描述：1',
                        type:'AnimalCustomsEciqImportGoodsCosmeticsListExcel'
                    },
                    PlantCustomsEciqImportGoodsCosmeticsListExcel:{
                        title:'植物源性食品、加工食品和食品添加剂',
                        loadUrl:interfaceUrl.PlantCustomsEciqImportGoodsCosmeticsListExcel,
                        downxlsx:'/excel/Goods.xlsx',
                        desc:'描述：2',
                        type:'PlantCustomsEciqImportGoodsCosmeticsListExcel'
                    },
                    CosmeticsCustomsEciqImportGoodsCosmeticsListExcel:{
                        title:'化妆品',
                        loadUrl:interfaceUrl.CosmeticsCustomsEciqImportGoodsCosmeticsListExcel,
                        downxlsx:'/excel/Goods.xlsx',
                        desc:'描述：3',
                        type:'CosmeticsCustomsEciqImportGoodsCosmeticsListExcel'

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
        mounted () {

        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    .ivu-tabs-ink-bar{
        top: 1px;
    }
</style>
