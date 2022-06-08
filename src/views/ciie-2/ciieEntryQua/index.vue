<template>
    <div class="taglist">
          <div class="query" >
            <div  style="width: 18%"><Input size="large" placeholder="请输入入境人员姓名" style="width:60%" v-model="queryInfo.personName"/></div>
            <div style="width: 16%"><Input size="large" placeholder="请输入国家/地区" style="width:60%" v-model="queryInfo.country"/></div>
            <div class="copName"><Input size="large" placeholder="请输入护照号" style="width:70%" v-model="queryInfo.passportId"/></div>
            <div style="width: 18%"><Input size="large" placeholder="请输入处置情况" style="width:60%" v-model="queryInfo.disposalRes"/></div>
            <div class="copName">
                  <DatePicker size="large"  type="date" transfer  @on-change="queryInfo.entryStartDate = $event" style="width:140px" placeholder="请选择入境日期" v-model="queryInfo.entryStartDate" ></DatePicker>
            </div>
            <Button type='primary'  @click="queryTagList(1)" style="margin-right:10px;width:100px">查  询</Button>
            <!-- <Button type='primary'   @click="openAddModal" style="margin-right:10px;width:100px">新  增</Button> -->
            <!-- <Button type='primary'   @click="exportExcel" style="margin-right:0px;width:100px">导 出</Button> -->
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tagsList'  class="customTable">
            <!-- <template  slot-scope="{row}" slot="action"> 
                <Button type="error" size ='large'  @click="delbtn(row)" >删除</Button>
                <Button type="primary" size ='large'  style="margin-left:10px" @click="modifyTagList(row)">修改</Button>
            </template> -->
            </Table>

            <div  class ='bottombtn'>
            <Page :total="total1" :page-size=10  @on-change="changePage1" show-total />
            </div>
            <div id='charts'>
            </div>
        </div>

    </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {getCookie,setCookie} from '@/until/getToken'


