<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>侵权信息管理</h2></Col>
            <Col span="12">
                    <div  style="float:right;"><h2>公司名称:{{showCompanyName}}</h2></div>
            </Col>
        </Row>

          <div class="query" >
            <div class="copName"> 标题：<Input size="large" placeholder="请输入标题" style="width:80%" v-model="title"/></div>
            
            <Button type='primary'  @click="queryInfo(1)" style="margin-right:30px;width:100px">查  询</Button>
            <Button type="primary" size ='large'  @click="uploadModal = true">侵权信息导入</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tortList' class="self">
                <!-- <template  slot-scope="{row}" slot="action"> 
                    <Button type="primary" size ='large'  @click="change(row)">下  载</Button>
                </template> -->
            </Table>
             <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        </div>


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
                          标题：<Input v-model="uploadTitle" placeholder="请输入标题" style="width:400px"/>
                     </div>
                     <div class="uploadbox" style="display:flex;line-height:30px;margin:15px 0" >
                          内容：<Input v-model="uploadContent" type="textarea"  :rows=4 placeholder="请输入内容" style="width:400px"/>
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
import cfg from '@/until/config'
import {getCookie,setCookie} from '@/until/getToken'

export default {
    data() {
        return {
            showCompanyName:getCookie('companyName'),
            //文件上传的modal
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
            tortList:[],
            columns:[
              {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
              {
              title:'标题',
              key:'title',
              align:'center'
             },
              {
              title:'内容',
              key:'content',
              align:'center',
              },
              {
              title:'文件名称',
              key:'filename',
              align:'center',
              },
              {
              title:'上传日期',
              key:'recUpdDt',
              align:'center',
              },
              {
              title:'处理状态',
              key:'readstatus',
              align:'center',
              render:(h,params)=>{
                 let tmpStr = "";
                    if(params.row.readstatus == '0'){
                      tmpStr="未处理";
                    }else if(params.row.readstatus== '1'){
                      tmpStr="已处理";
                    }
                    return h('span',{
                        style:{
                           color: (params.row.readstatus == '0')? "#EF5552":"#63E35A"
                        }
                    },tmpStr)
                }
              },
            //   {
            //   title:'操作',
            //   align:'center',
            //   render:(h,params)=>{
            //     //   console.log( params.row.filepath.replace('/data/file/','').trim())
            //             return h('div',
            //             {
            //                 style:{
            //                     textAlign:'center'
            //                 }
            //             },
            //             [
            //                 h('Button',{
            //                     props:{
            //                         type:'primary',
            //                         size:'large',
            //                     },
            //                     style:{
            //                         marginRight:'5px'

            //                     },
            //                     on:{
            //                         click:()=>{
            //                           let a = document.createElement('a')
            //                           a.href = params.row.filepath.replace('/data/file/','').trim()
            //                           a.click()
            //                         }
            //                     }
            //                 },'下载'),
            //             ])
            //         }
            //  }
            ],
            title:'',
            uploadTitle:'',
            uploadContent:"",
            total1:0,
            numPage:1
        }
    },
    methods:{
        //默认加载信息查询
        queryInfo(page){
            let data ={
                title:this.title,
                pageNum:page,
                pageSize:20
            }
            publicInter(interfaceUrl.queryTortRiskinfoList,data).then(res=>{
                console.log(res)
                this.tortList = res.list
                this.total1 = (res.total)*1
            })
        },
        //分页函数
        changePage1(page){
            this.numPage = page
            this.queryInfo(page)
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
            }else{
            var formdata=new FormData()
            var url = interfaceUrl.addTortRiskinfo //文件上传地址
            this.filelist.forEach(item=>{
                formdata.append('file',item)
                formdata.append('title',this.uploadTitle)
                formdata.append('content',this.uploadContent)
            })
            
            fileUp(url,formdata).then(r=>{
                console.log(r)
                if(r.code == 200){
                    this.$Message.success('上传成功')
                    this.uploadModal = false
                    this.uploadTitle = ''
                    this.uploadContent = ''
                    this.uploadCompanyName = '';
                    this.filelist=[];
                    this.data1 = []
                    this.queryInfo(1)
                }else if(!(this.uploadContent) || !(this.uploadTitle)){
                 this.$Message.error({
                        content:"标题或内容不能为空",
                        duration:3
                    })
                    return false
                 }
                else{
                    this.modal=true
                    this.$Message.error('上传出错')
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
        this.queryInfo(1)
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    
    h2{
        padding-bottom: 20px;
    }
    .ivu-page{
               text-align: center;
               margin-top: 10px;
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