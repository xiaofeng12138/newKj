<template>
    <div class="taglist">
         <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>进博会人员入境检疫</h2></Col>
        </Row>
          <div class="query" >
            <div  style="width: 18%"> 人员姓名：<Input size="large" placeholder="请输入入境人员姓名" style="width:60%" v-model="queryInfo.personName"/></div>
            <div style="width: 16%"> 国家/地区：<Input size="large" placeholder="请输入国家/地区" style="width:60%" v-model="queryInfo.country"/></div>
            <div class="copName"> 护照号：<Input size="large" placeholder="请输入护照号" style="width:70%" v-model="queryInfo.passportId"/></div>
            <div style="width: 18%"> 处置情况：<Input size="large" placeholder="请输入处置情况" style="width:60%" v-model="queryInfo.disposalRes"/></div>
            <div class="copName"> 入境日期：
                  <DatePicker size="large"  type="date" transfer  @on-change="queryInfo.entryStartDate = $event" style="width:140px" placeholder="请选择入境日期" v-model="queryInfo.entryStartDate" ></DatePicker>
            </div>
            <Button type='primary'  @click="queryTagList(1)" style="margin-right:10px;width:100px">查  询</Button>
            <Button type='primary'   @click="openAddModal" style="margin-right:10px;width:100px">新  增</Button>
            <!-- <Button type='primary'   @click="exportExcel" style="margin-right:0px;width:100px">导 出</Button> -->
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tagsList'  class="self">
            <!-- <template  slot-scope="{row}" slot="action"> 
                <Button type="error" size ='large'  @click="delbtn(row)" >删除</Button>
                <Button type="primary" size ='large'  style="margin-left:10px" @click="modifyTagList(row)">修改</Button>
            </template> -->
        </Table>
            <div  class ='bottombtn'>
            <Page :total="total1" :page-size=10  @on-change="changePage1" show-total />
            </div>
        </div>


         <!-- 添加授权信息的moadl -->
        <Modal
         v-model='addModal' 
         width='1000' 
         :mask-closable=false 
         :footer-hide = true
         :closable =false
        
         >
         <p slot="header" style="text-align:center;font-size:15px">
              <span v-if="showFlag">新增人员信息</span>
              <span v-else>修改人员信息</span>

          </p>
            <Form  ref='formData' :model="formData" :label-width ='180' style="margin-top:20px">
           
             <Row >
                <Col span="12"><FormItem label='人员姓名'   > <Input v-model="formData.personName" placeholder="请输入人员姓名" /></FormItem></Col>
                <Col span="12"><FormItem label='国家/地区'  > <Input v-model="formData.country" placeholder="请输入'国家/地区"/></FormItem></Col>
             </Row>
              <Row >
                <Col span="12"><FormItem label='性别'  > 
                                <Select v-model="formData.sax"  placeholder="请选择性别">
                                    <Option value="男" >男</Option>
                                    <Option value="女" >女</Option>
                                </Select>
                    </FormItem>
                </Col>
                <Col span="12"><FormItem label='人员类型'  > 
                                <Select v-model="formData.personType"  placeholder="请选择人员类型">
                                    <Option value="A" >A</Option>
                                    <Option value="B" >B</Option>
                                    <Option value="C" >C</Option>
                                    <Option value="D" >D</Option>
                                </Select>
                    </FormItem>
                </Col>
                 
             </Row>
             <Row >
               <Col span="12"><FormItem label='航班号' > <Input v-model="formData.flightNo" placeholder="请输入航班号" /></FormItem></Col>
               <Col span="12"><FormItem label='护照号码'> <Input v-model="formData.passportId" placeholder="请输入护照号码"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12">
                <FormItem label='入境日期' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.entryDate = $event"  placeholder="请选择入境日期" v-model="formData.entryDate" ></DatePicker>
                </FormItem></Col>
                <Col span="12"><FormItem label='入境体温'  prop='descountry' > <Input v-model="formData.temperature" placeholder="请输入入境体温"/></FormItem></Col>
             </Row>
             <Row >
               <Col span="12"><FormItem label='有无症状'  > 
                                <Select v-model="formData.sampling"  placeholder="请有无症状">
                                    <Option value="有" >有</Option>
                                    <Option value="无" >无</Option>
                                </Select>
                    </FormItem>
                </Col>
                <Col span="12"><FormItem label='是否采样'  > 
                                <Select v-model="formData.symptom"  placeholder="请选择是否采样">
                                    <Option value="是">是</Option>
                                    <Option value="否">否</Option>
                                </Select>
                    </FormItem>
                </Col>
             </Row>
             <Row >
               <Col span="12"><FormItem label='检测结果'> <Input v-model="formData.detectionRes" placeholder="请输入检测结果" /></FormItem></Col>
               <Col span="12"><FormItem label='处置情况'> <Input v-model="formData.disposalRes" placeholder="请输入处置情况"/></FormItem></Col>
             </Row>
               <Row >
               <Col span="12"><FormItem label='备注'> <Input v-model="formData.remark" placeholder="请输入备注" /></FormItem></Col>
              </Row >
             <Row>
                <Col span="24" style="margin:auto;text-align:center">
                <Button type="primary" style="width:120px;margin-right:20px"  @click="closeAddModal('formData')">取   消</Button>
                <Button type="primary" style="width:120px"  @click="submitone('formData')">提   交</Button>
                </Col>
             </Row>
           </Form>
          
        </Modal>

        <!-- 确认取消弹窗 -->
        <Modal
               v-model="confirmModal"
                width="500"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="header" style="text-align:center;font-size:18px">
                    <span>提示</span>
                </p>
                <div style="text-align:center;height:50px;font-size:16px;font-weight:bold">
                    <p>是否确认删除当前选中内容</p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' @click="cancleModal" style="margin-right:20px">取消</Button> 
                   <Button type='primary' size='large' @click="confirmPass">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
        </Modal>
    </div>
