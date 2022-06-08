<template>
    <div>
        <h1>船图查询</h1>
        <Row class="query">
            <Col :span='6'>
                <Col :span='4'>
                    <span class="itemTitle">船名</span>
                </Col>
                <Col :span='20'>
                     <Input v-model="vsl_nme" size='large' placeholder="请输入船名" @on-blur="getBoxList"></Input>
                </Col>
                
            </Col>
            <Col :span='6' :push='1'>
                <Col :span='4'>
                    <span  class="itemTitle">航次</span>
                </Col>
                <Col :span='20'>
                     <Input v-model="arr_ext_voy_ref" size='large' placeholder="请输入航次" @on-blur="getBoxList"></Input>
                </Col>    
            </Col>
            <Col :span='6' :push='2'>
                <Col :span='4'>
                    <span class="itemTitle">箱号</span>
                </Col>
                <Col :span='20'>
                    <!-- <Input v-model="cntr_num" size='large' placeholder="请输入箱号" ></Input> -->
                     <Select v-model="cntr_num" size="large" class="self" filterable placeholder='箱号：请下拉'> 
                     <option value="" v-if="cityList.length<=0"></option>
                        <Option v-for="item in cityList" :value="item.CNTR_NUM" :key="item.CNTR_NUM">{{ item.CNTR_NUM }}</Option>
                        <Spin size="large" fix v-if="cityList.length<=0"></Spin> 
                    </Select>
                </Col>  
            </Col>
            <Col :span='2' :push='4'>
                <Button @click="query" type="primary" size='large' long>查询</Button>
            </Col>
        </Row>
        <Table class="self" border :columns="columns" :data="data"></Table>
         <Page :total="total" v-if="total" :page-size='pageSize' style="float:right;margin-top:16px" @on-change='pageNumChange'></Page>
        <Modal
        width='930'
        v-model="modal"
        title="船图详情">
        <Table class="self" border :columns="columns1" :data="data1"></Table>
        
    </Modal>
    </div>
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            total:null,
            pageSize:20,
            modal:false,
            vsl_nme:"",
            arr_ext_voy_ref:"",
            cntr_num:"",
            cityList: [],
            data:[],
            columns:[
                {
                    title:'船名',
                    key:'VSL_NME'
                },
                {
                    title:'航次号',
                    key:'ARR_EXT_VOY_REF'
                },
                {
                    title:'挂靠次数',
                    key:'CALL_NUM'
                },
                {
                    title:'港口',
                    key:'PORT'
                },
                {
                    title:'箱号',
                    key:'CNTR_NUM'
                },
                {
                    title:'集装箱的位置',
                    key:'STOWAGE_LOCATION'
                },
                {
                    title:'操作',
                    key:'action',
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                textAlign:'center'
                            }
                        },[
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                on:{
                                    click:()=>{
                                        this.getDetaile(params.row.BAYPLAN_UUID)

                                    }
                                }
                            },'查看')
                        ])
                    }    
                },  
            ],
            columns1:[
                {
                    title:'UUID',
                    fixed: 'left',
                     width:250,
                    key:'BAYPLAN_UUID'
                },
                {
                    title:'危险品分类代码',
                    width:150,
                    key:'IMDG_CLASSIFICATION'
                },
                {
                    title:'温度上限',
                    width:100,
                    key:'UPPER_TEMPR'
                },
                {
                    title:'温度下限',
                    width:100,
                    key:'LOW_TEMPR'
                },
                {
                    title:'温度单位',
                    width:100,
                    key:'TEMPR_UNIT'
                },
                {
                    title:'超高',
                     width:80,
                    key:'OVERHEIGHT'
                },
                {
                    title:'后部超长',
                    width:100,
                    key:'OVERLENGTH_AFTER'
                },
                {
                    title:'前部超长',
                    width:100,
                    key:'OVERLENGTH_FORE'
                },
                {
                    title:'左面超宽',
                    width:100,
                    key:'OVERLENGTH_LEFT'
                },
                {
                    title:'数据版本标识',
                    key:'VERSION',
                    width:150,
                    fixed: 'right',
                }
                
            ],
            data1:[]
            
        }
    },
    methods:{
        getBoxList(){
            if(this.vsl_nme&&this.arr_ext_voy_ref){
                publicInter(interfaceUrl.queryShipChartCntr,{vsl_nme:this.vsl_nme,arr_ext_voy_ref:this.arr_ext_voy_ref}).then(r=>{
                    this.cityList=r.datas
                })
            }

        },
        search(pageNum){
            if(!this.vsl_nme){
                this.$Modal.warning({
                // title: 'title',
                  content: '请输入船名'
                });
                 return;
            }
            else if(!this.arr_ext_voy_ref){
                 this.$Modal.warning({
                // title: 'title',
                  content: '请输入航次'
                });
                return
            }else if(!this.cntr_num){
                 this.$Modal.warning({
                // title: 'title',
                  content: '请输入箱号'
                });
                return
            }else{
            }
                publicInter(interfaceUrl.queryShipChart,
                {vsl_nme:this.vsl_nme,arr_ext_voy_ref:this.arr_ext_voy_ref,cntr_num:this.cntr_num,pageNum,pageSize:this.pageSize})
                .then((res)=>{
                     this.data=res.datas;
                     this.total=res.total
                })
        },
        query(){
            this.search('0')
        },
        pageNumChange(page){
            this.search(`${page-1}`)
        },
        getDetaile(id){
            publicInter(interfaceUrl.queryShipChartDetail,{bayplan_uuid:id}).then(r=>{
                if(r){
                    this.modal=true;
                    this.data1=r.datas
                }
                
            })

        }
    }
}
</script>
<style>
    span.itemTitle{
         display: block;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
    }
</style>
   
<style rel="stylesheet/scss" lang="scss" scoped>
h1{
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd;
}
.ivu-table-wrapper{
    margin-top: 16px;
}
</style>

