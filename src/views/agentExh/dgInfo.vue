<template>
    <div>
        <h1>危险品防控查询</h1>
            <Row>
                <Col :span='18'>
                    <Col :span='2'>
                        <span class="itemTitle">提单号</span>
                    </Col>
                    <Col :span="22">
                            <Input v-model="queryParamsByNo.blno" placeholder="请输入提单号" size='large'></Input>
                    </Col>
                </Col>
                <Col :span="4" :push='1'> 
                    <Button type="primary" size='large' icon="ios-search" @click="searchByNo" >查询</Button>
                </Col>
            </Row> 
            <Row>
                <Col :span='6'>
                    <Col :span='6'>
                        <span class="itemTitle">起始日期</span>
                    </Col>
                    <Col :span="9">
                            <DatePicker v-model="queryParamsByDetail.from" type="date" placeholder="请输入起始日期"></DatePicker>
                    </Col>
                </Col>
                <Col :span='6'>
                    <Col :span='6'>
                        <span class="itemTitle">结束日期</span>
                    </Col>
                    <Col :span="9">
                            <DatePicker v-model="queryParamsByDetail.to" type="date" placeholder="请输入结束日期"></DatePicker>
                    </Col>
                </Col>
                <Col :span="6"> 
                   <Select v-model="queryParamsByDetail.flag" >
                       <Option v-for="item in modelList" :value="item.value" :key="item.value">{{item.label}}</Option>
                   </Select>
                </Col>
                <Col :span="18"  style="margin-top:16px"> 
                    <Select v-model="queryParamsByDetail.dgList" multiple>
                        <Option v-for="item in dgList" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                </Col>
                <Col :span="4" :push='1'  style="margin-top:16px"> 
                    <Button type="primary" size='large' icon="ios-search" @click="searchByDetail" >查询</Button>
                </Col>
            </Row>
        <Table border :columns="columns" :data="data" class="self"></Table>
        <div style="text-align:center;margin-top:16px">
          <Button type="primary" size='large' @click="downloadExcel" :disabled="isdisabled">导出Excel</Button>
          <span class="itemTitle">总数:{{totalDgInfo}}</span>
        </div>
    </div>
    
</template>
<script>
 import { mapMutations } from 'vuex'
//  import {queryInfor} from '../../api/queryShip'
 import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
             modelList:[
                 {
                     value:'I',
                     label:'进口'
                 },
                 {
                     value:'E',
                     label:'出口'
                 }
             ],
             dgList:[],
             pageSize:10,
             data:[],
             total:null,
             isdisabled:true,
             totalDgInfo:'',
             queryParamsByNo:{
                 blno:''
             },
             queryParamsByDetail:{
                 from:'',
                 to:'',
                 flag:'',
                 dgList:[]
             },
             columns:[
                 {
                     title:'报关单号',
                     key:'F'
                 },
                 {
                     title:'提单号',
                     key:'L'
                 },
                 {
                     title:'HSCode',
                     key:'C'
                 },
                 {
                     title:'品名',
                     key:'D'
                 },
                 {
                     title:'箱号',
                     key:'N'
                 },
            ]
        }
    },
    created(){
        this.queryDGList();
    },
    methods:{
         queryDGList() {
            publicInter(interfaceUrl.queryDgList, {}).then(r=>{
                console.log(r);
                r.datas.forEach(element => {
                    if(!element.HSCODE){
                        element.HSCODE=" "
                    }
                    if(!element.CARGONAME){
                        element.CARGONAME=" "
                    }
                    let param={
                        value:element.HSCODE+'/'+element.CARGONAME,
                        label:element.HSCODE+'/'+element.CARGONAME
                    }
                    this.dgList.push(param)
                });
            }).catch(error=>{
                console.log('错误：'+error)
            })
         },
         //根据提单号查询
         searchByNo(){
             console.log(this.queryParamsByNo)
             if(this.queryParamsByNo==""){
                 this.$Message.warning('请输入提单号');
                 return;
             }
             publicInter(interfaceUrl.queryDGInfoByBlno,this.queryParamsByNo).then(r=>{
                console.log(r);
                if(!r.datas){
                    this.$Message.error('查询失败');
                    return;
                }
                this.data=r.datas;
                this.isdisabled=false;
            }).catch(error=>{
                console.log('错误：'+error)
            })
             publicInter(interfaceUrl.getDGInfoRowNumByBlno,this.queryParamsByNo).then(r=>{
                console.log(r);
                if(!r.datas){
                    this.$Message.error('查询失败');
                    return;
                }
                this.totalDgInfo=r.datas[0].TOTAL;
            }).catch(error=>{
                console.log('错误：'+error)
            })  
         },
         //根据详细信息查询
         searchByDetail(){
             let from=this.queryParamsByDetail.from;
             let to=this.queryParamsByDetail.to;
             let flag=this.queryParamsByDetail.flag;
             let clist=this.queryParamsByDetail.dgList;
             if(from==""||to==""||flag==""||clist.length==0){
                 this.$Message.warning('请输入完整');
                 return;
             }
             let dateDiff=to.getTime()-from.getTime();
             let dayDiff=Math.floor(dateDiff/(24*3600*1000));
             if(dayDiff<0){
                 this.$Message.warning('起始日期不能大于结束日期');
                 return;
             }
             if(dayDiff>30){
                 this.$Message.warning('时间跨度不能超过一个月');
                 return;
             }
             from=this.formatDate(from);
             to=this.formatDate(to);
             let params={};
             params.from=from;
             params.to=to;
             params.flag=flag;
             params.clist=clist;
             console.log(params)
             publicInter(interfaceUrl.queryDGInfoByDt,params).then(r=>{
                console.log(r);
                if(!r.datas){
                    this.$Message.error('查询失败');
                    return;
                }
                this.data=r.datas;
                this.isdisabled=false;
            }).catch(error=>{
                console.log('错误：'+error)
            })
            publicInter(interfaceUrl.getDGInfoRowNumByDt,params).then(r=>{
                console.log(r);
                if(!r.datas){
                    this.$Message.error('查询失败');
                    return;
                }
                this.totalDgInfo=r.datas[0].TOTAL;
            }).catch(error=>{
                console.log('错误：'+error)
            })
         },
         downloadExcel(){
             if(this.data.length>0){
                require.ensure([], () => {
                const {export_json_to_excel} = require('../../vendor/Export2Excel')
                const tHeader =  this.cutValue(this.columns, 'title')
                const filterVal = this.cutValue(this.columns, 'key')
                const list = this.data
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '危险品防控列表')
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
        },
        formatJson(filterVal, jsonData) {
  　　　　return jsonData.map(v => filterVal.map(j => v[j]))
  　　  },
         formatDate(date){
             let year=date.getFullYear();
             let month=date.getMonth()+1;
             let day=date.getDate();
            return year+'-'+month+'-'+day;
         }
    }
    
}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
    h1{
        padding-bottom: 16px;
        border-bottom: 1px dashed #ddd;
        margin-bottom: 16px;
    }
    .ivu-row{
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #ddd;
    }
</style>
