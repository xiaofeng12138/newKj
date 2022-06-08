<template>
    <div>
        <h2 style="margin-bottom:20px;">暂时进境物资查询分析</h2>
        <Row style="margin-bottom:20px;" class="searchRow">
            <Col span="3" class="title">证明函编号:</Col>
            <Col span="4"><Input size="large" v-model="params.certificateno" /></Col>
            <Col span="3" class="title">展商名称:</Col>
            <Col span="4"><Input size="large" v-model="params.exhibitor" /></Col>
            <Col span="3" class="title">展台号:</Col>
            <Col span="4"><Input v-model="params.boothno" size="large" @on-blur='blurBoothno' /></Col>           
        </Row>  
        <Row style="margin-bottom:20px;" class="searchRow">
            <Col span="3" class="title">展品名称规格中文:</Col>
            <Col span="4"><Input v-model="params.chname" size="large" /></Col>
            <Col span="3" class="title">展品名称规格英文:</Col>
            <Col span="4"><Input v-model="params.enname" size="large" /></Col>
            <Col span="3" class="title">商品编码:</Col>
            <Col span="4"><Input v-model="params.hscode" size="large" /></Col>
            <Col span="3"><Button @click="query('')" type="primary">查询</Button></Col>
        </Row>
        <Table :columns="columnsRisk" :data="dataRisk" class="self"></Table>  
        <Page show-total :total="totalNumber" v-if="totalNumber>0" :current="params.currPage" 
            @on-change="changePage"  style="float:right;margin-top:20px;margin-bottom:20px;"></Page>  
        <!--详情-->
        <!-- <Modal v-model="detailDataModel" width="1200" :mask-closable="false" footer-hide>
            <p slot="header" style="text-align:center">
                <span>List of Overseas Exhibits 2018年首届中国国际进口博览会进境物资清单</span>
            </p>
            <div style="text-align:center">
                <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody'
                :disableStatus="disableStatus"></detail-table>
            </div>
        </Modal> -->
        <Modal v-model="detailDataModel" width="1200" :mask-closable="false" footer-hide>
            <p slot="header" style="text-align:center"></p>
            <exhititor-list-unit ref="unit"></exhititor-list-unit>
        </Modal>
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import detailTable from '@/views/exhibits/detailTable'
import exhititorListUnit from "@/views/exhibits/unit/exhibitorListUnit"
export default {
    components: {detailTable,exhititorListUnit},
    data(){
        return{
            columnsRisk:[
                {
                    title: '证明函编号',
                    key: 'CERTIFICATENO',
                    align:'center',
                    width:120
                },
                {
                    title: '参展商',
                    key: 'EXHIBITOR',
                    align:'center',
                    width:100
                },
                {
                    title: '国别/地区',
                    key: 'EXHIBITORCOUNTRY',
                    align:'center',
                    width:100
                },
                {
                    title: '馆号',
                    key: 'HALLNO',
                    align:'center',
                    width:90
                },
                {
                    title: '展台号',
                    key: 'BOOTHNO',
                    align:'center',
                    width:90
                },
                {
                    title: '总件数',
                    key: 'TOTALPACKAGES',
                    align:'center',
                    width:90
                },
                {
                    title: '毛重',
                    key: 'GROWSSWEIGHT',
                    align:'center',
                    width:90
                },
                {
                    title: '净重',
                    key: 'NETWEIGHT',
                    align:'center',
                    width:90
                },
                {
                    title: '展品名称规格英文',
                    key: 'GOODSDESCRIPTION',
                    align:'center',
                    width:200
                },
                {
                    title: '展品名称规格中文',
                    key: 'GOODSDESCRIPTIONCN',
                    align:'center',
                    width:200
                },
                {
                    title: '原产地',
                    key: 'COUNTRYOFORIGIN',
                    align:'center',
                    width:90
                },
                {
                    title: '数量',
                    key: 'QUANTITY',
                    align:'center',
                    width:90
                },
                {
                    title: '单位',
                    key: 'QUANTITYUNIT',
                    align:'center',
                    width:90
                },
                {
                    title: '单价',
                    align:'center',
                    render(h,params){
                        let number = (parseFloat(params.row.TOTALPRICE)/parseFloat(params.row.QUANTITY)).toFixed(2);
                        return h("span", number == 'NaN'?"":number)
                    },
                    width:90
                },
                {
                    title: '总价',
                    key: 'TOTALPRICE',
                    align:'center',
                    width:90
                },
                {
                    title: '商品编码',
                    key: 'HSCODE',
                    align:'center',
                    width:120
                },
                {
                    title: '展品处理方式',
                    key: 'DISPOSALS',
                    align:'center',
                    render(h,params){
                        let result = "";
                        switch(params.row.DISPOSALS){
                            case "a":
                                result = "已售";
                                break;
                            case "b":
                                result = "运回";
                                break;
                            case "c":
                                result = '放弃和消耗';
                                break;
                            case "d":
                                result = "其他"
                                break;
                        }
                        return h('span',result);
                    },
                    width:140
                },
                {
                    title: '物资清单号',
                    key: 'LISTHEADNO',
                    align:'center',
                    width:220,
                    render:(h,params)=>{
                         return h('a',{
                            on:{
                                click : ()=>{
                                    this.queryExpoHeadDetail(params.row.BASICINFOUUID,params.row.LISTHEADUUID);
                                }
                            }
                        },params.row.LISTHEADNO)
                    }
                },
                {
                    title: '提单号',
                    key: 'BILLNO',
                    align:'center',
                    width:140
                },
            ],
            dataRisk:[],
            params:{
                certificateno:"",
                chname:"",
                enname:"",
                hscode:"",
                exhibitor:"",
                boothno:"",
                currPage:1,
                pageSize:10
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
            customParams:{
                entryId:"224220181000001016",
                currPage:"1",
                pageSize:"10"
            },
        }
    },
    methods:{
        changePage(pageNum){
            this.query(pageNum);
        },
        query(pageNum){
            this.params.currPage = pageNum || 1;
            publicInter(interfaceUrl.queryMaterialsExamineList,this.params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.dataRisk = r.data;
                        this.totalNumber = r.total;
                    }
                    else{
                        this.$Modal.error({content:r.data});
                    }
                }
            });
        },
        queryExpoHeadDetail(headuuid,listheaduuid){
            this.$refs.unit.query(headuuid,listheaduuid);
            this.detailDataModel = true;
            // let params = {
            //     listheaduuid:listheaduuid
            // }
            // let url = interfaceUrl.queryExpoHeadDetailEA;
            // publicInter(url,params).then(r=>{
            //     if(r){
            //         if(r.head){
            //             this.basis2 = this.lowerJSONKey(r.head);
            //             this.basisBody = this.lowerJSONKey(r.body);
                        
            //             this.basis2.countrycode = this.basis2.exhibitorcountry;

            //             this.basis2.hallnoArr = this.basis2.hallno.split(",")

            //             this.detailDataModel = true;
            //         }
            //         else if(r.error){
            //             // this.$Message.error(r.error);
            //             this.$Modal.error({content:r.error})
            //         }
            //     }
            // })
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
            this.params.boothno = this.params.boothno.toLocaleUpperCase();
        }
    }
}
</script>
<style scoped  rel="stylesheet/scss" lang="scss">
.searchRow{ 
    .ivu-col{
        text-align: center;
    }
    .title{
        padding-right: 10px;
        line-height: 36px;
        text-align: right;
    }
}
</style>
