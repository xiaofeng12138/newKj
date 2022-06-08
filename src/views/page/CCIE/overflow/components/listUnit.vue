<template>
    <div class="myExhibitorUnit" v-if="modelFlag.show">
        <h1 style="text-align:center;margin-bottom:20px;">展览品申报清单</h1>
        <span class="closeBtn" @click="closeWin">×</span>
        <p class="myTitle">
            <span style="width:180px;">申报清单预录入号：</span>
            <span>{{ customHead.PRE_DECL_NO}}</span>
            <span style="width:180px;">申报清单编号:</span>
            <span>{{ customHead.DECL_NO}}</span>
        </p>
        <Row  class="ivu-first-row">
            <Col span="2" class="title">主管海关</Col>
            <Col span="4" class="content">{{ customHead.MASTER_CUSTOMS }}</Col>
            <Col span="2" class="title">口岸代码</Col>
            <Col span="4" class="content">{{ customHead.I_E_PORT }}</Col>
            <Col span="2" class="title">进出口标志</Col>
            <Col span="4" class="content">{{ customHead.I_E_FLAG}}</Col>
            <Col span="2" class="title">进出口日期</Col>
            <Col span="4" class="content">{{ customHead.I_E_DATE }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">展览会名称</Col>
            <Col span="6" class="content">{{ customHead.EGS_NAME }}</Col>
            <Col span="2" class="title">展览会编号</Col>
            <Col span="6" class="content">{{ customHead.EGS_NO }}</Col>
            <Col span="2" class="title">行政许可清单编号</Col>
            <Col span="6" class="content">{{ customHead.ADM_NO }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">申报日期</Col>
            <Col span="4" class="content">{{ customHead.DECLARE_DATE }}</Col>
            <Col span="3" class="title">申报单位代码/名称</Col>
            <Col span="7" class="content">{{ customHead.AGENT_CODE+"/"+customHead.AGENT_NAME }}</Col>
            <Col span="2" class="title">成交方式</Col>
            <Col span="2" class="content">{{ customHead.TRANS_MODE }}</Col>
            <Col span="2" class="title">运输方式</Col>
            <Col span="2" class="content">{{ customHead.TRAF_MODE }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">提运单号</Col>
            <Col span="4" class="content">{{ customHead.BILL_NO }}</Col>
            <Col span="2" class="title">件数</Col>
            <Col span="4" class="content">{{ customHead.PACK_NO }}</Col>
            <Col span="2" class="title">毛重</Col>
            <Col span="2" class="content">{{ customHead.GROSS_WT }}</Col>
            <Col span="2" class="title">净重</Col>
            <Col span="2" class="content">{{ customHead.NET_WT }}</Col>
            <Col span="2" class="title">启运国</Col>
            <Col span="2" class="content">{{ customHead.TRADE_COUNTRY }}</Col>
        </Row>

        <Row>
            <Col span="2" class="title">随附单号</Col>
            <Col span="10" class="content">{{ customHead.LICENSE_NO }}</Col>
            <Col span="2" class="title">备注</Col>
            <Col span="10" class="content">{{ customHead.NOTES }}</Col>
        </Row>
        <Row style="margin:40px 0 0 0;" class="ivu-first-row">
            <Col span="2" class="title">展商名称</Col>
            <Col span="4" class="content">{{ customHead.MERCHANT_NAME }}</Col>
            <Col span="2" class="title">展商国别</Col>
            <Col span="4" class="content">{{ customHead.MERCHANT_COUNTRY }}</Col>
            <Col span="2" class="title">展馆号</Col>
            <Col span="4" class="content">{{ customHead.EXHIBITION_NO }}</Col>
            <Col span="2" class="title">展位号</Col>
            <Col span="4" class="content">{{ customHead.EXHIBITION_SITE_NO }}</Col>
        </Row>
        
        <Table :columns="columnsCustom" :data="dataCustom" ></Table>  
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:['listCustomID','modelFlag'],
    data(){
        return {
            customHead:{},
            columnsCustom:[
                {
                    title: '序号',
                    key: 'G_NO',
                    align:'center',
                    width:50
                },
                {
                    title: '商品编码',
                    key: 'CODE_TS',
                    align:'center',
                },
                {
                    title: '商品名称',
                    key: 'G_NAME',
                    align:'center',
                },
                {
                    title: '规格型号',
                    key: 'G_MODEL',
                    align:'center',
                },
                {
                    title: '数量',
                    key: 'DECL_QTY',
                    align:'center',
                },
                {
                    title: '单位',
                    key: 'DECL_UNIT',
                    align:'center',
                },
                {
                    title: '单价',
                    key: 'DECL_PRICE',
                    align:'center',
                },
                {
                    title: '总价',
                    key: 'DECL_TOTAL',
                    align:'center',
                },
                {
                    title: '币制',
                    key: 'TRADE_CURR',
                    align:'center',
                },
                {
                    title: '原产国',
                    key: 'ORIGIN_COUNTRY',
                    align:'center',
                },
                {
                    title: '证件代码',
                    key: 'G_CERT_FLAG',
                    align:'center',
                },
            ],
            dataCustom:[]
        }
    },
    methods:{
        closeWin(){
            this.modelFlag.show = false;
        },
        query(params){
            let request={
                entryId:params
            }
            publicInter(interfaceUrl.getListByEntryId,request).then(r=>{
                if(r){
                    console.log(r)
                    if(r.code === '200' || r.code === 200){
                        console.log(r.data);
                        this.customHead = r.data[0];
                        this.dataCustom = r.data;
                        this.$emit('myOpenWin',"customModel");
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
<style scoped rel="stylesheet/scss" lang="scss">
.myTitle{
    span{
        display: inline-block;
        width: 30%;
    }
}
</style>