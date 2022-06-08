<template>
    <div>
         <Spin size="large" fix v-if="spinShow" style="z-index=1100">数据查询中...</Spin>
        <h1 >全景展示数据下载</h1>
        <Row style="margin:20px 0">
            <Col span=8>
                <Col span=16>
                    <DatePicker size="large" type="date" v-model='time' placeholder="请选择提单时间段" style="width:100%" class="self"></DatePicker>
                </Col>
                <Col span=8>
                    <Select v-model="valueSelect" style="width:100%;margin-right:30px;" size="large">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>            
            </Col>
            <Col span=3 push=2>
                 <Button type="primary" size='large' long @click="query">查询</Button>
            </Col>
        </Row>
         <Table border :columns="columns1" :data="data1" class="self"></Table>
         <Page :total="totalCount" 
          :page-size='20'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
           <!-- <Button type="primary"  size='large' @click="exportExcel" style="float:right;margin:18px 20px 0 0">导出本页数据</Button> -->
    </div>
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            form:{
                startTime:'',
                endTime:'',
                page:0,
                pageSize:20
            },
            totalCount:0,
            totalData:[],
            spinShow:false,
            time:'',
            valueSelect:1,
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
                    title:'提单号',
                    width:150,
                    key:'bl_ref_cde'
                },
                {
                    title:'订舱时间',
                    width:180,
                    key:'booking'
                },
                {
                    title:'提单时间',
                    width:180,
                    key:'billInfo'
                },
                {
                    title:'接货地',
                    width:180,
                    key:'deliveryPlace'
                },
                {
                    title:'始发装港船',
                    width:180,
                    key:'firstPOL'
                },
                {
                    title:'换提货单',
                    width:180,
                    key:'billLadingInfo'
                },
                {
                    title:'设备交接单',
                    width:180,
                    key:'handoverEquipment'
                },
                {
                    title:'海关接收舱单',
                    width:180,
                    key:'importManifest'
                },
                {
                    title:'海关接收申报',
                    width:180,
                    key:'declare'
                },
                {
                    title:'海关放行',
                    width:180,
                    key:'release'
                },
                {
                    title:'提货计划受理',
                    width:180,
                    key:'deliveryPlan'
                },
                {
                    title:'实际靠泊',
                    width:180,
                    key:'actualShore'
                },
                {
                    title:'卸箱',
                    width:180,
                    key:'yard'
                },
                {
                    title:'提离',
                    width:180,
                    key:'liftOff'
                },
            ],
            data1:[]

        }
    },
    created(){


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
                    this.form.startTime=''+startYear+startMouth+date
                }
                this.form.endTime =''+year+mouth+date
            }else{
                 this.form.startTime=this.form.endTime=''
             }
            
            this.form.page=0
            this.getlists()
           
        },
        getlists(){
             this.spinShow=true
            publicInter(interfaceUrl.queryDataList,this.form).then(r=>{
                this.spinShow=false
                if(r.total>0){
                    this.data1=r.dataList
                    this.totalCount=r.total
                    // this.data1=this.totalData.slice(0,20)
                }else{
                    this.data1=[];
                     this.totalCount=0
                }
            }).catch(e=>{
                this.spinShow=false
                if(e.response&&e.response.status){
                    if(e.response.status===504){
                        this.$Message.error('数据查询超时！')
                    }else{
                        this.$Message.error(`${e.response.statusText}`)
                    }
                }else{
                    this.$Message.error('数据查询超时！')
                }
                
            })

        },
        formatJson(filterVal, jsonData) {
  　　　　return jsonData.map(v => filterVal.map(j => v[j]))
  　　  },
        pageChange(page){
            this.form.page=parseInt(page-1) 
            this.getlists()
        },
        exportExcel(){
            if(this.data1.length>0){
                 require.ensure([], () => {
                const {export_json_to_excel} = require('../../../vendor/Export2Excel')
                const tHeader =  this.cutValue(this.columns1, 'title')
                const filterVal = this.cutValue(this.columns1, 'key')
                const list = this.data1
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '全景展示数据列表')
                })
            }else{
                this.$Message.error({
                        content: '没有数据可以导出',
                        duration: 5
                });
            }
        },
        cutValue (target, name) {
            let arr = []
            for (let i = 0; i < target.length; i++) {
                arr.push(target[i][name])
            }
            return arr
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
