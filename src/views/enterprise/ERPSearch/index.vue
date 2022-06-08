<template>
  <div>
      <h1>信息查询</h1>
       <Tabs value="name1" @on-click="clickTab">
           <TabPane label="框架协议要素" name='name1'>
             <agreements v-if="this.tabType === 'name1'" @lookPDF='previewPDF' @showDetail="information"  /> 
            </TabPane>
            <TabPane label="单次合同要素" name='name2'>
             <contract v-if="this.tabType === 'name2'" @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="采购订单要素" name='name3'>
             <order v-if="this.tabType === 'name3'" @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="销售订单要素" name='name4'>
             <saleOrder v-if="this.tabType === 'name4'"  @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="发票信息要素" name='name5'>
                <bill v-if="this.tabType === 'name5'" @lookPDF='previewPDF' @showDetail="information" /> 
            </TabPane>
            <TabPane label="物料数据要素" name='name6'>
                <materiel v-if="this.tabType === 'name6'" />
            </TabPane>
            <TabPane label="装货数据要素" name='name7'>
                <ldg v-if="this.tabType === 'name7'" @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="到货数据要素" name='name8'>
                <notice v-if="this.tabType === 'name8'" @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="财务数据要素" name='name9'>
                <finance v-if="this.tabType === 'name9'" @lookPDF='previewPDF' @showDetail="information" />
            </TabPane>
            <TabPane label="移库数据要素" name='name10'>
                <transferWarehouse v-if="this.tabType === 'name10'" @lookPDF='previewPDF' @showDetail="information" />
            </TabPane>
            <TabPane label="出库数据要素" name='name11'>
                <outWarehouse v-if="this.tabType === 'name11'" @lookPDF='previewPDF' @showDetail="information" />
            </TabPane>
            <TabPane label="出门数据要素" name='name12'>
                <bondedOut v-if="this.tabType === 'name12'" @lookPDF='previewPDF' @showDetail="information" />
            </TabPane>
            <TabPane label="物料商品对应关系要素" name='name13'>
                <mergerRelation v-if="this.tabType === 'name13'" @lookPDF='previewPDF' @showDetail="information" />
            </TabPane>
    </Tabs>
    <detail ref="selfModal"></detail>
    <pdfView ref="pdf"/>
  </div>
</template>
<script>
    import pdfView from '@/components/PDFView'
    import detail from '@/components/ERPSearch/detail/index'
    import bill from './bill'
    import ldg from './ldg'
    import notice from './notice'
    import finance from './finance'
    import saleOrder from './saleOrder'
    import transferWarehouse from './transferWarehouse'
    import outWarehouse from './outWarehouse'
    import bondedOut from './bondedOut'
    import agreements from '@/components/ERPSearch/agreements'
    import order from '@/components/ERPSearch/order'
    import contract from '@/components/ERPSearch/contract'
    import materiel from '@/components/ERPSearch/materiel'
    import mergerRelation from './mergerRelation'
    import { mapMutations } from 'vuex'
    export default {
        name:'inforQuery',
        data() {
            return {
                tabType: 'name1'
            }
        },
        components:{
            pdfView,
            bill,
            ldg,
            notice,
            finance,
            agreements,
            order,
            contract,
            materiel,
            detail,
            saleOrder,
            transferWarehouse,
            outWarehouse,
            bondedOut,
            mergerRelation
        },
         created(){
            this.setMenu('3-1')
        },
        methods:{
            ...mapMutations(['setMenu']),
            previewPDF(data){
                this.$refs.pdf.isShow=true
                this.$refs.pdf.showPDF(data)
            },
            information(obj){
                this.$refs.selfModal.init(obj)
                this.$refs.selfModal.modal=true
            },
            clickTab(name) {
                this.tabType = name;
            }
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
