<template>
    <div class="myIndex myIndex1" v-bind:class="{printCss:isPrintCss}">
        <p class="attachmentP" v-if="isPrintCss" style="margin-bottom:20px;">附1</p>
        <img v-if="isPrintCss" :src="printUrl"  style="width: 100mm;display: inline-block;position: absolute;top: 2mm;left: -20mm;"/>
        <h1>
            {{this.titleDate}}中国国际进口博览会
        </h1>
        <h1 style="margin-bottom:20px;">进境物资证明函</h1>
        <Row>
            <Col span="12">证明人：国家会展中心(上海)有限责任公司</Col>
            <Col span="12">编号：{{ basis.certificateno }}</Col>
        </Row>
        <div class="tablePane">
            <Row class="row row1">
                <Col span="4" :class="{centerSpan:true,needStar:!disableStatus}">贸易国别/地区</Col>
                <Col span="4"  style="overflow: visible">
                    <vague v-if="disableStatus === false" @regionVal="regionChange" :firstVal="basis" :vagplaceholder="vagplaceholdert"></vague>
                    <div v-else-if="isPrintCss">{{ basis.cnname }}</div>
                    <div v-else>{{ basis.countrycode }}</div>
                </Col>
                <Col span="4"  :class="{centerSpan:true,needStar:!disableStatus && basis.transportmode==='2'}">运输工具</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.transportname }}</div>
                    <Input v-else v-model="basis.transportname" :disabled="disableStatus" placeholder="请填写运输工具"></Input>
                </Col>
                <Col span="4"   :class="{centerSpan:true,needStar:!disableStatus}">进境日期</Col>
                <Col span="4" style="overflow: visible">
                    <div v-if="disableStatus">{{ basis.importdate }}</div>
                    <!--<Input v-else v-model="basis.importdate" placeholder="例如：2018-01-01" :disabled="disableStatus"></Input>-->
                    <DatePicker v-else v-model="basis.importdate" placeholder='请选择进境日期'></DatePicker>
                </Col>
            </Row>
            <Row class="row">
                <Col span="4"  :class="{centerSpan:true,needStar:!disableStatus}">提(运)单号</Col>
                <Col span="12">
                    <div v-if="disableStatus">{{ basis.billno }}</div>
                    <Input v-else v-model="basis.billno" :disabled="disableStatus" placeholder="请输入提(运)单号,格式限制在大写字母、数字、*或_" @keyup.native="keyupFunS('billno')"></Input>
                </Col>
                <Col span="4"  :class="{centerSpan:true,needStar:!disableStatus}">毛重(Kg)</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.weight }}</div>
                    <Input v-else v-model="basis.weight" :disabled="disableStatus" placeholder='请填写毛重' @keyup.native="keyupFun('weight')" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="4"  :class="{centerSpan:true,needStar:!disableStatus}">监管方式</Col>
                <Col span="12">
                    <ul  class="myUl" v-if="isPrintCss"><!--v-if="isPrintCss"-->
                        <li v-for="(jg,index) in jgArr" :key="index" :class="{jgLiClass:jg.key === basis.monitormethod}">{{ jg.label}}</li>
                    </ul>
                    <RadioGroup v-else v-model="basis.monitormethod" :disabled="disableStatus" class="customRadio"  @on-change='changeMonitorMethod'>
                        <Radio label="1" :disabled="disableStatus">展览品</Radio>
                        <!--<Radio label="2">免税进境</Radio>-->
                        <!--<Radio label="3">正式进口</Radio>-->
                        <Radio label="2" :disabled="disableStatus">保税货物</Radio>
                        <!--<Radio label="5">摄影摄像器材</Radio>-->
                        <Radio label="3" :disabled="disableStatus">转关</Radio>
                        <Radio label="4" :disabled="disableStatus">其他</Radio>
                    </RadioGroup>
                </Col>
                <Col span="4"  :class="{centerSpan:true,needStar:!disableStatus}">数量(件数)</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.packagequantity }}</div>
                    <Input v-else v-model="basis.packagequantity"  :disabled="disableStatus" placeholder='请输入数量'
                     @keyup.native="keyupFun('packagequantity')" />
                </Col>
            </Row>
            <Row class="row">
                <Col span="4" class="centerSpan">境内收发货人</Col>
                <Col span="12">
                    <div>
                        {{ basis.companyname }}
                    </div>
                </Col>
                <Col span="4" class="centerSpan">十位编码</Col>
                <Col span="4">               
                    <!-- <Input :maxlength='numLen' v-if="basis.monitormethod == 2 && !disableStatus" v-model="basis.companycode" 
                        @keyup.native="changeCompanycode"  /> -->
                    <div>{{ basis.companycode }}</div>
                </Col>
            </Row>
            <Row class="row" style="z-index: 2;">
                <Col span="4" style="border-bottom: none;overflow:visible" :class="{centerSpan:true,visibleSpan:true,needStar:!disableStatus}">申报单位</Col>
                <Col span="12">
                    <div v-if="disableStatus">{{ basis.agentname }}</div>
                    <Input v-else v-model="basis.agentname" :disabled="disableStatus" placeholder='请填写申报单位'></Input>
                </Col>
                <Col span="4" :class="{centerSpan:true,needStar:!disableStatus}">十位编码</Col>
                <Col span="4">
                    <div v-if="disableStatus">{{ basis.agentcode }}</div>
                    <Input v-else v-model="basis.agentcode" :disabled="disableStatus" placeholder='请填写申报单位十位编码'
                    @keyup.native="keyupFun('agentcode')" :maxlength='numLen'></Input>
                </Col>
            </Row>
            <Row class="row" style="border-top: none;">
                <Col span="4"></Col>
                <Col span="8" :class="{centerSpan:true,needStar:!disableStatus}">联系人:
                    <div style="display: inline-block" v-if="disableStatus">{{ basis.contactname }}</div>
                    <Input v-else v-model="basis.contactname" :disabled="disableStatus"  placeholder='请填写申报单位联系人'
                    style="width: calc(100% - 90px)"></Input>
                </Col>
                <Col span="12" style="border-left:none" :class="{centerSpan:true,needStar:!disableStatus}">联系方式:
                    <div style="display: inline-block" v-if="disableStatus">{{ basis.contactmethod }}</div>
                    <Input v-else v-model="basis.contactmethod" :disabled="disableStatus" placeholder='请填写申报单位联系方式'
                    style="width: calc(100% - 90px)" @keyup.native="keyupFunT('contactmethod')"></Input>
                </Col>
            </Row>
            <Row class="textRow row">
                    <p></p>
                    <p style="padding-left:8px;">证明事项：</p>
                    <p class="pBreak">兹证明此票货物为{{this.titleDate}}中国国际进口博览会物资，仅用于该展会。国家会展中心
                        （上海）有限责任公司承诺按照海关规定及时办理有关手续。</p>
                    <pre>





          证明人：（公章）                                      经办人：

                                                            年    月    日
                    </pre>
                    <br/>
                    <p style="text-align: center">
                    </p>
                    <p></p>
            </Row>
            <Row class="row row1">
                <!--"-->
                <Col span="12">联系人：<div style="display: inline-block">{{ basis.guaranteeperson }}</div></Col>
                <!---->
                <Col span="12">联系电话：<div style="display: inline-block">{{ basis.guaranteepersontele }}</div></Col>
            </Row>
            <Row class="textCol2">
                <span style="padding-left:8px;">备注：</span>
                <div>
                    <div v-if="disableStatus" style="padding-left:8px;">{{ basis.remark }}</div>
                     <Input v-else  class="selfTextarea"  v-model="basis.remark" type='textarea' placeholder='请填写备注'
                     style="height:80px;outline:none;border:none"></Input>
                    
                </div>
            </Row>
            <p class="remarkP">(正本：主管地海关留存&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;副本1：退运出境时交出境地海关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;副本2：证明人留存)</p>
        </div>

        <div class="pageBreak" style="margin-bottom: 50px"></div>

        <!--<detail-table v-for="(detailUnit,index) in detailData" :disableStatus="disableStatus"-->
                      <!--:detailLength="detailData.length" :index="index" :basis="basis" :positionList="positionList" :basis2="basis2" :detailData="detailUnit">-->
        <!--</detail-table>-->
    </div>
