<template>
  <div class="agreements" >
       
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.invoiceNo" size="large" placeholder="请输入移库单编号" clearable style="width: 25%;margin-right:30px"></Input>
        <div class="btnBox">
            <Button type="primary" size='large' long @click="query">查询</Button>
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
                    {key:'TransferWarehouseNO',value:'移库单编号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'InvoiceNo',value:'发票号'},
                    {key:'TransferWarehouseMark',value:'移库标志'},
                    {key:'MoveInElectAccNo',value:'移入保税电子账册号'},
                    {key:'EntryId',value:'报关单号'},
                    {key:'MoveOutElectAccNo',value:'移出保税电子账册号'},
                    {key:'ReferenceNo',value:'企业参考号'},
                    {key:'SellerCompanyCodeVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    {key:'SellerCountryISOCode',value:'外方国家代码(ISO)'},
                    {key:'SellerCountryZHCode',value:'外方国家中国海关代码'},
                    {key:'ContractNO',value:'合同编号'},
                    {key:'AgreementID',value:'框架协议编号'},
                    {key:'RecWarehouseNo',value:'接收方仓库号'},
                    {key:'SendWarehouseNo',value:'发送方仓库号'}
                ],
                bodyHead:{
                    body1:[
                        {key:'InternalCompanyNo',value:'单证企业编号（穿行号）'},
                        {key:'TransferWarehouseNO',value:'移库单编号'},
                        {key:'TransferWarehouseItem',value:'移库单项号'},
                        {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'}
                    ]
                },
                body:[
                    {key:'InternalCompanyNo',value:'单证企业编号（穿行号）'},
                    {key:'TransferWarehouseNO',value:'移库单编号'},
                    {key:'TransferWarehouseItem',value:'移库单项号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'PurchaseOrderNO',value:'采购订单编号'},
                    {key:'PurchaseOrderItem',value:'采购订单项号'},
                    {key:'SellerOrderASN',value:'销售订单编号（或者ASN号）'},
                    {key:'SOorASN',value:'销售订单号种类，（1=销售订单号 2=ASN号）'},
                    {key:'InvoiceNo',value:'发票号'},
                    {key:'GrossWt',value:'毛重'},
                    {key:'GrossUnit',value:'毛重单位'},
                    {key:'Measurement',value:'体积'},
                    {key:'MeasurementUnit',value:'体积单位'},
                    {key:'MaterialNO',value:'物料编号'},
                    {key:'PalletNo',value:'托盘号'},
                    {key:'GoodsDesZH',value:'商品中文描述'},
                    {key:'GoodsDesEN',value:'商品英文描述'},
                    {key:'TotalQuantity',value:'数量'},
                    {key:'TotalQuantityUnit',value:'数量的单位'},
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
                    {key:'TransferWarehouseBillDate',value:'移库记账日期'},
                    {key:'ProducerBatchNo',value:'生产商批次号'},
                    {key:'BWBatchNo',value:'仓储企业批次号'}
                ]
            },
            content:null,
            valueSelect:1,
            time:new Date(),
            form:{
                transferWarehouseNO:'',
                startDate:'',
                endDate:'',
                pageNum:1,
                pageSize:20
            },
            totalCount:null,
             columns1: [
                    {
                        title: '移库单编号',
                        key: 'TRANSFERWAREHOUSENO'
                    },
                    {
                        title: '发票号',
                        key: 'INVOICENO'
                    },
                    {
                        title: '中方公司代码',
                        key: 'CNCOMPANYCODE'
                    },
                    {
                        title: '移库标志',
                        key: 'TRANSFERWAREHOUSEMARK'
                    },
                    {
                        title: '接收方仓库号',
                        key: 'RECWAREHOUSENO'
                    },
                    {
                        title: '发送方仓库号',
                        key: 'SENDWAREHOUSENO'
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
                                            that.getdetail(params.row.TRANSFERWAREHOUSENO)
                                        }
                                    }
                                },'查看'),
                                h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'transferWarehouse'
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
                                               that.cancel(params.row.TRANSFERWAREHOUSENO,params.index)
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
            publicInter(interfaceUrl.transferWarehouseList,this.form).then(r=>{
                r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            }    
        )},
        getdetail(id){
            publicInter(interfaceUrl.transferWarehouseDetail,{transferWarehouseNO:id}).then(r=>{
                // this.$refs.selfModal.modal=true
                // this.$refs.selfModal.content=r
                // this.$refs.selfModal.data1=r.BodyDetail
                this.$emit('showDetail',{title:'移库单详情',data:r,key:this.filed})
            })

        },
        cancel(id,index){
            publicInter(interfaceUrl.delTransferWarehouse,{transferWarehouseNO:id}).then(r=>{
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


