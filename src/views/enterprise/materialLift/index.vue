<template>
    <div class="materialLift">
        <!-- <h1 style="margin-bottom:20px">进博会物资快放情况查询</h1> -->
        <Row style="margin-bottom:10px; text-align:left;">       
            <span style="font-size: 16px">提运单号:</span>
            <Input v-model="billNo"   size='large' style="width:150px;margin-right:20px;" />
            <span style="font-size: 16px">报关单号:</span>
            <Input v-model="certificateno" size='large' style="width:150px;margin-right:20px;" />
            <span  style="font-size: 16px">处理:</span>
            <Select v-model="status" size='large'  style="width:150px;margin-right:20px;">
                <Option v-for="item in stateList" :key="item.value" :value="item.value">
                    {{ item.label }}
                </Option>
            </Select>
            <!-- <span style="font-size: 16px">发送时间:</span>
            <DatePicker size='large' type='date' v-model="sendTime" class="customDatePicker"  style="width:150px;margin-right:20px;"></DatePicker> -->
            <Button type="primary" size='large' @click="commitButton">查询</Button>
        </Row>
        <Table border :columns="columns" :data="dataList"></Table>
        <Page :total="total" v-if="total>0"
                :page-size=10
                @on-change='pageChange'
                show-total
                class="customPage"
            />
    </div>
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import { getCookie } from '@/until/getToken';
export default {
    data(){
        return {
            stateList:[
                {
                    value:"",
                    label:'全部'
                },{
                    value:"0",
                    label:'未处理'
                },{
                    value:"1",
                    label:'已处理'
                }
            ],
            columns:[
                {
                    title:'报关单号',
                    key:'CERTIFICATENO',
                    align:'center',
                },
                {
                    title:'产销国',
                    key:'COUNTRYCODE',
                    align:'center'
                },
                {
                    title:'船名',
                    key:'TRANSPORTNAME',
                    align:'center'
                },
                {
                    title:'进境日期',
                    key:'IMPORTDATE',
                    align:'center',
                    render:(h,params)=>{
                        var date = params.row.IMPORTDATE;
                        try{
                            if(params.row.IMPORTDATE.indexOf(" ") != -1){
                                date = date.split(" ")[0];
                            }
                        }catch(e){
                            console.log(e);
                        }
                        
                        return h('span',date);
                    }
                },
                {
                    title:'提运单号',
                    key:'BILLNO',
                    align:'center'
                },
                {
                    title:'毛重',
                    key:'WEIGHT',
                    align:'center'
                },
                {
                    title:'件数',
                    key:'PACKAGEQUANTITY',
                    align:'center'
                },
                {
                    title:'经营单位名称',
                    key:'COMPANYNAME',
                    align:'center'
                },
                {
                    title:'经营单位代码',
                    key:'COMPANYCODE',
                    align:'center'
                },
                {
                    title:'申报单位名称',
                    key:'AGENTNAME',
                    align:'center'
                },
                {
                    title:'申报单位代码',
                    key:'AGENTCODE',
                    align:'center'
                },
                {
                    title:'运输方式',
                    key:'CONTACTNAME',
                    align:'center'
                },
                {
                    title:'处理状态',
                    align:'center',
                    render: (h,params) => {
                        return h('span', params.row.DEALFLAG == 0 ? '':'已申请')
                    }
                },
                {
                    title: '操作',
                    align:'center',
                    render: (h, params) => {

                        return h('Poptip', {
                                props: {
                                    confirm: '',
                                    placement:'top-end',
                                    title:"您确定提交吗？"
                                },
                                style:{
                                    textAlign:'left',
                                    
                                },
                                nativeOn:{
                                    click: e => {
                                        e.stopPropagation() 
                                        var text=e.target.innerText.replace(/\s+/g,"")
                                        if(text==='确定'||text==='ok'){
                                            let p = {
                                                certificateno: params.row.CERTIFICATENO,
                                                billno: params.row.BILLNO
                                            }
                                            publicInter(interfaceUrl.dealMaterialLift, p).then(r => {
                                                if(r.code == '200') {
                                                    this.$Message.success(r.msg);
                                                    this.query()
                                                }
                                            })
                                        }
                                    }
                                }
                            },[
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                attrs: {
                                    disabled: params.row.DEALFLAG == '1'
                                },
                                style:{
                                    marginLeft:'10px',
                                    display: false
                                }
                            },'提交')])
                    }
                }
            ],
            dataList:[],
            total:0,
            queryParam:{
                certificateno:"",
                billNo:"",
                status:"",
                // sendTime:"",
                pageNum:1,
                pageSize:10
            },
            // sendTime:"",
            status:"",
            certificateno:"",
            billNo:"",
        }
    },
    methods:{
        pageChange(page){
            this.queryParam.pageNum = page;
            this.query();
        },
        query(){
            let url = interfaceUrl.qryMaterialLiftlist;
            publicInter(url,this.queryParam).then(r=>{
                this.dataList = r.list;
                this.total = r.totalRow;
                    
            });
        },
        formatDate(form){
            if(form){
                var year = form.getFullYear();
                var mouth=form.getMonth()+1
                var date=form.getDate();
                return year+(mouth<10?("0"+mouth):(""+mouth))+(date<10? ("0"+date):(""+date));
            }
            return "";
        },
        commitButton() {
            this.queryParam.pageNum = 1;
            this.queryParam.certificateno = this.certificateno;
            this.queryParam.billNo = this.billNo;
            this.queryParam.status = this.status;
            this.query()
        }
    },
    mounted(){
        this.query()
    }
}
</script>
<style lang="scss" scoped>
.labelText{
    display:inline-block;
    vertical-align:middle;
    color:#fff;
    font-size:14px;

}
</style>
