<template>
    <div>
        
        <Row style="margin-bottom:20px;text-align:left" class="searchRow">
            <span class="labelText">展商名称:</span>
            <Input v-model="params.name" size='large' class="customInput" style="width:150px;margin-right:12px;" />
            <span class="labelText">展台号:</span>
            <Input v-model="params.position" size='large' class="customInput" style="width:150px;margin-right:12px;"  @on-blur='blurBoothno' />
            <span class="labelText">展品名称:</span>
            <Input v-model="params.item" size='large' class="customInput" style="width:150px;margin-right:12px;" />
            <span class="labelText">原产地:</span>
            <Input v-model="params.original" size='large' class="customInput" style="width:150px;margin-right:12px;" />      
            <Button @click="query('')" size='large' type="primary">查询</Button>
        </Row>  
        <Table :columns="columnsList" :data="dataList" class="customTable"></Table> 
        <Page show-total :total="totalNumber" v-if="totalNumber>0" :current="params.page" @on-change="changePage"  class="customPage"></Page>   
        <!--详情-->
        <Modal v-model="detailDataModel" width="1200" class="customModal" :mask-closable="false" footer-hide>
            <p slot="header" style="text-align:center;color:#fff">
                <span>List of Overseas Exhibits {{this.titleDate}}首届中国国际进口博览会进境物资清单</span>
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
import detailTable from './detailTable'
import {getCookie} from '@/until/getToken';

export default {
    components: {detailTable},
    data(){
        return{
            titleDate: '2018年',
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
                    width:120
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
                    width:150
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
                item:"",
                original:"",
                position:"",
                name:"",
                page:1,
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
    created() {
        let cookieDate = getCookie('date');
        if(cookieDate ==  '2019' ) {
            this.titleDate = '2019年第二届';
            this.basis.exhibitionname = "CHINA INTERNATIONAL IMPORT EXPO 2019,5-10 November 2019";
            this.basis.exhibitionnamecn = "「 CIIE 2019年第二届中国国际进口博览会 」2019年11月5日-10日";
        }
    },
    mounted(){
        this.query('')
    },
    methods:{
        changePage(pageNum){
            this.query(pageNum);
        },
        query(pageNum){
            this.params.page = pageNum || 1;
            publicInter(interfaceUrl.queryMaterialsComplex,this.params).then(r=>{
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
        height: 36px;
        line-height: 36px;
        color: #fff;
        font-size: 14px;
    }
}
</style>
