<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>代理信息管理</h2></Col>
            <Col span="12">
                    <div  style="float:right;"><h2>公司名称:{{showCompanyName}}</h2></div>
            </Col>
        </Row>
          <div class="query" >
            <div class="copName"> 权利人名称：<Input size="large" placeholder="请输入权利人名称" style="width:60%" v-model="lablename"/></div>
            <div class="uscCode"> 审核状态：<Select style="width:60%" v-model="status"><Option value="">全部状态</Option><Option value="0">待审核</Option> <Option value="1"> 审核通过</Option><Option value="2"> 审核拒绝</Option></Select></div>
            <Button type='primary'  @click="queryTagList" style="margin-right:30px;width:100px">查  询</Button>
            <Button type="primary" size ='large'  @click="showAddTagModal ">新增代理信息</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tagsList' class="self">
            <template  slot-scope="{row,index}" slot="action"> 
                <Button type="error" size ='large' style="margin-right:10px" @click="delTags(row)">删 除</Button>
                <Button type="primary" size ='large'  v-if="row.status != 2">导 入</Button>
                <Button type="primary" size ='large'  v-else disabled>导 入</Button>
            </template>
            <template  slot-scope="{row,index}" slot="fileAction"> 
                <Button type="error" size ='large' style="margin-right:10px" @click="delTags(row)">删 除</Button>
                <Button type="error" size ='large' style="margin-right:10px" @click="delTags(row)">上 传</Button>
                <Button type="error" size ='large'  @click="delTags(row)">下 载</Button>
            </template>
        </Table>
        </div>


         <!-- 添加标签的moadl -->
        <Modal
         v-model='addTagModal' 
         width='600' 
         :mask-closable=false 
         :footer-hide = true
         >
         <p slot="header" style="text-align:center;font-size:15px">
              <span>请输入权利人信息</span>
          </p>
           <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
             <Row >
                <Col span="18"><FormItem label='请输入权利人名称'  prop='tagsName' > <Input v-model="formData.tagsName" placeholder="请输入权利人名称"/></FormItem></Col>
             </Row>
             <tagsUpload ref="tagsUpload" @fatherMethod = 'queryTagList' />
             <Row>
                <Col span="24" style="margin:auto;text-align:center"><Button type="primary" style="width:100px;margin-top:10px;"  @click="addTagsFn('formData')">提交</Button></Col>
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
                    <p>是否确认删除当前权利人名称</p>
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

        <!-- 信息表格导入弹框 -->
         <Modal
            v-model='mandateModal' 
            width='600' 
            :mask-closable=false 
            :footer-hide = true
            >
            <p slot="header" style="text-align:center;font-size:15px">
                <span>授权企业信息导入</span>
            </p>
            <div style="text-align:center">
                <Button type="primary" size ='large' style="margin-right:20px" @click="showUploadOne">单条导入</Button>
                <Button type="primary" size ='large' style="margin-right:20px" @click="showUploadModal">批量导入</Button>
                <!-- <a href="/excel/mandatetable.xlsx"><Button type="primary" size ='large' >模板下载</Button></a> -->
            </div>
        </Modal>
        
        <!-- 单条上传的modal -->
        <oneUpload ref="oneUpload" :labelName = configLable />

        <!-- 批量上传的modal -->
        <allUpload ref="allUpload" :labelName = configLable />
    </div>
</template>

<script>
import {fileUp} from '@/api/http'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {getCookie,setCookie} from '@/until/getToken'
import oneUpload from './components/oneupload'
import allUpload from './components/allupload'
import tagsUpload from './components/tagsUpload'
import Tablepdf from './components/uploadFile'

