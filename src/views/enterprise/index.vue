<template>
  <div class="clear" :style="{height:height,margin:'-48px'}" >
    <div class="a" v-if="showLoading">
        <Modal
         v-model='loginModal' 
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
                <Col span="12"><FormItem label='备用联系人'  > <Input v-model="formData.spareContacts" placeholder="请输入公司备用联系人" /></FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='备用联系人电话' > <Input v-model="formData.spareContactPhone" placeholder="请输入公司备用联系人电话"/></FormItem></Col>
                <Col span="12"><FormItem label='备用联系人邮箱'  > <Input v-model="formData.spareContactEmail" placeholder="请输入公司备用联系人邮箱" /></FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='备用联系人地址'   > <Input v-model="formData.spareContactAddr" placeholder="请输入公司备用联系人地址"/></FormItem></Col>
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
                <Col span="24" style="margin:auto;text-align:center"><Button type="primary" style="width:100px"  @click="submitone('formData')">提交</Button></Col>
             </Row>
           </Form>
          
        </Modal>
    </div>
    <div class="a" v-else></div>

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
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import {getCookie,setCookie} from '../../until/getToken'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

  export default{
    data(){
      return{
         showLoading:false, //是否显示遮罩层
         loginModal:true,
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
         //文件上传参数
         uploadModal:false,
         modal:false,
         filelist:[],
         uploadFile:{
                fileUrl:'',
                fileName:''
            },
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
         //表单校验规则
         formRules:{
           companyname:[{required:true, trigger:'blur' , message:'请输入公司名称', }],
           contactAddr:[{required:true, trigger:'blur' , message:'请输入公司地址', }],
           contacts:[{required:true, trigger:'blur' , message:'请输入公司联系人', }],
           contactPhone:[{required:true, trigger:'blur' , message:'请输入公司联系人电话', }],
           contactEmail:[{required:true, trigger:'blur' , message:'请输入公司联系人邮箱', }],
         },
         uploadFileList:[], //上传文件的列表
         uploadCompanyName:''//文件上传中权利人企业名称
       }
    },
    created(){
      this.height=((document.documentElement.clientHeight || document.body.clientHeight)-60)+'px'
        window.onresize= ()=> {
          this.height=((document.documentElement.clientHeight || document.body.clientHeight)-60)+'px'
        }
    },
    mounted(){
      this.getUserRole()
    },
    methods:{
      //获取用户角色
      getUserRole(){
        let role = getCookie("roler");
        if(role.indexOf('OE') != -1){
           publicInter(interfaceUrl.queryEnterUser,{}).then(res=>{
            setCookie('companyName',res.data.companyname)
            let count = Object.keys(res.data).length 
            if(count > 0 ){
                return false
            }else{
              this.showLoading = true
             }
          })
        }
      },
      //表单提交函数
      submitone(name){
         this.$refs[name].validate((valid)=>{
              if(valid){
                let data =this.formData;
                publicInter(interfaceUrl.saveUser,data).then(res=>{
                  if(res.code == 200){
                    this.showLoading = false
                    this.$Message.success('注册成功')
                  }
                })
              }else{
                 console.log('失败')
              }
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
                    this.InfoModal = false
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
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .a{
    background: url('../../assets/backG.jpg') no-repeat 50% 50%;
    background-size: cover;
    height: 100%;
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
  .title{
    padding: 0 0 15px 0;
    height: 38px;
    overflow: hidden;
    // border-bottom: 1px solid #dddee1;
    h1{
      // float: left;
      // color: #fff;
      &.scale{
        font-size: 20px;
      }
      font-size: 20px;
      color: #333;
      font-weight: normal;
      text-align: justify;
      text-shadow: 2px 2px 0 8px rgba(153,153,153,.43);
    }
    >div{
      img{
        float: left;
        width: 7px;
        
        margin-right: 20px;
      }
    }
    .sliderBox{
      list-style: none;
      margin: 0;
      height: 30px;
      // width: 450px;
      line-height:30px; 
      overflow: hidden;
      padding: 0;
      margin-top: 16px;
      font-size: 16px;
      li{
        float: left;
        // color: #212121;
        font-family: Georgia, 'Times New Roman', Times, serif;
        -webkit-text-stroke: 1px #666; -webkit-text-fill-color: transparent;
      }
    }
    span{
      float: right;
      font-size: 14px;
      color: #495060;
      margin-top: 10px;
    }
  }
  .classfiy{
    margin:0 -24px;
    overflow: hidden;
    list-style: none;

    padding-top: 30px;
    // background: url('../../assets/indexBg.jpg') no-repeat 50% 50%;
    background-size: cover;
    li{
      float: left;
      text-align: center;
      width: 25%;
      height: 50%;
      a{
        color: #212121;
        img{
          width: 9.5rem;
          height: 9.5rem;
        }
        img:hover{
            animation: jump 1s ease infinite;
        }
      }
    }
  }

  .clickClass{
      animation: change 0.7s ease-in-out 0.5s reverse forwards;
  }


  @-webkit-keyframes neon2 {
  from {
    color: #228DFF;
    text-shadow: 0 0 3px #fff,
               0 0 6px  #fff,
               0 0 10px  #fff,
               0 0 20px  #228DFF,
               0 0 25px  #228DFF,
               0 0 30px  #228DFF,
               0 0 40px #228DFF,
               0 0 45px #228DFF;
  }
  to {
    color: #1b3787;
    text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #fff,
               0 0 20px #228DFF,
               0 0 35px #228DFF,
               0 0 40px #228DFF,
               0 0 50px #228DFF,
               0 0 75px #228DFF;
  }
}
  @keyframes jump{
      from{
          transform: translate(0,0)
      }
      50%{
          transform: translate(0,10px)
      }
      to{
          transform: translate(0,0)
      }
  }

  @keyframes change {
      from{
          transform: rotateY(0) scale(1)
      }
      to{
          transform: rotateY(720deg) scale(1)

      }

  }
</style>
