<template>
    <div>
        <h1 style="border-bottom:1px solid #ececec;padding-bottom:20px">物料主数据</h1>
         <Tabs value="name1">
           <TabPane label="物料数据上传" name='name1'>
             <upload-template :title='templateParams.wuliao.title'
             :loadUrl='templateParams.wuliao.loadUrl'
             :downxlsx='templateParams.wuliao.downslsx'></upload-template>
            </TabPane>
            <TabPane label="物料数据查询">
                <materiel/>
            </TabPane>
    </Tabs>
    </div>    
</template>
<script>
import materiel from './index'
import uploadTemplate from '../uploadFile/index'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{
        materiel,
        uploadTemplate
    },
    data(){
        return{
            templateParams:{
                 wuliao:{
                    title:'物料主数据',
                    loadUrl:interfaceUrl.MaterialRelationExcel,
                    downslsx:'http://tradeportal.lines.coscoshipping.com/excel/MaterialRelation.xlsx'
                }
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>
