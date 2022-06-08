<template>
    <div style="margin-top:20px">
       <Table :columns="columnsFlow" :data="dataFlow" max-height='600'></Table>
       
        <Page 
            :total="total" 
            :page-size='5'
            @on-change='pageChange'
            show-total
            class="customPage"
        />
        <!-- 报关单列表 -->
        <customs-unit ref='abc' :modelFlag='flag' @myCloseWin='closeWin'></customs-unit> 
    </div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
import customsUnit from './bgdDetail'
import waterMark from '@/until/watermark.js'
import {getCookie} from '@/until/getToken'

export default {
     props: {
    //   zsId:{
    //     type:String,
    //     default:'',
    //   }      
    zsId:{
        type:Object,
        default:{
            exhibitorId:'',
            exhibitor:''
        },
      }   
    },
    components:{customsUnit},
    data(){
        return {
             columnsFlow:[
                {
                    title: '序号',
                    key: 'NUM',
                    align:'center',
                    width:80
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
                    width:180
                },
                {
                    title: '数量',
                    key: 'QUANTITY',
                    align:'center',
                    width:80
                },
                {
                    title: '单位',
                    key: 'QUANTITYUNIT',
                    align:'center',
                    render:(h,params)=>{
                        return h('span','件')
                    },
                    width:80
                },
                {
                    title: '总价',
                    key: 'TOTALPRICE',
                    align:'center',
                    width:80,
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
                    width:80
                },
                {
                    title: '处理状态',
                    align:'center',
                    width:120,
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
                    width:80
                },
                {
                    title: '品尝',
                    key: 'TASTE',
                    align:'center',
                    width:80
                },
                {
                    title: '散发',
                    key: 'DISTRIBUTE',
                    align:'center',
                    width:80
                },
                {
                    title: '单证号',
                    key: 'FORMID',
                    align:'center',
                    width:260,
                    render:(h,params)=>{
                        return h('span',{
                            attrs:{
                                title:params.row.FORMID
                            },
                            style:{
                                cursor:'pointer',
                                color: '#fbd500'
                            },
                            on:{
                                click:()=>{
                                    if(params.row.FORMID.length >16){
                                        this.$refs.abc.query(params.row.FORMID)
                                        this.flag = true
                                    }else{
                                        return false
                                    }
                                   
                                }
                            }
                        },params.row.FORMID)
                    },
                },
                {
                    title: '种类',
                    key: 'FORMTYPE',
                    align:'center',
                    width:100,
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
                    width:260,
                    render:(h,params)=>{
                        return h('span',{
                            attrs:{
                                title:params.row.CERTNO
                            }
                        },params.row.CERTNO)
                    },
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
                            width:80
                        },{
                            title: '消耗',
                            key: 'C',
                            align:'center',
                            width:80
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
                            width:80
                        },
                        {
                            title: '转保税区域',
                            key: 'PF',
                            align:'center',
                            width:120
                        },
                        {
                            title: '消耗',
                            key: 'PC',
                            align:'center',
                            width:80
                        },
                        {
                            title: '放弃',
                            key: 'PG',
                            align:'center',
                            width:80
                        },
                        {
                            title: '灭失',
                            key: 'PH',
                            align:'center',
                            width:80
                        },
                        {
                            title: '其他',
                            key: 'PI',
                            align:'center',
                            width:80
                        },
                        {
                            title: '巡展',
                            key: 'PJ',
                            align:'center',
                            width:80
                        },
                        {
                            title: '留购',
                            key: 'PA',
                            align:'center',
                            width:80
                        },
                        {
                            title: '复运出境',
                            key: 'PB',
                            align:'center',
                            width:80
                        }
                    ]
                },
                
            ],
            dataFlow:[],
            //展品流向查询条件
            total:0,
            exhibitorId:'',
            exhibitor:'',
            exhibit:'',
            flag:false,
            ENTRY_ID:'',
            showFlag:false,
        }
    },
    methods:{
        //后续流向监管
        qryExhibitorFlow(page){
              let requsetData ={
                  exhibitorid:this.exhibitorId,
                  exhibitor:this.exhibitor,
                  pageNum:page,
                  pageSize:5
              }
            publicInter(interfaceUrl.qryExhibitorFlow,requsetData).then(r=>{
                if(r){
                    this.dataFlow = r.list;
                    this.total = r.totalRow;
                }
            })
        },
         closeWin() {
                this.flag = false;
            },
        //分页函数
        pageChange(page){
             this.qryExhibitorFlow(page)
        }
    },
    watch:{
         zsId:{
             handler(newValue){
                  if(newValue){
                       this.total = 0
                      this.exhibitorId=newValue.exhibitorid
                      this.exhibitor=newValue.exhibitor
                      this.qryExhibitorFlow(1)
                     
                  }
             },
             immediate:true
         }
    },
    mounted(){
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
