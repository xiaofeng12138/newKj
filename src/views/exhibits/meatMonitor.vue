<template>
    <div>
        <h2 style="margin-bottom:20px;">肉类展品监控</h2>
        <Row style="margin-bottom:20px;" class="searchRow">
            <span>展商名称:</span>
            <Input v-model="params.name" style="width:150px;margin-right:12px;" />
            <span>展台号:</span>
            <Input v-model="params.position" style="width:150px;margin-right:12px;"  @on-blur='blurBoothno' />
            <span>原产地:</span>
            <Input v-model="params.original" style="width:150px;margin-right:12px;" />      
            <Button @click="query('')" type="primary">查询</Button>
        </Row>  
        <Table :columns="columnsList" :data="dataList" class="self"></Table> 
        <Page show-total :total="totalNumber" v-if="totalNumber>0" :current="params.currPage" @on-change="changePage"  style="float:right;margin-top:20px;margin-bottom:20px;"></Page>   
        
        <!--详情-->
        <Modal v-model="detailDataModel" width="1200" :mask-closable="false" footer-hide>
            <p slot="header" style="text-align:center">
                <span>List of Overseas Exhibits 2018年首届中国国际进口博览会进境物资清单</span>
            </p>
            <div style="text-align:center">
                <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody'
                :disableStatus="disableStatus"></detail-table>
            </div>
        </Modal>
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import detailTable from '@/views/exhibits/detailTable'
export default {
    components: {detailTable},
    data(){
        return{
            columnsList:[
                {
                    title: '参展商',
                    key: 'NAME',
                    align:'center',
                },
                {
                    title: '原产地',
                    key: 'ORIGINAL',
                    align:'center',
                    width:90
                },
                {
                    title: '展区',
                    key: 'AREA',
                    align:'center',
                    width:170,
                    render:(h,params)=>{
                        let res = params.row.AREA;
                        switch(params.row.AREA){
                            case "1":
                                res = '服务贸易';
                                break;
                            case "2":
                                res = '汽车';
                                break;
                            case "3":
                                res = '智能及高端装备';
                                break;
                            case "4":
                                res = '消费电子及家电';
                                break;
                            case "5":
                                res = '服装服饰及日用消费品';
                                break;
                            case "6":
                                res = '医疗器械及医药保健';
                                break;
                            case "7":
                                res = '食品及农产品';
                                break;
                            case "8":
                                res = '国家馆';
                                break;
                        }
                        return h('span',res);
                    }
                },
                {
                    title: '展台号',
                    key: 'POSITION',
                    align:'center',
                    width:120
                },
                {
                    title: '毛重',
                    key: 'ITEM_GROSS_WEIGHT',
                    align:'center',
                    width:90
                },
                {
                    title: '展品名称',
                    key: 'ITEM',
                    align:'center',
                    width:180
                },
                {
                    title: '数量',
                    key: 'ITEM_QTY',
                    align:'center',
                    width:90
                },
                {
                    title: '单价',
                    align:'center',
                    key:'ITEM_VALUES',
                    width:90
                },
                {
                    title: '商品编码',
                    key: 'PROD_HS_CODE',
                    align:'center',
                    width:110
                },
                {
                    title: '物资清单号',
                    key: 'LISTHEADNO',
                    align:'center',
                    width:200,
                    render:(h,params)=>{
                         return h('a',{
                            on:{
                                click : ()=>{
                                    // this.queryExpoHeadDetail('cf01fe31f8de4cb6b5dbf498713f7243');
                                    this.queryExpoHeadDetail(params.row.LISTHEADUUID);
                                }
                            }
                        },params.row.LISTHEADNO)
                        // params.row.LISTHEADNO)
                    }
                },
                {
                    title: '提单号',
                    key: 'BILL_NO',
                    align:'center'
                },
            ],
            dataList:[],
            params:{
                original:"",
                position:"",
                name:"",
                currPage:1,
                pageSize:10,
            },
            totalNumber:0,
            detailDataModel:false,
            basis2:{
                totalpackages:'',
                exhibitor:"",
                exhibitorcountry:"",
                hallno:"",
                hallnoArr:[],
                boothno:"",
                company:"",
                boothno2:"",
                contact:"",
                tel:"",
                fax:"",
                email:"",
                //复制参展商国别
                countrycode:"",
                exhtype:'',
                exhibitorid:""
            },
            basisBody:[],
            disableStatus:true,
            basis:{   
                exhibitionname:"CHINA INTERNATIONAL IMPORT EXPO 2018,5-10 November 2018",
                exhibitionnamecn:"「 CIIE 2018中国国际进口博览会 」2018年11月5日-10日",
                exhibitionvenue:'NECC(Shanghai)-hongqiao,Shanghai,PR China',
                exhibitionvenuecn:'中国 上海 虹桥 国家会展中心',
            },
        }
    },
    methods:{
        changePage(pageNum){
            this.query(pageNum);
        },
        query(pageNum){
            this.params.currPage = pageNum || 1;
            publicInter(interfaceUrl.queryMaterialsComplexMeat,this.params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.dataList = r.data;
                        this.totalNumber = r.total;
                    }
                    else{
                        this.$Modal.error({content:r.data});
                    }
                }
            });
        },
        queryExpoHeadDetail(listheaduuid){
            let params = {
                listheaduuid:listheaduuid
            }
            let url = interfaceUrl.queryExpoHeadDetailEA;
            publicInter(url,params).then(r=>{
                if(r){
                    if(r.head){
                        this.basis2 = this.lowerJSONKey(r.head);
                        this.basisBody = this.lowerJSONKey(r.body);
                        
                        this.basis2.countrycode = this.basis2.exhibitorcountry;

                        this.basis2.hallnoArr = this.basis2.hallno.split(",")

                        this.detailDataModel = true;
                    }
                    else if(r.error){
                        // this.$Message.error(r.error);
                        this.$Modal.error({content:r.error})
                    }
                }
            })
        },
        // 后台返回大写，将key值转成小写
        lowerJSONKey(jsonObj){
            if(Object.prototype.toString.call(jsonObj) === "[object Array]"){
                for (let i = 0; i < jsonObj.length;i++){
                    this.lowerJSONKey(jsonObj[i])
                }
                return jsonObj;
            }
            else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
                for(let key in jsonObj){
                    jsonObj[key.toLocaleLowerCase()] = jsonObj[key];
                    if(key !== key.toLocaleLowerCase()){
                        delete jsonObj[key];
                    }

                }
                return jsonObj;
            }
        },
        blurBoothno(){
            this.params.position = this.params.position.toLocaleUpperCase();
        }
    }
}
</script>
<style scoped  rel="stylesheet/scss" lang="scss">
.searchRow{
    >span{
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
        height: 32px;
        line-height: 32px;
    }
}
</style>
