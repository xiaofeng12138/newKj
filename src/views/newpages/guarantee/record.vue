<template>
    <div class="record">
          <Row>
            <Col span="12"><h2>担保备案详情</h2></Col>
            <Col span="12">
                    <div  style="float:right;">
                        <Button  type='primary' @click="goback">返回</Button>
                    </div>
            </Col>
        </Row>
        <div class="wrap" v-if="this.formData.status == '1' || this.formData.status == '2'">
            <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
            <Row >
                <Col span="8"><FormItem label='担保号：'  prop='guaranteeId' > <div>{{formData.guaranteeId}}</div> </FormItem></Col>
                <Col span="8"><FormItem label='担保企业名称：'  prop='guaranteeEpName' > <div>{{formData.guaranteeEpName}}</div></FormItem></Col>
                <Col span="8"><FormItem label='担保企业海关注册登记号：'  prop='guaranteeEpCustomsId' > {{formData.guaranteeEpCustomsId}}</FormItem></Col>
             </Row>
             <Row >
                <Col span="8"><FormItem label='所属关区（4位关区号码）：'  prop='customsAreaCode' > {{formData.customsAreaCode}}</FormItem></Col>
                <Col span="8"><FormItem label='担保方式：' prop='guaranteeMode' > 
                  {{formData.guaranteeMode}}
                  </FormItem>
                </Col>
                <Col span="8" ><FormItem label='担保金额'  prop='guaranteeAmount' >  {{formData.guaranteeAmount}}</FormItem></Col>
             </Row>
              <Row >
                <Col span="8">
                <FormItem label='担保起始日期：'  prop='guaranteeStartDate' >
                   {{formData.guaranteeStartDate}}
                </FormItem></Col>
                <Col span="8" >
                <FormItem label='担保截止日期：'  prop='guaranteeEndDate' >
                    {{formData.guaranteeEndDate}}
                </FormItem></Col>
                  <Col span="8" ><FormItem label='保证金/保函凭证号（附件）：' >
                   <div >
                       <Button  @click="openUpload" disabled icon="ios-cloud-upload-outline" type="primary">上传附件</Button>
                       <!-- <span class="downFile" @click="downFile(formData.filepath)">{{this.formData.filename}}</span> -->
                    </div>
                    </FormItem></Col>
             </Row>
              <Row >
                <Col span="8" style="border-bottom: 1px solid #000;"><FormItem label='担保机构名称:' > {{formData.guaranteeMechanismName}}</FormItem></Col>
                <Col span="8" style="border-bottom: 1px solid #000;"></Col>
                <Col span="8" style="border-bottom: 1px solid #000;"></Col>
             </Row>
             
             <FormItem class="ivw-bottom" :label-width ='0'>
                  <Button type="primary" style="width:100px;margin-right:20px" @click="handStorage('formData')" disabled>暂 存</Button>
                  <Button type="primary" style="width:100px" @click="handSubmit('formData')" disabled>提 交</Button>
             </FormItem>
                <!-- <Button type="primary" style="width:120px;margin-right:20px" >暂 存</Button>
                <Button type="primary" style="width:100px">提 交</Button> -->
           </Form>
        </div>
         <div class="wrap" v-else>
            <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
            <Row >
                <Col span="8"><FormItem label='担保号：'  prop='guaranteeId' > <Input v-model="formData.guaranteeId" placeholder="请输入担保号" /></FormItem></Col>
                <Col span="8"><FormItem label='担保企业名称：'  prop='guaranteeEpName' > <Input v-model="formData.guaranteeEpName" placeholder="请输入担保企业名称" /></FormItem></Col>
                <Col span="8"><FormItem label='担保企业海关注册登记号：'  prop='guaranteeEpCustomsId' > <Input v-model="formData.guaranteeEpCustomsId" placeholder="请输入担保企业海关注册登记号"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="8"><FormItem label='所属关区（4位关区号码）：'  prop='customsAreaCode' > <Input v-model="formData.customsAreaCode" placeholder="请输入所属关区（4位关区号码）" /></FormItem></Col>
                <Col span="8"><FormItem label='担保方式：' prop='guaranteeMode' > 
                   <RadioGroup v-model="formData.guaranteeMode"> 
                       <Radio label='快件担保'>快件担保 </Radio>
                       <Radio label='进博会保函'>进博会保函 </Radio>
                       <Radio label='进博会保单'>进博会保单 </Radio>
                    </RadioGroup> 
                  </FormItem>
                </Col>
                <Col span="8" ><FormItem label='担保金额'  prop='guaranteeAmount' > <Input v-model="formData.guaranteeAmount" placeholder="请输入担保金额" /></FormItem></Col>
             </Row>
              <Row >
                <Col span="8" >
                <FormItem label='担保起始日期：'  prop='guaranteeStartDate' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.guaranteeStartDate = $event"  placeholder="请选择担保起始时间" v-model="formData.guaranteeStartDate" ></DatePicker>
                </FormItem></Col>
                <Col span="8">
                <FormItem label='担保截止日期：'  prop='guaranteeEndDate' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.guaranteeEndDate = $event"  placeholder="请选择担保结束日期" v-model="formData.guaranteeEndDate" ></DatePicker>
                </FormItem></Col>
                  <Col span="8"><FormItem label='保证金/保函凭证号（附件）：' >
                   <!-- <div v-if="this.formData.filename">
                       <span class="downFile" @click="downFile(formData.filepath)">{{this.formData.filename}}</span>
                        <Button @click="openUpload" icon="ios-cloud-upload-outline" type="primary">上传附件</Button>
                   </div> -->
                   <Button  @click="openUpload" icon="ios-cloud-upload-outline" type="primary">上传附件</Button>
                    </FormItem></Col>
             </Row>
             <Row >
                <Col span="8" style="border-bottom: 1px solid #000;"><FormItem label='担保机构名称：'  prop='guaranteeMechanismName' >  <Input v-model="formData.guaranteeMechanismName" placeholder="请输入担保机构名称" /></FormItem></Col>
                <Col span="8" style="border-bottom: 1px solid #000;"></Col>
                <Col span="8" style="border-bottom: 1px solid #000;"></Col>
             </Row>
             
             
             <FormItem class="ivw-bottom" :label-width ='0'>
                  <Button type="primary" style="width:100px;margin-right:20px" @click="handStorage('formData')">暂 存</Button>
                  <Button type="primary" style="width:100px" @click="handSubmit('formData')">提 交</Button>
             </FormItem>
           </Form>
        </div>
        
        <div style='margin-top:20px'>
                <h2>上传附件列表</h2>
            <Table border :columns = 'columns' :data='Filedata' class="self">
                <template  slot-scope="{row}" slot="action"> 
                     <template>
                        <!-- <Button type="primary" size ='large' style="margin-right:10px" @click="downFile(row)">下载</Button> -->
                      </template>
                </template>
            </Table>
        </div>
        <Upload ref="upload" :formInfo = this.formData  @func ="changeFileName"/>
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
                    <p>提交后不可修改！！</p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' @click="confirmModal = false" style="margin-right:20px">取消</Button> 
                   <Button type='primary' size='large' @click="confirmDelete">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
                <!-- <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="InfoModal=false" size='30'/>
                </p> -->
        </Modal>
    </div>  
