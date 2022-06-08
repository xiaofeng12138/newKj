<template>
    <div>
        <span class="littleTitle" style="border-bottom: 0">展品明细及流向监控
            <span class="breakPage" v-if="exhibitorFlow.totalPage > 1">
                <Icon type='ios-arrow-back' :class="{pageDisabled:exhibitorFlow.pageNum == 1}" @click="qryExhibitorFlow('',-1)"></Icon>
                <Icon type='ios-arrow-forward' :class="{pageDisabled:exhibitorFlow.pageNum == exhibitorFlow.totalPage}" @click="qryExhibitorFlow('',1)"></Icon>
            </span>
        </span>
        <div style="width: 100%;height: calc(100% - 42px);overflow-x: auto;z-index:22;position:relative;" class="frameTable">
            <Table :columns="columnsFlow" :data="dataFlow" style="width:1900px"></Table>
        </div>
    </div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    data(){
        return {
            columnsFlow:[
                {
                    title: '序号',
                    key: 'ROWNUMBER',
                    align:'center',
                    width:42
                },
                {
                    title: '商品名称',
                    key: 'GOODSDESCRIPTION',
                    align:'center',
                    render:(h,params)=>{
                        let val = "*"+params.row.GOODSDESCRIPTION;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    },
                    width:90
                },
                {
                    title: '数量',
                    key: 'QUANTITY',
                    align:'center',
                    width:50
                },
                {
                    title: '单位',
                    key: 'QUANTITYUNIT',
                    align:'center',
                    render:(h,params)=>{
                        return h('span','件')
                    },
                    width:50
                },
                {
                    title: '总价',
                    key: 'TOTALPRICE',
                    align:'center',
                    width:70,
                    render:(h,params)=>{
                        let val = params.row.TOTALPRICE;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    }
                },
                {
                    title: '币制',
                    align:'center',
                    render:(h,params)=>{
                        return h('span','美元')
                    },
                    width:50
                },
                {
                    title: '处理状态',
                    align:'center',
                    width:110,
                    render:(h,params)=>{
                        var result1 = "";
                        switch(params.row.DEALSTATUS1){
                            case "0":
                                result1 = "到港";
                                break;
                            case "1":
                                result1 = "进馆";
                                break;
                            default:
                                result1 = "";
                        };
                        var result2 = "";
                        switch(params.row.DEALSTATUS2){
                            case "0":
                                result2 = "申报";
                                break;
                            case "1":
                                result2 = "放行";
                                break;
                            default:
                                result2 = "";
                        }
                        return h('div',[
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    width:"50%",
                                    'vertical-align':'middle'
                                }
                            },result1),
                            h('span',{
                                style:{
                                    display:'inline-block',
                                    width:"50%",
                                    'vertical-align':'middle'
                                }
                            },result2)
                        ])
                       
                    }
                },
                {
                    title: '试用',
                    key: 'TRYOUT',
                    align:'center',
                    width:60,
                },
                {
                    title: '品尝',
                    key: 'TASTE',
                    align:'center',
                    width:60,
                },
                {
                    title: '散发',
                    key: 'DISTRIBUTE',
                    align:'center',
                    width:60,
                },
                {
                    title: '预计后续流向',
                    align:'center',
                    children:[
                        {
                            title: '复运出境',
                            key: 'B',
                            align:'center',
                            width:80
                        },{
                            title: '留购',
                            key: 'A',
                            align:'center',
                            width:42
                        },{
                            title: '消耗',
                            key: 'C',
                            align:'center',
                            width:42
                        },{
                            title: '转特殊监管区域',
                            key: 'D',
                            align:'center',
                            width:130
                        }
                    ]
                },
                {
                    title: '实际后续流向',
                    align:'center',
                    children:[
                        {
                            title: '外借',
                            key: 'PE',
                            align:'center',
                            width:42
                        },
                        {
                            title: '转保税区域',
                            key: 'PF',
                            align:'center',
                            width:100
                        },
                        {
                            title: '消耗',
                            key: 'PC',
                            align:'center',
                            width:42
                        },
                        {
                            title: '放弃',
                            key: 'PG',
                            align:'center',
                            width:42
                        },
                        {
                            title: '灭失',
                            key: 'PH',
                            align:'center',
                            width:42
                        },
                        {
                            title: '其他',
                            key: 'PI',
                            align:'center',
                            width:42
                        },
                        {
                            title: '巡展',
                            key: 'PJ',
                            align:'center',
                            width:42
                        },
                        {
                            title: '留购',
                            key: 'PA',
                            align:'center',
                            width:42
                        },
                        {
                            title: '复运出境',
                            key: 'PB',
                            align:'center',
                            width:80
                        }
                    ]
                },
                {
                    title: '单证号',
                    key: 'FORMID',
                    align:'center',
                    width:210,
                    render:(h,params)=>{
                        return h('span',{
                            attrs:{
                                title:params.row.FORMID
                            },
                            style:{
                                cursor:'pointer'
                            },
                            on:{
                                click:()=>{
                                    this.$emit('rowClick',params.row);
                                    // this.rowClick(params.row,params.row.FORMTYPE);
                                }
                            }
                        },params.row.FORMID)
                    },
                },
                {
                    title: '种类',
                    key: 'FORMTYPE',
                    align:'center',
                    width:60,
                    render:(h,params)=>{
                        return h('span',{
                            attrs:{
                                title:params.row.FORMTYPE
                            }
                        },params.row.FORMTYPE)
                    },
                },
                {
                    title: '物资证明函',
                    key: 'CERTNO',
                    align:'center',
                    width:210,
                    render:(h,params)=>{
                        return h('span',{
                            attrs:{
                                title:params.row.CERTNO
                            }
                        },params.row.CERTNO)
                    },
                },
            ],
            dataFlow:[],
            //展品流向查询条件
            exhibitorFlow:{
                exhibitorid:"",
                pageNum:1,
                pageSize:5,
                totalPage:2
            },
        }
    },
    methods:{
        //后续流向监管
        qryExhibitorFlow(exhibitor,queryDir){
            if(queryDir === -1 && this.exhibitorFlow.pageNum === 1){
                return;
            }
            if(queryDir === 1 && this.exhibitorFlow.pageNum === this.exhibitorFlow.totalPage){
                return;
            }
            this.exhibitorFlow.exhibitorid = queryDir?this.exhibitorFlow.exhibitorid:exhibitor;
            this.exhibitorFlow.pageNum = queryDir?(this.exhibitorFlow.pageNum + queryDir):1;
            publicInter(interfaceUrl.qryExhibitorFlow,this.exhibitorFlow).then(r=>{
                if(r){
                    this.dataFlow = r.list;
                    this.exhibitorFlow.totalPage = r.totalPage;
                }
            })
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../../../styles/mixin.scss';
.littleTitle{
    @include littleTitle;
}

.breakPage{
    @include breakPage;
}
</style>
