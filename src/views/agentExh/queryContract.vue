<template>
    <div>
        <query-form  @queryEvents='query' />
        <Table stripe :columns="columns" :data="data" class="self" @on-selection-change='selectionChange'></Table>
        <div class="">
            <div style="float:left;width:100px;margin-top:20px" v-if='isEO'>
                <Button type="primary" long size='large' :disabled='queryParmas.expoStatus===2' @click="lotSizeConfirm">确认信息</Button>
            </div>
             <Page :total="totalCount" v-if="totalCount" 
          :page-size=20
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
        </div>
    </div>    
</template>
<script>
import queryForm from './components/queryForm'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import {fromate} from '@/until/fromTime'
import { getCookie } from '@/until/getToken';

export default {
    components:{
        queryForm
    },
    data(){
        return{
            queryParmas:{},
            isEO:false,
            selectArr:[],
            url:{
                list:'',
                detail:'',
                del:''
            },  
            filed:{
                head:
                [
                    {key:'ContractNO',value:'合同编号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    {key:'AgreementID',value:'框架协议编号'},
                    {key:'InCoTerm',value:'成交方式（FOB，C&I，CIF等）'},
                    {key:'SignDate',value:'签约日期'},
                    {key:'ValidDate',value:'到期日期'},
                    {key:'CNTradeCo',value:'中方公司海关注册编号'},
                    {key:'CNCompanyName',value:'中方公司名称'},
                    {key:'CNCompanyNameEN',value:'中方公司英文名称'},
                    {key:'CNCompanyAddress',value:'中方公司地址'},
                    {key:'CNCompanyTelephone',value:'中方公司电话'},
                    {key:'CNCompanyFax',value:'中方公司传真'},
                    {key:'EmailAdress',value:'中方企业电子邮箱'},
                    {key:'SellerCompanyVAT',value:'第一境外公司代码(境外企业纳税识别号VAT number)'},
                    {key:'SellerCompanyCode',value:'第一境外公司代码(在中方企业系统中的编号)'},
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
                    {key:'CompanyEmailAdress',value:'第一境外公司电子邮箱'}

                ],
                bodyHead:{
                    body1:[
                        {key:'ITEM',value:'项号'},
                        {key:'MATERIALNO',value:'物料编号'},
                        {key:'TOTALPRICE',value:'总价'},
                        {key:'GROUPWEIGHT',value:'单位组重量'},
                        {key:'QUANTITY',value:'每单位数量'},
                        {key:'GROUPQUANTITY',value:'单位组数量'}
                    ]
                },
                body:[
                    {key:'ContractNO',value:'合同编号'},
                    {key:'CNCompanyCode',value:'中方公司代码(企业信用代码)'},
                    // {key:'Item',value:'项号'},
                    // {key:'MaterialNO',value:'物料编号'},
                    {key:'GoodsDesZH',value:'商品中文描述'},
                    {key:'GoodsDesEN',value:'商品英文描述'},
                    {key:'GoodsModleDesc',value:'规格型号描述'},
                    {key:'TotalQuantity',value:'总数量'},
                    {key:'TotalQuantityUnit',value:'总数量的单位'},
                    // {key:'GroupQuantity',value:'单位组数量'},
                    {key:'GroupQuantityUnit',value:'单位组数量单位'},
                    // {key:'Quantity',value:'每单位数量'},
                    {key:'QuantityUnit',value:'每单位数量的单位'},
                    // {key:'GroupWeight',value:'单位组重量'},
                    {key:'GroupWeightUnit',value:'单位组重量单位'},
                    {key:'Weight',value:'每单位重量'},
                    {key:'WeightUnit',value:'每单位重量的单位'},
                    {key:'GroupUnitPrice',value:'单位组单价'},
                    {key:'UnitPrice',value:'单价'},
                    // {key:'TotalPrice',value:'总价'},
                    {key:'Currency',value:'货币种类'},
                    {key:'CurrencyZH',value:'货币种类中国海关标准'},
                    {key:'ExchangeRate',value:'汇率（外币对人民币）（单位1)'},
                ]
            },
            columns:[
                
                {
                        title: '协议号',
                        key: 'AGREEMENTID'
                    },
                    {
                        title: '合同号',
                        key: 'CONTRACTNO'
                    },
                    {
                        title: '中方公司代码和名称',
                        key: 'china',
                        render:(h,params)=>{
                            return h('div',[
                                h('p',{
                                    style:{
                                        margin:'5px 0'
                                    }

                                },params.row.CNCOMPANYNAME),
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
                        key: 'outer',
                         render:(h,params)=>{
                            return h('div',[
                                h('p',{
                                    style:{
                                        margin:'5px 0'
                                    }
                                },params.row.COMPANYFULLNAMEEN),
                                 h('p',{
                                    style:{
                                        margin:'5px 0'
                                    }
                                },params.row.SELLERCOMPANYVAT)
                                ])
                        }
                    },
                    //  {
                    //     title: '成交方式',
                    //     key: 'INCOTERM'
                    //  },
                    {
                        title: '签订日期',
                        key: 'SIGNDATE'
                    },
                    {
                        title: '上传时间',
                        key: 'CREATEDATE'
                    },
                    {
                        title:'是否确认',
                        render:(h,params)=>{
                           return h('p',{
                                style:{
                                    // textAlign:'center'
                                }
                            },params.row.EXPOSTATUS=='1'?'未确认':'已确认')
                        }
                    },
                     {
                        title: '操作',
                        key: 'action',
                        width: 180,
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
                                            that.getdetail(params.row.CONTRACTNO)
                                        }
                                    }
                                },'查看'),
                                // h('Poptip', {
                                //     props: {
                                //        confirm: '',
                                //        placement:'top-end',
                                //        title:"是否确认此条信息！"
                                //     },
                                //     style:{
                                //         textAlign:'left'
                                //     },
                                //     nativeOn:{
                                //        click(e){
                                //            e.stopPropagation() 
                                //            var text=e.target.innerText.replace(/\s+/g,"")
                                //            if(text==='确定'||text==='ok'){
                                //                that.confirm(params.row.CONTRACTNO,params.index)
                                //            }
                                //         //    console.log(e.target.innerHTML,params.row.AGREEMENTID)
                                //         //    that.ok()
                                //        }
                                //     }
                                // },[
                                // h('Button',{
                                //     props:{
                                //         type:'info',
                                //         size:'large',
                                //         disabled:params.row.EXPOSTATUS!=='1'
                                //     },
                                //      style:{
                                //         marginLeft:'10px'
                                //     }
                                // },'确认')]),
                               
                            ])
                        }}
            ],
            totalCount:0,
            data:[]
        }
    },
    created(){
        this.switchUrl()
    },
    methods:{
        query(val){
            this.queryParmas={}
            Object.assign(this.queryParmas,val,{page:1,pageSize:20})
            this.queryParmas.agreementId=this.queryParmas.variable
            delete this.queryParmas.variable
            this.getLists(this.queryParmas)
        },
        switchUrl(){
            var role=getCookie('roler');
            role = role.includes('EA')?'EA' : (role.includes('EI')?'EI':'EO');
            switch(role){
                case 'EA': 
                    this.url={
                        list:interfaceUrl.adminContractList,
                        detail:interfaceUrl.adminContractDetail,
                        del:''};
                     
                        var option={
                            title: '操作',
                            key: 'action',
                            width: 100,
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
                                            that.getdetail(params.row.CONTRACTNO)
                                        }
                                    }
                                },'查看'),  
                            ])
                        }}
                        this.columns[this.columns.length-1]=option 
                break;
                case 'EI': 
                    
                    this.url={
                        list:interfaceUrl.EIqueryContractList,
                        detail:interfaceUrl.EIqueryContractDetail,
                        del:interfaceUrl.EIdelContract};
                        var option={
                            title: '操作',
                            key: 'action',
                            width: 180,
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
                                            that.getdetail(params.row.CONTRACTNO)
                                        }
                                    }
                                },'查看'),
                                h('Poptip', {
                                    props: {
                                       confirm: '',
                                       placement:'top-end',
                                       title:"是否删除此条信息！"
                                    },
                                    style:{
                                        textAlign:'left'
                                    },
                                    nativeOn:{
                                       click(e){
                                           e.stopPropagation() 
                                           var text=e.target.innerText.replace(/\s+/g,"")
                                           if(text==='确定'||text==='ok'){
                                               that.cancel(params.row.CONTRACTNO,params.index)
                                           }
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
                    this.columns[this.columns.length-1]=option 
                    // this.columns.shift()
                break;
                case 'EO': 
                    this.isEO=true
                    this.url={
                        list:interfaceUrl.EOContractList,
                        detail:interfaceUrl.EOContractDetail,
                        del:''};
                         this.columns.unshift({
                            type:'selection',   
                            width:80
                        })
                break;
                default:break;
            }
        },
        pageChange(page){
            this.queryParmas.page=page
             this.getLists(this.queryParmas)
        },
        getLists(params){
            publicInter(this.url.list,params).then(r=>{
                 r.list.forEach(item => {
                    item.CREATEDATE=fromate(`${item.CREATEDATE}`)
                })
                this.data = r.list
                this.totalCount = r.totalRow
            }).catch(e=>{
                this.data =[]
                this.totalCount = 0
                this.$Message.error('查询出错！')
            })
        },
        cancel(id,index){
            publicInter(this.url.del,{contractNo:id}).then(r=>{
                if(r&&r.code==='200'){
                    this.data.splice(index,1)
                    this.$Message.success('删除成功！')
                    this.totalCount--
                }
            })
        },
        confirm(id,index){
            var arr=[].concat(id)
            publicInter(interfaceUrl.verifyExpoContract,{contractNo:arr}).then(r=>{
                if(r&&r.code==='200'){
                    if(index){
                        this.data.splice(index,1)
                        this.totalCount--
                    }else{
                        this.getLists(this.queryParmas)
                    }
                     this.$Message.success('确认成功！') 
                }

            })

        },
        lotSizeConfirm(){
            this.confirm(this.selectArr)
        },
        selectionChange(option){
            if(option){
                this.selectArr=[]
                option.forEach(val=>{
                    this.selectArr.push(val.CONTRACTNO)
                })
            }
        },
        getdetail(id){
            publicInter(this.url.detail,{contractNo:id}).then(r=>{
                // console.log(r)
                if(r){
                    this.$emit('showDetail',{title:'单次合同详情',data:r,key:this.filed})
                    // this.$refs.selfModal.modal=true
                    // this.$refs.selfModal.content=r
                    // this.$refs.selfModal.data1=r.BodyDetail
                }
                
            })

        },
    }
    
}
</script>
<style lang="scss" scoped>

</style>