</template>
<script>
import Upload from './comonents/upload'
import {pdfLook,publicInter,fileUp} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'

export default {
    components:{Upload},
    data(){
        return {
            Filedata:[],
            confirmModal:false,
            userModal:false,
            uploadFileName:'',
            formData:{
                guaranteeId:'', 
                guaranteeEpName:'', 
                guaranteeEpCustomsId:'', 
                customsAreaCode:'', 
                guaranteeMode:'', 
                guaranteeAmount:'', 
                guaranteeStartDate:'',
                guaranteeEndDate:'',
                file:'',
                fileid:'',
                status:'',
                filename:'',
                filepath:'',
                guaranteeMechanismName:''
            },
             //表单校验规则
            formRules:{
                guaranteeId:[{required:true, trigger:'change' , message:'请输入担保号', }],
                guaranteeEpName:[{required:true, trigger:'change' , message:'请输入担保企业名称', }],
                guaranteeEpCustomsId:[{required:true, trigger:'change' , message:'请输入担保企业海关注册登记号', }],
                customsAreaCode:[{required:true, trigger:'change' , message:'所属关区（4位关区号码）', }],
                guaranteeMode:[{required:true, trigger:'change' , message:'请选择担保方式',}],
                guaranteeAmount:[{required:true, trigger:'change' , message:'请输入担保金额', }],
                guaranteeStartDate:[{required:true, trigger:'blur' , message:'请选择担保起始日期', }],
                guaranteeEndDate:[{required:true, trigger:'blur' , message:'请选择担保结束日期', }],
                guaranteeMechanismName:[{required:true, trigger:'blur' , message:'担保机构名称不能为空', }],
                
            },
            userInfo:[],
            columns:[
                {
                  title:'序号',
                  align:'center',
                  width:'70',
                  render:(h,params,index)=>{
                          return h('span',(params.index )+1)
                    }
                },
                {
                  title:'文件名称',
                  key:'filename',
                  align:'center'
                },
                {
                  title:'上传时间',
                  key:'recUpdDt',
                  align:'center'
                },
                {
                title:'操作',
                slot:'action',
                align:'center',
                }
            ],
            uploadFileList:[], //上传文件的列表
            confirmModal:false,
            total1:0,
           
        }
    },
    methods:{

        //上传文件查询
         queryInfo(params){
            let data ={
                key:params,
            }
            publicInter(interfaceUrl.queryFiles,data).then(r=>{
                this.Filedata = r
            })
        },
        //文件下载
        downFile(row){
            let a = document.createElement('a')
            a.href =row.filepath.replace('/data/file/','').trim()
            a.click()
        },
        confirmDelete(){
           this.formData.status = '1'
           this.$refs.upload.upload()
           this.confirmModal = false
        },
        goback(){
            this.$router.go('-1')
        },
        //
        changeFileName:function(data){
             this.formData.filename = data
        },
        //表单提交
        handSubmit(name){
            if( this.formData.guaranteeStartDate.length !== 10 && this.formData.guaranteeStartDate.length != 0){
                let StartDate = this.formData.guaranteeStartDate
               let endDate = this.formData.guaranteeEndDate
               let y = StartDate.getFullYear()
               let m = (StartDate.getMonth()+1)<10? '0'+ (StartDate.getMonth()+1):StartDate.getMonth()+1;
               let d = (StartDate.getDate())<10? '0'+ (StartDate.getDate()):StartDate.getDate();

               let y1 = endDate.getFullYear()
               let m1 = (endDate.getMonth()+1)<10? '0'+ (endDate.getMonth()+1):endDate.getMonth()+1;
               let d1 = (endDate.getDate())<10? '0'+ (endDate.getDate()):endDate.getDate();

               let newStartDate = y +'-' + m +'-'+ d
               let newEndDate =  y1 +'-' + m1 +'-'+ d1
               this.formData.guaranteeStartDate = newStartDate
               this.formData.guaranteeEndDate = newEndDate
            }
            let _this = this
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.confirmModal = true
                }else{
                    this.$Message.error('必填项不能为空')
                }
            })
        },

        //表单暂存
        handStorage(name){
            console.log(this.formData)
            if( this.formData.guaranteeStartDate.length != 10 && this.formData.guaranteeStartDate.length != 0){
               let StartDate = this.formData.guaranteeStartDate
               let endDate = this.formData.guaranteeEndDate
               let y = StartDate.getFullYear()
               let m = (StartDate.getMonth()+1)<10? '0'+ (StartDate.getMonth()+1):StartDate.getMonth()+1;
               let d = (StartDate.getDate())<10? '0'+ (StartDate.getDate()):StartDate.getDate();

               let y1 = endDate.getFullYear()
               let m1 = (endDate.getMonth()+1)<10? '0'+ (endDate.getMonth()+1):endDate.getMonth()+1;
               let d1 = (endDate.getDate())<10? '0'+ (endDate.getDate()):endDate.getDate();

               let newStartDate = y +'-' + m +'-'+ d
               let newEndDate =  y1 +'-' + m1 +'-'+ d1
               this.formData.guaranteeStartDate = newStartDate
               this.formData.guaranteeEndDate = newEndDate
            }

            let _this = this
            this.formData.status = '0'
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.$refs.upload.upload()
                }else{
                    this.$Message.error('必填项不能为空')
                }
            })
        },
        openUpload(){
            this.$refs.upload.openModal()
        }
    },
    mounted(){
        this.formData = this.$route.params.id
        console.log( '------------')
        console.log( this.formData)
        if(this.formData.fileid){
            this.queryInfo(this.formData.fileid)
        }
    }
}
</script>

<style lang="scss" scoped>
.record{
    h2{
        padding-bottom: 20px;
    }
    .wrap{
        .ivw-bottom{
            margin-top: 20px;
            text-align: center;
        }
            width: 100%;
            margin-top: 20px;
            font-size: 14px;
            color: #000;
                .ivu-row{
                    border-top: 1px solid #000;
                    border-right: 1px solid #000;
                    .ivu-col {
                        border-left: 1px solid #000;
                        //border-bottom: 1px solid #000;
                        padding: 2px 4px;
                        height: 40px;
                        overflow: hidden;
                        line-height: 30px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        text-align: center;
                        > span {
                            display: inline-block;
                            width: auto;
                            text-align: left;
                            vertical-align: middle;
                        }
                    }
                    .text-col{
                        height: 180px;
                    }
                    .pBreak{
                        text-indent:2em;
                        width: 100%;
                        height: auto;
                        word-wrap: break-word;
                        word-break: break-all;
                        overflow: hidden;
                    }
                }
              
            } 
   
}
.downFile{
    color: #185DF7;
    cursor: pointer;
}
    
</style>