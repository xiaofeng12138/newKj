<template>
  <div>
      <h1>信息查询</h1>
       <Tabs value="name1">
           <TabPane label="框架协议要素" name='name1'>
             <agreements @lookPDF='previewPDF' @showDetail="information"  /> 
            </TabPane>
            <TabPane label="单次合同要素" >
             <contract @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="采购订单要素" >
             <order @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="发票信息要素">
                <bill @lookPDF='previewPDF' @showDetail="information" /> 
            </TabPane>
            <TabPane label="物料数据要素">
                <materiel />
            </TabPane>
            <TabPane label="装货数据要素" >
                <ldg @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="到货数据要素">
                <notice @lookPDF='previewPDF' @showDetail="information"  />
            </TabPane>
            <TabPane label="财务数据要素">
                <finance @lookPDF='previewPDF' @showDetail="information" />
            </TabPane>
            
    </Tabs>
    <detail ref="selfModal"></detail>
    <pdfView ref="pdf"/>
  </div>
</template>
<script>
    //pdf预览
    import pdfView from './components/PDFView'
    //查看详情
    import detail from './components/detail/index'
    //订单
    import bill from './components/bill'
    //装货
    import ldg from './components/ldg'
    //到货
    import notice from './components/notice'
    //财务
    import finance from './components/finance'
    //框架协议
    import agreements from './components/agreements'
    //订单
    import order from './components/order'
    //合同
    import contract from './components/contract'
    //物料
    import materiel from './components/materiel'
    export default {
        name:'inforQuery',
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
            detail
        },
        methods:{
            previewPDF(data){
                this.$refs.pdf.isShow=true
                this.$refs.pdf.showPDF(data)
            },
            information(obj){
                this.$refs.selfModal.init(obj)
                this.$refs.selfModal.modal=true
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
