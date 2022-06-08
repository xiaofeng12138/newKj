<template>
    <div>
        <h1 style="margin-bottom:20px">展商分析统计</h1>
        <Row :gutter="16">
            <Col :span=7>
                <vague :url='urlOBJ.expoCompany' parmasKey="expocompany" :placeHolder='"请输入公司名称"' @billNoVal='receive($event,"expocompany")' />
            </Col>
            <Col :span=6 push=1>
                <vague :url='urlOBJ.hqCountry' parmasKey="hqCountry"  :placeHolder='"请输入总部国家"' @billNoVal='receive($event,"hqCountry")' />
                <!-- <Select v-model="queryParam.hqCountry" size='large' style="width:100%" placeholder="请选择总部国家">
                    <Option v-for="item in optionsCoun" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
            </Col>
            <Col :span=5 push=2>
               <vague :url='urlOBJ.itemType' parmasKey="itemType"  :placeHolder='"请输入参展商品"' @billNoVal='receive($event,"itemType")' />
                <!-- <Select v-model="queryParam.itemType" size='large' style="width:100%" placeholder="请选择参展商品">
                    <Option v-for="item in optionsGoods" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
            </Col>
            <Col :span=3 push=3>
             <!-- <vague :url='urlOBJ.placePosition' parmasKey="placePosition"  :placeHolder='"请输入展位号"' @billNoVal='receive($event,"placePosition")' /> -->
                <Select v-model="placePosition" size='large' style="width:100%" clearable  placeholder="请选择展馆号">
                    <Option v-for="item in optionsNum" :value="item" :key="item">{{ item}}</Option>
                </Select>
            </Col>
            <Col :span=14  style="line-height:36px">
                <Col :span=8>
                    <span style="font-size:14px">是否是世界500强及行业龙头：</span>
                </Col>
                <Col :span=10>
                    <RadioGroup v-model="queryParam.companyLevel">
                        <Radio label="否"></Radio>
                        <Radio label="500强"></Radio>
                        <Radio label="龙头企业"></Radio>
                    </RadioGroup>
                </Col>
            </Col>
            <Col :span=4 >
                <Button type="primary" long size='large' @click="click">查询</Button>
            </Col>
        </Row>
        <Table border :columns="columns" :data="data" class="self" @on-row-click='rowClick'></Table>
        <Page :total="total" v-if="total>0" 
                :page-size=20
                @on-change='pageChange'
                show-total
            style="float:right;margin-top:20px"/>
        <detail ref='detail' />
    </div>    
