<template>
    <div style="padding:5px">
        <div style="width:300px;margin-bottom:20px">
            <vague @billNoVal='billValue' :url='url' />
        </div>
        <div>
            <upload :header='"PDF"' ref='file'  :fileSize='fileSize' :fileType='"pdf"' :interType='type' />
        </div>
    </div>
    
</template>
<script>
import vague from './vague'
import upload from '../uploadFile/upload'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:['type'],
    components:{
        vague,
        upload
    },
    data(){
        return{
            fileSize:10240,
            billNo:'',
            url:''
        }
    },
    created(){
        this.url=interfaceUrl.queryBillnumList

    },
    methods:{
        billValue(val){
            this.$refs.file.billno=val
            
        }
         
           
    }
    
}
</script>
<style lang="scss" scoped>

</style>
