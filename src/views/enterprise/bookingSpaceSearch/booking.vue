<template>
    <div>
        <h1>订舱号查询</h1>
        <Row class="query">
            <Col :md='14' :lg='10'>
                <Col :md='4'>
                    <span class="itemTitle">订舱号</span>
                </Col>
                <Col :md='20'>
                 <Input  size='large' v-model="bookingNum" placeholder="请输入订舱号" ></Input>
                </Col>
            </Col>
            <Col :md='4' :lg='3' :push='1'>
                 <Button type="primary" size='large' @click="query" long>查询</Button>
            </Col>
            
        </Row>
        <Tabs value="name">
            <TabPane label="基本信息" name='name'>
                 <Row class="border" v-if="basic">
        <Col :sm="12" :md="8" >
            <span>创建人代码：</span>
            <b>{{basic['CARRIER']}}</b>
        </Col>

        <Col :sm="12" :md="8" >
            <span>劳氏号：</span>
            <b>{{basic.LLOYDS_NUM}}</b>
        </Col>
        <Col :sm="12" :md="8" >
            <span>船名：</span>
            <b>{{basic.VSL_NME}}</b>
        </Col>
        <Col :sm="24"  >
            <span>最后卸港：</span>
            <b>{{basic.L_POD}}</b>
        </Col>
        <Col :sm="24"  >
            <span>第一装港：</span>
            <b>{{basic.F_POL}}</b>
        </Col>
        <Col :sm="24"  >
            <span>接货地：</span>
            <b>{{basic.ORIG_CITY}}</b>
        </Col>
         <Col :sm="24" >
           <span>发货人：</span>
           <b>{{basic.SHIPPER_NAME}}</b>
        </Col>
        <Col :sm="24">
            <span>发货人地址：</span>
            <b>{{basic.SHIPPER_NAME}}</b>
        </Col>
         <Col :sm="24" >
            <span>收货人：</span>
            <b>{{basic.CONSIGNEE_NAME}}</b>
        </Col>
        <Col :sm="24">
            <span>收货人地址：</span>
            <b>{{basic.CONSIGNEE_ADDRESS}}</b>
        </Col>
        <Col :sm="24" >
            <span>通知人：</span>
            <b>{{basic.NOTIFYPARTY_NAME}}</b>
        </Col>
        <Col :sm="24">
            <span>通知人地址：</span>
            <b>{{basic.NOTIFYPARTY_ADDRESS}}</b>
        </Col>
        </Row>
            </TabPane>
            <TabPane label="箱信息" >
               <Table border :columns="columns" :data="data" class="self"></Table>
            </TabPane>
            <TabPane label="货信息">
                <bale :list='goods'></bale>
            </TabPane>
        </Tabs>
    

    </div>
</template>
<script>
import bale from './trunkBasic'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{
        bale
    },
    data(){
        return{
            bookingNum:'',
            data:[],
            basic:null,
            goods:[],
            columns:[
                {
                    title:'箱型',
                    key:'CNTR_TYPE'
                },
                {
                    title:'数量',
                    key:'CONTAINER_QUANTITY'
                }
            ]

        }
    },
    methods:{
        query(){
            publicInter(interfaceUrl.queryBooking,{bookingNum:this.bookingNum}).then(r=>{
                this.basic= r.booking
                this.data=r.bookingContainer
                this.goods=r.bookingCargo
            })

        }
    }
}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
.query{
    border-bottom: 1px solid #ececec;
}
h1{
    &:last-child{
        border-bottom: none;
    }
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px dashed #ddd;
}
h2{
    padding: 16px 0;
}
    .ivu-col{
        height: 36px;
        margin-bottom: 16px;
        line-height: 36px;
        .itemTitle{
            font-size: 14px;
        }
    }
    
         .border.ivu-row{
        // width: 99%;
        // margin: 0 auto;
        border-top: 1px solid #ececec;
        border-right: 1px solid #ececec;
        .ivu-col{
        border-left: 1px solid #ececee;
        border-bottom: 1px solid #ececec;
        height: 60px;
        line-height: 60px;
        padding:0 15px;
        margin-bottom: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        >span{
            display: inline-block;
            width: auto;
            text-align: left;
            font-weight: 500;
            font-size: 14px;
            vertical-align: middle;
        }
    }
    }
</style>

