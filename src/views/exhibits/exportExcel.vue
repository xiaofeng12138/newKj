<template>
    <div>
        <h1>物资证明函文件上传</h1>
        <upload-template :title='templateParams.title'
                         :loadUrl='templateParams.loadUrl'
                         :downxlsx='templateParams.downxlsx'></upload-template>
    </div>

</template>

<script>
    import uploadTemplate from '@/components/uploadFile/index';
    export default {
        name: "exportExcel",
        data(){
            return{
                data1 : [],
                templateParams:{
                    title:"证明函文件",
                    loadUrl : "/importExpo/uploadExcelExpo",
                    downxlsx : "/excel/ImportExpoCertificate.xlsx"
                }
            }
        },
        components:{
            uploadTemplate
        }
    }
</script>

<style scoped>

</style>