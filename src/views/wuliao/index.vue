<template>
    <div>
            <Row style='margin-bottom:20px' :gutter='16'>
                <Col span=9>
                    <Col span=14>
                        <DatePicker size="large" type="date" v-model='time'  placeholder="请选择日期" style="width:100%;margin:0 1px" class="self"></DatePicker>
                    </Col>
                    <Col span=10>
                        <Select v-model="valueSelect"  size="large">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Col>
                <Col span=10 push=1>
                    <Col span=14>
                        <Input  size="large" v-model="queryParams[type]" placeholder="请输入" clearable style="width: 100%"></Input>
                    </Col>
                    <Col span=10>
                        <Select  size="large" v-model="type" placeholder="选择查询条件">
                            <Option v-for="item in queryType" :value="item.value"  :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                   
                </Col>
                <Col span=3 push=2>
                    <Button type="primary" long size='large' @click="query">查询</Button>
                </Col>
            </Row>
            <Table  :columns="columns1" :data="data1" class="self"></Table>
            <Page :total="totalCount" v-if="totalCount"
          :page-size='pageSize'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
    </div>
</template>
<script>
 import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
 import expandRow from './expand.vue';
 import {fromate} from '../../until/fromTime'
export default {
    data(){
        return{
            pageSize:20,
            type:'MATERIALNO',
            queryType:[
                {label:'物料编号',value:'MATERIALNO'},
                {label:'物料对应中文名称',value:'MaterialNameCN'},
                {label:'HS编码',value:'HSCODE'},
                {label:'企业代码',value:'CNCOMPANYCODE'},
            ],
            totalCount:null,
            valueSelect:1,
            time:new Date(),
            queryParams:{   
                CNCOMPANYCODE:'',
                HSCODE:'',
                MaterialNameCN:'',
                MATERIALNO:'',
                startTime:'',
                endTime:'',
                pageNum:'0',
                pageSize:'20',
            },
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
            columns1:[
                 {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                {
                    title:'物料编号',
                    key:'MATERIALNO'
                },
                {
                    title:'物料对应中文名称',
                    key:'MATERIALNAMECN'
                },
                {
                    title:'HS编码',
                    key:'HSCODE'
                },
                {
                    title:'原产国ISO(国际标准)代码',
                    key:'ORIGINCOUNTRYCODE'
                },
                {
                    title:'上传时间',
                    key:'CREATEDATE'
                },
                {
                    title:'报关用中文名称',
                    key:'DECLARATIONCHNAME'
                },
                {
                    title:'企业代码',
                    key:'CNCOMPANYCODE'
                },
                {
                    title:'代理企业代码',
                    key:'AGENTCODE'
                },
            ],
            data1:[],
        }
    },
    methods:{
        query(){
            if(this.time){
                var year=this.time.getFullYear()
                var mouth=this.time.getMonth()+1
                var date=this.time.getDate()
                var startMouth=this.time.getMonth()+1-this.valueSelect
                var startYear=year
                if(mouth<10){
                    mouth='0'+mouth
                }
                if(date<10){
                    date='0'+date
                }
                if(this.valueSelect){
                    if(startMouth>0&&startMouth<10){
                        startMouth='0'+startMouth
                    }else if(startMouth<=0&&startMouth>-3){
                        startYear=startYear-1
                        startMouth=12+startMouth
                    }else if(startMouth<=-3){
                        startYear--
                        startMouth='0'+(12+startMouth)
                    }
                    this.queryParams.startTime=''+startYear+startMouth+date
                }
                this.queryParams.endTime =''+year+mouth+date
             }else{
                 this.queryParams.startTime=this.queryParams.endTime=''
             }
             this.queryType.forEach(item=>{
                 if(this.type!==item.value){
                     this.queryParams[item.value]=''
                 }
             })
             publicInter(interfaceUrl.queryMaterialDetailed,this.queryParams).then(r=>{
                 r.datas.forEach(item => {
                     item.CREATEDATE=fromate(`${item.CREATEDATE}`)          
                 });
                this.data1=r.datas
                this.totalCount=r.total
                })

        },
        pageChange(page){
            this.queryParams.pageNum=`${page-1}`
            this.query()
        }
    }


}
</script>
<style lang="scss" scoped>
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #eeccee;
    }
</style>
