<template>
    <div>
        <h1 style='padding-bottom:20px;border-bottom:1px solid #ececec'>文件上传</h1>
        <Tabs v-model='selectName'>
            <TabPane label="单次合同要素" name = "name1">
                <upload-template :title='templateParams.contract.title' 
                :loadUrl='templateParams.contract.loadUrl'
                :downxlsx='templateParams.contract.downxlsx'
                :desc='templateParams.contract.desc'
                :type='templateParams.contract.type'></upload-template>
            </TabPane>
            <TabPane label="采购订单要素" name = "name2">
                <upload-template :title='templateParams.order.title' 
                :loadUrl='templateParams.order.loadUrl'
                :downxlsx='templateParams.order.downxlsx'
                :desc='templateParams.order.desc'
                :type='templateParams.order.type'></upload-template>
        </TabPane>
        </Tabs>
    </div>    
</template>
<script>
import uploadTemplate from '@/components/uploadFile/index'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{
        uploadTemplate
    },
    data(){
        return{
            selectName:'name1',
            templateParams:{
                 contract:{
                        title:'单次合同',
                        loadUrl:interfaceUrl.uploadContractExcel,
                        downxlsx:'http://tradeportal.lines.coscoshipping.com/expo/Contract.xlsx',
                        desc:'单次合同:买卖双方就单次进口货物签订的正式合同。(签订此类合同后传输)',
                        type:'Contract'
                    },
                    order:{
                         title:'订单信息',
                        loadUrl:interfaceUrl.uploadPurchaseOrderExcel,
                        downxlsx:'http://tradeportal.lines.coscoshipping.com/expo/PurchaseOrder.xlsx',
                        desc:'采购订单:向卖方发送的正式订货单据。(订单向卖方发送后传输)',
                        type:'PurchaseOrde'

                    },
            }

        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>
