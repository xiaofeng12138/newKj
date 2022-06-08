<template>
    <!-- 重点展位 -->
    <div> 
        <Table :columns="exhibitorcolumns" :data="exhibitordata"></Table>
        <span class="breakPage" v-if="exhibitorNum > 10 " style="position:relative;float:right;right:10px;top:8px;">
            <Icon type='ios-arrow-back' @click="webpage2(-1)"></Icon>
            <Icon type='ios-arrow-forward' @click="webpage2(1)"></Icon>
        </span>
    </div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    data(){
        return {
            exhibitorcolumns:[
                {
                    title: '排名',
                    key: 'ROWNUMBER',
                    width:40,
                    align:'center'
                },
                {
                    title: '展商名字',
                    key: 'EXHIBITOR',
                    align:'center',
                    render:(h,params)=> {
                        try {
                            let val = params.row.EXHIBITOR;
                            return h('Tooltip', {
                                attrs: {
                                    content: val,
                                    transfer:true
                                },
                            }, val)
                        }
                        catch (e) {
                            console.log(e)
                        }
                    }
                },
                {
                    title: '数量(件)',
                    key: 'QUANTITY',
                    align:'center',
                    render:(h, params)=>{
                        let val = params.row.QUANTITY;
                        return h('span',val)
                    }
                },
                {
                    title: '金额(美元)',
                    key: 'TOTALPRICE',
                    align:'center',
                    width:90,
                    render:(h, params)=>{
                        let val = params.row.TOTALPRICE;
                        return h('span',val)
                    }
                },
                {
                    title: '国家与地区',
                    key: 'COUNTRYENNAME',
                    align:'center',
                    width:80,
                    render:(h, params)=>{
                        let val = params.row.COUNTRYCNNAME;
                        return h('Tooltip', {
                            attrs: {
                                content: val,
                                transfer:true
                            },
                        }, val)
                    }
                },
                {
                    title: '展位',
                    key: 'BOOTHN',
                    click:'true',
                    align:'center',
                    render:(h,params) =>{
                        let divs;
                        switch(params.row.FORMTYPE){
                            case "1":
                                divs = [
                                    h('img',{
                                        attrs:{
                                            src:this.redpanda
                                        },
                                        style:{
                                            width:'16px',
                                            'vertical-align':'middle'
                                        }
                                    }),
                                ]
                                break;
                            case "2":
                                divs = [
                                    h('img',{
                                        attrs:{
                                            src:this.greenpanda
                                        },
                                        style:{
                                            width:'16px',
                                            'vertical-align':'middle'
                                        }
                                    }),
                                ]
                                break;
                            case '3':
                                divs = h('div',{
                                    style:{
                                        display:'inline-block',
                                        'vertical-align':'middle'
                                    }
                                },[
                                    h('img',{
                                        attrs:{
                                            src:this.redpanda
                                        },
                                        style:{
                                            width:'16px',
                                            display:'block'
                                        }
                                    }),
                                    h('img',{
                                        attrs:{
                                            src:this.greenpanda
                                        },
                                        style:{
                                            width:'16px',
                                        }
                                    }),
                                ])
                                break;
                        }
                        return h('div',{
                            style:{
                                width:'100%',
                                'text-align':'left'
                            }
                        },[
                            divs,
                            h('span',{
                                props:{

                                },
                                attrs:{
                                    title:params.row.BOOTHN
                                },
                                style:{
                                    color: '#FFE91A',
                                    cursor:'pointer'
                                },
                                on:{
                                    click:() =>{
                                        let index = (params.row.TOPNUMBER);
                                        let current = "TOPNUMBER";
                                        this.positionIndexShowEdit = params.row;
                                        this.$emit('clickToPosition',{index,hallno:params.row.HALLNO,current,paramsIndex:params.index});
                                        // this.clickToPosition(index,params.row.HALLNO,current,params.index);
                                    }
                                }
                            },params.row.BOOTHN)
                        ])
                    }
                }
            ],
            exhibitordata:[],
            exhibitorPage:1,
            exhibitorNum:1,
            exhibitordataAll:[],
        }
    },
    methods:{
        webpage2(value){
            this.exhibitorPage += value;
            if(this.exhibitorPage <=0 || (this.exhibitorPage-1)*10 >= this.exhibitorNum){
                this.exhibitorPage -= value;
                return;
            }
            this.exhibitordata = this.exhibitordataAll.slice(10*(this.exhibitorPage-1),10*this.exhibitorPage);
        },
        qryExpo(){      
            publicInter(interfaceUrl.qryExhibitorForExpo,{}).then(r=>{
                if(r){
                    this.exhibitordataAll = r.list;
                    this.exhibitorPage = 1;
                    this.exhibitorNum = r.list.length;
                    this.exhibitordata = this.exhibitordataAll.slice(0,10)
                }
            })
        },
    }
    
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../../styles/mixin.scss';
.littleTitle{
    @include littleTitle;
}

.breakPage{
    @include breakPage;
}
</style>
