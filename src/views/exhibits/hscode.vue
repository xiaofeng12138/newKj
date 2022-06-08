<template>
    <div class="hscodeParent">
        <h1 style='margin-bottom:20px'>HS编码维护</h1>
        <Row>
            提单号：
            <vague :firstVal = 'billNoInput' :url="billUrl" style="width:200px;display: inline-block" @regionVal="regionChange"></vague>
            <Select v-model="model1" style="width:200px;" placeholder="请选择验证状态">
                <Option v-for="item in statusList" :value="item.key" :key="item.key">{{ item.label }}</Option>
            </Select>
            <Button type="primary" @click="query()">查询</Button>
        </Row>
        <Row v-if="errorArr.length  != 0" style="color: #f00">当前有{{errorArr.length }}条数据未通过验证</Row>
        <Table class="self" :row-class-name="rowClassName" ref="selection" :columns="detailColumns" :data="detailData" border style="margin-top: 10px;margin-bottom: 10px"></Table>
        <Row style="margin-bottom: 10px">
            <Button type="primary" @click="check">保存</Button>
        </Row>
    </div>
</template>

<script>
    import interfaceUrl from '@/api/interfaceUrl'
    import { publicInter } from '@/api/http'
    import vague from "./orignUnit/vague"
    export default {
        name: "hscode",
        components:{vague},
        data(){
            return {
                //23456789786
                billNoInput:"",
                detailColumns:[],
                detailData:[],
                //HS校验后错误的信息
                errorArr:[],
                statusList:[{key:"all",label:'全部状态'},{key:"tongguo",label:'通过'},{key:"error",label:'未通过'}],
                model1:"all",
                billUrl:interfaceUrl.queryBillNo
            }
        },
        created(){
          this.init();
        },
        methods:{
            //根据提单号查询
            query(){
                let params = {billNo: this.billNoInput};
                if(this.model1 !== 'all' && this.model1 != ""){
                    params.status = this.model1;
                }
                publicInter(interfaceUrl.queryInfoByBillNo,params).then(r=>{
                    if(r){
                        if(r.isOk){
                            if(Object.prototype.toString.call(r.msg) === '[object Array]'){
                                this.detailData = r.msg;
                                this.errorArr = [];
                                for(let i = 0; i < this.detailData.length;i++){
                                    if(this.detailData[i].status === 'error'){
                                        this.errorArr.push(this.detailData[i].ITEMUUID)
                                    }
                                }
                            }
                            else{
                                this.$Message.warning(r.msg);
                            }

                        }
                        else{
                            this.$Message.error(r.msg);
                        }
                    }
                })
            },
            //HS校验
            check(){
                let selection = this.detailData;
                if(selection.length == 0){
                    this.$Message.info("请选择需要进行HS校验的项");
                    return;
                }
                let selectionNoHs = selection.filter(function (x) {
                    return x.HSCODE === "";
                });
                if(selectionNoHs.length > 0 ){
                    this.$Message.info("校验项的HScode不能为空");
                    return;
                }
                let params = [];
                for (let i = 0; i < selection.length;i++){
                    params.push({
                        uuid:selection[i].ITEMUUID,
                        hscode:selection[i].HSCODE
                    })
                }
                publicInter(interfaceUrl.checkHSCODE,params).then(r=>{
                    if(r){
                        if(r.isOk){
                            this.$Message.success(r.msg);
                            this.errorArr = [];
                        }
                        else {
                            if(Object.prototype.toString.call(r.msg) === '[object Object]'){
                                this.errorArr = Object.keys(r.msg);
                                if( this.errorArr &&  this.errorArr.length != 0){
                                    this.$Message.error("当前有"+this.errorArr.length+"条数据未通过验证")
                                }
                            }
                            else{
                                this.$Message.error(r.msg);
                            }

                        }
                    }
                });
            },
            init() {
                const that = this;
                this.detailColumns = [
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
                    {
                        title: 'Case No.\n箱号',
                        key: 'CASENO',
                        width:80,
                    },
                    {
                        title: 'Net Wt.\n净重(Kg)',
                        key: 'NETWEIGHT',
                        width:80,
                    },
                    {
                        title: 'Description of Exhibits\n展品名称规格',
                        align: 'center',
                        children: [
                            {
                                title: 'English\n英文',
                                key: 'GOODSDESCRIPTION',
                                align: 'center'
                            }, {
                                title: 'Chinese\n中文',
                                key: 'GOODSDESCRIPTIONCN',
                                align: 'center',
                            }]
                    },
                    {
                        title: 'Country of Origin\n原产地',
                        key: 'COUNTRYOFORIGIN',
                        width:114,
                    },
                    {
                        title: 'Quantity\n数量',
                        key: 'QUANTITY',
                        width:86,
                    },
                    {
                        title: 'unit\n单位',
                        key: 'QUANTITYUNIT',
                        width:70,
                    },
                    {
                        title: 'Total\n总价(US$)',
                        key: 'TOTALPRICE',
                        width:70,
                    },
                    {
                        title: 'H.S.No.\n商品代号',
                        key: 'HSCODE',
                        width:80,
                        render(h, params) {
                            return that.renderTable(h, params, "HSCODE")
                        }
                    },
                    {
                        title: 'Disposals 展品处理方法:\na.Sold已售\nb.Return运回\nc.Abandoned & Consumed放弃和消耗\nd.Others其他',
                        key: 'DISPOSALS',
                        width:120,
                    },
                    {
                        title: '参展商',
                        key: 'EXHIBITOR',
                        width:70
                    },{
                        title: '参展商\n国别 ',
                        key: 'EXHIBITORCOUNTRY',
                        width:70
                    },
                    {
                        title: '馆号',
                        key: 'HALLNO',
                        width:70
                    },
                    {
                        title: '展馆号',
                        key: 'BOOTHNO',
                        width:70
                    }
                ]
            },
            renderTable(h,params,key){
                return h("Input",{
                    props:{
                        value:params.row[key]
                    },
                    style:{
                        width:'100%',
                        height:'32px'
                    },
                    attrs:{
                        maxlength:15
                    },
                    on:{
                        "on-blur":(event)=>{
                            this.detailData[params.index][key] = event.target.value;
                        }
                    }
                })
            },
            //给错误项上色
            rowClassName (row, index) {
                if(this.errorArr.indexOf(row.ITEMUUID) != -1){
                    return 'demo-table-info-row'
                }
                return '';
            },
            //模糊搜索提单号
            regionChange(val){
                this.billNoInput = val;
            },
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">


</style>