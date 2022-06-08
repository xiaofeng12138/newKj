<template>
    <div>
        <h1 style="padding-bottom: 20px;">拆分提单</h1>
        <Row style="margin-bottom:20px">
            <!-- <Button type="primary" @click='initList'>查询</Button> -->
            <Button type="primary" @click="batchEntrustFun">委托</Button>
            <Button type="primary" @click='unBatchEntrustFun'>撤回</Button>
        </Row>
        <Table ref="selection" :columns='exColumns' :data='exData'></Table>
        <!-- 选择委托报关行,并确认委托 -->
        <Modal v-model="modal1" width="360">
            <p slot="header" style="text-align:left" class="not-print">选择委托报关行</p>
            <Row style="margin-bottom: 10px;">
                <Col span="6"><span class="centerSpan">委托报关行</span></Col>
                <Col span="12">
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in entrustBrokerList" :value="item.BECOMMEDCUSTOMSBROKERCODE" :key="item.BECOMMEDCUSTOMSBROKERCODE">{{ item.NAME_CHINESE }}</Option>
                    </Select>
                </Col>
            </Row>
            <div slot="footer" style="text-align: center">
                <Button type="primary" @click="submitEntrustFun">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import myTooltip2 from '../comminComponents/myTooltip2'
export default{
    data(){
        return{
            exColumns:[
                {
                    type:'selection',
                    width:60
                },
                {
                    title: '提单号',
                    key: 'BILLNO',
                },
                {
                    title: '拆单标识',
                    key: 'ERPTEMPNUM',
                },
                {
                    title: '委托报关行名称',
                    key: 'NAME_CHINESE',
                },
                {
                    title: '状态',
                    key:'statusFront',
                    render:(h, params) =>{
                        return h(myTooltip2,{
                            props:{
                                content:params.row.statusFront,
                                data1:params.row.listStatus
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    width:220,
                    render:(h,params)=>{
                        return h("div",[
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style:{
                                    'margin-right':'2px',
                                    'display':params.row.ISENTRUST === "1"?"none":'inline-block'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({name:'concat',params:{
                                            billNo:params.row.BILLNO,
                                            erpTempnum:params.row.ERPTEMPNUM
                                        }})
                                    }
                                }
                            },'自行归并'),
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style:{
                                    'margin-right':'2px',
                                    'display':params.row.ISENTRUST === "1"?"none":'inline-block',
                                },
                                on:{
                                    click:()=>{
                                        let para = {
                                            billNo:params.row.BILLNO,
                                            erpTempnum:params.row.ERPTEMPNUM
                                        };
                                        publicInter(interfaceUrl.addUnMergeredMaterialListAfChaiDan,para).then(r=>{
                                            if(r && r.code == '200'){
                                                this.$router.push({
                                                    name: 'sort',
                                                    params: {
                                                        billNo: params.row.BILLNO,
                                                        erpTempnum:params.row.ERPTEMPNUM
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            },'直接生成'),
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on:{
                                    click:()=>{
                                        this.lookBill(params.row.BILLNO,params.row.ERPTEMPNUM);
                                    }
                                }
                            },'查看')
                        ])
                    }
                },
            ],
            exData:[],
            modal1:false,
            model1:"",
            entrustBrokerList:[],
            paramsArray:[],
        }
    },
    methods:{
        /**
         * 初始查询
        */
        initList(){
            publicInter(interfaceUrl.getChaiDanHouBlNos,{}).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.exData = [];
                        for(let i = 0; i < r.result.length;i++){
                            r.result[i].allBLListMap.statusFront = r.result[i].statusFront;
                            this.exData.push(r.result[i].allBLListMap);
                        }
                       
                    }
                }
            })
        },
        //获取报关行
        getCusBroList(){
            let params = {
                "role":"CB",
                "startDate":"",
                "endDate":"",
                "companyName":""
            }
            publicInter(interfaceUrl.getCusBroList,params).then(r => {
                if(r && r.result){
                    this.modal1 = true;
                    this.entrustBrokerList = r.result.listAuthoMap;
                }
            })
        },
        //点击委托
        batchEntrustFun(){
            this.paramsArray = this.$refs.selection.getSelection();
            if(this.paramsArray.length === 0){
                this.$Message.warning("请先选择需要委托的项");
                return;
            }
            let hasEntrustArr = this.paramsArray.filter(function (x) {
                return x.ISENTRUST == "1"
            })
            if(hasEntrustArr.length > 0){
                this.$Message.info({
                    content: '当前选中项中包含已委托数据，请重新选择',
                    duration: 3,
                    closable: true
                });
                return;
            }
            this.getCusBroList();
        },
        //确认委托
        submitEntrustFun(){
            let liParams = [];
            for(let i = 0; i< this.paramsArray.length;i++ ){
                let unit = {};
                unit.BILLNO = this.paramsArray[i].BILLNO;
                unit.id = this.paramsArray[i].ERPTEMPNUM;
                liParams.push(unit);
            }
            let params = {
                customsBrokerCode:this.model1,
                billNos:liParams
            }
            publicInter(interfaceUrl.authoBLToCustomsBrokerAfChaiDan,params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.$Message.success("成功委托"+r.count+"条提单给报关行");
                        this.modal1 = false;
                        this.initList();
                    }
                    else{
                         this.$Message.error(r.error);
                    }
                }
            })
        },
        //撤回委托
        unBatchEntrustFun(){
            this.paramsArray = this.$refs.selection.getSelection();
            if(this.paramsArray.length === 0){
                this.$Message.warning("请先选择需要撤回委托的提单项");
                return;
            }
            let hasEntrustArr = this.paramsArray.filter(function (x) {
                return x.ISENTRUST !== "1"
            })
            if(hasEntrustArr.length > 0){
                this.$Message.info({
                    content: '当前选中项中包含未委托数据，请重新选择',
                    duration: 3,
                    closable: true
                });
                return;
            }
            //进行撤回操作
            let liParams = [];
            for(let i = 0; i< this.paramsArray.length;i++ ){
                let unit = {};
                unit.BILLNO = this.paramsArray[i].BILLNO;
                unit.id = this.paramsArray[i].ERPTEMPNUM;
                unit.BECOMMEDCUSTOMSBROKER = this.paramsArray[i].BECOMMEDCUSTOMSBROKER;
                liParams.push(unit);
            }
            let params = {
                status:"1",
                billNos:liParams
            }
            publicInter(interfaceUrl.changeBLToCustomsBrokerStatusAfChaiDan2,params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.initList();
                        this.$Message.success("成功撤回"+r.result+"条提单");
                    }
                }
            })
        },
        lookBill(billNo,erpTempnum){
            this.$router.push({
                name: 'dismantling',
                params:{
                   billNo: billNo,
                   erpTempnum:erpTempnum
                }
            })
        }
    },
    mounted(){
        this.initList();
    }
}
</script>