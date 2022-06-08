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
            title:'装货',
            fileType:'paking'
        }
    }
    
}
</script>