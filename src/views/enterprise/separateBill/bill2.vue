<template lang="html">
    <div>
        <h1 style="margin-bottom: 20px">委托报关行提单</h1>
        <Row style="margin-bottom: 10px;">
            <Col span="2"><span class="centerSpan">预计到港时间</span></Col>
            <Col span="5">
                <DatePicker type="daterange" v-model="arrivalDate" placement="bottom-start" placeholder="选择到港时间" style="width: 200px">
                </DatePicker>
            </Col>
            <!--<Col span="2"><span class="centerSpan">委托报关行</span></Col>-->
            <!--<Col span="5">-->
                <!--<Select v-model="model1" style="width:200px">-->
                    <!--<Option v-for="item in entrustBrokerList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
            <!--</Col>-->
            <!--<Col span="2"><span class="centerSpan">委托状态</span></Col>-->
            <!--<Col span="5">-->
                <!--<Select v-model="model2" style="width:200px">-->
                    <!--<Option v-for="item in entrustStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
            <!--</Col>-->
            <Col span="2">
                <Button type="primary" long @click="query()">查询</Button>
            </Col>
        </Row>
        <Table border ref="selection" :columns="columns1" :data="data1" no-data-text="-"></Table>
        <Row style="margin-top: 10px;">
            <Button type="primary" style="margin-right: 20px" @click="batchEntrustFun('')">批量委托</Button>
            <Button type="primary" @click="unBatchEntrustFun('')">批量撤回</Button>
        </Row>
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
    import myTooltip2 from '@/views/baoguanSearch/myTooltip2'
    import {getUserRole} from '../../until/getToken'

    export default {
        name: "bill2",
        data(){
            return {
                arrivalDate:"",
                entrustBrokerList:[],
                entrustStateList:[{
                    value:"",
                    label:'全部'
                },{
                    value:"0",
                    label:'未委托'
                },{
                    value:"1",
                    label:'委托'
                }],
                model1:"",
                model2:"",
                columns1:[{
                    type:'selection',
                    width:58,
                    align:'center'
                },
                {
                    title:'提单号',
                    key:'BILLNO'
                },{
                    title:'委托报关行名称',
                    key:'brokerName'
                },{
                    title:'预计到港时间',
                    key:'BERTH_ARR_DT_GMT'
                },{
                    title:'状态',
                    render:(h, params) =>{
                        return h(myTooltip2,{
                            props:{
                                content:params.row.statusFront,
                                data1:params.row.listStatus
                            }
                        })
                    }
                },{
                    title:'操作',
                    width:220,
                    render:(h, params)=>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type:'primary'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                attrs:{
                                    disabled:params.row.ISENTRUST == "1"?true:false
                                },
                                on:{
                                    click:()=>{
                                        var paramsArray = [];
                                        paramsArray.push(params.row);
                                        this.batchEntrustFun(paramsArray);
                                    }
                                }
                            },'委托'),
                            h('Button',{
                                props:{
                                    type:'primary'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                attrs:{
                                    disabled:params.row.ISENTRUST == "1"?false:true
                                },
                                on:{
                                    click:()=>{
                                        var paramsArray = [];
                                        paramsArray.push(params.row);
                                        this.unBatchEntrustFun(paramsArray);
                                    }
                                }
                            },'撤回')
                        ])
                    }
                }],
                data1:[],
                modal1:false,
                paramsArray:[],
                role:""
            }
        },
        created(){
            this.role=getUserRole();
            
            sessionStorage.setItem('role',this.role);
        },
        methods:{
            //查询报关行
            query(){
                let params = {
                    authoStartDate:this.formatDate(this.arrivalDate[0]),
                    authoEndDate:this.formatDate(this.arrivalDate[1]),
                    status:1
                }
                publicInter(interfaceUrl.queryBLList,params).then(r => {
                    if(r){
                        this.data1 = [];
                        r = r.result;
                        for(var i = 0; i < r.length;i++){
                            if(!r[i].allBLListMap.ISENTRUST && (r[i].allBLListMap.ACTION == "I1" || r[i].allBLListMap.ACTION == "I2")){

                            }
                            else{
                                r[i].allBLListMap.statusFront = r[i].statusFront;
                                this.data1.push(r[i].allBLListMap);
                            }
                        }
                    }
                })
            },
            formatDate(form){
                if(form){
                    var year = form.getFullYear();
                    var mouth=form.getMonth()+1
                    var date=form.getDate();
                    return year+"-"+(mouth<10?("0"+mouth):mouth)+"-"+(date<10? ("0"+date):date);
                }
                return "";
            },
            //批量委托,获取所有报关行
            batchEntrustFun(paramsArray){
                this.paramsArray = paramsArray || this.$refs.selection.getSelection();
                if(this.paramsArray.length == 0){
                    this.$Message.info({
                        content: '请先勾选需要操作的数据',
                        duration: 3,
                        closable: true
                    });
                    return;
                }
                //判断批量委托里面是否有已委托信息
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

                //获取所有报关行
                var params = {
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
            //确认委托
            submitEntrustFun(){
                if(!this.model1){
                    this.$Message.warning({content:'请先选择委托报关行',duration: 3})
                    return;
                }
                var params = {
                    billNos: this.paramsArray,
                    customsBrokerCode: this.model1
                }
                publicInter(interfaceUrl.authoBLToCustomsBroker,params).then(r => {
                    if(r){
                        if(r.code == "200"){
                            this.modal1 = false;
                            this.$Message.info({
                                content: r.result,
                                duration: 3,
                                closable: true
                            });
                            this.query();
                        }
                        else{
                            this.$Message.info({
                                content: r.error,
                                duration: 3,
                                closable: true
                            });
                        }
                    }
                })
            },
            //撤回委托
            unBatchEntrustFun(paramsArray){
                var selection = paramsArray || this.$refs.selection.getSelection();
                if(selection.length == 0){
                    this.$Message.info({
                        content: '请先勾选需要操作的数据',
                        duration: 3,
                        closable: true
                    });
                    return;
                }
                //判断批量委托里面是否有未委托信息
                let hasEntrustArr = selection.filter(function (x) {
                    return x.ISENTRUST !== "1"
                })
                if(hasEntrustArr.length > 0){
                    this.$Message.info({
                        content: '当前选择中含有无需撤回项，请重新选择',
                        duration: 3,
                        closable: true
                    });
                    return;
                }
                var billNos = [];
                for(var i = 0; i < selection.length; i++){
                    billNos.push({BILLNO:selection[i].BILLNO,BECOMMEDCUSTOMSBROKER:selection[i].BECOMMEDCUSTOMSBROKER});
                }
                var params = {
                    billNos: billNos,
                    status:1
                }
                let url = this.role.includes('CB')?interfaceUrl.changeBLToCustomsBrokerStatuscb:interfaceUrl.changeBLToCustomsBrokerStatus;
                publicInter(url,params).then(r => {
                    if(r){
                        if(r.code == "200"){
                            this.modal1 = false;
                            this.$Message.info({
                                content: r.result || r.msg,
                                duration: 3,
                                closable: true
                            });
                            this.query();

                        }
                        else{
                            this.$Message.info({
                                content: r.error,
                                duration: 3,
                                closable: true
                            });
                        }
                    }
                })
            },
            formatDate(form){
                if(form){
                    var year = form.getFullYear();
                    var mouth=form.getMonth()+1
                    var date=form.getDate();
                    return year+"-"+(mouth<10?("0"+mouth):mouth)+"-"+(date<10? ("0"+date):date);
                }
                return "";
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.centerSpan{
    line-height: 32px;
}
</style>