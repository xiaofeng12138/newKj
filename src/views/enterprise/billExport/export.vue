<template>
    <div>
        <h1>提单导出</h1>
        <Row class="queryItem" >
            <!-- <Button size='large' style="width: 200px" type="primary" long @click="exportFun">导出</Button> -->
        </Row>
        <!--<Table :columns="columnsBillNo"-->
        <!--:data="dataBillNo"></Table>-->
    </div>
</template>

<script>
    import interfaceUrl from '@/api/interfaceUrl'
    import { publicInter,filedownload } from '@/api/http'
    export default {
        name: "export",
        data(){
            return{
                columnsBillNo: [
                    {
                        title: '提单号',
                        key: 'BILL_NO',
                    },
                    {
                        title: '船名',
                        key: 'VSL_NME'
                    },
                    {
                        title: '航次',
                        key: 'ARR_EXT_VOY_REF',
                        width: 150
                    },
                    {
                        title: '预计到港时间',
                        key: 'BERTH_ARR_DT_GMT'
                    },
                    {
                        title: '当前状态',
                        key: 'statusFront'
                    },
                    {
                        title: '当前状态时间',
                        key: 'REC_UPD_DT'
                    }
                ],
                dataBillNo:[]
            }
        },
        methods:{
            exportFun(){
                this.$Spin.show();
                filedownload(interfaceUrl.donlowDataList,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', "提单数据下载.xls")

                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    this.$Spin.hide();
                })
                // publicInter(interfaceUrl.donlowDataList,{}).then(res=>{
                //     if(res){
                //         if(res.code==='500'||res.code==='400' || res.isok == 'false'){
                //             this.$Message.error(res.msg)
                //         }else{
                //
                //         }
                //     }
                // })
            }
        }
    }
</script>

<style rel="stylesheet/scss"  lang="scss" scoped>
    .queryItem{
        margin: 20px 0 0 0;
        padding-bottom: 20px;
    }
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
</style>