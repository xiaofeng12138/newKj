<template>
  <div>
      <h1>信息上传</h1>
      <Tabs v-model='selectName'>
          <TabPane label="框架协议要素" name='name1'>
             <upload-template :title='templateParams.agreements.title' 
             :loadUrl='templateParams.agreements.loadUrl'
             :downxlsx='templateParams.agreements.downxlsx'
             :desc='templateParams.agreements.desc'
             :type='templateParams.agreements.type'></upload-template>
        </TabPane>
        <TabPane label="单次合同要素" name = "name2">
             <upload-template :title='templateParams.contract.title' 
             :loadUrl='templateParams.contract.loadUrl'
             :downxlsx='templateParams.contract.downxlsx'
             :desc='templateParams.contract.desc'
             :type='templateParams.contract.type'></upload-template>
        </TabPane>
        <TabPane label="采购订单要素" name = "name3">
            <upload-template :title='templateParams.order.title' 
             :loadUrl='templateParams.order.loadUrl'
             :downxlsx='templateParams.order.downxlsx'
             :desc='templateParams.order.desc'
             :type='templateParams.order.type'></upload-template>
        </TabPane>
        <TabPane label="发票信息要素" name = "name4">
             <upload-template :title='templateParams.Invoice.title' 
             :loadUrl='templateParams.Invoice.loadUrl'
             :downxlsx='templateParams.Invoice.downxlsx'
             :desc='templateParams.Invoice.desc'
             :type='templateParams.Invoice.type'
             :isPDF='templateParams.Invoice.isPDF'
             :routerLink='templateParams.Invoice.routerLink'></upload-template>
        </TabPane>
        <TabPane label="装货数据要素" name = "name5">
            <upload-template :title='templateParams.SellerPkg.title' 
             :loadUrl='templateParams.SellerPkg.loadUrl'
             :downxlsx='templateParams.SellerPkg.downxlsx'
             :desc='templateParams.SellerPkg.desc'
             :type='templateParams.SellerPkg.type'
             :isPDF='templateParams.SellerPkg.isPDF'
             :routerLink='templateParams.SellerPkg.routerLink'></upload-template>
        </TabPane>
        <TabPane label="物料数据要素" name = "name6">
             <upload-template :title='templateParams.wuliao.title'
             :loadUrl='templateParams.wuliao.loadUrl'
             :downxlsx='templateParams.wuliao.downslsx'></upload-template>
        </TabPane>
        <TabPane label="到货数据要素" name = "name7">
            <upload-template :title='templateParams.Inbound.title' 
             :loadUrl='templateParams.Inbound.loadUrl'
             :downxlsx='templateParams.Inbound.downxlsx'
             :desc='templateParams.Inbound.desc'
             :type='templateParams.Inbound.type'></upload-template>
        </TabPane>
        <TabPane label="财务数据要素" name = "name8">
            <Finance />
        </TabPane>
         
    </Tabs>
  </div>
</template>
<script>
    import uploadTemplate from './components/index'
    
    import interfaceUrl from '@/api/interfaceUrl'
   
    import Finance from "@/components/ERP/finance";
    export default {
        name:'ERPInformationUpload',
        data(){
            return{
                selectName:"name1",
                  templateParams:{
                       agreements:{
                        title:'框架协议',
                        loadUrl:interfaceUrl.AgreementExcel,
                        downxlsx:'/excel/ScheduleAgreement.xlsx',
                        desc:'框架协议:买卖双方就长期合作进行国际贸易签订的正式框架合同。(签订此类协议后传输)',
                        type:'ScheduleAgreement'
                    },
                    contract:{
                        title:'单次合同',
                        loadUrl:interfaceUrl.ContractExcel,
                        downxlsx:'/excel/Contract.xlsx',
                        desc:'单次合同:买卖双方就单次进口货物签订的正式合同。(签订此类合同后传输)',
                        type:'Contract'
                    },
                    order:{
                         title:'订单信息',
                        loadUrl:interfaceUrl.PurchaseOrderExcel,
                        downxlsx:'/excel/PurchaseOrder.xlsx',
                        desc:'采购订单:向卖方发送的正式订货单据。(订单向卖方发送后传输)',
                        type:'PurchaseOrde'

                    },
                    Invoice:{
                        title:'发票信息',
                        loadUrl:interfaceUrl.SalesInvoiceExcel,
                        downxlsx:'/excel/SalesInvoice.xlsx',
                        desc:'发票信息:货物商业正式发票。(卖方出具正本发票后传输)',
                        type:'SalesInvoice',
                        isPDF:true,
                        routerLink:'/Billpdf' 
                    },
                    SellerPkg:{
                        title:'装货数据',
                        loadUrl:interfaceUrl.SellerPkgExcel,
                        downxlsx:'/excel/PackingListOrMaterialList.xlsx',
                        desc:'装货数据:货物正式装箱清单。(卖方出具正本装箱单后传输)',
                        type:'SellerPacking',
                        isPDF:true,
                        routerLink:'/trunkpdf'
                    },
                    Inbound:{
                         title:'到货数据',
                        loadUrl:interfaceUrl.InboundExcel,
                        downxlsx:'/excel/InboundDelivery.xlsx',
                        desc:'到货数据:货物抵达买方仓库进行清点并入库的货物信息。(到达公司仓库后传输)',
                        type:'Inbound'
                    },
                     wuliao:{
                        title:'物料主数据',
                        loadUrl:interfaceUrl.MaterialRelationExcel,
                        downslsx:'/excel/MaterialRelation.xlsx'
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
