<template>
<div>
    <div class="showInfor">
         <Row >
        <Col :sm="12" :md="8" >
            <span>创建人代码：</span><b>{{basic['CARRIER']}}</b>
        </Col>

        <Col :sm="12" :md="8" >
            <span>劳氏号：</span><b>{{basic.LLOYDS_NUM}}</b>
        </Col>
        <Col :sm="12" :md="8" >
            <span>船名：</span><b>{{basic.VSL_NME}}</b>
        </Col>
        <Col :sm="24"  >
            <span>最后卸港：</span><b>{{basic.L_POD}}</b>
        </Col>
        <Col :sm="24"  >
            <span>第一装港：</span><b>{{basic.F_POL}}</b>
        </Col>
        <Col :sm="24"  >
            <span>接货地：</span><b>{{basic.POR}}</b>
        </Col>
         <Col :sm="24" >
           <span>发货人：</span><b>{{basic.SHIPPER_NAME}}</b>
        </Col>
        <Col :sm="24">
            <span>发货人地址：</span><b>{{basic.SHIPPER_NAME}}</b>
        </Col>
         <Col :sm="24" >
            <span>收货人：</span><b>{{basic.CONSIGNEE_NAME}}</b>
        </Col>
        <Col :sm="24">
            <span>收货人地址：</span><b>{{basic.CONSIGNEE_ADDRESS}}</b>
        </Col>
        <Col :sm="24" >
            <span>通知人：</span><b>{{basic.NOTIFYPARTY_NAME}}</b>
        </Col>
        <Col :sm="24">
            <span>通知人地址：</span><b>{{basic.NOTIFYPARTY_ADDRESS}}</b>
        </Col>
  </Row>
  <h2>参考号</h2>
  <Table border :columns="columns1" :data="referenceNu" class="self"></Table>
    </div>
</div>

</template>
<script>
import axios from 'axios'
export default {
    name:'basicInfor',
    props:['basic','referenceNu'],
    data(){
        return {
            // basic:{},
            columns1:[
                {
                    title:'类型',
                    key:'TYPE',
                },{
                    title:'发票号',
                    key:'REF_CDE'
                }
            ],
            data1:[]

        }
    },
    // created(){
    //     axios.post('http://10.134.18.50:8080/ebbase/public/ladingbill/queryLadingbill',JSON.stringify({billCode:'4512388500'})).then(r=>{
    //         console.log(r)
    //         this.basic=r.data.CUSTOMS_BL_BASIC
    //     })
    // }

}
</script>
<style  rel="stylesheet/scss"  lang="scss" scoped>
.showInfor{
    font-size: 14px;
    color: #212121;
    .ivu-row{
        // width: 99%;
        // margin: 0 auto;
        border-top: 1px solid #ececec;
        border-right: 1px solid #ececec;
        .ivu-col{
        border-left: 1px solid #ececee;
        border-bottom: 1px solid #ececec;
        padding:20px 15px;
        height: 62px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        >span{
            display: inline-block;
            width: auto;
            text-align: left;
            font-weight: 500;
            vertical-align: middle;
        }
    }

    }
    h2{
        margin: 20px 0;
        padding-bottom:20px;
        border-bottom: 1px dashed #ddd;
    }

}
</style>
