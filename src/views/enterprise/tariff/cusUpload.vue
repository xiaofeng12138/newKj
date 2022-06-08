<template>
    <div class="tariff">
        <h2>关税业务海关端文件上传查询</h2>
        <div class="query" >
            <Button type='primary' size='large' @click="uploadFn">文件上传</Button>
            <!-- <Button type='primary' size='large' @click="queryFileList(1)">文件上传</Button> -->
        </div>
        <Table border :columns = 'columns' :data='uploadFileList' class="self">
            <template  slot-scope="{row}" slot="action"> 
              <Button type="primary" size ='large' style="margin-right:5px" @click="downFile(row)">查看</Button>
              <Button type="error" size ='large' @click="deleteFile(row)">删除</Button>
            </template>
         </Table>
         <Page :total="total" :page-size=10 @on-change="changePage" show-total />
        <!-- 文件上传Modal -->
         <Modal
                v-model="InfoModal"
                width="900"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="InfoModal=false" size='30'/>
                </p>
                <div class="upload">
                <h3>
                     提示:文件上传
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
                    <p>是否确认删除当前文件</p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' @click="cancaleDlete" style="margin-right:20px">取消</Button> 
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
import {fileUp} from '@/api/http'
//import upload from './erpupload'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import axios from "axios";
import cfg from '@/until/config'

export default {
    props:{
        pdfEnter:{
            type:String
        },
        uploadUrl:{
            type:String
        },
        interType:{
            type:String,
        },
        fileType:{
            type:String,
            default:''
        },
        fileSize:{
            type:Number,
            default:4096
        }
    },
    data(){
        return{
            confirmModal:false,
            total:0,
            //文件上传参数
            InfoModal:false,
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
            columns:[
                {
                    title: '序号',
                    align:'center',
                    width:100,
                    render:(h,params,index)=>{
                          return h('span',(params.index)+1)
                        }
                },
                {
                    title: '文件名',
                    align:'center',
                    key: 'filename'
                },
                {
                    title: '上传时间',
                    align:'center',
                    key: 'recUpdDt'        
                },    
                {
                    title:'操作',
                    slot:'action',
                    width:300,
                    align:'center',
                }
            ],
            uploadFileList:[],
            deleteFileList:{}
        }
    },
     methods: {
         //文件删除
         deleteFile(row){
             this.confirmModal = true
             this.deleteFileList = row
         },
         cancaleDlete(){
             this.confirmModal = false
             this.deleteFileList = {}
         },
         confirmDelete(){
             let arr = [];
             arr.push(this.deleteFileList.attachmentUuid)
             let data ={
                 attachUuids:arr
             }
             publicInter(interfaceUrl.deleteGsFile,data).then(r=>{
                 if(r.code == '200'){
                     this.confirmModal = false;
                     this.$Message.success('删除成功')
                     setTimeout(() => {
                         this.queryFileList(1)
                     }, 1200);
                 }
                     
             })
         },
         //文件下载
         downFile(row){
             let data = {
                 attachUuid:row.attachmentUuid
             }
            axios({
                type:'GET',
                url: cfg.base + interfaceUrl.downLoadGsFile +'?attachUuid='+ data.attachUuid + '&template='+ new Date().getTime(),
                responseType: 'blob',
            }).then((res)=>{
                    let headers = res.headers
                    let fileName = row.filename !='' ? (row.filename.split('.')[0]):''
                    let obj = ''
                    for (let key in headers) {
                       obj = headers['content-disposition']
                    }
                    let fileType = obj.split('.')[1]
                    
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download',fileName  +'.'+ fileType)
                    document.body.appendChild(link)
                    link.click()
            })

         },
         //列表查询
         queryFileList(page){
             let data= {
                 pageNum:page,
                 pageSize:10,
                 filetype:'gscus'  //查询海关文件   
             }
             publicInter(interfaceUrl.queryGsFilePageByParam,data).then(r=>{
                 this.uploadFileList = r.list
                 this.total =JSON.parse(r.total)
             })
         },
         changePage(page){
             queryFileList(page)
         },
         uploadFn(){
             this.InfoModal = true
         },
           //上传
        beforeUpload(file){
           let fileName = file.name.lastIndexOf('.')
           let fileLength = file.name.length;
           let fileType = file.name.substring(fileName + 1 , fileLength )
           console.log(file)
                if(this.fileSize<(file.size/1024)){
                    this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
                }else{
                    this.filelist.push(file)
                    this.data1.push({
                        name: file.name,
                        date: (new Date).toLocaleDateString()
                    })
                }
            
            return false
        },
        reChocie(){
            this.data1=[];
            this.filelist=[];
        },
        outSize(){
            this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
            this.data1.pop()
        },
        remove (index) {
            this.data1.splice(index, 1);
        },
        upload(){
            // if(this.filelist.length > 1){
            //      this.$Message.error({
            //             content:"最多只能上传一个文件！！",
            //             duration:3
            //         })
            // }else{
            var formdata=new FormData()
            var url = interfaceUrl.uploadCusFile //文件上传地址
            this.filelist.forEach(item=>{
                formdata.append('file',item)
            })
            fileUp(url,formdata).then(r=>{
                if(r.code==='200'&&!r.error){
                    this.$Message.success('上传成功')
                    this.data = r.list;
                    this.queryFileList(1)
                    if((this.filelist.length -1) == 0 ){
                       this.InfoModal = false;
                    }  
                }
                else if(r.error){
                    this.modal=true
                    this.$refs.errorInfor.innerHTML=r.error
                }
                else{
                    if(r.msg){
                        this.$Message.error({
                            content:'上传失败'+ r.msg,
                            duration:3
                        })
                    }else{
                        this.$Message.error('上传出错')
                    }
                }
                if(r.indexArray && r.indexArray.length>0){
                        r.indexArray.forEach((value,index)=>{
                        this.data1.splice(value-index,1)
                        this.filelist.splice(value-index,1)
                    })
                }

            })
        },   
    },
     mounted() {
            this.queryFileList(1)
        },
}
</script>

<style lang="scss" scoped>
.tariff{
    h2{
            padding-bottom: 20px;
            border-bottom: 1px solid #dddee1;
      }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 20%
        }
        .uscCode{
            width:20%;
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
    .active{
        color:#298EF7;
    }
    .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
 
</style>
