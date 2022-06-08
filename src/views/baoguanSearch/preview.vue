<template lang="html">
    <div class="">

        <Row class="">
            <Col span="12">
                预录入编号：
            </Col>
            <Col span="12">
                海关编号：
            </Col>
            <!-- <Col span="4">
              （2201）
            </Col> -->
        </Row>

        <!-- table -->
        <Row class="row row1" type="flex">
            <Col class="col" span="9">
                <div class="">
                    收发货人：
                </div>
                <div class="">
                    {{data.resultHead.OWNER_NAME}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    进口口岸：
                </div>
                <div class="">
                    {{data.resultHead.jinKouKouAn}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    进口日期：
                </div>
                <div class="">
                    {{data.resultHead.jinKouDate}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    申报日期：
                </div>
                <div class="">

                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="9">
                <div class="">
                    消费使用单位：
                </div>
                <div class="">
                    {{data.resultHead.TRADE_NAME}}
                </div>
            </Col>
            <Col class="col" span="3">
                <div class="">
                    运输方式：
                </div>
                <div class="">
                    {{data.resultHead.TRAF_MODE_FRONT}}
                </div>
            </Col>
            <Col class="col" span="6">
                <div class="">
                    运输工具名称：
                </div>
                <div class="">
                    {{data.resultHead.TRAF_NAME}}
                </div>
            </Col>
            <Col class="col" span="6">
                <div class="">
                    提运单号：
                </div>
                <div class="">
                    {{data.resultHead.BILL_NO}}
                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="9">
                <div class="">
                    申报单位：
                </div>
                <div class="">
                    {{data.resultHead.declareCompany}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    监管方式：
                </div>
                <div class="">

                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    征免性质：
                </div>
                <div class="">

                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    备案号：
                </div>
                <div class="">

                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="6">
                <div class="">
                    贸易国/地区：
                </div>
                <div class="">
                    {{data.resultHead.maoYiGuo}}
                </div>
            </Col>
            <Col class="col" span="6">
                <div class="">
                    启运国/地区：
                </div>
                <div class="">

                </div>
            </Col>
            <Col class="col" span="6">
                <div class="">
                    装货港：
                </div>
                <div class="">
                    {{data.resultHead.zhuangHuoGuang}}
                </div>
            </Col>
            <Col class="col" span="6">
                <div class="">
                    境内目的地：
                </div>
                <div class="">

                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="6">
                <div class="">
                    许可证号：
                </div>
                <div class="">

                </div>
            </Col>
            <Col class="col" span="3">
                <div class="">
                    成交方式：
                </div>
                <div class="">
                    {{data.resultHead.chengJiaoType}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    运费：
                </div>
                <div class="">
                    {{data.resultHead.yunFei}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    保费：
                </div>
                <div class="">
                    {{data.resultHead.baoXianFei}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    杂费：
                </div>
                <div class="">

                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="6">
                <div class="">
                    合同协议号：
                </div>
                <div class="">
                    {{data.resultHead.xieYiHao}}
                </div>
            </Col>
            <Col class="col" span="4">
                <div class="">
                    件数：
                </div>
                <div class="">
                    {{data.resultHead.jianShu}}
                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    包装种类：
                </div>
                <div class="">

                </div>
            </Col>
            <Col class="col" span="5">
                <div class="">
                    毛重：
                </div>
                <div class="">
                    {{data.resultHead.maoZhong}}
                </div>
            </Col>
            <Col class="col" span="4">
                <div class="">
                    净重：
                </div>
                <div class="">
                    {{data.resultHead.NET_WT}}
                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="6">
                <div class="">
                    集装箱号：
                </div>
                <div class="">

                </div>
            </Col>
            <Col class="col" span="18">
                随附单证：
                <div class="">
                </div>
                <div class="">

                </div>
            </Col>
        </Row>


        <Row class="row" type="flex">
            <Col class="col" span="24">
                <div class="">
                    标记唛码及备注：
                </div>
                <div class="">

                </div>
            </Col>
        </Row>

        <div style="margin-top: 20px;">
            <Row v-if="data.isCntrCompleted">
                集装箱信息：已完善<Button type="primary" style="margin-left: 20px;" @click="hand">重新手动完善</Button>
                <Button type="primary" style="margin-left: 20px;" @click="autoPerfect">重新自动完善</Button>
            </Row>
            <Row v-else>
                集装箱信息：未完善 <Button type="primary" style="margin-left: 20px;" @click="hand">手动完善</Button>
                <Button type="primary" style="margin-left: 20px;" title="根据装货信息自动完善" @click="autoPerfect">自动完善</Button>
            </Row>
        </div>


        <!-- list -->
        <Row style="margin-top:40px;">
            <Table stripe size="small" :columns="columns1" :data="data.resultList"></Table>
        </Row>
    </div>
</template>

<script>
    import expand from "./expand"
    export default {
        props: ['data'],
        data () {
            return {
                columns1: [
                    {
                        type: 'expand',
                        width:50,
                        align: 'center',
                        render:(h, params) =>{
                            return h(expand,{
                                props:{
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '项号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商品编号',
                        width: 120,
                        key: 'MATERIALNO',
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        width: 100,
                        key: 'GOODSDESZH',
                        align: 'center'
                    },
                    {
                        title: '数量',
                        width: 80,
                        key: 'QUANTITY',
                        align: 'center'
                    },
                    {
                        title: '单位',
                        width: 60,
                        key: 'QUANTITYUNIT',
                        align: 'center'
                    },
                    {
                        title: '原产国/地区',
                        key: 'origincountrycode',
                        align: 'center'
                    },
                    {
                        title: '单价',
                        width: 60,
                        key: 'UNITPRICE',
                        align: 'center'
                    },
                    {
                        title: '总价',
                        width: 90,
                        key: 'totalPrice',
                        align: 'center'
                    },
                    {
                        title: '币值',
                        width: 80,
                        key: 'pOCurreny',
                        align: 'center'
                    }
                ]
            }
        },
        components:{expand},
        methods:{
            hand:function () {
                this.$emit('handPerfect')
            },
            autoPerfect:function () {
                this.$emit('autoPerfect')
            }
        }
    }
</script>

<style lang="scss">
    .col {
        border-right: 1px solid #dddee1;
        border-bottom: 1px solid #dddee1;
        padding: 10px;
    }
    .row {
        border-left: 1px solid #dddee1;
    }
    .row1 {
        border-top: 1px solid #dddee1;
    }
</style>
