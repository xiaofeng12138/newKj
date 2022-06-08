<template>
    <div>
        <Row  style="margin-bottom:20px">
            <Col span=5>
                <DatePicker v-model="time" size="large" type="date" style="width:100%;margin:0 1px" placeholder="请选择日期" class="self"></DatePicker></Col>
            <Col span=4>
                <Select v-model="timeRange" size="large">
                    <Option v-for="item in endTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span=7 push=1>
                <Col span=6 style="height:36px;line-height:36px;font-size:14px">
                    <b>合同编号</b>
                </Col>
                <Col span=18>
                     <Input v-model="queryParmas.contractNO" size="large" placeholder="请输入合同编号" clearable ></Input>
                </Col>
            </Col>
            <Col span=2 push=2>
                <Button type="primary" size='large' long @click="query">查询</Button>
            </Col>

        </Row>
        <Table  :columns="columns1" :data="data1" class="self"></Table>
         <Page :total="totalCount" v-if="totalCount"
          :page-size='20'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
            <!-- <detail ref="selfModal" :showField='filed' :title="'财务数据详情'"></detail> -->
    </div>
</template>
<script>
// import pdfView from '@/components/PDFView'
import Tablepdf from '@/components/tablePdf'
// import {financeLists,financeDetail,financeDelete} from '../../../api/finance'
import {fromate,getNextTime} from '../../../until/fromTime'
import detail from '@/components/ERPSearch/detail/index'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{
        detail,Tablepdf
    },
    data(){
        return{
            data1:[],
            totalCount:'',
            time:new Date(),
            total:null,
            timeRange:1,
            filed:{
                bodyHead:[],
                body:[],
                head:[
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'ContractNO',value:'合同编号（到银行办理国际业务所用）'},
                    {key:'SellerCompanyCodeVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    {key:'SellerCountryISOCode',value:'外方国家代码(ISO)'},
                    {key:'SellerCountryZHCode',value:'外方国家中国海关代码'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    {key:'PaymentTerm',value:'付款方式'},
                    {key:'PayerAccountNumber',value:'付款方账号'},
                    {key:'PayeeAccountNumber',value:'收款方账号'},
                    {key:'PayeeBICSwift',value:'收款方银行识别码'},
                    {key:'Beneficiary',value:'受益人名称'},
                    {key:'PaymentAmount',value:'付款金额'},
                    {key:'Currency',value:'货币种类'},
                    {key:'CurrencyZH',value:'货币种类中国海关标准'},
                    {key:'ExchangeRate',value:'汇率（外币对人民币）（单位1)'},
                    {key:'ReferenceNumber',value:'银行业务编号'},
                    {key:'ScheduledTime',value:'计划付款时间'},
                    {key:'ActualTime',value:'实际付款时间'},
                    {key:'InvoiceNo',value:'发票号'},
                    {key:'EntryId',value:'报关单号'}
                ]
            },
            queryParmas:{
                contractNO:'',
                startDate:'',
	            endDate:'',
	            pageNum:1,
	            pageSize:20
            },
            endTime:[
                {
                    label:'及前一个月',
                    value:1,
                },
                {
                    label:'及前两个月',
                    value:2,
                },
                {
                    label:'及三个月',
                    value:3,
                },
            ],
            columns1:[
                {
                    key:'CNCOMPANYCODE',
                    title:'中方公司代码(企业信用代码)'
                },
                {
                    key:'CONTRACTNO',
                    title:'合同编号'
                },
                {
                    key:'SELLERCOMPANYCODEVAT',
                    title:'第一境外公司代码'
                },
                {
                    key:'PURCHASEORDERNO',
                    title:'采购订单编号'
                },
                {
                    key:'PAYERACCOUNTNUMBER',
                    title:'付款方账号'
                },
                {
                        title: '上传时间',
                        key: 'CREATEDATE'
                },
                {
                    title:'操作',
                     width: 240,
                     align:'center',
                     render: (h, params) => {
                            const that=this
                            return h('div', [
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'large'
                                    },
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on:{
                                        click(){
                                            that.getdetail(params.row.CONTRACTNO,params.row.ACTUALTIME)
                                        }
                                    }
                                },'查看'),
                                 h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'companyFinance'
                                    },
                                    on:{
                                        'viewPdf':(data)=>{
                                             this.$emit('lookPDF',data)
                                        }
                                    }
                                }),
                                h('Poptip', {
                                    props: {
                                       confirm: '',
                                       placement:'top-end',
                                       title:"您确认删除这条内容吗？"
                                    },
                                    style:{
                                        textAlign:'left'
                                    },
                                    nativeOn:{
                                       click(e){
                                           e.stopPropagation()
                                           var text=e.target.innerText.replace(/\s+/g,"")
                                           if(text==='确定'||text==='ok'){
                                               that.cancel(params.row.CONTRACTNO,params.index,params.row.ACTUALTIME)
                                           }
                                        //    console.log(e.target.innerHTML,params.row.AGREEMENTID)
                                        //    that.ok()
                                       }
                                    }
                                },[
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size:'large'
                                    },
                                     style:{
                                        marginLeft:'10px'
                                    }
                                },'删除')])

                            ])
                        }
                }
            ]
        }
    },
    methods:{
        query(){
            var {startDate,endDate}=getNextTime(this.time,this.timeRange);
            this.queryParmas.startDate=startDate;
            this.queryParmas.endDate=endDate;
             this.queryParmas.pageNum=1
             this.getLists()
        },
        pageChange(pageNum){
            this.queryParmas.pageNum=pageNum
            this.getLists()
        },
        getLists(){
            publicInter(interfaceUrl.FinanceList,this.queryParmas).then(r=>{
                 r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            })
        },
        getdetail(num,time){
            publicInter(interfaceUrl.FinanceDetail,{contractNO:num,actualTime:time}).then(r=>{
                // this.$refs.selfModal.modal=true
                // this.$refs.selfModal.content=r
                this.$emit('showDetail',{title:'财务数据详情',data:r,key:this.filed})
            })
        },
        cancel(num,index,time){
            publicInter(interfaceUrl.delFinance,{contractNO:num,actualTime:time}).then(r=>{
                this.data1.splice(index,1)
                    this.$Message.success('删除成功！')
                    this.totalCount--
            })
        }
    }

}
</script>
<style lang="scss" scoped>
h1{
    padding-bottom: 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ececec;
}

</style>