</template>

<script>
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
                width:70,
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
              
              {
                title:'操作',
                slot:'action',
                align:'center',
                width:200, 
                render: (h, params) => {
                                const that=this
                                return h('div', [
                                h('Button',{
                                        props:{
                                            type:'primary',
                                        },
                                        on:{
                                            click(){
                                                that.addModal = true
                                                that.modifyTagList(params.row)
                                            }
                                        }
                                    },'修改'),
                                    
                                    h('Poptip', {
                                        props: {
                                        confirm: '',
                                        placement:'top-end',
                                        title:"您确认删除这条内容吗？"
                                        },
                                        style:{
                                            textAlign:'left'
                                        },
                                        nativeOn:{
                                        click(e){
                                            var text=e.target.innerText.replace(/\s+/g,"")
                                            if(text==='确定'||text==='ok'){
                                               that.delbtn(params.row.uuid)
                                            }
                                        }
                                        }
                                    },[
                                    h('Button',{
                                        props:{
                                            type:'error',
                                        },
                                        style:{
                                            marginLeft:'10px'
                                        }
                                    },'删除')])
                                    
                                ])
                            }
              
              } 
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
            numPage:1
        }
    },
    methods:{
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
            console.log('row',row)
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
            this.formData.temperature=row.temperature
            this.formData.symptom=row.symptom
            this.formData.uuid = row.uuid
            this.formData.remark=row.remark
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
                    this.queryTagList(1)
                  }else{
                    this.$Message.error('操作失败')
                  }
                })
            }else{
               delete this.formData.uuid
                publicInter(interfaceUrl.entryaddInfo,this.formData).then(res=>{
                    console.log(res)
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
            this.formData.remark=''
            this.formData.uuid = ''
            this.formData.temperature=''
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
                console.log(res)
                this.tagsList = res.list
                this.total1 = (res.total)*1
            })
        },
    },
    mounted(){
        this.queryTagList(1)
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
    
}
    
</style>