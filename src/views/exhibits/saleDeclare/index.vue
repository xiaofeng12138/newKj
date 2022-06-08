<template>
    <div>
        <h1 style="text-align: center">中国国际进口博览会享受税收优惠政策展品确认清单</h1>
        <div style="margin-top: 30px">
            <h2>物资证明函</h2>
            <Table :columns="columnsList" :data="dataList" 
                @on-select="selectSale"
                @on-select-cancel="selectCancel"
                @on-select-all="selectAllSale"
                @on-select-all-cancel="selectCancelAllSale"
                max-height="350"></Table>
        </div>

        <div style="margin-top: 30px">
            <h2>展品确认清单</h2>
            <Table :columns="confirmColumns" :data="confirmList" max-height="350"></Table>
        </div>
        <div style="margin-top: 20px; text-align: center">
            <Button type="primary" style="width: 120px" size="large" long @click="addConfirmInfo">暂存</Button>
            <!-- <Button type="primary" style="width: 120px; margin-left: 20px" size="large" long @click="addConfirmInfo">提交</Button> -->
        </div>

        <Modal v-model="myModel1" width="280" :mask-closable="false" :closable="false">
            <p slot="header" style="text-align:center">
                <span>请选择证明函编号</span>
            </p>
            <div style="text-align:center">
                <Select v-model="certificateno" style="width:240px" filterable>
                    <Option v-for="item in certificatenoList" :value="item.CERTIFICATENO" :key="item.CERTIFICATENO">{{item.CERTIFICATENO}}</Option>
                </Select>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="primary" style="width: 80px" size="large" long @click="submit">确定</Button>
                <Button type="primary" style="width: 80px" size="large" long @click="cancel">返回</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'

