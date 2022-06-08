<template>

    <div>
        <PdfBase :title='title' :fileType='fileType' />
    </div>
    
</template>
<script>
import PdfBase from './index'
export default {
    components:{
        PdfBase
    },
    data(){
        return{
            title:'发票',
            fileType:'invoice'
        }
    }
    
}
</script>
