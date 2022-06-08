<template>
   <div class="agreements" >
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:20px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.purchaseOrderNO" size="large" placeholder="请输入采购订单编号" clearable style="width: 20%;margin-right:20px"></Input>
          <Input v-model="form.contractNo" size="large" placeholder="请输入合同编号" clearable style="width: 20%;margin-right:20px"></Input>
        <div class="btnBox">
            <Button type="primary" size='large' long @click="query">查询</Button>
        </div>
        <Table  :columns="columns1" :data="data1" class="self"></Table>
         <Page :total="totalCount" v-if="totalCount" 
          :page-size='20'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
        <!-- <detail ref="selfModal" :showField='filed' :title="'采购订单详情'"></detail> -->
  </div>
</template>
<script>
import detail from './detail/index'
import pdfView from '@/components/PDFView'
import Tablepdf from '@/components/tablePdf'
import {fromate,getNextTime} from '../../until/fromTime'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
  name:'corder',
   components:{
        detail,Tablepdf,pdfView
    },
   data(){
        return{
            content:null,
            valueSelect:1,
            totalCount:null,
            time:new Date(),
            form:{
               purchaseOrderNO:'',
                startDate:'',
                endDate:'',
                contractNo:'',
                pageNum:1,
                pageSize:20
            },
            url:'/ep/purchaseOrder/queryOrderList',
            filed:{
                head:[                    
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
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
                    {key:'SellerOrderASN',value:'销售订单编号（或者ASN号）'},
                    {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                    {key:'InCoTerm',value:'报关单成交方式'},
                    {key: "InCoTermCompany", value: "企业成交方式" },
                    {key:'OrderDate',value:'订单日期'},
                    {key:'EmailAdress',value:'中方企业电子邮箱'}
                ],
                bodyHead:{
                    body1:[
                        {key:'PURCHASEORDERNO',value:'采购订单编号'},
                        {key:'SELLERORDERASN',value:'销售订单编号（或者ASN号）'},
                       {key:'CNCOMPANYCODE',value:'中方公司代码(企业信用代码)'},
                       {key:'ITEM',value:'采购订单项号'},
                      {key:'MATERIALNO',value:'物料编号'}  
                    ]
                },
                body:[
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    //  {key:'PurchaseOrderNO',value:'采购订单编号'},
                    // {key:'SellerOrderASN',value:'销售订单编号（或者ASN号）'},
                    {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                    // {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    // {key:'Item',value:'项号'},
                    // {key:'MaterialNO',value:'物料编号'},
                    {key:'GoodsDesZH',value:'商品中文描述'},
                    {key:'GoodsDesEN',value:'商品英文描述'},
                    {key:'DeliveryDate',value:'预计货物到仓库的交货日期'},
                    {key:'TotalQuantity',value:'总数量'},
                    {key:'ORIGINCOUNTRYCODE',value:'原产国海关代码'},
                    {key:'ORIGINCOUNTRYISOCODE',value:'原产国ISO(国际标准)代码'},
                    {key:'ORIGINCOUNTRYNAMEEN',value:'原产国英文名称'},
                    {key:'TotalQuantityUnit',value:'总数量的单位'},
                    {key:'GroupQuantity',value:'单位组数量'},
                    {key:'GroupQuantityUnit',value:'单位组数量单位'},
                    {key:'GroupQuantityUnitName',value:'单位组数量单位名称'},
                    {key:'Quantity',value:'每单位数量'},
                    {key:'QuantityUnit',value:'每单位数量的单位'},
                    {key:'GroupWeight',value:'单位组重量'},
                    {key:'GroupWeightUnit',value:'单位组重量单位'},
                    {key:'Weight',value:'每单位重量'},
                    {key:'WeightUnit',value:'每单位重量的单位'},
                    {key:'GroupUnitPrice',value:'单位组单价'},
                    {key:'UnitPrice',value:'单价'},
                    {key:'TotalPrice',value:'总价'},
                    {key:'Currency',value:'货币种类'},
                    {key:'CurrencyZH',value:'货币种类中国海关标准'},
                    {key:'ExchangeRate',value:'汇率（外币对人民币）（单位1)'},
                    {key:'ProducerBatchNo',value:'生产商批次号'},
                    {key:'BWBatchNo',value:'仓储企业批次号'}
                ]
            },
             columns1: [
                    {
                        title: '采购订单编号',
                        key: 'PURCHASEORDERNO'
                    },
                    {
                        title: '合同号',
                        key: 'CONTRACTNO'
                    },
                    // {
                    //     title: '采购订单编号',
                    //     key: 'PURCHASEORDERNO'
                    // },
                    {
                        title: '中方公司代码',
                        key: 'china',
                         render:(h,params)=>{
                            return h('div',[
                                // h('p',{
                                //     style:{
                                //         margin:'5px 0'
                                //     }

                                // },params.row.CNCOMPANYNAME),
                                 h('p',{
                                     style:{
                                        margin:'5px 0'
                                    }

                                },params.row.CNCOMPANYCODE)
                                ])
                        }
                    },
                    {
                        title: '外方公司代码和名称',
                        key: 'out',
                        render:(h,params)=>{
                            return h('div',[
                                h('p',{
                                    style:{
                                        margin:'5px 0'
                                    }
                                },params.row.COMPANYNAMEEN),
                                 h('p',{
                                    style:{
                                        margin:'5px 0'
                                    }
                                },params.row.SELLERCOMPANYVAT)
                                ])
                        }
                    },
                    {
                        title: '订单日期',
                        key: 'ORDERDATE'
                    },
                    {
                        title: '上传时间',
                        key: 'CREATEDATE'
                    },
                     {
                        title: '操作',
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
                                            that.getdetail(params.row.PURCHASEORDERNO)
                                        }
                                    }
                                },'查看'),
                                 h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'purchaseOrder'
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
                                               that.cancel(params.row.PURCHASEORDERNO,params.index)
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
                                },'删除')]),
                              
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
            publicInter(interfaceUrl.queryOrderList,this.form).then(r=>{
                 r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            })
        },
        getdetail(id){
           publicInter(interfaceUrl.queryOrderDetail,{purchaseOrderNO:id}).then(r=>{
                if(r){
                    this.$emit('showDetail',{title:'采购订单详情',data:r,key:this.filed})
                    //  this.$refs.selfModal.modal=true
                    // this.$refs.selfModal.content=r
                    // this.$refs.selfModal.data1=r.BodyDetail
                }
            })

        },
         cancel(id,index){
            publicInter(interfaceUrl.delOrder,{purchaseOrderNO:id}).then(r=>{
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
<style rel="stylesheet/scss"  lang="scss" scoped>
 .agreements{
   button{
            background-color: rgb(0,80,141);
        }
        min-height: 350px;
        // padding-left: 1px;
        .btnBox{
            display: inline-block;
            width: 150px;
        }
        .ivu-table-wrapper{
            margin-top: 30px;
        }
        

    }
</style>


