<template>
    <div>
        <h1 style="padding-bottom:20px;border-bottom:1px solid #ececec">{{title}}PDF</h1>
        <Tabs value="name1">
            <TabPane label="PDF上传" name="name1">
                 <PDFUP :type='fileType' />
            </TabPane>
            <TabPane label="PDF查看" name="name2">
                <lookUp :type='fileType' @pdfShow='lookUp' />
            </TabPane>
        </Tabs>
         <pdfView ref="pdf" />
    </div>    
</template>
<script>
import PDFUP from './pdfUp'
import lookUp from './pdfLookUp'
import pdfView from '../../ERPQuery/components/PDFView'
export default {
    props:{
        title:{
            type:String,
            required:true,
        },
        fileType:{
            type:String,
            required:true
        }
    },
    components:{
        PDFUP,lookUp,pdfView
    },
    methods:{
        lookUp(data){
            this.$refs.pdf.isShow=true
            this.$refs.pdf.showPDF(data)
        }
    }

    
}
</script>
<style lang="scss" scoped>

</style>
