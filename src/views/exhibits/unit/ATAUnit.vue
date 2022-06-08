<template>
    <div class="myExhibitorUnit" v-if="modelFlag">
        <h3>ATA单证册</h3>
        <span class="closeBtn" @click="closeWin">×</span>
        <Row class="ivu-first-row">
            <Col span="4" class="title">单证册号</Col>
            <Col span="4" class="content">{{ ATAHead.CARNET_NO }}</Col>
            <Col span="4" class="title">凭证号</Col>
            <Col span="4" class="content">{{ ATAHead.COUNTERFOIL_NO }}</Col>
            <Col span="4" class="title">归档号</Col>
            <Col span="4" class="content">{{ ATAHead.FILE_NO}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">进出境口岸</Col>
            <Col span="4" class="content">{{ ATAHead.I_E_PORT}}</Col>
            <Col span="4" class="title">过境出境口岸</Col>
            <Col span="4" class="content">{{ ATAHead.T_E_PORT}}</Col>
            <Col span="4" class="title">途经的国家代码</Col>
            <Col span="4" class="content">{{  ATAHead.PASS_COUNTRY_CODE}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">来自前往国家</Col>
            <Col span="4" class="content">{{ ATAHead.I_E_COUNTRY_CODE }}</Col>
            <Col span="4" class="title">货物用途</Col>
            <Col span="4" class="content">{{ ATAHead.INTENTED_USE}}</Col>
            <Col span="4" class="title">签注人</Col>
            <Col span="4" class="content">{{ ATAHead.VISA_ER}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">签注日期</Col>
            <Col span="4" class="content">{{ ATAHead.VISA_DATE}}</Col>
            <Col span="4" class="title">有效日期</Col>
            <Col span="4" class="content">{{ ATAHead.VALID_DATE }}</Col>
            <Col span="4" class="title">进出境日期</Col>
            <Col span="4" class="content">{{ ATAHead.I_E_DATE}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">海关签注状态</Col>
            <Col span="4" class="content">{{ ATAHead.VISA_EXE_MARK}}</Col>
            <Col span="4" class="title">签注地海关</Col>
            <Col span="4" class="content">{{ ATAHead.DECLARATION_PORT}}</Col>
            <Col span="4" class="title">持证人</Col>
            <Col span="4" class="content">{{ ATAHead.HOLDER_NAME_EN}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">续签/延期次数</Col>
            <Col span="4" class="content">{{ ATAHead.EXTEND_ADDITIONAL_TIMES }}</Col>
            <Col span="4" class="title">核销原因</Col>
            <Col span="4" class="content">{{ ATAHead.VERIFICATION_REASON}}</Col>
            <Col span="4" class="title">携带方式</Col>
            <Col span="4" class="content">{{ ATAHead.CARRY_MEANS }}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">运输方式</Col>
            <Col span="4" class="content">{{ ATAHead.TRANSPORT_MEANS }}</Col>
            <Col span="4" class="title">总件数</Col>
            <Col span="4" class="content">{{ ATAHead.PACKAGE_COUNT}}</Col>
            <Col span="4" class="title">总重量</Col>
            <Col span="4" class="content">{{ ATAHead.GROSS_WEIGHT}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">申报总价</Col>
            <Col span="4" class="content">{{ ATAHead.DECLARE_TOTAL_PRICE}}</Col>
            <Col span="4" class="title">船名</Col>
            <Col span="4" class="content">{{ ATAHead.TRAFFIC_NAME}}</Col>
            <Col span="4" class="title">运输工具航次（班）号</Col>
            <Col span="4" class="content">{{ ATAHead.VOYAGE_NO}}</Col>
        </Row>
        <Row>
            <Col span="4" class="title">提运单号</Col>
            <Col span="4" class="content">{{ ATAHead.BILL_NO}}</Col>
            <Col span="4" class="title">申请人</Col>
            <Col span="4" class="content">{{ ATAHead.DECLARER_NAME}}</Col>
            <Col span="4" class="title"></Col>
            <Col span="4" class="content"></Col>
        </Row>
        <h3 style="padding-top:10px;margin-top:20px;border-top:1px solid #0037B2;">ATA表体</h3>
        <Table :columns="columnsAta" :data="dataATA" ></Table>
    </div>
</template>
<script>
export default {
    props:['ATAHead','dataATA','modelFlag'],
    data(){
        return{
            totalNumber:0,
            columnsAta:[
                {
                    title: '商品序列号',
                    key: 'COUNTERFOIL_NO',
                    align:'center',
                    width:70
                },
                {
                    title: '商品名称',
                    key: 'NAME',
                    align:'center',
                    render:(h,params)=> {
                        let val = params.row.NAME;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    }
                },
                {
                    title: '商品英文名称',
                    key: 'NAME_EN',
                    align:'center',
                    render:(h,params)=> {
                        let val = params.row.NAME_EN;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    }
                },
                {
                    title: '原产国编码',
                    key: 'ORGINIAL_COUNTRY_CODE',
                    align:'center'
                },
                {
                    title: '申报数量',
                    key: 'DECLARE_QUANTITY',
                    align:'center'
                },
                {
                    title: '计量单位',
                    key: 'DECLARE_UNIT_CODE',
                    align:'center'
                },
                {
                    title: '重量（千克）',
                    key: 'NET_WEIGHT',
                    align:'center'
                },
                {
                    title: '成交币制',
                    key: 'TRADE_CURRENCY_CODE',
                    align:'center'
                },
                {
                    title: '申报单价',
                    key: 'DECLARE_PER_PRICE',
                    align:'center'
                },
                {
                    title: '申报总价',
                    key: 'DECLARE_TOTAL_PRICE',
                    align:'center'
                },
            ],
        }
        
    },
    methods:{
        closeWin(){
            this.$emit('myCloseWin',"ataModel");
        }
    }
}
</script>
<style scoped rel="stylesheet/css">
</style>