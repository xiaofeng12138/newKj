<template>
    <div class="myIndex">
        <!--startprint-->
        <p>附件1</p>
        <h1>2018年首届中国国际进口博览会</h1>
        <h1>进境物资证明函</h1>
        <Row>
            <Col span="12">证明人：国家会展中心(上海)有限责任公司</Col>
            <Col span="12">编号：{{ basis.certificateno }}</Col>
        </Row>
        <div class="tablePane">
            <Row>
                <Col span="4">贸易国别/地区</Col>
                <Col span="4"  style="overflow: visible">
                    <!--<div v-if="disableStatus">{{ basis.countrycode }}</div>-->
                    <!--<Input v-else v-model="basis.countrycode" :disabled="disableStatus"></Input>-->
                    <vague v-if="disableStatus === false" @regionVal="regionChange" :firstVal="basis.countrycode"></vague>
                    <div v-else>{{ basis.countrycode }}</div>
                </Col>
                <Col span="4">运输工具</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.transportname }}</div>
                    <Input v-else v-model="basis.transportname" :disabled="disableStatus"></Input>
                </Col>
                <Col span="4">进境日期</Col>
                <Col span="4" style="overflow: visible">
                    <div v-if="disableStatus">{{ basis.importdate }}</div>
                    <!--<Input v-else v-model="basis.importdate" placeholder="例如：2018-01-01" :disabled="disableStatus"></Input>-->
                    <DatePicker v-else v-model="basis.importdate" type="date"></DatePicker>
                </Col>
            </Row>
            <Row>
                <Col span="4">提(运)单号</Col>
                <Col span="12">
                    <div v-if="disableStatus">{{ basis.billno }}</div>
                    <Input v-else v-model="basis.billno" :disabled="disableStatus"></Input>
                </Col>
                <Col span="4">毛重(Kg)</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.weight }}</div>
                    <Input v-else v-model="basis.weight" :disabled="disableStatus"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="4">监管方式</Col>
                <Col span="12">
                    <RadioGroup v-model="basis.monitormethod" :disabled="disableStatus">
                        <Radio label="1" :disabled="disableStatus">展览品</Radio>
                        <!--<Radio label="2">免税进境</Radio>-->
                        <!--<Radio label="3">正式进口</Radio>-->
                        <Radio label="2" :disabled="disableStatus">保税货物</Radio>
                        <!--<Radio label="5">摄影摄像器材</Radio>-->
                        <Radio label="3" :disabled="disableStatus">转关</Radio>
                        <Radio label="4" :disabled="disableStatus">其他</Radio>
                    </RadioGroup>
                </Col>
                <Col span="4">数量(件数)</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.packagequantity }}</div>
                    <Input v-else v-model="basis.packagequantity" :disabled="disableStatus"></Input>
                </Col>
            </Row>
            <Row>
                <Col span="4">境内收发货人</Col>
                <Col span="12">
                    <div>
                        {{ basis.companyname }}
                    </div>
                </Col>
                <Col span="4">十位编码</Col>
                <Col span="4">
                    {{ basis.companycode }}
                </Col>
            </Row>
            <Row style="z-index: 2;">
                <Col span="4" style="border-bottom: none;line-height: 30px;">申报单位</Col>
                <Col span="12" style="border-bottom-width:2px">
                    <div v-if="disableStatus">{{ basis.agentname }}</div>
                    <Input v-else v-model="basis.agentname" :disabled="disableStatus"></Input>
                </Col>
                <Col span="4" style="border-bottom-width:2px">十位编码</Col>
                <Col span="4" style="border-bottom-width:2px">
                    <div v-if="disableStatus">{{ basis.agentcode }}</div>
                    <Input v-else v-model="basis.agentcode" :disabled="disableStatus"></Input>
                </Col>
            </Row>
            <Row style="border-top: none;">
                <Col span="4"></Col>
                <Col span="8">联系人:
                    <div style="display: inline-block" v-if="disableStatus">{{ basis.contactname }}</div>
                    <Input v-else v-model="basis.contactname" :disabled="disableStatus" style="width: calc(100% - 60px)"></Input>
                </Col>
                <Col span="12" style="border-left:none">联系方式:
                    <div style="display: inline-block" v-if="disableStatus">{{ basis.contactmethod }}</div>
                    <Input v-else v-model="basis.contactmethod" :disabled="disableStatus" style="width: calc(100% - 70px)"></Input>
                </Col>
            </Row>
            <!--<Row>-->
                <!--<Col span="4">保函编号</Col>-->
                <!--<Col span="8">-->
                    <!--<Input v-model="basis.guaranteeno" :disabled="disableStatus"></Input>-->
                <!--</Col>-->
                <!--<Col span="4">货值（USD）</Col>-->
                <!--<Col span="8">-->
                    <!--<Input v-model="basis.price" :disabled="disableStatus"></Input>-->
                <!--</Col>-->
            <!--</Row>-->
            <!--<Row>-->
                <!--<Col span="4">收货单位</Col>-->
                <!--<Col span="20">-->
                    <!--<Input v-model="basis.consignee" :disabled="disableStatus"></Input>-->
                <!--</Col>-->
            <!--</Row>-->
            <!--<Row>-->
                <!--<Col span="4">备注</Col>-->
                <!--<Col span="20">-->
                    <!--<Input v-model="basis.remark" :disabled="disableStatus"></Input>-->
                <!--</Col>-->
            <!--</Row>-->
            <Row class="textRow">
                    <p>证明事项：</p>
                    <p class="pBreak">兹证明此票货物为2018年首届中国国际进口博览会物资，仅用于该展会。国家会展中心
                        （上海）有限责任公司承诺按照海关规定及时办理有关手续。</p>
                    <pre>






          证明人：（公章）                                      经办人：

                                                            年    月    日
                    </pre>
                    <br/>
                    <p style="text-align: center">
                        <!--<Input v-model="basis.certifier" style="width: 60px;" :disabled="disableStatus"></Input>（-->
                        &nbsp;
                        <!--<Input v-model="basis.operator" style="width: 60px;" :disabled="disableStatus"></Input>（签印）-->

                    </p>
                    <p></p>
            </Row>
            <Row>
                <!--"-->
                <Col span="12">联系人：<div style="display: inline-block">{{ basis.guaranteeperson }}</div></Col>
                <!---->
                <Col span="12">联系电话：<div style="display: inline-block">{{ basis.guaranteepersontele }}</div></Col>
            </Row>
            <Row class="textCol2">
                <span>备注：</span>
            </Row>
            <p>(正本：主管地海关留存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;副本1：退运出境时交出境地海关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;副本2：证明人留存)</p>
        </div>

        <div class="pageBreak" style="margin-bottom: 50px"></div>


        <!--<detail-table :disableStatus="disableStatus" :basis="basis" :positionList="positionList" :basis2="basis2" :detailData="detailData">-->
        <!--</detail-table>-->
        <detail-table v-for="(detailUnit,index) in detailData" :key='index' :disableStatus="disableStatus"
                      :detailLength="detailData.length" :index="index" :basis="basis" :positionList="positionList" :basis2="basis2" :detailData="detailUnit">
        </detail-table>
        <!--<div class="tablePane">-->
            <!--<Row>-->
                <!--<Col span="4">品名</Col>-->
                <!--<Col span="5">数量</Col>-->
                <!--<Col span="5">计量单位</Col>-->
                <!--<Col span="5">单价（USD）</Col>-->
                <!--<Col span="5">货值（USD）</Col>-->
            <!--</Row>-->
            <!--<Row v-for="(bas, index) in basis2" :key="index">-->
                <!--<Col span="4"><Input v-model="bas.goodsdescription" :disabled="disableStatus"></Input></Col>-->
                <!--<Col span="5"><Input v-model="bas.quantity" :disabled="disableStatus"></Input></Col>-->
                <!--<Col span="5"><Input v-model="bas.quantityunit" :disabled="disableStatus"></Input></Col>-->
                <!--<Col span="5"><Input v-model="bas.unitprice" :disabled="disableStatus"></Input></Col>-->
                <!--<Col span="5"><Input v-model="bas.goodsvalue" :disabled="disableStatus"></Input></Col>-->
            <!--</Row>-->
            <!--<Row>-->
                <!--<Col span="24" style="text-align: center"><div @click="addBasis2"><Icon type="plus"></Icon></div></Col>-->
            <!--</Row>-->
            <!--<Row>-->
                <!--<Col span="24">总货值：{{ GoodsValueSum }}</Col>-->
            <!--</Row>-->
        <!--</div>-->
        <!--endprint-->
    </div>
