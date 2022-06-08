<template>
   <div class="agreements" >
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:20px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.invoiceNo" size="large" placeholder="请输入发票编号" clearable style="width: 20%;margin-right:20px"></Input>
          <!-- <Input v-model="form.contractNo" size="large" placeholder="请输入合同编号" clearable style="width: 20%;margin-right:20px"></Input> -->
        <div class="btnBox">
            <Button type="primary" size='large' long @click="query">查询</Button>
        </div>
        <Table  :columns="columns1" :data="data1" class="self"></Table>
         <Page :total="totalCount" v-if="totalCount" 
          :page-size='20'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
        <!-- <detail ref="selfModal" :showField='filed' :title="'装货数据详情'"></detail> -->
  </div>
</template>
<script>
// import pdfView from '@/components/PDFView'
import Tablepdf from '@/components/tablePdf'
import detail from '@/components/ERPSearch/detail/index'
import {fromate,getNextTime} from '../../../until/fromTime'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
  name:'ldg',
  components:{
        detail,Tablepdf
    },
   data(){
        return{
            value14:null,
            filed:{
                head:[
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    {key:'ReferenceNo',value:'企业参考号'},
                    {key:'SellerCompanyCodeVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    {key:'SellerCountryISOCode',value:'外方国家代码(ISO)'},
                    {key:'SellerCountryZHCode',value:'外方国家中国海关代码'},
                    // {key:'ContainerNo',value:'集装箱编号'},
                    {key:'InvoiceNo',value:'发票号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'ContractNO',value:'合同编号'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    {key:'AgreementID',value:'框架协议编号'},
                    {key:'TransportMode',value:'运输方式'},
                    {key:'OceanVessel',value:'运输工具名称'},
                    {key:'VoyageNo',value:'航班航次编号'},
                    {key:'BillNo',value:'提运单号'},
                    {key:'BookingNumber',value:'订舱号'},
                    {key:'ShippingSealNo',value:'封志号'},
                    {key:'PackingDate',value:'装箱日期'},
                    {key:'ShipperName',value:'运送集装箱的货车公司名称'},
                    {key:'ShipperVATno',value:'境外装箱集装箱货车公司VAT代码'},
                    {key:'ShipperCountryCodeISO',value:'境外装箱集装箱货车公司国家ISO代码'},
                    {key:'ShipperCountryCodeZH',value:'境外装箱集装箱货车公司国家代码（中国海关标准）'},
                    {key:'ForwardingAgent',value:'货代公司名称'},
                    {key:'ForwarderVATno',value:'境外货代公司企业VAT代码'},
                    {key:'ForwarderCountryCodeISO',value:'国家ISO代码(境外货代公司所在国)'},
                    {key:'ForwarderCountryCodeZH',value:'境外货代公司所在国家代码（中国海关标准）'},
                ],
                bodyHead:{
                    body1:[
                        // {key:'CONTAINERNO',value:'集装箱编号'},
                        {key:'InvoiceNo',value:'发票号'},
                        {key:'ITEMNO',value:'发票项号'},
                        {key:'CNCOMPANYCODE',value:'中方公司代码(企业信用代码)'},
                        {key:'GROSS_WT',value:'总毛重'},
                        {key:'GROSSUNIT',value:'毛重单位'},
                        {key:'SellerCountryISOCode',value:'外方国家代码(ISO)'},
                        {key:'SellerCountryZHCode',value:'外方国家中国海关代码'}
                    ],
                    // body2:[
                    //     {key:'PURCHASEORDERNO',value:'采购订单编号'},
                    //     {key:'GOODSDESEN',value:'商品英文描述'},
                    //     {key:'GROUPQUANTITY',value:'单位组数量'},
                    //     {key:'GROUPQUANTITYUNIT',value:'单位组数量单位'},
                    //     {key:'QUANTITY',value:'每单位数量'}
                    // ]
                },
                body:[
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    {key:'SellerOrderASN',value:'销售订单编号（或者ASN号）'},
                    {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                    {key:'SellerCompanyCodeVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    // {key:'SellerCountryISOCode',value:'外方国家代码(ISO)'},
                    // {key:'SellerCountryZHCode',value:'外方国家中国海关代码'},
                    // {key:'ContainerNo',value:'集装箱编号'},
                    {key:'ITEMNO',value:'发票项号'},
                    // {key:'Gross_wt',value:'总毛重'},
                    // {key:'GrossUnit',value:'毛重单位'},
                    {key:'Measurement',value:'体积'},
                    {key:'MeasurementUnit',value:'体积单位'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    {key:'PurchaseOrderItem',value:'采购订单项号'},
                    {key:'MaterialNO',value:'物料编号'},
                    {key:'PalletNo',value:'托盘号'},
                    {key:'PalletWeight',value:'每个托盘上货物的重量'},
                    {key:'GoodsDesZH',value:'商品中文描述'},
                    {key:'GoodsDesEN',value:'商品英文描述'},
                    {key:'TotalQuantity',value:'总数量'},
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
                    {key:'GroupNetWeight',value:'单位组净重'},
                    {key:'GroupNetWeightUnit',value:'单位组净重重量单位'},
                    {key:'GroupVolume',value:'单位组体积'},
                    {key:'GroupVolumeUnit',value:'单位组体积计量单位'},
                    {key:'Volume',value:'每单位体积'},
                    {key:'VolumeUnit',value:'每单位体积计量单位'},

                ],
                bodyTwo:[
                    // {key:'CONTAINERNO',value:'集装箱编号'},
                    {key:'INVOICENO',value:'发票号'},
                    {key:'MATERIALNO',value:'物料编号'},
                    {key:'PALLETNO',value:'托盘号'},
                    {key:'PALLETWEIGHT',value:'每个托盘上货物的重量'},
                    {key:'PURCHASEORDERNO',value:'采购订单编号'},
                    {key:'GOODSDESZH',value:'商品中文描述'},
                    {key:'GOODSDESEN',value:'商品英文描述'},
                    {key:'GROUPQUANTITY',value:'单位组数量'},
                    {key:'GROUPQUANTITYUNIT',value:'单位组数量单位'},
                    {key:'QUANTITY',value:'每单位数量'},
                    {key:'QUANTITYUNIT',value:'每单位数量的单位'},
                    {key:'GROUPWEIGHT',value:'单位组重量'},
                    {key:'GROUPWEIGHTUNIT',value:'单位组重量单位'},
                    {key:'WEIGHT',value:'每单位重量'},
                    {key:'WEIGHTUNIT',value:'每单位重量的单位'},
                    {key:'GROUPNETWEIGHT',value:'单位组净重'},
                    {key:'GROUPNETWEIGHTUNIT',value:'单位组净重重量单位'},
                    {key:'GROUPVOLUME',value:'单位组体积'},
                    {key:'GROUPVOLUMEUNIT',value:'单位组体积计量单位'},
                    {key:'VOLUME',value:'每单位体积'},
                    {key:'VOLUMEUNIT',value:'每单位体积计量单位'}
                ]
            
            },
             columns1: [
                    // {
                    //     title: '销售订单编号（或者ASN号）',
                    //     key: 'SELLERORDERASN'
                    // },
                    // {
                    //     title: '集装箱编号',
                    //     key: 'CONTAINERNO'
                    // },
                    // {
                    //     title: '采购订单编号',
                    //     key: 'PURCHASEORDERNO'
                    // },
                    {
                        title: '第一境外公司代码(境外企业纳税识别号VAT number)',
                        key: 'SELLERCOMPANYCODEVAT'
                    },
                    {
                        title: '发票号',
                        key: 'INVOICENO'
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
                                            that.getdetail(params.row.INVOICENO,params.row.CONTAINERNO,params.row.SELLERCOMPANYCODEVAT,params.row.SELLERCOUNTRYISOCODE)
                                        }
                                    }
                                },'查看'),
                                 h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'sellerPacking'
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
                                               that.cancel(params.row.INVOICENO,params.row.CONTAINERNO,params.row.SELLERCOMPANYCODEVAT,params.row.SELLERCOUNTRYISOCODE,params.index)
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
            content:null,
            valueSelect:1,
            time:new Date(),
            form:{
                invoiceNo:'',
                startDate:'',
                endDate:'',
                pageNum:1,
                pageSize:20
            },
            totalCount:null,
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
            url:'/ep/sellerPkg/querySellerPkgList'
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
            publicInter(interfaceUrl.SellerPkgList,this.form).then(r=>{
                 r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            })
        },
        getdetail(invoice,container,vat,code){
           publicInter(interfaceUrl.SellerPkgDetail,{invoiceNo:invoice,containerNo:container,sellerCompanyCodeVAT:vat,sellerCountryISOCode:code}).then(r=>{
                // console.log(r)
                // this.$refs.selfModal.modal=true
                // this.$refs.selfModal.content=r
                // this.$refs.selfModal.data1=r.BodyDetail
                 this.$emit('showDetail',{title:'装货数据详情',data:r,key:this.filed})
                // this.$refs.selfModal.data2=r.BodyDetail
            })

        },
        cancel(invoice,container,vat,code,index){
            publicInter(interfaceUrl.delSellerPkg,{invoiceNo:invoice,containerNo:container,sellerCompanyCodeVAT:vat,sellerCountryISOCode:code}).then(r=>{
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


