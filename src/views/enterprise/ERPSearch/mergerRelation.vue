<template>
  <div class="agreements" >
       
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.entsysno" size="large" placeholder="请输入企业内部系统编号" clearable style="width: 15%;margin-right:30px"></Input>
         <Input v-model="form.pono" size="large" placeholder="请输入采购订单编号" clearable style="width: 15%;margin-right:30px"></Input>
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
    name:'mergerRelation',
    components:{
        detail,Tablepdf
    },
    data(){
        return{
            filed:{
                head:[
                    {key:'CNCOMPANYCODE',value:'企业社会统一信用代码'},
                    {key:'ENTSYSNO',value:'企业内部系统编号'},
                    {key:'IEFLAG',value:'进出口标志'},
                    {key:'BANKCONTRACTNO',value:'合同编号（到银行办理国际业务所用）'},
                    {key:'ENTACCOUNTNO',value:'企业银行帐号'},
                    {key:'VSLNAME',value:'运输工具名称'},
                    {key:'TRANSPORTTYPE',value:'运输方式'},
                    {key:'VOYAGENO',value:'航次'},
                    {key:'BILLNO',value:'提运单号'},
                    {key:'PONO',value:'采购订单编号'},
                    {key:'FREIGHT',value:'运费'},
                    {key:'PREMIUM',value:'保险费'},
                    {key:'OTHERFEES',value:'其他费用'},
                    {key:'CURRENCY',value:'货币种类'},
                ],
                bodyHead:{
                    body1:[
                        {key:'CNCOMPANYCODE',value:'企业社会统一信用代码'},
                        {key:'ENTSYSNO',value:'企业内部系统编号'},
                        {key:'PONO',value:'采购订单编号'},
                        {key:'PURCHASEORDERITEM',value:'采购订单物料项号（即序号）'},
                        {key:'COPGNO',value:'物料编号'},
                    ]
                },
                body:[
                    {key:'CNCOMPANYCODE',value:'企业社会统一信用代码'},
                    {key:'ENTSYSNO',value:'企业内部系统编号'},
                    {key:'PONO',value:'采购订单编号'},
                    {key:'PURCHASEORDERITEM',value:'采购订单物料项号（即序号）'},
                    {key:'COPGNO',value:'物料编号'},

                    {key:'TOTALQUANTITY',value:'数量'},
                    {key:'TOTALQUANTITYUNIT',value:'数量的单位'},
                    {key:'UNITPRICE',value:'单价'},
                    {key:'FREIGHTDETAIL',value:'运费明细'},
                    {key:'PREMIUMDETAIL',value:'保险费明细'},

                    {key:'OTHERFEESDETAIL',value:'其他费用明细'},
                    {key:'CURRENCY',value:'货币种类'},
                    {key:'SYSCERTNO',value:'体系证书编号'},
                    {key:'SYSCERTAUTHO',value:'体系证书出证方'},
                    {key:'SYSCERTAUTHOREGAREA',value:'体系证书出证方注册地区'},

                    {key:'OTHERCERTTYPE',value:'其他证书类型'},
                    {key:'OTHERCERTNO',value:'其他证书编号'},
                    {key:'OTHERCERTAUTHO',value:'其他证书出证方'},
                    {key:'OTHERCERTAUTHOREGAREA',value:'其他证书出证方注册地区'},
                    {key:'AUTHOINSCODE',value:'出证方机构代码'},

                    {key:'GITEM',value:'归并后项号'},
                    {key:'SOURCEMARK',value:'来源标志'},
                    {key:'PRDTNO',value:'版本号'},
                    {key:'MODIFYMARK',value:'操作标志'},
                    {key:'MODIFYDATE',value:'上传日期'},

                    {key:'NOTE',value:'备注'},
                ]
            },
            content:null,
            valueSelect:1,
            time:new Date(),
            form:{
                entsysno:'',
                pono:'',
                startDate:'',
                endDate:'',
                pageNum:1,
                pageSize:20
            },
            totalCount:null,
             columns1: [
                    {
                        title: '企业社会统一信用代码',
                        key: 'CNCOMPANYCODE'
                    },
                    {
                        title: '企业内部系统编号',
                        key: 'ENTSYSNO'
                    },
                    {
                        title: '合同编号（到银行办理国际业务所用）',
                        key: 'BANKCONTRACTNO'
                    },
                    {
                        title: '企业银行帐号',
                        key: 'ENTACCOUNTNO'
                    },
                    {
                        title: '运输工具名称',
                        key: 'VSLNAME'
                    },
                    {
                        title: '提运单号',
                        key: 'BILLNO'
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
                                            that.getdetail(params)
                                        }
                                    }
                                },'查看'),
                                h(Tablepdf,{
                                    props:{
                                        UUID:params.row.UUID,
                                        type:'outWarehouse'
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
                                               that.cancel(params.row,params.index)
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
            publicInter(interfaceUrl.queryMergerRelation,this.form).then(r=>{
                r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data1 = r.list
                this.totalCount = r.totalRow
            }    
        )},
        getdetail(p){
            let params = {
                entsysno: p.row.ENTSYSNO,
            }
            publicInter(interfaceUrl.queryMergerRelationDetail, params).then(r=>{
                // this.$refs.selfModal.modal=true
                // this.$refs.selfModal.content=r
                // this.$refs.selfModal.data1=r.BodyDetail
                this.$emit('showDetail',{title:'归并关系详情',data:r,key:this.filed})
            })

        },
        cancel(p,index){
            let params = {
                entsysno: p.ENTSYSNO,
            }
            publicInter(interfaceUrl.delMergerRelation, params).then(r=>{
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


