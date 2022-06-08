<template>
    <div class="myExhibitorUnit" v-if="modelFlag">
        <span class="closeBtn" @click="closeWin" style="right:24px">×</span>
        <h3 style="padding-bottom:10px;margin-top:0;border-bottom:1px solid #0037B2;">保税展示交易出区单</h3>
        <div style="height:calc(100% - 60px);overflow:auto;padding-bottom:20px">
            <Table :columns="columnsBond" :data="dataBond" width='2200' style="margin-bottom:20px;"></Table>  
        </div>
        
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:['modelFlag'],
    data(){
        return{
            totalNumber:0,
            columnsBond:[
                {
                    title: '关区代码',
                    key: 'CUSTOMSCODE',
                    align:'center',
                    width:70
                },
                {
                    title: '证明函编号',
                    key: 'CERTIFICATENO',
                    align:'center',
                    width:170
                },
                {
                    title: '单号',
                    key: 'BILLNO',
                    align:'center',
                    width:180
                },
                {
                    title: '序号',
                    key: 'GNO',
                    align:'center',
                    width:50
                },
                {
                    title: '企业代码',
                    key: 'TRADECODE',
                    align:'center',
                    width:150
                },
                {
                    title: '企业名称',
                    key: 'TRADENAME',
                    align:'center',
                    render:(h,params)=> {
                        let val = params.row.TRADENAME;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    },
                    width:150
                },
                {
                    title: '出区时间',
                    key: 'KKTIME',
                    align:'center',
                    width:110
                },
                {
                    title: 'Hscode',
                    key: 'HSCODE',
                    align:'center',
                    width:150
                },
                {
                    title: '品名',
                    key: 'GNAME',
                    align:'center',
                    width:160,
                    render:(h,params)=> {
                        let val = params.row.GNAME;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    },
                },
                {
                    title: '规格型号',
                    key: 'GMODEL',
                    align:'center',
                    width:100
                },
                {
                    title: '数量',
                    key: 'QTY',
                    align:'center',
                    width:100
                },
                {
                    title: '单位',
                    key: 'UNIT',
                    align:'center',
                    width:80
                },
                {
                    title: '单价',
                    key: 'PRICE',
                    align:'center',
                    width:80
                },
                {
                    title: '币制',
                    key: 'CURR',
                    align:'center',
                    width:80
                },
                {
                    title: '毛重',
                    key: 'GWEIGHT',
                    align:'center',
                    width:80
                },
                {
                    title: '净重',
                    key: 'NWEIGHT',
                    align:'center',
                    width:80
                },
                {
                    title: '原产国',
                    key: 'COUNTRY',
                    align:'center',
                    width:80
                },
                {
                    title: '美元货值',
                    key: 'USDMONEY',
                    align:'center',
                    width:150
                },
                {
                    title: '备注',
                    key: 'NOTES',
                    align:'center',
                    width:150,
                    render:(h,params)=> {
                        let val = params.row.NOTES;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    },
                },
            ],
            dataBond:[]
        }
        
    },
    methods:{
        closeWin(){
            this.$emit('myCloseWin',"bondModel");
        },
        query(params){
            let request={
                billno:params
            }
            publicInter(interfaceUrl.queryDeliverOut,request).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.dataBond = r.head;
                        this.$emit('myOpenWin',"bondModel");
                    }
                    else{
                        this.$Modal.error({content:r.data});
                    }
                }
            });
        }
    }
}
</script>
<style scoped rel="stylesheet/css">
</style>