export default {
    data() {
        return {
            myModel1: false,
            certificateno: '',
            certificatenoList: [],
            columnsList: [
                {
                    type: 'selection',
                    align: 'center',
                    width: 60
                },
                {
                    title: '序号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '展商名称',
                    key: 'EXHIBITOR',
                    align: 'center'
                },
                {
                    title: '展位号',
                    key: 'POSITION',
                    align: 'center'
                },
                {
                    title: '商品编码',
                    key: 'HSCODE',
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'GOODSDESCRIPTIONCN',
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'QUANTITY',
                    align: 'center'
                },
                {
                    title: '计量单位',
                    key: 'QUANTITYUNIT',
                    align: 'center',
                    render(h,params){
                        return h("span", params.row.QUANTITYUNIT == '011' ? "件" : "")
                    },
                },
                {
                    title: '货值(美元)(证明函总价)',
                    key: 'TOTALPRICE',
                    align: 'center'
                },
                {
                    title: '原产地',
                    key: 'COUNTRYOFORIGIN',
                    align: 'center'
                },
                {
                    title: '对应贸易代理商',
                    key: 'AGENTNAME',
                    align: 'center'
                },
            ],
            confirmColumns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '商品编码',
                    key: 'HSCODE',
                    align: 'center',
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.HSCODE,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].HSCODE = event.target.value;
                                }
                            }
                        })
                    },
                },
                {
                    title: '商品名称',
                    key: 'GOODSDESCRIPTIONCN',
                    align: 'center',
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.GOODSDESCRIPTIONCN,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].GOODSDESCRIPTIONCN = event.target.value;
                                }
                            }
                        })
                    },
                },
                {
                    title: '规则型号',
                    key: 'G_MODEL',
                    align: 'center',
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.G_MODEL,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].G_MODEL = event.target.value;
                                }
                            }
                        })
                    },
                },
                {
                    title: '数量',
                    key: 'QUANTITY',
                    align: 'center',
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.QUANTITY,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.dataList.forEach( item => {
                                        if(item.ITEMUUID == params.row.ITEMUUID) {
                                            if(event.target.value > item.QUANTITY) {
                                                this.$Message.error('不能超出物质证明函数量');
                                                this.confirmList[params.index].QUANTITY = 0;
                                            } else {
                                                this.confirmList[params.index].QUANTITY = event.target.value;
                                            }
                                        }
                                    })
                                }
                            }
                            
                        })
                    },
                },
                {
                    title: '计量单位',
                    key: 'QUANTITYUNIT',
                    align: 'center',
                    render(h,params){
                        return h("span", params.row.QUANTITYUNIT == '011' ? "件" : "")
                    },
                },
                {
                    title: '货值(美元)(证明函总价)',
                    key: 'TOTALPRICE',
                    align: 'center',
                    // width: 160,
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.TOTALPRICE,
                                // type: 'number'
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].TOTALPRICE = event.target.value;
                                }
                            }
                            
                        })
                    },
                },
                {
                    title: '原产地',
                    key: 'COUNTRYOFORIGIN',
                    align: 'center'
                },
                {
                    title: '暂时进境报关单号或保税展示出区备案清单编号',
                    key: 'ENTRY_ID',
                    align: 'center',
                    // width: 200,
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.ENTRY_ID,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].ENTRY_ID = event.target.value;
                                }
                            }
                        })
                    },
                },
                {
                    title: '对应贸易代理商',
                    key: 'AGENTNAME',
                    align: 'center',
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.AGENTNAME,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].AGENTNAME = event.target.value;
                                }
                            }
                        })
                    },
                },
                {
                    title: '备注',
                    key: 'NOTES',
                    align: 'center',
                    render: (h,params) => {
                        return h('Input',{
                            props:{
                                value:params.row.NOTES,
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.confirmList[params.index].NOTES = event.target.value;
                                }
                            }
                        })
                    },
                },
                
            ],
            confirmList: [],
            dataList: []
        }
    },
    created() {
        if(this.$route.params.CERTIFICATENO == undefined) {
            publicInter(interfaceUrl.qryAcceptCertNoByUser, {}).then(r =>{
                if(r.code == '200') {
                    this.certificatenoList = r.list;
                    this.myModel1 = true;
                }
            })
        } else {
            this.certificateno = this.$route.params.CERTIFICATENO;
            this.submit()

        }
        
    },
    methods: {
        addConfirmInfo() {
            publicInter(interfaceUrl.addConfirmInfo, {data: this.confirmList}).then( r => {
                if(r.code == '200') {
                    this.$Message.success(r.msg);
                    this.$router.push({name: 'sellQuery'})
                } else if(r.code == '500') {
                    this.$Message.error(r.msg)
                }
            })
        },
        selectSale(selection, row) {
            this.confirmList.push(row)
        },
        selectCancel(selection, row) {
            this.confirmList.forEach((item,index) => {
                if(item.ITEMUUID == row.ITEMUUID) {
                    this.confirmList.splice(index, 1)
                }
            })
        },
        selectAllSale(selection) {
            for(let i = 0; i < selection.length; i++) {
                let flag = true;
                this.confirmList.forEach((item,index) => {
                    if(item.ITEMUUID == selection[i].ITEMUUID) {
                        flag = false;
                    }
                })
                if(flag) {
                    this.confirmList.push(selection[i])
                }
            }
        },
        selectCancelAllSale(selection) {
            this.confirmList = [];
        },
        cancel() {
            this.$router.push({name: 'sellQuery'})
        },
        submit() {
            if(this.certificateno !== ""){
                publicInter(interfaceUrl.uqryExpoListByCertNorl, {certNo: this.certificateno}).then(r =>{
                    if(r.code == '200') {
                        this.dataList = r.list;
                        this.confirmList = r.list2;
                        for(let i = 0; i < this.confirmList.length; i++) {
                            this.dataList.forEach((item,index) => {
                                if(item.ITEMUUID == this.confirmList[i].ITEMUUID) {
                                    item._checked = true;
                                }
                            })
                        }
                    }
                })
                this.myModel1 = false;
            }
            else{
                this.$Modal.warning({content:"请选择证明函编号"});
            }
            
        },
        lowerJSONKey(jsonObj){
            if(Object.prototype.toString.call(jsonObj) === "[object Array]"){
                for (let i = 0; i < jsonObj.length;i++){
                    this.lowerJSONKey(jsonObj[i])
                }
                return jsonObj;
            }
            else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
                for(let key in jsonObj){
                    jsonObj[key.toLocaleLowerCase()] = jsonObj[key];
                    if(key !== key.toLocaleLowerCase()){
                        delete jsonObj[key];
                    }

                }
                return jsonObj;
            }
        },
    }
}
</script>

<style lang="scss" scoped>

</style>

