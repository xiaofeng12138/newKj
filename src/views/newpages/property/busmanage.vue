<template>
    <div class="taglist">
        <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>注册企业信息管理</h2></Col>
            <Col span="12">
                    <div  style="float:right;"><h2>公司名称:{{showCompanyName}}</h2></div>
            </Col>
        </Row>
         
          <div class="wrap">
            <Button type="primary"  @click="openModal" style="margin-bottom:20px">修改信息</Button>
            <Row>
                <Col span="2">公司名称</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.companyname}}</div>
                </Col>
                 <Col span="2">公司地址</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.contactAddr}}</div>
                </Col>
                <Col span="2">联系人</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.contacts}}</div>
                </Col>
            </Row>
             <Row>
                <Col span="2">联系人邮箱</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.contactEmail}}</div>
                </Col>
                 <Col span="2">联系人电话</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.contactPhone}}</div>
                </Col>
                <Col span="2">备用联系人</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.spareContacts}}</div>
                </Col>
            </Row>
             <Row>
                <Col span="2">备用联系人电话</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.spareContactPhone}}</div>
                </Col>
                 <Col span="2">备用联系人邮箱</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.spareContactEmail}}</div>
                </Col>
                <Col span="2">备用联系人地址</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.spareContactAddr}}</div>
                </Col>
            </Row>
             <Row>
                <Col span="2">注册日期</Col>
                <Col span="6"  style="overflow: visible">
                    <div >{{userInfo.recUpdDt}}</div>
                </Col>
                 <Col span="2">备注</Col>
                <Col span="14"  style="overflow: visible">
                    <div >{{userInfo.remarks}}</div>
                </Col>
            </Row>

             <!-- <h2 style="margin-top:20px;opacity:0.8">上传附件列表</h2>
             <Table border :columns = 'columns' :data='uploadFileList' class="self" style="margin-top:20px">
                <template  slot-scope="{row}" slot="action"> 
                    <Button type="primary" size ='large' style="margin-right:10px" @click="downFile(row)">下 载</Button>
                </template>
            </Table> -->

          </div>


         <!-- 修改用户信息表的modal -->
         <Modal
            v-model='userModal' 
            width='1000' 
            :mask-closable=false 
            :footer-hide = true
            :closable = false
            >
                <p slot="header" style="text-align:center;font-size:15px">
                    <span>请填写用户信息</span>
                </p>
                <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
                    <Row >
                        <Col span="12"><FormItem label='公司名称'  prop='companyname' > <Input v-model="formData.companyname" placeholder="请输入公司名称"/></FormItem></Col>
                        <Col span="12"><FormItem label='公司地址'  prop='contactAddr' > <Input v-model="formData.contactAddr" placeholder="请输入公司地址" /></FormItem></Col>
                    </Row>
                    <Row >
                        <Col span="12"><FormItem label='联系人'  prop='contacts' > <Input v-model="formData.contacts" placeholder="请输入公司联系人"/></FormItem></Col>
                        <Col span="12"><FormItem label='联系人电话'  prop='contactPhone' > <Input v-model="formData.contactPhone" placeholder="请输入公司联系人电话" /></FormItem></Col>
                    </Row>
                    <Row >
                        <Col span="12"><FormItem label='联系人邮箱'  prop='contactEmail' > <Input v-model="formData.contactEmail" placeholder="请输入公司联系人邮箱"/></FormItem></Col>
                        <Col span="12"><FormItem label='备用联系人'  prop='spareContacts' > <Input v-model="formData.spareContacts" placeholder="请输入公司备用联系人" /></FormItem></Col>
                    </Row>
                    <Row >
                        <Col span="12"><FormItem label='备用联系人电话'  prop='spareContactPhone' > <Input v-model="formData.spareContactPhone" placeholder="请输入公司备用联系人电话"/></FormItem></Col>
                        <Col span="12"><FormItem label='备用联系人邮箱'  prop='spareContactEmail' > <Input v-model="formData.spareContactEmail" placeholder="请输入公司备用联系人邮箱" /></FormItem></Col>
                    </Row>
                    <Row >
                        <Col span="12"><FormItem label='备用联系人地址'  prop='spareContactAddr' > <Input v-model="formData.spareContactAddr" placeholder="请输入公司备用联系人地址"/></FormItem></Col>
                        <Col span="12"><FormItem label='备注（选填）'   > <Input v-model="formData.remarks" placeholder="请输入备注" /></FormItem></Col>
                    </Row>
                    <!-- <Row v-if="formData.customsIpUserAgentinfos.length > 0">
                        <Col span="24"><FormItem label='文件上传列表:'> 
                         <p v-for="(item,index) in (formData.customsIpUserAgentinfos)" :key=index>
                             {{item.uploadFileName}}
                         </p>
                        </FormItem></Col>
                    </Row>
                    <Row >
                        <Col span="24"><FormItem label='上传代理信息'> 
                        <Button type="primary" icon="ios-cloud-upload-outline" @click="uploadModal = true">上传证明文件</Button>
                        备注：附件上传授权代理文书
                        </FormItem></Col>
                    </Row> -->
                    
                    
                    <Row>
                        <Col span="24" style="margin:auto;text-align:center">
                        <Button type="primary" style="width:120px;margin-right:20px"  @click="closeModal('formData')">取   消</Button>
                        <Button type="primary" style="width:100px"  @click="submitone('formData')">提交</Button></Col>
                    </Row>
                </Form>
          
        </Modal>

          <!-- 文件上传Modal -->
         <Modal
                v-model="uploadModal"
                width="900"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="uploadModal=false" size='30'/>
                </p>
                <div class="upload">
                <h3>
                     提示:上传一个不超过1MB后缀名为.zip的压缩包
                    <Button type="primary" v-if="data1.length>0" @click="upload" icon="ios-cloud-upload-outline" size='large'>全部上传</Button>
                        <Upload  action="a" v-if="data1.length>0"
                            multiple
                            :before-upload='beforeUpload'
                            :max-size='fileSize'
                            :on-exceeded-size='outSize'
                            >
                            <Button icon="plus-round" size='large'>添加文件</Button>
                        </Upload>
                        <Button type="error" v-if="data1.length>0" @click="reChocie" style="margin-right:-32px" icon="information-circled" size='large'>重新选择</Button>
                    </h3>
                     <div class="uploadbox" style="display:flex;line-height:30px;margin:15px 0" >
                          权利人企业名称：<Input v-model="uploadCompanyName" placeholder="请输入权利人企业名称" style="width:300px"/>
                     </div>
                    <div class="tableBox" v-if="data1.length>0">
                        <Table :columns="columns1" :data="data1" class="self" style="width:100%;margin-top:15px"></Table>
                    </div>
                    <div class="upfile" v-if="data1.length<=0">
                        <h3 style="margin-bottom:16px">暂未上传</h3>
                        <Upload
                            action='a'
                            multiple
                            :before-upload='beforeUpload'
                            :max-size='fileSize'
                            :on-exceeded-size='outSize'
                            >
                            <Button  icon="ios-cloud-upload-outline" size='large'>上传文件</Button>
                            <!-- <Button style="margin-left:16px" type="ghost" icon="ios-cloud-upload-outline" size='large'>上传原始文件(pdf)</Button> -->
                        </Upload>
                    </div>
                    <Modal
                        title="格式错误"
                        v-model="modal"
                        :closable="false"
                        :scrollable='true'
                        class="self"
                        :mask-closable="false">
                        <p ref='errorInfor'  class="modalcontent"></p>
                    </Modal>
            </div>
        </Modal>
        
    </div>