</template>

<script>
    import vague from "../../components/detail/vague"
    import { publicInter } from '@/api/http'
    import interfaceUrl from '@/api/interfaceUrl'
    import {getCookie} from '@/until/getToken';
    export default {
        components:{vague},
        props:['basis','basis2','disableStatus',"detailData","positionList",'printCSS'],
        computed: {
        },
        data(){
            return {
                titleDate: '2018年首届',
                isPrintCss:false,
                numLen:10,
                jgArr:[{label:"展览品",key:"1"},{label:"保税货物",key:"2"},{label:"转关",key:"3"},{label:"其他",key:"4"},],
                printUrl:"",
                vagplaceholdert:'请填写贸易国别/地区'
            }
        },
        created(){
            let timeArr = ['一','二','三','四','五','六','七','八','九','十']
            let nowYear = getCookie('date')*1;
            let period = nowYear - 2018
            this.titleDate = `${nowYear}年第${timeArr[period]}届`;

        
            this.printUrl = require('../../../../../assets/zbhPrint.jpg');
            this.isPrintCss  = this.printCSS?true:false
        },
        methods:{
            regionChange(val){
                this.basis.countrycode = val;
            },
            keyupFun(param){
                this.basis[param] = this.basis[param].replace(/[^0-9.]/g,"")
            },
            keyupFunS(param){
                this.basis[param] = this.basis[param].replace(/[^A-Z0-9_\*]/g,"")
            },
            keyupFunT(param){
                this.basis[param] = this.basis[param].replace(/[^0-9+\-]/g,"")
            },
            //当监管方式为2时，可修改
            changeMonitorMethod(){
                if(this.basis.monitormethod !== 2){
                    this.basis.companyname = "国家会展中心(上海)有限责任公司";
                    this.basis.companycode = "3120915015";
                }
            },
            //改变监管方式,当监管方式为保税货物时，境内收发货人的十位编码可修改时，当输入为10位时，向后台请求数据
            changeCompanycode(){
                if(this.basis.companycode.length === 10){
                    publicInter(interfaceUrl.queryCompanyNameByCode,{companycode:this.basis.companycode}).then(r=>{
                        if(r){
                            if(r.code === '400'){
                                this.$Message.error(r.error);
                                this.basis.companyname  = "";
                            }
                            else{
                                this.basis.companyname = r.companyname;
                            }
                        }
                    })
                }
                else{
                    this.basis.companyname  = "";
                }
            }
        }
    }
