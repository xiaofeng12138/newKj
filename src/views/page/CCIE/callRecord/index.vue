<template>
    <div class="call-record">

        <Row style="margin-bottom:10px; text-align:left;">       
            <span class="labelText">展馆号:</span>
            <Select v-model="pavilion" @on-change="zgChange" placeholder="请选择展馆号"  class="customSelect" size='large'  style="width:150px;margin-right:20px;">
                <Option v-for="(item,index) in zgList" :value="item.ID" :key="index">{{ item.NAME }}</Option>
            </Select>
            <span class="labelText" style="">展位号:</span>
            <Select v-model="boothno" filterable class="customSelect" size='large'  style="width:150px;margin-right:20px;" @on-query-change='queryZwh'>
                <Option v-for="item in zwList" :key="item.POSITION" :value="item.POSITION">{{item.POSITION}}</Option>
            </Select>
            <span class="labelText" style="">受理结果:</span>
            <Select v-model="status"  class="customSelect" size='large'  style="width:150px;margin-right:20px;">
                <Option value="0">未处理</Option>
                <Option value="1">已响应</Option>
                <Option value="2">已处理</Option>
            </Select>
            <Button type="primary" size='large' @click="submit">查询</Button>
        </Row>
        <Table border :columns="columns" class="customTable" :data="callList"></Table>
        <Page :total="total" v-if="total>0"
            :page-size='this.formData.pageSize'
            @on-change='pageChange'
            show-total
            class="customPage"
        />

        <Modal v-model="modalShow" width="1600" class="flow-commod-modal" :footer-hide="hideFooter">
            <div slot="header" class="modal-header">
                <img src="@/assets/screen-call/title-left.png" >
                <span>一键呼叫受理详情</span>
                <img src="@/assets/screen-call/title-right.png" >
            </div>
            <div class="modal-content">
                <Row class="modal-row">
                    <Col :span="2" class="col-name">展位号</Col>
                    <Col :span="5">{{detailData.BOOTHNO}}</Col>
                    <Col :span="2" class="col-name">展商名称</Col>
                    <Col :span="8">{{detailData.COMPANYNAME}}</Col>
                    <Col :span="2" class="col-name">申请时间</Col>
                    <Col :span="5">{{detailData.CALLTIME}}</Col>
                </Row>
                <div v-if="this.detailData.STATUS == 0" class="no-answer">
                    暂无处理
                </div>
                <div v-else>   
                    <div class="answer-msg">
                        <img src="@/assets/screen-call/icon-gy.png" >
                        <div style="margin-left: 10px">
                            <span class="answer-user">{{detailData.ANSWERPERSON}}</span>
                            <span class="answer-time">{{detailData.ANSWERTIME}}</span>
                        </div>
                    </div>
                    <p class="answer-desc">{{detailData.ANSDESC}}</p>
                    <img style="width: 200px; height: 200px;margin-left: 10px" v-for="(item, index) in detailData.files" :key="index" :src="`/video/${item}`">
                </div>
                
            </div>
        </Modal>
    </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
