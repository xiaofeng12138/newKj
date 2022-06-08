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
        <TabPane label="销售订单要素" name = "name9">
            <upload-template :title='templateParams.SellerOrder.title' 
             :loadUrl='templateParams.SellerOrder.loadUrl'
             :downxlsx='templateParams.SellerOrder.downxlsx'
             :desc='templateParams.SellerOrder.desc'
             :type='templateParams.SellerOrder.type'></upload-template>
        </TabPane>
        <TabPane label="发票信息要素" name = "name4">
             <!-- <bill />  -->
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
            <!-- <ldg/> -->
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
            <!-- <notice/> -->
        </TabPane>
        <TabPane label="财务数据要素" name = "name8">
            <Finance />
        </TabPane>
        <TabPane label="保税移库要素" name = "name10">
            <upload-template :title='templateParams.TransferWarehouse.title' 
             :loadUrl='templateParams.TransferWarehouse.loadUrl'
             :downxlsx='templateParams.TransferWarehouse.downxlsx'
             :desc='templateParams.TransferWarehouse.desc'
             :type='templateParams.TransferWarehouse.type'></upload-template>
        </TabPane>
        <TabPane label="保税出库要素" name = "name11">
            <upload-template :title='templateParams.OutWarehouse.title' 
             :loadUrl='templateParams.OutWarehouse.loadUrl'
             :downxlsx='templateParams.OutWarehouse.downxlsx'
             :desc='templateParams.OutWarehouse.desc'
             :type='templateParams.OutWarehouse.type'></upload-template>
        </TabPane>
        <TabPane label="保税出门要素" name = "name12">
            <upload-template :title='templateParams.BondedOut.title' 
             :loadUrl='templateParams.BondedOut.loadUrl'
             :downxlsx='templateParams.BondedOut.downxlsx'
             :desc='templateParams.BondedOut.desc'
             :type='templateParams.BondedOut.type'></upload-template>
        </TabPane>
         <TabPane label="物料商品对应关系要素" name = "name13">
            <upload-template :title='templateParams.MergerRelation.title' 
             :loadUrl='templateParams.MergerRelation.loadUrl'
             :downxlsx='templateParams.MergerRelation.downxlsx'
             :desc='templateParams.MergerRelation.desc'
             :type='templateParams.MergerRelation.type'></upload-template>
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
                    SellerOrder:{
                         title:'销售订单信息',
                        loadUrl:interfaceUrl.SellerOrderExcel,
                        downxlsx:'/excel/CNSellerOrder.xlsx',
                        desc:'销售订单:向买方发生的正式销售数据。(中方企业出口业务提供)',
                        type:'SellerOrder'

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
                    },
                    TransferWarehouse:{
                        title:'保税移库数据',
                        loadUrl:interfaceUrl.TransferWarehouseExcel,
                        downxlsx:'/excel/TransferWarehouse.xlsx',
                        desc:'保税移库数据:移库数据（只采集保税仓库之间的货物移库数据或货物保税性质发生变化的数据）',
                        type:'TransferWarehouse'
                    },
                    OutWarehouse:{
                         title:'保税出库数据',
                        loadUrl:interfaceUrl.OutWarehouseExcel,
                        downxlsx:'/excel/OutWarehouse.xlsx',
                        desc:'保税出库数据:',
                        type:'OutWarehouse'
                    },
                    BondedOut:{
                        title:'保税出门数据',
                        loadUrl:interfaceUrl.BondedOutExcel,
                        downxlsx:'/excel/BondedOut.xlsx',
                        desc:'保税出门数据:保税出门数据（特殊区域业务，适用于卡口业务）',
                        type:'BondedOut'
                    },
                    MergerRelation:{
                        title:'物料商品对应关系',
                        loadUrl:interfaceUrl.MergerRelationExcel,
                        downxlsx:'/excel/MargeRelation.xlsx',
                        desc:'物料商品对应关系要素:。。。',
                        type:'MergerRelation'
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
