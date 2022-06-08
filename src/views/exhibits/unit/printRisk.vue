<template>
    <div class="pageBreakBefore myPrintRisk">
        <h2 style="text-align:center;margin-bottom:20px;">{{this.titleDate}}中国国际进口博览会食品和化妆品试用、品尝、散发申请表</h2>
        <div class="headTitle">
            <Row>
                <Col span="3">物资清单号:</Col>
                <Col span="5" class="contentSpan">{{ head.LISTHEADNO }}</Col>
                <Col span="2">展台号:</Col>
                <Col span="4" class="contentSpan">{{ head.BOOTHNO }}</Col>
                <Col span="2">展商名称:</Col>
                <Col span="8" class="contentSpan">{{ head.EXHIBITOR }}</Col>
            </Row>
            <Row>
                <Col span="3">负责人:</Col>
                <Col span="5" class="contentSpan">{{ head.CONTACT}}</Col>
                <Col span="2">电话:</Col>
                <Col span="4" class="contentSpan">{{ head.TEL}}</Col>
                <Col span="2">电邮:</Col>
                <Col span="8" class="contentSpan">{{ head.EMAIL}}</Col>
            </Row>
        </div>
        <Table border :columns='columns' :data='tableLits' style='margin:20px 0' ></Table>
    </div>  
</template>
<script>
import {getCookie} from '../../../until/getToken';
export default {
    props:['tableLits','head'],
    data(){
        return{
            titleDate: '2018年首届',
            columns:[
                {
                    title:'序号',
                    type:'index',
                    align:"center",
                    width:60
                },
                {
                    title:'项号',
                    key:'G_NO',
                    align:"center",
                    width:60
                },
                {
                    title:'展品名称',
                    key:'GOODSDESCRIPTIONCN',
                    align:"center",
                    width:100
                },
                {
                    title:'原产国/地区',
                    key:'COUNTRYOFORIGIN',
                    align:"center",
                    width:80
                },
                {
                    title:'申请用途(试用、品尝、散发)',
                    key:'TRYNAME',
                    align:"center",
                    width:110
                },
                {
                    title:'数量',
                    key:'TRYCOUNT',
                    align:"center",
                    width:60
                },
                {
                    title:'单位',
                    key:'QUANTITYUNIT',
                    align:"center",
                    width:60
                },
                {
                    title:'合格证明类型',
                    key:'PROVE_TYPE',
                    align:"center",
                    width:100,
                    render:(h,params)=>{
                        let result = "";
                        switch(params.row.PROVE_TYPE){
                            case "1":
                                result = "参展国家方证书";
                                break;
                            case "2":
                                result = "第三方检测报告";
                                break;
                            case "3":
                                result = '参展方自验合格报告';
                                break;
                            case '4':
                                result = "自我承诺";
                                break;
                        }
                        return h('span',result);
                    }
                },
                {
                    title:'相关部门意见',
                    align:"center",
                    render:(h,params)=>{
                        return h('CheckboxGroup',[
                            h('Checkbox',{
                                attrs:{
                                    label : '同意'
                                }
                            }),
                            h('Checkbox',{
                                attrs:{
                                    label : '不同意'
                                }
                            })
                        ])
                    },
                    width:130
                },
            ]
        }
    },
    created() {
        if(getCookie('date') == '2019') {
                this.titleDate = '2019年第二届'
            }
    }
}
</script>
<style lang="scss" scoped>
.headTitle{
    border: 1px solid #000;
    padding: 10px;
}
.contentSpan{
    min-height: 20px;
    border-bottom: 1px solid #000;
}

</style>

<style scoped  media="print">
    @media print{
        @page {
            margin: 6mm;
            size:210mm 290mm;
        }
        .pageBreakBefore{
            page-break-before: always;
        }
        th .ivu-table-cell{
            color: #000;
        }
        .ivu-table-border td, .ivu-table-border th{
            border: 1px solid #000;
        }
    }
</style>

