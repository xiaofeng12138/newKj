<template>
<div>
<!--<h1>-->
    <!--财务数据上传-->
<!--</h1>-->
 <upload-template :title='templateParams.finance.title' 
             :loadUrl='templateParams.finance.loadUrl'
             :downxlsx='templateParams.finance.downxlsx'
             :desc='templateParams.finance.desc'
             :type='templateParams.finance.type'></upload-template>
</div>
    
</template>
<script>
import uploadTemplate from '../uploadFile/index'
  import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{
        uploadTemplate
    },
    data(){
        return{
            templateParams:{
                finance:{
                    title:'财务数据',
                    downxlsx:'/excel/Finance.xlsx',
                    loadUrl:interfaceUrl.FinanceExcel,
                    desc:'财务数据:企业对外付汇的相关信息。',
                    type:'CompanyFinance'
                }
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
    h1{
        padding-bottom: 16px;
        border-bottom: 1px solid #ececec;
        margin-bottom: 16px;
    }
</style>