export default {
    components:{oneUpload,allUpload,tagsUpload,Tablepdf},
    data() {
        return {
            showCompanyName:getCookie('companyName'),
            //授权信息搭配如modal
            mandateModal:false,
            addTagModal:false,
            mandateList:[],
            formData:{
               tagsName:''
            },
            formRules:{
                tagsName:[{required:true, trigger:'blur' , message:'权利人名称不能为空', }],
            },
            tagsList:[],
            columns:[
              {
              title:'权利人名称',
              key:'lablename',
              align:'center'
             },
              {
              title:'添加日期',
              key:'recUpdDt',
              align:'center'
             },
              {
              title:'审核状态',
              key:'status',
              align:'center',
              render:(h,params)=>{
                 let tmpStr = "";
                    if(params.row.status == 0){
                      tmpStr="待审核";
                    }else if(params.row.status== 1){
                      tmpStr="审核通过";
                    }else if(params.row.status== 2){
                      tmpStr="审核拒绝";
                    }
                    return h('span',{
                        style:{
                           color: (params.row.status == 0)? "#BDBABD":(params.row.status == 1)?"#63E35A":"#EF5552"
                        }
                    },tmpStr)
                }
             },
              {
              title:'拒绝原因',
              key:'refuseDes',
              align:'center',
              render:(h,params)=>{
                 let tmpStr = "";
                          if(params.row.refuseDes == ''){
                            tmpStr="无";
                          }else {
                            tmpStr= params.row.refuseDes;
                          }
                          return h('span',tmpStr)
                }
             },
             {
              title:'代理证明材料',
              align:'center',
              render: (h, params) => {
                            const that = this
                            return h('div', [
                                h(Tablepdf,{
                                    props:{
                                        type:'primary',
                                        size:'large',
                                        paramsInfo:params.row
                                    },
                                    on:{
                                        click(){},
                                        'fatherMethodd':function(){
                                           that.queryTagList()
                                        }

                                    }
                                }),
                            ])
                        }
             },
             {
                title:'操作',
                align:'center',
                render: (h, params) => {
                                const that=this
                                return h('div', [
                                h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'large',
                                            disabled:(params.row.status != 2)?false:true
                                        },
                                        style:{
                                            marginRight:'10px',
                                            
                                        },
                                        on:{
                                            click(){
                                                that.mandateModal = true
                                                that.configLable = params.row.lablename
                                            }
                                        }
                                    },'导入'),
                                    
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
                                            e.stopPropagation() 
                                            var text=e.target.innerText.replace(/\s+/g,"")
                                            if(text==='确定'||text==='ok'){
                                                that.confirmDelete(params.row)
                                            }
                                        }
                                        }
                                    },[
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'large',
                                        },
                                        style:{
                                            marginLeft:'10px'
                                        }
                                    },'删除')])
                                    
                                ])
                            }
              
             }
            ],
            mandateColumns:[
              {
                title:'授权企业名称',
                key:'COMPANYNAME',
                align:'center'
              },
              {
                title:'企业统一社会信用代码',
                key:'CNCOMPANYCODE',
                align:'center'
              },
              {
                title:'商品HS编码',
                key:'HSCODE',
                align:'center'
              },
              {
                title:'商品名',
                key:'GOODSNAME',
                align:'center'
              },
              {
                title:'品牌名称',
                key:'BRANDNAME',
                align:'center'
              },
              {
                title:'许可起始日',
                key:'PERMITSTARTDATE',
                align:'center'
              },
              {
                title:'许可截止日',
                key:'PERMITENDDATE',
                align:'center'
              },
              {
                title:'目的国名称',
                key:'目的国名称',
                align:'center'
              },
              {
                title:'授权企业名称',
                key:'COMPANYNAME',
                align:'center'
              },
            ],
            lablename:'',
            status:'',
            confirmModal:false,
            uploadLabelName:'',
            delTagsData:{
                lableid:'',
                lablename:''
            },
            configLable:''
        }
    },
    methods:{
        showAddTagModal(){
            this.$refs.tagsUpload.openModal()
        },
        addTagsFn(name){
            this.$refs[name].validate((valid)=>{
              if(valid){
                 console.log(this.formData.tagsName)
                 let data ={
                     lablename:this.formData.tagsName
                 }
                 publicInter(interfaceUrl.addLable,data).then(res=>{
                     if(res.code == 200){
                         this.$Message.success('添加成功')
                         this.formData.tagsName = ''
                         this.addTagModal = false
                         this.queryTagList()
                     }else{
                         this.$Message.error('添加失败')
                         this.formData.tagsName = ''
                     }
                 })
              }else{
                 console.log('失败')
              }
         })
        },
        showUploadModal(){
            this.$refs.allUpload.openModal()
            this.mandateModal = false
        },

        queryTagList(){
            let data ={
                lablename:this.lablename,
                status:this.status
            }
            publicInter(interfaceUrl.queryListForBus,data).then(res=>{
                this.tagsList = res.list
            })
        },

        confirmDelete(row){
            let data ={
                lableid:row.lableid,
                lablename:row.lablename
            }
            
             publicInter(interfaceUrl.deleteLable,data).then(r=>{
                 if(r.code == '200'){
                     this.confirmModal = false;
                     this.$Message.success('删除成功')
                     this.queryTagList()
                 }   
             })
        },
          //文件上传函数
        showUploadOne(){
           this.mandateModal = false
           this.$refs.oneUpload.openModal()
        },
    },
    mounted(){
        this.queryTagList()
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
            width: 20%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
    }
    
}  
</style>