</script>


<style scoped  rel="stylesheet/scss" lang="scss" media="screen">
    .selfTextarea:focus{
        border: none;

    }
    
    .myUl{
        list-style:none;
        li{
            display: inline-block;
            position: relative;
            margin-left: 20px;
            height: 32px;
            margin-right: 40px;
        }
        li::before{
            width: 15px;
            height: 15px;
            content: "";
            border: 1px solid #000000;
            background: #fff;
            position: absolute;
            top: 0.7cm;
            left: -18px;
        }
        .jgLiClass::before{
            background: transparent;
            border-width: 8px;
        }
    }
    h1,h2{
        text-align: center;
        width: 100%;
    }
    .myIndex1{
        font-size: 14px;
    }
    .tablePane {
        //font-size: 14px;
        font-size: 14px;
        //row的样式
        .row{
            border-right: 1px solid #dedede;
            .ivu-col {
                border-left: 1px solid #dedede;
                border-bottom: 1px solid #dedede;
                padding: 0 4px 0 8px;
                height: 32px;
                line-height: 32px;
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
            .visibleSpan{
                padding-top: 15px;
            }
        }
        //第一行的样式
        .row1{
            border-top: 1px solid #dedede;
        }
        .textRow{
            border-left: 1px solid #dedede;
            height: 260px;
            //height: 7.4cm;
        }

        .textCol2{
            height: 100px;
            border-left: 1px solid #dedede;
            border-bottom: 1px solid #dedede;
            border-top: none;
            border-right: 1px solid #dedede;
        }
    }
</style>
<style scoped  media="print">
    @media print{
        .myIndex1{
            width:29cm;
            font-size: 16pt;
            color: #000;
            font-weight: normal;
            font-family: SimSun;
        }

        .myIndex1 h1{
            font-size: 32pt;
            margin-top: 0mm;
            font-weight: normal;
        }

        .myIndex .remarkP{
            font-size: 14pt;
        }

        .tablePane {
            font-size: 16pt;
            color: #000;
            font-weight: normal;
            /*font-family: STKaiti;*/
        }

        /*radio框里面的字体*/
        .tablePane .row  .ivu-radio-wrapper {
            font-size: 16pt;
            color: #000;
            font-weight: normal;
            font-family: SimSun;
        }


        .tablePane .row {
            border-right: 1px solid #000;
        }

        .tablePane .row  .ivu-col {
            border-left: 1px solid #000;
            border-bottom: 1px solid #000;
            height: 1.8cm;
            line-height: 1.8cm;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }


        .tablePane .row1{
            border-top: 1px solid #000;
        }

        .tablePane .textRow{
            border-left: 1px solid #000;
            height: 9cm;
        }

        .tablePane .textCol2{
            height: 40mm;
            border-left: 1px solid #000;
            border-bottom: 1px solid #000;
            border-top: none;
            border-right: 1px solid #000;
        }

        /*日期图标不打印*/
        .tablePane .ivu-input-icon{
           opacity: 0;
        }

        .tablePane .row .visibleSpan{
            padding-top: 0.8cm;
        }
    }
</style>