export default {
    data() {
        return {
            showFlag:true,
            //新增的弹出框
            mandateModal:false,
            showCompanyName:getCookie('companyName'),
            //新增授权企业modal信息
            addModal:false,
            formData:{
                uuid:'',
                entryStartDate:"",
                entryEndDate:"",
                entryDate:"",
                flightNo:"",
                personType:"",
                personName:"",
                sax:"",
                country:"",
                passportId:"",
                sampling:"",
                symptom:"",
                detectionRes:"",
                disposalRes:"",

            },
            formRules:{
                lablename:[{required:true, trigger:'blur' , message:'权利人名称不能为空', }],
                companyname:[{required:true, trigger:'blur' , message:'公司名称不能为空', }],
                cncompanycode:[{required:true, trigger:'blur' , message:'公司信用代码不能为空', }],
                goodsname:[{required:true, trigger:'blur' , message:'商品名称不能为空', }],
                brandname:[{required:true, trigger:'blur' , message:'品牌名称不能为空', }],
            },
            tagsList:[],
            columns:[
                {
                title:'序号',
                width:80,
                align:'center',
                 render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 10 )+1)
                    }
               },
               {
                title:'入境日期', 
                key:'entryDate',
                align:'center',
                width:150
              },
               {
                title:'航班号',
                key:'flightNo',
                align:'center',
              },
              {
                title:'人员类型',
                key:'personType',
                align:'center',
              },
              {
                title:'姓名',
                key:'personName',
                align:'center',
                
              },
              {
                title:'性别',
                key:'sax',
                align:'center',
                
              },
              {
                title:'国籍',
                key:'country',
                align:'center',
              },
              {
                title:'护照号',
                key:'passportId',
                align:'center',
              },
              {
                title:'入境体温',
                key:'temperature',
                align:'center',
              },
              {
                title:'有无症状',
                key:'sampling',
                align:'center',
                
              },
              {
                title:'是否采样',
                key:'symptom',
                align:'center',
              },
              {
                title:'检测结果',
                key:'detectionRes',
                align:'center',
                
              },
              {
                title:'处置情况',
                key:'disposalRes',
                align:'center',
              },
              {
                title:'备注',
                key:'remark',
                align:'center',
              },
              
            ],
           queryInfo:{
               entryStartDate:"",
               personName:"",
               country:"",
               passportId:'',
               disposalRes:'',
               pageNum:1,
               pageSize:10

           },
            confirmModal:false,
            total1:0,
            delCompanyArray:[],
            showdisabled:true,
            numPage:1,
            charts: null,
            chartsData:{},
            option: {
                color: ['#23b2ff', '#6cfe87', '#eeec32', '#ffa131', '#ff6d6d', '#34fcff', '#8869ff', '#fe56dd'],
                title: [],
                tooltip: {
                    trigger: 'item',
                    formatter:function (params) {
                        let value = `<span style='color:#fbc500'>${params.value}%</span>`
                        return params.name + ': ' +  value
                    }
                },
                // legend: {
                //     icon: 'circle',
                //     orient: 'vertical',
                //     left: 'left',
                //     top: 'middle',
                //     textStyle: {
                //         fontSize: 14,
                //         color: '#fff'
                //     },
                // },
                series: []
            }
        }
    },
    methods:{
        //饼状图
        closeAddModal(name){
            this.formData.entryDate = ''
            this.formData.flightNo =''
            this.formData.personType =''
            this.formData.personName =''
            this.formData.sax = ''
            this.formData.country = ''
            this.formData.passportId =''
            this.formData.sampling =''
            this.formData.detectionRes = ''
            this.formData.disposalRes = ''
            this.formData.uuid = ''
            this.addModal = false
            this.showFlag = true
        },
        //修改信息
        modifyTagList(row){
            this.showFlag = false
            this.formData.entryDate = row.entryDate
            this.formData.flightNo = row.flightNo
            this.formData.personType = row.personType
            this.formData.personName = row.personName
            this.formData.sax = row.sax
            this.formData.country = row.country
            this.formData.passportId = row.passportId
            this.formData.sampling = row.sampling
            this.formData.detectionRes = row.detectionRes
            this.formData.disposalRes = row.disposalRes
            this.formData.uuid = row.uuid
            this.addModal = true
        },
        //新增表单提交
        submitone(name){
            if(this.formData.uuid){
                publicInter(interfaceUrl.updateEntryInfo,this.formData).then(res=>{
                  if(res == 1){
                    this.addModal = false
                    this.$refs[name].resetFields()
                    this.$Message.success('操作成功')
                    this.formData.entryDate = ''
                    this.formData.flightNo =''
                    this.formData.personType =''
                    this.formData.personName =''
                    this.formData.sax = ''
                    this.formData.country = ''
                    this.formData.passportId =''
                    this.formData.sampling =''
                    this.formData.detectionRes = ''
                    this.formData.disposalRes = ''
                    this.formData.uuid = ''
                    this.queryTagList(1)
                  }else{
                    this.$Message.error('操作失败')
                  }
                })
            }else{
               delete this.formData.uuid
                publicInter(interfaceUrl.entryaddInfo,this.formData).then(res=>{
                  if(res == 1){
                    this.addModal = false
                    this.$refs[name].resetFields()
                    this.$Message.success('操作成功')
                    this.queryTagList(1)
                  }else{
                    this.$Message.error('操作失败')
                  }
                })
            }
               
        },
        //新增窗口打开
        openAddModal(){
            this.addModal = true;
        },
        //弹出框关闭
        cancleModal(){
            this.confirmModal = false
            this.delCompanyArray = []
        },
        delbtn(row){
            let data ={
                uuid:row
            }
             publicInter(interfaceUrl.delEntryInfo,data).then(res=>{
               if(res == 1){
                  this.$Message.success('删除成功')
                  this.queryTagList(1)
               }else{
                   this.$Message.error('删除失败')
               }
               
           })
        },
        confirmPass(){
          let data = {
               data:this.delCompanyArray
           }
           publicInter(interfaceUrl.deleteCompany,data).then(res=>{
               if(res.code == 200){
                  this.$Message.success('删除成功')
                  this.confirmModal = false
                  this.delCompanyArray = []
                  this.queryTagList(1)
               }else{
                   this.$Message.error(res.message)
               }
               
           })
        },

        changePage1(page){
            this.numPage = page
            this.queryTagList(page)
        },
        queryTagList(page){
            let requsetData = {}
            for(let key in this.queryInfo){
                if(this.queryInfo[key]){
                   requsetData[key] = this.queryInfo[key]
                }
            }
            requsetData.pageNum = page
            publicInter(interfaceUrl.queryEntryInfo,requsetData).then(res=>{
                this.tagsList = res.list
                this.total1 = (res.total)*1
            })
        },
        queryData(query){
            let queryData={
                type:query
            }
            publicInter(interfaceUrl.queryAnalysis,queryData).then(res=>{
                if(res.list.length>0)
                this.chartsData[query]=res.list
            })
            
        },
        qryChartsData(){
                this.queryData('person_type')//请求人员类型
                this.queryData('country')//请求国籍
                this.queryData('temperature')//体温情况
                this.queryData('sampling')//有无症状
                this.queryData('symptom')//是否采样
                this.queryData('detection_res')//检测结果
                this.queryData('disposal_res')//处置结果
                setTimeout(() => {
                    this.initPie()
                }, 2000);
            
            
        },
        initPie(){
            var arr=[],data=this.chartsData,dataList=[],dataAll=[],titleList=[],list={}
            for(let item in this.chartsData){
                this.chartsData[item].forEach((index)=>{
                    dataList.push({name:index.TYPE,value:index.BL})
                })
                dataAll.push(dataList)
                list[item]=dataList
                dataList=[]

            }
            var title=[
                {type:'person_type',text:'人员类型'},
                {type:'country',text:'国籍'},
                {type:'temperature',text:'入境体温'},
                {type:'sampling',text:'有无症状'},
                {type:'symptom',text:'是否采样'},
                {type:'detection_res',text:'检测结果'},
                {type:'disposal_res',text:'处置结果'}
                ]
            for(let item in list){
                // console.log('list',item)
                for(let i =0;i<title.length;i++){
                    if(title[i].type==item){
                        let arrChild={
                            type: 'pie',    
                            radius: ['40%', '60%'],
                            center: [10 + i * 14 + '%', '50%'],
                            label: {
                                show: false
                            },
                            data:list[item]
                        }
                        arr.push(arrChild)
                    }
                     
                }

            }
            // dataAll.forEach((item,i)=>{
            //     let arrChild={
            //         type: 'pie',    
            //         radius: ['40%', '60%'],
            //         center: [10 + i * 15 + '%', '50%'],
            //         label: {
            //             show: false
            //         },
            //         data:item
            //     }
            //     arr.push(arrChild)
            //     titleList.push({
            //         // text:title[i].slice(0,10)+'\n'+title[i].slice(10),
            //         left: 10 + i * 15 + '%',
            //         top: '85%',
            //         textAlign: 'center',
            //         textStyle: {
            //             fontSize: 15,
            //             color: '#fff',
            //             width: '3%'
            //         }
            //     })
            // })
            for(let i =0;i<title.length;i++){
                titleList.push({
                    text:title[i].text,
                    left: 10 + i * 14 + '%',
                    top: '85%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 15,
                        color: '#fff',
                        width: '3%'
                    }
                })
            }
            console.log('arr',arr,titleList)
            this.option.series = arr;
            this.option.title = titleList;
            // this.charts.setOption(this.option)
            setTimeout(() => {
                this.charts.setOption(this.option)
                // console.log('123123',this.option)
            }, 1000);
            
        },
    },
    mounted(){
        this.queryTagList(1)
        this.qryChartsData()
        this.initPie()
        this.charts = echarts.init(document.getElementById("charts"));
        
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    h2{
        padding-bottom: 20px;
    }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        /deep/ .ivu-input-large{
            background: transparent;
            color: white;
        }
        .copName{
            width: 15%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
        }
        .bottombtn{
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            .ivu-page{
               margin: 10px 20px 0 0;
            }
        }
        #charts{
            width: 100%;
            height: 300px;
        }
    
}
    
</style>