</template>
<script>
import vague from '@/components/uploadPDF/vague'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import detail from '@/views/agentExh/components/index'
export default {
    components:{
        vague,detail
    },
    data(){
        return{
            total:0,
            optionsNum:[],
            placePosition:'',
            queryParam:{
                expocompany:'',
                hqCountry:'',
                companyLevel:'',
                itemType:'',
                placePosition:'',
                page:1,
                pageSize:20
            },
            columns:[
                {title:'公司名称', key:'EXPOCOMPANY',width:180, align:'center'},
                {title:'总部国家', key:'HQCOUNTRY',width:200,align:'center'},
                {
                    title:'参展展品',
                    width:100,
                    key:'ITEMTYPE'
                },
		        {
                    title:'展位号',
                    width:100,
                    key:'PLACEPOSITION'
                },
		{
                    title:'企业ID',
                    width:100,
                    key:'COMPANYID'
                },
                
                {
                    title:'签约状态',
                    width:100,
                    key:'SIGNSTATUS'
                },
		
                {
                    title:'联系人',
                    width:100,
                    key:'COMPANYCONTACTS'
                },
                {
                    title:'职务',
                    width:100,
                    key:'COMPANYCONTACTSTITLE'
                },
                {
                    title:'手机',
                    width:100,
                    key:'COMPANYCONTACTSMOBILE'
                },
                {
                    title:'座机',
                    width:100,
                    key:'COMPANYCONTACTSTEL'
                },
                {
                    title:'邮箱',
                    width:100,
                    key:'COMPANYCONTACTSEMAIL'
                },
                {
                    title:'预定光地面积/平米',
                    key:'BOOKNETAREA',
                    width:180,
                    
                },
                {
                    title:'预定标摊面积/平米',
                    key:'BOOKSHAREAREA',
                    width:180,
                },
                {
                    title:'总面积',
                    key:'TOTALAREA',
                    width:100,
                },
                {
                    title:'上图面积',
                    width:100,
                    key:'DRAWINGAREA'
                },
		
                
                {
                    title:'备注',
                    width:100,
                    key:'REMARK'
                },
                {
                    title:'意向书编号',
                    width:100,
                    key:'INTENTNO'
                },
                {
                    title:'合同编号',
                    width:100,
                    key:'CONTRACTNO'
                },
                {
                    title:'收款状况',
                    width:100,
                    key:'PAYMENTSTATUS'
                },
                {
                    title:'逾期CNY',
                    width:100,
                    key:'OVERDUEPAYMENTCNY'
                },
                {
                    title:'逾期USD',
                    width:100,
                    key:'OVERDUEPAYMENTUSD'
                },
                
                {
                    title:'跟进人',
                    width:100,
                    key:'FOLLOWER'
                },
                {
                    title:'尺寸',
                    width:100,
                    key:'AREASIZE',
                    // fixed: 'right'
                },
                ],
            data:[],
            urlOBJ:'',
            filed:{
                head:[
                    {key:'EXPOCOMPANY',value:'公司名称'},
                    {key:'HQCOUNTRY',value:'总部国家'},
                    {key:'ITEMTYPE',value:'参展展品'},
                    {key:'PLACEPOSITION',value:'展馆号'},
                    {key:'BOOKNETAREA',value:'预定光地面积/平米'},
                    {key:'BOOKSHAREAREA',value:'预定标摊面积/平米'},
                    {key:'TOTALAREA',value:'总面积'},
                    {key:'DRAWINGAREA',value:'上图面积'},
                    {key:'SIGNSTATUS',value:'签约状态'},
                    {key:'PLACEPOSITION',value:'展位号'},
                    {key:'REMARK',value:'备注'},
                    {key:'INTENTNO',value:'意向书编号'},
                    {key:'CONTRACTNO',value:'合同编号'},
                    {key:'PAYMENTSTATUS',value:'收款状况'},
                    {key:'OVERDUEPAYMENTCNY',value:'逾期CNY'},
                    {key:'OVERDUEPAYMENTUSD',value:'逾期USD'},
                    {key:'COMPANYID',value:'企业ID'},
                    {key:'COMPANYCONTACTS',value:'联系人'},
                    {key:'COMPANYCONTACTSTITLE',value:'职务'},
                    {key:'COMPANYCONTACTSMOBILE',value:'手机'},
                    {key:'COMPANYCONTACTSTEL',value:'座机'},
                    {key:'COMPANYCONTACTSEMAIL',value:'邮箱'},
                    {key:'FOLLOWER',value:'跟进人'},
                    {key:'AREASIZE',value:'尺寸'},
                ],
                bodyHead:[],
                body:[]
            },
        }
    },
    mounted(){
        this.urlOBJ={
            expoCompany:interfaceUrl.expoCompany,
            hqCountry:interfaceUrl.hqCountry,
            itemType:interfaceUrl.itemType
        }
        this.getPositionLists()
    },
    methods:{
        getPositionLists(){
            publicInter(interfaceUrl.placePosition).then(r=>{
                if(r.isok&&r.msg.length>0){
                    this.optionsNum=r.msg
                    this.optionsNum.unshift("全部")
                }else{
                    this.optionsNum=[]
                }
            })
        },
        receive(val,type){
            this.queryParam[type]=val
        },
        click(){
            this.queryParam.page=1
            this.query()
        },
        query(){
            this.queryParam.placePosition = (this.placePosition == '全部'?'':this.placePosition) || "";
            publicInter(interfaceUrl.allExhibitorsData,this.queryParam).then(r=>{
                if(r.total>0){
                    this.total=r.total;
                    this.data=r.datas
                }else{
                    this.total=0;
                    this.data=[]
                }
            })
        },
        pageChange(page){
            this.queryParam.page=page
            this.query()
        },
        rowClick(rowData,index){
            this.$refs.detail.init(Object.assign({},{title:'详情展示',data:{Head:rowData},key:this.filed}))
            this.$refs.detail.modal=true
        }
    }
}
</script>
<style lang="scss" scoped>
    .ivu-col{
        margin-bottom: 20px;
    }
</style>





