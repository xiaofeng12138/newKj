<template>
  <div class="agreements" >
       
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.invoiceNo" size="large" placeholder="请输入销售订单编号" clearable style="width: 25%;margin-right:30px"></Input>
        <div class="btnBox">
            <Button type="primary" size='large' long @click="query">查询1</Button>
        </div>
        <Table  :columns="columns1" :data="data1" class="self"></Table>
         <Page :total="totalCount" v-if="totalCount" 
          :page-size='20'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
        <!-- <detail ref="selfModal" :showField='filed' :title="'发票详情'"></detail> -->
  </div>
</template>
<script>
import detail from '@/components/ERPSearch/detail/index'
import Tablepdf from '@/components/tablePdf'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import {fromate,getNextTime} from '../../../until/fromTime'
export default {
    name:'bill',
    components:{
        detail,Tablepdf
    },
    data(){
        return{
            filed:{
                head:[
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'SellerOrderASN',value:'销售订单编号（或者ASN号）'},
                    {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    {key:'ContractNO',value:'合同编号'},
                    {key:'AgreementID',value:'框架协议编号'},
                    {key:'SellerCompanyVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    {key:'SellerCompanyCode',value:'第一境外公司代码(在中方企业系统中的编号)'},
                    {key:'CompanyNameEn',value:'第一境外公司英文简称'},
                    {key:'CompanyFullNameEn',value:'第一境外公司英文名称'},
                    {key:'CompanyNameZH',value:'第一境外公司中文简称'},
                    {key:'CompanyFullNameZH',value:'第一境外公司中文全称'},
                    {key:'CountryCodeISO',value:'第一境外公司国家代码ISO(国际标准)'},
                    {key:'CountryCodeZH',value:'第一境外公司国家代码（中国海关标准）'},
                    {key:'CountryFullNameEn',value:'第一境外公司国家英文名称'},
                    {key:'CountryNameZH',value:'第一境外公司国家中文简称'},
                    {key:'CountryFullNameZH',value:'第一境外公司国家中文全称'},
                    {key:'CompanyAddress',value:'第一境外公司地址'},
                    {key:'CompanyTelephone',value:'第一境外公司电话'},
                    {key:'CompanyFax',value:'第一境外公司传真'},
                    {key:'CompanyEmailAdress',value:'第一境外公司电子邮箱'},
                    {key:'InCoTerm',value:'报关单成交方式'},
                    {key: "InCoTermCompany", value: "企业成交方式" },
                    {key:'OrderDate',value:'订单日期'},
                    {key:'EmailAdress',value:'中方企业官方电子邮箱'},
                    {key: "expostatus", value: "进口博览会标志" },
                    {key:'exposellercompanyid',value:'境外企业进口博览会编号'},
                    {key:'TransportMode',value:'运输方式'}
                ],
                bodyHead:{
                    body1:[
                        {key:'SellerOrderASN',value:'销售订单编号'},
                        {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                        {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                        {key:'MaterialNO',value:'物料编号'}
                    ]
                },
                body:[
                    // {key:'InvoiceNo',value:'发票号'},
                    // {key:'SellerCompanyCodeVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    // {key:'InvoiceItem',value:'发票项号'},
                    {key:'SellerOrderASN',value:'销售订单编号（或者ASN号）'},
                    {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'SellerOrderItem',value:'销售订单项号'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    // {key:'PurchaseOrderItem',value:'采购订单项号'},
                    // {key:'Item',value:'项号'},
                    {key:'MaterialNO',value:'物料编号'},
                    // {key:'TotalPrice',value:'总价'},
                    // {key:'OthreCosts',value:'附加费用金额'},
                    // {key:'ExchangeRate',value:'汇率（外币对人民币）（单位1)'},
                    {key:'GoodsDesZH',value:'商品中文描述'},
                    {key:'GoodsDesEN',value:'商品英文描述'},
                    {key:'DeliveryDate',value:'预计货物到仓库的交货日期'},
                    // {key:'OriginCountryCode',value:'原产国海关代码'},
                    // {key:'OriginCountryISOCode',value:'原产国ISO(国际标准)代码'},
                    // {key:'OriginCountryNameEn',value:'原产国英文名称'},
                    {key:'TotalQuantity',value:'数量'},
                    {key:'TotalQuantityUnit',value:'数量单位'},
                    {key:'GroupQuantity',value:'单位组数量'},
                    {key:'GroupQuantityUnit',value:'单位组数量单位'},
                    {key:'GroupQuantityUnitName',value:'单位组数量单位名称'},
                    {key:'Quantity',value:'每单位数量'},
                    {key:'QuantityUnit',value:'每单位数量的单位'},
                    {key:'GroupWeight',value:'单位组重量'},
                    {key:'GroupWeightUnit',value:'单位组重量单位'},
                    {key:'Weight',value:'每单位重量'},
                    {key:'WeightUnit',value:'每单位重量的单位'},
                    // {key:'GroupNetWeight',value:'单位组净重'},
                    // {key:'GroupNetWeightUnit',value:'单位组净重重量单位'},
                    // {key:'NetWeight',value:'净重'},
                    // {key:'NetWeightUnit',value:'净重重量单位'},
                    {key:'GroupUnitPrice',value:'单位组单价'},
                    {key:'UnitPrice',value:'单价'},
                    {key:'TotalPrice',value:'总价'},
                    {key:'Currency',value:'货币种类'},
                    {key:'CurrencyZH',value:'货币种类中国海关标准'},
                    {key:'ExchangeRate',value:'汇率（外币对人民币）（单位1)'},
                    {key:'IsProcessingTrade',value:'是否为加工贸易'},
                    {key:'OriginCountryCode',value:'原产国海关代码'},
                    {key:'OriginCountryISOCode',value:'原产国ISO(国际标准)代码'},
                    {key:'OriginCountryNameEn',value:'原产国英文名称'},
                    {key:'ProducerBatchNo',value:'生产商批次号'},
                    {key:'BWBatchNo',value:'仓储企业批次号'}
                ]
            },
            content:null,
            valueSelect:1,
            time:new Date(),
            form:{
                sellerOrderASN:'',
                startDate:'',
                endDate:'',
                pageNum:1,
                pageSize:20
            },
            totalCount:null,
             columns1: [
                    {
                        title: '销售订单编号',
                        key: 'SELLERORDERASN'
                    },
                    {
                        title: '销售订单号种类，（1=销售订单号 2=ASN号）',
                        key: 'SOORASN'
                    },
                    {
                        title: '合同编号',
                        key: 'CONTRACTNO'
                    },
                    {
                        title: '中方公司代码',
                        key: 'CNCOMPANYCODE'
                    },
                    {
                        title: '订单日期',
                        key: 'ORDERDATE'
                    },
                     {

                        title: '操作1',
                        key: 'action',
                        width: 240,
                        align: 'center',
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
                                            that.getdetail(params.row.SELLERORDERASN)
                                        }
                                    }
                                },'查看'),
                                h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'cnSellerOrder'
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
                                               that.cancel(params.row.SELLERORDERASN,params.index)
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
                        }}
                ],
                data1: [],
               cityList: [
                    {
                        value: 1,
                        label: '及前一个月内'
                    },
                    {
                        value: 2,
                        label: '及前两个月内'
                    },
                    {
                        value: 3,
                        label: '及前三个月内'
                    }
                ],
        }
    },
    created(){
       this.query()
    },
    methods:{
        query(){
            var {startDate,endDate}=getNextTime(this.time,this.valueSelect);
            this.form.startDate=startDate;
            this.form.endDate=endDate;
            
            this.form.pageNum=1
            this.getLists()
        },
        pageChange(page){
            this.form.pageNum=page
            this.getLists()
        },
        getLists(){
            publicInter(interfaceUrl.querySaleOrderList,this.form).then(r=>{
                r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            }    
        )},
        getdetail(id){
            publicInter(interfaceUrl.querySaleOrderDetails,{sellerOrderASN:id}).then(r=>{
                // this.$refs.selfModal.modal=true
                // this.$refs.selfModal.content=r
                // this.$refs.selfModal.data1=r.BodyDetail
                this.$emit('showDetail',{title:'销售订单详情',data:r,key:this.filed})
            })

        },
        cancel(id,index){
            publicInter(interfaceUrl.deleteSaleOrder,{sellerOrderASN:id}).then(r=>{
                if(r&&r.code==='200'){
                    this.data1.splice(index,1)
                    this.$Message.success('删除成功！')
                    this.totalCount--
                }
            })
        }

    }    
}
</script>
<style lang="scss" scoped>
    .agreements{
        button{
            background-color: rgb(0,80,141);
        }
        min-height: 350px;
        padding-left: 1px;
        .btnBox{
            display: inline-block;
            width: 150px;
        }
        .ivu-table-wrapper{
            margin-top: 30px;
        }
        

    }
</style>