export default {
    data() {
        return {
            hideFooter: true,
            modalShow: false,
            pavilion: '',
            boothno: '',
            status: '',
            formData: {
                PAVILION: '',
                BOOTHNO: '',
                STATUS: '',
                pageNum: 1,
                pageSize: 10
            },
            zgList: [], 
            zwList: [],
            total: 0,
            callList: [],
            detailData: {},
            columns: [
                {
                    title:'序号',
                    key:'NUM',
                    align:'center',
                    width: 80
                },
                {
                    title:'展位号',
                    key:'BOOTHNO',
                    align:'center',
                    width: 160
                },
                {
                    title:'展商名称',
                    key:'COMPANYNAME',
                    align:'center'
                },
                {
                    title:'呼叫时间',
                    key:'CALLTIME',
                    align:'center',
                    width: 240
                },
                {
                    title:'抵达关员',
                    key:'ANSWERPERSON',
                    align:'center',
                    width: 120
                },
                {
                    title:'受理描述',
                    key:'ANSDESC',
                    align:'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', params.row.ANSDESC.slice(0, 20)),
                            h('span',{
                                style: { 
                                    cursor: 'pointer',
                                    color: '#fbd500'
                                },
                                on: {
                                    'click': () => {
                                        this.detailData = params.row;
                                        if(this.detailData.FILENAME != ''){
                                            this.detailData.files = this.detailData.FILENAME.split(',');

                                        }
                                        this.modalShow = true;
                                    }
                                }
                            }, params.row.ANSDESC == '' ? '' : '[查看详情]'),
                        ])
                    }
                },
                {
                    title:'受理结果',
                    align:'center',
                    width: 120,
                    render:(h, params) => {
                        if( params.row.STATUS == '0' ) {
                            return h('span', {
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    color: '#fbd500'
                                },
                                on: {
                                    'click': () => {
                                        this.detailData = params.row;
                                        if(this.detailData.FILENAME != ''){
                                            this.detailData.files = this.detailData.FILENAME.split(',');

                                        }
                                        this.modalShow = true;
                                    }
                                }
                            }, '未处理')
                        } else {
                            return h('span', params.row.STATUS == 1 ? '已响应' : '已处理')
                        }
                    },
                },
            ]
        }
    },
    mounted() {
        this.query()
        this.queryZglist()
    },
    methods: {
          //查询展位列表
        queryZglist(){
            publicInter(interfaceUrl.queryPositionTransport,{}).then(res=>{
                this.zgList = res.position
                })
        },
        queryZwh(value){
            let data ={
                hallno:this.pavilion,
                boothno: value
            }
            publicInter(interfaceUrl.qryAllBoothno,data).then(res=>{
                       this.zwList = res.list
            })
        },
        query() {
            publicInter(interfaceUrl.queryScreenApplication, this.formData).then( r => {
                if(r.code == 200) {
                    this.total = r.totalRow;
                    this.callList = r.list;
                }
            })
        },
        pageChange(num) {
            this.formData.pageNum = num;
            this.query()
        },
        zgChange(value) {
            publicInter(interfaceUrl.qryBoothnoByHall, {hallno: value}).then( r => {
                this.zwList = r.list
            })
        },
        submit() {

            this.formData.PAVILION = this.pavilion == '全部'?'':this.pavilion;
            this.formData.BOOTHNO = this.boothno;
            this.formData.STATUS = this.status;
            this.formData.pageNum = 1;
            this.query()
        }
    }
}
</script>

<style lang="scss" scoped>
.labelText{
    display:inline-block;
    vertical-align:middle;
    color:#fff;
    font-size:1rem;

}
.call-record {
    width: 100%; 
    height: 100%;
}
.modal-header {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 1.25rem;
    color: #fff;
    img {
        vertical-align: middle;

    }
    
}
.modal-content {
    width: 90%;
    margin: 0 5%;
    .modal-row {
        border: 1px solid rgba(255,255,255,0.15);
        font-size: 1rem;
        color: #fff;
        line-height: 3rem;
        height: 3rem;
        .col-name {
            background: #1741A6
        }
        .ivu-col {
            text-align: center
        }
    }
}
.answer-msg {
    margin-top: 1rem;
    height: 40px;
    display: flex;
    img {
        height: 40px;
        width: 40px;
    }
    span {
        display: block;
    }
    .answer-user {
        font-size: 18px;
        color: #fff
    }
    .answer-time {
        font-size: 12px;
        color: #fff;
        opacity: 0.6;
    }
}
.answer-desc {
    margin-top: 1rem;
    color: #fff;
    font-size: 14px;
}
.no-answer {
    margin-top: 1rem;
    font-size: 18px;
    color: #fff;
    opacity: 0.6;
    text-align: center
}
</style>
