<template>
  <div class="agreements" >
       
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.outWarehouseNo" size="large" placeholder="请输入出库单编号" clearable style="width: 25%;margin-right:30px"></Input>
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
                    {key:'InvoiceNo',value:'发票号'},
                    {key:'OutWarehouseNo',value:'出库单号'},
                    {key:'BondedOutNo',value:'出门单号'},
                    {key:'ReferenceNo',value:'企业参考号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'ContractNO',value:'合同编号'},
                    {key:'AgreementID',value:'框架协议编号'},
                    {key:'WarehouseName',value:'仓库名称'},
                    {key:'ElectronicAccNo',value:'电子账册号'},
                    {key:'GrossWt',value:'总毛重'},
                    {key:'GrossUnit',value:'毛重单位'},
                    {key:'TotalQuantity',value:'总数量'},
                    {key:'TotalQuantityUnit',value:'总数量的单位'}
                ],
                bodyHead:{
                    body1:[
                        {key:'InternalCompanyNo',value:'单证企业编号（穿行号）'},
                        {key:'OutWarehouseNo',value:'出库单号'},
                        {key:'OutWarehouseItem',value:'出库单项号'},
                        {key:'BondedOutNo',value:'出门单号'},
                        {key:'CNCOMPANYCODE',value:'中方公司代码(企业信用代码)'},
                    ]
                },
                body:[
                    {key:'InternalCompanyNo',value:'单证企业编号(穿行号)'},
                    {key:'InvoiceNo',value:'发票号'},
                    {key:'OutWarehouseNo',value:'出库单号'},
                    {key:'BondedOutNo',value:'出门单号'},
                    {key:'BondedOutItem',value:'出门单项号'},
                     {key:'TransportCarPlateNo',value:'运输车辆车牌号'},
                    {key:'DriverName',value:'司机名称'},
                    {key:'DriverIDCard',value:'司机身份证号'},
                    {key:'DriverPhoneNo',value:'司机手机号'},
                    {key:'ShipperName',value:'运送集装箱的货车公司名称'},
                    {key:'ShipperCompanyCode',value:'境内装箱集装箱货车公司企业代码'},
                    {key:'BondedOutDate',value:'出门日期'}
                ]
            },
            content:null,
            valueSelect:1,
            time:new Date(),
            form:{
                outWarehouseNo:'',
                startDate:'',
                endDate:'',
                pageNum:1,
                pageSize:20
            },
            totalCount:null,
             columns1: [
                    {
                        title: '出库单号',
                        key: 'OUTWAREHOUSENO'
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
                        title: '出门单号',
                        key: 'BONDEDOUTNO'
                    },
                    {
                        title: '仓库名称',
                        key: 'WAREHOUSENAME'
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
                                            that.getdetail(params.row.OUTWAREHOUSENO)
                                        }
                                    }
                                },'查看'),
                                h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'bondedOut'
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
                                               that.cancel(params.row.OUTWAREHOUSENO,params.index)
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
            publicInter(interfaceUrl.bondedOutList,this.form).then(r=>{
                r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            }    
        )},
        getdetail(id){
            publicInter(interfaceUrl.bondedOutDetail,{outWarehouseNo:id}).then(r=>{
                // this.$refs.selfModal.modal=true
                // this.$refs.selfModal.content=r
                // this.$refs.selfModal.data1=r.BodyDetail
                this.$emit('showDetail',{title:'出库单详情',data:r,key:this.filed})
            })

        },
        cancel(id,index){
            publicInter(interfaceUrl.delBondedOut,{outWarehouseNo:id}).then(r=>{
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