</template>

<script>
    import detailTable from './detailTable'
    import vague from "../orignUnit/vague"
    export default {
        name:"addZBH",
        components:{detailTable,vague},
        props:['basis','basis2','disableStatus',"detailData","positionList"],
        computed: {
            GoodsValueSum:function () {
                var allSum = 0;
                if(this.basis2){
                    for (var i = 0; i < this.basis2.length;i++){
                        if(this.basis2[i].goodsvalue){
                            allSum += parseFloat(this.basis2[i].goodsvalue);
                        }
                    }
                    this.basis.totalprice = allSum;
                }

                return allSum;
            }
        },
        methods:{
            addBasis2() {
                this.basis2.push({
                    goodsdescription:"",
                    quantity:"",
                    quantityunit:"",
                    unitprice:"",
                    goodsvalue:""
                })
            },
            regionChange(val){
                this.basis.countrycode = val;
            },
        }
    }
</script>


<style scoped  rel="stylesheet/scss" lang="scss" media="screen">
    h1,h2{
        text-align: center;
        width: 100%;
    }
    .tablePane {
        //font-size: 14px;
        font-size: 14px;

        color: #212121;
        .ivu-row{
            border-top: 1px solid #ececec;
            border-right: 1px solid #ececec;
            .ivu-col {
                border-left: 1px solid #ececec;
                border-bottom: 1px solid #ececec;
                padding: 2px 4px;
                height: 30px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                > span {
                    display: inline-block;
                    width: auto;
                    text-align: left;
                    vertical-align: middle;
                }
            }
            .text-col{
                height: 180px;
            }
            .pBreak{
                text-indent:2em;
                width: 100%;
                height: auto;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
            }
        }
        .textRow{
            border-left: 1px solid #ececee;
            height: 260px;
            //height: 7.4cm;
        }

        .textCol2{
            height: 100px;
            border-left: 1px solid #ececee;
            border-bottom: 1px solid #ececec;
            border-top: none;
        }
    }
</style>
