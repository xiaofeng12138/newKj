<template>
    <div>
        <h1>箱动态查询</h1>
        <Row  :gutter="16">
            <Col span=8>
                <Col :span='4'>
                <span class="itemTitle">箱号</span>    
                </Col>
                <Col  :span='18'>
                      <Input size='large' v-model="queryParams.cntr_num" placeholder="请输入箱号" ></Input>
                </Select>
                </Col>
            </Col>
            <Col  span=12>
                <Col span=6>
                  <span  class="itemTitle">选择时间</span>  
                </Col>
                <Col span=10>
                     <DatePicker v-model='queryParams.endEvent_time' :clearable='false' style="width:100%" type="date" size='large' placeholder="选择时间" class="self" ></DatePicker>
                </Col> 
                <Col span=8>
                     <Select v-model="queryParams.startEvent_time"  size="large">
                        <Option v-for="item in dataRange" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>        
            </Col>
           
            <Col span=3 push=1>
                <Button type="primary" size='large' long @click="query">查询</Button>
            </Col>
        </Row>
         <Table border :columns="columns" :data="data" class="self"></Table>
          <Page :total="total" v-if="total" :page-size='queryParams.pageSize' style="float:right;margin-top:16px" @on-change='pageNumChange'></Page>
    </div>   
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            total:null,
            dataRange:[
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
            queryParams:{
                cntr_num:'',
                startEvent_time:1,
                pageNum:'0',
                pageSize:20,
                endEvent_time:new Date()
            },
            columns:[
                {
                    title:'箱号',
                    key:'CNTR_NUM'
                },
                {
                    title:'箱子动态',
                    key:'CNTR_STATUS'
                },
                {
                    title:'动态发生地点',
                    key:'LOC'
                },
                {
                    title:'运输工具类型',
                    key:'TRANS_TYPE'
                },
                {
                    title:'动态时间',
                    key:'EVENT_TIME'
                },
            ],
            data:[]
        }
    },
    methods:{
        query(){
            var params={...this.queryParams};
         
            params.startEvent_time=this.fromateTime(this.queryParams.endEvent_time,this.queryParams.startEvent_time).start 
            params.endEvent_time=this.fromateTime(this.queryParams.endEvent_time,this.queryParams.startEvent_time).end   
            publicInter(interfaceUrl.queryBoxDynamics,params).then(r=>{
                if(r.total>0){
                    this.data=r.datas
                    this.total=r.total
                }else{
                     this.$Message.warning('未查询到数据')
                }
                
            })

            
            
        },
        fromateTime(time,range){
            var year=time.getFullYear(),
                mouth=time.getMonth()+1,
                date=time.getDate(),
                rangeYY=year,
                rangeMM=mouth-range;
            if(mouth<10){
                mouth='0'+mouth
            }
            if(date<10){
                date='0'+date
            }  
            if(rangeMM>0&&rangeMM<10){
                rangeMM='0'+rangeMM
            }else if(rangeMM<=0&&rangeMM>-3){
                rangeYY=rangeYY-1
                rangeMM=12+rangeMM
            }else if(rangeMM<=-3){
                rangeYY--
                rangeMM='0'+(12+rangeMM)
            }
            return {end:`${year}-${mouth}-${date}`,start:`${rangeYY}-${rangeMM}-${date}`}
        },
         pageNumChange(page){
            this.queryParams.pageNum=`${page-1}`
            this.query()
        }
    },
   

    
}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
    h1{
        padding-bottom: 16px;
        margin-bottom: 16px;
        border-bottom: 1px dashed #ddd;
    }
    .ivu-col{
        height: 36px;
        margin-bottom: 16px;
        line-height: 36px;
        .itemTitle{
            font-size: 14px;
        }
    }
    
</style>
