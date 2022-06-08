<template>
    <div>
        <h1 style="padding-bottom: 20px;">管理报关行</h1>
        <Row style="margin: 10px 0;">
            <!--<Col span="2"><span class="centerSpan">委托状态</span></Col>-->
            <!--<Col span="5">-->
                <!--<Select v-model="select1" style="width:200px">-->
                    <!--<Option v-for="item in entrustStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
            <!--</Col>-->
            <Col span="2">
                <span class="centerSpan">报关行名称</span>
            </Col>
            <Col span="5">
                <Input v-model="input1" placeholder="报关行名称" style="width: 200px" clearable></Input>
            </Col>
            <Col span="2">
                <span class="centerSpan">企业信用代码</span>
            </Col>
            <Col span="5">
                <Input v-model="input2" placeholder="企业信用代码" style="width: 200px" clearable></Input>
            </Col>
            <!--<Col span="2">-->
                <!--<span class="centerSpan">委托时间</span>-->
            <!--</Col>-->
            <!--<Col span="5">-->
                <!--<DatePicker type="daterange" v-model="entrustDate" placement="bottom-end" placeholder="委托时间" style="width: 200px">-->
                <!--</DatePicker>-->
            <!--</Col>-->
            <Col span="2">
                <Button type="primary" long @click="query">查询</Button>
            </Col>
        </Row>
        <Table border ref="selection" :columns="columns1" :data="data1" no-data-text="-"></Table>
        <Row style="margin-top: 10px;">
            <Button type="primary" style="margin-right: 20px" @click="batchEntrustFun('1')">批量委托</Button>
            <Button type="primary" @click="batchEntrustFun('2')">批量解除委托</Button>
        </Row>
    </div>
</template>

<script>
    import { publicInter } from '@/api/http'
    import interfaceUrl from '@/api/interfaceUrl'
    export default {
        name: "manageCustom",
        data(){
            return {
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
                select1:"",
                input1:"",
                input2:"",
                //entrustDate:"",
                columns1:[{
                    type:'selection',
                    width:58,
                    align:'center'
                },{
                    title:'报关行名称',
                    key:'NAME_CHINESE'
                },{
                    title:'企业信用代码',
                    key:'CNCOMPANYCODECB'
                },{
                    title:'海关企业编码',
                    key:'CNCOMPANYOLDCODE'
                },{
                    title:'委托时间',
                    key:'REC_UPD_DT'
                },{
                    title:'是否已委托',
                    key:"status",
                    render:(h, params)=>{
                        switch (params.row.status){
                            case "0":
                                return h('span',"未委托");
                                break;
                            case "1":
                                return h('span',"已委托");
                                break;
                        }
                    },
                    filters: [
                        {
                            label: '已委托',
                            value: "1"
                        },
                        {
                            label: '未委托',
                            value: "0"
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        return value === row.status;
                    }
                },{
                    title:'操作',
                    width:190,
                    render:(h, params)=>{
                        return h('div',[
                            h('Button',{
                                props:{
                                    type:'primary'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on:{
                                    click:()=>{
                                        var paramsArray = [];
                                        paramsArray.push(params.row);
                                        this.batchEntrustFun("1",paramsArray);
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
                                on:{
                                    click:()=>{
                                        var paramsArray = [];
                                        paramsArray.push(params.row);
                                        this.batchEntrustFun("2",paramsArray);
                                    }
                                }
                            },'解除委托')
                        ])
                    }
                }],
                data1:[]
            }
        },
        methods:{
            query(){
                var params = {
                    "role":"CB",
                    
                    // "startDate":this.formatDate(this.entrustDate[0]),
                    // "endDate":this.formatDate(this.entrustDate[1]),
                    "companyName":this.input1,
                    'becommedcustomsbrokercode':this.input2
                }
                publicInter(interfaceUrl.getCusBroList,params).then(r=>{
                    if(r){
                        this.data1 = [];
                        r = r.result;
                        for (var i = 0; i < r.listAuthoMap.length;i++){
                            r.listAuthoMap[i].status = "1";
                            this.data1.push(r.listAuthoMap[i]);
                        }
                        for (var j = 0; j < r.listUnAuthoMap.length;j++){
                            r.listUnAuthoMap[j].status = "0";
                            this.data1.push(r.listUnAuthoMap[j]);
                        }
                    }
                })
            },
            //批量委托
            batchEntrustFun(flagParam,rowParam){
                var brokers = rowParam || this.$refs.selection.getSelection();
                if(brokers.length == 0){
                    this.$Message.info({
                        content: '请先勾选需要操作的报关行',
                        duration: 5,
                        closable: true
                    });
                    return;
                }
                var params = {
                    flag: flagParam,
                    brokers: brokers
                }
                publicInter(interfaceUrl.addOrRemoveCusBroList,params).then(r=>{
                    if(r){
                        this.query();
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
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .centerSpan{
        line-height: 32px;
    }

</style>