</template>

<script>
import {fileUp} from '@/api/http'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {getCookie,setCookie} from '@/until/getToken'
export default {
    data() {
        return {
            showCompanyName:getCookie('companyName'),
            //新增授权企业modal信息
            userModal:false,
            formData:{
                companyname:'', //公司名称
                contactAddr:'', //公司地址
                contacts:'', //联系人
                contactPhone:'', //联系人联系电话
                contactEmail:'', //联系人联系email
                spareContacts:'', //备用联系人
                spareContactPhone:'',//备用联系人联系电话
                spareContactEmail:'',//备用联系人email
                spareContactAddr:'', //备用联系人联系地址
                remarks:'', //备注
                customsIpUserAgentinfos:[]
            },
             //表单校验规则
            formRules:{
                companyname:[{required:true, trigger:'blur' , message:'请输入公司名称', }],
                contactAddr:[{required:true, trigger:'blur' , message:'请输入公司地址', }],
                contacts:[{required:true, trigger:'blur' , message:'请输入公司联系人', }],
                contactPhone:[{required:true, trigger:'blur' , message:'请输入公司联系人电话', }],
                contactEmail:[{required:true, trigger:'blur' , message:'请输入公司联系人邮箱', }],
                
            },
            userInfo:[],
            columns:[
                {
                  title:'权利人企业名称',
                  key:'obligeeName',
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
             //文件上传参数
            uploadModal:false,
            modal:false,
            filelist:[],
            columns1:[
                        {
                            title: '文件名',
                            key: 'name'
                        },
                        {
                            title: '上传时间',
                            key: 'date'
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width:100,
                            render:(h,params)=>{
                                const that=this
                                return  h('Poptip', {
                                        props: {
                                        confirm: '',
                                        placement:'top-end',
                                        title:"您确认删除这条内容吗？"
                                        },
                                        style:{
                                            textAlign:'left'
                                        },
                                        on:{
                                            'on-ok':()=>{
                                                this.data1.splice(params.index,1)
                                                this.filelist.splice(params.index,1)
                                                this.uploadFile.fileName ='';
                                            }
                                        }
                                    },[
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'large'
                                        }
                                    },'删除')])

                            }
                         },
                        ],
            data1: [],
            fileSize:1024,
            uploadFile:{
                fileUrl:'',
                fileName:''
            },
            uploadCompanyName:''//文件上传中权利人企业名称
        }
    },
    methods:{
        //文件下载
        downFile(row){
            row.files[0].filepath
            let a = document.createElement('a')
            a.href = row.files[0].filepath.replace('/data/file/','').trim()
            a.click()
        },
         //弹出修改信息框
         openModal(){
             this.formData.companyname = this.userInfo.companyname
             this.formData.contactAddr = this.userInfo.contactAddr
             this.formData.contacts = this.userInfo.contacts
             this.formData.contactPhone = this.userInfo.contactPhone
             this.formData.contactEmail = this.userInfo.contactEmail
             this.formData.spareContacts = this.userInfo.spareContacts
             this.formData.spareContactPhone = this.userInfo.spareContactPhone
             this.formData.spareContactEmail = this.userInfo.spareContactEmail
             this.formData.spareContactAddr = this.userInfo.spareContactAddr
             this.formData.remarks = this.userInfo.remarks
             this.userModal = true
         },
         closeModal(name){
           this.$refs[name].resetFields()
           this.userModal = false
           this.formData.customsIpUserAgentinfos =[] 
         },
        
        //新增表单提交
        submitone(name){
            this.$refs[name].validate((valid)=>{
              if(valid){
                let data =this.formData
                publicInter(interfaceUrl.saveUser,data).then(res=>{
                  if(res.code == 200){
                    this.addModal = false
                    this.$refs[name].resetFields()
                    this.$Message.success('操作成功')
                    this.userModal = false
                    this.queryCompany()
                  }else{
                    this.$Message.error(res.message)
                  }
                })
              }else{
                 console.log('失败')
              }
         })
        },
        queryCompany(){
            publicInter(interfaceUrl.queryEnterUser,{}).then(res=>{
               this.userInfo = res.data
               this.uploadFileList = res.data.customsIpUserAgentinfos
            })
        },
         //文件上传函数
        beforeUpload(file){
           let fileName = file.name.lastIndexOf('.')
           let fileLength = file.name.length;
           let fileType = file.name.substring(fileName + 1 , fileLength )
           let tp ="ZIP,zip";  //限制压缩包类型
           let rs= tp.indexOf(fileType);
            if(rs < 0){
                      this.$Message.error({
                        content:"请上传后缀名为.zip的压缩包文件",
                        duration:3
                    })
            }else{
                if(this.fileSize<(file.size/1024)){
                    this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
                }else{
                    this.uploadFile.fileName = file.name
                    this.filelist.push(file)
                    this.data1.push({
                        name: file.name,
                        date: (new Date).toLocaleDateString()
                    })
                }
            }
            return false
        },
        reChocie(){
            this.data1=[];
            this.filelist=[];
            this.uploadFile.fileName ='';
        },
        outSize(){
            this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
            this.data1.pop()
        },
        remove (index) {
            this.data1.splice(index, 1);
            this.uploadFile.fileName ='';
        },
        upload(){
            if(this.filelist.length > 1){
                 this.$Message.error({
                        content:"最多只能上传一个文件！！",
                        duration:3
                    })
            }else if(!(this.uploadCompanyName) ){
                 this.$Message.error({
                        content:"权利人企业名称不能为空",
                        duration:3
                    })
                    return false
            }
            else{
            var formdata=new FormData()
            var url = interfaceUrl.fileUpload //文件上传地址
            this.filelist.forEach(item=>{
                formdata.append('file',item)
                formdata.append('bizType','IP')
            })
            
            fileUp(url,formdata).then(r=>{
                if(r.code == '200'){
                    let obj = {
                        fileid:r.files[0].key,
                        obligeeName:this.uploadCompanyName,
                        uploadFileName:r.files[0].filename
                    }
                     this.formData.customsIpUserAgentinfos.push(obj)
                     this.uploadFile.fileName = ''; //清空文件名
                     this.uploadModal = false;
                     this.uploadCompanyName = '';
                     this.filelist=[];
                     this.data1 = []
                     this.$Message.success('上传成功')
                }else{
                    this.modal=true
                    this.$refs.errorInfor.innerHTML=r.error
                }
                if(r.indexArray && r.indexArray.length>0){
                        r.indexArray.forEach((value,index)=>{
                        this.data1.splice(value-index,1)
                        this.filelist.splice(value-index,1)
                    })
                }
            })
            }
        },
    },
    mounted(){
        this.queryCompany()
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
        .wrap{
            width: 100%;
            height: 400px;
            margin-top: 20px;
            font-size: 14px;
            color: #000;
                .ivu-row{
                    border-top: 1px solid #000;
                    border-right: 1px solid #000;
                    .ivu-col {
                        border-left: 1px solid #000;
                        border-bottom: 1px solid #000;
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
.upload{
         >h3{
            padding: 10px 0;
            .ivu-upload,button{
                float: right;
                margin-left: 32px;
                
            }
        }
        &:last-child{
            margin-bottom: 10px;
        }
        h3{
          margin:0;
          font-size: 18px;
        }
        .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
    }
    
</style>