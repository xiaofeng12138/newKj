<template>
    <div class="myExhibitorUnit" v-if="modelFlag">
        <h3>报关单头</h3>
        <span class="closeBtn" @click="closeWin">×</span>
        <Row  class="ivu-first-row">
            <Col span="2" class="title">报关单号</Col>
            <Col span="4" class="content">{{ customHead.ENTRY_ID }}</Col>
            <Col span="2" class="title">预录入号</Col>
            <Col span="4" class="content">{{ customHead.PRE_ENTRY_ID }}</Col>
            <Col span="2" class="title">进出口</Col>
            <Col span="4" class="content">{{ Flag(customHead.I_E_FLAG)}}</Col>
            <Col span="2" class="title">进出口岸</Col>
            <Col span="4" class="content">{{ customHead.I_E_PORT_CNAME }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">申报单位名称</Col>
            <Col span="4" class="content">{{ customHead.AGENT_NAME }}</Col>
            <Col span="2" class="title">申报单位代码</Col>
            <Col span="4" class="content">{{ customHead.AGENT_CODE }}</Col>
            <Col span="2" class="title">申报日期</Col>
            <Col span="4" class="content">{{ customHead.D_DATE }}</Col>
            <Col span="2" class="title">申报口岸</Col>
            <Col span="4" class="content">{{ customHead.DECL_PORT_CNAME }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">经营单位名称</Col>
            <Col span="4" class="content">{{ customHead.TRADE_NAME }}</Col>
            <Col span="2" class="title">经营单位代码</Col>
            <Col span="4" class="content">{{ customHead.TRADE_CO }}</Col>
            <Col span="2" class="title">进出口日期</Col>
            <Col span="4" class="content">{{ customHead.I_E_DATE }}</Col>
            <Col span="2" class="title">贸易国别/地区</Col>
            <Col span="4" class="content">{{ customHead.TRADE_COUNTRY }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">货主单位名称</Col>
            <Col span="4" class="content">{{ customHead.OWNER_NAME }}</Col>
            <Col span="2" class="title">货主单位代码</Col>
            <Col span="4" class="content">{{ customHead.OWNER_CODE }}</Col>
            <Col span="2" class="title">货主单位地区</Col>
            <Col span="4" class="content">{{ customHead.DISTRICT_CODE }}</Col>
            <Col span="2" class="title">指/抵运港</Col>
            <Col span="4" class="content">{{ customHead.DESTINATION_PORT }}</Col>
        </Row>

        <Row>
            <Col span="2" class="title">许可证</Col>
            <Col span="2" class="content">{{ customHead.LICENSE_NO }}</Col>
            <Col span="2" class="title">运输方式</Col>
            <Col span="2" class="content">{{ customHead.TRAF_MODE }}</Col>
            <Col span="2" class="title">毛重（公斤）</Col>
            <Col span="2" class="content">{{ customHead.GROSS_WT }}</Col>
            <Col span="2" class="title">监管方式</Col>
            <Col span="2" class="content">{{ customHead.TRADE_MODE_CNAME }}</Col>
            <Col span="2" class="title">件数</Col>
            <Col span="2" class="content">{{ customHead.PACK_NO }}</Col>
            <Col span="2" class="title">修改次数</Col>
            <Col span="2" class="content">{{ customHead.MODI_NO }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">包装种类</Col>
            <Col span="2" class="content">{{ customHead.WRAP_TYPE_CNAME }}</Col>
            <Col span="2" class="title">报关单类型</Col>
            <Col span="2" class="content">{{ customHead.ENTRY_TYPE }}</Col>
            <Col span="2" class="title">运输工具名称</Col>
            <Col span="2" class="content">{{ customHead.TRAF_NAME }}</Col>
            <Col span="2" class="title">净重（公斤）</Col>
            <Col span="2" class="content">{{ customHead.NET_WT }}</Col>
            <Col span="2" class="title">成交方式</Col>
            <Col span="2" class="content">{{ customHead.TRANS_MODE_CNAME }}</Col>
            <Col span="2" class="title">审价差额幅度</Col>
            <Col span="2" class="content">{{ customHead.PRICE_RANGE }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">航次（班）号</Col>
            <Col span="2" class="content">{{ customHead.VOYAGE_NO }}</Col>
            <Col span="2" class="title">征免性质</Col>
            <Col span="2" class="content">{{ customHead.CUT_MODE_CNAME }}</Col>
            <Col span="2" class="title">提运单号</Col>
            <Col span="2" class="content">{{ customHead.BILL_NO }}</Col>
            <Col span="2" class="title">收结汇方式</Col>
            <Col span="2" class="content">{{ customHead.PAY_WAY }}</Col>
            <Col span="2" class="title">合同号</Col>
            <Col span="2" class="content">{{ customHead.CONTR_NO }}</Col>
            <Col span="2" class="title">手册号码</Col>
            <Col span="2" class="content">{{ customHead.MANUAL_NO }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">内销比率</Col>
            <Col span="2" class="content">{{ customHead.IN_RATIO }}</Col>
            <Col span="2" class="title">标准箱数</Col>
            <Col span="2" class="content">{{ customHead.CONTAINER_NO }}</Col>
            <Col span="2" class="title">运费标记</Col>
            <Col span="2" class="content">{{ customHead.FEE_MARK }}</Col>
            <Col span="2" class="title">运费币值</Col>
            <Col span="2" class="content">{{ customHead.FEE_CURR }}</Col>
            <Col span="2" class="title">运费／率</Col>
            <Col span="2" class="content">{{ customHead.FEE_RATE }}</Col>
            <Col span="2" class="title">保险费标记</Col>
            <Col span="2" class="content">{{ customHead.INSUR_MARK }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">杂费标记</Col>
            <Col span="2" class="content">{{ customHead.OTHER_MARK }}</Col>
            <Col span="2" class="title">杂费币制</Col>
            <Col span="2" class="content">{{ customHead.OTHER_CURR }}</Col>
            <Col span="2" class="title">杂费／率</Col>
            <Col span="2" class="content">{{ customHead.OTHER_RATE }}</Col>
            <Col span="2" class="title">结汇证号</Col>
            <Col span="2" class="content">{{ customHead.APPR_NO }}</Col>
            <Col span="2" class="title">保险费币制</Col>
            <Col span="2" class="content">{{ customHead.INSUR_CURR }}</Col>
            <Col span="2" class="title">保险费／率</Col>
            <Col span="2" class="content">{{ customHead.INSUR_RATE }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">纳税义务人识别号</Col>
            <Col span="2" class="content">{{ customHead.TAXY_RG_NO }}</Col>
            <Col span="2" class="title">关联报关单</Col>
            <Col span="2" class="content">{{ customHead.RELATIVE_ID}}</Col>
            <Col span="2" class="title">保税/监管仓号</Col>
            <Col span="2" class="content">{{ customHead.BONDED_NO }}</Col>
            <Col span="2" class="title">滞报天数</Col>
            <Col span="2" class="content">{{ customHead.DELAY_DAYS }}</Col>
            <Col span="2" class="title">滞报金额</Col>
            <Col span="2" class="content">{{ customHead.DELAY_ACCOUNT }}</Col>
            <Col span="2" class="title">经营单位性质</Col>
            <Col span="2" class="content">{{ customHead.CO_OWNER }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">申报方式</Col>
            <Col span="2" class="content">{{ edi(customHead.EDI_ID) }}</Col>
            <Col span="2" class="title">报关员代码</Col>
            <Col span="2" class="content">{{ customHead.DECLARE_NO }}</Col>
            <Col span="2" class="title">码头/货场</Col>
            <Col span="2" class="content">{{ customHead.CUSTOMS_FIELD }}</Col>
            <Col span="2" class="title">打印日期</Col>
            <Col span="2" class="content">{{ customHead.P_DATE }}</Col>
            <Col span="2" class="title">关联备案号</Col>
            <Col span="2" class="content">{{ customHead.RELATIVE_MANUAL_NO }}</Col>
            <Col span="2" class="title">涉案标志</Col>
            <Col span="2" class="content">{{ customHead.SPECIAL_FLAG }}</Col>
        </Row>
        <Row>
            <Col span="2" class="title">备注</Col>
            <Col span="22" class="content">{{ customHead.NOTE_S }}</Col>
        </Row>
        <h3 style="padding-top:10px;margin-top:20px;border-top:1px solid #0037B2;">报关单体</h3>
        <Table :columns="columnsCustom" :data="dataCustom" ></Table>  
        <p style="width:100%;text-align:center;margin-top:20px;">
            <Button style="background:transparent;color:#fff;" @click="lookList">查看展览品申报清单</Button>
        </p>
        <list-unit :modelFlag='listShow' :listCustomID='customID' ref = 'listChild'></list-unit>
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import listUnit from './listUnit'

import waterMark from '@/until/watermark.js'
import {getCookie} from '@/until/getToken'

export default {
    props:['customID','modelFlag'],
    components:{listUnit},
    data(){
        return{
            totalNumber:0,
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
                    align:'center'
                },
                {
                    title: '规格型号',
                    key: 'G_MODEL',
                    align:'center',
                    render:(h,params)=> {
                        let val = params.row.G_MODEL;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    }
                },
                {
                    title: '产销国',
                    key: 'ORIGIN_COUNTRY_CNAME',
                    align:'center'
                },
                {
                    title: '申报单价',
                    key: 'DECL_PRICE',
                    align:'center'
                },
                {
                    title: '申报总价',
                    key: 'DECL_TOTAL',
                    align:'center'
                },
                {
                    title: '成交币制',
                    key: 'TRADE_CURR_CNAME',
                    align:'center'
                },
                {
                    title: '申报数量',
                    key: 'G_QTY',
                    align:'center'
                },
                {
                    title: '申报计量单位',
                    key: 'G_UNIT_CNAME',
                    align:'center'
                },
                {
                    title: '统计人民币价',
                    key: 'RMB_PRICE',
                    align:'center'
                },
                {
                    title: '统计美元价',
                    key: 'USD_PRICE',
                    align:'center'
                },
                {
                    title: '第一(法定)数量',
                    key: 'QTY_1',
                    align:'center'
                },
                {
                    title: '第一(法定)计量单位',
                    key: 'UNIT_1_CNAME',
                    align:'center'
                },
            ],
            dataCustom:[],
            customHead:{},
            listShow:{show:false},
            entryId:""
        }
        
    },
    methods:{
        //进出口标志”I”-进口，”E”-出口
        Flag(value){
            return value === 'I'?"进口":"出口";
        },
        edi(value){
            var result = "";
            switch(value){
                case '0':
                    result = '在现场通过纸面报关单申报,不经过电子审单';
                    break;
                case '1':
                    result = 'EDI 申报方式(微机EDI申报)';
                    break;
                case '2':
                    result = '利用 POP系统在现场向海关申报方式';
                    break;
                case '3':
                    result = '"两水转关"提前申报模式，对应转关单口岸未放行状态';
                    break;
                case '4':
                    result = '"两水转关"提前申报模式，对应转关单口岸已放行状态';
                    break;
                case '5':
                    result = '"两陆转关"提前申报模式';
                    break;
                case '6':
                    result = '南方直转货物报关单申报模式';
                    break;
            }
            return result;
        },
        closeWin(){
            this.$emit('myCloseWin',"customModel");
        },
        query(params){
            let request={
                entryId:params
            }
            this.entryId = params;
            publicInter(interfaceUrl.queryMaterialsEntry,request).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.customHead = r.head[0];
                        this.dataCustom = r.list;
                        this.$emit('myOpenWin',"customModel");
                    }
                    else{
                        this.$Modal.error({content:r.data});
                    }
                }
            });
        },
        lookList(){
            this.$refs.listChild.query(this.entryId);
            this.listShow.show=true;
        }
    },
}
</script>